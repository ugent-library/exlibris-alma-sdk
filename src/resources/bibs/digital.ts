import type { AlmaHttpClient } from "@/client";

import type {
	ElectronicCollection,
	ElectronicCollections,
	Representation,
	RepresentationFile,
	RepresentationFiles,
	Representations,
} from "./types";

/**
 * Methods for managing digital representations, files, and electronic
 * collections in the Alma Bibliographic API.
 */
export class BibsDigitalResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of digital representations for a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param params - Optional filters.
	 * @param params.originating_record_id - Filter by originating record ID.
	 * @param params.limit - Maximum results.
	 * @param params.offset - Results offset.
	 * @returns A list of representations.
	 */
	async retrieveRepresentationsList(
		mmsId: string,
		params?: {
			originating_record_id?: string;
			limit?: number;
			offset?: number;
		},
	): Promise<Representations> {
		return this.client.get<Representations>(
			`/bibs/${encodeURIComponent(mmsId)}/representations`,
			params,
		);
	}

	/**
	 * Retrieves a single digital representation.
	 *
	 * @param mmsId - The MMS ID.
	 * @param repId - The representation ID.
	 * @param params - Optional parameters.
	 * @param params.use_updated_terminology - Whether to use updated terminology.
	 * @returns The representation.
	 */
	async retrieveRepresentation(
		mmsId: string,
		repId: string,
		params?: { use_updated_terminology?: boolean },
	): Promise<Representation> {
		return this.client.get<Representation>(
			`/bibs/${encodeURIComponent(mmsId)}/representations/${encodeURIComponent(repId)}`,
			params,
		);
	}

	/**
	 * Creates a new digital representation.
	 *
	 * @param mmsId - The MMS ID.
	 * @param body - The representation data.
	 * @returns The created representation.
	 */
	async createRepresentation(
		mmsId: string,
		body: Representation,
	): Promise<Representation> {
		return this.client.post<Representation>(
			`/bibs/${encodeURIComponent(mmsId)}/representations`,
			body,
		);
	}

	/**
	 * Updates a digital representation.
	 *
	 * @param mmsId - The MMS ID.
	 * @param repId - The representation ID.
	 * @param body - The updated representation.
	 * @returns The updated representation.
	 */
	async updateRepresentation(
		mmsId: string,
		repId: string,
		body: Representation,
	): Promise<Representation> {
		return this.client.put<Representation>(
			`/bibs/${encodeURIComponent(mmsId)}/representations/${encodeURIComponent(repId)}`,
			body,
		);
	}

	/**
	 * Deletes a digital representation.
	 *
	 * @param mmsId - The MMS ID.
	 * @param repId - The representation ID.
	 * @param params - Optional parameters.
	 */
	async deleteRepresentation(
		mmsId: string,
		repId: string,
		params?: { override?: string },
	): Promise<void> {
		return this.client.delete<void>(
			`/bibs/${encodeURIComponent(mmsId)}/representations/${encodeURIComponent(repId)}`,
			params,
		);
	}

	/**
	 * Retrieves a list of files in a digital representation.
	 *
	 * @param mmsId - The MMS ID.
	 * @param repId - The representation ID.
	 * @param params - Optional pagination.
	 * @returns A list of representation files.
	 */
	async retrieveRepresentationFilesList(
		mmsId: string,
		repId: string,
		params?: { limit?: number; offset?: number },
	): Promise<RepresentationFiles> {
		return this.client.get<RepresentationFiles>(
			`/bibs/${encodeURIComponent(mmsId)}/representations/${encodeURIComponent(repId)}/files`,
			params,
		);
	}

	/**
	 * Retrieves a single file in a representation.
	 *
	 * @param mmsId - The MMS ID.
	 * @param repId - The representation ID.
	 * @param fileId - The file ID.
	 * @param params - Optional parameters.
	 * @param params.expand - Expand the response.
	 * @returns The representation file.
	 */
	async retrieveRepresentationFile(
		mmsId: string,
		repId: string,
		fileId: string,
		params?: { expand?: string },
	): Promise<RepresentationFile> {
		return this.client.get<RepresentationFile>(
			`/bibs/${encodeURIComponent(mmsId)}/representations/${encodeURIComponent(repId)}/files/${encodeURIComponent(fileId)}`,
			params,
		);
	}

	/**
	 * Creates a new file in a representation.
	 *
	 * @param mmsId - The MMS ID.
	 * @param repId - The representation ID.
	 * @param body - The file data.
	 * @returns The created file.
	 */
	async createRepresentationFile(
		mmsId: string,
		repId: string,
		body: RepresentationFile,
	): Promise<RepresentationFile> {
		return this.client.post<RepresentationFile>(
			`/bibs/${encodeURIComponent(mmsId)}/representations/${encodeURIComponent(repId)}/files`,
			body,
		);
	}

	/**
	 * Updates a file in a representation.
	 *
	 * @param mmsId - The MMS ID.
	 * @param repId - The representation ID.
	 * @param fileId - The file ID.
	 * @param body - The updated file data.
	 * @returns The updated file.
	 */
	async updateRepresentationFile(
		mmsId: string,
		repId: string,
		fileId: string,
		body: RepresentationFile,
	): Promise<RepresentationFile> {
		return this.client.put<RepresentationFile>(
			`/bibs/${encodeURIComponent(mmsId)}/representations/${encodeURIComponent(repId)}/files/${encodeURIComponent(fileId)}`,
			body,
		);
	}

	/**
	 * Deletes a file from a representation.
	 *
	 * @param mmsId - The MMS ID.
	 * @param repId - The representation ID.
	 * @param fileId - The file ID.
	 */
	async deleteRepresentationFile(
		mmsId: string,
		repId: string,
		fileId: string,
	): Promise<void> {
		return this.client.delete<void>(
			`/bibs/${encodeURIComponent(mmsId)}/representations/${encodeURIComponent(repId)}/files/${encodeURIComponent(fileId)}`,
		);
	}

	/**
	 * Retrieves a list of electronic collections linked to a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param params - Optional pagination.
	 * @returns A list of electronic collections.
	 */
	async retrieveECollectionsList(
		mmsId: string,
		params?: { limit?: number; offset?: number },
	): Promise<ElectronicCollections> {
		return this.client.get<ElectronicCollections>(
			`/bibs/${encodeURIComponent(mmsId)}/e-collections`,
			params,
		);
	}

	/**
	 * Retrieves a single electronic collection linked to a bib record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param collectionId - The e-collection ID.
	 * @returns The electronic collection.
	 */
	async retrieveECollection(
		mmsId: string,
		collectionId: string,
	): Promise<ElectronicCollection> {
		return this.client.get<ElectronicCollection>(
			`/bibs/${encodeURIComponent(mmsId)}/e-collections/${encodeURIComponent(collectionId)}`,
		);
	}
}
