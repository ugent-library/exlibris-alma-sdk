import type { AlmaHttpClient } from "@/client";

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
	 */
	async retrieveGeneralConfig(params?: {
		expand?: string;
	}): Promise<GeneralConfig> {
		return this.client.get<GeneralConfig>("/almaws/v1/conf/general", params);
	}

	/**
	 * Retrieves a list of all code tables.
	 *
	 * @param params - Optional filters.
	 * @param params.scope - Institution or library code.
	 * @param params.limit - Maximum results.
	 * @param params.offset - Results offset.
	 * @returns A list of code tables.
	 */
	async retrieveCodeTables(params?: {
		scope?: string;
		limit?: number;
		offset?: number;
	}): Promise<CodeTables> {
		return this.client.get<CodeTables>("/almaws/v1/conf/code-tables", params);
	}

	/**
	 * Retrieves a single code table by name.
	 *
	 * @param codeTableName - The code table name (e.g. `"UserGroups"`).
	 * @param params - Optional parameters.
	 * @param params.scope - Institution or library code.
	 * @param params.lang - Requested language.
	 * @returns The code table with all its rows.
	 */
	async retrieveCodeTable(
		codeTableName: string,
		params?: { scope?: string; lang?: string },
	): Promise<CodeTable> {
		return this.client.get<CodeTable>(
			`/almaws/v1/conf/code-tables/${encodeURIComponent(codeTableName)}`,
			params,
		);
	}

	/**
	 * Updates a code table.
	 *
	 * @param codeTableName - The code table name.
	 * @param body - The updated code table.
	 * @returns The updated code table.
	 */
	async updateCodeTable(
		codeTableName: string,
		body: CodeTable,
	): Promise<CodeTable> {
		return this.client.put<CodeTable>(
			`/almaws/v1/conf/code-tables/${encodeURIComponent(codeTableName)}`,
			body,
		);
	}

	/**
	 * Retrieves a list of all mapping tables.
	 *
	 * @returns A list of mapping tables.
	 */
	async retrieveMappingTables(): Promise<MappingTables> {
		return this.client.get<MappingTables>("/almaws/v1/conf/mapping-tables");
	}

	/**
	 * Retrieves a single mapping table by name.
	 *
	 * @param mappingTableName - The mapping table name.
	 * @param params - Optional parameters.
	 * @param params.scope - Institution or library code.
	 * @returns The mapping table.
	 */
	async retrieveMappingTable(
		mappingTableName: string,
		params?: { scope?: string },
	): Promise<MappingTable> {
		return this.client.get<MappingTable>(
			`/almaws/v1/conf/mapping-tables/${encodeURIComponent(mappingTableName)}`,
			params,
		);
	}

	/**
	 * Updates a mapping table.
	 *
	 * @param mappingTableName - The mapping table name.
	 * @param body - The updated mapping table.
	 * @returns The updated mapping table.
	 */
	async updateMappingTable(
		mappingTableName: string,
		body: MappingTable,
	): Promise<MappingTable> {
		return this.client.put<MappingTable>(
			`/almaws/v1/conf/mapping-tables/${encodeURIComponent(mappingTableName)}`,
			body,
		);
	}

	/**
	 * Retrieves institution-wide open hours.
	 *
	 * @param params - Required scope parameter.
	 * @param params.scope - Institution or library scope (required).
	 * @returns The open hours definition.
	 */
	async retrieveOpenHours(params: { scope: string }): Promise<OpenHours> {
		return this.client.get<OpenHours>("/almaws/v1/conf/open-hours", params);
	}

	/**
	 * Updates institution-wide open hours.
	 *
	 * @param body - The updated open hours.
	 * @param params - Optional parameters.
	 * @returns The updated open hours.
	 */
	async updateOpenHours(
		body: OpenHours,
		params?: { scope?: string },
	): Promise<OpenHours> {
		return this.client.put<OpenHours>(
			"/almaws/v1/conf/open-hours",
			body,
			params,
		);
	}

	/**
	 * Deletes open hours configuration.
	 *
	 * @param params - Optional parameters.
	 */
	async deleteOpenHours(params?: { scope?: string }): Promise<void> {
		return this.client.delete<void>("/almaws/v1/conf/open-hours", params);
	}

	/**
	 * Retrieves a list of letters.
	 *
	 * @param params - Optional parameters.
	 * @param params.type - Letter type filter.
	 * @returns A list of letters.
	 */
	async retrieveLetters(params?: { type?: string }): Promise<Letters> {
		return this.client.get<Letters>("/almaws/v1/conf/letters", params);
	}

	/**
	 * Retrieves a single letter by its code.
	 *
	 * @param letterCode - The letter code.
	 * @returns The letter template.
	 */
	async retrieveLetter(letterCode: string): Promise<Letter> {
		return this.client.get<Letter>(
			`/almaws/v1/conf/letters/${encodeURIComponent(letterCode)}`,
		);
	}

	/**
	 * Updates a letter template.
	 *
	 * @param letterCode - The letter code.
	 * @param body - The updated letter template.
	 * @returns The updated letter.
	 */
	async updateLetter(letterCode: string, body: Letter): Promise<Letter> {
		return this.client.put<Letter>(
			`/almaws/v1/conf/letters/${encodeURIComponent(letterCode)}`,
			body,
		);
	}

	/**
	 * Retrieves institution/library relations.
	 *
	 * @param params - Required scope parameter.
	 * @param params.scope - Institution or library scope (required).
	 * @returns The relations object.
	 */
	async retrieveRelations(params: { scope: string }): Promise<Relations> {
		return this.client.get<Relations>("/almaws/v1/conf/relations", params);
	}

	/**
	 * Updates institution/library relations.
	 *
	 * @param body - The updated relations.
	 * @returns The updated relations.
	 */
	async updateRelations(body: Relations): Promise<Relations> {
		return this.client.put<Relations>("/almaws/v1/conf/relations", body);
	}

	/**
	 * Deletes institution/library relations.
	 */
	async deleteRelations(): Promise<void> {
		return this.client.delete<void>("/almaws/v1/conf/relations");
	}

	/**
	 * Retrieves fee transactions.
	 *
	 * @param params - Optional filters.
	 * @returns Fee transactions.
	 */
	async retrieveFeeTransactions(
		params?: Record<string, string | number | boolean | undefined | null>,
	): Promise<FeeTransactions> {
		return this.client.get<FeeTransactions>(
			"/almaws/v1/conf/utilities/fee-transactions",
			params,
		);
	}

	/**
	 * Tests the Configuration API connection.
	 *
	 * @returns A test response confirming the API is reachable.
	 */
	async test(): Promise<Record<string, unknown>> {
		return this.client.get<Record<string, unknown>>("/almaws/v1/conf/test");
	}
}
