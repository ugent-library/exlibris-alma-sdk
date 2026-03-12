import type { AlmaHttpClient } from "@/client";

import type { LicenseTerm, LicenseTerms, Reminder, Reminders } from "./types";

/**
 * Methods for managing reminders in the Alma Configuration API.
 */
export class ConfRemindersResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of reminders.
	 *
	 * @param params - Optional filters.
	 * @param params.type - Reminder type filter.
	 * @param params.status - Reminder status filter.
	 * @param params.from - From date filter (YYYY-MM-DD).
	 * @param params.to - To date filter (YYYY-MM-DD).
	 * @param params.order_by - Sort field.
	 * @param params.direction - Sort direction: `"ASC"` or `"DESC"`.
	 * @param params.entity_id - Entity ID filter.
	 * @param params.entity_type - Entity type filter.
	 * @param params.limit - Maximum results (0–100).
	 * @param params.offset - Results offset.
	 * @returns A list of reminders.
	 */
	async retrieveReminders(params?: {
		type?: string;
		status?: string;
		from?: string;
		to?: string;
		order_by?: string;
		direction?: string;
		entity_id?: string;
		entity_type?: string;
		limit?: number;
		offset?: number;
	}): Promise<Reminders> {
		return this.client.get<Reminders>("/conf/reminders", params);
	}

	/**
	 * Retrieves a single reminder by its ID.
	 *
	 * @param reminderId - The reminder ID.
	 * @returns The reminder object.
	 */
	async retrieveReminder(reminderId: string): Promise<Reminder> {
		return this.client.get<Reminder>(
			`/conf/reminders/${encodeURIComponent(reminderId)}`,
		);
	}

	/**
	 * Creates a new reminder.
	 *
	 * @param body - The reminder data.
	 * @returns The created reminder.
	 */
	async createReminder(body: Reminder): Promise<Reminder> {
		return this.client.post<Reminder>("/conf/reminders", body);
	}

	/**
	 * Updates a reminder.
	 *
	 * @param reminderId - The reminder ID.
	 * @param body - The updated reminder data.
	 * @returns The updated reminder.
	 */
	async updateReminder(reminderId: string, body: Reminder): Promise<Reminder> {
		return this.client.put<Reminder>(
			`/conf/reminders/${encodeURIComponent(reminderId)}`,
			body,
		);
	}

	/**
	 * Deletes a reminder.
	 *
	 * @param reminderId - The reminder ID.
	 */
	async deleteReminder(reminderId: string): Promise<void> {
		return this.client.delete<void>(
			`/conf/reminders/${encodeURIComponent(reminderId)}`,
		);
	}

	/**
	 * Retrieves a list of license terms.
	 *
	 * @returns A list of license terms.
	 */
	async retrieveLicenseTerms(): Promise<LicenseTerms> {
		return this.client.get<LicenseTerms>("/conf/license-terms");
	}

	/**
	 * Retrieves a single license term by its code.
	 *
	 * @param licenseTermCode - The license term code.
	 * @returns The license term.
	 */
	async retrieveLicenseTerm(licenseTermCode: string): Promise<LicenseTerm> {
		return this.client.get<LicenseTerm>(
			`/conf/license-terms/${encodeURIComponent(licenseTermCode)}`,
		);
	}

	/**
	 * Creates a new license term.
	 *
	 * @param body - The license term data.
	 * @returns The created license term.
	 */
	async createLicenseTerm(body: LicenseTerm): Promise<LicenseTerm> {
		return this.client.post<LicenseTerm>("/conf/license-terms", body);
	}

	/**
	 * Updates a license term.
	 *
	 * @param licenseTermCode - The license term code.
	 * @param body - The updated license term data.
	 * @returns The updated license term.
	 */
	async updateLicenseTerm(
		licenseTermCode: string,
		body: LicenseTerm,
	): Promise<LicenseTerm> {
		return this.client.put<LicenseTerm>(
			`/conf/license-terms/${encodeURIComponent(licenseTermCode)}`,
			body,
		);
	}

	/**
	 * Deletes a license term.
	 *
	 * @param licenseTermCode - The license term code.
	 */
	async deleteLicenseTerm(licenseTermCode: string): Promise<void> {
		return this.client.delete<void>(
			`/conf/license-terms/${encodeURIComponent(licenseTermCode)}`,
		);
	}
}
