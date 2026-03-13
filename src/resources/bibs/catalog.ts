import type { AlmaHttpClient } from "@/client";

import type {
	Bib,
	Bibs,
	BookingAvailability,
	Holding,
	Holdings,
	Item,
	Items,
	Portfolio,
	Portfolios,
} from "./types";

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
	 * @param params.mms_id - Comma-separated list of MMS IDs.
	 * @param params.ie_id - The IE ID.
	 * @param params.holdings_id - The holdings record ID.
	 * @param params.representation_id - The digital representation ID.
	 * @param params.nz_mms_id - The Network Zone MMS ID.
	 * @param params.cz_mms_id - The Community Zone MMS ID.
	 * @param params.view - View type.
	 * @param params.expand - Additional fields to expand.
	 * @param params.other_system_id - Other system ID filter.
	 * @param params.lod_uri - Linked Open Data URI.
	 * @returns A list of bibliographic records.
	 */
	async retrieveBibs(params: {
		mms_id?: string;
		ie_id?: string;
		holdings_id?: string;
		representation_id?: string;
		nz_mms_id?: string;
		cz_mms_id?: string;
		view?: string;
		expand?: string;
		other_system_id?: string;
		lod_uri?: string;
	}): Promise<Bibs> {
		return this.client.get<Bibs>("/bibs", params);
	}

	/**
	 * Retrieves a single bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param params - Optional parameters.
	 * @param params.view - View type.
	 * @param params.expand - Fields to expand.
	 * @param params.other_system_id - Other system identifier.
	 * @returns The bibliographic record.
	 */
	async retrieveBib(
		mmsId: string,
		params?: { view?: string; expand?: string },
	): Promise<Bib> {
		return this.client.get<Bib>(`/bibs/${encodeURIComponent(mmsId)}`, params);
	}

	/**
	 * Creates a new bibliographic record.
	 *
	 * @param body - The bib record data.
	 * @param params - Optional parameters.
	 * @param params.from_nz_mms_id - Create from a Network Zone MMS ID.
	 * @param params.from_cz_mms_id - Create from a Community Zone MMS ID.
	 * @param params.normalization - Normalization profile to run.
	 * @param params.validate - Whether to validate the record.
	 * @param params.override_warning - Whether to override validation warnings.
	 * @param params.check_match - Whether to check for duplicate matches.
	 * @param params.import_profile - Import profile to use.
	 * @returns The created bibliographic record.
	 */
	async createBib(
		body: Bib,
		params?: {
			from_nz_mms_id?: string;
			from_cz_mms_id?: string;
			normalization?: string;
			validate?: boolean;
			override_warning?: boolean;
			check_match?: boolean;
			import_profile?: string;
		},
	): Promise<Bib> {
		return this.client.post<Bib>("/bibs", body, params);
	}

	/**
	 * Updates a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param body - The updated bib record.
	 * @param params - Optional parameters.
	 * @param params.normalization - Normalization profile to run.
	 * @param params.validate - Whether to validate the record.
	 * @param params.override_warning - Whether to override validation warnings.
	 * @param params.override_lock - Whether to override a record lock.
	 * @param params.stale_version_check - Whether to check for stale version.
	 * @param params.cataloger_level - Minimum cataloger level required.
	 * @param params.check_match - Whether to check for duplicate matches.
	 * @returns The updated bibliographic record.
	 */
	async updateBib(
		mmsId: string,
		body: Bib,
		params?: {
			normalization?: string;
			validate?: boolean;
			override_warning?: boolean;
			override_lock?: boolean;
			stale_version_check?: boolean;
			cataloger_level?: string;
			check_match?: boolean;
		},
	): Promise<Bib> {
		return this.client.put<Bib>(
			`/bibs/${encodeURIComponent(mmsId)}`,
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
			`/bibs/${encodeURIComponent(mmsId)}`,
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
	 * @param params.cataloger_level - Minimum cataloger level required.
	 */
	async deleteBib(
		mmsId: string,
		params?: { override?: string; cataloger_level?: string },
	): Promise<void> {
		return this.client.delete<void>(
			`/bibs/${encodeURIComponent(mmsId)}`,
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
			`/bibs/${encodeURIComponent(mmsId)}/holdings`,
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
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}`,
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
			`/bibs/${encodeURIComponent(mmsId)}/holdings`,
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
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}`,
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
		params?: { bib?: string },
	): Promise<void> {
		return this.client.delete<void>(
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}`,
			params,
		);
	}

	/**
	 * Retrieves a list of items under a holdings record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param params - Optional filters and pagination.
	 * @param params.limit - Maximum number of results.
	 * @param params.offset - Results offset for pagination.
	 * @param params.expand - Additional fields to expand.
	 * @param params.user_id - Filter by user ID.
	 * @param params.current_library - Filter by current library.
	 * @param params.current_location - Filter by current location.
	 * @param params.q - Search query.
	 * @param params.order_by - Sort field.
	 * @param params.direction - Sort direction.
	 * @param params.create_date_from - Filter items created from this date.
	 * @param params.create_date_to - Filter items created up to this date.
	 * @param params.modify_date_from - Filter items modified from this date.
	 * @param params.modify_date_to - Filter items modified up to this date.
	 * @param params.receive_date_from - Filter items received from this date.
	 * @param params.receive_date_to - Filter items received up to this date.
	 * @param params.expected_receive_date_from - Filter by expected receive date from.
	 * @param params.expected_receive_date_to - Filter by expected receive date to.
	 * @param params.view - View type.
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
			direction?: string;
			create_date_from?: string;
			create_date_to?: string;
			modify_date_from?: string;
			modify_date_to?: string;
			receive_date_from?: string;
			receive_date_to?: string;
			expected_receive_date_from?: string;
			expected_receive_date_to?: string;
			view?: string;
		},
	): Promise<Items> {
		return this.client.get<Items>(
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items`,
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
	 * @param params.view - View type.
	 * @param params.expand - Fields to expand.
	 * @param params.user_id - User ID for loan-related info.
	 * @returns The item.
	 */
	async retrieveItem(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		params?: { view?: string; expand?: string; user_id?: string },
	): Promise<Item> {
		return this.client.get<Item>(
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items/${encodeURIComponent(itemPid)}`,
			params,
		);
	}

	/**
	 * Creates a new item under a holdings record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param body - The item data.
	 * @param params - Optional parameters.
	 * @param params.generate_description - Whether to generate a description.
	 * @param params.generate_inventory_num_name - Inventory number generation profile.
	 * @returns The created item.
	 */
	async createItem(
		mmsId: string,
		holdingId: string,
		body: Item,
		params?: {
			generate_description?: boolean;
			generate_inventory_num_name?: string;
		},
	): Promise<Item> {
		return this.client.post<Item>(
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items`,
			body,
			params,
		);
	}

	/**
	 * Updates an item.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param itemPid - The item PID.
	 * @param body - The updated item data.
	 * @param params - Optional parameters.
	 * @param params.generate_description - Whether to regenerate the description.
	 * @param params.generate_inventory_num_name - Inventory number generation profile.
	 * @returns The updated item.
	 */
	async updateItem(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		body: Item,
		params?: {
			generate_description?: boolean;
			generate_inventory_num_name?: string;
		},
	): Promise<Item> {
		return this.client.put<Item>(
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items/${encodeURIComponent(itemPid)}`,
			body,
			params,
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
	 * @param params.op - The operation (e.g. `"scan"`, `"loan"`, `"return"`).
	 * @param params.external_id - External ID for the operation.
	 * @param params.request_id - Request ID to fulfill.
	 * @param params.library - Library code.
	 * @param params.circ_desk - Circulation desk code.
	 * @param params.work_order_type - Work order type code.
	 * @param params.department - Department code.
	 * @param params.status - New item status.
	 * @param params.done - Whether the work order step is done.
	 * @param params.auto_print_slip - Whether to auto-print a slip.
	 * @param params.place_on_hold_shelf - Whether to place the item on the hold shelf.
	 * @param params.confirm - Whether to confirm the operation.
	 * @param params.register_in_house_use - Whether to register in-house use.
	 * @returns The resulting item.
	 */
	async operateItem(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		body: Record<string, unknown>,
		params?: {
			op?: string;
			external_id?: string;
			request_id?: string;
			library?: string;
			circ_desk?: string;
			work_order_type?: string;
			department?: string;
			status?: string;
			done?: boolean;
			auto_print_slip?: string;
			place_on_hold_shelf?: boolean;
			confirm?: boolean;
			register_in_house_use?: boolean;
		},
	): Promise<Item> {
		return this.client.post<Item>(
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items/${encodeURIComponent(itemPid)}`,
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
	 * @param params.override - Override deletion warnings.
	 * @param params.holdings - Whether to also delete the holdings record if empty.
	 * @param params.bib - Whether to also delete the bib record if empty.
	 */
	async deleteItem(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		params?: { override?: string; holdings?: string; bib?: string },
	): Promise<void> {
		return this.client.delete<void>(
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items/${encodeURIComponent(itemPid)}`,
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
			`/bibs/${encodeURIComponent(mmsId)}/portfolios`,
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
			`/bibs/${encodeURIComponent(mmsId)}/portfolios/${encodeURIComponent(portfolioId)}`,
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
			`/bibs/${encodeURIComponent(mmsId)}/portfolios/`,
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
			`/bibs/${encodeURIComponent(mmsId)}/portfolios/${encodeURIComponent(portfolioId)}`,
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
			`/bibs/${encodeURIComponent(mmsId)}/portfolios/${encodeURIComponent(portfolioId)}`,
		);
	}

	/**
	 * Retrieves booking availability for a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param params - Required and optional parameters.
	 * @param params.period - The booking period length.
	 * @param params.period_type - The booking period type (e.g. `"days"`, `"hours"`).
	 * @param params.user_id - The user ID to check availability for.
	 * @param params.user_id_type - The user ID type.
	 * @returns Booking availability.
	 */
	async retrieveBookingAvailability(
		mmsId: string,
		params: {
			period: number;
			period_type: string;
			user_id?: string;
			user_id_type?: string;
		},
	): Promise<BookingAvailability> {
		return this.client.get<BookingAvailability>(
			`/bibs/${encodeURIComponent(mmsId)}/booking-availability`,
			params,
		);
	}

	/**
	 * Tests the Bibliographic API connection.
	 *
	 * @returns A test response confirming the API is reachable.
	 */
	async test(): Promise<Record<string, unknown>> {
		return this.client.get("/bibs/test");
	}
}
