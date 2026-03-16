import type { AlmaHttpClient } from "@/client";
import { path } from "@/util/uri";

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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/R0VUIC9hbG1hd3MvdjEvYmlicy9jb2xsZWN0aW9ucw==/
	 */
	async retrieveCollections(params?: {
		level?: number;
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/R0VUIC9hbG1hd3MvdjEvYmlicy9jb2xsZWN0aW9ucy97cGlkfQ==/
	 */
	async retrieveCollection(
		pid: string,
		params?: { level?: string },
	): Promise<Collection> {
		return this.client.get<Collection>(path`/bibs/collections/${pid}`, params);
	}

	/**
	 * Creates a new collection.
	 *
	 * @param body - The collection data.
	 * @param params - Optional parameters.
	 * @param params.record_format - The record format to use.
	 * @returns The created collection.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/UE9TVCAvYWxtYXdzL3YxL2JpYnMvY29sbGVjdGlvbnM=/
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/UFVUIC9hbG1hd3MvdjEvYmlicy9jb2xsZWN0aW9ucy97cGlkfQ==/
	 */
	async updateCollection(pid: string, body: Collection): Promise<Collection> {
		return this.client.put<Collection>(path`/bibs/collections/${pid}`, body);
	}

	/**
	 * Deletes a collection.
	 *
	 * @param pid - The collection PID.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/REVMRVRFIC9hbG1hd3MvdjEvYmlicy9jb2xsZWN0aW9ucy97cGlkfQ==/
	 */
	async deleteCollection(pid: string): Promise<void> {
		return this.client.delete<void>(path`/bibs/collections/${pid}`);
	}

	/**
	 * Retrieves a list of bibliographic records in a collection.
	 *
	 * @param pid - The collection PID.
	 * @param params - Optional pagination.
	 * @returns A list of bibliographic records.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/R0VUIC9hbG1hd3MvdjEvYmlicy9jb2xsZWN0aW9ucy97cGlkfS9iaWJz/
	 */
	async retrieveCollectionBibsList(
		pid: string,
		params?: { limit?: number; offset?: number },
	): Promise<Bibs> {
		return this.client.get<Bibs>(path`/bibs/collections/${pid}/bibs`, params);
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
			path`/bibs/collections/${pid}/bibs`,
			body,
		);
	}

	/**
	 * Removes a bibliographic record from a collection.
	 *
	 * @param pid - The collection PID.
	 * @param mmsId - The MMS ID of the bib record to remove.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/REVMRVRFIC9hbG1hd3MvdjEvYmlicy9jb2xsZWN0aW9ucy97cGlkfS9iaWJzL3ttbXNfaWR9/
	 */
	async removeBibFromCollection(pid: string, mmsId: string): Promise<void> {
		return this.client.delete<void>(
			path`/bibs/collections/${pid}/bibs/${mmsId}`,
		);
	}
}
