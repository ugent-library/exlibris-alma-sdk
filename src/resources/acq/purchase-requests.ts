import type { AlmaHttpClient } from "@/client";
import { path } from "@/util/uri";

import type { PurchaseRequest, PurchaseRequests } from "./types";

/**
 * Methods for miscellaneous acquisitions resources: currencies, fiscal periods,
 * purchase requests, and the API test endpoint.
 */
export class PurchaseRequestsResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of purchase requests.
	 *
	 * @param params - Optional filters and pagination.
	 * @returns A list of purchase requests.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL3B1cmNoYXNlLXJlcXVlc3RzLw==/
	 */
	async retrievePurchaseRequestsList(params?: {
		format?: string;
		owning_library?: string;
		status?: string;
		citation_type?: string;
		limit?: number;
		offset?: number;
	}): Promise<PurchaseRequests> {
		return this.client.get<PurchaseRequests>("/acq/purchase-requests/", params);
	}

	/**
	 * Retrieves a single purchase request.
	 *
	 * @param id - The purchase request ID.
	 * @returns The purchase request.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL3B1cmNoYXNlLXJlcXVlc3RzL3tpZH0=/
	 */
	async retrievePurchaseRequest(id: string): Promise<PurchaseRequest> {
		return this.client.get<PurchaseRequest>(path`/acq/purchase-requests/${id}`);
	}

	/**
	 * Performs an action on a purchase request.
	 *
	 * @param id - The purchase request ID.
	 * @param body - The operation body.
	 * @param params - Optional parameters.
	 * @param params.op - The operation to perform.
	 * @returns The resulting purchase request.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UE9TVCAvYWxtYXdzL3YxL2FjcS9wdXJjaGFzZS1yZXF1ZXN0cy97aWR9/
	 */
	async operatePurchaseRequest(
		id: string,
		body: PurchaseRequest,
		params?: { op?: string },
	): Promise<PurchaseRequest> {
		return this.client.post<PurchaseRequest>(
			path`/acq/purchase-requests/${id}`,
			body,
			params,
		);
	}

	/**
	 * Updates a purchase request.
	 *
	 * @param id - The purchase request ID.
	 * @param body - The updated purchase request data.
	 * @returns The updated purchase request.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UFVUIC9hbG1hd3MvdjEvYWNxL3B1cmNoYXNlLXJlcXVlc3RzL3tpZH0=/
	 */
	async updatePurchaseRequest(
		id: string,
		body: PurchaseRequest,
	): Promise<PurchaseRequest> {
		return this.client.put<PurchaseRequest>(
			path`/acq/purchase-requests/${id}`,
			body,
		);
	}

	/**
	 * Deletes a purchase request.
	 *
	 * @param id - The purchase request ID.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/REVMRVRFIC9hbG1hd3MvdjEvYWNxL3B1cmNoYXNlLXJlcXVlc3RzL3tpZH0=/
	 */
	async deletePurchaseRequest(id: string): Promise<void> {
		return this.client.delete<void>(path`/acq/purchase-requests/${id}`);
	}
}
