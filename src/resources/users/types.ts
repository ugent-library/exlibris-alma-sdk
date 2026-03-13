/**
 * Type definitions for the Alma Users API.
 *
 * Shapes are based on the XSD definitions published at
 * https://developers.exlibrisgroup.com/alma/apis/docs/xsd/ and the JSON
 * serialisation returned by the Alma REST API. All fields are optional unless
 * the API always returns them, because Alma omits absent fields from JSON
 * responses.
 */

import type { AlmaCodeValue } from "@/types/common";

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

/** An additional identifier for a user (barcode, SIS ID, etc.). */
export interface UserIdentifier {
	/** Identifier type. */
	id_type?: AlmaCodeValue;
	/** Identifier value. */
	value?: string;
	/** Whether this is the user's note. */
	note?: string;
	/** Status of this identifier. */
	status?: string;
}

/** An address belonging to a user. */
export interface UserAddress {
	/** Address line 1. */
	line1?: string;
	/** Address line 2. */
	line2?: string;
	/** Address line 3. */
	line3?: string;
	/** Address line 4. */
	line4?: string;
	/** Address line 5. */
	line5?: string;
	/** City. */
	city?: string;
	/** State or province. */
	state_province?: string;
	/** Postal code. */
	postal_code?: string;
	/** Country. */
	country?: AlmaCodeValue;
	/** Address types (e.g. `"home"`, `"work"`). */
	address_type?: AlmaCodeValue[];
	/** Whether this is the preferred address. */
	preferred?: boolean;
}

/** An email address belonging to a user. */
export interface UserEmail {
	/** Email address. */
	email_address?: string;
	/** Email types. */
	email_type?: AlmaCodeValue[];
	/** Whether this is the preferred email address. */
	preferred?: boolean;
}

/** A phone number belonging to a user. */
export interface UserPhone {
	/** Phone number. */
	phone_number?: string;
	/** Phone types. */
	phone_type?: AlmaCodeValue[];
	/** Whether this is the preferred phone number. */
	preferred?: boolean;
	/** Whether SMS is preferred for this number. */
	preferred_sms?: boolean;
}

/** Contact information for a user. */
export interface UserContactInfo {
	/** Addresses. */
	address?: UserAddress[];
	/** Email addresses. */
	email?: UserEmail[];
	/** Phone numbers. */
	phone?: UserPhone[];
}

/** A role assigned to a user. */
export interface UserRole {
	/** Role status. */
	status?: AlmaCodeValue;
	/** Role scope (institution or library). */
	scope?: AlmaCodeValue;
	/** Role type. */
	role_type?: AlmaCodeValue;
	/** System privilege. */
	system_privilege?: AlmaCodeValue;
}

/** A block on a user account. */
export interface UserBlock {
	/** Block type. */
	block_type?: AlmaCodeValue;
	/** Status. */
	block_status?: AlmaCodeValue;
	/** Description. */
	block_description?: AlmaCodeValue;
	/** Expiry date. */
	expiry_date?: string;
	/** User who created the block. */
	created_by?: string;
	/** ISO 8601 creation date. */
	created_date?: string;
	/** Comment. */
	comment?: string;
	/** Owner (library). */
	owner?: AlmaCodeValue;
	/** Item barcode triggering the block. */
	item_loan_id?: string;
}

/** A note on a user account. */
export interface UserNote {
	/** Note type. */
	note_type?: AlmaCodeValue;
	/** Note text. */
	note_text?: string;
	/** User who created the note. */
	created_by?: string;
	/** ISO 8601 creation date. */
	created_date?: string;
	/** Whether the note is visible to the user via self-service. */
	user_viewable?: boolean;
	/** Whether to pop up the note when the user's record is opened. */
	popup_note?: boolean;
}

/** A statistic attached to a user. */
export interface UserStatistic {
	/** Statistic category. */
	statistic_category?: AlmaCodeValue;
	/** Statistical note. */
	statistic_note?: AlmaCodeValue;
}

/** A user record (rest_user.xsd). */
export interface User {
	/** Primary identifier. */
	primary_id?: string;
	/** First name. */
	first_name?: string;
	/** Middle name. */
	middle_name?: string;
	/** Last name. */
	last_name?: string;
	/** Full name (derived from name parts). */
	full_name?: string;
	/** PIN number. */
	pin_number?: string;
	/** Title (e.g. `"DR"`, `"PROF"`). */
	user_title?: AlmaCodeValue;
	/** Job category. */
	job_category?: AlmaCodeValue;
	/** Job description (free text). */
	job_description?: string;
	/** Gender. */
	gender?: AlmaCodeValue;
	/** User group (patron type). */
	user_group?: AlmaCodeValue;
	/** Campus code. */
	campus_code?: AlmaCodeValue;
	/** Personal website URL. */
	web_site_url?: string;
	/** Cataloger level. */
	cataloger_level?: AlmaCodeValue;
	/** Preferred language. */
	preferred_language?: AlmaCodeValue;
	/**
	 * Account type.
	 * Common values: `"INTERNAL"`, `"EXTERNAL"`.
	 */
	account_type?: AlmaCodeValue;
	/** Record type (`"PUBLIC"`, `"STAFF"`, etc.). */
	record_type?: AlmaCodeValue;
	/** Account status. */
	status?: AlmaCodeValue;
	/** ISO 8601 date the status was last changed. */
	status_date?: string;
	/** ISO 8601 account expiry date. */
	expiry_date?: string;
	/** ISO 8601 date the account will be purged. */
	purge_date?: string;
	/** Additional identifiers (barcodes, SIS IDs, etc.). */
	user_identifier?: UserIdentifier[];
	/** Contact information. */
	contact_info?: UserContactInfo;
	/** Assigned roles. */
	user_role?: UserRole[];
	/** Active blocks. */
	user_block?: UserBlock[];
	/** Notes. */
	user_note?: UserNote[];
	/** Statistics. */
	user_statistic?: UserStatistic[];
	/** User who created the record. */
	created_by?: string;
	/** ISO 8601 creation date. */
	created_date?: string;
	/** User who last modified the record. */
	last_modified_by?: string;
	/** ISO 8601 date of last modification. */
	last_modified_date?: string;
}

/** A list of users. */
export interface Users {
	/** The users. */
	user: User[];
	/** Total number of matching users (before pagination). */
	total_record_count: number;
}

/** Personal data fields for a user (subset of User). */
export interface UserPersonalData {
	/** Primary identifier. */
	primary_id?: string;
	/** First name. */
	first_name?: string;
	/** Middle name. */
	middle_name?: string;
	/** Last name. */
	last_name?: string;
	/** Full name. */
	full_name?: string;
	/** Gender. */
	gender?: AlmaCodeValue;
	/** Birth date (YYYY-MM-DD). */
	birth_date?: string;
	/** Contact information. */
	contact_info?: UserContactInfo;
}

/** A file attachment on a user record. */
export interface UserAttachment {
	/** Attachment ID. */
	id?: string;
	/** Original file name. */
	file_name?: string;
	/** Staff note about the attachment. */
	note?: string;
	/** ISO 8601 date of last modification. */
	modification_date?: string;
	/** Base64-encoded file contents (present on retrieve). */
	content?: string;
	/** MIME type. */
	mime_type?: string;
}

// ---------------------------------------------------------------------------
// User loans
// ---------------------------------------------------------------------------

/** A loan associated with a user account (rest_item_loan.xsd). */
export interface UserLoan {
	/** Loan ID. */
	loan_id?: string;
	/** Circulation desk where the loan was created. */
	circ_desk?: AlmaCodeValue;
	/** Library where the loan was created. */
	library?: AlmaCodeValue;
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
	/** Call number type. */
	call_number_type?: AlmaCodeValue;
	/** ISO 8601 date of last renewal. */
	last_renew_date?: string;
	/** Status of the last renewal attempt. */
	last_renew_status?: AlmaCodeValue;
	/** Whether the loan can currently be renewed. */
	renewable?: boolean;
	/** Reason why the loan cannot be renewed (if applicable). */
	renewable_message?: AlmaCodeValue;
	/** Number of active title/item requests. */
	requests_count?: number;
	/** Item policy. */
	policy?: AlmaCodeValue;
	/** Whether the loan was triggered by a request. */
	original_due_date?: string;
}

/** A list of user loans. */
export interface UserLoans {
	/** The loans. */
	item_loan: UserLoan[];
	/** Total number of matching loans (before pagination). */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// User requests
// ---------------------------------------------------------------------------

/** A patron request (hold, booking, digitisation) associated with a user. */
export interface UserRequest {
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
	/** Description (e.g. enumeration/chronology). */
	description?: string;
	/** Requested pickup location. */
	pickup_location?: AlmaCodeValue;
	/** Type of the pickup location. */
	pickup_location_type?: string;
	/** Library at the pickup location. */
	pickup_location_library?: AlmaCodeValue;
	/** Status (e.g. `"NOT_STARTED"`, `"IN_PROCESS"`, `"ON_HOLD_SHELF"`). */
	request_status?: string;
	/** Position in the request queue. */
	place_in_queue?: number;
	/** ISO 8601 date the request was placed. */
	request_date?: string;
	/** ISO 8601 expiry date. */
	expiry_date?: string;
	/** Patron user ID. */
	user_id?: string;
	/** Item PID (for item-level requests). */
	item_id?: string;
	/** Holdings record ID (for item-level requests). */
	holding_id?: string;
	/** Item barcode (for item-level requests). */
	barcode?: string;
	/** Staff or patron comment. */
	comment?: string;
	/** Chapter or article title (digitisation). */
	chapter_or_article_title?: string;
	/** Chapter or article author (digitisation). */
	chapter_or_article_author?: string;
	/** Whether this is a partial digitisation. */
	partial_digitization?: boolean;
}

/** A list of user requests. */
export interface UserRequests {
	/** The requests. */
	user_request: UserRequest[];
	/** Total number of matching requests (before pagination). */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Resource sharing requests
// ---------------------------------------------------------------------------

/** A resource sharing (ILL) request. */
export interface ResourceSharingRequest {
	/** Request ID. */
	request_id?: string;
	/** Request type. */
	request_type?: AlmaCodeValue;
	/** Patron user ID. */
	requester?: AlmaCodeValue;
	/** Bib title. */
	title?: string;
	/** Author. */
	author?: string;
	/** Year of publication. */
	year?: string;
	/** ISBN. */
	isbn?: string;
	/** ISSN. */
	issn?: string;
	/** Publisher. */
	publisher?: string;
	/** Edition. */
	edition?: string;
	/** Notes. */
	note?: string;
	/** Request status. */
	status?: AlmaCodeValue;
	/** ISO 8601 status date. */
	status_date?: string;
	/** Owning library. */
	library?: AlmaCodeValue;
	/** Lending partner name. */
	partner_name?: AlmaCodeValue;
	/** ISO 8601 creation date. */
	created_date?: string;
	/** ISO 8601 date of last modification. */
	last_modified_date?: string;
}

// ---------------------------------------------------------------------------
// Fees & deposits
// ---------------------------------------------------------------------------

/** A single payment transaction on a fee or deposit. */
export interface FeePaymentTransaction {
	/** Transaction type. */
	type?: AlmaCodeValue;
	/** Transaction amount. */
	amount?: number;
	/** ISO 8601 transaction date/time. */
	transaction_time?: string;
	/** Payment method. */
	method?: AlmaCodeValue;
	/** External payment reference (e.g. credit card authorisation). */
	external_transaction_id?: string;
	/** Comment. */
	comment?: string;
}

/** A fine or fee on a user account (rest_user_fee.xsd). */
export interface UserFee {
	/** Fee ID. */
	id?: string;
	/** Fee type. */
	type?: AlmaCodeValue;
	/** Original fine/fee amount. */
	original_amount?: number;
	/** Current balance (amount still owed). */
	balance?: number;
	/** Remaining VAT component of the balance. */
	remaining_vat_amount?: number;
	/** Fee status. */
	status?: AlmaCodeValue;
	/** Reason the fee was closed (if applicable). */
	close_reason?: AlmaCodeValue;
	/** ISO 8601 creation date/time. */
	creation_date?: string;
	/** ISO 8601 status change date. */
	status_date?: string;
	/** Staff comment. */
	comment?: string;
	/** Owning library. */
	owner?: AlmaCodeValue;
	/** Barcode of the item that triggered the fee. */
	item_barcode?: string;
	/** MMS ID of the bib associated with the fee. */
	mms_id?: string;
	/** Title of the associated item. */
	title?: string;
	/** Call number of the associated item. */
	call_number?: string;
	/** Transactions (payments, waivers, disputes). */
	transaction?: FeePaymentTransaction[];
}

/** A list of fees. */
export interface UserFees {
	/** The fees. */
	user_fee: UserFee[];
	/** Total number of fees. */
	total_record_count: number;
}

/** A deposit (prepaid credit) on a user account. */
export interface UserDeposit {
	/** Deposit ID. */
	id?: string;
	/** Owning library. */
	owner?: AlmaCodeValue;
	/** Deposit type. */
	type?: AlmaCodeValue;
	/** Deposit status. */
	status?: AlmaCodeValue;
	/** Initial deposit amount. */
	amount?: number;
	/** Remaining balance. */
	remaining_amount?: number;
	/** ISO 8601 creation date/time. */
	creation_date?: string;
	/** Reason the deposit was closed (if applicable). */
	close_reason?: AlmaCodeValue;
	/** Staff comment. */
	comment?: string;
	/** Transactions applied to this deposit. */
	transaction?: FeePaymentTransaction[];
}

/** A list of deposits. */
export interface UserDeposits {
	/** The deposits. */
	user_deposit: UserDeposit[];
	/** Total number of deposits. */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// User purchase requests
// ---------------------------------------------------------------------------

/** A patron-submitted purchase request (user-facing view). */
export interface UserPurchaseRequest {
	/** Request ID. */
	id?: string;
	/** Title of the requested item. */
	title?: string;
	/** Author of the requested item. */
	author?: string;
	/** ISBN. */
	isbn?: string;
	/** Priority rank assigned by staff. */
	rank?: number;
	/** Request status. */
	status?: AlmaCodeValue;
	/** Patron note. */
	note?: string;
	/** Citation type. */
	citation_type?: AlmaCodeValue;
	/** Linked bib MMS ID (after matching). */
	mms_id?: string;
	/** ISO 8601 date the request was submitted. */
	request_date?: string;
}

/** A list of user purchase requests. */
export interface UserPurchaseRequests {
	/** The purchase requests. */
	user_purchase_request: UserPurchaseRequest[];
	/** Total number of purchase requests. */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Leganto notifications
// ---------------------------------------------------------------------------

/** A single Leganto reading list notification. */
export interface LegantoNotification {
	/** Notification ID. */
	id?: string;
	/** Notification type. */
	type?: string;
	/** Notification message / body. */
	message?: string;
	/** ISO 8601 date/time of the notification. */
	date?: string;
	/** Whether the notification has been read. */
	is_read?: boolean;
	/** Course title associated with the notification. */
	course_title?: string;
	/** Citation title associated with the notification. */
	citation_title?: string;
}

/** Leganto reading-list notifications for a user. */
export interface LegantoNotifications {
	/** The notifications. */
	leganto_notification: LegantoNotification[];
	/** Total number of notifications. */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Staff login report
// ---------------------------------------------------------------------------

/** A single entry in the staff login report. */
export interface StaffLoginEntry {
	/** Staff user primary ID. */
	primary_id?: string;
	/** Staff full name. */
	full_name?: string;
	/** Login IP address. */
	ip_address?: string;
	/** ISO 8601 login date/time. */
	login_date?: string;
	/** Whether the login was successful. */
	successful?: boolean;
}

/** The staff login report. */
export interface StaffLoginReport {
	/** The login entries. */
	staff_login: StaffLoginEntry[];
	/** Total number of entries. */
	total_record_count: number;
}
