import type { AlmaHttpClient } from "@/client";

import { ConfConfigurationResource } from "./configuration";
import { ConfJobsResource } from "./jobs";
import { ConfOrganizationsResource } from "./organizations";
import { ConfPrintersResource } from "./printers";
import { ConfProfilesResource } from "./profiles";
import { ConfRemindersResource } from "./reminders";
import { ConfSetsResource } from "./sets";

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
	readonly organizations: ConfOrganizationsResource;
	/** Configuration sub-resource: general config, code tables, mapping tables, letters, open hours, relations. */
	readonly configuration: ConfConfigurationResource;
	/** Jobs sub-resource: scheduled jobs and job instances. */
	readonly jobs: ConfJobsResource;
	/** Sets sub-resource: sets and set members. */
	readonly sets: ConfSetsResource;
	/** Profiles sub-resource: import profiles, integration profiles, deposit profiles. */
	readonly profiles: ConfProfilesResource;
	/** Printers sub-resource. */
	readonly printers: ConfPrintersResource;
	/** Reminders sub-resource: reminders and license terms. */
	readonly reminders: ConfRemindersResource;

	constructor(client: AlmaHttpClient) {
		this.organizations = new ConfOrganizationsResource(client);
		this.configuration = new ConfConfigurationResource(client);
		this.jobs = new ConfJobsResource(client);
		this.sets = new ConfSetsResource(client);
		this.profiles = new ConfProfilesResource(client);
		this.printers = new ConfPrintersResource(client);
		this.reminders = new ConfRemindersResource(client);
	}

	// ── Organizations ────────────────────────────────────────────────────────

	/**
	 * @see {@link ConfOrganizationsResource.retrieveLibraries}
	 */
	retrieveLibraries: ConfOrganizationsResource["retrieveLibraries"] = (
		...args
	) => this.organizations.retrieveLibraries(...args);

	/**
	 * @see {@link ConfOrganizationsResource.retrieveLibrary}
	 */
	retrieveLibrary: ConfOrganizationsResource["retrieveLibrary"] = (...args) =>
		this.organizations.retrieveLibrary(...args);

	/** @see {@link ConfOrganizationsResource.updateLibrary} */
	updateLibrary: ConfOrganizationsResource["updateLibrary"] = (...args) =>
		this.organizations.updateLibrary(...args);

	/**
	 * @see {@link ConfOrganizationsResource.retrieveDepartments}
	 */
	retrieveDepartments: ConfOrganizationsResource["retrieveDepartments"] = (
		...args
	) => this.organizations.retrieveDepartments(...args);

	/**
	 * @see {@link ConfOrganizationsResource.retrieveCircDesks}
	 */
	retrieveCircDesks: ConfOrganizationsResource["retrieveCircDesks"] = (
		...args
	) => this.organizations.retrieveCircDesks(...args);

	/**
	 * @see {@link ConfOrganizationsResource.retrieveCircDesk}
	 */
	retrieveCircDesk: ConfOrganizationsResource["retrieveCircDesk"] = (...args) =>
		this.organizations.retrieveCircDesk(...args);

	/**
	 * @see {@link ConfOrganizationsResource.retrieveLocations}
	 */
	retrieveLocations: ConfOrganizationsResource["retrieveLocations"] = (
		...args
	) => this.organizations.retrieveLocations(...args);

	/**
	 * @see {@link ConfOrganizationsResource.retrieveLocation}
	 */
	retrieveLocation: ConfOrganizationsResource["retrieveLocation"] = (...args) =>
		this.organizations.retrieveLocation(...args);

	/**
	 * @see {@link ConfOrganizationsResource.createLocation}
	 */
	createLocation: ConfOrganizationsResource["createLocation"] = (...args) =>
		this.organizations.createLocation(...args);

	/**
	 * @see {@link ConfOrganizationsResource.updateLocation}
	 */
	updateLocation: ConfOrganizationsResource["updateLocation"] = (...args) =>
		this.organizations.updateLocation(...args);

	/**
	 * @see {@link ConfOrganizationsResource.deleteLocation}
	 */
	deleteLocation: ConfOrganizationsResource["deleteLocation"] = (...args) =>
		this.organizations.deleteLocation(...args);

	/**
	 * @see {@link ConfOrganizationsResource.retrieveLibraryOpenHours}
	 */
	retrieveLibraryOpenHours: ConfOrganizationsResource["retrieveLibraryOpenHours"] =
		(...args) => this.organizations.retrieveLibraryOpenHours(...args);

	// ── Configuration ────────────────────────────────────────────────────────

	/**
	 * @see {@link ConfConfigurationResource.retrieveGeneralConfig}
	 */
	retrieveGeneralConfig: ConfConfigurationResource["retrieveGeneralConfig"] = (
		...args
	) => this.configuration.retrieveGeneralConfig(...args);

	/**
	 * @see {@link ConfConfigurationResource.retrieveCodeTables}
	 */
	retrieveCodeTables: ConfConfigurationResource["retrieveCodeTables"] = (
		...args
	) => this.configuration.retrieveCodeTables(...args);

	/**
	 * @see {@link ConfConfigurationResource.retrieveCodeTable}
	 */
	retrieveCodeTable: ConfConfigurationResource["retrieveCodeTable"] = (
		...args
	) => this.configuration.retrieveCodeTable(...args);

	/**
	 * @see {@link ConfConfigurationResource.updateCodeTable}
	 */
	updateCodeTable: ConfConfigurationResource["updateCodeTable"] = (...args) =>
		this.configuration.updateCodeTable(...args);

	/**
	 * @see {@link ConfConfigurationResource.retrieveMappingTables}
	 */
	retrieveMappingTables: ConfConfigurationResource["retrieveMappingTables"] = (
		...args
	) => this.configuration.retrieveMappingTables(...args);

	/**
	 * @see {@link ConfConfigurationResource.retrieveMappingTable}
	 */
	retrieveMappingTable: ConfConfigurationResource["retrieveMappingTable"] = (
		...args
	) => this.configuration.retrieveMappingTable(...args);

	/**
	 * @see {@link ConfConfigurationResource.updateMappingTable}
	 */
	updateMappingTable: ConfConfigurationResource["updateMappingTable"] = (
		...args
	) => this.configuration.updateMappingTable(...args);

	/**
	 * @see {@link ConfConfigurationResource.retrieveOpenHours}
	 */
	retrieveOpenHours: ConfConfigurationResource["retrieveOpenHours"] = (
		...args
	) => this.configuration.retrieveOpenHours(...args);

	/**
	 * @see {@link ConfConfigurationResource.updateOpenHours}
	 */
	updateOpenHours: ConfConfigurationResource["updateOpenHours"] = (...args) =>
		this.configuration.updateOpenHours(...args);

	/**
	 * @see {@link ConfConfigurationResource.retrieveLetters}
	 */
	retrieveLetters: ConfConfigurationResource["retrieveLetters"] = (...args) =>
		this.configuration.retrieveLetters(...args);

	/**
	 * @see {@link ConfConfigurationResource.retrieveLetter}
	 */
	retrieveLetter: ConfConfigurationResource["retrieveLetter"] = (...args) =>
		this.configuration.retrieveLetter(...args);

	/**
	 * @see {@link ConfConfigurationResource.updateLetter}
	 */
	updateLetter: ConfConfigurationResource["updateLetter"] = (...args) =>
		this.configuration.updateLetter(...args);

	/**
	 * @see {@link ConfConfigurationResource.retrieveRelations}
	 */
	retrieveRelations: ConfConfigurationResource["retrieveRelations"] = (
		...args
	) => this.configuration.retrieveRelations(...args);

	/**
	 * @see {@link ConfConfigurationResource.retrieveFeeTransactions}
	 */
	retrieveFeeTransactions: ConfConfigurationResource["retrieveFeeTransactions"] =
		(...args) => this.configuration.retrieveFeeTransactions(...args);

	/** @see {@link ConfConfigurationResource.test} */
	test: ConfConfigurationResource["test"] = (...args) =>
		this.configuration.test(...args);

	// ── Jobs ─────────────────────────────────────────────────────────────────

	/**
	 * @see {@link ConfJobsResource.retrieveJobs}
	 */
	retrieveJobs: ConfJobsResource["retrieveJobs"] = (...args) =>
		this.jobs.retrieveJobs(...args);

	/**
	 * @see {@link ConfJobsResource.retrieveJob}
	 */
	retrieveJob: ConfJobsResource["retrieveJob"] = (...args) =>
		this.jobs.retrieveJob(...args);

	/**
	 * @see {@link ConfJobsResource.submitJob}
	 */
	submitJob: ConfJobsResource["submitJob"] = (...args) =>
		this.jobs.submitJob(...args);

	/**
	 * @see {@link ConfJobsResource.retrieveJobInstances}
	 */
	retrieveJobInstances: ConfJobsResource["retrieveJobInstances"] = (...args) =>
		this.jobs.retrieveJobInstances(...args);

	/**
	 * @see {@link ConfJobsResource.retrieveJobInstance}
	 */
	retrieveJobInstance: ConfJobsResource["retrieveJobInstance"] = (...args) =>
		this.jobs.retrieveJobInstance(...args);

	/** @see {@link ConfJobsResource.operateJobInstance} */
	operateJobInstance: ConfJobsResource["operateJobInstance"] = (...args) =>
		this.jobs.operateJobInstance(...args);

	// ── Sets ─────────────────────────────────────────────────────────────────

	/**
	 * @see {@link ConfSetsResource.retrieveSets}
	 */
	retrieveSets: ConfSetsResource["retrieveSets"] = (...args) =>
		this.sets.retrieveSets(...args);

	/**
	 * @see {@link ConfSetsResource.retrieveSet}
	 */
	retrieveSet: ConfSetsResource["retrieveSet"] = (...args) =>
		this.sets.retrieveSet(...args);

	/**
	 * @see {@link ConfSetsResource.createSet}
	 */
	createSet: ConfSetsResource["createSet"] = (...args) =>
		this.sets.createSet(...args);

	/**
	 * @see {@link ConfSetsResource.updateSet}
	 */
	updateSet: ConfSetsResource["updateSet"] = (...args) =>
		this.sets.updateSet(...args);

	/**
	 * @see {@link ConfSetsResource.deleteSet}
	 */
	deleteSet: ConfSetsResource["deleteSet"] = (...args) =>
		this.sets.deleteSet(...args);

	/**
	 * @see {@link ConfSetsResource.retrieveSetMembers}
	 */
	retrieveSetMembers: ConfSetsResource["retrieveSetMembers"] = (...args) =>
		this.sets.retrieveSetMembers(...args);

	// ── Profiles ─────────────────────────────────────────────────────────────

	/**
	 * @see {@link ConfProfilesResource.retrieveImportProfiles}
	 */
	retrieveImportProfiles: ConfProfilesResource["retrieveImportProfiles"] = (
		...args
	) => this.profiles.retrieveImportProfiles(...args);

	/**
	 * @see {@link ConfProfilesResource.retrieveImportProfile}
	 */
	retrieveImportProfile: ConfProfilesResource["retrieveImportProfile"] = (
		...args
	) => this.profiles.retrieveImportProfile(...args);

	/**
	 * @see {@link ConfProfilesResource.retrieveIntegrationProfiles}
	 */
	retrieveIntegrationProfiles: ConfProfilesResource["retrieveIntegrationProfiles"] =
		(...args) => this.profiles.retrieveIntegrationProfiles(...args);

	/**
	 * @see {@link ConfProfilesResource.retrieveIntegrationProfile}
	 */
	retrieveIntegrationProfile: ConfProfilesResource["retrieveIntegrationProfile"] =
		(...args) => this.profiles.retrieveIntegrationProfile(...args);

	/**
	 * @see {@link ConfProfilesResource.createIntegrationProfile}
	 */
	createIntegrationProfile: ConfProfilesResource["createIntegrationProfile"] = (
		...args
	) => this.profiles.createIntegrationProfile(...args);

	/**
	 * @see {@link ConfProfilesResource.updateIntegrationProfile}
	 */
	updateIntegrationProfile: ConfProfilesResource["updateIntegrationProfile"] = (
		...args
	) => this.profiles.updateIntegrationProfile(...args);

	/**
	 * @see {@link ConfProfilesResource.deleteIntegrationProfile}
	 */
	deleteIntegrationProfile: ConfProfilesResource["deleteIntegrationProfile"] = (
		...args
	) => this.profiles.deleteIntegrationProfile(...args);

	/**
	 * @see {@link ConfProfilesResource.retrieveDepositProfiles}
	 */
	retrieveDepositProfiles: ConfProfilesResource["retrieveDepositProfiles"] = (
		...args
	) => this.profiles.retrieveDepositProfiles(...args);

	/**
	 * @see {@link ConfProfilesResource.retrieveDepositProfile}
	 */
	retrieveDepositProfile: ConfProfilesResource["retrieveDepositProfile"] = (
		...args
	) => this.profiles.retrieveDepositProfile(...args);

	// ── Printers ─────────────────────────────────────────────────────────────

	/**
	 * @see {@link ConfPrintersResource.retrievePrinters}
	 */
	retrievePrinters: ConfPrintersResource["retrievePrinters"] = (...args) =>
		this.printers.retrievePrinters(...args);

	/**
	 * @see {@link ConfPrintersResource.retrievePrinter}
	 */
	retrievePrinter: ConfPrintersResource["retrievePrinter"] = (...args) =>
		this.printers.retrievePrinter(...args);

	// ── Reminders & License Terms ─────────────────────────────────────────────

	/**
	 * @see {@link ConfRemindersResource.retrieveReminders}
	 */
	retrieveReminders: ConfRemindersResource["retrieveReminders"] = (...args) =>
		this.reminders.retrieveReminders(...args);

	/**
	 * @see {@link ConfRemindersResource.retrieveReminder}
	 */
	retrieveReminder: ConfRemindersResource["retrieveReminder"] = (...args) =>
		this.reminders.retrieveReminder(...args);

	/**
	 * @see {@link ConfRemindersResource.createReminder}
	 */
	createReminder: ConfRemindersResource["createReminder"] = (...args) =>
		this.reminders.createReminder(...args);

	/**
	 * @see {@link ConfRemindersResource.updateReminder}
	 */
	updateReminder: ConfRemindersResource["updateReminder"] = (...args) =>
		this.reminders.updateReminder(...args);

	/**
	 * @see {@link ConfRemindersResource.deleteReminder}
	 */
	deleteReminder: ConfRemindersResource["deleteReminder"] = (...args) =>
		this.reminders.deleteReminder(...args);

	/**
	 * @see {@link ConfRemindersResource.retrieveLicenseTerms}
	 */
	retrieveLicenseTerms: ConfRemindersResource["retrieveLicenseTerms"] = (
		...args
	) => this.reminders.retrieveLicenseTerms(...args);

	/**
	 * @see {@link ConfRemindersResource.retrieveLicenseTerm}
	 */
	retrieveLicenseTerm: ConfRemindersResource["retrieveLicenseTerm"] = (
		...args
	) => this.reminders.retrieveLicenseTerm(...args);

	/**
	 * @see {@link ConfRemindersResource.createLicenseTerm}
	 */
	createLicenseTerm: ConfRemindersResource["createLicenseTerm"] = (...args) =>
		this.reminders.createLicenseTerm(...args);

	/**
	 * @see {@link ConfRemindersResource.updateLicenseTerm}
	 */
	updateLicenseTerm: ConfRemindersResource["updateLicenseTerm"] = (...args) =>
		this.reminders.updateLicenseTerm(...args);

	/**
	 * @see {@link ConfRemindersResource.deleteLicenseTerm}
	 */
	deleteLicenseTerm: ConfRemindersResource["deleteLicenseTerm"] = (...args) =>
		this.reminders.deleteLicenseTerm(...args);
}
