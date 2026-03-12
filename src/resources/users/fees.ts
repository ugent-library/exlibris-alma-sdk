import type { AlmaHttpClient } from "@/client";

import type { UserDeposit, UserDeposits, UserFee, UserFees } from "./types";

/**
 * Methods for managing user fees and deposits in the Alma Users API.
 */
export class UsersFeesResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of fees for a user.
	 *
	 * @param userId - The user ID.
	 * @param params - Optional filters and pagination.
	 * @returns A list of user fees.
	 */
	async retrieveUserFeesList(
		userId: string,
		params?: { user_id_type?: string; status?: string },
	): Promise<UserFees> {
		return this.client.get<UserFees>(
			`/users/${encodeURIComponent(userId)}/fees`,
			params,
		);
	}

	/**
	 * Retrieves a single fee for a user.
	 *
	 * @param userId - The user ID.
	 * @param feeId - The fee ID.
	 * @returns The fee.
	 */
	async retrieveUserFee(userId: string, feeId: string): Promise<UserFee> {
		return this.client.get<UserFee>(
			`/users/${encodeURIComponent(userId)}/fees/${encodeURIComponent(feeId)}`,
		);
	}

	/**
	 * Performs an action on a fee (e.g. pay, waive, dispute).
	 *
	 * @param userId - The user ID.
	 * @param feeId - The fee ID.
	 * @param body - The operation body.
	 * @param params - Optional parameters.
	 * @param params.op - The operation to perform.
	 * @returns The resulting fee.
	 */
	async operateUserFee(
		userId: string,
		feeId: string,
		body: UserFee,
		params?: {
			user_id_type?: string;
			op?: string;
			amount?: string;
			method?: string;
			reason?: string;
			comment?: string;
			external_transaction_id?: string;
		},
	): Promise<UserFee> {
		return this.client.post<UserFee>(
			`/users/${encodeURIComponent(userId)}/fees/${encodeURIComponent(feeId)}`,
			body,
			params,
		);
	}

	/**
	 * Performs an action on all fees for a user (e.g. pay all, waive all).
	 *
	 * @param userId - The user ID.
	 * @param body - The operation body.
	 * @param params - Optional parameters.
	 * @param params.op - The operation to perform.
	 * @returns The resulting fees.
	 */
	async operateAllUserFees(
		userId: string,
		body: UserFee,
		params?: {
			user_id_type?: string;
			op?: string;
			amount?: string;
			method?: string;
			comment?: string;
			external_transaction_id?: string;
		},
	): Promise<UserFees> {
		return this.client.post<UserFees>(
			`/users/${encodeURIComponent(userId)}/fees/all`,
			body,
			params,
		);
	}

	/**
	 * Retrieves a list of deposits for a user.
	 *
	 * @param userId - The user ID.
	 * @param params - Optional pagination.
	 * @returns A list of user deposits.
	 */
	async retrieveUserDepositsList(
		userId: string,
		params?: {
			user_id_type?: string;
			status?: string;
			limit?: number;
			offset?: number;
			order_by?: string;
			direction?: string;
		},
	): Promise<UserDeposits> {
		return this.client.get<UserDeposits>(
			`/users/${encodeURIComponent(userId)}/deposits`,
			params,
		);
	}

	/**
	 * Retrieves a single deposit for a user.
	 *
	 * @param userId - The user ID.
	 * @param depositId - The deposit ID.
	 * @returns The deposit.
	 */
	async retrieveUserDeposit(
		userId: string,
		depositId: string,
		params?: { user_id_type?: string },
	): Promise<UserDeposit> {
		return this.client.get<UserDeposit>(
			`/users/${encodeURIComponent(userId)}/deposits/${encodeURIComponent(depositId)}`,
			params,
		);
	}

	/**
	 * Creates a deposit for a user.
	 *
	 * @param userId - The user ID.
	 * @param body - The deposit data.
	 * @returns The created deposit.
	 */
	async createUserDeposit(
		userId: string,
		body: UserDeposit,
		params?: { user_id_type?: string; draft?: string },
	): Promise<UserDeposit> {
		return this.client.post<UserDeposit>(
			`/users/${encodeURIComponent(userId)}/deposits`,
			body,
			params,
		);
	}

	/**
	 * Performs an action on a deposit (e.g. refund).
	 *
	 * @param userId - The user ID.
	 * @param depositId - The deposit ID.
	 * @param body - The operation body.
	 * @param params - Optional parameters.
	 * @param params.op - The operation to perform.
	 * @returns The resulting deposit.
	 */
	async operateUserDeposit(
		userId: string,
		depositId: string,
		body: UserDeposit,
		params?: { user_id_type?: string; op?: string },
	): Promise<UserDeposit> {
		return this.client.post<UserDeposit>(
			`/users/${encodeURIComponent(userId)}/deposits/${encodeURIComponent(depositId)}`,
			body,
			params,
		);
	}
}
