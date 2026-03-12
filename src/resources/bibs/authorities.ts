import type { AlmaHttpClient } from "@/client";

import type { Authorities, Authority } from "./types";

/**
 * Methods for managing authority records in the Alma Bibliographic API.
 */
export class BibsAuthoritiesResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of authority records.
	 *
	 * @param params - Optional filters and pagination.
	 * @param params.originating_system - Filter by originating system.
	 * @param params.originating_system_id - Filter by ID in the originating system.
	 * @param params.other_system_id - Filter by another system's ID.
	 * @param params.limit - Maximum results.
	 * @param params.offset - Results offset.
	 * @param params.view - View type.
	 * @returns A list of authority records.
	 */
	async retrieveAuthorities(params?: {
		originating_system?: string;
		originating_system_id?: string;
		other_system_id?: string;
		limit?: number;
		offset?: number;
		view?: string;
	}): Promise<Authorities> {
		return this.client.get<Authorities>("/bibs/authorities", params);
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
			`/bibs/authorities/${encodeURIComponent(authorityRecordId)}`,
			params,
		);
	}

	/**
	 * Creates a new authority record.
	 *
	 * @param body - The authority record data.
	 * @param params - Optional parameters.
	 * @param params.normalization - Normalization profile to run.
	 * @param params.validate - Whether to validate the record.
	 * @param params.override_warning - Whether to override validation warnings.
	 * @param params.check_match - Whether to check for duplicate matches.
	 * @param params.import_profile - Import profile to use.
	 * @returns The created authority record.
	 */
	async createAuthority(
		body: Authority,
		params?: {
			normalization?: string;
			validate?: boolean;
			override_warning?: boolean;
			check_match?: boolean;
			import_profile?: string;
		},
	): Promise<Authority> {
		return this.client.post<Authority>("/bibs/authorities", body, params);
	}

	/**
	 * Updates an existing authority record.
	 *
	 * @param authorityRecordId - The authority record ID.
	 * @param body - The updated authority data.
	 * @param params - Optional parameters.
	 * @param params.normalization - Normalization profile to run.
	 * @param params.validate - Whether to validate the record.
	 * @param params.override_warning - Whether to override validation warnings.
	 * @param params.override_lock - Whether to override a record lock.
	 * @param params.stale_version_check - Whether to check for stale version.
	 * @param params.cataloger_level - Minimum cataloger level required.
	 * @param params.check_match - Whether to check for duplicate matches.
	 * @returns The updated authority record.
	 */
	async updateAuthority(
		authorityRecordId: string,
		body: Authority,
		params?: {
			normalization?: string;
			validate?: boolean;
			override_warning?: boolean;
			override_lock?: boolean;
			stale_version_check?: boolean;
			cataloger_level?: string;
			check_match?: boolean;
		},
	): Promise<Authority> {
		return this.client.put<Authority>(
			`/bibs/authorities/${encodeURIComponent(authorityRecordId)}`,
			body,
			params,
		);
	}

	/**
	 * Deletes an authority record.
	 *
	 * @param authorityRecordId - The authority record ID.
	 * @param params - Optional parameters.
	 * @param params.override - Override deletion warnings.
	 * @param params.cataloger_level - Minimum cataloger level required.
	 */
	async deleteAuthority(
		authorityRecordId: string,
		params?: { override?: string; cataloger_level?: string },
	): Promise<void> {
		return this.client.delete<void>(
			`/bibs/authorities/${encodeURIComponent(authorityRecordId)}`,
			params,
		);
	}
}
