import type { AlmaHttpClient } from "@/client";
import { path } from "@/util/uri";

import type { LegantoNotifications } from "./types";

/**
 * Methods for retrieving Leganto notifications for a user.
 */
export class UsersLegantoResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves Leganto notifications for a user.
	 *
	 * @param userName - The user name.
	 * @param params - Optional pagination.
	 * @returns A list of Leganto notifications.
	 */
	async retrieveLegantoNotifications(
		userName: string,
		params: {
			notificationType: string;
			from: string;
			to: string;
			limit?: number;
			unread?: string;
		},
	): Promise<LegantoNotifications> {
		return this.client.get<LegantoNotifications>(
			path`/users/${userName}/leganto-notifications`,
			params,
		);
	}
}
