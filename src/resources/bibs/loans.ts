import type { AlmaHttpClient } from "@/client";

import type { Loan, Loans } from "./types";

/**
 * Methods for managing loans on bibliographic records and items
 * in the Alma Bibliographic API.
 */
export class BibsLoansResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of loans for a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param params - Optional pagination.
	 * @returns A list of loans.
	 */
	async retrieveBibLoansList(
		mmsId: string,
		params?: { limit?: number; offset?: number },
	): Promise<Loans> {
		return this.client.get<Loans>(
			`/bibs/${encodeURIComponent(mmsId)}/loans`,
			params,
		);
	}

	/**
	 * Retrieves a single loan for a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param loanId - The loan ID.
	 * @returns The loan.
	 */
	async retrieveBibLoan(mmsId: string, loanId: string): Promise<Loan> {
		return this.client.get<Loan>(
			`/bibs/${encodeURIComponent(mmsId)}/loans/${encodeURIComponent(loanId)}`,
		);
	}

	/**
	 * Retrieves a list of loans for an item.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param itemId - The item ID.
	 * @param params - Optional pagination.
	 * @returns A list of item loans.
	 */
	async retrieveItemLoansList(
		mmsId: string,
		holdingId: string,
		itemId: string,
		params?: {
			limit?: number;
			offset?: number;
			order_by?: string;
			direction?: string;
			loan_status?: string;
		},
	): Promise<Loans> {
		return this.client.get<Loans>(
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items/${encodeURIComponent(itemId)}/loans`,
			params,
		);
	}

	/**
	 * Retrieves a single item loan.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param itemPid - The item PID.
	 * @param loanId - The loan ID.
	 * @returns The item loan.
	 */
	async retrieveItemLoan(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		loanId: string,
	): Promise<Loan> {
		return this.client.get<Loan>(
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items/${encodeURIComponent(itemPid)}/loans/${encodeURIComponent(loanId)}`,
		);
	}

	/**
	 * Creates a loan for an item (checks out an item to a user).
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param itemPid - The item PID.
	 * @param body - Loan data including user ID.
	 * @returns The created loan.
	 */
	async createItemLoan(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		body: Loan,
		params?: { user_id?: string; user_id_type?: string },
	): Promise<Loan> {
		return this.client.post<Loan>(
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items/${encodeURIComponent(itemPid)}/loans`,
			body,
			params,
		);
	}

	/**
	 * Updates (renews) an item loan.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param itemPid - The item PID.
	 * @param loanId - The loan ID.
	 * @param body - Updated loan data.
	 * @returns The updated loan.
	 */
	async updateItemLoan(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		loanId: string,
		body: Loan,
	): Promise<Loan> {
		return this.client.put<Loan>(
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items/${encodeURIComponent(itemPid)}/loans/${encodeURIComponent(loanId)}`,
			body,
		);
	}

	/**
	 * Performs an action on an item loan (e.g., return).
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param itemPid - The item PID.
	 * @param loanId - The loan ID.
	 * @param body - Action body.
	 * @param params - Action parameters.
	 * @param params.op - The operation (e.g. `"return"`).
	 * @returns The updated loan.
	 */
	async operateItemLoan(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		loanId: string,
		body: Record<string, unknown>,
		params?: { op?: string },
	): Promise<Loan> {
		return this.client.post<Loan>(
			`/bibs/${encodeURIComponent(mmsId)}/holdings/${encodeURIComponent(holdingId)}/items/${encodeURIComponent(itemPid)}/loans/${encodeURIComponent(loanId)}`,
			body,
			params,
		);
	}
}
