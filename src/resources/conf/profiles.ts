import type { AlmaHttpClient } from "@/client";

import type {
	DepositProfile,
	DepositProfiles,
	ImportProfile,
	ImportProfiles,
	IntegrationProfile,
	IntegrationProfiles,
} from "./types";

/**
 * Methods for managing import profiles, integration profiles, and deposit
 * profiles in the Alma Configuration API.
 */
export class ConfProfilesResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of MD import profiles.
	 *
	 * @returns A list of MD import profiles.
	 */
	async retrieveImportProfiles(params?: {
		type?: string;
		ie_type?: string;
	}): Promise<ImportProfiles> {
		return this.client.get<ImportProfiles>(
			"/almaws/v1/conf/md-import-profiles",
			params,
		);
	}

	/**
	 * Retrieves a single MD import profile.
	 *
	 * @param profileId - The import profile ID.
	 * @returns The import profile.
	 */
	async retrieveImportProfile(profileId: string): Promise<ImportProfile> {
		return this.client.get<ImportProfile>(
			`/almaws/v1/conf/md-import-profiles/${encodeURIComponent(profileId)}`,
		);
	}

	/**
	 * Performs an action on an import profile (e.g., run import).
	 *
	 * @param profileId - The import profile ID.
	 * @param body - The action body.
	 * @param params - Action parameters.
	 * @param params.op - The operation.
	 * @returns The operation result.
	 */
	async operateImportProfile(
		profileId: string,
		body: Record<string, unknown>,
		params?: { op?: string },
	): Promise<Record<string, unknown>> {
		return this.client.post<Record<string, unknown>>(
			`/almaws/v1/conf/md-import-profiles/${encodeURIComponent(profileId)}`,
			body,
			params,
		);
	}

	/**
	 * Retrieves a list of integration profiles.
	 *
	 * @param params - Optional filters.
	 * @param params.type - Profile type filter.
	 * @param params.q - Search query.
	 * @param params.limit - Maximum results.
	 * @param params.offset - Results offset.
	 * @returns A list of integration profiles.
	 */
	async retrieveIntegrationProfiles(params?: {
		type?: string;
		q?: string;
		limit?: number;
		offset?: number;
	}): Promise<IntegrationProfiles> {
		return this.client.get<IntegrationProfiles>(
			"/almaws/v1/conf/integration-profiles",
			params,
		);
	}

	/**
	 * Retrieves a single integration profile.
	 *
	 * @param id - The integration profile ID.
	 * @returns The integration profile.
	 */
	async retrieveIntegrationProfile(id: string): Promise<IntegrationProfile> {
		return this.client.get<IntegrationProfile>(
			`/almaws/v1/conf/integration-profiles/${encodeURIComponent(id)}`,
		);
	}

	/**
	 * Creates a new integration profile.
	 *
	 * @param body - The integration profile data.
	 * @returns The created integration profile.
	 */
	async createIntegrationProfile(
		body: IntegrationProfile,
	): Promise<IntegrationProfile> {
		return this.client.post<IntegrationProfile>(
			"/almaws/v1/conf/integration-profiles",
			body,
		);
	}

	/**
	 * Updates an integration profile.
	 *
	 * @param id - The integration profile ID.
	 * @param body - The updated integration profile.
	 * @returns The updated integration profile.
	 */
	async updateIntegrationProfile(
		id: string,
		body: IntegrationProfile,
	): Promise<IntegrationProfile> {
		return this.client.put<IntegrationProfile>(
			`/almaws/v1/conf/integration-profiles/${encodeURIComponent(id)}`,
			body,
		);
	}

	/**
	 * Deletes an integration profile.
	 *
	 * @param id - The integration profile ID.
	 */
	async deleteIntegrationProfile(id: string): Promise<void> {
		return this.client.delete<void>(
			`/almaws/v1/conf/integration-profiles/${encodeURIComponent(id)}`,
		);
	}

	/**
	 * Retrieves a list of deposit profiles.
	 *
	 * @param params - Optional pagination.
	 * @param params.limit - Maximum results.
	 * @param params.offset - Results offset.
	 * @returns A list of deposit profiles.
	 */
	async retrieveDepositProfiles(params?: {
		limit?: number;
		offset?: number;
	}): Promise<DepositProfiles> {
		return this.client.get<DepositProfiles>(
			"/almaws/v1/conf/deposit-profiles",
			params,
		);
	}

	/**
	 * Retrieves a single deposit profile.
	 *
	 * @param depositProfileId - The deposit profile ID.
	 * @returns The deposit profile.
	 */
	async retrieveDepositProfile(
		depositProfileId: string,
	): Promise<DepositProfile> {
		return this.client.get<DepositProfile>(
			`/almaws/v1/conf/deposit-profiles/${encodeURIComponent(depositProfileId)}`,
		);
	}

	/**
	 * Triggers a Library Open Workflow.
	 *
	 * @param workflowId - The workflow ID.
	 * @param body - Workflow trigger parameters.
	 * @param params - Optional parameters.
	 * @returns The operation result.
	 */
	async triggerLibraryOpenWorkflow(
		workflowId: string,
		body: Record<string, unknown>,
		params?: Record<string, string | number | boolean | undefined | null>,
	): Promise<Record<string, unknown>> {
		return this.client.post<Record<string, unknown>>(
			`/almaws/v1/conf/workflows/${encodeURIComponent(workflowId)}`,
			body,
			params,
		);
	}
}
