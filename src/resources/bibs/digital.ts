import type { AlmaHttpClient } from "@/client";
import { path } from "@/util/uri";

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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/R0VUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9yZXByZXNlbnRhdGlvbnM=/
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
			path`/bibs/${mmsId}/representations`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/R0VUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9yZXByZXNlbnRhdGlvbnMve3JlcF9pZH0=/
	 */
	async retrieveRepresentation(
		mmsId: string,
		repId: string,
		params?: { use_updated_terminology?: boolean },
	): Promise<Representation> {
		return this.client.get<Representation>(
			path`/bibs/${mmsId}/representations/${repId}`,
			params,
		);
	}

	/**
	 * Creates a new digital representation.
	 *
	 * @param mmsId - The MMS ID.
	 * @param body - The representation data.
	 * @returns The created representation.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/UE9TVCAvYWxtYXdzL3YxL2JpYnMve21tc19pZH0vcmVwcmVzZW50YXRpb25z/
	 */
	async createRepresentation(
		mmsId: string,
		body: Representation,
	): Promise<Representation> {
		return this.client.post<Representation>(
			path`/bibs/${mmsId}/representations`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/UFVUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9yZXByZXNlbnRhdGlvbnMve3JlcF9pZH0=/
	 */
	async updateRepresentation(
		mmsId: string,
		repId: string,
		body: Representation,
	): Promise<Representation> {
		return this.client.put<Representation>(
			path`/bibs/${mmsId}/representations/${repId}`,
			body,
		);
	}

	/**
	 * Deletes a digital representation.
	 *
	 * @param mmsId - The MMS ID.
	 * @param repId - The representation ID.
	 * @param params - Optional parameters.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/REVMRVRFIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9yZXByZXNlbnRhdGlvbnMve3JlcF9pZH0=/
	 */
	async deleteRepresentation(
		mmsId: string,
		repId: string,
		params?: { override?: string },
	): Promise<void> {
		return this.client.delete<void>(
			path`/bibs/${mmsId}/representations/${repId}`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/R0VUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9yZXByZXNlbnRhdGlvbnMve3JlcF9pZH0vZmlsZXM=/
	 */
	async retrieveRepresentationFilesList(
		mmsId: string,
		repId: string,
		params?: { limit?: number; offset?: number },
	): Promise<RepresentationFiles> {
		return this.client.get<RepresentationFiles>(
			path`/bibs/${mmsId}/representations/${repId}/files`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/R0VUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9yZXByZXNlbnRhdGlvbnMve3JlcF9pZH0vZmlsZXMve2ZpbGVfaWR9/
	 */
	async retrieveRepresentationFile(
		mmsId: string,
		repId: string,
		fileId: string,
		params?: { expand?: string },
	): Promise<RepresentationFile> {
		return this.client.get<RepresentationFile>(
			path`/bibs/${mmsId}/representations/${repId}/files/${fileId}`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/UE9TVCAvYWxtYXdzL3YxL2JpYnMve21tc19pZH0vcmVwcmVzZW50YXRpb25zL3tyZXBfaWR9L2ZpbGVz/
	 */
	async createRepresentationFile(
		mmsId: string,
		repId: string,
		body: RepresentationFile,
	): Promise<RepresentationFile> {
		return this.client.post<RepresentationFile>(
			path`/bibs/${mmsId}/representations/${repId}/files`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/UFVUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9yZXByZXNlbnRhdGlvbnMve3JlcF9pZH0vZmlsZXMve2ZpbGVfaWR9/
	 */
	async updateRepresentationFile(
		mmsId: string,
		repId: string,
		fileId: string,
		body: RepresentationFile,
	): Promise<RepresentationFile> {
		return this.client.put<RepresentationFile>(
			path`/bibs/${mmsId}/representations/${repId}/files/${fileId}`,
			body,
		);
	}

	/**
	 * Deletes a file from a representation.
	 *
	 * @param mmsId - The MMS ID.
	 * @param repId - The representation ID.
	 * @param fileId - The file ID.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/REVMRVRFIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9yZXByZXNlbnRhdGlvbnMve3JlcF9pZH0vZmlsZXMve2ZpbGVfaWR9/
	 */
	async deleteRepresentationFile(
		mmsId: string,
		repId: string,
		fileId: string,
	): Promise<void> {
		return this.client.delete<void>(
			path`/bibs/${mmsId}/representations/${repId}/files/${fileId}`,
		);
	}

	/**
	 * Retrieves a list of electronic collections linked to a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param params - Optional pagination.
	 * @returns A list of electronic collections.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/R0VUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9lLWNvbGxlY3Rpb25z/
	 */
	async retrieveECollectionsList(
		mmsId: string,
		params?: { limit?: number; offset?: number },
	): Promise<ElectronicCollections> {
		return this.client.get<ElectronicCollections>(
			path`/bibs/${mmsId}/e-collections`,
			params,
		);
	}

	/**
	 * Retrieves a single electronic collection linked to a bib record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param collectionId - The e-collection ID.
	 * @returns The electronic collection.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/R0VUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9lLWNvbGxlY3Rpb25zL3tjb2xsZWN0aW9uX2lkfQ==/
	 */
	async retrieveECollection(
		mmsId: string,
		collectionId: string,
	): Promise<ElectronicCollection> {
		return this.client.get<ElectronicCollection>(
			path`/bibs/${mmsId}/e-collections/${collectionId}`,
		);
	}
}
