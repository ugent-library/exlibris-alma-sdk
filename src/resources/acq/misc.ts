import type { AlmaHttpClient } from "@/client";

import type { Currencies, FiscalPeriods } from "./types";

/**
 * Methods for miscellaneous acquisitions resources: currencies, fiscal periods and
 * purchase requests.
 */
export class MiscResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of currencies.
	 *
	 * @param params - Optional filters.
	 * @param params.limit - Maximum results.
	 * @param params.offset - Results offset.
	 * @param params.mode - Mode filter.
	 * @param params.source_currency - Source currency code.
	 * @param params.target_currency - Target currency code.
	 * @param params.exchange_date - Date for exchange rate lookup.
	 * @returns A list of currencies.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL2N1cnJlbmNpZXM=/
	 */
	async retrieveCurrencies(params?: {
		limit?: number;
		offset?: number;
		mode?: string;
		source_currency?: string;
		target_currency?: string;
		exchange_date?: string;
	}): Promise<Currencies> {
		return this.client.get<Currencies>("/acq/currencies", params);
	}

	/**
	 * Retrieves a list of fiscal periods.
	 *
	 * @param params - Optional filters.
	 * @param params.library - Filter by library code.
	 * @returns A list of fiscal periods.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL2Zpc2NhbC1wZXJpb2Rz/
	 */
	async retrieveFiscalPeriods(params?: {
		mode?: string;
	}): Promise<FiscalPeriods> {
		return this.client.get<FiscalPeriods>("/acq/fiscal-periods", params);
	}
}
