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
	async retrievePoLines(params?: {
		/**
		 * Search query. Optional. Searching for words from: title, author, mms_id, publisher, publication_year, publication_place, issn_isbn, shelving_location, vendor_code, vendor_name, vendor_account, fund_code, fund_name, number, po_number, invoice_reference & all (for searching in all the above fields). It is also possible to search on fields from the related items (relevant for libraries who have one PO-Line per Item, and the maximum number of records which can be retrieved is limited): enumeration_a/b/c, chronology_i/j/k, item_description and item_library. Example (note the tilde between the code and text): q=author~Mark (see [Brief Search](https://developers.exlibrisgroup.com/blog/How-we-re-building-APIs-at-Ex-Libris#BriefSearch))
		 */
		q?: string;

		/**
		 * PO-Line Status. Optional. Valid values are CLOSED, CANCELLED, ACTIVE, ALL, ALL_WITH_CLOSED. Default: ALL (retrieves all PO lines except CLOSED).
		 */
		status?: "ALL" | "CLOSED" | "CANCELLED" | "ACTIVE" | "ALL_WITH_CLOSED";

		/**
		 * Limits the number of results. Optional. Valid values are 0-100. Default value: 10.
		 */
		limit?: number;

		/**
		 * Offset of the results returned. Optional. Default value: 0, which means that the first results will be returned.
		 */
		offset?: number;

		/**
		 * Order by parameter. Optional. The default is title. The Order by options are number, title, created_date and po_number. It is also possible to sort by fields from the related items (relevant for libraries who have one PO-Line per Item, and only works when the search query included item related fields): enumeration_a/b/c, chronology_i/j/k & item_description. The secondary sort is on number.
		 */
		order_by?:
			| "title"
			| "number"
			| "created_date"
			| "po_number"
			| "enumeration_a"
			| "enumeration_b"
			| "enumeration_c"
			| "chronology_i"
			| "chronology_j"
			| "chronology_k"
			| "item_description";

		/**
		 * Direction of ordering. Optional. The choices are asc, desc. The default is desc.
		 */
		direction?: "desc" | "asc";

		/**
		 * Filter by acquisition method, e.g. PURCHASE. Optional. The default is to do no filtering.
		 */
		acquisition_method?: string;

		/**
		 * The expand parameter allows for increasing the PO-Lines information with data on:
		 * notes - The PO notes.
		 * locations - The PO locations with their sub objects.
		 * To get more than one, use a comma separator. Optional.
		 */
		expand?: string;

		/**
		 * The code of the library that owns the PO lines. Optional. If supplied, only the PO Lines for this library will be retrieved. If not supplied, all the PO Lines that match the other parameters will be retrieved.
		 */
		library?: string;

		/**
		 * Retrieve PO lines with expected arrival date starting this Date (YYYY-MM-DD). Optional.
		 */
		min_expected_arrival_date?: string;

		/**
		 * Retrieve PO lines with expected arrival date until this Date (YYYY-MM-DD), included. Optional.
		 */
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
	async getPoLine(poLineId: string): Promise<PoLine> {
		return this.client.get<PoLine>(path`/acq/po-lines/${poLineId}`);
	}

	/**
	 * Creates a new PO line.
	 *
	 * @param body - The PO line data.
	 * @param params - Optional parameters.
	 * @param params.profile_code - New Order API profile code. Optional. If multiple profiles exist and no profile parameter is passed in the querystring, the default profile is used.
	 * @param params.requires_manual_review - Requires manual review. Optional.
	 * @returns The created PO line.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UE9TVCAvYWxtYXdzL3YxL2FjcS9wby1saW5lcw==/
	 */
	async createPoLine(
		body: PoLine,
		params?: { profile_code?: string; requires_manual_review?: boolean },
	): Promise<PoLine> {
		return this.client.post<PoLine>("/acq/po-lines", body, params);
	}

	/**
	 * Updates an existing PO line.
	 *
	 * @param poLineId - The PO line ID.
	 * @param body - The updated PO line data.
	 * @param params - Optional parameters.
	 * @param params.update_inventory - Flag for updating the PO Line's inventory. Options: true, false. Default: true.
	 * @param params.redistribute_funds - Indication if the total amount will be distributed. Optional. Default is False. When true - the API will ignore funding information in the payload and calculate funding based on existing funds.
	 * @returns The updated PO line.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UFVUIC9hbG1hd3MvdjEvYWNxL3BvLWxpbmVzL3twb19saW5lX2lkfQ==/
	 */
	async updatePoLine(
		poLineId: string,
		body: PoLine,
		params?: { update_inventory?: boolean; redistribute_funds?: boolean },
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
	async cancelPoLine(
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
	async getPoLineItems(
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
	 * @param params - Optional parameters.
	 * @returns The created item.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UE9TVCAvYWxtYXdzL3YxL2FjcS9wby1saW5lcy97cG9fbGluZV9pZH0vaXRlbXM=/
	 */
	async receiveNewItem(
		poLineId: string,
		body: PoLineItem,
		params?: {
			/**
			 * The receive date. Default value is current time. Expected Format: YYYY-MM-DDZ
			 */
			receive_date?: string;

			/**
			 * The code of the department where the item is being received. If not supplied, a random department will be chosen from the owning library's acquisition departments.
			 */
			department?: string;

			/**
			 * The library code of the department where the item is being received.
			 */
			department_library?: string;
		},
	): Promise<PoLineItem> {
		return this.client.post<PoLineItem>(
			path`/acq/po-lines/${poLineId}/items`,
			body,
			params,
		);
	}

	/**
	 * Performs an action on a PO line item.
	 *
	 * @param poLineId - The PO line ID.
	 * @param itemId - The item ID.
	 * @param body - The operation body.
	 * @param params - Optional parameters.
	 * @returns The resulting item.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UE9TVCAvYWxtYXdzL3YxL2FjcS9wby1saW5lcy97cG9fbGluZV9pZH0vaXRlbXMve2l0ZW1faWR9/
	 */
	async receiveExistingItem(
		poLineId: string,
		itemId: string,
		body: PoLineItem,
		params?: {
			/**
			 * The operation to perform on the item. Currently, the only option is 'receive'
			 */
			op: "receive";

			/**
			 * The receive date. Default value is current time. Expected Format: YYYY-MM-DDZ
			 */
			receive_date?: string;

			/**
			 * The code of the department where the item is being received. If not supplied, a random department will be chosen from the owning library's acquisition departments.
			 */
			department?: string;

			/**
			 * The library code of the department where the item is being received.
			 */
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
