import type { AlmaHttpClient } from "../../client.ts";
import type {
	CircDesk,
	CircDesks,
	Departments,
	Libraries,
	Library,
	Location,
	Locations,
	OpenHours,
} from "./types.ts";

/**
 * Methods for managing libraries, circulation desks, locations, and departments
 * in the Alma Configuration API.
 */
export class ConfOrganizationsResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of libraries for the institution.
	 *
	 * @returns A list of library objects.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9saWJyYXJpZXM=/
	 */
	async retrieveLibraries(): Promise<Libraries> {
		return this.client.get<Libraries>("/almaws/v1/conf/libraries");
	}

	/**
	 * Retrieves a single library by its code.
	 *
	 * @param libraryCode - The library code (e.g. `"MAIN"`).
	 * @returns The library object.
	 */
	async retrieveLibrary(libraryCode: string): Promise<Library> {
		return this.client.get<Library>(
			`/almaws/v1/conf/libraries/${encodeURIComponent(libraryCode)}`,
		);
	}

	/**
	 * Updates a library.
	 *
	 * @param libraryCode - The library code.
	 * @param body - The updated library object.
	 * @returns The updated library.
	 */
	async updateLibrary(libraryCode: string, body: Library): Promise<Library> {
		return this.client.put<Library>(
			`/almaws/v1/conf/libraries/${encodeURIComponent(libraryCode)}`,
			body,
		);
	}

	/**
	 * Retrieves a list of departments for the institution.
	 *
	 * @param params - Optional filters.
	 * @param params.type - Department type filter.
	 * @param params.view - View type.
	 * @param params.library - Library code filter.
	 * @returns A list of departments.
	 */
	async retrieveDepartments(params?: {
		type?: string;
		view?: string;
		library?: string;
	}): Promise<Departments> {
		return this.client.get<Departments>("/almaws/v1/conf/departments", params);
	}

	/**
	 * Retrieves a list of circulation desks for a library.
	 *
	 * @param libraryCode - The library code.
	 * @param params - Optional pagination.
	 * @param params.limit - Maximum results (0–100).
	 * @param params.offset - Results offset.
	 * @returns A list of circulation desks.
	 */
	async retrieveCircDesks(
		libraryCode: string,
		params?: { limit?: number; offset?: number },
	): Promise<CircDesks> {
		return this.client.get<CircDesks>(
			`/almaws/v1/conf/libraries/${encodeURIComponent(libraryCode)}/circ-desks/`,
			params,
		);
	}

	/**
	 * Retrieves a single circulation desk.
	 *
	 * @param libraryCode - The library code.
	 * @param circDeskCode - The circulation desk code.
	 * @returns The circulation desk object.
	 */
	async retrieveCircDesk(
		libraryCode: string,
		circDeskCode: string,
	): Promise<CircDesk> {
		return this.client.get<CircDesk>(
			`/almaws/v1/conf/libraries/${encodeURIComponent(libraryCode)}/circ-desks/${encodeURIComponent(circDeskCode)}`,
		);
	}

	/**
	 * Retrieves a list of locations for a library.
	 *
	 * @param libraryCode - The library code.
	 * @returns A list of locations.
	 */
	async retrieveLocations(libraryCode: string): Promise<Locations> {
		return this.client.get<Locations>(
			`/almaws/v1/conf/libraries/${encodeURIComponent(libraryCode)}/locations`,
		);
	}

	/**
	 * Retrieves a single location.
	 *
	 * @param libraryCode - The library code.
	 * @param locationCode - The location code.
	 * @returns The location object.
	 */
	async retrieveLocation(
		libraryCode: string,
		locationCode: string,
	): Promise<Location> {
		return this.client.get<Location>(
			`/almaws/v1/conf/libraries/${encodeURIComponent(libraryCode)}/locations/${encodeURIComponent(locationCode)}`,
		);
	}

	/**
	 * Creates a new location in a library.
	 *
	 * @param libraryCode - The library code.
	 * @param body - The location data.
	 * @returns The created location.
	 */
	async createLocation(libraryCode: string, body: Location): Promise<Location> {
		return this.client.post<Location>(
			`/almaws/v1/conf/libraries/${encodeURIComponent(libraryCode)}/locations`,
			body,
		);
	}

	/**
	 * Updates a location.
	 *
	 * @param libraryCode - The library code.
	 * @param locationCode - The location code.
	 * @param body - The updated location data.
	 * @returns The updated location.
	 */
	async updateLocation(
		libraryCode: string,
		locationCode: string,
		body: Location,
	): Promise<Location> {
		return this.client.put<Location>(
			`/almaws/v1/conf/libraries/${encodeURIComponent(libraryCode)}/locations/${encodeURIComponent(locationCode)}`,
			body,
		);
	}

	/**
	 * Deletes a location.
	 *
	 * @param libraryCode - The library code.
	 * @param locationCode - The location code.
	 */
	async deleteLocation(
		libraryCode: string,
		locationCode: string,
	): Promise<void> {
		return this.client.delete<void>(
			`/almaws/v1/conf/libraries/${encodeURIComponent(libraryCode)}/locations/${encodeURIComponent(locationCode)}`,
		);
	}

	/**
	 * Retrieves open hours for a specific library.
	 *
	 * @param libraryCode - The library code.
	 * @param params - Optional date range.
	 * @param params.from - Start date (YYYY-MM-DD).
	 * @param params.to - End date (YYYY-MM-DD).
	 * @returns Open hours data.
	 */
	async retrieveLibraryOpenHours(
		libraryCode: string,
		params?: { from?: string; to?: string },
	): Promise<OpenHours> {
		return this.client.get<OpenHours>(
			`/almaws/v1/conf/libraries/${encodeURIComponent(libraryCode)}/open-hours`,
			params,
		);
	}
}
