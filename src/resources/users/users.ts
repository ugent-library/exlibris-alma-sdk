import type { AlmaHttpClient } from "@/client";
import { path } from "@/util/uri";

import type { User, UserAttachment, UserPersonalData, Users } from "./types";

/**
 * Methods for managing user records and user-level resources in the Alma Users API.
 */
export class UsersUsersResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of users.
	 *
	 * @param params - Optional filters and pagination.
	 * @returns A list of users.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/R0VUIC9hbG1hd3MvdjEvdXNlcnM=/
	 */
	async retrieveUsersList(params?: {
		q?: string;
		limit?: number;
		offset?: number;
		order_by?: string;
		source_institution_code?: string;
		source_user_id?: string;
		expand?: string;
		modify_date_from?: string;
	}): Promise<Users> {
		return this.client.get<Users>("/users", params);
	}

	/**
	 * Retrieves a single user.
	 *
	 * @param userId - The user ID (primary or additional identifier).
	 * @param params - Optional parameters.
	 * @param params.view - View type.
	 * @param params.expand - Expand additional fields.
	 * @returns The user.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/R0VUIC9hbG1hd3MvdjEvdXNlcnMve3VzZXJfaWR9/
	 */
	async retrieveUser(
		userId: string,
		params?: {
			user_id_type?: string;
			view?: string;
			expand?: string;
			source_institution_code?: string;
		},
	): Promise<User> {
		return this.client.get<User>(path`/users/${userId}`, params);
	}

	/**
	 * Retrieves the currently authenticated user (ME endpoint).
	 *
	 * @param params - Optional parameters.
	 * @param params.expand - Expand additional fields.
	 * @returns The authenticated user.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/R0VUIC9hbG1hd3MvdjEvdXNlcnMvTUU=/
	 */
	async retrieveMe(params?: { expand?: string }): Promise<User> {
		return this.client.get<User>("/users/ME", params);
	}

	/**
	 * Retrieves personal data for a user.
	 *
	 * @param userId - The user ID.
	 * @returns The user's personal data.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/R0VUIC9hbG1hd3MvdjEvdXNlcnMve3VzZXJfaWR9L3BlcnNvbmFsLWRhdGE=/
	 */
	async retrieveUserPersonalData(userId: string): Promise<UserPersonalData> {
		return this.client.get<UserPersonalData>(
			path`/users/${userId}/personal-data`,
		);
	}

	/**
	 * Creates a new user.
	 *
	 * @param body - The user data.
	 * @param params - Optional parameters.
	 * @returns The created user.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/UE9TVCAvYWxtYXdzL3YxL3VzZXJz/
	 */
	async createUser(
		body: User,
		params?: {
			social_authentication?: string;
			send_pin_number_letter?: string;
			source_institution_code?: string;
			source_user_id?: string;
			registration_rules?: string;
			library?: string;
		},
	): Promise<User> {
		return this.client.post<User>("/users", body, params);
	}

	/**
	 * Updates an existing user.
	 *
	 * @param userId - The user ID.
	 * @param body - The updated user data.
	 * @param params - Optional parameters.
	 * @returns The updated user.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/UFVUIC9hbG1hd3MvdjEvdXNlcnMve3VzZXJfaWR9/
	 */
	async updateUser(
		userId: string,
		body: User,
		params?: {
			user_id_type?: string;
			override?: string;
			send_pin_number_letter?: string;
			recalculate_roles?: string;
			registration_rules?: string;
			library?: string;
		},
	): Promise<User> {
		return this.client.put<User>(path`/users/${userId}`, body, params);
	}

	/**
	 * Performs an action on a user.
	 *
	 * @param userId - The user ID.
	 * @param body - The operation body.
	 * @param params - Optional parameters.
	 * @param params.op - The operation to perform.
	 * @returns The resulting user.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/UE9TVCAvYWxtYXdzL3YxL3VzZXJzL3t1c2VyX2lkfQ==/
	 */
	async operateUser(
		userId: string,
		body: User,
		params?: { user_id_type?: string; op?: string; password?: string },
	): Promise<User> {
		return this.client.post<User>(path`/users/${userId}`, body, params);
	}

	/**
	 * Deletes a user.
	 *
	 * @param userId - The user ID.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/REVMRVRFIC9hbG1hd3MvdjEvdXNlcnMve3VzZXJfaWR9/
	 */
	async deleteUser(
		userId: string,
		params?: { user_id_type?: string },
	): Promise<void> {
		return this.client.delete<void>(path`/users/${userId}`, params);
	}

	/**
	 * Retrieves a user attachment.
	 *
	 * @param userId - The user ID.
	 * @param attachmentId - The attachment ID.
	 * @returns The attachment.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/R0VUIC9hbG1hd3MvdjEvdXNlcnMve3VzZXJfaWR9L2F0dGFjaG1lbnRzL3thdHRhY2htZW50X2lkfQ==/
	 */
	async retrieveUserAttachment(
		userId: string,
		attachmentId: string,
		params?: { user_id_type?: string; expand?: string },
	): Promise<UserAttachment> {
		return this.client.get<UserAttachment>(
			path`/users/${userId}/attachments/${attachmentId}`,
			params,
		);
	}

	/**
	 * Creates an attachment on a user.
	 *
	 * @param userId - The user ID.
	 * @param body - The attachment data.
	 * @returns The created attachment.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/UE9TVCAvYWxtYXdzL3YxL3VzZXJzL3t1c2VyX2lkfS9hdHRhY2htZW50cw==/
	 */
	async createUserAttachment(
		userId: string,
		body: UserAttachment,
		params?: { user_id_type?: string },
	): Promise<UserAttachment> {
		return this.client.post<UserAttachment>(
			path`/users/${userId}/attachments`,
			body,
			params,
		);
	}
}
