import type { AlmaHttpClient } from "@/client";
import { path } from "@/util/uri";

import type { PoLine, PoLineItem, PoLineItems, PoLines } from "./types";

/**
 * Methods for managing PO lines and PO line items in the Alma Acquisitions API.
 */
export class PoLinesResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of PO lines.
	 *
	 * @param params - Optional filters and pagination.
	 * @returns A list of PO lines.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL3BvLWxpbmVz/
	 */
	async retrievePoLinesList(params?: {
		q?: string;
		status?: string;
		limit?: number;
		offset?: number;
		order_by?: string;
		direction?: string;
		acquisition_method?: string;
		expand?: string;
		library?: string;
		min_expected_arrival_date?: string;
		max_expected_arrival_date?: string;
	}): Promise<PoLines> {
		return this.client.get<PoLines>("/acq/po-lines", params);
	}

	/**
	 * Retrieves a single PO line.
	 *
	 * @param poLineId - The PO line ID.
	 * @returns The PO line.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL3BvLWxpbmVzL3twb19saW5lX2lkfQ==/
	 */
	async retrievePoLine(poLineId: string): Promise<PoLine> {
		return this.client.get<PoLine>(path`/acq/po-lines/${poLineId}`);
	}

	/**
	 * Creates a new PO line.
	 *
	 * @param body - The PO line data.
	 * @returns The created PO line.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UE9TVCAvYWxtYXdzL3YxL2FjcS9wby1saW5lcw==/
	 */
	async createPoLine(
		body: PoLine,
		params?: { profile_code?: string; requires_manual_review?: string },
	): Promise<PoLine> {
		return this.client.post<PoLine>("/acq/po-lines", body, params);
	}

	/**
	 * Updates an existing PO line.
	 *
	 * @param poLineId - The PO line ID.
	 * @param body - The updated PO line data.
	 * @returns The updated PO line.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UFVUIC9hbG1hd3MvdjEvYWNxL3BvLWxpbmVzL3twb19saW5lX2lkfQ==/
	 */
	async updatePoLine(
		poLineId: string,
		body: PoLine,
		params?: { update_inventory?: string; redistribute_funds?: string },
	): Promise<PoLine> {
		return this.client.put<PoLine>(
			path`/acq/po-lines/${poLineId}`,
			body,
			params,
		);
	}

	/**
	 * Deletes a PO line.
	 *
	 * @param poLineId - The PO line ID.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/REVMRVRFIC9hbG1hd3MvdjEvYWNxL3BvLWxpbmVzL3twb19saW5lX2lkfQ==/
	 */
	async deletePoLine(
		poLineId: string,
		params: {
			reason: string;
			comment?: string;
			inform_vendor?: boolean;
			override?: boolean;
			bib?: string;
		},
	): Promise<void> {
		return this.client.delete<void>(path`/acq/po-lines/${poLineId}`, params);
	}

	/**
	 * Retrieves a list of items associated with a PO line.
	 *
	 * @param poLineId - The PO line ID.
	 * @param params - Optional pagination.
	 * @returns A list of PO line items.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL3BvLWxpbmVzL3twb19saW5lX2lkfS9pdGVtcw==/
	 */
	async retrievePoLineItemsList(
		poLineId: string,
		params?: { limit?: number; offset?: number },
	): Promise<PoLineItems> {
		return this.client.get<PoLineItems>(
			path`/acq/po-lines/${poLineId}/items`,
			params,
		);
	}

	/**
	 * Creates an item and assigns it to a PO line.
	 *
	 * @param poLineId - The PO line ID.
	 * @param body - The item data.
	 * @returns The created item.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UE9TVCAvYWxtYXdzL3YxL2FjcS9wby1saW5lcy97cG9fbGluZV9pZH0vaXRlbXM=/
	 */
	async createPoLineItem(
		poLineId: string,
		body: PoLineItem,
	): Promise<PoLineItem> {
		return this.client.post<PoLineItem>(
			path`/acq/po-lines/${poLineId}/items`,
			body,
		);
	}

	/**
	 * Performs an action on a PO line item.
	 *
	 * @param poLineId - The PO line ID.
	 * @param itemId - The item ID.
	 * @param body - The operation body.
	 * @param params - Optional parameters.
	 * @param params.op - The operation to perform.
	 * @returns The resulting item.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UE9TVCAvYWxtYXdzL3YxL2FjcS9wby1saW5lcy97cG9fbGluZV9pZH0vaXRlbXMve2l0ZW1faWR9/
	 */
	async operatePoLineItem(
		poLineId: string,
		itemId: string,
		body: PoLineItem,
		params?: {
			op?: string;
			receive_date?: string;
			department?: string;
			department_library?: string;
		},
	): Promise<PoLineItem> {
		return this.client.post<PoLineItem>(
			path`/acq/po-lines/${poLineId}/items/${itemId}`,
			body,
			params,
		);
	}
}
