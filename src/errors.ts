/**
 * Represents an error returned by the Alma API.
 *
 * When the API returns a non-2xx status code, an `AlmaError` is thrown with
 * the HTTP status, the error message, and the raw response body.
 *
 * @example
 * ```typescript
 * try {
 *   await client.conf.retrieveLibrary('INVALID');
 * } catch (err) {
 *   if (err instanceof AlmaUnauthorizedError) {
 *     console.error('Check your API key:', err.message);
 *   } else if (err instanceof AlmaError) {
 *     console.error(`API error ${err.status}:`, err.message, err.body);
 *   }
 * }
 * ```
 */
export class AlmaError extends Error {
	/** The HTTP status code returned by the Alma API. */
	readonly status: number;
	/** The raw response body (parsed JSON if available, otherwise string). */
	readonly body: unknown;

	constructor(status: number, message: string, body: unknown) {
		super(message);
		this.name = "AlmaError";
		this.status = status;
		this.body = body;
	}
}

/**
 * Thrown when the Alma API rejects the request due to missing or invalid
 * authentication. The Alma API returns an XML body for auth errors regardless
 * of the `Accept` header.
 *
 * @example
 * ```typescript
 * try {
 *   await client.conf.retrieveLibraries();
 * } catch (err) {
 *   if (err instanceof AlmaUnauthorizedError) {
 *     console.error('Invalid API key:', err.message);
 *   }
 * }
 * ```
 */
export class AlmaUnauthorizedError extends AlmaError {
	constructor(status: number, message: string, body: unknown) {
		super(status, message, body);
		this.name = "AlmaUnauthorizedError";
	}
}

/**
 * Extracts an error message from an Alma XML error response.
 * Alma returns XML for authentication errors even when `Accept: application/json` is set.
 *
 * Example XML:
 * ```xml
 * <web_service_result>
 *   <errorList>
 *     <error>
 *       <errorCode>401861</errorCode>
 *       <errorMessage>API Key Authentication...</errorMessage>
 *     </error>
 *   </errorList>
 * </web_service_result>
 * ```
 */
export function extractXmlErrorMessage(xml: string): string {
	const match = xml.match(/<errorMessage>([^<]+)<\/errorMessage>/);
	return match?.[1]?.trim() ?? "Unauthorized";
}
