import type { AlmaHttpClient } from "@/client";
import { path } from "@/util/uri";

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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/R0VUIC9hbG1hd3MvdjEvdXNlcnMve3VzZXJfaWR9L2ZlZXM=/
	 */
	async retrieveUserFeesList(
		userId: string,
		params?: { user_id_type?: string; status?: string },
	): Promise<UserFees> {
		return this.client.get<UserFees>(path`/users/${userId}/fees`, params);
	}

	/**
	 * Retrieves a single fee for a user.
	 *
	 * @param userId - The user ID.
	 * @param feeId - The fee ID.
	 * @returns The fee.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/R0VUIC9hbG1hd3MvdjEvdXNlcnMve3VzZXJfaWR9L2ZlZXMve2ZlZV9pZH0=/
	 */
	async retrieveUserFee(userId: string, feeId: string): Promise<UserFee> {
		return this.client.get<UserFee>(path`/users/${userId}/fees/${feeId}`);
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/UE9TVCAvYWxtYXdzL3YxL3VzZXJzL3t1c2VyX2lkfS9mZWVzL3tmZWVfaWR9/
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
			path`/users/${userId}/fees/${feeId}`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/UE9TVCAvYWxtYXdzL3YxL3VzZXJzL3t1c2VyX2lkfS9mZWVzL2FsbA==/
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
			path`/users/${userId}/fees/all`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/R0VUIC9hbG1hd3MvdjEvdXNlcnMve3VzZXJfaWR9L2RlcG9zaXRz/
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
			path`/users/${userId}/deposits`,
			params,
		);
	}

	/**
	 * Retrieves a single deposit for a user.
	 *
	 * @param userId - The user ID.
	 * @param depositId - The deposit ID.
	 * @returns The deposit.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/R0VUIC9hbG1hd3MvdjEvdXNlcnMve3VzZXJfaWR9L2RlcG9zaXRzL3tkZXBvc2l0X2lkfQ==/
	 */
	async retrieveUserDeposit(
		userId: string,
		depositId: string,
		params?: { user_id_type?: string },
	): Promise<UserDeposit> {
		return this.client.get<UserDeposit>(
			path`/users/${userId}/deposits/${depositId}`,
			params,
		);
	}

	/**
	 * Creates a deposit for a user.
	 *
	 * @param userId - The user ID.
	 * @param body - The deposit data.
	 * @returns The created deposit.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/UE9TVCAvYWxtYXdzL3YxL3VzZXJzL3t1c2VyX2lkfS9kZXBvc2l0cw==/
	 */
	async createUserDeposit(
		userId: string,
		body: UserDeposit,
		params?: { user_id_type?: string; draft?: string },
	): Promise<UserDeposit> {
		return this.client.post<UserDeposit>(
			path`/users/${userId}/deposits`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/UE9TVCAvYWxtYXdzL3YxL3VzZXJzL3t1c2VyX2lkfS9kZXBvc2l0cy97ZGVwb3NpdF9pZH0=/
	 */
	async operateUserDeposit(
		userId: string,
		depositId: string,
		body: UserDeposit,
		params?: { user_id_type?: string; op?: string },
	): Promise<UserDeposit> {
		return this.client.post<UserDeposit>(
			path`/users/${userId}/deposits/${depositId}`,
			body,
			params,
		);
	}
}
