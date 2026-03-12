import type { AlmaHttpClient } from "../../client.ts";
import type {
	Bib,
	Bibs,
	Holding,
	Holdings,
	Item,
	Items,
	Portfolio,
	Portfolios,
} from "./types.ts";

/**
 * Methods for managing bibliographic records, holdings, items, and portfolios
 * in the Alma Bibliographic API.
 */
export class BibsCatalogResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of bibliographic records by MMS IDs.
	 *
	 * @param params - Required and optional parameters.
	 * @param params.mms_id - Comma-separated list of MMS IDs (required).
	 * @param params.view - View type (e.g. `"full"`).
	 * @param params.expand - Additional fields to expand.
	 * @param params.other_system_id - Other system ID filter.
	 * @returns A list of bibliographic records.
	 */
	async retrieveBibs(params: {
		mms_id?: string;
		view?: string;
		expand?: string;
		other_system_id?: string;
		lod_uri?: string;
	}): Promise<Bibs> {
		return this.client.get<Bibs>("/almaws/v1/bibs", params);
	}

	/**
	 * Retrieves a single bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param params - Optional parameters.
	 * @param params.view - View type.
	 * @param params.expand - Fields to expand.
	 * @returns The bibliographic record.
	 */
	async retrieveBib(
		mmsId: string,
		params?: { view?: string; expand?: string; other_system_id?: string },
	): Promise<Bib> {
		return this.client.get<Bib>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}`,
			params,
		);
	}

	/**
	 * Creates a new bibliographic record.
	 *
	 * @param body - The bib record data.
	 * @param params - Optional parameters.
	 * @returns The created bibliographic record.
	 */
	async createBib(
		body: Bib,
		params?: {
			from_nz_mms_id?: string;
			normalization?: string;
			validate?: boolean;
			override_warning?: boolean;
			check_match?: boolean;
			import_profile?: string;
		},
	): Promise<Bib> {
		return this.client.post<Bib>("/almaws/v1/bibs", body, params);
	}

	/**
	 * Updates a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param body - The updated bib record.
	 * @param params - Optional parameters.
	 * @returns The updated bibliographic record.
	 */
	async updateBib(
		mmsId: string,
		body: Bib,
		params?: {
			normalization?: string;
			validate?: boolean;
			override_warning?: boolean;
			stale_version_check?: boolean;
			cataloger_level?: string;
		},
	): Promise<Bib> {
		return this.client.put<Bib>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}`,
			body,
			params,
		);
	}

	/**
	 * Performs an action on a bibliographic record (e.g., copy from NZ, process).
	 *
	 * @param mmsId - The MMS ID.
	 * @param body - Action body.
	 * @param params - Action parameters.
	 * @param params.op - The operation.
	 * @returns The resulting bib record.
	 */
	async operateBib(
		mmsId: string,
		body: Record<string, unknown>,
		params?: { op?: string },
	): Promise<Bib> {
		return this.client.post<Bib>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}`,
			body,
			params,
		);
	}

	/**
	 * Deletes a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param params - Optional parameters.
	 * @param params.override - Override deletion warnings.
	 */
	async deleteBib(
		mmsId: string,
		params?: { override?: string; cataloger_level?: string },
	): Promise<void> {
		return this.client.delete<void>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}`,
			params,
		);
	}

	/**
	 * Retrieves a list of holdings for a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @returns A list of holdings records.
	 */
	async retrieveHoldingsList(mmsId: string): Promise<Holdings> {
		return this.client.get<Holdings>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/holdings`,
		);
	}

	/**
	 * Retrieves a single holdings record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @returns The holdings record.
	 */
	async retrieveHolding(mmsId: string, holdingId: string): Promise<Holding> {
		return this.client.get<Holding>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}`,
		);
	}

	/**
	 * Creates a new holdings record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param body - The holdings data.
	 * @returns The created holdings record.
	 */
	async createHolding(mmsId: string, body: Holding): Promise<Holding> {
		return this.client.post<Holding>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/holdings`,
			body,
		);
	}

	/**
	 * Updates a holdings record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param body - The updated holdings data.
	 * @returns The updated holdings record.
	 */
	async updateHolding(
		mmsId: string,
		holdingId: string,
		body: Holding,
	): Promise<Holding> {
		return this.client.put<Holding>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}`,
			body,
		);
	}

	/**
	 * Deletes a holdings record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param params - Optional parameters.
	 */
	async deleteHolding(
		mmsId: string,
		holdingId: string,
		params?: { override?: string },
	): Promise<void> {
		return this.client.delete<void>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}`,
			params,
		);
	}

	/**
	 * Retrieves a list of items under a holdings record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param params - Optional filters and pagination.
	 * @returns A list of items.
	 */
	async retrieveItemsList(
		mmsId: string,
		holdingId: string,
		params?: {
			limit?: number;
			offset?: number;
			expand?: string;
			user_id?: string;
			current_library?: string;
			current_location?: string;
			q?: string;
			order_by?: string;
		},
	): Promise<Items> {
		return this.client.get<Items>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items`,
			params,
		);
	}

	/**
	 * Retrieves a single item.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param itemPid - The item PID.
	 * @param params - Optional parameters.
	 * @returns The item.
	 */
	async retrieveItem(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		params?: { view?: string; expand?: string },
	): Promise<Item> {
		return this.client.get<Item>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items/${encodeURIComponent(itemPid)}`,
			params,
		);
	}

	/**
	 * Creates a new item under a holdings record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param body - The item data.
	 * @returns The created item.
	 */
	async createItem(
		mmsId: string,
		holdingId: string,
		body: Item,
	): Promise<Item> {
		return this.client.post<Item>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items`,
			body,
		);
	}

	/**
	 * Updates an item.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param itemPid - The item PID.
	 * @param body - The updated item data.
	 * @returns The updated item.
	 */
	async updateItem(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		body: Item,
	): Promise<Item> {
		return this.client.put<Item>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items/${encodeURIComponent(itemPid)}`,
			body,
		);
	}

	/**
	 * Performs an action on an item (e.g., scan, loan, return).
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param itemPid - The item PID.
	 * @param body - Action body.
	 * @param params - Action parameters.
	 * @param params.op - The operation.
	 * @returns The resulting item.
	 */
	async operateItem(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		body: Record<string, unknown>,
		params?: {
			op?: string;
			library?: string;
			circ_desk?: string;
			work_order_type?: string;
			department?: string;
			status?: string;
			done?: boolean;
			auto_print_slip?: string;
		},
	): Promise<Item> {
		return this.client.post<Item>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items/${encodeURIComponent(itemPid)}`,
			body,
			params,
		);
	}

	/**
	 * Deletes an item.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param itemPid - The item PID.
	 * @param params - Optional parameters.
	 */
	async deleteItem(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		params?: { override?: string; holdings?: string },
	): Promise<void> {
		return this.client.delete<void>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items/${encodeURIComponent(itemPid)}`,
			params,
		);
	}

	/**
	 * Retrieves all portfolios for a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param params - Optional pagination.
	 * @returns A list of portfolios.
	 */
	async retrievePortfoliosList(
		mmsId: string,
		params?: { limit?: number; offset?: number },
	): Promise<Portfolios> {
		return this.client.get<Portfolios>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/portfolios`,
			params,
		);
	}

	/**
	 * Retrieves a single portfolio.
	 *
	 * @param mmsId - The MMS ID.
	 * @param portfolioId - The portfolio ID.
	 * @returns The portfolio.
	 */
	async retrievePortfolio(
		mmsId: string,
		portfolioId: string,
	): Promise<Portfolio> {
		return this.client.get<Portfolio>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/portfolios/${encodeURIComponent(portfolioId)}`,
		);
	}

	/**
	 * Creates a portfolio linked to a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param body - The portfolio data.
	 * @returns The created portfolio.
	 */
	async createPortfolio(mmsId: string, body: Portfolio): Promise<Portfolio> {
		return this.client.post<Portfolio>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/portfolios/`,
			body,
		);
	}

	/**
	 * Updates a portfolio.
	 *
	 * @param mmsId - The MMS ID.
	 * @param portfolioId - The portfolio ID.
	 * @param body - The updated portfolio.
	 * @returns The updated portfolio.
	 */
	async updatePortfolio(
		mmsId: string,
		portfolioId: string,
		body: Portfolio,
	): Promise<Portfolio> {
		return this.client.put<Portfolio>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/portfolios/${encodeURIComponent(portfolioId)}`,
			body,
		);
	}

	/**
	 * Deletes a portfolio.
	 *
	 * @param mmsId - The MMS ID.
	 * @param portfolioId - The portfolio ID.
	 */
	async deletePortfolio(mmsId: string, portfolioId: string): Promise<void> {
		return this.client.delete<void>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/portfolios/${encodeURIComponent(portfolioId)}`,
		);
	}

	/**
	 * Retrieves booking availability for a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param params - Optional parameters.
	 * @returns Booking availability.
	 */
	async retrieveBookingAvailability(
		mmsId: string,
		params?: Record<string, string | number | boolean | undefined | null>,
	): Promise<Record<string, unknown>> {
		return this.client.get<Record<string, unknown>>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/booking-availability`,
			params,
		);
	}

	/**
	 * Tests the Bibliographic API connection.
	 *
	 * @returns A test response confirming the API is reachable.
	 */
	async test(): Promise<Record<string, unknown>> {
		return this.client.get<Record<string, unknown>>("/almaws/v1/bibs/test");
	}
}
