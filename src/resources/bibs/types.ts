/**
 * Type definitions for the Alma Bibliographic API.
 *
 * Shapes are based on the XSD definitions published at
 * https://developers.exlibrisgroup.com/alma/apis/docs/xsd/ and the JSON
 * serialisation returned by the Alma REST API. All fields are optional unless
 * the API always returns them, because Alma omits absent fields from JSON
 * responses.
 */

import type { AlmaCodeValue } from "@/types/common";

// ---------------------------------------------------------------------------
// MARC record building-blocks
// ---------------------------------------------------------------------------

/** A MARC fixed-length control field (tags 001–009). */
export interface MarcControlField {
	/** MARC tag (e.g. `"001"`, `"008"`). */
	tag?: string;
	/** Raw field value. */
	"#text"?: string;
}

/** A single MARC subfield. */
export interface MarcSubfield {
	/** Single-character subfield code. */
	code?: string;
	/** Subfield value. */
	"#text"?: string;
}

/** A MARC variable data field (tags 010–999). */
export interface MarcDataField {
	/** MARC tag (e.g. `"245"`, `"100"`). */
	tag?: string;
	/** First indicator. */
	ind1?: string;
	/** Second indicator. */
	ind2?: string;
	/** Subfields. */
	subfield?: MarcSubfield[];
}

/** A MARC 21 / UNIMARC bibliographic or holdings record. */
export interface MarcRecord {
	/** Record leader (24 characters). */
	leader?: string;
	/** Fixed-length control fields. */
	controlfield?: MarcControlField[];
	/** Variable data fields. */
	datafield?: MarcDataField[];
}

// ---------------------------------------------------------------------------
// Bibliographic records
// ---------------------------------------------------------------------------

/** A bibliographic record (rest_bib.xsd). */
export interface Bib {
	/** The MMS ID (record identifier). */
	mms_id?: string;
	/** MARC record format (e.g. `"marc21"`, `"dc"`, `"unimarc"`). */
	record_format?: string;
	/** Linked record ID (e.g. network-zone or community-zone MMS ID). */
	linked_record_id?: { value?: string; type?: string };
	/** Derived record title. */
	title?: string;
	/** Derived primary author. */
	author?: string;
	/** ISBN (derived). */
	isbn?: string;
	/** ISSN (derived). */
	issn?: string;
	/** Place of publication (derived). */
	place_of_publication?: string;
	/** Date / year of publication (derived). */
	date_of_publication?: string;
	/** Publisher name (derived). */
	publisher_const?: string;
	/** Language of the record. */
	language?: AlmaCodeValue;
	/** Record source (e.g. `"IZ"`, `"NZ"`, `"CZ"`). */
	source?: AlmaCodeValue;
	/** Whether the record is suppressed from publishing. */
	suppressed_from_publishing?: string;
	/** Whether the record is suppressed from external search. */
	suppress_from_external_search?: string;
	/** System that originally created the record. */
	originating_system?: string;
	/** ID in the originating system. */
	originating_system_id?: string;
	/** Intellectual entity PID (digital resources). */
	iep?: string;
	/** Cataloging level of the record. */
	cataloging_level?: AlmaCodeValue;
	/** Brief level indicator. */
	brief_level?: AlmaCodeValue;
	/** Network numbers (OCLC numbers, etc.). */
	network_numbers?: { network_number?: string[] };
	/** Inline MARC record structure. */
	record?: MarcRecord;
	/** Non-MARC record data (Dublin Core, MODS, etc.) serialised as strings. */
	anies?: string[];
	/** User who created the record. */
	created_by?: string;
	/** ISO 8601 creation date. */
	created_date?: string;
	/** User who last modified the record. */
	last_modified_by?: string;
	/** ISO 8601 date of last modification. */
	last_modified_date?: string;
	/** Warnings produced during the last write operation. */
	warnings?: { warning?: Array<{ message?: string }> };
}

/** A list of bibliographic records (rest_bibs.xsd). */
export interface Bibs {
	/** The bibliographic records. */
	bib: Bib[];
	/** Total number of matching records (before pagination). */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Holdings records
// ---------------------------------------------------------------------------

/** A holdings record (rest_holding.xsd). */
export interface Holding {
	/** Holdings record ID. */
	holding_id?: string;
	/** Parent MMS ID. */
	mms_id?: string;
	/** Library code. */
	library?: AlmaCodeValue;
	/** Shelving location. */
	location?: AlmaCodeValue;
	/** Call number. */
	call_number?: string;
	/** Call number type. */
	call_number_type?: AlmaCodeValue;
	/** Whether this holdings is suppressed from publishing. */
	suppress_from_publishing?: string;
	/** System that originally created the record. */
	originating_system?: string;
	/** ID in the originating system. */
	originating_system_id?: string;
	/** Inline MARC holdings record. */
	record?: MarcRecord;
	/** User who created the record. */
	created_by?: string;
	/** ISO 8601 creation date. */
	created_date?: string;
	/** User who last modified the record. */
	last_modified_by?: string;
	/** ISO 8601 date of last modification. */
	last_modified_date?: string;
}

/** A list of holdings records. */
export interface Holdings {
	/** The holdings records. */
	holding: Holding[];
	/** Total number of holdings records. */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Physical items
// ---------------------------------------------------------------------------

/** Bib-level summary data embedded inside an item response. */
export interface ItemBibData {
	/** Parent MMS ID. */
	mms_id?: string;
	/** Bib title. */
	title?: string;
	/** Bib author. */
	author?: string;
	/** ISBN. */
	isbn?: string;
	/** ISSN. */
	issn?: string;
	/** Place of publication. */
	place_of_publication?: string;
	/** Date of publication. */
	date_of_publication?: string;
	/** Publisher name. */
	publisher_const?: string;
	/** Edition statement. */
	edition?: string;
	/** Network numbers (e.g. OCLC). */
	network_number?: string[];
	/** Record format. */
	record_format?: string;
}

/** Holdings-level summary data embedded inside an item response. */
export interface ItemHoldingData {
	/** Holdings record ID. */
	holding_id?: string;
	/** Whether the holdings is suppressed from publishing. */
	holding_suppress_from_publishing?: string;
	/** Calculated suppression value. */
	calculated_suppress_from_publishing?: string;
	/** Permanent library. */
	permanent_library?: AlmaCodeValue;
	/** Permanent shelving location. */
	permanent_location?: AlmaCodeValue;
	/** Temporary library (when in temp location). */
	temp_library?: AlmaCodeValue;
	/** Temporary shelving location. */
	temp_location?: AlmaCodeValue;
	/** Temporary call number. */
	temp_call_number?: string;
	/** Temporary call number type. */
	temp_call_number_type?: AlmaCodeValue;
	/** Source of the temporary call number. */
	temp_call_number_source?: string;
	/** Temporary circulation policy. */
	temp_policy?: AlmaCodeValue;
	/** Whether the item is currently in a temporary location. */
	in_temp_location?: boolean;
	/** Permanent call number. */
	call_number?: string;
	/** Permanent call number type. */
	call_number_type?: AlmaCodeValue;
	/** Accession number. */
	accession_number?: string;
	/** Copy ID. */
	copy_id?: string;
}

/** Item-level data inside an item response. */
export interface ItemData {
	/** Item PID (permanent identifier). */
	pid?: string;
	/** Item barcode. */
	barcode?: string;
	/** ISO 8601 creation date. */
	creation_date?: string;
	/** ISO 8601 last modification date. */
	modification_date?: string;
	/**
	 * Base availability status.
	 * Common values: `"1"` (Item in place), `"0"` (Not in place).
	 */
	base_status?: AlmaCodeValue;
	/** Whether the item is awaiting reshelving. */
	awaiting_reshelving?: boolean;
	/** Physical material type (e.g. BOOK, ISSUE). */
	physical_material_type?: AlmaCodeValue;
	/** Circulation policy. */
	policy?: AlmaCodeValue;
	/** Provenance code. */
	provenance?: AlmaCodeValue;
	/** Linked PO line number. */
	po_line?: string;
	/** Whether the item is magnetic media. */
	is_magnetic?: boolean;
	/** ISO 8601 arrival / receive date. */
	arrival_date?: string;
	/** Year of issue (serials). */
	year_of_issue?: string;
	/** Enumeration level A. */
	enumeration_a?: string;
	/** Enumeration level B. */
	enumeration_b?: string;
	/** Enumeration level C. */
	enumeration_c?: string;
	/** Enumeration level D. */
	enumeration_d?: string;
	/** Enumeration level E. */
	enumeration_e?: string;
	/** Enumeration level F. */
	enumeration_f?: string;
	/** Enumeration level G. */
	enumeration_g?: string;
	/** Enumeration level H. */
	enumeration_h?: string;
	/** Chronology level I. */
	chronology_i?: string;
	/** Chronology level J. */
	chronology_j?: string;
	/** Chronology level K. */
	chronology_k?: string;
	/** Chronology level L. */
	chronology_l?: string;
	/** Chronology level M. */
	chronology_m?: string;
	/** Public description (derived from enumeration/chronology). */
	description?: string;
	/** Operator who received/created the item. */
	receiving_operator?: string;
	/** Current process type (e.g. LOAN, TRANSIT, WORK_ORDER). */
	process_type?: AlmaCodeValue;
	/** Library the item is currently in transit to. */
	transit_library?: AlmaCodeValue;
	/** ISO 8601 date the item entered transit. */
	transit_date?: string;
	/** Current library. */
	library?: AlmaCodeValue;
	/** Current location. */
	location?: AlmaCodeValue;
	/** ISO 8601 date the location was last modified. */
	location_modified?: string;
	/** Whether the item is at a temporary location. */
	temp_location?: boolean;
	/** Alternative call number. */
	alternative_call_number?: string;
	/** Alternative call number type. */
	alternative_call_number_type?: AlmaCodeValue;
	/** Storage location ID. */
	storage_location_id?: string;
	/** Number of pages. */
	pages?: string;
	/** Number of physical pieces. */
	pieces?: string;
	/** Public note visible to patrons. */
	public_note?: string;
	/** Fulfillment note visible to circulation staff. */
	fulfillment_note?: string;
	/** Internal staff note 1. */
	internal_note_1?: string;
	/** Internal staff note 2. */
	internal_note_2?: string;
	/** Internal staff note 3. */
	internal_note_3?: string;
	/** Statistics note 1. */
	statistics_note_1?: string;
	/** Statistics note 2. */
	statistics_note_2?: string;
	/** Statistics note 3. */
	statistics_note_3?: string;
	/** Whether the item has an active request. */
	requested?: boolean;
	/** Edition statement (copied from bib). */
	edition?: string;
	/** Imprint statement. */
	imprint?: string;
	/** Language of the item. */
	language?: string;
}

/** A physical item (rest_item.xsd). */
export interface Item {
	/** Bib-level metadata. */
	bib_data?: ItemBibData;
	/** Holdings-level metadata. */
	holding_data?: ItemHoldingData;
	/** Item-level metadata. */
	item_data?: ItemData;
}

/** A list of physical items. */
export interface Items {
	/** The items. */
	item: Item[];
	/** Total number of matching items (before pagination). */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Loans
// ---------------------------------------------------------------------------

/** An item loan (rest_item_loan.xsd). */
export interface Loan {
	/** Loan ID. */
	loan_id?: string;
	/** Circulation desk where the loan was created. */
	circ_desk?: AlmaCodeValue;
	/** Library where the loan was created. */
	library?: AlmaCodeValue;
	/** Patron user ID. */
	user_id?: string;
	/** Barcode of the loaned item. */
	item_barcode?: string;
	/** MMS ID of the loaned bib. */
	mms_id?: string;
	/** Title of the loaned item. */
	title?: string;
	/** Author of the loaned item. */
	author?: string;
	/** Description (enumeration/chronology) of the loaned item. */
	description?: string;
	/** Holdings record ID. */
	holding_id?: string;
	/** Item PID. */
	item_id?: string;
	/** Loan status (e.g. `"ACTIVE"`, `"COMPLETE"`). */
	loan_status?: string;
	/** ISO 8601 due date/time. */
	due_date?: string;
	/** ISO 8601 loan date/time. */
	loan_date?: string;
	/** Process status. */
	process_status?: string;
	/** Call number at the time of loan. */
	call_number?: string;
	/** ISO 8601 date of last renewal. */
	last_renew_date?: string;
	/** Status of the last renewal attempt. */
	last_renew_status?: AlmaCodeValue;
	/** Whether the loan can currently be renewed. */
	renewable?: boolean;
	/** Number of active requests on this title/item. */
	requests_count?: number;
	/** Shelving location at the time of loan. */
	location?: AlmaCodeValue;
}

/** A list of loans. */
export interface Loans {
	/** The loans. */
	item_loan: Loan[];
	/** Total number of matching loans (before pagination). */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Requests
// ---------------------------------------------------------------------------

/** A page-range used in digitisation requests. */
export interface PageRange {
	/** First page of the requested range. */
	from_page?: string;
	/** Last page of the requested range. */
	to_page?: string;
}

/** A title-level or item-level request (rest_user_request.xsd). */
export interface BibRequest {
	/** Request ID. */
	request_id?: string;
	/** Request type (e.g. `"HOLD"`, `"DIGITIZATION"`, `"BOOKING"`). */
	request_type?: string;
	/** Request sub-type. */
	request_sub_type?: AlmaCodeValue;
	/** MMS ID of the requested bib. */
	mms_id?: string;
	/** Title of the requested bib. */
	title?: string;
	/** Author of the requested bib. */
	author?: string;
	/** Description (e.g. enumeration/chronology) of the requested item. */
	description?: string;
	/** Requested pickup location. */
	pickup_location?: AlmaCodeValue;
	/** Type of the pickup location (e.g. `"LIBRARY"`, `"INSTITUTION"`). */
	pickup_location_type?: string;
	/** Library of the pickup location. */
	pickup_location_library?: AlmaCodeValue;
	/** Destination (for digitisation / resource sharing). */
	destination?: AlmaCodeValue;
	/** Status of the request (e.g. `"NOT_STARTED"`, `"IN_PROCESS"`). */
	request_status?: string;
	/** Position in the request queue. */
	place_in_queue?: number;
	/** ISO 8601 date the request was placed. */
	request_date?: string;
	/** ISO 8601 expiry date of the request. */
	expiry_date?: string;
	/** ID of the requesting patron. */
	user_id?: string;
	/** Item PID (for item-level requests). */
	item_id?: string;
	/** Holdings record ID (for item-level requests). */
	holding_id?: string;
	/** Library managing the request. */
	managed_by_library?: AlmaCodeValue;
	/** Circulation desk managing the request. */
	managed_by_circ_desk?: AlmaCodeValue;
	/** Staff comment on the request. */
	comment?: string;
	/** Process status. */
	process_status?: string;
	/** Whether this is a partial digitisation request. */
	partial_digitization?: boolean;
	/** Chapter or article title (digitisation). */
	chapter_or_article_title?: string;
	/** Chapter or article author (digitisation). */
	chapter_or_article_author?: string;
	/** Page range(s) requested for digitisation. */
	required_pages_range?: PageRange[];
	/** Volume (digitisation). */
	volume?: string;
	/** Issue (digitisation). */
	issue?: string;
	/** Part (digitisation). */
	part?: string;
	/** Publication date (digitisation). */
	publication_date?: string;
	/** Pagination statement (digitisation). */
	pagination?: string;
	/** Additional notes. */
	notes?: string;
	/** Item barcode (for item-level requests). */
	barcode?: string;
}

/** A list of requests. */
export interface BibRequests {
	/** The requests. */
	user_request: BibRequest[];
	/** Total number of matching requests (before pagination). */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Request options
// ---------------------------------------------------------------------------

/** A single request option (e.g. HOLD, BOOKING, DIGITIZATION). */
export interface RequestOption {
	/** Option type. */
	type?: AlmaCodeValue;
	/** URL to place the request via the Alma UI. */
	request_url?: string;
	/** Resource-sharing information, if applicable. */
	rs_information?: Record<string, unknown>;
}

/** Available request options for a title or item (rest_request_options.xsd). */
export interface RequestOptions {
	/** The available options. */
	request_option: RequestOption[];
}

// ---------------------------------------------------------------------------
// Booking availability
// ---------------------------------------------------------------------------

/** A single available booking slot. */
export interface BookingSlot {
	/** ISO 8601 start date/time of the available slot. */
	from_time?: string;
	/** ISO 8601 end date/time of the available slot. */
	to_time?: string;
	/** Location where the item can be booked. */
	location?: AlmaCodeValue;
}

/** Booking availability for a bibliographic record. */
export interface BookingAvailability {
	/** Available booking slots. */
	booking_availability: BookingSlot[];
}

// ---------------------------------------------------------------------------
// Physical collections
// ---------------------------------------------------------------------------

/** A reference to a sub-collection. */
export interface SubCollectionRef {
	/** Sub-collection PID. */
	pid?: string;
	/** Sub-collection name. */
	name?: string;
	/** API link to the sub-collection. */
	link?: string;
}

/** A physical collection (rest_collection.xsd). */
export interface Collection {
	/** Collection PID. */
	pid?: string;
	/** Collection name. */
	name?: string;
	/** Collection description. */
	description?: string;
	/** Owning library. */
	library?: AlmaCodeValue;
	/** External system name. */
	external_system?: string;
	/** External system ID. */
	external_id?: string;
	/** PID of the parent collection. */
	parent_pid?: string;
	/** Name of the parent collection. */
	parent_name?: string;
	/** Whether the collection is publicly visible. */
	is_public?: string;
	/** Cataloguing information summary. */
	catalogs_info?: string;
	/** Nested sub-collections at the requested depth. */
	sub_collections?: { sub_collection?: SubCollectionRef[] };
}

/** A list of collections. */
export interface Collections {
	/** The collections. */
	collection: Collection[];
	/** Total number of matching collections (before pagination). */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Electronic collections
// ---------------------------------------------------------------------------

/** Coverage date range for an electronic resource. */
export interface CoverageRange {
	/** Coverage operator (e.g. `"AND"`, `"OR"`). */
	operator?: string;
	/** From year. */
	from_year?: string;
	/** From volume. */
	from_volume?: string;
	/** From issue. */
	from_issue?: string;
	/** To year. */
	to_year?: string;
	/** To volume. */
	to_volume?: string;
	/** To issue. */
	to_issue?: string;
}

/** An electronic collection (database / package) linked to a bib record. */
export interface ElectronicCollection {
	/** Collection PID. */
	pid?: string;
	/** Internal collection ID. */
	id?: string;
	/** Public name of the collection. */
	public_name?: string;
	/** Internal (staff) name of the collection. */
	private_name?: string;
	/** Description. */
	description?: string;
	/** Activation status. */
	activation_status?: AlmaCodeValue;
	/** Whether the collection is publicly accessible. */
	is_free?: string;
	/** Navigation link to the collection in Alma. */
	link?: string;
	/** URL type (e.g. `"STATIC"`, `"DYNAMIC"`). */
	url_type?: AlmaCodeValue;
	/** Service type hosted on the collection. */
	service_type?: AlmaCodeValue;
}

/** A list of electronic collections. */
export interface ElectronicCollections {
	/** The electronic collections. */
	electronic_collection: ElectronicCollection[];
	/** Total number of matching collections (before pagination). */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Digital representations
// ---------------------------------------------------------------------------

/** A digital representation (rest_representation.xsd). */
export interface Representation {
	/** Representation ID. */
	id?: string;
	/** Display label. */
	label?: string;
	/** Whether this is a remote (externally hosted) representation. */
	is_remote?: string;
	/** Usage type (e.g. `"VIEW"`, `"THUMBNAIL"`). */
	usage_type?: AlmaCodeValue;
	/** Public note. */
	public_note?: string;
	/** Owning library. */
	library?: AlmaCodeValue;
	/** Digital repository the representation belongs to. */
	repository?: AlmaCodeValue;
	/** Whether the representation is active. */
	active?: string;
	/** Parent MMS ID. */
	mms_id?: string;
	/** Intellectual entity PID. */
	entity_id?: string;
}

/** A list of digital representations. */
export interface Representations {
	/** The representations. */
	representation: Representation[];
	/** Total number of matching representations (before pagination). */
	total_record_count: number;
}

/** A file within a digital representation. */
export interface RepresentationFile {
	/** File PID. */
	pid?: string;
	/** Display label. */
	label?: string;
	/** Staff note. */
	note?: string;
	/** Target entity type. */
	target_entity?: AlmaCodeValue;
	/** Originating record ID. */
	originating_record_id?: string;
	/** Metadata type name. */
	md_type_name?: string;
	/** File type. */
	type?: string;
	/** Original file name. */
	file_name?: string;
	/** File size in bytes. */
	size?: string;
	/** Metadata type of the file. */
	file_mdtype?: string;
	/** Public delivery URL for the file. */
	delivery_url?: string;
}

/** A list of files in a digital representation. */
export interface RepresentationFiles {
	/** The files. */
	representation_file: RepresentationFile[];
	/** Total number of files. */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Authorities
// ---------------------------------------------------------------------------

/** An authority record (rest_authority.xsd). */
export interface Authority {
	/** API link to this authority record. */
	link?: string;
	/** MMS ID of the authority record. */
	mms_id?: string;
	/**
	 * Catalog format.
	 * Common values: `"marc21_authority"`, `"unimarc_authority"`, `"kormarc"`,
	 * `"cnmarc_authority"`, `"dc"`. Defaults to `"marc21_authority"`.
	 */
	record_format?: string;
	/** Derived title of the authority record. */
	title?: string;
	/** Cataloging level of the record (code table `CatalogerLevel`). */
	cataloging_level?: AlmaCodeValue;
	/** Authority vocabulary code (e.g. `"AGROVOC"`, `"LCSH"`); desc is the vocabulary name. */
	vocabulary?: AlmaCodeValue;
	/** Inline MARC authority record. */
	record?: MarcRecord;
	/** System that originally created the record. */
	originating_system?: string;
	/** ID in the originating system. */
	originating_system_id?: string;
	/** User who created the record. */
	created_by?: string;
	/** ISO 8601 creation date. */
	created_date?: string;
	/** User who last modified the record. */
	last_modified_by?: string;
	/** ISO 8601 date of last modification. */
	last_modified_date?: string;
	/** Validation warnings produced when creating or updating the record. */
	warnings?: { warning?: Array<{ message?: string }> };
}

/** A list of authority records. */
export interface Authorities {
	/** The authority records. */
	authority: Authority[];
	/** Total number of matching authority records (before pagination). */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Portfolios
// ---------------------------------------------------------------------------

/** Coverage statement for a portfolio. */
export interface PortfolioCoverage {
	/** Coverage ranges. */
	coverage_range?: CoverageRange[];
	/** Operator between ranges. */
	operator?: string;
}

/** A portfolio (electronic resource) linked to a bib record (rest_portfolio.xsd). */
export interface Portfolio {
	/** Portfolio ID. */
	id?: string;
	/** Parent MMS ID. */
	mms_id?: string;
	/** Whether this is a standalone portfolio (not part of a collection). */
	is_standalone?: boolean;
	/** Activation status. */
	availability?: AlmaCodeValue;
	/** Static or dynamic access URL. */
	url?: string;
	/** Public note. */
	public_note?: string;
	/** Authentication note. */
	authentication_note?: string;
	/** Material type (e.g. `"JOURNAL"`, `"BOOK"`). */
	material_type?: AlmaCodeValue;
	/** Which coverage definition is in use. */
	coverage_in_use?: string;
	/** Owning library. */
	library?: AlmaCodeValue;
	/** Parent electronic collection. */
	electronic_collection?: { id?: string; public_name?: string; link?: string };
	/** Parent service. */
	service?: { id?: string; public_name?: string; link?: string };
	/** Coverage information. */
	coverage?: PortfolioCoverage[];
	/** User who created the portfolio. */
	created_by?: string;
	/** ISO 8601 creation date. */
	created_date?: string;
	/** User who last modified the portfolio. */
	last_modified_by?: string;
	/** ISO 8601 date of last modification. */
	last_modified_date?: string;
}

/** A list of portfolios. */
export interface Portfolios {
	/** The portfolios. */
	portfolio: Portfolio[];
	/** Total number of portfolios (before pagination). */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Reminders
// ---------------------------------------------------------------------------

/** A reminder attached to a bibliographic record. */
export interface BibReminder {
	/** Reminder ID. */
	reminder_id?: string;
	/** Reminder type. */
	type?: AlmaCodeValue;
	/** Reminder status. */
	status?: AlmaCodeValue;
	/** Reminder note. */
	note?: string;
	/** ISO 8601 reminder date. */
	date?: string;
	/** ID of the record the reminder is attached to. */
	record_id?: string;
}

/** A list of reminders on bib records. */
export interface BibReminders {
	/** The reminders. */
	reminder: BibReminder[];
	/** Total number of reminders (before pagination). */
	total_record_count: number;
}
