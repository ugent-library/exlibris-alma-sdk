import type { AlmaHttpClient } from "@/client";
import type {
	Fund,
	Funds,
	FundTransaction,
	FundTransactions,
} from "@/resources/acq/types";

/**
 * Methods for managing funds and fund transactions in the Alma Acquisitions API.
 */
export class AcqFundsResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of funds.
	 *
	 * @param params - Optional filters.
	 * @param params.q - Search query.
	 * @param params.limit - Maximum results.
	 * @param params.offset - Results offset.
	 * @param params.order_by - Sort field.
	 * @param params.direction - Sort direction.
	 * @param params.library - Filter by library code.
	 * @param params.ledger_id - Filter by ledger ID.
	 * @param params.fiscal_period_id - Filter by fiscal period ID.
	 * @returns A list of funds.
	 */
	async retrieveFundsList(params?: {
		q?: string;
		limit?: number;
		offset?: number;
		order_by?: string;
		direction?: string;
		library?: string;
		ledger_id?: string;
		fiscal_period_id?: string;
	}): Promise<Funds> {
		return this.client.get<Funds>("/almaws/v1/acq/funds", params);
	}

	/**
	 * Retrieves a single fund.
	 *
	 * @param fundId - The fund ID.
	 * @param params - Optional parameters.
	 * @param params.fiscal_period_id - The fiscal period ID.
	 * @param params.view - View type.
	 * @returns The fund.
	 */
	async retrieveFund(
		fundId: string,
		params?: { fiscal_period_id?: string; view?: string },
	): Promise<Fund> {
		return this.client.get<Fund>(
			`/almaws/v1/acq/funds/${encodeURIComponent(fundId)}`,
			params,
		);
	}

	/**
	 * Creates a new fund.
	 *
	 * @param body - The fund data.
	 * @returns The created fund.
	 */
	async createFund(body: Fund): Promise<Fund> {
		return this.client.post<Fund>("/almaws/v1/acq/funds", body);
	}

	/**
	 * Updates an existing fund.
	 *
	 * @param fundId - The fund ID.
	 * @param body - The updated fund data.
	 * @returns The updated fund.
	 */
	async updateFund(fundId: string, body: Fund): Promise<Fund> {
		return this.client.put<Fund>(
			`/almaws/v1/acq/funds/${encodeURIComponent(fundId)}`,
			body,
		);
	}

	/**
	 * Performs an action on a fund (e.g. clone).
	 *
	 * @param fundId - The fund ID.
	 * @param body - The operation body.
	 * @param params - Optional parameters.
	 * @param params.op - The operation to perform.
	 * @returns The resulting fund.
	 */
	async operateFund(
		fundId: string,
		body: Fund,
		params?: { op?: string },
	): Promise<Fund> {
		return this.client.post<Fund>(
			`/almaws/v1/acq/funds/${encodeURIComponent(fundId)}`,
			body,
			params,
		);
	}

	/**
	 * Deletes a fund.
	 *
	 * @param fundId - The fund ID.
	 */
	async deleteFund(fundId: string): Promise<void> {
		return this.client.delete<void>(
			`/almaws/v1/acq/funds/${encodeURIComponent(fundId)}`,
		);
	}

	/**
	 * Retrieves a list of transactions for a fund.
	 *
	 * @param fundId - The fund ID.
	 * @param params - Optional pagination.
	 * @returns A list of fund transactions.
	 */
	async retrieveFundTransactionsList(
		fundId: string,
		params?: { limit?: number; offset?: number },
	): Promise<FundTransactions> {
		return this.client.get<FundTransactions>(
			`/almaws/v1/acq/funds/${encodeURIComponent(fundId)}/transactions`,
			params,
		);
	}

	/**
	 * Creates a fund transaction.
	 *
	 * @param fundId - The fund ID.
	 * @param body - The transaction data.
	 * @returns The created transaction.
	 */
	async createFundTransaction(
		fundId: string,
		body: FundTransaction,
	): Promise<FundTransaction> {
		return this.client.post<FundTransaction>(
			`/almaws/v1/acq/funds/${encodeURIComponent(fundId)}/transactions`,
			body,
		);
	}
}
