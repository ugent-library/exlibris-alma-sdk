import type { AlmaHttpClient } from "@/client";

import { BibsAuthoritiesResource } from "./authorities";
import { BibsCatalogResource } from "./catalog";
import { BibsCollectionsResource } from "./collections";
import { BibsDigitalResource } from "./digital";
import { BibsLoansResource } from "./loans";
import { BibsRemindersResource } from "./reminders";
import { BibsRequestsResource } from "./requests";

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
} from "./types";

/**
 * Resource client for the Alma Bibliographic API.
 *
 * Exposes sub-resources for all bibliographic entities:
 * - `catalog` - bibs, holdings, items, portfolios, booking availability
 * - `loans` - bib-level and item-level loans
 * - `requests` - bib-level and item-level requests, request options, booking availability
 * - `collections` - collections and collection bibs
 * - `digital` - representations, representation files, e-collections
 * - `authorities` - authority records
 * - `reminders` - bib-level reminders
 *
 * All methods can also be accessed directly on this resource object via
 * convenience delegations.
 *
 * @example
 * ```typescript
 * const client = new AlmaClient({ apiKey: 'xxx', region: 'eu' });
 *
 * // via sub-resource
 * await client.bibs.catalog.retrieveBib('123456');
 * await client.bibs.loans.retrieveBibLoansList('123456');
 *
 * // via direct convenience methods
 * await client.bibs.retrieveBib('123456');
 * await client.bibs.retrieveBibLoansList('123456');
 * ```
 */
export class BibsResource {
	/** Catalog sub-resource: bibs, holdings, items, portfolios, booking availability. */
	readonly catalog: BibsCatalogResource;
	/** Loans sub-resource: bib-level and item-level loans. */
	readonly loans: BibsLoansResource;
	/** Requests sub-resource: bib-level and item-level requests. */
	readonly requests: BibsRequestsResource;
	/** Collections sub-resource: collections and collection bibs. */
	readonly collections: BibsCollectionsResource;
	/** Digital sub-resource: representations, files, e-collections. */
	readonly digital: BibsDigitalResource;
	/** Authorities sub-resource: authority records. */
	readonly authorities: BibsAuthoritiesResource;
	/** Reminders sub-resource: bib-level reminders. */
	readonly reminders: BibsRemindersResource;

	constructor(client: AlmaHttpClient) {
		this.catalog = new BibsCatalogResource(client);
		this.loans = new BibsLoansResource(client);
		this.requests = new BibsRequestsResource(client);
		this.collections = new BibsCollectionsResource(client);
		this.digital = new BibsDigitalResource(client);
		this.authorities = new BibsAuthoritiesResource(client);
		this.reminders = new BibsRemindersResource(client);
	}

	// ── Catalog ───────────────────────────────────────────────────────────────

	/**
	 * @see {@link BibsCatalogResource.retrieveBibs}
	 */
	retrieveBibs: BibsCatalogResource["retrieveBibs"] = (...args) =>
		this.catalog.retrieveBibs(...args);

	/**
	 * @see {@link BibsCatalogResource.retrieveBib}
	 */
	retrieveBib: BibsCatalogResource["retrieveBib"] = (...args) =>
		this.catalog.retrieveBib(...args);

	/**
	 * @see {@link BibsCatalogResource.createBib}
	 */
	createBib: BibsCatalogResource["createBib"] = (...args) =>
		this.catalog.createBib(...args);

	/**
	 * @see {@link BibsCatalogResource.updateBib}
	 */
	updateBib: BibsCatalogResource["updateBib"] = (...args) =>
		this.catalog.updateBib(...args);

	/**
	 * @see {@link BibsCatalogResource.operateBib}
	 */
	operateBib: BibsCatalogResource["operateBib"] = (...args) =>
		this.catalog.operateBib(...args);

	/**
	 * @see {@link BibsCatalogResource.deleteBib}
	 */
	deleteBib: BibsCatalogResource["deleteBib"] = (...args) =>
		this.catalog.deleteBib(...args);

	/**
	 * @see {@link BibsCatalogResource.retrieveHoldingsList}
	 */
	retrieveHoldingsList: BibsCatalogResource["retrieveHoldingsList"] = (
		...args
	) => this.catalog.retrieveHoldingsList(...args);

	/**
	 * @see {@link BibsCatalogResource.retrieveHolding}
	 */
	retrieveHolding: BibsCatalogResource["retrieveHolding"] = (...args) =>
		this.catalog.retrieveHolding(...args);

	/**
	 * @see {@link BibsCatalogResource.createHolding}
	 */
	createHolding: BibsCatalogResource["createHolding"] = (...args) =>
		this.catalog.createHolding(...args);

	/**
	 * @see {@link BibsCatalogResource.updateHolding}
	 */
	updateHolding: BibsCatalogResource["updateHolding"] = (...args) =>
		this.catalog.updateHolding(...args);

	/**
	 * @see {@link BibsCatalogResource.deleteHolding}
	 */
	deleteHolding: BibsCatalogResource["deleteHolding"] = (...args) =>
		this.catalog.deleteHolding(...args);

	/**
	 * @see {@link BibsCatalogResource.retrieveItemsList}
	 */
	retrieveItemsList: BibsCatalogResource["retrieveItemsList"] = (...args) =>
		this.catalog.retrieveItemsList(...args);

	/**
	 * @see {@link BibsCatalogResource.retrieveItem}
	 */
	retrieveItem: BibsCatalogResource["retrieveItem"] = (...args) =>
		this.catalog.retrieveItem(...args);

	/**
	 * @see {@link BibsCatalogResource.createItem}
	 */
	createItem: BibsCatalogResource["createItem"] = (...args) =>
		this.catalog.createItem(...args);

	/**
	 * @see {@link BibsCatalogResource.updateItem}
	 */
	updateItem: BibsCatalogResource["updateItem"] = (...args) =>
		this.catalog.updateItem(...args);

	/**
	 * @see {@link BibsCatalogResource.operateItem}
	 */
	operateItem: BibsCatalogResource["operateItem"] = (...args) =>
		this.catalog.operateItem(...args);

	/**
	 * @see {@link BibsCatalogResource.deleteItem}
	 */
	deleteItem: BibsCatalogResource["deleteItem"] = (...args) =>
		this.catalog.deleteItem(...args);

	/**
	 * @see {@link BibsCatalogResource.retrievePortfoliosList}
	 */
	retrievePortfoliosList: BibsCatalogResource["retrievePortfoliosList"] = (
		...args
	) => this.catalog.retrievePortfoliosList(...args);

	/**
	 * @see {@link BibsCatalogResource.retrievePortfolio}
	 */
	retrievePortfolio: BibsCatalogResource["retrievePortfolio"] = (...args) =>
		this.catalog.retrievePortfolio(...args);

	/**
	 * @see {@link BibsCatalogResource.createPortfolio}
	 */
	createPortfolio: BibsCatalogResource["createPortfolio"] = (...args) =>
		this.catalog.createPortfolio(...args);

	/**
	 * @see {@link BibsCatalogResource.updatePortfolio}
	 */
	updatePortfolio: BibsCatalogResource["updatePortfolio"] = (...args) =>
		this.catalog.updatePortfolio(...args);

	/**
	 * @see {@link BibsCatalogResource.deletePortfolio}
	 */
	deletePortfolio: BibsCatalogResource["deletePortfolio"] = (...args) =>
		this.catalog.deletePortfolio(...args);

	/**
	 * @see {@link BibsCatalogResource.retrieveBookingAvailability}
	 */
	retrieveBookingAvailability: BibsCatalogResource["retrieveBookingAvailability"] =
		(...args) => this.catalog.retrieveBookingAvailability(...args);

	// ── Loans ─────────────────────────────────────────────────────────────────

	/**
	 * @see {@link BibsLoansResource.retrieveBibLoansList}
	 */
	retrieveBibLoansList: BibsLoansResource["retrieveBibLoansList"] = (...args) =>
		this.loans.retrieveBibLoansList(...args);

	/**
	 * @see {@link BibsLoansResource.retrieveBibLoan}
	 */
	retrieveBibLoan: BibsLoansResource["retrieveBibLoan"] = (...args) =>
		this.loans.retrieveBibLoan(...args);

	/**
	 * @see {@link BibsLoansResource.retrieveItemLoansList}
	 */
	retrieveItemLoansList: BibsLoansResource["retrieveItemLoansList"] = (
		...args
	) => this.loans.retrieveItemLoansList(...args);

	/**
	 * @see {@link BibsLoansResource.retrieveItemLoan}
	 */
	retrieveItemLoan: BibsLoansResource["retrieveItemLoan"] = (...args) =>
		this.loans.retrieveItemLoan(...args);

	/**
	 * @see {@link BibsLoansResource.createItemLoan}
	 */
	createItemLoan: BibsLoansResource["createItemLoan"] = (...args) =>
		this.loans.createItemLoan(...args);

	/**
	 * @see {@link BibsLoansResource.updateItemLoan}
	 */
	updateItemLoan: BibsLoansResource["updateItemLoan"] = (...args) =>
		this.loans.updateItemLoan(...args);

	/**
	 * @see {@link BibsLoansResource.operateItemLoan}
	 */
	operateItemLoan: BibsLoansResource["operateItemLoan"] = (...args) =>
		this.loans.operateItemLoan(...args);

	// ── Requests ──────────────────────────────────────────────────────────────

	/**
	 * @see {@link BibsRequestsResource.retrieveBibRequestsList}
	 */
	retrieveBibRequestsList: BibsRequestsResource["retrieveBibRequestsList"] = (
		...args
	) => this.requests.retrieveBibRequestsList(...args);

	/**
	 * @see {@link BibsRequestsResource.retrieveBibRequest}
	 */
	retrieveBibRequest: BibsRequestsResource["retrieveBibRequest"] = (...args) =>
		this.requests.retrieveBibRequest(...args);

	/**
	 * @see {@link BibsRequestsResource.createBibRequest}
	 */
	createBibRequest: BibsRequestsResource["createBibRequest"] = (...args) =>
		this.requests.createBibRequest(...args);

	/**
	 * @see {@link BibsRequestsResource.updateBibRequest}
	 */
	updateBibRequest: BibsRequestsResource["updateBibRequest"] = (...args) =>
		this.requests.updateBibRequest(...args);

	/**
	 * @see {@link BibsRequestsResource.operateBibRequest}
	 */
	operateBibRequest: BibsRequestsResource["operateBibRequest"] = (...args) =>
		this.requests.operateBibRequest(...args);

	/**
	 * @see {@link BibsRequestsResource.deleteBibRequest}
	 */
	deleteBibRequest: BibsRequestsResource["deleteBibRequest"] = (...args) =>
		this.requests.deleteBibRequest(...args);

	/**
	 * @see {@link BibsRequestsResource.retrieveBibRequestOptions}
	 */
	retrieveBibRequestOptions: BibsRequestsResource["retrieveBibRequestOptions"] =
		(...args) => this.requests.retrieveBibRequestOptions(...args);

	/**
	 * @see {@link BibsRequestsResource.retrieveItemRequestsList}
	 */
	retrieveItemRequestsList: BibsRequestsResource["retrieveItemRequestsList"] = (
		...args
	) => this.requests.retrieveItemRequestsList(...args);

	/**
	 * @see {@link BibsRequestsResource.retrieveItemRequest}
	 */
	retrieveItemRequest: BibsRequestsResource["retrieveItemRequest"] = (
		...args
	) => this.requests.retrieveItemRequest(...args);

	/**
	 * @see {@link BibsRequestsResource.createItemRequest}
	 */
	createItemRequest: BibsRequestsResource["createItemRequest"] = (...args) =>
		this.requests.createItemRequest(...args);

	/**
	 * @see {@link BibsRequestsResource.updateItemRequest}
	 */
	updateItemRequest: BibsRequestsResource["updateItemRequest"] = (...args) =>
		this.requests.updateItemRequest(...args);

	/**
	 * @see {@link BibsRequestsResource.operateItemRequest}
	 */
	operateItemRequest: BibsRequestsResource["operateItemRequest"] = (...args) =>
		this.requests.operateItemRequest(...args);

	/**
	 * @see {@link BibsRequestsResource.deleteItemRequest}
	 */
	deleteItemRequest: BibsRequestsResource["deleteItemRequest"] = (...args) =>
		this.requests.deleteItemRequest(...args);

	/**
	 * @see {@link BibsRequestsResource.retrieveItemRequestOptions}
	 */
	retrieveItemRequestOptions: BibsRequestsResource["retrieveItemRequestOptions"] =
		(...args) => this.requests.retrieveItemRequestOptions(...args);

	/**
	 * @see {@link BibsRequestsResource.retrieveItemBookingAvailability}
	 */
	retrieveItemBookingAvailability: BibsRequestsResource["retrieveItemBookingAvailability"] =
		(...args) => this.requests.retrieveItemBookingAvailability(...args);

	// ── Collections ───────────────────────────────────────────────────────────

	/**
	 * @see {@link BibsCollectionsResource.retrieveCollections}
	 */
	retrieveCollections: BibsCollectionsResource["retrieveCollections"] = (
		...args
	) => this.collections.retrieveCollections(...args);

	/**
	 * @see {@link BibsCollectionsResource.retrieveCollection}
	 */
	retrieveCollection: BibsCollectionsResource["retrieveCollection"] = (
		...args
	) => this.collections.retrieveCollection(...args);

	/**
	 * @see {@link BibsCollectionsResource.createCollection}
	 */
	createCollection: BibsCollectionsResource["createCollection"] = (...args) =>
		this.collections.createCollection(...args);

	/**
	 * @see {@link BibsCollectionsResource.updateCollection}
	 */
	updateCollection: BibsCollectionsResource["updateCollection"] = (...args) =>
		this.collections.updateCollection(...args);

	/**
	 * @see {@link BibsCollectionsResource.deleteCollection}
	 */
	deleteCollection: BibsCollectionsResource["deleteCollection"] = (...args) =>
		this.collections.deleteCollection(...args);

	/**
	 * @see {@link BibsCollectionsResource.retrieveCollectionBibsList}
	 */
	retrieveCollectionBibsList: BibsCollectionsResource["retrieveCollectionBibsList"] =
		(...args) => this.collections.retrieveCollectionBibsList(...args);

	/** @see {@link BibsCollectionsResource.addBibToCollection} */
	addBibToCollection: BibsCollectionsResource["addBibToCollection"] = (
		...args
	) => this.collections.addBibToCollection(...args);

	/**
	 * @see {@link BibsCollectionsResource.removeBibFromCollection}
	 */
	removeBibFromCollection: BibsCollectionsResource["removeBibFromCollection"] =
		(...args) => this.collections.removeBibFromCollection(...args);

	// ── Digital ───────────────────────────────────────────────────────────────

	/**
	 * @see {@link BibsDigitalResource.retrieveRepresentationsList}
	 */
	retrieveRepresentationsList: BibsDigitalResource["retrieveRepresentationsList"] =
		(...args) => this.digital.retrieveRepresentationsList(...args);

	/**
	 * @see {@link BibsDigitalResource.retrieveRepresentation}
	 */
	retrieveRepresentation: BibsDigitalResource["retrieveRepresentation"] = (
		...args
	) => this.digital.retrieveRepresentation(...args);

	/**
	 * @see {@link BibsDigitalResource.createRepresentation}
	 */
	createRepresentation: BibsDigitalResource["createRepresentation"] = (
		...args
	) => this.digital.createRepresentation(...args);

	/**
	 * @see {@link BibsDigitalResource.updateRepresentation}
	 */
	updateRepresentation: BibsDigitalResource["updateRepresentation"] = (
		...args
	) => this.digital.updateRepresentation(...args);

	/**
	 * @see {@link BibsDigitalResource.deleteRepresentation}
	 */
	deleteRepresentation: BibsDigitalResource["deleteRepresentation"] = (
		...args
	) => this.digital.deleteRepresentation(...args);

	/**
	 * @see {@link BibsDigitalResource.retrieveRepresentationFilesList}
	 */
	retrieveRepresentationFilesList: BibsDigitalResource["retrieveRepresentationFilesList"] =
		(...args) => this.digital.retrieveRepresentationFilesList(...args);

	/**
	 * @see {@link BibsDigitalResource.retrieveRepresentationFile}
	 */
	retrieveRepresentationFile: BibsDigitalResource["retrieveRepresentationFile"] =
		(...args) => this.digital.retrieveRepresentationFile(...args);

	/**
	 * @see {@link BibsDigitalResource.createRepresentationFile}
	 */
	createRepresentationFile: BibsDigitalResource["createRepresentationFile"] = (
		...args
	) => this.digital.createRepresentationFile(...args);

	/**
	 * @see {@link BibsDigitalResource.updateRepresentationFile}
	 */
	updateRepresentationFile: BibsDigitalResource["updateRepresentationFile"] = (
		...args
	) => this.digital.updateRepresentationFile(...args);

	/**
	 * @see {@link BibsDigitalResource.deleteRepresentationFile}
	 */
	deleteRepresentationFile: BibsDigitalResource["deleteRepresentationFile"] = (
		...args
	) => this.digital.deleteRepresentationFile(...args);

	/**
	 * @see {@link BibsDigitalResource.retrieveECollectionsList}
	 */
	retrieveECollectionsList: BibsDigitalResource["retrieveECollectionsList"] = (
		...args
	) => this.digital.retrieveECollectionsList(...args);

	/**
	 * @see {@link BibsDigitalResource.retrieveECollection}
	 */
	retrieveECollection: BibsDigitalResource["retrieveECollection"] = (...args) =>
		this.digital.retrieveECollection(...args);

	// ── Authorities ───────────────────────────────────────────────────────────

	/**
	 * @see {@link BibsAuthoritiesResource.retrieveAuthorities}
	 */
	retrieveAuthorities: BibsAuthoritiesResource["retrieveAuthorities"] = (
		...args
	) => this.authorities.retrieveAuthorities(...args);

	/**
	 * @see {@link BibsAuthoritiesResource.retrieveAuthority}
	 */
	retrieveAuthority: BibsAuthoritiesResource["retrieveAuthority"] = (...args) =>
		this.authorities.retrieveAuthority(...args);

	/**
	 * @see {@link BibsAuthoritiesResource.createAuthority}
	 */
	createAuthority: BibsAuthoritiesResource["createAuthority"] = (...args) =>
		this.authorities.createAuthority(...args);

	/**
	 * @see {@link BibsAuthoritiesResource.updateAuthority}
	 */
	updateAuthority: BibsAuthoritiesResource["updateAuthority"] = (...args) =>
		this.authorities.updateAuthority(...args);

	/**
	 * @see {@link BibsAuthoritiesResource.deleteAuthority}
	 */
	deleteAuthority: BibsAuthoritiesResource["deleteAuthority"] = (...args) =>
		this.authorities.deleteAuthority(...args);

	// ── Reminders ─────────────────────────────────────────────────────────────

	/**
	 * @see {@link BibsRemindersResource.retrieveBibRemindersList}
	 */
	retrieveBibRemindersList: BibsRemindersResource["retrieveBibRemindersList"] =
		(...args) => this.reminders.retrieveBibRemindersList(...args);

	/**
	 * @see {@link BibsRemindersResource.retrieveBibReminder}
	 */
	retrieveBibReminder: BibsRemindersResource["retrieveBibReminder"] = (
		...args
	) => this.reminders.retrieveBibReminder(...args);

	/**
	 * @see {@link BibsRemindersResource.createBibReminder}
	 */
	createBibReminder: BibsRemindersResource["createBibReminder"] = (...args) =>
		this.reminders.createBibReminder(...args);

	/**
	 * @see {@link BibsRemindersResource.updateBibReminder}
	 */
	updateBibReminder: BibsRemindersResource["updateBibReminder"] = (...args) =>
		this.reminders.updateBibReminder(...args);

	/**
	 * @see {@link BibsRemindersResource.deleteBibReminder}
	 */
	deleteBibReminder: BibsRemindersResource["deleteBibReminder"] = (...args) =>
		this.reminders.deleteBibReminder(...args);
}
