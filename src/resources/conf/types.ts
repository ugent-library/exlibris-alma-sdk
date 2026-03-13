/**
 * Type definitions for the Alma Configuration API.
 *
 * Shapes are based on the XSD definitions published at
 * https://developers.exlibrisgroup.com/alma/apis/docs/xsd/ and the JSON
 * serialisation returned by the Alma REST API. All fields are optional unless
 * the API always returns them, because Alma omits absent fields from JSON
 * responses.
 */

import type { AlmaCodeValue } from "@/types/common";

// ---------------------------------------------------------------------------
// Libraries & organisational units
// ---------------------------------------------------------------------------

/** A library (organisational unit) in the institution (rest_library.xsd). */
export interface Library {
	/** Library code (e.g. `"MAIN"`). */
	code?: string;
	/** Display name. */
	name?: string;
	/** Description. */
	description?: string;
	/** Campus the library belongs to. */
	campus_name?: AlmaCodeValue;
	/** Library type. */
	library_type?: AlmaCodeValue;
	/** Street address. */
	location?: string;
	/** City. */
	city?: string;
	/** State or province. */
	state_province?: string;
	/** Country. */
	country?: AlmaCodeValue;
	/** Postal code. */
	zip?: string;
	/** Phone number. */
	phone?: string;
	/** Fax number. */
	fax?: string;
	/** E-mail address. */
	email?: string;
	/** Website URL. */
	web_site?: string;
	/** Whether the library acts as a resource-sharing partner. */
	resource_sharing?: AlmaCodeValue;
	/** Whether proxy is enabled. */
	proxy_enabled?: boolean;
	/** Default shelving location. */
	default_location?: AlmaCodeValue;
	/** ISO 8601 creation date. */
	created_date?: string;
	/** ISO 8601 date of last modification. */
	last_modified_date?: string;
}

/** A list of libraries. */
export interface Libraries {
	/** The libraries. */
	library: Library[];
	/** Total number of libraries. */
	total_record_count: number;
}

/** A circulation desk within a library. */
export interface CircDesk {
	/** Circulation desk code. */
	code?: string;
	/** Display name. */
	name?: string;
	/** Description. */
	description?: string;
	/** Owning library. */
	library?: AlmaCodeValue;
	/** Whether this is the library's default desk. */
	default_circ_desk?: boolean;
	/** Whether loan notification printing is suppressed. */
	suppress_printing_of_slips?: boolean;
}

/** A list of circulation desks. */
export interface CircDesks {
	/** The circulation desks. */
	circ_desk: CircDesk[];
	/** Total number of circulation desks. */
	total_record_count: number;
}

/** A shelving location within a library. */
export interface Location {
	/** Location code. */
	code?: string;
	/** Display name. */
	name?: string;
	/** Location type (e.g. `"PHYSICAL"`, `"REMOTE_STORAGE"`). */
	type?: AlmaCodeValue;
	/** Whether the location is suppressed from publishing. */
	suppress_from_publishing?: string;
	/** Fulfillment unit this location is associated with. */
	fulfillment_unit?: AlmaCodeValue;
	/** Remote storage code. */
	remote_storage?: AlmaCodeValue;
	/** Default call number type for the location. */
	call_number_type?: AlmaCodeValue;
	/** Whether the location is external. */
	external?: boolean;
	/** Whether temporary items are supported. */
	in_temp_items_supported?: boolean;
	/** Owning library. */
	library?: AlmaCodeValue;
	/** Physical material type override. */
	physical_type?: AlmaCodeValue;
}

/** A list of locations. */
export interface Locations {
	/** The locations. */
	location: Location[];
	/** Total number of locations. */
	total_record_count: number;
}

/** A department (e.g. acquisitions, digitisation, preservation). */
export interface Department {
	/** Department code. */
	code?: string;
	/** Display name. */
	name?: string;
	/** Department type. */
	type?: AlmaCodeValue;
	/** Owning library. */
	library?: AlmaCodeValue;
}

/** A list of departments. */
export interface Departments {
	/** The departments. */
	department: Department[];
	/** Total number of departments. */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// General configuration
// ---------------------------------------------------------------------------

/** General institution-level configuration (rest_general.xsd). */
export interface GeneralConfig {
	/** Institution code. */
	code?: string;
	/** Institution name. */
	name?: string;
	/** Default timezone. */
	timezone?: AlmaCodeValue;
	/** Default locale / language. */
	default_language?: AlmaCodeValue;
	/** Default currency. */
	currency?: AlmaCodeValue;
	/** Primary user identifier type. */
	primary_id_type?: AlmaCodeValue;
	/** Whether to suppress from publishing by default. */
	suppress_from_publishing?: string;
	/** Support e-mail address. */
	support_email?: string;
	/** Institution logo URL. */
	logo_url?: string;
}

// ---------------------------------------------------------------------------
// Code tables
// ---------------------------------------------------------------------------

/** A single row in a code table. */
export interface CodeTableRow {
	/** Row code. */
	code?: string;
	/** Display description. */
	description?: string;
	/** Whether the row is enabled. */
	enabled?: boolean;
	/** Whether this row is the default. */
	default?: boolean;
	/** Row order/position. */
	order?: number;
}

/** A code table with its rows (rest_code_table.xsd). */
export interface CodeTable {
	/** Table name (e.g. `"UserGroups"`). */
	name?: string;
	/** Display description. */
	description?: string;
	/** Sub-system this table belongs to. */
	sub_system?: AlmaCodeValue;
	/** Scope (institution or library). */
	scope?: AlmaCodeValue;
	/** The rows of the code table. */
	row?: CodeTableRow[];
}

/** A list of code tables. */
export interface CodeTables {
	/** The code tables. */
	code_table: CodeTable[];
	/** Total number of code tables. */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Mapping tables
// ---------------------------------------------------------------------------

/** A single row in a mapping table. */
export interface MappingTableRow {
	/** Source value. */
	in_column1?: string;
	/** Optional second source column. */
	in_column2?: string;
	/** Mapped output value. */
	out_column1?: string;
	/** Optional second output column. */
	out_column2?: string;
	/** Whether this row is enabled. */
	enabled?: boolean;
}

/** A mapping table (rest_mapping_table.xsd). */
export interface MappingTable {
	/** Table name. */
	name?: string;
	/** Display description. */
	description?: string;
	/** Scope (institution or library). */
	scope?: AlmaCodeValue;
	/** The rows of the mapping table. */
	row?: MappingTableRow[];
}

/** A list of mapping tables. */
export interface MappingTables {
	/** The mapping tables. */
	mapping_table: MappingTable[];
	/** Total number of mapping tables. */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Open hours
// ---------------------------------------------------------------------------

/** A time range within a day. */
export interface HoursRange {
	/** Opening time (HH:mm). */
	from?: string;
	/** Closing time (HH:mm). */
	to?: string;
}

/** Open hours for a single day. */
export interface DayHours {
	/** Day of the week or specific date. */
	day?: AlmaCodeValue;
	/** The open time ranges for this day. */
	hours?: HoursRange[];
}

/** Open hours definition for an institution or library. */
export interface OpenHours {
	/** Open hours per day. */
	day?: DayHours[];
}

// ---------------------------------------------------------------------------
// Letters
// ---------------------------------------------------------------------------

/** A notification letter template (rest_letter.xsd). */
export interface Letter {
	/** Letter code (e.g. `"FulDigitizationLetterLetter"`). */
	code?: string;
	/** Display name. */
	name?: string;
	/** Whether the letter is active. */
	active?: boolean;
	/** Whether this is the default letter for its category. */
	default?: boolean;
	/** Whether fax output is enabled. */
	fax_output?: boolean;
	/** Whether e-mail output is enabled. */
	email_output?: boolean;
	/** Whether print output is enabled. */
	print_output?: boolean;
	/** Letter type. */
	type?: AlmaCodeValue;
	/** Letter language. */
	language?: AlmaCodeValue;
}

/** A list of letters. */
export interface Letters {
	/** The letters. */
	letter: Letter[];
	/** Total number of letters. */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Relations
// ---------------------------------------------------------------------------

/** A network or campus relation between institution/library units. */
export interface Relation {
	/** Relation type. */
	type?: AlmaCodeValue;
	/** Related entity code. */
	code?: string;
	/** Related entity name. */
	name?: string;
}

/** Institution/library relations. */
export interface Relations {
	/** The relation entries. */
	relation: Relation[];
}

// ---------------------------------------------------------------------------
// Fee transactions
// ---------------------------------------------------------------------------

/** A single fee transaction entry (utility endpoint). */
export interface FeeTransaction {
	/** Transaction ID. */
	id?: string;
	/** Fee type. */
	type?: AlmaCodeValue;
	/** Transaction amount. */
	amount?: number;
	/** Currency of the amount. */
	currency?: AlmaCodeValue;
	/** ISO 8601 transaction date/time. */
	transaction_time?: string;
	/** User ID of the patron. */
	user_id?: string;
	/** Payment method. */
	payment_method?: AlmaCodeValue;
	/** External transaction reference. */
	external_transaction_id?: string;
	/** Comment. */
	comment?: string;
}

/** A paginated list of fee transactions. */
export interface FeeTransactions {
	/** The transactions. */
	fee_transaction: FeeTransaction[];
	/** Total number of transactions. */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Jobs
// ---------------------------------------------------------------------------

/** A scheduled job parameter. */
export interface JobParameter {
	/** Parameter name. */
	name?: string;
	/** Parameter value. */
	value?: string;
}

/** A scheduled job definition (rest_job.xsd). */
export interface Job {
	/** Job ID. */
	id?: string;
	/** Display name. */
	name?: string;
	/** Description. */
	description?: string;
	/** Job category. */
	category?: AlmaCodeValue;
	/** Job type. */
	type?: AlmaCodeValue;
	/** Cron-style schedule expression. */
	schedule?: string;
	/** ISO 8601 date/time of the next scheduled run. */
	next_run?: string;
}

/** A list of jobs. */
export interface Jobs {
	/** The jobs. */
	job: Job[];
	/** Total number of jobs. */
	total_record_count: number;
}

/** A counter reported by a job instance. */
export interface JobCounter {
	/** Counter type (e.g. `"label.PROCESSED_RECORDS"`). */
	type?: AlmaCodeValue;
	/** Counter value. */
	count?: number;
}

/** A single run of a job (rest_job_instance.xsd). */
export interface JobInstance {
	/** Instance ID. */
	id?: string;
	/** Job name. */
	name?: string;
	/** Instance status (e.g. `"COMPLETED_SUCCESS"`, `"RUNNING"`, `"FAILED"`). */
	status?: AlmaCodeValue;
	/** Progress percentage (0–100). */
	progress?: number;
	/** ISO 8601 date/time the job was submitted. */
	submit_time?: string;
	/** ISO 8601 date/time the job started running. */
	start_time?: string;
	/** ISO 8601 date/time the job finished. */
	end_time?: string;
	/** User who submitted the job. */
	submitted_by?: AlmaCodeValue;
	/** Processing counters. */
	counter?: JobCounter[];
}

/** A list of job instances. */
export interface JobInstances {
	/** The job instances. */
	job_instance: JobInstance[];
	/** Total number of job instances. */
	total_record_count: number;
}

/** A single event emitted by a job instance. */
export interface JobEvent {
	/** Event type. */
	type?: AlmaCodeValue;
	/** Human-readable event message. */
	message?: string;
	/** ISO 8601 date/time of the event. */
	date?: string;
}

/** Events produced by a job instance. */
export interface JobInstanceEvents {
	/** The events. */
	event: JobEvent[];
	/** Total number of events. */
	total_record_count: number;
}

/** A record matched or processed by a job instance. */
export interface JobMatch {
	/** Record identifier. */
	id?: string;
	/** Record description / title. */
	description?: string;
	/** Additional link to the record. */
	link?: string;
}

/** Matched records processed by a job instance. */
export interface JobInstanceMatches {
	/** The matched records. */
	job_match: JobMatch[];
	/** Total number of matches. */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Sets
// ---------------------------------------------------------------------------

/** A member entry inside a set. */
export interface SetMember {
	/** Record ID of the member. */
	id?: string;
	/** Description / title of the member. */
	description?: string;
	/** API link to the member record. */
	link?: string;
}

/** A set of records used for bulk operations (rest_set.xsd). */
export interface AlmaSet {
	/** Set ID. */
	id?: string;
	/** Display name. */
	name?: string;
	/** Description. */
	description?: string;
	/** Set type (`"ITEMIZED"` or `"LOGICAL"`). */
	type?: AlmaCodeValue;
	/** Content type (from SetContentType code table). */
	content?: AlmaCodeValue;
	/** Set status. */
	status?: AlmaCodeValue;
	/** User who created the set. */
	created_by?: string;
	/** ISO 8601 date the set was created. */
	created_date?: string;
	/** Note. */
	note?: string;
	/** Query that defines a logical set. */
	query?: string;
	/** Number of members in the set. */
	number_of_members?: { value?: number };
	/** Origin of the set (`"UI"`, `"API"`, etc.). */
	origin?: string;
	/** Whether the set is private. */
	private?: boolean;
}

/** A list of sets. */
export interface Sets {
	/** The sets. */
	set: AlmaSet[];
	/** Total number of sets. */
	total_record_count: number;
}

/** Members of a set. */
export interface SetMembers {
	/** The member entries. */
	member: SetMember[];
	/** Total number of members. */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Import / Integration / Deposit profiles
// ---------------------------------------------------------------------------

/** An MD import profile. */
export interface ImportProfile {
	/** Profile ID. */
	id?: string;
	/** Profile name. */
	name?: string;
	/** Description. */
	description?: string;
	/** Profile type (e.g. `"MARC21_BIBLIOGRAPHIC"`, `"HOLDINGS"`). */
	type?: AlmaCodeValue;
	/** Status (`"ACTIVE"` or `"INACTIVE"`). */
	status?: AlmaCodeValue;
}

/** A list of MD import profiles. */
export interface ImportProfiles {
	/** The profiles. */
	import_profile: ImportProfile[];
	/** Total number of profiles. */
	total_record_count: number;
}

/** A single customer parameter within an integration profile. */
export interface IntegrationProfileParameter {
	/** Parameter name. */
	name?: string;
	/** Parameter value. */
	value?: string;
}

/** An integration profile (e.g. SAML, SIP, NCIP). */
export interface IntegrationProfile {
	/** Profile ID. */
	id?: string;
	/** Profile type. */
	type?: AlmaCodeValue;
	/** Display name. */
	name?: string;
	/** Description. */
	description?: string;
	/** Whether the profile is active. */
	active?: boolean;
	/** Customer parameters. */
	customer_parameters?: { customer_parameter?: IntegrationProfileParameter[] };
}

/** A list of integration profiles. */
export interface IntegrationProfiles {
	/** The profiles. */
	integration_profile: IntegrationProfile[];
	/** Total number of profiles. */
	total_record_count: number;
}

/** A deposit profile for digital deposits. */
export interface DepositProfile {
	/** Profile ID. */
	id?: string;
	/** Display name. */
	name?: string;
	/** Description. */
	description?: string;
	/** Whether it is a staff-facing profile. */
	staff?: boolean;
	/** Whether it is publicly accessible. */
	public?: boolean;
}

/** A list of deposit profiles. */
export interface DepositProfiles {
	/** The profiles. */
	deposit_profile: DepositProfile[];
	/** Total number of profiles. */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Printers
// ---------------------------------------------------------------------------

/** A printer configured in Alma. */
export interface Printer {
	/** Printer ID. */
	id?: string;
	/** Printer code. */
	code?: string;
	/** Display name. */
	name?: string;
	/** Whether this is the default printer. */
	default?: boolean;
	/** Library the printer belongs to. */
	library?: AlmaCodeValue;
	/** Print output destination type. */
	output?: AlmaCodeValue;
	/** Printout queue name (for network printing). */
	printout_queue?: string;
}

/** A list of printers. */
export interface Printers {
	/** The printers. */
	printer: Printer[];
	/** Total number of printers. */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Reminders
// ---------------------------------------------------------------------------

/** A reminder attached to a record in Alma (rest_reminder.xsd). */
export interface Reminder {
	/** Reminder ID. */
	id?: string;
	/** Reminder type. */
	type?: AlmaCodeValue;
	/** Reminder status. */
	status?: AlmaCodeValue;
	/** Free-text note. */
	note?: string;
	/** ISO 8601 reminder date. */
	date?: string;
	/** ID of the entity the reminder is attached to. */
	record_id?: string;
	/** Entity type (e.g. `"BIB_MMS"`, `"ITEM"`). */
	record_type?: AlmaCodeValue;
	/** User who created the reminder. */
	created_by?: string;
	/** ISO 8601 creation date. */
	created_date?: string;
}

/** A list of reminders. */
export interface Reminders {
	/** The reminders. */
	reminder: Reminder[];
	/** Total number of reminders. */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// License terms
// ---------------------------------------------------------------------------

/** A license term definition in the conf API. */
export interface LicenseTerm {
	/** Term code. */
	code?: string;
	/** Display name. */
	name?: string;
	/** Description. */
	description?: string;
	/** Whether the term is enabled. */
	enabled?: boolean;
	/** Value data type (e.g. `"TEXT"`, `"BOOLEAN"`, `"DATE"`). */
	data_type?: AlmaCodeValue;
	/** Default value for the term. */
	default_value?: string;
	/** Whether the term is mandatory on a license. */
	mandatory?: boolean;
}

/** A list of license terms. */
export interface LicenseTerms {
	/** The terms. */
	license_term: LicenseTerm[];
	/** Total number of terms. */
	total_record_count: number;
}
