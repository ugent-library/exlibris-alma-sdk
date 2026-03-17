import type { AlmaHttpClient } from "@/client";

import { GeneralResource } from "./general";
import { JobsResource } from "./jobs";
import { OrganizationUnitsResource } from "./organization-units";
import { PrintersResource } from "./printers";
import { ProfilesResource } from "./profiles";
import { RemindersResource } from "./reminders";
import { SetsResource } from "./sets";

export type {
	AlmaSet,
	CircDesk,
	CircDesks,
	CodeTable,
	CodeTables,
	Departments,
	DepositProfile,
	DepositProfiles,
	FeeTransactions,
	GeneralConfig,
	ImportProfile,
	ImportProfiles,
	IntegrationProfile,
	IntegrationProfiles,
	Job,
	JobInstance,
	JobInstanceEvents,
	JobInstanceMatches,
	JobInstances,
	Jobs,
	Letter,
	Letters,
	Libraries,
	Library,
	LicenseTerm,
	LicenseTerms,
	Location,
	Locations,
	MappingTable,
	MappingTables,
	OpenHours,
	Printer,
	Printers,
	Relations,
	Reminder,
	Reminders,
	SetMembers,
	Sets,
} from "./types";

/**
 * Resource client for the Alma Configuration API.
 *
 * Exposes sub-resources for all configuration entities:
 * - `organizations` - libraries, circ desks, locations, departments
 * - `configuration` - general config, code tables, mapping tables, letters, open hours, relations
 * - `jobs` - scheduled jobs and job instances
 * - `sets` - sets and set members
 * - `profiles` - import profiles, integration profiles, deposit profiles
 * - `printers` - printers
 * - `reminders` - reminders and license terms
 *
 * All methods can also be accessed directly on this resource object via
 * convenience delegations.
 *
 * @example
 * ```typescript
 * const client = new AlmaClient({ apiKey: 'xxx', region: 'eu' });
 *
 * // via sub-resource
 * await client.conf.organizations.retrieveLibraries();
 * await client.conf.sets.retrieveSets({ limit: 10 });
 *
 * // via direct convenience methods
 * await client.conf.retrieveLibraries();
 * await client.conf.retrieveSets({ limit: 10 });
 * ```
 */
export class ConfResource {
	/** Organizations sub-resource: libraries, circ desks, locations, departments. */
	readonly organizationUnits: OrganizationUnitsResource;
	/** Configuration sub-resource: general config, code tables, mapping tables, letters, open hours, relations. */
	readonly general: GeneralResource;
	/** Jobs sub-resource: scheduled jobs and job instances. */
	readonly jobs: JobsResource;
	/** Sets sub-resource: sets and set members. */
	readonly sets: SetsResource;
	/** Profiles sub-resource: import profiles, integration profiles, deposit profiles. */
	readonly profiles: ProfilesResource;
	/** Printers sub-resource. */
	readonly printers: PrintersResource;
	/** Reminders sub-resource: reminders and license terms. */
	readonly reminders: RemindersResource;

	constructor(client: AlmaHttpClient) {
		this.organizationUnits = new OrganizationUnitsResource(client);
		this.general = new GeneralResource(client);
		this.jobs = new JobsResource(client);
		this.sets = new SetsResource(client);
		this.profiles = new ProfilesResource(client);
		this.printers = new PrintersResource(client);
		this.reminders = new RemindersResource(client);
	}
}
