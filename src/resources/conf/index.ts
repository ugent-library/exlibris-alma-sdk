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
	readonly organizations: OrganizationUnitsResource;
	/** Configuration sub-resource: general config, code tables, mapping tables, letters, open hours, relations. */
	readonly configuration: GeneralResource;
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
		this.organizations = new OrganizationUnitsResource(client);
		this.configuration = new GeneralResource(client);
		this.jobs = new JobsResource(client);
		this.sets = new SetsResource(client);
		this.profiles = new ProfilesResource(client);
		this.printers = new PrintersResource(client);
		this.reminders = new RemindersResource(client);
	}

	// ── Organizations ────────────────────────────────────────────────────────

	/**
	 * @see {@link OrganizationUnitsResource.retrieveLibraries}
	 */
	retrieveLibraries: OrganizationUnitsResource["retrieveLibraries"] = (
		...args
	) => this.organizations.retrieveLibraries(...args);

	/**
	 * @see {@link OrganizationUnitsResource.retrieveLibrary}
	 */
	retrieveLibrary: OrganizationUnitsResource["retrieveLibrary"] = (...args) =>
		this.organizations.retrieveLibrary(...args);

	/** @see {@link OrganizationUnitsResource.updateLibrary} */
	updateLibrary: OrganizationUnitsResource["updateLibrary"] = (...args) =>
		this.organizations.updateLibrary(...args);

	/**
	 * @see {@link OrganizationUnitsResource.retrieveDepartments}
	 */
	retrieveDepartments: OrganizationUnitsResource["retrieveDepartments"] = (
		...args
	) => this.organizations.retrieveDepartments(...args);

	/**
	 * @see {@link OrganizationUnitsResource.retrieveCircDesks}
	 */
	retrieveCircDesks: OrganizationUnitsResource["retrieveCircDesks"] = (
		...args
	) => this.organizations.retrieveCircDesks(...args);

	/**
	 * @see {@link OrganizationUnitsResource.retrieveCircDesk}
	 */
	retrieveCircDesk: OrganizationUnitsResource["retrieveCircDesk"] = (...args) =>
		this.organizations.retrieveCircDesk(...args);

	/**
	 * @see {@link OrganizationUnitsResource.retrieveLocations}
	 */
	retrieveLocations: OrganizationUnitsResource["retrieveLocations"] = (
		...args
	) => this.organizations.retrieveLocations(...args);

	/**
	 * @see {@link OrganizationUnitsResource.retrieveLocation}
	 */
	retrieveLocation: OrganizationUnitsResource["retrieveLocation"] = (...args) =>
		this.organizations.retrieveLocation(...args);

	/**
	 * @see {@link OrganizationUnitsResource.createLocation}
	 */
	createLocation: OrganizationUnitsResource["createLocation"] = (...args) =>
		this.organizations.createLocation(...args);

	/**
	 * @see {@link OrganizationUnitsResource.updateLocation}
	 */
	updateLocation: OrganizationUnitsResource["updateLocation"] = (...args) =>
		this.organizations.updateLocation(...args);

	/**
	 * @see {@link OrganizationUnitsResource.deleteLocation}
	 */
	deleteLocation: OrganizationUnitsResource["deleteLocation"] = (...args) =>
		this.organizations.deleteLocation(...args);

	/**
	 * @see {@link OrganizationUnitsResource.retrieveLibraryOpenHours}
	 */
	retrieveLibraryOpenHours: OrganizationUnitsResource["retrieveLibraryOpenHours"] =
		(...args) => this.organizations.retrieveLibraryOpenHours(...args);

	// ── Configuration ────────────────────────────────────────────────────────

	/**
	 * @see {@link GeneralResource.retrieveGeneralConfig}
	 */
	retrieveGeneralConfig: GeneralResource["retrieveGeneralConfig"] = (...args) =>
		this.configuration.retrieveGeneralConfig(...args);

	/**
	 * @see {@link GeneralResource.retrieveCodeTables}
	 */
	retrieveCodeTables: GeneralResource["retrieveCodeTables"] = (...args) =>
		this.configuration.retrieveCodeTables(...args);

	/**
	 * @see {@link GeneralResource.retrieveCodeTable}
	 */
	retrieveCodeTable: GeneralResource["retrieveCodeTable"] = (...args) =>
		this.configuration.retrieveCodeTable(...args);

	/**
	 * @see {@link GeneralResource.updateCodeTable}
	 */
	updateCodeTable: GeneralResource["updateCodeTable"] = (...args) =>
		this.configuration.updateCodeTable(...args);

	/**
	 * @see {@link GeneralResource.retrieveMappingTables}
	 */
	retrieveMappingTables: GeneralResource["retrieveMappingTables"] = (...args) =>
		this.configuration.retrieveMappingTables(...args);

	/**
	 * @see {@link GeneralResource.retrieveMappingTable}
	 */
	retrieveMappingTable: GeneralResource["retrieveMappingTable"] = (...args) =>
		this.configuration.retrieveMappingTable(...args);

	/**
	 * @see {@link GeneralResource.updateMappingTable}
	 */
	updateMappingTable: GeneralResource["updateMappingTable"] = (...args) =>
		this.configuration.updateMappingTable(...args);

	/**
	 * @see {@link GeneralResource.retrieveOpenHours}
	 */
	retrieveOpenHours: GeneralResource["retrieveOpenHours"] = (...args) =>
		this.configuration.retrieveOpenHours(...args);

	/**
	 * @see {@link GeneralResource.updateOpenHours}
	 */
	updateOpenHours: GeneralResource["updateOpenHours"] = (...args) =>
		this.configuration.updateOpenHours(...args);

	/**
	 * @see {@link GeneralResource.retrieveLetters}
	 */
	retrieveLetters: GeneralResource["retrieveLetters"] = (...args) =>
		this.configuration.retrieveLetters(...args);

	/**
	 * @see {@link GeneralResource.retrieveLetter}
	 */
	retrieveLetter: GeneralResource["retrieveLetter"] = (...args) =>
		this.configuration.retrieveLetter(...args);

	/**
	 * @see {@link GeneralResource.updateLetter}
	 */
	updateLetter: GeneralResource["updateLetter"] = (...args) =>
		this.configuration.updateLetter(...args);

	/**
	 * @see {@link GeneralResource.retrieveRelations}
	 */
	retrieveRelations: GeneralResource["retrieveRelations"] = (...args) =>
		this.configuration.retrieveRelations(...args);

	/**
	 * @see {@link GeneralResource.retrieveFeeTransactions}
	 */
	retrieveFeeTransactions: GeneralResource["retrieveFeeTransactions"] = (
		...args
	) => this.configuration.retrieveFeeTransactions(...args);

	// ── Jobs ─────────────────────────────────────────────────────────────────

	/**
	 * @see {@link JobsResource.retrieveJobs}
	 */
	retrieveJobs: JobsResource["retrieveJobs"] = (...args) =>
		this.jobs.retrieveJobs(...args);

	/**
	 * @see {@link JobsResource.retrieveJob}
	 */
	retrieveJob: JobsResource["retrieveJob"] = (...args) =>
		this.jobs.retrieveJob(...args);

	/**
	 * @see {@link JobsResource.submitJob}
	 */
	submitJob: JobsResource["submitJob"] = (...args) =>
		this.jobs.submitJob(...args);

	/**
	 * @see {@link JobsResource.retrieveJobInstances}
	 */
	retrieveJobInstances: JobsResource["retrieveJobInstances"] = (...args) =>
		this.jobs.retrieveJobInstances(...args);

	/**
	 * @see {@link JobsResource.retrieveJobInstance}
	 */
	retrieveJobInstance: JobsResource["retrieveJobInstance"] = (...args) =>
		this.jobs.retrieveJobInstance(...args);

	/** @see {@link JobsResource.operateJobInstance} */
	operateJobInstance: JobsResource["operateJobInstance"] = (...args) =>
		this.jobs.operateJobInstance(...args);

	// ── Sets ─────────────────────────────────────────────────────────────────

	/**
	 * @see {@link SetsResource.retrieveSets}
	 */
	retrieveSets: SetsResource["retrieveSets"] = (...args) =>
		this.sets.retrieveSets(...args);

	/**
	 * @see {@link SetsResource.retrieveSet}
	 */
	retrieveSet: SetsResource["retrieveSet"] = (...args) =>
		this.sets.retrieveSet(...args);

	/**
	 * @see {@link SetsResource.createSet}
	 */
	createSet: SetsResource["createSet"] = (...args) =>
		this.sets.createSet(...args);

	/**
	 * @see {@link SetsResource.updateSet}
	 */
	updateSet: SetsResource["updateSet"] = (...args) =>
		this.sets.updateSet(...args);

	/**
	 * @see {@link SetsResource.deleteSet}
	 */
	deleteSet: SetsResource["deleteSet"] = (...args) =>
		this.sets.deleteSet(...args);

	/**
	 * @see {@link SetsResource.retrieveSetMembers}
	 */
	retrieveSetMembers: SetsResource["retrieveSetMembers"] = (...args) =>
		this.sets.retrieveSetMembers(...args);

	// ── Profiles ─────────────────────────────────────────────────────────────

	/**
	 * @see {@link ProfilesResource.retrieveImportProfiles}
	 */
	retrieveImportProfiles: ProfilesResource["retrieveImportProfiles"] = (
		...args
	) => this.profiles.retrieveImportProfiles(...args);

	/**
	 * @see {@link ProfilesResource.retrieveImportProfile}
	 */
	retrieveImportProfile: ProfilesResource["retrieveImportProfile"] = (
		...args
	) => this.profiles.retrieveImportProfile(...args);

	/**
	 * @see {@link ProfilesResource.retrieveIntegrationProfiles}
	 */
	retrieveIntegrationProfiles: ProfilesResource["retrieveIntegrationProfiles"] =
		(...args) => this.profiles.retrieveIntegrationProfiles(...args);

	/**
	 * @see {@link ProfilesResource.retrieveIntegrationProfile}
	 */
	retrieveIntegrationProfile: ProfilesResource["retrieveIntegrationProfile"] = (
		...args
	) => this.profiles.retrieveIntegrationProfile(...args);

	/**
	 * @see {@link ProfilesResource.createIntegrationProfile}
	 */
	createIntegrationProfile: ProfilesResource["createIntegrationProfile"] = (
		...args
	) => this.profiles.createIntegrationProfile(...args);

	/**
	 * @see {@link ProfilesResource.updateIntegrationProfile}
	 */
	updateIntegrationProfile: ProfilesResource["updateIntegrationProfile"] = (
		...args
	) => this.profiles.updateIntegrationProfile(...args);

	/**
	 * @see {@link ProfilesResource.deleteIntegrationProfile}
	 */
	deleteIntegrationProfile: ProfilesResource["deleteIntegrationProfile"] = (
		...args
	) => this.profiles.deleteIntegrationProfile(...args);

	/**
	 * @see {@link ProfilesResource.retrieveDepositProfiles}
	 */
	retrieveDepositProfiles: ProfilesResource["retrieveDepositProfiles"] = (
		...args
	) => this.profiles.retrieveDepositProfiles(...args);

	/**
	 * @see {@link ProfilesResource.retrieveDepositProfile}
	 */
	retrieveDepositProfile: ProfilesResource["retrieveDepositProfile"] = (
		...args
	) => this.profiles.retrieveDepositProfile(...args);

	// ── Printers ─────────────────────────────────────────────────────────────

	/**
	 * @see {@link PrintersResource.retrievePrinters}
	 */
	retrievePrinters: PrintersResource["retrievePrinters"] = (...args) =>
		this.printers.retrievePrinters(...args);

	/**
	 * @see {@link PrintersResource.retrievePrinter}
	 */
	retrievePrinter: PrintersResource["retrievePrinter"] = (...args) =>
		this.printers.retrievePrinter(...args);

	// ── Reminders & License Terms ─────────────────────────────────────────────

	/**
	 * @see {@link RemindersResource.retrieveReminders}
	 */
	retrieveReminders: RemindersResource["retrieveReminders"] = (...args) =>
		this.reminders.retrieveReminders(...args);

	/**
	 * @see {@link RemindersResource.retrieveReminder}
	 */
	retrieveReminder: RemindersResource["retrieveReminder"] = (...args) =>
		this.reminders.retrieveReminder(...args);

	/**
	 * @see {@link RemindersResource.createReminder}
	 */
	createReminder: RemindersResource["createReminder"] = (...args) =>
		this.reminders.createReminder(...args);

	/**
	 * @see {@link RemindersResource.updateReminder}
	 */
	updateReminder: RemindersResource["updateReminder"] = (...args) =>
		this.reminders.updateReminder(...args);

	/**
	 * @see {@link RemindersResource.deleteReminder}
	 */
	deleteReminder: RemindersResource["deleteReminder"] = (...args) =>
		this.reminders.deleteReminder(...args);

	/**
	 * @see {@link RemindersResource.retrieveLicenseTerms}
	 */
	retrieveLicenseTerms: RemindersResource["retrieveLicenseTerms"] = (...args) =>
		this.reminders.retrieveLicenseTerms(...args);

	/**
	 * @see {@link RemindersResource.retrieveLicenseTerm}
	 */
	retrieveLicenseTerm: RemindersResource["retrieveLicenseTerm"] = (...args) =>
		this.reminders.retrieveLicenseTerm(...args);

	/**
	 * @see {@link RemindersResource.createLicenseTerm}
	 */
	createLicenseTerm: RemindersResource["createLicenseTerm"] = (...args) =>
		this.reminders.createLicenseTerm(...args);

	/**
	 * @see {@link RemindersResource.updateLicenseTerm}
	 */
	updateLicenseTerm: RemindersResource["updateLicenseTerm"] = (...args) =>
		this.reminders.updateLicenseTerm(...args);

	/**
	 * @see {@link RemindersResource.deleteLicenseTerm}
	 */
	deleteLicenseTerm: RemindersResource["deleteLicenseTerm"] = (...args) =>
		this.reminders.deleteLicenseTerm(...args);
}
