import type { AlmaHttpClient } from "@/client";
import { path } from "@/util/uri";

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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/R0VUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9sb2Fucw==/
	 */
	async retrieveBibLoansList(
		mmsId: string,
		params?: { limit?: number; offset?: number },
	): Promise<Loans> {
		return this.client.get<Loans>(path`/bibs/${mmsId}/loans`, params);
	}

	/**
	 * Retrieves a single loan for a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param loanId - The loan ID.
	 * @returns The loan.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/R0VUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9sb2Fucy97bG9hbl9pZH0=/
	 */
	async retrieveBibLoan(mmsId: string, loanId: string): Promise<Loan> {
		return this.client.get<Loan>(path`/bibs/${mmsId}/loans/${loanId}`);
	}

	/**
	 * Retrieves a list of loans for an item.
	 *
	 * @param mmsId - The MMS ID.
	 * @param holdingId - The holdings record ID.
	 * @param itemId - The item ID.
	 * @param params - Optional pagination.
	 * @returns A list of item loans.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/R0VUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9ob2xkaW5ncy97aG9sZGluZ19pZH0vaXRlbXMve2l0ZW1faWR9L2xvYW5z/
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
			path`/bibs/${mmsId}/holdings/${holdingId}/items/${itemId}/loans`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/R0VUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9ob2xkaW5ncy97aG9sZGluZ19pZH0vaXRlbXMve2l0ZW1fcGlkfS9sb2Fucy97bG9hbl9pZH0=/
	 */
	async retrieveItemLoan(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		loanId: string,
	): Promise<Loan> {
		return this.client.get<Loan>(
			path`/bibs/${mmsId}/holdings/${holdingId}/items/${itemPid}/loans/${loanId}`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/UE9TVCAvYWxtYXdzL3YxL2JpYnMve21tc19pZH0vaG9sZGluZ3Mve2hvbGRpbmdfaWR9L2l0ZW1zL3tpdGVtX3BpZH0vbG9hbnM=/
	 */
	async createItemLoan(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		body: Loan,
		params?: { user_id?: string; user_id_type?: string },
	): Promise<Loan> {
		return this.client.post<Loan>(
			path`/bibs/${mmsId}/holdings/${holdingId}/items/${itemPid}/loans`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/UFVUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9ob2xkaW5ncy97aG9sZGluZ19pZH0vaXRlbXMve2l0ZW1fcGlkfS9sb2Fucy97bG9hbl9pZH0=/
	 */
	async updateItemLoan(
		mmsId: string,
		holdingId: string,
		itemPid: string,
		loanId: string,
		body: Loan,
	): Promise<Loan> {
		return this.client.put<Loan>(
			path`/bibs/${mmsId}/holdings/${holdingId}/items/${itemPid}/loans/${loanId}`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/bibs/UE9TVCAvYWxtYXdzL3YxL2JpYnMve21tc19pZH0vaG9sZGluZ3Mve2hvbGRpbmdfaWR9L2l0ZW1zL3tpdGVtX3BpZH0vbG9hbnMve2xvYW5faWR9/
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
			path`/bibs/${mmsId}/holdings/${holdingId}/items/${itemPid}/loans/${loanId}`,
			body,
			params,
		);
	}
}
