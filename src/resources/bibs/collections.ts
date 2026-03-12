import type { AlmaHttpClient } from "@/client";

import type { Bibs, Collection, Collections } from "./types";

/**
 * Methods for managing physical collections and their bibliographic records
 * in the Alma Bibliographic API.
 */
export class BibsCollectionsResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of physical collections.
	 *
	 * @param params - Optional filters.
	 * @param params.level - Collection level (1 for top-level).
	 * @param params.q - Search query.
	 * @returns A list of collections.
	 */
	async retrieveCollectionsList(params?: {
		level?: string;
		q?: string;
	}): Promise<Collections> {
		return this.client.get<Collections>("/bibs/collections", params);
	}

	/**
	 * Retrieves a single collection.
	 *
	 * @param pid - The collection PID.
	 * @param params - Optional parameters.
	 * @param params.level - Depth level of sub-collections to include.
	 * @returns The collection.
	 */
	async retrieveCollection(
		pid: string,
		params?: { level?: string },
	): Promise<Collection> {
		return this.client.get<Collection>(
			`/bibs/collections/${encodeURIComponent(pid)}`,
			params,
		);
	}

	/**
	 * Creates a new collection.
	 *
	 * @param body - The collection data.
	 * @param params - Optional parameters.
	 * @param params.record_format - The record format to use.
	 * @returns The created collection.
	 */
	async createCollection(
		body: Collection,
		params?: { record_format?: string },
	): Promise<Collection> {
		return this.client.post<Collection>("/bibs/collections", body, params);
	}

	/**
	 * Updates a collection.
	 *
	 * @param pid - The collection PID.
	 * @param body - The updated collection data.
	 * @returns The updated collection.
	 */
	async updateCollection(pid: string, body: Collection): Promise<Collection> {
		return this.client.put<Collection>(
			`/bibs/collections/${encodeURIComponent(pid)}`,
			body,
		);
	}

	/**
	 * Deletes a collection.
	 *
	 * @param pid - The collection PID.
	 */
	async deleteCollection(pid: string): Promise<void> {
		return this.client.delete<void>(
			`/bibs/collections/${encodeURIComponent(pid)}`,
		);
	}

	/**
	 * Retrieves a list of bibliographic records in a collection.
	 *
	 * @param pid - The collection PID.
	 * @param params - Optional pagination.
	 * @returns A list of bibliographic records.
	 */
	async retrieveCollectionBibsList(
		pid: string,
		params?: { limit?: number; offset?: number },
	): Promise<Bibs> {
		return this.client.get<Bibs>(
			`/bibs/collections/${encodeURIComponent(pid)}/bibs`,
			params,
		);
	}

	/**
	 * Adds a bibliographic record to a collection.
	 *
	 * @param pid - The collection PID.
	 * @param body - The bib record to add.
	 * @returns The added bib record.
	 */
	async addBibToCollection(
		pid: string,
		body: Record<string, unknown>,
	): Promise<Record<string, unknown>> {
		return this.client.post<Record<string, unknown>>(
			`/bibs/collections/${encodeURIComponent(pid)}/bibs`,
			body,
		);
	}

	/**
	 * Removes a bibliographic record from a collection.
	 *
	 * @param pid - The collection PID.
	 * @param mmsId - The MMS ID of the bib record to remove.
	 */
	async removeBibFromCollection(pid: string, mmsId: string): Promise<void> {
		return this.client.delete<void>(
			`/bibs/collections/${encodeURIComponent(pid)}/bibs/${encodeURIComponent(mmsId)}`,
		);
	}
}
