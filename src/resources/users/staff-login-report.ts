import type { AlmaHttpClient } from "../../client.ts";
import type { StaffLoginReport } from "./types.ts";

/**
 * Methods for retrieving the staff login report from the Alma Users API.
 */
export class UsersStaffLoginReportResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves the staff login report.
	 *
	 * @param params - Optional filters and pagination.
	 * @param params.limit - Maximum results.
	 * @param params.offset - Results offset.
	 * @returns The staff login report.
	 */
	async retrieveStaffLoginReport(params?: {
		limit?: number;
		offset?: number;
	}): Promise<StaffLoginReport> {
		return this.client.get<StaffLoginReport>(
			"/almaws/v1/users/staff-login-report",
			params,
		);
	}
}
