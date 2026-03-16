import type { AlmaHttpClient } from "@/client";
import { path } from "@/util/uri";

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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/R0VUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9yZXF1ZXN0cw==/
	 */
	async retrieveBibRequestsList(
		mmsId: string,
		params?: { request_type?: string; limit?: number; offset?: number },
	): Promise<BibRequests> {
		return this.client.get<BibRequests>(path`/bibs/${mmsId}/requests`, params);
	}

	/**
	 * Retrieves a single request for a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param requestId - The request ID.
	 * @returns The request.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/R0VUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9yZXF1ZXN0cy97cmVxdWVzdF9pZH0=/
	 */
	async retrieveBibRequest(
		mmsId: string,
		requestId: string,
	): Promise<BibRequest> {
		return this.client.get<BibRequest>(
			path`/bibs/${mmsId}/requests/${requestId}`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/UE9TVCAvYWxtYXdzL3YxL2JpYnMve21tc19pZH0vcmVxdWVzdHM=/
	 */
	async createBibRequest(
		mmsId: string,
		body: BibRequest,
		params?: { user_id?: string; user_id_type?: string },
	): Promise<BibRequest> {
		return this.client.post<BibRequest>(
			path`/bibs/${mmsId}/requests`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/UFVUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9yZXF1ZXN0cy97cmVxdWVzdF9pZH0=/
	 */
	async updateBibRequest(
		mmsId: string,
		requestId: string,
		body: BibRequest,
	): Promise<BibRequest> {
		return this.client.put<BibRequest>(
			path`/bibs/${mmsId}/requests/${requestId}`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/UE9TVCAvYWxtYXdzL3YxL2JpYnMve21tc19pZH0vcmVxdWVzdHMve3JlcXVlc3RfaWR9/
	 */
	async operateBibRequest(
		mmsId: string,
		requestId: string,
		body: Record<string, unknown>,
		params?: { op?: string },
	): Promise<BibRequest> {
		return this.client.post<BibRequest>(
			path`/bibs/${mmsId}/requests/${requestId}`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/REVMRVRFIC9hbG1hd3MvdjEvYmlicy97bW1zSWR9L3JlcXVlc3RzL3tyZXF1ZXN0SWR9/
	 */
	async deleteBibRequest(
		mmsId: string,
		requestId: string,
		params: { reason: string; note?: string; notify_user?: boolean },
	): Promise<void> {
		return this.client.delete<void>(
			path`/bibs/${mmsId}/requests/${requestId}`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/R0VUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9yZXF1ZXN0LW9wdGlvbnM=/
	 */
	async retrieveBibRequestOptions(
		mmsId: string,
		params?: { user_id?: string },
	): Promise<RequestOptions> {
		return this.client.get<RequestOptions>(
			path`/bibs/${mmsId}/request-options`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/R0VUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9ob2xkaW5ncy97aG9sZGluZ19pZH0vaXRlbXMve2l0ZW1faWR9L3JlcXVlc3Rz/
	 */
	async retrieveItemRequestsList(
		mmsId: string,
		holdingId: string,
		itemId: string,
		params?: { request_type?: string; status?: string },
	): Promise<BibRequests> {
		return this.client.get<BibRequests>(
			path`/bibs/${mmsId}/holdings/${holdingId}/items/${itemId}/requests`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/R0VUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9ob2xkaW5ncy97aG9sZGluZ19pZH0vaXRlbXMve2l0ZW1faWR9L3JlcXVlc3RzL3tyZXF1ZXN0X2lkfQ==/
	 */
	async retrieveItemRequest(
		mmsId: string,
		holdingId: string,
		itemId: string,
		requestId: string,
	): Promise<BibRequest> {
		return this.client.get<BibRequest>(
			path`/bibs/${mmsId}/holdings/${holdingId}/items/${itemId}/requests/${requestId}`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/UE9TVCAvYWxtYXdzL3YxL2JpYnMve21tc19pZH0vaG9sZGluZ3Mve2hvbGRpbmdfaWR9L2l0ZW1zL3tpdGVtX3BpZH0vcmVxdWVzdHM=/
	 */
	async createItemRequest(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		body: BibRequest,
		params?: { user_id?: string; user_id_type?: string },
	): Promise<BibRequest> {
		return this.client.post<BibRequest>(
			path`/bibs/${mmsId}/holdings/${holdingId}/items/${itemPid}/requests`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/UFVUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9ob2xkaW5ncy97aG9sZGluZ19pZH0vaXRlbXMve2l0ZW1fcGlkfS9yZXF1ZXN0cy97cmVxdWVzdF9pZH0=/
	 */
	async updateItemRequest(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		requestId: string,
		body: BibRequest,
	): Promise<BibRequest> {
		return this.client.put<BibRequest>(
			path`/bibs/${mmsId}/holdings/${holdingId}/items/${itemPid}/requests/${requestId}`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/UE9TVCAvYWxtYXdzL3YxL2JpYnMve21tc19pZH0vaG9sZGluZ3Mve2hvbGRpbmdfaWR9L2l0ZW1zL3tpdGVtX3BpZH0vcmVxdWVzdHMve3JlcXVlc3RfaWR9/
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
			path`/bibs/${mmsId}/holdings/${holdingId}/items/${itemPid}/requests/${requestId}`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/REVMRVRFIC9hbG1hd3MvdjEvYmlicy97bW1zSWR9L2hvbGRpbmdzL3tob2xkaW5nSWR9L2l0ZW1zL3tpdGVtUGlkfS9yZXF1ZXN0cy97cmVxdWVzdElkfQ==/
	 */
	async deleteItemRequest(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		requestId: string,
		params: { reason: string; note?: string; notify_user?: boolean },
	): Promise<void> {
		return this.client.delete<void>(
			path`/bibs/${mmsId}/holdings/${holdingId}/items/${itemPid}/requests/${requestId}`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/R0VUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9ob2xkaW5ncy97aG9sZGluZ19pZH0vaXRlbXMve2l0ZW1fcGlkfS9yZXF1ZXN0LW9wdGlvbnM=/
	 */
	async retrieveItemRequestOptions(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		params?: { user_id?: string },
	): Promise<RequestOptions> {
		return this.client.get<RequestOptions>(
			path`/bibs/${mmsId}/holdings/${holdingId}/items/${itemPid}/request-options`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/R0VUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9ob2xkaW5ncy97aG9sZGluZ19pZH0vaXRlbXMve2l0ZW1fcGlkfS9ib29raW5nLWF2YWlsYWJpbGl0eQ==/
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
			path`/bibs/${mmsId}/holdings/${holdingId}/items/${itemPid}/booking-availability`,
			params,
		);
	}
}
