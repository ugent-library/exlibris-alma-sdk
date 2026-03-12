import type { AlmaHttpClient } from "@/client";

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
		return this.client.get<User>(
			`/users/${encodeURIComponent(userId)}`,
			params,
		);
	}

	/**
	 * Retrieves the currently authenticated user (ME endpoint).
	 *
	 * @param params - Optional parameters.
	 * @param params.expand - Expand additional fields.
	 * @returns The authenticated user.
	 */
	async retrieveMe(params?: { expand?: string }): Promise<User> {
		return this.client.get<User>("/users/ME", params);
	}

	/**
	 * Retrieves personal data for a user.
	 *
	 * @param userId - The user ID.
	 * @returns The user's personal data.
	 */
	async retrieveUserPersonalData(userId: string): Promise<UserPersonalData> {
		return this.client.get<UserPersonalData>(
			`/users/${encodeURIComponent(userId)}/personal-data`,
		);
	}

	/**
	 * Creates a new user.
	 *
	 * @param body - The user data.
	 * @param params - Optional parameters.
	 * @returns The created user.
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
		return this.client.put<User>(
			`/users/${encodeURIComponent(userId)}`,
			body,
			params,
		);
	}

	/**
	 * Performs an action on a user.
	 *
	 * @param userId - The user ID.
	 * @param body - The operation body.
	 * @param params - Optional parameters.
	 * @param params.op - The operation to perform.
	 * @returns The resulting user.
	 */
	async operateUser(
		userId: string,
		body: User,
		params?: { user_id_type?: string; op?: string; password?: string },
	): Promise<User> {
		return this.client.post<User>(
			`/users/${encodeURIComponent(userId)}`,
			body,
			params,
		);
	}

	/**
	 * Deletes a user.
	 *
	 * @param userId - The user ID.
	 */
	async deleteUser(
		userId: string,
		params?: { user_id_type?: string },
	): Promise<void> {
		return this.client.delete<void>(
			`/users/${encodeURIComponent(userId)}`,
			params,
		);
	}

	/**
	 * Retrieves a user attachment.
	 *
	 * @param userId - The user ID.
	 * @param attachmentId - The attachment ID.
	 * @returns The attachment.
	 */
	async retrieveUserAttachment(
		userId: string,
		attachmentId: string,
		params?: { user_id_type?: string; expand?: string },
	): Promise<UserAttachment> {
		return this.client.get<UserAttachment>(
			`/users/${encodeURIComponent(userId)}/attachments/${encodeURIComponent(attachmentId)}`,
			params,
		);
	}

	/**
	 * Creates an attachment on a user.
	 *
	 * @param userId - The user ID.
	 * @param body - The attachment data.
	 * @returns The created attachment.
	 */
	async createUserAttachment(
		userId: string,
		body: UserAttachment,
		params?: { user_id_type?: string },
	): Promise<UserAttachment> {
		return this.client.post<UserAttachment>(
			`/users/${encodeURIComponent(userId)}/attachments`,
			body,
			params,
		);
	}

	/**
	 * Tests the Alma Users API connection.
	 *
	 * @returns API response confirming access.
	 */
	async test(): Promise<unknown> {
		return this.client.get<unknown>("/users/operation/test");
	}
}
