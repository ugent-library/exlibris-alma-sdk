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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/R0VUIC9hbG1hd3MvdjEvdXNlcnMve3VzZXJfbmFtZX0vbGVnYW50by1ub3RpZmljYXRpb25z/
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
