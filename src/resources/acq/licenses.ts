import type { AlmaHttpClient } from "@/client";
import { path } from "@/util/uri";

import type {
	License,
	LicenseAmendment,
	LicenseAmendments,
	LicenseAttachment,
	LicenseAttachments,
	Licenses,
} from "./types";

/**
 * Methods for managing licenses, amendments, and attachments
 * in the Alma Acquisitions API.
 */
export class LicensesResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of licenses.
	 *
	 * @param params - Optional filters and pagination.
	 * @returns A list of licenses.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL2xpY2Vuc2VzLw==/
	 */
	async getLicenses(params?: {
		q?: string;
		status?: "ALL" | "ACTIVE" | "DELETED" | "DRAFT" | "EXPIRED" | "RETIRED";
		type?: "LICENSE" | "NEGOTIATION" | "ADDENDUM" | "ALL";
		review_status?: string;
		limit?: number;
		offset?: number;
		expand?: "none" | "attachments";
		create_date_from?: string;
		create_date_to?: string;
		modify_date_from?: string;
		modify_date_to?: string;
	}): Promise<Licenses> {
		return this.client.get<Licenses>("/acq/licenses/", params);
	}

	/**
	 * Retrieves a single license.
	 *
	 * @param licenseCode - The license code.
	 * @returns The license.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL2xpY2Vuc2VzL3tsaWNlbnNlX2NvZGV9/
	 */
	async getLicense(
		licenseCode: string,
		params?: {
			expand?: "none" | "attachments";
			include_blank_terms?: string;
		},
	): Promise<License> {
		return this.client.get<License>(path`/acq/licenses/${licenseCode}`, params);
	}

	/**
	 * Creates a new license.
	 *
	 * @param body - The license data.
	 * @returns The created license.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UE9TVCAvYWxtYXdzL3YxL2FjcS9saWNlbnNlcw==/
	 */
	async createLicense(body: License): Promise<License> {
		return this.client.post<License>("/acq/licenses", body);
	}

	/**
	 * Updates an existing license.
	 *
	 * @param licenseCode - The license code.
	 * @param body - The updated license data.
	 * @returns The updated license.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UFVUIC9hbG1hd3MvdjEvYWNxL2xpY2Vuc2VzL3tsaWNlbnNlX2NvZGV9/
	 */
	async updateLicense(licenseCode: string, body: License): Promise<License> {
		return this.client.put<License>(path`/acq/licenses/${licenseCode}`, body);
	}

	/**
	 * Deletes a license.
	 *
	 * @param licenseCode - The license code.
	 * @param params - Optional parameters.
	 * @param params.permanent_delete - Indication whether to permanently delete the license from Alma. When set to false, the license will get the status Inactive.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/REVMRVRFIC9hbG1hd3MvdjEvYWNxL2xpY2Vuc2VzL3tsaWNlbnNlX2NvZGV9/
	 */
	async deleteLicense(
		licenseCode: string,
		params?: { permanent_delete?: boolean },
	): Promise<void> {
		return this.client.delete<void>(path`/acq/licenses/${licenseCode}`, params);
	}

	/**
	 * Retrieves all amendments for a license.
	 *
	 * @param licenseCode - The license code.
	 * @returns A list of amendments.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL2xpY2Vuc2VzL3tsaWNlbnNlX2NvZGV9L2FtZW5kbWVudHM=/
	 */
	async getLicenseAmendments(licenseCode: string): Promise<LicenseAmendments> {
		return this.client.get<LicenseAmendments>(
			path`/acq/licenses/${licenseCode}/amendments`,
		);
	}

	/**
	 * Retrieves a single license amendment.
	 *
	 * @param licenseCode - The license code.
	 * @param amendmentCode - The amendment code.
	 * @returns The amendment.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL2xpY2Vuc2VzL3tsaWNlbnNlX2NvZGV9L2FtZW5kbWVudHMve2FtZW5kbWVudF9jb2RlfQ==/
	 */
	async getLicenseForCodeAndAmendment(
		licenseCode: string,
		amendmentCode: string,
	): Promise<LicenseAmendment> {
		return this.client.get<LicenseAmendment>(
			path`/acq/licenses/${licenseCode}/amendments/${amendmentCode}`,
		);
	}

	/**
	 * Creates a new amendment on a license.
	 *
	 * @param licenseCode - The license code.
	 * @param body - The amendment data.
	 * @returns The created amendment.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UE9TVCAvYWxtYXdzL3YxL2FjcS9saWNlbnNlcy97bGljZW5zZV9jb2RlfS9hbWVuZG1lbnRz/
	 */
	async createLicenseAmendment(
		licenseCode: string,
		body: LicenseAmendment,
	): Promise<LicenseAmendment> {
		return this.client.post<LicenseAmendment>(
			path`/acq/licenses/${licenseCode}/amendments`,
			body,
		);
	}

	/**
	 * Updates a license amendment.
	 *
	 * @param licenseCode - The license code.
	 * @param amendmentCode - The amendment code.
	 * @param body - The updated amendment data.
	 * @returns The updated amendment.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UFVUIC9hbG1hd3MvdjEvYWNxL2xpY2Vuc2VzL3tsaWNlbnNlX2NvZGV9L2FtZW5kbWVudHMve2FtZW5kbWVudF9jb2RlfQ==/
	 */
	async updateLicenseAmendment(
		licenseCode: string,
		amendmentCode: string,
		body: LicenseAmendment,
	): Promise<LicenseAmendment> {
		return this.client.put<LicenseAmendment>(
			path`/acq/licenses/${licenseCode}/amendments/${amendmentCode}`,
			body,
		);
	}

	/**
	 * Deletes a license amendment.
	 *
	 * @param licenseCode - The license code.
	 * @param amendmentCode - The amendment code.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/REVMRVRFIC9hbG1hd3MvdjEvYWNxL2xpY2Vuc2VzL3tsaWNlbnNlX2NvZGV9L2FtZW5kbWVudHMve2FtZW5kbWVudF9jb2RlfQ==/
	 */
	async deleteLicenseAmendment(
		licenseCode: string,
		amendmentCode: string,
	): Promise<void> {
		return this.client.delete<void>(
			path`/acq/licenses/${licenseCode}/amendments/${amendmentCode}`,
		);
	}

	/**
	 * Retrieves all attachments for a license.
	 *
	 * @param licenseCode - The license code.
	 * @returns A list of license attachments.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL2xpY2Vuc2VzL3tsaWNlbnNlX2NvZGV9L2F0dGFjaG1lbnRz/
	 */
	async getLicenseAttachments(
		licenseCode: string,
		params?: { limit?: number; offset?: number },
	): Promise<LicenseAttachments> {
		return this.client.get<LicenseAttachments>(
			path`/acq/licenses/${licenseCode}/attachments`,
			params,
		);
	}

	/**
	 * Retrieves a single license attachment.
	 *
	 * @param licenseCode - The license code.
	 * @param attachmentId - The attachment ID.
	 * @returns The attachment.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL2xpY2Vuc2VzL3tsaWNlbnNlX2NvZGV9L2F0dGFjaG1lbnRzL3thdHRhY2htZW50X2lkfQ==/
	 */
	async getLicensesAttachment(
		licenseCode: string,
		attachmentId: string,
		params?: { expand?: string },
	): Promise<LicenseAttachment> {
		return this.client.get<LicenseAttachment>(
			path`/acq/licenses/${licenseCode}/attachments/${attachmentId}`,
			params,
		);
	}

	/**
	 * Creates a license attachment.
	 *
	 * @param licenseCode - The license code.
	 * @param body - The attachment data.
	 * @returns The created attachment.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UE9TVCAvYWxtYXdzL3YxL2FjcS9saWNlbnNlcy97bGljZW5zZV9jb2RlfS9hdHRhY2htZW50cw==/
	 */
	async createLicensesAttachment(
		licenseCode: string,
		body: LicenseAttachment,
	): Promise<LicenseAttachment> {
		return this.client.post<LicenseAttachment>(
			path`/acq/licenses/${licenseCode}/attachments`,
			body,
		);
	}

	/**
	 * Updates a license attachment.
	 *
	 * @param licenseCode - The license code.
	 * @param attachmentId - The attachment ID.
	 * @param body - The updated attachment data.
	 * @returns The updated attachment.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UFVUIC9hbG1hd3MvdjEvYWNxL2xpY2Vuc2VzL3tsaWNlbnNlX2NvZGV9L2F0dGFjaG1lbnRzL3thdHRhY2htZW50X2lkfQ==/
	 */
	async updateLicensesAttachment(
		licenseCode: string,
		attachmentId: string,
		body: LicenseAttachment,
	): Promise<LicenseAttachment> {
		return this.client.put<LicenseAttachment>(
			path`/acq/licenses/${licenseCode}/attachments/${attachmentId}`,
			body,
		);
	}

	/**
	 * Deletes a license attachment.
	 *
	 * @param licenseCode - The license code.
	 * @param attachmentId - The attachment ID.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/REVMRVRFIC9hbG1hd3MvdjEvYWNxL2xpY2Vuc2VzL3tsaWNlbnNlX2NvZGV9L2F0dGFjaG1lbnRzL3thdHRhY2htZW50X2lkfQ==/
	 */
	async deleteLicensesAttachment(
		licenseCode: string,
		attachmentId: string,
	): Promise<void> {
		return this.client.delete<void>(
			path`/acq/licenses/${licenseCode}/attachments/${attachmentId}`,
		);
	}
}
