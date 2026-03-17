import type { AlmaHttpClient } from "@/client";
import type {
	Fund,
	Funds,
	FundTransaction,
	FundTransactions,
} from "@/resources/acq/types";
import { path } from "@/util/uri";

/**
 * Methods for managing funds and fund transactions in the Alma Acquisitions API.
 */
export class FundsResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of funds.
	 *
	 * @param params - Optional filters.
	 * @param params.q - Search query.
	 * @param params.limit - Maximum results.
	 * @param params.offset - Results offset.
	 * @param params.library - Filter by library code.
	 * @param params.view - View type.
	 * @param params.mode - Mode filter.
	 * @param params.status - Filter by fund status.
	 * @param params.entity_type - Filter by entity type.
	 * @param params.fiscal_period - Filter by fiscal period.
	 * @param params.parent_id - Filter by parent fund ID.
	 * @param params.owner - Filter by owner.
	 * @returns A list of funds.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL2Z1bmRz/
	 */
	async retrieveFunds(params?: {
		q?: string;
		limit?: number;
		offset?: number;
		library?: string;
		view?: "full" | "brief";
		mode?: "POL" | "ALL";
		status?: "ALL" | "ACTIVE" | "INACTIVE";
		entity_type?: "ALL" | "LEDGER" | "SUMMARY" | "ALLOCATED";
		fiscal_period?: string;
		parent_id?: string;
		owner?: string;
	}): Promise<Funds> {
		return this.client.get<Funds>("/acq/funds", params);
	}

	/**
	 * Retrieves a single fund.
	 *
	 * @param fundId - The fund ID.
	 * @param params - Optional parameters.
	 * @param params.view - View type.
	 * @returns The fund.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL2Z1bmRzL3tmdW5kX2lkfQ==/
	 */
	async retrieveFund(
		fundId: string,
		params?: { view?: "full" | "brief" },
	): Promise<Fund> {
		return this.client.get<Fund>(path`/acq/funds/${fundId}`, params);
	}

	/**
	 * Creates a new fund.
	 *
	 * @param body - The fund data.
	 * @param params - Optional parameters.
	 * @param params.rules_level - The rules level to apply.
	 * @returns The created fund.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UE9TVCAvYWxtYXdzL3YxL2FjcS9mdW5kcw==/
	 */
	async createFund(
		body: Fund,
		params?: { rules_level?: string },
	): Promise<Fund> {
		return this.client.post<Fund>("/acq/funds", body, params);
	}

	/**
	 * Updates an existing fund.
	 *
	 * @param fundId - The fund ID.
	 * @param body - The updated fund data.
	 * @param params - Optional parameters.
	 * @param params.rules_level - The rules level to apply.
	 * @returns The updated fund.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UFVUIC9hbG1hd3MvdjEvYWNxL2Z1bmRzL3tmdW5kX2lkfQ==/
	 */
	async updateFund(
		fundId: string,
		body: Fund,
		params?: { rules_level?: string },
	): Promise<Fund> {
		return this.client.put<Fund>(path`/acq/funds/${fundId}`, body, params);
	}

	/**
	 * Performs an action on a fund (e.g. clone).
	 *
	 * @param fundId - The fund ID.
	 * @param op - The operation to perform.
	 * @returns The resulting fund.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UE9TVCAvYWxtYXdzL3YxL2FjcS9mdW5kcy97ZnVuZF9pZH0=/
	 */
	async fundService(
		fundId: string,
		op: "activate" | "deactivate",
	): Promise<Fund> {
		return this.client.post<Fund>(path`/acq/funds/${fundId}`, null, { op });
	}

	/**
	 * Deletes a fund.
	 *
	 * @param fundId - The fund ID.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/REVMRVRFIC9hbG1hd3MvdjEvYWNxL2Z1bmRzL3tmdW5kX2lkfQ==/
	 */
	async deleteFund(fundId: string): Promise<void> {
		return this.client.delete<void>(path`/acq/funds/${fundId}`);
	}

	/**
	 * Retrieves a list of transactions for a fund.
	 *
	 * @param fundId - The fund ID.
	 * @param params - Optional filters and pagination.
	 * @param params.limit - Maximum results.
	 * @param params.offset - Results offset.
	 * @param params.q - Search query.
	 * @param params.filter - Additional filter.
	 * @returns A list of fund transactions.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL2Z1bmRzL3tmdW5kX2lkfS90cmFuc2FjdGlvbnM=/
	 */
	async retrieveFundTransactions(
		fundId: string,
		params?: {
			limit?: number;
			offset?: number;
			q?: string;
			filter?:
				| "ALL"
				| "ALLOCATION"
				| "EXPENDITURE"
				| "ENCUMBRANCE"
				| "DISENCUMBRANCE"
				| "TRANSFER";
		},
	): Promise<FundTransactions> {
		return this.client.get<FundTransactions>(
			path`/acq/funds/${fundId}/transactions`,
			params,
		);
	}

	/**
	 * Creates a fund transaction.
	 *
	 * @param fundId - The fund ID.
	 * @param body - The transaction data.
	 * @returns The created transaction.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UE9TVCAvYWxtYXdzL3YxL2FjcS9mdW5kcy97ZnVuZF9pZH0vdHJhbnNhY3Rpb25z/
	 */
	async createFundTransactions(
		fundId: string,
		body: FundTransaction,
	): Promise<FundTransaction> {
		return this.client.post<FundTransaction>(
			path`/acq/funds/${fundId}/transactions`,
			body,
		);
	}
}
