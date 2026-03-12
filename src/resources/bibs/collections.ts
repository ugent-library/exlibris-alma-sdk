import type { AlmaHttpClient } from "../../client.ts";
import type { Bibs, Collection, Collections } from "./types.ts";

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
	 * @param params.query - Search query.
	 * @param params.limit - Maximum results.
	 * @param params.offset - Results offset.
	 * @returns A list of collections.
	 */
	async retrieveCollectionsList(params?: {
		level?: number;
		query?: string;
		limit?: number;
		offset?: number;
	}): Promise<Collections> {
		return this.client.get<Collections>("/almaws/v1/bibs/collections", params);
	}

	/**
	 * Retrieves a single collection.
	 *
	 * @param pid - The collection PID.
	 * @returns The collection.
	 */
	async retrieveCollection(pid: string): Promise<Collection> {
		return this.client.get<Collection>(
			`/almaws/v1/bibs/collections/${encodeURIComponent(pid)}`,
		);
	}

	/**
	 * Creates a new collection.
	 *
	 * @param body - The collection data.
	 * @returns The created collection.
	 */
	async createCollection(body: Collection): Promise<Collection> {
		return this.client.post<Collection>("/almaws/v1/bibs/collections", body);
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
			`/almaws/v1/bibs/collections/${encodeURIComponent(pid)}`,
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
			`/almaws/v1/bibs/collections/${encodeURIComponent(pid)}`,
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
			`/almaws/v1/bibs/collections/${encodeURIComponent(pid)}/bibs`,
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
			`/almaws/v1/bibs/collections/${encodeURIComponent(pid)}/bibs`,
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
			`/almaws/v1/bibs/collections/${encodeURIComponent(pid)}/bibs/${encodeURIComponent(mmsId)}`,
		);
	}
}
