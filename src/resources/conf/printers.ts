import type { AlmaHttpClient } from "@/client";
import { path } from "@/util/uri";

import type { Printer, Printers } from "./types";

/**
 * Methods for managing printers in the Alma Configuration API.
 */
export class PrintersResource {
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9wcmludGVycw==/
	 */
	async retrievePrinters(params?: {
		library?: string;
		printout_queue?: string;
		name?: string;
		code?: string;
		limit?: number;
		offset?: number;
	}): Promise<Printers> {
		return this.client.get<Printers>("/conf/printers", params);
	}

	/**
	 * Retrieves a single printer by its ID.
	 *
	 * @param printerId - The printer ID.
	 * @returns The printer object.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9wcmludGVycy97cHJpbnRlcl9pZH0=/
	 */
	async retrievePrinter(printerId: string): Promise<Printer> {
		return this.client.get<Printer>(path`/conf/printers/${printerId}`);
	}
}
