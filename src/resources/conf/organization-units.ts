import type { AlmaHttpClient } from "@/client";
import { path } from "@/util/uri";

import type {
	CircDesk,
	CircDesks,
	Departments,
	Libraries,
	Library,
	Location,
	Locations,
	OpenHours,
} from "./types";

/**
 * Methods for managing libraries, circulation desks, locations, and departments
 * in the Alma Configuration API.
 */
export class OrganizationUnitsResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of libraries for the institution.
	 *
	 * @returns A list of library objects.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9saWJyYXJpZXM=/
	 */
	async retrieveLibraries(): Promise<Libraries> {
		return this.client.get<Libraries>("/conf/libraries");
	}

	/**
	 * Retrieves a single library by its code.
	 *
	 * @param libraryCode - The library code (e.g. `"MAIN"`).
	 * @returns The library object.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9saWJyYXJpZXMve2xpYnJhcnlDb2RlfQ==/
	 */
	async retrieveLibrary(libraryCode: string): Promise<Library> {
		return this.client.get<Library>(path`/conf/libraries/${libraryCode}`);
	}

	/**
	 * Updates a library.
	 *
	 * @param libraryCode - The library code.
	 * @param body - The updated library object.
	 * @returns The updated library.
	 */
	async updateLibrary(libraryCode: string, body: Library): Promise<Library> {
		return this.client.put<Library>(path`/conf/libraries/${libraryCode}`, body);
	}

	/**
	 * Retrieves a list of departments for the institution.
	 *
	 * @param params - Optional filters.
	 * @param params.type - Department type filter.
	 * @param params.view - View type.
	 * @param params.library - Library code filter.
	 * @returns A list of departments.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9kZXBhcnRtZW50cw==/
	 */
	async retrieveDepartments(params?: {
		type?: string;
		view?: string;
		library?: string;
	}): Promise<Departments> {
		return this.client.get<Departments>("/conf/departments", params);
	}

	/**
	 * Retrieves a list of circulation desks for a library.
	 *
	 * @param libraryCode - The library code.
	 * @param params - Optional pagination.
	 * @param params.limit - Maximum results (0-100).
	 * @param params.offset - Results offset.
	 * @returns A list of circulation desks.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9saWJyYXJpZXMve2xpYnJhcnlDb2RlfS9jaXJjLWRlc2tzLw==/
	 */
	async retrieveCircDesks(
		libraryCode: string,
		params?: { limit?: number; offset?: number },
	): Promise<CircDesks> {
		return this.client.get<CircDesks>(
			path`/conf/libraries/${libraryCode}/circ-desks/`,
			params,
		);
	}

	/**
	 * Retrieves a single circulation desk.
	 *
	 * @param libraryCode - The library code.
	 * @param circDeskCode - The circulation desk code.
	 * @returns The circulation desk object.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9saWJyYXJpZXMve2xpYnJhcnlDb2RlfS9jaXJjLWRlc2tzL3tjaXJjRGVza0NvZGV9/
	 */
	async retrieveCircDesk(
		libraryCode: string,
		circDeskCode: string,
	): Promise<CircDesk> {
		return this.client.get<CircDesk>(
			path`/conf/libraries/${libraryCode}/circ-desks/${circDeskCode}`,
		);
	}

	/**
	 * Retrieves a list of locations for a library.
	 *
	 * @param libraryCode - The library code.
	 * @returns A list of locations.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9saWJyYXJpZXMve2xpYnJhcnlDb2RlfS9sb2NhdGlvbnM=/
	 */
	async retrieveLocations(libraryCode: string): Promise<Locations> {
		return this.client.get<Locations>(
			path`/conf/libraries/${libraryCode}/locations`,
		);
	}

	/**
	 * Retrieves a single location.
	 *
	 * @param libraryCode - The library code.
	 * @param locationCode - The location code.
	 * @returns The location object.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9saWJyYXJpZXMve2xpYnJhcnlDb2RlfS9sb2NhdGlvbnMve2xvY2F0aW9uQ29kZX0=/
	 */
	async retrieveLocation(
		libraryCode: string,
		locationCode: string,
	): Promise<Location> {
		return this.client.get<Location>(
			path`/conf/libraries/${libraryCode}/locations/${locationCode}`,
		);
	}

	/**
	 * Creates a new location in a library.
	 *
	 * @param libraryCode - The library code.
	 * @param body - The location data.
	 * @returns The created location.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/UE9TVCAvYWxtYXdzL3YxL2NvbmYvbGlicmFyaWVzL3tsaWJyYXJ5Q29kZX0vbG9jYXRpb25z/
	 */
	async createLocation(libraryCode: string, body: Location): Promise<Location> {
		return this.client.post<Location>(
			path`/conf/libraries/${libraryCode}/locations`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/UFVUIC9hbG1hd3MvdjEvY29uZi9saWJyYXJpZXMve2xpYnJhcnlDb2RlfS9sb2NhdGlvbnMve2xvY2F0aW9uQ29kZX0=/
	 */
	async updateLocation(
		libraryCode: string,
		locationCode: string,
		body: Location,
	): Promise<Location> {
		return this.client.put<Location>(
			path`/conf/libraries/${libraryCode}/locations/${locationCode}`,
			body,
		);
	}

	/**
	 * Deletes a location.
	 *
	 * @param libraryCode - The library code.
	 * @param locationCode - The location code.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/REVMRVRFIC9hbG1hd3MvdjEvY29uZi9saWJyYXJpZXMve2xpYnJhcnlDb2RlfS9sb2NhdGlvbnMve2xvY2F0aW9uQ29kZX0=/
	 */
	async deleteLocation(
		libraryCode: string,
		locationCode: string,
	): Promise<void> {
		return this.client.delete<void>(
			path`/conf/libraries/${libraryCode}/locations/${locationCode}`,
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
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/conf/R0VUIC9hbG1hd3MvdjEvY29uZi9saWJyYXJpZXMve2xpYnJhcnlDb2RlfS9vcGVuLWhvdXJz/
	 */
	async retrieveLibraryOpenHours(
		libraryCode: string,
		params?: { from?: string; to?: string },
	): Promise<OpenHours> {
		return this.client.get<OpenHours>(
			path`/conf/libraries/${libraryCode}/open-hours`,
			params,
		);
	}
}
