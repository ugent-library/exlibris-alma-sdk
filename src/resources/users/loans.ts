import type { AlmaHttpClient } from "@/client";
import { path } from "@/util/uri";

import type { UserLoan, UserLoans } from "./types";

/**
 * Methods for managing user loans in the Alma Users API.
 */
export class LoansResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of loans for a user.
	 *
	 * @param userId - The user ID.
	 * @param params - Optional filters and pagination.
	 * @returns A list of user loans.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/R0VUIC9hbG1hd3MvdjEvdXNlcnMve3VzZXJfaWR9L2xvYW5z/
	 */
	async retrieveUserLoansList(
		userId: string,
		params?: {
			user_id_type?: string;
			limit?: number;
			offset?: number;
			order_by?: string;
			direction?: string;
			expand?: string;
			loan_status?: string;
		},
	): Promise<UserLoans> {
		return this.client.get<UserLoans>(path`/users/${userId}/loans`, params);
	}

	/**
	 * Retrieves a single loan for a user.
	 *
	 * @param userId - The user ID.
	 * @param loanId - The loan ID.
	 * @returns The loan.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/R0VUIC9hbG1hd3MvdjEvdXNlcnMve3VzZXJfaWR9L2xvYW5zL3tsb2FuX2lkfQ==/
	 */
	async retrieveUserLoan(userId: string, loanId: string): Promise<UserLoan> {
		return this.client.get<UserLoan>(path`/users/${userId}/loans/${loanId}`);
	}

	/**
	 * Creates a loan for a user (checks out an item).
	 *
	 * @param userId - The user ID.
	 * @param body - The loan data.
	 * @returns The created loan.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/UE9TVCAvYWxtYXdzL3YxL3VzZXJzL3t1c2VyX2lkfS9sb2Fucw==/
	 */
	async createUserLoan(
		userId: string,
		body: UserLoan,
		params?: {
			item_pid?: string;
			user_id_type?: string;
			item_barcode?: string;
			generate_linked_user?: string;
		},
	): Promise<UserLoan> {
		return this.client.post<UserLoan>(
			path`/users/${userId}/loans`,
			body,
			params,
		);
	}

	/**
	 * Updates a user loan (e.g. renew).
	 *
	 * @param userId - The user ID.
	 * @param loanId - The loan ID.
	 * @param body - The updated loan data.
	 * @returns The updated loan.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/UFVUIC9hbG1hd3MvdjEvdXNlcnMve3VzZXJfaWR9L2xvYW5zL3tsb2FuX2lkfQ==/
	 */
	async updateUserLoan(
		userId: string,
		loanId: string,
		body: UserLoan,
		params?: { notify_user?: boolean },
	): Promise<UserLoan> {
		return this.client.put<UserLoan>(
			path`/users/${userId}/loans/${loanId}`,
			body,
			params,
		);
	}

	/**
	 * Performs an action on a user loan (e.g. return).
	 *
	 * @param userId - The user ID.
	 * @param loanId - The loan ID.
	 * @param body - The operation body.
	 * @param params - Optional parameters.
	 * @param params.op - The operation to perform.
	 * @returns The resulting loan.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/UE9TVCAvYWxtYXdzL3YxL3VzZXJzL3t1c2VyX2lkfS9sb2Fucy97bG9hbl9pZH0=/
	 */
	async operateUserLoan(
		userId: string,
		loanId: string,
		body: UserLoan,
		params?: { user_id_type?: string; op?: string },
	): Promise<UserLoan> {
		return this.client.post<UserLoan>(
			path`/users/${userId}/loans/${loanId}`,
			body,
			params,
		);
	}
}
