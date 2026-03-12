import type { AlmaHttpClient } from "@/client";

import type { AlmaSet, SetMembers, Sets } from "./types";

/**
 * Methods for managing sets and set members in the Alma Configuration API.
 *
 * Sets are used to group records for bulk operations.
 */
export class ConfSetsResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of sets.
	 *
	 * @param params - Optional filters.
	 * @param params.content_type - Content type filter (from SetContentType code table).
	 * @param params.set_type - Set type: `"ITEMIZED"` or `"LOGICAL"`.
	 * @param params.q - Search query (searches name or created_by).
	 * @param params.limit - Maximum results (0–100).
	 * @param params.offset - Results offset.
	 * @param params.set_origin - Origin filter: `"UI"` or `"UI_CZ"`.
	 * @returns A list of sets.
	 */
	async retrieveSets(params?: {
		content_type?: string;
		set_type?: string;
		q?: string;
		limit?: number;
		offset?: number;
		set_origin?: string;
	}): Promise<Sets> {
		return this.client.get<Sets>("/almaws/v1/conf/sets", params);
	}

	/**
	 * Retrieves a single set by its ID.
	 *
	 * @param setId - The set ID.
	 * @returns The set object.
	 */
	async retrieveSet(setId: string): Promise<AlmaSet> {
		return this.client.get<AlmaSet>(
			`/almaws/v1/conf/sets/${encodeURIComponent(setId)}`,
		);
	}

	/**
	 * Creates a new set.
	 *
	 * @param body - The set data.
	 * @param params - Optional creation parameters.
	 * @param params.population - Population on which to create the set.
	 * @param params.job_instance_id - MD Import Job instance ID to create a set from.
	 * @param params.from_logical_set - Logical set ID to create an itemized set from.
	 * @param params.combine - Logical operator: `"AND"`, `"OR"`, or `"NOT"`.
	 * @param params.set1 - Primary combining set ID.
	 * @param params.set2 - Secondary combining set ID.
	 * @returns The created set.
	 */
	async createSet(
		body: AlmaSet,
		params?: {
			population?: string;
			job_instance_id?: string;
			from_logical_set?: string;
			combine?: string;
			set1?: string;
			set2?: string;
			nz_set_from_iz_set?: string;
			filter_set?: string;
			indication_rule?: string;
		},
	): Promise<AlmaSet> {
		return this.client.post<AlmaSet>("/almaws/v1/conf/sets", body, params);
	}

	/**
	 * Updates a set.
	 *
	 * @param setId - The set ID.
	 * @param body - The updated set data.
	 * @returns The updated set.
	 */
	async updateSet(setId: string, body: AlmaSet): Promise<AlmaSet> {
		return this.client.put<AlmaSet>(
			`/almaws/v1/conf/sets/${encodeURIComponent(setId)}`,
			body,
		);
	}

	/**
	 * Performs an action on a set (e.g., add/remove members).
	 *
	 * @param setId - The set ID.
	 * @param body - The action body.
	 * @param params - Action parameters.
	 * @param params.op - The operation (e.g. `"add_members"`, `"delete_members"`).
	 * @returns The updated set.
	 */
	async operateSet(
		setId: string,
		body: Record<string, unknown>,
		params?: { op?: string; async?: boolean; job_name?: string },
	): Promise<AlmaSet> {
		return this.client.post<AlmaSet>(
			`/almaws/v1/conf/sets/${encodeURIComponent(setId)}`,
			body,
			params,
		);
	}

	/**
	 * Deletes a set.
	 *
	 * @param setId - The set ID.
	 */
	async deleteSet(setId: string): Promise<void> {
		return this.client.delete<void>(
			`/almaws/v1/conf/sets/${encodeURIComponent(setId)}`,
		);
	}

	/**
	 * Retrieves the members of a set.
	 *
	 * @param setId - The set ID.
	 * @param params - Optional pagination.
	 * @param params.limit - Maximum results.
	 * @param params.offset - Results offset.
	 * @returns Set members.
	 */
	async retrieveSetMembers(
		setId: string,
		params?: { limit?: number; offset?: number },
	): Promise<SetMembers> {
		return this.client.get<SetMembers>(
			`/almaws/v1/conf/sets/${encodeURIComponent(setId)}/members`,
			params,
		);
	}
}
