import type { AlmaHttpClient } from "@/client";
import { path } from "@/util/uri";

import type {
	ResourceSharingRequest,
	UserRequest,
	UserRequests,
} from "./types";

/**
 * Methods for managing user requests and resource sharing requests
 * in the Alma Users API.
 */
export class RequestsResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of requests for a user.
	 *
	 * @param userId - The user ID.
	 * @param params - Optional filters and pagination.
	 * @returns A list of user requests.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/R0VUIC9hbG1hd3MvdjEvdXNlcnMve3VzZXJfaWR9L3JlcXVlc3Rz/
	 */
	async retrieveUserRequestsList(
		userId: string,
		params?: {
			request_type?: string;
			user_id_type?: string;
			limit?: number;
			offset?: number;
			status?: string;
		},
	): Promise<UserRequests> {
		return this.client.get<UserRequests>(
			path`/users/${userId}/requests`,
			params,
		);
	}

	/**
	 * Retrieves a single request for a user.
	 *
	 * @param userId - The user ID.
	 * @param requestId - The request ID.
	 * @returns The request.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/R0VUIC9hbG1hd3MvdjEvdXNlcnMve3VzZXJfaWR9L3JlcXVlc3RzL3tyZXF1ZXN0X2lkfQ==/
	 */
	async retrieveUserRequest(
		userId: string,
		requestId: string,
		params?: { user_id_type?: string },
	): Promise<UserRequest> {
		return this.client.get<UserRequest>(
			path`/users/${userId}/requests/${requestId}`,
			params,
		);
	}

	/**
	 * Creates a request for a user.
	 *
	 * @param userId - The user ID.
	 * @param body - The request data.
	 * @param params - Optional parameters.
	 * @returns The created request.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/UE9TVCAvYWxtYXdzL3YxL3VzZXJzL3t1c2VyX2lkfS9yZXF1ZXN0cw==/
	 */
	async createUserRequest(
		userId: string,
		body: UserRequest,
		params?: {
			user_id_type?: string;
			mms_id?: string;
			item_pid?: string;
			allow_same_request?: boolean;
		},
	): Promise<UserRequest> {
		return this.client.post<UserRequest>(
			path`/users/${userId}/requests`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/UFVUIC9hbG1hd3MvdjEvdXNlcnMve3VzZXJfaWR9L3JlcXVlc3RzL3tyZXF1ZXN0X2lkfQ==/
	 */
	async updateUserRequest(
		userId: string,
		requestId: string,
		body: UserRequest,
	): Promise<UserRequest> {
		return this.client.put<UserRequest>(
			path`/users/${userId}/requests/${requestId}`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/UE9TVCAvYWxtYXdzL3YxL3VzZXJzL3t1c2VyX2lkfS9yZXF1ZXN0cy97cmVxdWVzdF9pZH0=/
	 */
	async operateUserRequest(
		userId: string,
		requestId: string,
		body: UserRequest,
		params?: { op?: string },
	): Promise<UserRequest> {
		return this.client.post<UserRequest>(
			path`/users/${userId}/requests/${requestId}`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/REVMRVRFIC9hbG1hd3MvdjEvdXNlcnMve3VzZXJfaWR9L3JlcXVlc3RzL3tyZXF1ZXN0X2lkfQ==/
	 */
	async deleteUserRequest(
		userId: string,
		requestId: string,
		params: { reason: string; note?: string; notify_user?: boolean },
	): Promise<void> {
		return this.client.delete<void>(
			path`/users/${userId}/requests/${requestId}`,
			params,
		);
	}

	/**
	 * Retrieves a resource sharing request for a user.
	 *
	 * @param userId - The user ID.
	 * @param requestId - The resource sharing request ID.
	 * @returns The resource sharing request.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/R0VUIC9hbG1hd3MvdjEvdXNlcnMve3VzZXJfaWR9L3Jlc291cmNlLXNoYXJpbmctcmVxdWVzdHMve3JlcXVlc3RfaWR9/
	 */
	async retrieveResourceSharingRequest(
		userId: string,
		requestId: string,
	): Promise<ResourceSharingRequest> {
		return this.client.get<ResourceSharingRequest>(
			path`/users/${userId}/resource-sharing-requests/${requestId}`,
		);
	}

	/**
	 * Creates a resource sharing request for a user.
	 *
	 * @param userId - The user ID.
	 * @param body - The request data.
	 * @returns The created resource sharing request.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/UE9TVCAvYWxtYXdzL3YxL3VzZXJzL3t1c2VyX2lkfS9yZXNvdXJjZS1zaGFyaW5nLXJlcXVlc3Rz/
	 */
	async createResourceSharingRequest(
		userId: string,
		body: ResourceSharingRequest,
		params?: { user_id_type?: string; override_blocks?: string },
	): Promise<ResourceSharingRequest> {
		return this.client.post<ResourceSharingRequest>(
			path`/users/${userId}/resource-sharing-requests`,
			body,
			params,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/UE9TVCAvYWxtYXdzL3YxL3VzZXJzL3t1c2VyX2lkfS9yZXNvdXJjZS1zaGFyaW5nLXJlcXVlc3RzL3tyZXF1ZXN0X2lkfQ==/
	 */
	async operateResourceSharingRequest(
		userId: string,
		requestId: string,
		body: ResourceSharingRequest,
		params?: {
			request_id_type?: string;
			op?: string;
			shipping_cost?: string;
			fund_code?: string;
		},
	): Promise<ResourceSharingRequest> {
		return this.client.post<ResourceSharingRequest>(
			path`/users/${userId}/resource-sharing-requests/${requestId}`,
			body,
			params,
		);
	}

	/**
	 * Deletes a resource sharing request.
	 *
	 * @param userId - The user ID.
	 * @param requestId - The resource sharing request ID.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/REVMRVRFIC9hbG1hd3MvdjEvdXNlcnMve3VzZXJfaWR9L3Jlc291cmNlLXNoYXJpbmctcmVxdWVzdHMve3JlcXVlc3RfaWR9/
	 */
	async deleteResourceSharingRequest(
		userId: string,
		requestId: string,
		params?: {
			remove_request?: boolean;
			reason?: string;
			note?: string;
			notify_user?: boolean;
		},
	): Promise<void> {
		return this.client.delete<void>(
			path`/users/${userId}/resource-sharing-requests/${requestId}`,
			params,
		);
	}
}
