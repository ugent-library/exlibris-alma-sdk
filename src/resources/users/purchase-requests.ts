import type { AlmaHttpClient } from "@/client";
import { path } from "@/util/uri";

import type { UserPurchaseRequest, UserPurchaseRequests } from "./types";

/**
 * Methods for managing user purchase requests in the Alma Users API.
 */
export class UsersPurchaseRequestsResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of purchase requests for a user.
	 *
	 * @param userId - The user ID.
	 * @param params - Optional filters and pagination.
	 * @returns A list of purchase requests.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/R0VUIC9hbG1hd3MvdjEvdXNlcnMve3VzZXJfaWR9L3B1cmNoYXNlLXJlcXVlc3Rz/
	 */
	async retrieveUserPurchaseRequestsList(
		userId: string,
		params: {
			user_id_type: string;
			status?: string;
			limit?: number;
			offset?: number;
		},
	): Promise<UserPurchaseRequests> {
		return this.client.get<UserPurchaseRequests>(
			path`/users/${userId}/purchase-requests`,
			params,
		);
	}

	/**
	 * Retrieves a single purchase request for a user.
	 *
	 * @param userId - The user ID.
	 * @param purchaseRequestId - The purchase request ID.
	 * @returns The purchase request.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/R0VUIC9hbG1hd3MvdjEvdXNlcnMve3VzZXJfaWR9L3B1cmNoYXNlLXJlcXVlc3RzL3twdXJjaGFzZV9yZXF1ZXN0X2lkfQ==/
	 */
	async retrieveUserPurchaseRequest(
		userId: string,
		purchaseRequestId: string,
		params: { user_id_type: string },
	): Promise<UserPurchaseRequest> {
		return this.client.get<UserPurchaseRequest>(
			path`/users/${userId}/purchase-requests/${purchaseRequestId}`,
			params,
		);
	}

	/**
	 * Creates a purchase request for a user.
	 *
	 * @param userId - The user ID.
	 * @param body - The purchase request data.
	 * @returns The created purchase request.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/UE9TVCAvYWxtYXdzL3YxL3VzZXJzL3t1c2VyX2lkfS9wdXJjaGFzZS1yZXF1ZXN0cw==/
	 */
	async createUserPurchaseRequest(
		userId: string,
		body: UserPurchaseRequest,
		params: { user_id_type: string },
	): Promise<UserPurchaseRequest> {
		return this.client.post<UserPurchaseRequest>(
			path`/users/${userId}/purchase-requests`,
			body,
			params,
		);
	}

	/**
	 * Performs an action on a user purchase request.
	 *
	 * @param userId - The user ID.
	 * @param purchaseRequestId - The purchase request ID.
	 * @param body - The operation body.
	 * @param params - Optional parameters.
	 * @param params.op - The operation to perform.
	 * @returns The resulting purchase request.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/UE9TVCAvYWxtYXdzL3YxL3VzZXJzL3t1c2VyX2lkfS9wdXJjaGFzZS1yZXF1ZXN0cy97cHVyY2hhc2VfcmVxdWVzdF9pZH0=/
	 */
	async operateUserPurchaseRequest(
		userId: string,
		purchaseRequestId: string,
		body: UserPurchaseRequest,
		params?: { op?: string },
	): Promise<UserPurchaseRequest> {
		return this.client.post<UserPurchaseRequest>(
			path`/users/${userId}/purchase-requests/${purchaseRequestId}`,
			body,
			params,
		);
	}

	/**
	 * Updates a user purchase request.
	 *
	 * @param userId - The user ID.
	 * @param purchaseRequestId - The purchase request ID.
	 * @param body - The updated purchase request data.
	 * @returns The updated purchase request.
	 */
	async updateUserPurchaseRequest(
		userId: string,
		purchaseRequestId: string,
		body: UserPurchaseRequest,
	): Promise<UserPurchaseRequest> {
		return this.client.put<UserPurchaseRequest>(
			path`/users/${userId}/purchase-requests/${purchaseRequestId}`,
			body,
		);
	}
}
