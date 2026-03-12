import type { AlmaHttpClient } from "../../client.ts";
import type {
	ResourceSharingRequest,
	UserRequest,
	UserRequests,
} from "./types.ts";

/**
 * Methods for managing user requests and resource sharing requests
 * in the Alma Users API.
 */
export class UsersRequestsResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of requests for a user.
	 *
	 * @param userId - The user ID.
	 * @param params - Optional filters and pagination.
	 * @returns A list of user requests.
	 */
	async retrieveUserRequestsList(
		userId: string,
		params?: {
			request_type?: string;
			limit?: number;
			offset?: number;
		},
	): Promise<UserRequests> {
		return this.client.get<UserRequests>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/requests`,
			params,
		);
	}

	/**
	 * Retrieves a single request for a user.
	 *
	 * @param userId - The user ID.
	 * @param requestId - The request ID.
	 * @returns The request.
	 */
	async retrieveUserRequest(
		userId: string,
		requestId: string,
	): Promise<UserRequest> {
		return this.client.get<UserRequest>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/requests/${encodeURIComponent(requestId)}`,
		);
	}

	/**
	 * Creates a request for a user.
	 *
	 * @param userId - The user ID.
	 * @param body - The request data.
	 * @param params - Optional parameters.
	 * @returns The created request.
	 */
	async createUserRequest(
		userId: string,
		body: UserRequest,
		params?: { mms_id?: string; copy?: string },
	): Promise<UserRequest> {
		return this.client.post<UserRequest>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/requests`,
			body,
			params,
		);
	}

	/**
	 * Updates a user request.
	 *
	 * @param userId - The user ID.
	 * @param requestId - The request ID.
	 * @param body - The updated request data.
	 * @returns The updated request.
	 */
	async updateUserRequest(
		userId: string,
		requestId: string,
		body: UserRequest,
	): Promise<UserRequest> {
		return this.client.put<UserRequest>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/requests/${encodeURIComponent(requestId)}`,
			body,
		);
	}

	/**
	 * Performs an action on a user request.
	 *
	 * @param userId - The user ID.
	 * @param requestId - The request ID.
	 * @param body - The operation body.
	 * @param params - Optional parameters.
	 * @param params.op - The operation to perform.
	 * @returns The resulting request.
	 */
	async operateUserRequest(
		userId: string,
		requestId: string,
		body: UserRequest,
		params?: { op?: string },
	): Promise<UserRequest> {
		return this.client.post<UserRequest>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/requests/${encodeURIComponent(requestId)}`,
			body,
			params,
		);
	}

	/**
	 * Deletes (cancels) a user request.
	 *
	 * @param userId - The user ID.
	 * @param requestId - The request ID.
	 * @param params - Optional parameters.
	 * @param params.reason - Cancellation reason code.
	 * @param params.note - Note to include.
	 * @param params.notify_user - Whether to notify the user.
	 */
	async deleteUserRequest(
		userId: string,
		requestId: string,
		params?: { reason?: string; note?: string; notify_user?: string },
	): Promise<void> {
		return this.client.delete<void>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/requests/${encodeURIComponent(requestId)}`,
			params,
		);
	}

	/**
	 * Retrieves a resource sharing request for a user.
	 *
	 * @param userId - The user ID.
	 * @param requestId - The resource sharing request ID.
	 * @returns The resource sharing request.
	 */
	async retrieveResourceSharingRequest(
		userId: string,
		requestId: string,
	): Promise<ResourceSharingRequest> {
		return this.client.get<ResourceSharingRequest>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/resource-sharing-requests/${encodeURIComponent(requestId)}`,
		);
	}

	/**
	 * Creates a resource sharing request for a user.
	 *
	 * @param userId - The user ID.
	 * @param body - The request data.
	 * @returns The created resource sharing request.
	 */
	async createResourceSharingRequest(
		userId: string,
		body: ResourceSharingRequest,
	): Promise<ResourceSharingRequest> {
		return this.client.post<ResourceSharingRequest>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/resource-sharing-requests`,
			body,
		);
	}

	/**
	 * Performs an action on a resource sharing request.
	 *
	 * @param userId - The user ID.
	 * @param requestId - The resource sharing request ID.
	 * @param body - The operation body.
	 * @param params - Optional parameters.
	 * @param params.op - The operation to perform.
	 * @returns The resulting resource sharing request.
	 */
	async operateResourceSharingRequest(
		userId: string,
		requestId: string,
		body: ResourceSharingRequest,
		params?: { op?: string },
	): Promise<ResourceSharingRequest> {
		return this.client.post<ResourceSharingRequest>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/resource-sharing-requests/${encodeURIComponent(requestId)}`,
			body,
			params,
		);
	}

	/**
	 * Deletes a resource sharing request.
	 *
	 * @param userId - The user ID.
	 * @param requestId - The resource sharing request ID.
	 */
	async deleteResourceSharingRequest(
		userId: string,
		requestId: string,
	): Promise<void> {
		return this.client.delete<void>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/resource-sharing-requests/${encodeURIComponent(requestId)}`,
		);
	}
}
