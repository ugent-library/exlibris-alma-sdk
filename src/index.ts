export type { AlmaClientConfig, AlmaRegion } from "./client.ts";
export { AlmaError, AlmaUnauthorizedError } from "./errors.ts";
export type {
	Currencies,
	Currency,
	FiscalPeriod,
	FiscalPeriods,
	Fund,
	Funds,
	FundTransaction,
	FundTransactions,
	Invoice,
	InvoiceAttachment,
	InvoiceAttachments,
	InvoiceLine,
	InvoiceLines,
	Invoices,
	License,
	LicenseAmendment,
	LicenseAmendments,
	LicenseAttachment,
	LicenseAttachments,
	Licenses,
	PoLine,
	PoLineItem,
	PoLineItems,
	PoLines,
	PurchaseRequest,
	PurchaseRequests,
	Vendor,
	Vendors,
} from "./resources/acq/index.ts";
export { AcqResource } from "./resources/acq/index.ts";
export type {
	Authorities,
	Authority,
	Bib,
	BibReminder,
	BibReminders,
	BibRequest,
	BibRequests,
	Bibs,
	BookingAvailability,
	Collection,
	Collections,
	ElectronicCollection,
	ElectronicCollections,
	Holding,
	Holdings,
	Item,
	Items,
	Loan,
	Loans,
	Portfolio,
	Portfolios,
	Representation,
	RepresentationFile,
	RepresentationFiles,
	Representations,
	RequestOptions,
} from "./resources/bibs/index.ts";
export { BibsResource } from "./resources/bibs/index.ts";
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
} from "./resources/conf/index.ts";
export { ConfResource } from "./resources/conf/index.ts";
export type {
	LegantoNotifications,
	ResourceSharingRequest,
	StaffLoginReport,
	User,
	UserAttachment,
	UserDeposit,
	UserDeposits,
	UserFee,
	UserFees,
	UserLoan,
	UserLoans,
	UserPersonalData,
	UserPurchaseRequest,
	UserPurchaseRequests,
	UserRequest,
	UserRequests,
	Users,
} from "./resources/users/index.ts";
export { UsersResource } from "./resources/users/index.ts";

import type { AlmaClientConfig } from "./client.ts";
import { AlmaHttpClient } from "./client.ts";
import { AcqResource } from "./resources/acq/index.ts";
import { BibsResource } from "./resources/bibs/index.ts";
import { ConfResource } from "./resources/conf/index.ts";
import { UsersResource } from "./resources/users/index.ts";

/**
 * Top-level Alma API client.
 *
 * Provides namespaced access to all Alma API resources:
 * - `conf` - Configuration API (libraries, jobs, sets, profiles, etc.)
 * - `bibs` - Bibliographic API (bibs, holdings, items, loans, requests, etc.)
 * - `acq` - Acquisitions API (funds, invoices, licenses, PO lines, vendors, etc.)
 * - `users` - Users API (users, loans, requests, fees, purchase requests, etc.)
 *
 * @example
 * ```typescript
 * import { AlmaClient } from 'alma-sdk';
 *
 * const client = new AlmaClient({ apiKey: 'your-api-key', region: 'eu' });
 *
 * const libraries = await client.conf.retrieveLibraries();
 * const bib = await client.bibs.retrieveBib('990000000000541');
 * const funds = await client.acq.retrieveFundsList();
 * const user = await client.users.retrieveUser('12345');
 * ```
 */
export class AlmaClient {
	/** Configuration API resource. */
	readonly conf: ConfResource;
	/** Bibliographic API resource. */
	readonly bibs: BibsResource;
	/** Acquisitions API resource. */
	readonly acq: AcqResource;
	/** Users API resource. */
	readonly users: UsersResource;

	constructor(config: AlmaClientConfig) {
		const http = new AlmaHttpClient(config);
		this.conf = new ConfResource(http);
		this.bibs = new BibsResource(http);
		this.acq = new AcqResource(http);
		this.users = new UsersResource(http);
	}
}
