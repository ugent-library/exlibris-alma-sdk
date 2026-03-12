import type { AlmaHttpClient } from "../../client.ts";
import type {
	Currencies,
	FiscalPeriods,
	PurchaseRequest,
	PurchaseRequests,
} from "./types.ts";

/**
 * Methods for miscellaneous acquisitions resources: currencies, fiscal periods,
 * purchase requests, and the API test endpoint.
 */
export class AcqMiscResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of currencies.
	 *
	 * @returns A list of currencies.
	 */
	async retrieveCurrencies(): Promise<Currencies> {
		return this.client.get<Currencies>("/almaws/v1/acq/currencies");
	}

	/**
	 * Retrieves a list of fiscal periods.
	 *
	 * @param params - Optional filters.
	 * @param params.library - Filter by library code.
	 * @returns A list of fiscal periods.
	 */
	async retrieveFiscalPeriods(params?: {
		library?: string;
	}): Promise<FiscalPeriods> {
		return this.client.get<FiscalPeriods>(
			"/almaws/v1/acq/fiscal-periods",
			params,
		);
	}

	/**
	 * Retrieves a list of purchase requests.
	 *
	 * @param params - Optional filters and pagination.
	 * @returns A list of purchase requests.
	 */
	async retrievePurchaseRequestsList(params?: {
		q?: string;
		limit?: number;
		offset?: number;
		status?: string;
	}): Promise<PurchaseRequests> {
		return this.client.get<PurchaseRequests>(
			"/almaws/v1/acq/purchase-requests/",
			params,
		);
	}

	/**
	 * Retrieves a single purchase request.
	 *
	 * @param id - The purchase request ID.
	 * @returns The purchase request.
	 */
	async retrievePurchaseRequest(id: string): Promise<PurchaseRequest> {
		return this.client.get<PurchaseRequest>(
			`/almaws/v1/acq/purchase-requests/${encodeURIComponent(id)}`,
		);
	}

	/**
	 * Performs an action on a purchase request.
	 *
	 * @param id - The purchase request ID.
	 * @param body - The operation body.
	 * @param params - Optional parameters.
	 * @param params.op - The operation to perform.
	 * @returns The resulting purchase request.
	 */
	async operatePurchaseRequest(
		id: string,
		body: PurchaseRequest,
		params?: { op?: string },
	): Promise<PurchaseRequest> {
		return this.client.post<PurchaseRequest>(
			`/almaws/v1/acq/purchase-requests/${encodeURIComponent(id)}`,
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
	 */
	async updatePurchaseRequest(
		id: string,
		body: PurchaseRequest,
	): Promise<PurchaseRequest> {
		return this.client.put<PurchaseRequest>(
			`/almaws/v1/acq/purchase-requests/${encodeURIComponent(id)}`,
			body,
		);
	}

	/**
	 * Deletes a purchase request.
	 *
	 * @param id - The purchase request ID.
	 */
	async deletePurchaseRequest(id: string): Promise<void> {
		return this.client.delete<void>(
			`/almaws/v1/acq/purchase-requests/${encodeURIComponent(id)}`,
		);
	}

	/**
	 * Tests the Alma Acquisitions API connection.
	 *
	 * @returns API response confirming access.
	 */
	async test(): Promise<unknown> {
		return this.client.get<unknown>("/almaws/v1/acq/test");
	}
}
