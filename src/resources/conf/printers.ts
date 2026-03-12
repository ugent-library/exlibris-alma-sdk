import type { AlmaHttpClient } from "../../client.ts";
import type { Printer, Printers } from "./types.ts";

/**
 * Methods for managing printers in the Alma Configuration API.
 */
export class ConfPrintersResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of printers.
	 *
	 * @param params - Optional filters.
	 * @param params.library - Library code filter.
	 * @param params.code - Printer code filter.
	 * @param params.limit - Maximum results.
	 * @param params.offset - Results offset.
	 * @returns A list of printers.
	 */
	async retrievePrinters(params?: {
		library?: string;
		code?: string;
		limit?: number;
		offset?: number;
	}): Promise<Printers> {
		return this.client.get<Printers>("/almaws/v1/conf/printers", params);
	}

	/**
	 * Retrieves a single printer by its ID.
	 *
	 * @param printerId - The printer ID.
	 * @returns The printer object.
	 */
	async retrievePrinter(printerId: string): Promise<Printer> {
		return this.client.get<Printer>(
			`/almaws/v1/conf/printers/${encodeURIComponent(printerId)}`,
		);
	}
}
