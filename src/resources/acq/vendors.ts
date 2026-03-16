import type { AlmaHttpClient } from "@/client";
import { path } from "@/util/uri";

import type { Invoices, PoLines, Vendor, Vendors } from "./types";

/**
 * Methods for managing vendors in the Alma Acquisitions API.
 */
export class AcqVendorsResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of vendors.
	 *
	 * @param params - Optional filters and pagination.
	 * @returns A list of vendors.
	 */
	async retrieveVendorsList(params?: {
		q?: string;
		limit?: number;
		offset?: number;
		order_by?: string;
		direction?: string;
		status?: string;
		type?: string;
	}): Promise<Vendors> {
		return this.client.get<Vendors>("/acq/vendors", params);
	}

	/**
	 * Retrieves a single vendor.
	 *
	 * @param vendorCode - The vendor code.
	 * @returns The vendor.
	 */
	async retrieveVendor(vendorCode: string): Promise<Vendor> {
		return this.client.get<Vendor>(path`/acq/vendors/${vendorCode}`);
	}

	/**
	 * Creates a new vendor.
	 *
	 * @param body - The vendor data.
	 * @returns The created vendor.
	 */
	async createVendor(body: Vendor): Promise<Vendor> {
		return this.client.post<Vendor>("/acq/vendors", body);
	}

	/**
	 * Updates an existing vendor.
	 *
	 * @param vendorCode - The vendor code.
	 * @param body - The updated vendor data.
	 * @returns The updated vendor.
	 */
	async updateVendor(vendorCode: string, body: Vendor): Promise<Vendor> {
		return this.client.put<Vendor>(path`/acq/vendors/${vendorCode}`, body);
	}

	/**
	 * Deletes a vendor.
	 *
	 * @param vendorCode - The vendor code.
	 */
	async deleteVendor(vendorCode: string): Promise<void> {
		return this.client.delete<void>(path`/acq/vendors/${vendorCode}`);
	}

	/**
	 * Retrieves a list of invoices for a vendor.
	 *
	 * @param vendorCode - The vendor code.
	 * @param params - Optional pagination.
	 * @returns A list of invoices for the vendor.
	 */
	async retrieveVendorInvoicesList(
		vendorCode: string,
		params?: { limit?: number; offset?: number },
	): Promise<Invoices> {
		return this.client.get<Invoices>(
			path`/acq/vendors/${vendorCode}/invoices`,
			params,
		);
	}

	/**
	 * Retrieves a list of PO lines for a vendor.
	 *
	 * @param vendorCode - The vendor code.
	 * @param params - Optional pagination.
	 * @returns A list of PO lines for the vendor.
	 */
	async retrieveVendorPoLinesList(
		vendorCode: string,
		params?: { limit?: number; offset?: number },
	): Promise<PoLines> {
		return this.client.get<PoLines>(
			path`/acq/vendors/${vendorCode}/po-lines`,
			params,
		);
	}
}
