import {
	AlmaError,
	AlmaUnauthorizedError,
	extractXmlErrorMessage,
} from "@/errors";
import type { Path } from "@/util/uri";

/**
 * The Alma API region, used to construct the base URL.
 * Maps to `https://api-{region}.hosted.exlibrisgroup.com`.
 */
export type AlmaRegion = "eu" | "na" | "ap" | "aps" | "cn" | "ca";

/**
 * Configuration options for the Alma SDK client.
 *
 * Provide either `region` (to use the standard ExLibris hosted URL) or a
 * custom `baseUrl` (for on-premises or proxy deployments).
 *
 * @example
 * ```typescript
 * // Using a named region:
 * const client = new AlmaClient({ apiKey: 'my-key', region: 'eu' });
 *
 * // Using a custom base URL:
 * const client = new AlmaClient({ apiKey: 'my-key', baseUrl: 'https://my-proxy.example.com' });
 * ```
 */
export interface AlmaClientConfig {
	/** The Alma API key used for authentication (passed as `?apikey=` query param). */
	apiKey: string;
	/**
	 * The Alma API region. Constructs the base URL as
	 * `https://api-{region}.hosted.exlibrisgroup.com`.
	 * Ignored if `baseUrl` is provided.
	 */
	region?: AlmaRegion;
	/**
	 * The Alma API version path segment (default: `"v1"`).
	 * Override this if you need to target a different API version.
	 */
	version?: `v${number}`;
	/**
	 * Custom base URL. If provided, overrides the `region` setting.
	 * Should not include a trailing slash.
	 */
	baseUrl?: string;
}

/** Options for request methods. */
interface RequestOptions {
	/** URL query parameters to append (the `apikey` param is always added). */
	query?: Record<string, string | number | boolean | undefined | null>;
	/** Request body for POST/PUT requests. */
	body?: unknown;
	/** Additional request headers. */
	headers?: Record<string, string>;
}

/**
 * Low-level HTTP client for the Alma REST API.
 *
 * Handles API key injection, JSON serialization/deserialization, and typed
 * error handling. You typically do not use this class directly - use
 * `AlmaClient` instead.
 *
 * @example
 * ```typescript
 * const http = new AlmaHttpClient({ apiKey: 'xxx', region: 'eu' });
 * const data = await http.get('/conf/test');
 * ```
 */
export class AlmaHttpClient {
	readonly baseUrl: string;
	readonly version: string;
	private readonly apiKey: string;

	constructor(config: AlmaClientConfig) {
		this.apiKey = config.apiKey;
		this.version = config.version ?? "v1";
		if (config.baseUrl) {
			this.baseUrl = config.baseUrl.replace(/\/$/, "");
		} else if (config.region) {
			this.baseUrl = `https://api-${config.region}.hosted.exlibrisgroup.com`;
		} else {
			throw new Error(
				"AlmaClientConfig must specify either `region` or `baseUrl`.",
			);
		}
	}

	/**
	 * Builds a full URL from a path and query parameters.
	 * Always appends the `apikey` query parameter.
	 */
	private buildUrl(
		path: Path,
		query?: Record<string, string | number | boolean | undefined | null>,
	): string {
		const url = new URL(`/almaws/${this.version}${path}`, this.baseUrl);

		if (query) {
			for (const [key, value] of Object.entries(query)) {
				if (value !== undefined && value !== null) {
					url.searchParams.set(key, String(value));
				}
			}
		}

		return url.toString();
	}

	/**
	 * Executes an HTTP request against the Alma API.
	 *
	 * @throws {AlmaUnauthorizedError} When the API returns 401 or 403.
	 * @throws {AlmaError} When the API returns any other non-2xx status.
	 */
	async request<T>(
		method: "GET" | "POST" | "PUT" | "DELETE",
		path: Path,
		options: RequestOptions = {},
	): Promise<T> {
		const url = this.buildUrl(path, options.query);
		const headers: Record<string, string> = {
			Accept: "application/json",
			Authorization: `apikey ${this.apiKey}`,
			...options.headers,
		};

		if (options.body !== undefined) {
			headers["Content-Type"] = "application/json";
		}

		const response = await fetch(url, {
			method,
			headers,
			body:
				options.body !== undefined ? JSON.stringify(options.body) : undefined,
		});

		if (response.ok) {
			// Some DELETE operations return 204 No Content
			if (response.status === 204) {
				return undefined as T;
			}
			// Some endpoints (e.g. /test) claim application/json but return XML
			const okContentType = response.headers.get("content-type") ?? "";
			if (!okContentType.includes("json")) {
				const text = await response.text();
				return text as unknown as T;
			}
			try {
				return (await response.json()) as T;
			} catch {
				// Content-Type was json but body is not valid JSON (e.g. Alma /test endpoints return XML)
				const text = await response.text().catch(() => "");
				return text as unknown as T;
			}
		}

		// Parse error body - Alma returns XML for auth errors regardless of Accept header
		const contentType = response.headers.get("content-type") ?? "";
		let errorBody: unknown;
		let isUnAuthorized = false;
		let errorMessage: string;

		if (contentType.includes("xml")) {
			const xml = await response.text();
			const result = extractXmlErrorMessage(xml);

			isUnAuthorized = result.errorCode === "UNAUTHORIZED";
			errorMessage = result.errorMessage ?? response.statusText;
			errorBody = xml;
		} else {
			isUnAuthorized = response.status === 401 || response.status === 403;

			try {
				errorBody = await response.json();
				errorMessage =
					(
						errorBody as {
							errorList?: { error?: Array<{ errorMessage?: string }> };
						}
					)?.errorList?.error?.[0]?.errorMessage ?? response.statusText;
			} catch {
				errorBody = await response.text().catch(() => "");
				errorMessage = response.statusText;
			}
		}

		if (isUnAuthorized) {
			throw new AlmaUnauthorizedError(response.status, errorMessage, errorBody);
		}

		throw new AlmaError(response.status, errorMessage, errorBody);
	}

	/**
	 * Performs a GET request.
	 *
	 * @param path - The API path (e.g. `/conf/libraries`).
	 * @param query - Optional query parameters.
	 * @returns The parsed JSON response.
	 * @throws {AlmaError} On non-2xx responses.
	 */
	async get<T>(
		path: Path,
		query?: Record<string, string | number | boolean | undefined | null>,
	): Promise<T> {
		return this.request<T>("GET", path, { query });
	}

	/**
	 * Performs a POST request.
	 *
	 * @param path - The API path.
	 * @param body - The request body (will be JSON-serialized).
	 * @param query - Optional query parameters.
	 * @returns The parsed JSON response.
	 * @throws {AlmaError} On non-2xx responses.
	 */
	async post<T>(
		path: Path,
		body: unknown,
		query?: Record<string, string | number | boolean | undefined | null>,
	): Promise<T> {
		return this.request<T>("POST", path, { body, query });
	}

	/**
	 * Performs a PUT request.
	 *
	 * @param path - The API path.
	 * @param body - The request body (will be JSON-serialized).
	 * @param query - Optional query parameters.
	 * @returns The parsed JSON response.
	 * @throws {AlmaError} On non-2xx responses.
	 */
	async put<T>(
		path: Path,
		body: unknown,
		query?: Record<string, string | number | boolean | undefined | null>,
	): Promise<T> {
		return this.request<T>("PUT", path, { body, query });
	}

	/**
	 * Performs a DELETE request.
	 *
	 * @param path - The API path.
	 * @param query - Optional query parameters.
	 * @returns `undefined` for 204 No Content responses, or parsed JSON otherwise.
	 * @throws {AlmaError} On non-2xx responses.
	 */
	async delete<T = void>(
		path: Path,
		query?: Record<string, string | number | boolean | undefined | null>,
	): Promise<T> {
		return this.request<T>("DELETE", path, { query });
	}
}
