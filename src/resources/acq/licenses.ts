import type { AlmaHttpClient } from "@/client";

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
export class AcqLicensesResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of licenses.
	 *
	 * @param params - Optional filters and pagination.
	 * @returns A list of licenses.
	 */
	async retrieveLicensesList(params?: {
		q?: string;
		limit?: number;
		offset?: number;
		order_by?: string;
		direction?: string;
	}): Promise<Licenses> {
		return this.client.get<Licenses>("/almaws/v1/acq/licenses/", params);
	}

	/**
	 * Retrieves a single license.
	 *
	 * @param licenseCode - The license code.
	 * @returns The license.
	 */
	async retrieveLicense(licenseCode: string): Promise<License> {
		return this.client.get<License>(
			`/almaws/v1/acq/licenses/${encodeURIComponent(licenseCode)}`,
		);
	}

	/**
	 * Creates a new license.
	 *
	 * @param body - The license data.
	 * @returns The created license.
	 */
	async createLicense(body: License): Promise<License> {
		return this.client.post<License>("/almaws/v1/acq/licenses", body);
	}

	/**
	 * Updates an existing license.
	 *
	 * @param licenseCode - The license code.
	 * @param body - The updated license data.
	 * @returns The updated license.
	 */
	async updateLicense(licenseCode: string, body: License): Promise<License> {
		return this.client.put<License>(
			`/almaws/v1/acq/licenses/${encodeURIComponent(licenseCode)}`,
			body,
		);
	}

	/**
	 * Deletes a license.
	 *
	 * @param licenseCode - The license code.
	 */
	async deleteLicense(licenseCode: string): Promise<void> {
		return this.client.delete<void>(
			`/almaws/v1/acq/licenses/${encodeURIComponent(licenseCode)}`,
		);
	}

	/**
	 * Retrieves all amendments for a license.
	 *
	 * @param licenseCode - The license code.
	 * @returns A list of amendments.
	 */
	async retrieveLicenseAmendmentsList(
		licenseCode: string,
	): Promise<LicenseAmendments> {
		return this.client.get<LicenseAmendments>(
			`/almaws/v1/acq/licenses/${encodeURIComponent(licenseCode)}/amendments`,
		);
	}

	/**
	 * Retrieves a single license amendment.
	 *
	 * @param licenseCode - The license code.
	 * @param amendmentCode - The amendment code.
	 * @returns The amendment.
	 */
	async retrieveLicenseAmendment(
		licenseCode: string,
		amendmentCode: string,
	): Promise<LicenseAmendment> {
		return this.client.get<LicenseAmendment>(
			`/almaws/v1/acq/licenses/${encodeURIComponent(licenseCode)}/amendments/${encodeURIComponent(amendmentCode)}`,
		);
	}

	/**
	 * Creates a new amendment on a license.
	 *
	 * @param licenseCode - The license code.
	 * @param body - The amendment data.
	 * @returns The created amendment.
	 */
	async createLicenseAmendment(
		licenseCode: string,
		body: LicenseAmendment,
	): Promise<LicenseAmendment> {
		return this.client.post<LicenseAmendment>(
			`/almaws/v1/acq/licenses/${encodeURIComponent(licenseCode)}/amendments`,
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
	 */
	async updateLicenseAmendment(
		licenseCode: string,
		amendmentCode: string,
		body: LicenseAmendment,
	): Promise<LicenseAmendment> {
		return this.client.put<LicenseAmendment>(
			`/almaws/v1/acq/licenses/${encodeURIComponent(licenseCode)}/amendments/${encodeURIComponent(amendmentCode)}`,
			body,
		);
	}

	/**
	 * Deletes a license amendment.
	 *
	 * @param licenseCode - The license code.
	 * @param amendmentCode - The amendment code.
	 */
	async deleteLicenseAmendment(
		licenseCode: string,
		amendmentCode: string,
	): Promise<void> {
		return this.client.delete<void>(
			`/almaws/v1/acq/licenses/${encodeURIComponent(licenseCode)}/amendments/${encodeURIComponent(amendmentCode)}`,
		);
	}

	/**
	 * Retrieves all attachments for a license.
	 *
	 * @param licenseCode - The license code.
	 * @returns A list of license attachments.
	 */
	async retrieveLicenseAttachmentsList(
		licenseCode: string,
	): Promise<LicenseAttachments> {
		return this.client.get<LicenseAttachments>(
			`/almaws/v1/acq/licenses/${encodeURIComponent(licenseCode)}/attachments`,
		);
	}

	/**
	 * Retrieves a single license attachment.
	 *
	 * @param licenseCode - The license code.
	 * @param attachmentId - The attachment ID.
	 * @returns The attachment.
	 */
	async retrieveLicenseAttachment(
		licenseCode: string,
		attachmentId: string,
	): Promise<LicenseAttachment> {
		return this.client.get<LicenseAttachment>(
			`/almaws/v1/acq/licenses/${encodeURIComponent(licenseCode)}/attachments/${encodeURIComponent(attachmentId)}`,
		);
	}

	/**
	 * Creates a license attachment.
	 *
	 * @param licenseCode - The license code.
	 * @param body - The attachment data.
	 * @returns The created attachment.
	 */
	async createLicenseAttachment(
		licenseCode: string,
		body: LicenseAttachment,
	): Promise<LicenseAttachment> {
		return this.client.post<LicenseAttachment>(
			`/almaws/v1/acq/licenses/${encodeURIComponent(licenseCode)}/attachments`,
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
	 */
	async updateLicenseAttachment(
		licenseCode: string,
		attachmentId: string,
		body: LicenseAttachment,
	): Promise<LicenseAttachment> {
		return this.client.put<LicenseAttachment>(
			`/almaws/v1/acq/licenses/${encodeURIComponent(licenseCode)}/attachments/${encodeURIComponent(attachmentId)}`,
			body,
		);
	}

	/**
	 * Deletes a license attachment.
	 *
	 * @param licenseCode - The license code.
	 * @param attachmentId - The attachment ID.
	 */
	async deleteLicenseAttachment(
		licenseCode: string,
		attachmentId: string,
	): Promise<void> {
		return this.client.delete<void>(
			`/almaws/v1/acq/licenses/${encodeURIComponent(licenseCode)}/attachments/${encodeURIComponent(attachmentId)}`,
		);
	}
}
