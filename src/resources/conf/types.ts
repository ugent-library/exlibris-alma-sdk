/**
 * Type aliases for the Alma Configuration API.
 *
 * Response bodies from the Alma API are loosely typed because the external
 * JSON Schema references in the OpenAPI spec are unavailable. The shapes below
 * are best-effort representations based on the Alma API documentation.
 * Refer to https://developers.exlibrisgroup.com/alma/apis/docs/xsd/ for the
 * full XSD definitions.
 */

export type AlmaConfResponse = Record<string, unknown>;

/** A library/organization unit returned by the conf API. */
export type Library = Record<string, unknown>;

/** A list of libraries. */
export type Libraries = Record<string, unknown>;

/** A circulation desk returned by the conf API. */
export type CircDesk = Record<string, unknown>;

/** A list of circulation desks. */
export type CircDesks = Record<string, unknown>;

/** A physical location within a library. */
export type Location = Record<string, unknown>;

/** A list of locations. */
export type Locations = Record<string, unknown>;

/** A list of departments. */
export type Departments = Record<string, unknown>;

/** Institution general configuration. */
export type GeneralConfig = Record<string, unknown>;

/** A code table with its rows. */
export type CodeTable = Record<string, unknown>;

/** A list of code tables. */
export type CodeTables = Record<string, unknown>;

/** A mapping table. */
export type MappingTable = Record<string, unknown>;

/** A list of mapping tables. */
export type MappingTables = Record<string, unknown>;

/** An open hours definition. */
export type OpenHours = Record<string, unknown>;

/** Library open hours. */
export type LibraryOpenHours = Record<string, unknown>;

/** A letter template. */
export type Letter = Record<string, unknown>;

/** A list of letters. */
export type Letters = Record<string, unknown>;

/** Institution/library relations. */
export type Relations = Record<string, unknown>;

/** A scheduled job. */
export type Job = Record<string, unknown>;

/** A list of jobs. */
export type Jobs = Record<string, unknown>;

/** A job instance (run). */
export type JobInstance = Record<string, unknown>;

/** A list of job instances. */
export type JobInstances = Record<string, unknown>;

/** Job instance events. */
export type JobInstanceEvents = Record<string, unknown>;

/** Job instance matches. */
export type JobInstanceMatches = Record<string, unknown>;

/** A set of records. */
export type AlmaSet = Record<string, unknown>;

/** A list of sets. */
export type Sets = Record<string, unknown>;

/** Set members. */
export type SetMembers = Record<string, unknown>;

/** An MD import profile. */
export type ImportProfile = Record<string, unknown>;

/** A list of import profiles. */
export type ImportProfiles = Record<string, unknown>;

/** An integration profile. */
export type IntegrationProfile = Record<string, unknown>;

/** A list of integration profiles. */
export type IntegrationProfiles = Record<string, unknown>;

/** A deposit profile. */
export type DepositProfile = Record<string, unknown>;

/** A list of deposit profiles. */
export type DepositProfiles = Record<string, unknown>;

/** A printer. */
export type Printer = Record<string, unknown>;

/** A list of printers. */
export type Printers = Record<string, unknown>;

/** A reminder. */
export type Reminder = Record<string, unknown>;

/** A list of reminders. */
export type Reminders = Record<string, unknown>;

/** A license term. */
export type LicenseTerm = Record<string, unknown>;

/** A list of license terms. */
export type LicenseTerms = Record<string, unknown>;

/** Fee transactions. */
export type FeeTransactions = Record<string, unknown>;
