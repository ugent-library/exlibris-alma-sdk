import type { AlmaHttpClient } from "../../client.ts";
import type { BibReminder, BibReminders } from "./types.ts";

/**
 * Methods for managing reminders on bibliographic records.
 */
export class BibsRemindersResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of reminders for a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param params - Optional filters.
	 * @param params.type - Filter by reminder type.
	 * @param params.limit - Maximum results.
	 * @param params.offset - Results offset.
	 * @returns A list of reminders.
	 */
	async retrieveBibRemindersList(
		mmsId: string,
		params?: { type?: string; limit?: number; offset?: number },
	): Promise<BibReminders> {
		return this.client.get<BibReminders>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/reminders`,
			params,
		);
	}

	/**
	 * Retrieves a single reminder for a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param reminderId - The reminder ID.
	 * @returns The reminder.
	 */
	async retrieveBibReminder(
		mmsId: string,
		reminderId: string,
	): Promise<BibReminder> {
		return this.client.get<BibReminder>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/reminders/${encodeURIComponent(reminderId)}`,
		);
	}

	/**
	 * Creates a reminder on a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param body - The reminder data.
	 * @returns The created reminder.
	 */
	async createBibReminder(
		mmsId: string,
		body: BibReminder,
	): Promise<BibReminder> {
		return this.client.post<BibReminder>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/reminders`,
			body,
		);
	}

	/**
	 * Updates a reminder on a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param reminderId - The reminder ID.
	 * @param body - The updated reminder data.
	 * @returns The updated reminder.
	 */
	async updateBibReminder(
		mmsId: string,
		reminderId: string,
		body: BibReminder,
	): Promise<BibReminder> {
		return this.client.put<BibReminder>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/reminders/${encodeURIComponent(reminderId)}`,
			body,
		);
	}

	/**
	 * Deletes a reminder from a bibliographic record.
	 *
	 * @param mmsId - The MMS ID.
	 * @param reminderId - The reminder ID.
	 */
	async deleteBibReminder(mmsId: string, reminderId: string): Promise<void> {
		return this.client.delete<void>(
			`/almaws/v1/bibs/${encodeURIComponent(mmsId)}/reminders/${encodeURIComponent(reminderId)}`,
		);
	}
}
