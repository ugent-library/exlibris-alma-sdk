/**
 * Type definitions for the Alma Acquisitions API.
 *
 * Shapes are based on the XSD definitions published at
 * https://developers.exlibrisgroup.com/alma/apis/docs/xsd/ and the JSON
 * serialisation returned by the Alma REST API. All fields are optional unless
 * the API always returns them, because Alma omits absent fields from JSON
 * responses.
 */

import type { AlmaCodeValue } from "@/types/common";

// ---------------------------------------------------------------------------
// Funds
// ---------------------------------------------------------------------------

/** Fund balance information. */
export interface FundBalance {
	/** Sum of all active allocations. */
	allocated_sum?: number;
	/** Sum of encumbrances (committed but unpaid). */
	encumbered_sum?: number;
	/** Sum of expenditures (paid). */
	expended_sum?: number;
	/** Cash balance. */
	cash_balance?: number;
	/** Currency of the balance figures. */
	currency?: AlmaCodeValue;
}

/** A single allocation associated with a fund. */
export interface FundAllocation {
	/** Allocation ID. */
	id?: string;
	/** Allocation amount. */
	amount?: number;
	/** Currency. */
	currency?: AlmaCodeValue;
	/** Fiscal period this allocation belongs to. */
	fiscal_period?: AlmaCodeValue;
	/** Note. */
	note?: string;
}

/** A ledger fund used for budget tracking (rest_fund.xsd). */
export interface Fund {
	/** Fund ID. */
	id?: string;
	/** Fund code. */
	code?: string;
	/** Display name. */
	name?: string;
	/** Description. */
	description?: string;
	/** Fund type (e.g. `"ALLOCATED_FUND"`, `"SUMMARY_FUND"`, `"REPORTING_CODE"`). */
	type?: AlmaCodeValue;
	/** Fund status. */
	status?: AlmaCodeValue;
	/** Active fiscal period. */
	fiscal_period?: AlmaCodeValue;
	/** Current balance. */
	balance?: FundBalance;
	/** Parent fund, if this is a sub-fund. */
	parent_id?: string;
	/** Owning library. */
	library?: AlmaCodeValue;
	/** Owning user (fund manager). */
	owner?: AlmaCodeValue;
	/** External ERP identifier. */
	external_id?: string;
	/** Note. */
	note?: string;
	/** Allocations applied to this fund. */
	allocation?: FundAllocation[];
	/** ISO 8601 creation date. */
	created_date?: string;
	/** ISO 8601 date of last modification. */
	last_modified_date?: string;
}

/** A list of funds. */
export interface Funds {
	/** The funds. */
	fund: Fund[];
	/** Total number of matching funds (before pagination). */
	total_record_count: number;
}

/** A single financial transaction associated with a fund (rest_fund_transaction.xsd). */
export interface FundTransaction {
	/** Transaction ID. */
	id?: string;
	/** Transaction number (human-readable reference). */
	transaction_number?: string;
	/** ISO 8601 transaction date/time. */
	transaction_date?: string;
	/** Transaction type (e.g. `"ENCUMBRANCE"`, `"EXPENDITURE"`, `"ALLOCATION"`). */
	type?: AlmaCodeValue;
	/** Description / note. */
	description?: string;
	/** Transaction amount. */
	amount?: number;
	/** Currency. */
	currency?: AlmaCodeValue;
	/** Fiscal period. */
	fiscal_period?: AlmaCodeValue;
	/** PO number associated with the transaction. */
	po_id?: string;
	/** PO line number. */
	po_line_id?: string;
	/** Invoice number. */
	invoice_id?: string;
	/** Invoice line number. */
	invoice_line_id?: string;
	/** Vendor code. */
	vendor_code?: string;
	/** Fund code. */
	fund_code?: string;
	/** Reporting code. */
	reporting_code?: string;
}

/** A list of fund transactions. */
export interface FundTransactions {
	/** The transactions. */
	fund_transaction: FundTransaction[];
	/** Total number of transactions. */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Invoices
// ---------------------------------------------------------------------------

/** A fund distribution line on an invoice line or PO line. */
export interface FundDistribution {
	/** Fund code. */
	fund_code?: AlmaCodeValue;
	/** Percentage of total to assign to this fund (if percent-based). */
	percent?: number;
	/** Absolute amount to assign to this fund (if amount-based). */
	amount?: number;
}

/** A line on an invoice (rest_invoice_line.xsd). */
export interface InvoiceLine {
	/** Invoice line ID. */
	id?: string;
	/** Line number. */
	number?: string;
	/** Line type. */
	type?: AlmaCodeValue;
	/** Line status. */
	status?: AlmaCodeValue;
	/** Fund distribution. */
	fund_distribution?: FundDistribution[];
	/** Price per unit (before VAT). */
	price?: number;
	/** Quantity. */
	quantity?: number;
	/** Total price (after discount/VAT as configured). */
	total_price?: number;
	/** VAT code applied. */
	vat_code?: AlmaCodeValue;
	/** Note. */
	note?: string;
	/** Associated PO line ID. */
	po_line_id?: string;
	/** Reporting code. */
	reporting_code?: AlmaCodeValue;
	/** Subscription from date. */
	subscription_from_date?: string;
	/** Subscription to date. */
	subscription_to_date?: string;
	/** Receiving note. */
	receiving_note?: string;
}

/** A list of invoice lines. */
export interface InvoiceLines {
	/** The invoice lines. */
	invoice_line: InvoiceLine[];
	/** Total number of lines. */
	total_record_count: number;
}

/** A file attachment on an invoice. */
export interface InvoiceAttachment {
	/** Attachment ID. */
	id?: string;
	/** Original file name. */
	file_name?: string;
	/** Base64-encoded file contents. */
	content?: string;
	/** MIME type of the attachment. */
	mime_type?: string;
	/** ISO 8601 creation date/time. */
	created_time?: string;
}

/** A list of invoice attachments. */
export interface InvoiceAttachments {
	/** The attachments. */
	invoice_attachment: InvoiceAttachment[];
	/** Total number of attachments. */
	total_record_count: number;
}

/** An invoice (rest_invoice.xsd). */
export interface Invoice {
	/** Invoice ID. */
	id?: string;
	/** Invoice number (visible reference). */
	number?: string;
	/** Vendor code. */
	vendor_code?: AlmaCodeValue;
	/** Vendor account code. */
	vendor_account?: string;
	/** ISO 8601 invoice date. */
	invoice_date?: string;
	/** ISO 8601 payment date. */
	payment_date?: string;
	/** Invoice status (`"ACTIVE"`, `"CLOSED"`, `"DELETED"`). */
	invoice_status?: AlmaCodeValue;
	/** Workflow status (e.g. `"WAITING_TO_BE_SENT"`, `"PAID"`). */
	invoice_workflow_status?: AlmaCodeValue;
	/** Payment method. */
	payment_method?: AlmaCodeValue;
	/** Invoice currency. */
	currency?: AlmaCodeValue;
	/** Total invoice amount. */
	total_amount?: number;
	/** VAT amount. */
	vat_amount?: number;
	/** Additional charges. */
	additional_charges?: number;
	/** Discount value. */
	discount_value?: number;
	/** Discount type (`"PERCENT"` or `"AMOUNT"`). */
	discount_type?: string;
	/** How the invoice was created. */
	creation_form?: AlmaCodeValue;
	/** Owning library. */
	owner?: AlmaCodeValue;
	/** Note. */
	note?: string;
	/** Invoice lines. */
	invoice_lines?: { invoice_line?: InvoiceLine[] };
	/** Attachments. */
	invoice_attachments?: { invoice_attachment?: InvoiceAttachment[] };
	/** ISO 8601 creation date. */
	created_date?: string;
	/** ISO 8601 date of last modification. */
	last_modified_date?: string;
}

/** A list of invoices. */
export interface Invoices {
	/** The invoices. */
	invoice: Invoice[];
	/** Total number of matching invoices (before pagination). */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Licenses
// ---------------------------------------------------------------------------

/** A value of a license term on a specific license. */
export interface LicenseTermValue {
	/** Term code. */
	code?: string;
	/** Term value. */
	value?: string;
	/** Human-readable note. */
	note?: string;
}

/** A file attachment on a license or amendment. */
export interface LicenseAttachment {
	/** Attachment ID. */
	id?: string;
	/** Original file name. */
	file_name?: string;
	/** Base64-encoded file contents. */
	content?: string;
	/** MIME type. */
	mime_type?: string;
	/** ISO 8601 creation date/time. */
	created_time?: string;
}

/** A list of license attachments. */
export interface LicenseAttachments {
	/** The attachments. */
	license_attachment: LicenseAttachment[];
	/** Total number of attachments. */
	total_record_count: number;
}

/** An amendment to a license. */
export interface LicenseAmendment {
	/** Amendment code. */
	code?: string;
	/** Display name. */
	name?: string;
	/** Description. */
	description?: string;
	/** ISO 8601 start date of the amendment. */
	start_date?: string;
	/** ISO 8601 end date of the amendment. */
	end_date?: string;
	/** ISO 8601 review date. */
	review_date?: string;
	/** ISO 8601 date the amendment was signed. */
	signed_date?: string;
	/** Who signed the amendment. */
	signed_by?: string;
	/** Note. */
	note?: string;
	/** Term values specific to this amendment. */
	term?: LicenseTermValue[];
}

/** A list of license amendments. */
export interface LicenseAmendments {
	/** The amendments. */
	license_amendment: LicenseAmendment[];
	/** Total number of amendments. */
	total_record_count: number;
}

/** A license (rest_license.xsd). */
export interface License {
	/** License code. */
	code?: string;
	/** Display name. */
	name?: string;
	/** Description. */
	description?: string;
	/** Licensor (vendor code). */
	licensor?: AlmaCodeValue;
	/** License type. */
	type?: AlmaCodeValue;
	/** License status. */
	status?: AlmaCodeValue;
	/** Review status. */
	review_status?: AlmaCodeValue;
	/** ISO 8601 start date. */
	start_date?: string;
	/** ISO 8601 end date. */
	end_date?: string;
	/** ISO 8601 review date. */
	review_date?: string;
	/** ISO 8601 date the license was signed. */
	signed_date?: string;
	/** Who signed the license. */
	signed_by?: string;
	/** Note. */
	note?: string;
	/** License term values. */
	term?: LicenseTermValue[];
	/** ISO 8601 creation date. */
	created_date?: string;
	/** ISO 8601 date of last modification. */
	last_modified_date?: string;
}

/** A list of licenses. */
export interface Licenses {
	/** The licenses. */
	license: License[];
	/** Total number of matching licenses (before pagination). */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// PO lines
// ---------------------------------------------------------------------------

/** A reporting code attached to a PO line. */
export interface PoLineReportingCode {
	/** Reporting code value. */
	value?: string;
	/** Description. */
	desc?: string;
	/** Whether this is the first reporting code. */
	first_reporting_code?: boolean;
}

/** A PO line (rest_po_line.xsd). */
export interface PoLine {
	/** PO line ID. */
	po_line_id?: string;
	/** PO line number (human-readable). */
	number?: string;
	/** Linked bib MMS ID. */
	mms_id?: AlmaCodeValue;
	/** Bib title (derived). */
	title?: string;
	/** Author (derived). */
	author?: string;
	/** ISBN (derived). */
	isbn?: string;
	/** ISSN (derived). */
	issn?: string;
	/** Vendor code. */
	vendor_code?: AlmaCodeValue;
	/** Vendor account code. */
	vendor_account?: string;
	/** Vendor reference number. */
	vendor_reference_number?: string;
	/** Type of order line (e.g. `"PHYSICAL_CO"`, `"ELECTRONIC_JOURNAL"`). */
	type?: AlmaCodeValue;
	/** PO line status. */
	status?: AlmaCodeValue;
	/** Acquisition method (e.g. `"PURCHASE"`, `"GIFT"`, `"DEPOSITORY"`). */
	acquisition_method?: AlmaCodeValue;
	/** Fund distribution. */
	fund_distribution?: FundDistribution[];
	/** Price per unit. */
	price?: { sum?: number; currency?: AlmaCodeValue };
	/** Owning library. */
	library?: AlmaCodeValue;
	/** Shelving location. */
	location?: AlmaCodeValue;
	/** Number of units ordered. */
	quantity_ordered?: number;
	/** Note to vendor. */
	vendor_note?: string;
	/** Internal note. */
	note?: string;
	/** Whether this is a rush order. */
	rush?: boolean;
	/** Subscription from date. */
	subscription_from_date?: string;
	/** Subscription to date. */
	subscription_to_date?: string;
	/** Expected arrival date. */
	expected_arrival_date?: string;
	/** Reporting codes. */
	reporting_code?: PoLineReportingCode[];
	/** ISO 8601 creation date. */
	created_date?: string;
	/** User who created the PO line. */
	created_by?: string;
	/** ISO 8601 date of last modification. */
	last_modified_date?: string;
}

/** A list of PO lines. */
export interface PoLines {
	/** The PO lines. */
	po_line: PoLine[];
	/** Total number of matching PO lines (before pagination). */
	total_record_count: number;
}

/** An item assigned to a PO line. */
export interface PoLineItem {
	/** Item PID. */
	pid?: string;
	/** Item barcode. */
	barcode?: string;
	/** Material type. */
	item_type?: AlmaCodeValue;
	/** Owning library. */
	library?: AlmaCodeValue;
	/** Shelving location. */
	location?: AlmaCodeValue;
	/** ISO 8601 creation date. */
	created_date?: string;
}

/** A list of items linked to a PO line. */
export interface PoLineItems {
	/** The items. */
	po_line_item: PoLineItem[];
	/** Total number of items. */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Vendors
// ---------------------------------------------------------------------------

/** A contact person at a vendor. */
export interface VendorContact {
	/** Contact first name. */
	first_name?: string;
	/** Contact last name. */
	last_name?: string;
	/** Contact type. */
	contact_info_type?: AlmaCodeValue[];
	/** E-mail addresses. */
	email?: Array<{ email_address?: string; preferred?: boolean }>;
	/** Phone numbers. */
	phone?: Array<{ phone_number?: string; preferred?: boolean }>;
}

/** A vendor address. */
export interface VendorAddress {
	/** Address line 1. */
	line1?: string;
	/** Address line 2. */
	line2?: string;
	/** Address line 3. */
	line3?: string;
	/** City. */
	city?: string;
	/** State or province. */
	state_province?: string;
	/** Postal code. */
	postal_code?: string;
	/** Country. */
	country?: AlmaCodeValue;
	/** Address type. */
	address_type?: AlmaCodeValue[];
	/** Whether this is the preferred address. */
	preferred?: boolean;
}

/** A vendor (rest_vendor.xsd). */
export interface Vendor {
	/** Vendor code. */
	code?: string;
	/** Display name. */
	name?: string;
	/** Vendor status (`"ACTIVE"` or `"INACTIVE"`). */
	status?: AlmaCodeValue;
	/** Vendor type (e.g. `"MATERIAL_SUPPLIER"`, `"ACCESS_PROVIDER"`). */
	type?: AlmaCodeValue[];
	/** ERP code (for financial system integration). */
	erp_code?: string;
	/** Financial system code. */
	financial_sys_code?: string;
	/** Claim interval (days before claiming an overdue order). */
	claim_interval?: number;
	/** Late return interval (days). */
	late_return_interval?: number;
	/** Expected arrival days. */
	expected_arrival_days?: number;
	/** Currency used with this vendor. */
	currency?: AlmaCodeValue;
	/** Liablity account. */
	liability_account?: string;
	/** EDI configuration enabled. */
	edi_value?: string;
	/** Addresses. */
	address?: VendorAddress[];
	/** Contacts. */
	contact_info?: VendorContact[];
	/** Note. */
	note?: string;
	/** ISO 8601 creation date. */
	created_date?: string;
	/** ISO 8601 date of last modification. */
	last_modified_date?: string;
}

/** A list of vendors. */
export interface Vendors {
	/** The vendors. */
	vendor: Vendor[];
	/** Total number of matching vendors (before pagination). */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Purchase requests
// ---------------------------------------------------------------------------

/** A patron-initiated purchase request (rest_purchase_request.xsd). */
export interface PurchaseRequest {
	/** Request ID. */
	id?: string;
	/** Title of the requested item. */
	title?: string;
	/** Author of the requested item. */
	author?: string;
	/** ISBN. */
	isbn?: string;
	/** Publication year. */
	publication_year?: string;
	/** Publisher. */
	publisher?: string;
	/** User who placed the request. */
	requester?: AlmaCodeValue;
	/** Staff member the request is assigned to. */
	assigned_to?: AlmaCodeValue;
	/** Patron note. */
	note?: string;
	/** Request status. */
	status?: AlmaCodeValue;
	/** Citation type (e.g. `"BK"`, `"JR"`). */
	citation_type?: AlmaCodeValue;
	/** Owning library. */
	library?: AlmaCodeValue;
	/** Shelving location. */
	location?: AlmaCodeValue;
	/** Fund to charge. */
	fund?: AlmaCodeValue;
	/** Estimated price. */
	price?: number;
	/** Requester e-mail address. */
	requester_email?: string;
	/** ISO 8601 request date. */
	request_date?: string;
	/** Format of the request. */
	format?: AlmaCodeValue;
}

/** A list of purchase requests. */
export interface PurchaseRequests {
	/** The purchase requests. */
	purchase_request: PurchaseRequest[];
	/** Total number of matching requests (before pagination). */
	total_record_count: number;
}

// ---------------------------------------------------------------------------
// Currencies & fiscal periods
// ---------------------------------------------------------------------------

/** A currency and its current exchange rate relative to the local currency. */
export interface Currency {
	/** ISO 4217 currency code (e.g. `"USD"`, `"EUR"`). */
	code?: string;
	/** Display description. */
	description?: string;
	/** Exchange rate relative to the institution's local currency. */
	conversion_rate?: number;
	/** Whether this is the institution's local currency. */
	is_local?: boolean;
}

/** A list of currencies. */
export interface Currencies {
	/** The currencies. */
	currency: Currency[];
	/** Total number of currencies. */
	total_record_count: number;
}

/** A fiscal period (budget year). */
export interface FiscalPeriod {
	/** Fiscal period code. */
	code?: string;
	/** Display description. */
	description?: string;
	/** ISO 8601 start date. */
	start_date?: string;
	/** ISO 8601 end date. */
	end_date?: string;
	/** Status (`"ACTIVE"`, `"CLOSED"`, etc.). */
	status?: AlmaCodeValue;
	/** Whether this is the active/current period. */
	active?: boolean;
	/** Owning library(s). */
	library?: AlmaCodeValue[];
}

/** A list of fiscal periods. */
export interface FiscalPeriods {
	/** The fiscal periods. */
	fiscal_period: FiscalPeriod[];
	/** Total number of fiscal periods. */
	total_record_count: number;
}
