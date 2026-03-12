import type { AlmaHttpClient } from "@/client";

import type {
	BibRequest,
	BibRequests,
	BookingAvailability,
	RequestOptions,
} from "./types";

/**
 * Methods for managing requests and request options for bibliographic records
 * and items in the Alma Bibliographic API.
 */
export class BibsRequestsResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of requests for a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param params - Optional filters.
	 * @param params.request_type - Request type filter.
	 * @param params.limit - Maximum results.
	 * @param params.offset - Results offset.
	 * @returns A list of requests.
	 */
	async retrieveBibRequestsList(
		mmsId: string,
		params?: { request_type?: string; limit?: number; offset?: number },
	): Promise<BibRequests> {
		return this.client.get<BibRequests>(
			`/bibs/${encodeURIComponent(mmsId)}/requests`,
			params,
		);
	}

	/**
	 * Retrieves a single request for a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param requestId - The request ID.
	 * @returns The request.
	 */
	async retrieveBibRequest(
		mmsId: string,
		requestId: string,
	): Promise<BibRequest> {
		return this.client.get<BibRequest>(
			`/bibs/${encodeURIComponent(mmsId)}/requests/${encodeURIComponent(requestId)}`,
		);
	}

	/**
	 * Creates a request for a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param body - The request data.
	 * @param params - Optional parameters.
	 * @param params.user_id - The requesting user ID.
	 * @returns The created request.
	 */
	async createBibRequest(
		mmsId: string,
		body: BibRequest,
		params?: { user_id?: string; user_id_type?: string },
	): Promise<BibRequest> {
		return this.client.post<BibRequest>(
			`/bibs/${encodeURIComponent(mmsId)}/requests`,
			body,
			params,
		);
	}

	/**
	 * Updates a request for a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param requestId - The request ID.
	 * @param body - The updated request data.
	 * @returns The updated request.
	 */
	async updateBibRequest(
		mmsId: string,
		requestId: string,
		body: BibRequest,
	): Promise<BibRequest> {
		return this.client.put<BibRequest>(
			`/bibs/${encodeURIComponent(mmsId)}/requests/${encodeURIComponent(requestId)}`,
			body,
		);
	}

	/**
	 * Performs an action on a bib request (e.g., cancel).
	 *
	 * @param mmsId - The MMS ID.
	 * @param requestId - The request ID.
	 * @param body - Action body.
	 * @param params - Action parameters.
	 * @param params.op - The operation.
	 * @returns The updated request.
	 */
	async operateBibRequest(
		mmsId: string,
		requestId: string,
		body: Record<string, unknown>,
		params?: { op?: string },
	): Promise<BibRequest> {
		return this.client.post<BibRequest>(
			`/bibs/${encodeURIComponent(mmsId)}/requests/${encodeURIComponent(requestId)}`,
			body,
			params,
		);
	}

	/**
	 * Deletes (cancels) a request for a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param requestId - The request ID.
	 * @param params - Optional parameters.
	 * @param params.reason - Cancellation reason code.
	 * @param params.notify_user - Whether to notify the user.
	 */
	async deleteBibRequest(
		mmsId: string,
		requestId: string,
		params: { reason: string; note?: string; notify_user?: boolean },
	): Promise<void> {
		return this.client.delete<void>(
			`/bibs/${encodeURIComponent(mmsId)}/requests/${encodeURIComponent(requestId)}`,
			params,
		);
	}

	/**
	 * Retrieves request options for a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param params - Optional parameters.
	 * @param params.user_id - User ID for personalized options.
	 * @returns Request options.
	 */
	async retrieveBibRequestOptions(
		mmsId: string,
		params?: { user_id?: string },
	): Promise<RequestOptions> {
		return this.client.get<RequestOptions>(
			`/bibs/${encodeURIComponent(mmsId)}/request-options`,
			params,
		);
	}

	/**
	 * Retrieves a list of requests for an item.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param itemId - The item ID.
	 * @param params - Optional filters.
	 * @returns A list of item requests.
	 */
	async retrieveItemRequestsList(
		mmsId: string,
		holdingId: string,
		itemId: string,
		params?: { request_type?: string; status?: string },
	): Promise<BibRequests> {
		return this.client.get<BibRequests>(
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items/${encodeURIComponent(itemId)}/requests`,
			params,
		);
	}

	/**
	 * Retrieves a single request for an item.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param itemId - The item ID.
	 * @param requestId - The request ID.
	 * @returns The item request.
	 */
	async retrieveItemRequest(
		mmsId: string,
		holdingId: string,
		itemId: string,
		requestId: string,
	): Promise<BibRequest> {
		return this.client.get<BibRequest>(
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items/${encodeURIComponent(itemId)}/requests/${encodeURIComponent(requestId)}`,
		);
	}

	/**
	 * Creates a request for an item.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param itemPid - The item PID.
	 * @param body - The request data.
	 * @param params - Optional parameters.
	 * @returns The created request.
	 */
	async createItemRequest(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		body: BibRequest,
		params?: { user_id?: string; user_id_type?: string },
	): Promise<BibRequest> {
		return this.client.post<BibRequest>(
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items/${encodeURIComponent(itemPid)}/requests`,
			body,
			params,
		);
	}

	/**
	 * Updates a request for an item.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param itemPid - The item PID.
	 * @param requestId - The request ID.
	 * @param body - The updated request.
	 * @returns The updated request.
	 */
	async updateItemRequest(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		requestId: string,
		body: BibRequest,
	): Promise<BibRequest> {
		return this.client.put<BibRequest>(
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items/${encodeURIComponent(itemPid)}/requests/${encodeURIComponent(requestId)}`,
			body,
		);
	}

	/**
	 * Performs an action on an item request (e.g., cancel).
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param itemPid - The item PID.
	 * @param requestId - The request ID.
	 * @param body - Action body.
	 * @param params - Action parameters.
	 * @returns The updated request.
	 */
	async operateItemRequest(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		requestId: string,
		body: Record<string, unknown>,
		params?: { op?: string },
	): Promise<BibRequest> {
		return this.client.post<BibRequest>(
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items/${encodeURIComponent(itemPid)}/requests/${encodeURIComponent(requestId)}`,
			body,
			params,
		);
	}

	/**
	 * Deletes (cancels) a request for an item.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID (use `mmsId` param name in path).
	 * @param itemPid - The item PID.
	 * @param requestId - The request ID.
	 * @param params - Optional parameters.
	 */
	async deleteItemRequest(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		requestId: string,
		params: { reason: string; note?: string; notify_user?: boolean },
	): Promise<void> {
		return this.client.delete<void>(
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items/${encodeURIComponent(itemPid)}/requests/${encodeURIComponent(requestId)}`,
			params,
		);
	}

	/**
	 * Retrieves request options for an item.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param itemPid - The item PID.
	 * @param params - Optional parameters.
	 * @param params.user_id - User ID for personalized options.
	 * @returns Request options.
	 */
	async retrieveItemRequestOptions(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		params?: { user_id?: string },
	): Promise<RequestOptions> {
		return this.client.get<RequestOptions>(
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items/${encodeURIComponent(itemPid)}/request-options`,
			params,
		);
	}

	/**
	 * Retrieves booking availability for an item.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param itemPid - The item PID.
	 * @param params - Optional parameters.
	 * @returns Booking availability.
	 */
	async retrieveItemBookingAvailability(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		params: {
			period: number;
			period_type: string;
			user_id?: string;
			user_id_type?: string;
		},
	): Promise<BookingAvailability> {
		return this.client.get<BookingAvailability>(
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items/${encodeURIComponent(itemPid)}/booking-availability`,
			params,
		);
	}
}
