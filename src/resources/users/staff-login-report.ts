import type { AlmaHttpClient } from "@/client";

import type { StaffLoginReport } from "./types";

/**
 * Methods for retrieving the staff login report from the Alma Users API.
 */
export class StaffLoginReportResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves the staff login report.
	 *
	 * @param params - Optional filters and pagination.
	 * @param params.limit - Maximum results.
	 * @param params.offset - Results offset.
	 * @returns The staff login report.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/users/R0VUIC9hbG1hd3MvdjEvdXNlcnMvc3RhZmYtbG9naW4tcmVwb3J0/
	 */
	async retrieveStaffLoginReport(params: {
		login_date_from: string;
		login_date_to: string;
		successful?: string;
		limit?: number;
		offset?: number;
	}): Promise<StaffLoginReport> {
		return this.client.get<StaffLoginReport>(
			"/users/staff-login-report",
			params,
		);
	}
}
