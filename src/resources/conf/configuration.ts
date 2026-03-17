import type { AlmaHttpClient } from "@/client";
import { path } from "@/util/uri";

import type {
	CodeTable,
	CodeTables,
	FeeTransactions,
	GeneralConfig,
	Letter,
	Letters,
	MappingTable,
	MappingTables,
	OpenHours,
	Relations,
} from "./types";

/**
 * Methods for managing general configuration, code tables, mapping tables,
 * letters, open hours, and relations in the Alma Configuration API.
 */
export class ConfConfigurationResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves the institution's general configuration.
	 *
	 * @param params - Optional expand parameter.
	 * @param params.expand - Additional information to include.
	 * @returns The general configuration object.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9nZW5lcmFs/
	 */
	async retrieveGeneralConfig(params?: {
		expand?: string;
	}): Promise<GeneralConfig> {
		return this.client.get<GeneralConfig>("/conf/general", params);
	}

	/**
	 * Retrieves a list of all code tables.
	 *
	 * @param params - Optional filters.
	 * @param params.scope - Institution or library code.
	 * @param params.limit - Maximum results.
	 * @param params.offset - Results offset.
	 * @returns A list of code tables.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9jb2RlLXRhYmxlcw==/
	 */
	async retrieveCodeTables(params?: {
		scope?: string;
		limit?: number;
		offset?: number;
	}): Promise<CodeTables> {
		return this.client.get<CodeTables>("/conf/code-tables", params);
	}

	/**
	 * Retrieves a single code table by name.
	 *
	 * @param codeTableName - The code table name (e.g. `"UserGroups"`).
	 * @param params - Optional parameters.
	 * @param params.scope - Institution or library code.
	 * @param params.lang - Requested language.
	 * @returns The code table with all its rows.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9jb2RlLXRhYmxlcy97Y29kZVRhYmxlTmFtZX0=/
	 */
	async retrieveCodeTable(
		codeTableName: string,
		params?: { scope?: string; lang?: string },
	): Promise<CodeTable> {
		return this.client.get<CodeTable>(
			path`/conf/code-tables/${codeTableName}`,
			params,
		);
	}

	/**
	 * Updates a code table.
	 *
	 * @param codeTableName - The code table name.
	 * @param body - The updated code table.
	 * @returns The updated code table.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/UFVUIC9hbG1hd3MvdjEvY29uZi9jb2RlLXRhYmxlcy97Y29kZVRhYmxlTmFtZX0=/
	 */
	async updateCodeTable(
		codeTableName: string,
		body: CodeTable,
	): Promise<CodeTable> {
		return this.client.put<CodeTable>(
			path`/conf/code-tables/${codeTableName}`,
			body,
		);
	}

	/**
	 * Retrieves a list of all mapping tables.
	 *
	 * @returns A list of mapping tables.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9tYXBwaW5nLXRhYmxlcw==/
	 */
	async retrieveMappingTables(): Promise<MappingTables> {
		return this.client.get<MappingTables>("/conf/mapping-tables");
	}

	/**
	 * Retrieves a single mapping table by name.
	 *
	 * @param mappingTableName - The mapping table name.
	 * @param params - Optional parameters.
	 * @param params.scope - Institution or library code.
	 * @returns The mapping table.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9tYXBwaW5nLXRhYmxlcy97bWFwcGluZ1RhYmxlTmFtZX0=/
	 */
	async retrieveMappingTable(
		mappingTableName: string,
		params?: { scope?: string },
	): Promise<MappingTable> {
		return this.client.get<MappingTable>(
			path`/conf/mapping-tables/${mappingTableName}`,
			params,
		);
	}

	/**
	 * Updates a mapping table.
	 *
	 * @param mappingTableName - The mapping table name.
	 * @param body - The updated mapping table.
	 * @returns The updated mapping table.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/UFVUIC9hbG1hd3MvdjEvY29uZi9tYXBwaW5nLXRhYmxlcy97bWFwcGluZ1RhYmxlTmFtZX0=/
	 */
	async updateMappingTable(
		mappingTableName: string,
		body: MappingTable,
	): Promise<MappingTable> {
		return this.client.put<MappingTable>(
			path`/conf/mapping-tables/${mappingTableName}`,
			body,
		);
	}

	/**
	 * Retrieves institution-wide open hours.
	 *
	 * @param params - Required scope parameter.
	 * @param params.scope - Institution or library scope (required).
	 * @returns The open hours definition.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9vcGVuLWhvdXJz/
	 */
	async retrieveOpenHours(params: { scope: string }): Promise<OpenHours> {
		return this.client.get<OpenHours>("/conf/open-hours", params);
	}

	/**
	 * Updates institution-wide open hours.
	 *
	 * @param body - The updated open hours.
	 * @param params - Optional parameters.
	 * @returns The updated open hours.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/UFVUIC9hbG1hd3MvdjEvY29uZi9vcGVuLWhvdXJz/
	 */
	async updateOpenHours(
		body: OpenHours,
		params: { scope: string },
	): Promise<OpenHours> {
		return this.client.put<OpenHours>("/conf/open-hours", body, params);
	}

	/**
	 * Deletes open hours configuration.
	 *
	 * @param params - Optional parameters.
	 */
	async deleteOpenHours(params: { scope: string }): Promise<void> {
		return this.client.delete<void>("/conf/open-hours", params);
	}

	/**
	 * Retrieves a list of letters.
	 *
	 * @param params - Optional parameters.
	 * @param params.type - Letter type filter.
	 * @returns A list of letters.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9sZXR0ZXJz/
	 */
	async retrieveLetters(params?: { type?: string }): Promise<Letters> {
		return this.client.get<Letters>("/conf/letters", params);
	}

	/**
	 * Retrieves a single letter by its code.
	 *
	 * @param letterCode - The letter code.
	 * @returns The letter template.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9sZXR0ZXJzL3tsZXR0ZXJDb2RlfQ==/
	 */
	async retrieveLetter(letterCode: string): Promise<Letter> {
		return this.client.get<Letter>(path`/conf/letters/${letterCode}`);
	}

	/**
	 * Updates a letter template.
	 *
	 * @param letterCode - The letter code.
	 * @param body - The updated letter template.
	 * @returns The updated letter.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/UFVUIC9hbG1hd3MvdjEvY29uZi9sZXR0ZXJzL3tsZXR0ZXJDb2RlfQ==/
	 */
	async updateLetter(letterCode: string, body: Letter): Promise<Letter> {
		return this.client.put<Letter>(path`/conf/letters/${letterCode}`, body);
	}

	/**
	 * Retrieves institution/library relations.
	 *
	 * @param params - Required scope parameter.
	 * @param params.scope - Institution or library scope (required).
	 * @returns The relations object.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9yZWxhdGlvbnM=/
	 */
	async retrieveRelations(params: { scope: string }): Promise<Relations> {
		return this.client.get<Relations>("/conf/relations", params);
	}

	/**
	 * Updates institution/library relations.
	 *
	 * @param body - The updated relations.
	 * @returns The updated relations.
	 */
	async updateRelations(
		body: Relations,
		params: { scope: string },
	): Promise<Relations> {
		return this.client.put<Relations>("/conf/relations", body, params);
	}

	/**
	 * Deletes institution/library relations.
	 */
	async deleteRelations(params: {
		scope: string;
		libraryCode: string;
	}): Promise<void> {
		return this.client.delete<void>("/conf/relations", params);
	}

	/**
	 * Retrieves fee transactions.
	 *
	 * @param params - Optional filters.
	 * @returns Fee transactions.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi91dGlsaXRpZXMvZmVlLXRyYW5zYWN0aW9ucw==/
	 */
	async retrieveFeeTransactions(
		params?: Record<string, string | number | boolean | undefined | null>,
	): Promise<FeeTransactions> {
		return this.client.get<FeeTransactions>(
			"/conf/utilities/fee-transactions",
			params,
		);
	}
}
