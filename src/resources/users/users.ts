import type { AlmaHttpClient } from "../../client.ts";
import type { User, UserAttachment, UserPersonalData, Users } from "./types.ts";

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
		direction?: string;
	}): Promise<Users> {
		return this.client.get<Users>("/almaws/v1/users", params);
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
		params?: { view?: string; expand?: string },
	): Promise<User> {
		return this.client.get<User>(
			`/almaws/v1/users/${encodeURIComponent(userId)}`,
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
		return this.client.get<User>("/almaws/v1/users/ME", params);
	}

	/**
	 * Retrieves personal data for a user.
	 *
	 * @param userId - The user ID.
	 * @returns The user's personal data.
	 */
	async retrieveUserPersonalData(userId: string): Promise<UserPersonalData> {
		return this.client.get<UserPersonalData>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/personal-data`,
		);
	}

	/**
	 * Creates a new user.
	 *
	 * @param body - The user data.
	 * @param params - Optional parameters.
	 * @returning The created user.
	 */
	async createUser(
		body: User,
		params?: { source_user_id?: string; source_institution_code?: string },
	): Promise<User> {
		return this.client.post<User>("/almaws/v1/users", body, params);
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
		params?: { override?: string },
	): Promise<User> {
		return this.client.put<User>(
			`/almaws/v1/users/${encodeURIComponent(userId)}`,
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
		params?: { op?: string },
	): Promise<User> {
		return this.client.post<User>(
			`/almaws/v1/users/${encodeURIComponent(userId)}`,
			body,
			params,
		);
	}

	/**
	 * Deletes a user.
	 *
	 * @param userId - The user ID.
	 */
	async deleteUser(userId: string): Promise<void> {
		return this.client.delete<void>(
			`/almaws/v1/users/${encodeURIComponent(userId)}`,
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
	): Promise<UserAttachment> {
		return this.client.get<UserAttachment>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/attachments/${encodeURIComponent(attachmentId)}`,
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
	): Promise<UserAttachment> {
		return this.client.post<UserAttachment>(
			`/almaws/v1/users/${encodeURIComponent(userId)}/attachments`,
			body,
		);
	}

	/**
	 * Tests the Alma Users API connection.
	 *
	 * @returns API response confirming access.
	 */
	async test(): Promise<unknown> {
		return this.client.get<unknown>("/almaws/v1/users/operation/test");
	}
}
