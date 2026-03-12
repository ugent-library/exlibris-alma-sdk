import type { AlmaHttpClient } from "../../client.ts";
import type { PoLine, PoLineItem, PoLineItems, PoLines } from "./types.ts";

/**
 * Methods for managing PO lines and PO line items in the Alma Acquisitions API.
 */
export class AcqPoLinesResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of PO lines.
	 *
	 * @param params - Optional filters and pagination.
	 * @returns A list of PO lines.
	 */
	async retrievePoLinesList(params?: {
		q?: string;
		status?: string;
		limit?: number;
		offset?: number;
		order_by?: string;
		direction?: string;
		acquisition_method?: string;
	}): Promise<PoLines> {
		return this.client.get<PoLines>("/almaws/v1/acq/po-lines", params);
	}

	/**
	 * Retrieves a single PO line.
	 *
	 * @param poLineId - The PO line ID.
	 * @returns The PO line.
	 */
	async retrievePoLine(poLineId: string): Promise<PoLine> {
		return this.client.get<PoLine>(
			`/almaws/v1/acq/po-lines/${encodeURIComponent(poLineId)}`,
		);
	}

	/**
	 * Creates a new PO line.
	 *
	 * @param body - The PO line data.
	 * @returns The created PO line.
	 */
	async createPoLine(body: PoLine): Promise<PoLine> {
		return this.client.post<PoLine>("/almaws/v1/acq/po-lines", body);
	}

	/**
	 * Updates an existing PO line.
	 *
	 * @param poLineId - The PO line ID.
	 * @param body - The updated PO line data.
	 * @returns The updated PO line.
	 */
	async updatePoLine(poLineId: string, body: PoLine): Promise<PoLine> {
		return this.client.put<PoLine>(
			`/almaws/v1/acq/po-lines/${encodeURIComponent(poLineId)}`,
			body,
		);
	}

	/**
	 * Deletes a PO line.
	 *
	 * @param poLineId - The PO line ID.
	 */
	async deletePoLine(poLineId: string): Promise<void> {
		return this.client.delete<void>(
			`/almaws/v1/acq/po-lines/${encodeURIComponent(poLineId)}`,
		);
	}

	/**
	 * Retrieves a list of items associated with a PO line.
	 *
	 * @param poLineId - The PO line ID.
	 * @param params - Optional pagination.
	 * @returns A list of PO line items.
	 */
	async retrievePoLineItemsList(
		poLineId: string,
		params?: { limit?: number; offset?: number },
	): Promise<PoLineItems> {
		return this.client.get<PoLineItems>(
			`/almaws/v1/acq/po-lines/${encodeURIComponent(poLineId)}/items`,
			params,
		);
	}

	/**
	 * Creates an item and assigns it to a PO line.
	 *
	 * @param poLineId - The PO line ID.
	 * @param body - The item data.
	 * @returns The created item.
	 */
	async createPoLineItem(
		poLineId: string,
		body: PoLineItem,
	): Promise<PoLineItem> {
		return this.client.post<PoLineItem>(
			`/almaws/v1/acq/po-lines/${encodeURIComponent(poLineId)}/items`,
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
	 */
	async operatePoLineItem(
		poLineId: string,
		itemId: string,
		body: PoLineItem,
		params?: { op?: string },
	): Promise<PoLineItem> {
		return this.client.post<PoLineItem>(
			`/almaws/v1/acq/po-lines/${encodeURIComponent(poLineId)}/items/${encodeURIComponent(itemId)}`,
			body,
			params,
		);
	}
}
