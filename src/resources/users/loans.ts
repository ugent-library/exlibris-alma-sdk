import type { AlmaHttpClient } from "@/client";

import type { UserLoan, UserLoans } from "./types";

/**
 * Methods for managing user loans in the Alma Users API.
 */
export class UsersLoansResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of loans for a user.
	 *
	 * @param userId - The user ID.
	 * @param params - Optional filters and pagination.
	 * @returns A list of user loans.
	 */
	async retrieveUserLoansList(
		userId: string,
		params?: {
			limit?: number;
			offset?: number;
			order_by?: string;
			direction?: string;
		},
	): Promise<UserLoans> {
		return this.client.get<UserLoans>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/loans`,
			params,
		);
	}

	/**
	 * Retrieves a single loan for a user.
	 *
	 * @param userId - The user ID.
	 * @param loanId - The loan ID.
	 * @returns The loan.
	 */
	async retrieveUserLoan(userId: string, loanId: string): Promise<UserLoan> {
		return this.client.get<UserLoan>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/loans/${encodeURIComponent(loanId)}`,
		);
	}

	/**
	 * Creates a loan for a user (checks out an item).
	 *
	 * @param userId - The user ID.
	 * @param body - The loan data.
	 * @returns The created loan.
	 */
	async createUserLoan(userId: string, body: UserLoan): Promise<UserLoan> {
		return this.client.post<UserLoan>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/loans`,
			body,
		);
	}

	/**
	 * Updates a user loan (e.g. renew).
	 *
	 * @param userId - The user ID.
	 * @param loanId - The loan ID.
	 * @param body - The updated loan data.
	 * @returns The updated loan.
	 */
	async updateUserLoan(
		userId: string,
		loanId: string,
		body: UserLoan,
	): Promise<UserLoan> {
		return this.client.put<UserLoan>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/loans/${encodeURIComponent(loanId)}`,
			body,
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
	 */
	async operateUserLoan(
		userId: string,
		loanId: string,
		body: UserLoan,
		params?: { op?: string },
	): Promise<UserLoan> {
		return this.client.post<UserLoan>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/loans/${encodeURIComponent(loanId)}`,
			body,
			params,
		);
	}
}
