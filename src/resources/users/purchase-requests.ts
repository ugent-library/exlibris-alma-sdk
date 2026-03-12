import type { AlmaHttpClient } from "../../client.ts";
import type { UserPurchaseRequest, UserPurchaseRequests } from "./types.ts";

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
	 */
	async retrieveUserPurchaseRequestsList(
		userId: string,
		params?: {
			status?: string;
			limit?: number;
			offset?: number;
		},
	): Promise<UserPurchaseRequests> {
		return this.client.get<UserPurchaseRequests>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/purchase-requests`,
			params,
		);
	}

	/**
	 * Retrieves a single purchase request for a user.
	 *
	 * @param userId - The user ID.
	 * @param purchaseRequestId - The purchase request ID.
	 * @returns The purchase request.
	 */
	async retrieveUserPurchaseRequest(
		userId: string,
		purchaseRequestId: string,
	): Promise<UserPurchaseRequest> {
		return this.client.get<UserPurchaseRequest>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/purchase-requests/${encodeURIComponent(purchaseRequestId)}`,
		);
	}

	/**
	 * Creates a purchase request for a user.
	 *
	 * @param userId - The user ID.
	 * @param body - The purchase request data.
	 * @returns The created purchase request.
	 */
	async createUserPurchaseRequest(
		userId: string,
		body: UserPurchaseRequest,
	): Promise<UserPurchaseRequest> {
		return this.client.post<UserPurchaseRequest>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/purchase-requests`,
			body,
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
	 */
	async operateUserPurchaseRequest(
		userId: string,
		purchaseRequestId: string,
		body: UserPurchaseRequest,
		params?: { op?: string },
	): Promise<UserPurchaseRequest> {
		return this.client.post<UserPurchaseRequest>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/purchase-requests/${encodeURIComponent(purchaseRequestId)}`,
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
			`/almaws/v1/users/${encodeURIComponent(userId)}/purchase-requests/${encodeURIComponent(purchaseRequestId)}`,
			body,
		);
	}
}
