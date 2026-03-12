import type { AlmaHttpClient } from "../../client.ts";
import type { Authorities, Authority } from "./types.ts";

/**
 * Methods for managing authority records in the Alma Bibliographic API.
 */
export class BibsAuthoritiesResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of authority records.
	 *
	 * @param params - Search and pagination parameters.
	 * @param params.q - Search query.
	 * @param params.limit - Maximum results.
	 * @param params.offset - Results offset.
	 * @returns A list of authority records.
	 */
	async retrieveAuthoritiesList(params?: {
		q?: string;
		limit?: number;
		offset?: number;
	}): Promise<Authorities> {
		return this.client.get<Authorities>("/almaws/v1/bibs/authorities", params);
	}

	/**
	 * Retrieves a single authority record.
	 *
	 * @param authorityRecordId - The authority record ID.
	 * @param params - Optional parameters.
	 * @param params.view - View type.
	 * @returns The authority record.
	 */
	async retrieveAuthority(
		authorityRecordId: string,
		params?: { view?: string },
	): Promise<Authority> {
		return this.client.get<Authority>(
			`/almaws/v1/bibs/authorities/${encodeURIComponent(authorityRecordId)}`,
			params,
		);
	}

	/**
	 * Creates a new authority record.
	 *
	 * @param body - The authority record data.
	 * @returns The created authority record.
	 */
	async createAuthority(body: Authority): Promise<Authority> {
		return this.client.post<Authority>("/almaws/v1/bibs/authorities", body);
	}

	/**
	 * Updates an existing authority record.
	 *
	 * @param authorityRecordId - The authority record ID.
	 * @param body - The updated authority data.
	 * @returns The updated authority record.
	 */
	async updateAuthority(
		authorityRecordId: string,
		body: Authority,
	): Promise<Authority> {
		return this.client.put<Authority>(
			`/almaws/v1/bibs/authorities/${encodeURIComponent(authorityRecordId)}`,
			body,
		);
	}

	/**
	 * Deletes an authority record.
	 *
	 * @param authorityRecordId - The authority record ID.
	 */
	async deleteAuthority(authorityRecordId: string): Promise<void> {
		return this.client.delete<void>(
			`/almaws/v1/bibs/authorities/${encodeURIComponent(authorityRecordId)}`,
		);
	}
}
