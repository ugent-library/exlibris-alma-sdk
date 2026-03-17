import type { AlmaHttpClient } from "@/client";

import { AuthoritiesResource } from "./authorities";
import { CatalogResource } from "./catalog";
import { CollectionsResource } from "./collections";
import { DigitalResource } from "./digital";
import { LoansResource } from "./loans";
import { RemindersResource } from "./reminders";
import { RequestsResource } from "./requests";

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
	readonly catalog: CatalogResource;
	/** Loans sub-resource: bib-level and item-level loans. */
	readonly loans: LoansResource;
	/** Requests sub-resource: bib-level and item-level requests. */
	readonly requests: RequestsResource;
	/** Collections sub-resource: collections and collection bibs. */
	readonly collections: CollectionsResource;
	/** Digital sub-resource: representations, files, e-collections. */
	readonly digital: DigitalResource;
	/** Authorities sub-resource: authority records. */
	readonly authorities: AuthoritiesResource;
	/** Reminders sub-resource: bib-level reminders. */
	readonly reminders: RemindersResource;

	constructor(client: AlmaHttpClient) {
		this.catalog = new CatalogResource(client);
		this.loans = new LoansResource(client);
		this.requests = new RequestsResource(client);
		this.collections = new CollectionsResource(client);
		this.digital = new DigitalResource(client);
		this.authorities = new AuthoritiesResource(client);
		this.reminders = new RemindersResource(client);
	}

	// ── Catalog ───────────────────────────────────────────────────────────────

	/**
	 * @see {@link CatalogResource.retrieveBibs}
	 */
	retrieveBibs: CatalogResource["retrieveBibs"] = (...args) =>
		this.catalog.retrieveBibs(...args);

	/**
	 * @see {@link CatalogResource.retrieveBib}
	 */
	retrieveBib: CatalogResource["retrieveBib"] = (...args) =>
		this.catalog.retrieveBib(...args);

	/**
	 * @see {@link CatalogResource.createBib}
	 */
	createBib: CatalogResource["createBib"] = (...args) =>
		this.catalog.createBib(...args);

	/**
	 * @see {@link CatalogResource.updateBib}
	 */
	updateBib: CatalogResource["updateBib"] = (...args) =>
		this.catalog.updateBib(...args);

	/**
	 * @see {@link CatalogResource.operateBib}
	 */
	operateBib: CatalogResource["operateBib"] = (...args) =>
		this.catalog.operateBib(...args);

	/**
	 * @see {@link CatalogResource.deleteBib}
	 */
	deleteBib: CatalogResource["deleteBib"] = (...args) =>
		this.catalog.deleteBib(...args);

	/**
	 * @see {@link CatalogResource.retrieveHoldingsList}
	 */
	retrieveHoldingsList: CatalogResource["retrieveHoldingsList"] = (...args) =>
		this.catalog.retrieveHoldingsList(...args);

	/**
	 * @see {@link CatalogResource.retrieveHolding}
	 */
	retrieveHolding: CatalogResource["retrieveHolding"] = (...args) =>
		this.catalog.retrieveHolding(...args);

	/**
	 * @see {@link CatalogResource.createHolding}
	 */
	createHolding: CatalogResource["createHolding"] = (...args) =>
		this.catalog.createHolding(...args);

	/**
	 * @see {@link CatalogResource.updateHolding}
	 */
	updateHolding: CatalogResource["updateHolding"] = (...args) =>
		this.catalog.updateHolding(...args);

	/**
	 * @see {@link CatalogResource.deleteHolding}
	 */
	deleteHolding: CatalogResource["deleteHolding"] = (...args) =>
		this.catalog.deleteHolding(...args);

	/**
	 * @see {@link CatalogResource.retrieveItemsList}
	 */
	retrieveItemsList: CatalogResource["retrieveItemsList"] = (...args) =>
		this.catalog.retrieveItemsList(...args);

	/**
	 * @see {@link CatalogResource.retrieveItem}
	 */
	retrieveItem: CatalogResource["retrieveItem"] = (...args) =>
		this.catalog.retrieveItem(...args);

	/**
	 * @see {@link CatalogResource.createItem}
	 */
	createItem: CatalogResource["createItem"] = (...args) =>
		this.catalog.createItem(...args);

	/**
	 * @see {@link CatalogResource.updateItem}
	 */
	updateItem: CatalogResource["updateItem"] = (...args) =>
		this.catalog.updateItem(...args);

	/**
	 * @see {@link CatalogResource.operateItem}
	 */
	operateItem: CatalogResource["operateItem"] = (...args) =>
		this.catalog.operateItem(...args);

	/**
	 * @see {@link CatalogResource.deleteItem}
	 */
	deleteItem: CatalogResource["deleteItem"] = (...args) =>
		this.catalog.deleteItem(...args);

	/**
	 * @see {@link CatalogResource.retrievePortfoliosList}
	 */
	retrievePortfoliosList: CatalogResource["retrievePortfoliosList"] = (
		...args
	) => this.catalog.retrievePortfoliosList(...args);

	/**
	 * @see {@link CatalogResource.retrievePortfolio}
	 */
	retrievePortfolio: CatalogResource["retrievePortfolio"] = (...args) =>
		this.catalog.retrievePortfolio(...args);

	/**
	 * @see {@link CatalogResource.createPortfolio}
	 */
	createPortfolio: CatalogResource["createPortfolio"] = (...args) =>
		this.catalog.createPortfolio(...args);

	/**
	 * @see {@link CatalogResource.updatePortfolio}
	 */
	updatePortfolio: CatalogResource["updatePortfolio"] = (...args) =>
		this.catalog.updatePortfolio(...args);

	/**
	 * @see {@link CatalogResource.deletePortfolio}
	 */
	deletePortfolio: CatalogResource["deletePortfolio"] = (...args) =>
		this.catalog.deletePortfolio(...args);

	/**
	 * @see {@link CatalogResource.retrieveBookingAvailability}
	 */
	retrieveBookingAvailability: CatalogResource["retrieveBookingAvailability"] =
		(...args) => this.catalog.retrieveBookingAvailability(...args);

	// ── Loans ─────────────────────────────────────────────────────────────────

	/**
	 * @see {@link LoansResource.retrieveBibLoansList}
	 */
	retrieveBibLoansList: LoansResource["retrieveBibLoansList"] = (...args) =>
		this.loans.retrieveBibLoansList(...args);

	/**
	 * @see {@link LoansResource.retrieveBibLoan}
	 */
	retrieveBibLoan: LoansResource["retrieveBibLoan"] = (...args) =>
		this.loans.retrieveBibLoan(...args);

	/**
	 * @see {@link LoansResource.retrieveItemLoansList}
	 */
	retrieveItemLoansList: LoansResource["retrieveItemLoansList"] = (...args) =>
		this.loans.retrieveItemLoansList(...args);

	/**
	 * @see {@link LoansResource.retrieveItemLoan}
	 */
	retrieveItemLoan: LoansResource["retrieveItemLoan"] = (...args) =>
		this.loans.retrieveItemLoan(...args);

	/**
	 * @see {@link LoansResource.createItemLoan}
	 */
	createItemLoan: LoansResource["createItemLoan"] = (...args) =>
		this.loans.createItemLoan(...args);

	/**
	 * @see {@link LoansResource.updateItemLoan}
	 */
	updateItemLoan: LoansResource["updateItemLoan"] = (...args) =>
		this.loans.updateItemLoan(...args);

	/**
	 * @see {@link LoansResource.operateItemLoan}
	 */
	operateItemLoan: LoansResource["operateItemLoan"] = (...args) =>
		this.loans.operateItemLoan(...args);

	// ── Requests ──────────────────────────────────────────────────────────────

	/**
	 * @see {@link RequestsResource.retrieveBibRequestsList}
	 */
	retrieveBibRequestsList: RequestsResource["retrieveBibRequestsList"] = (
		...args
	) => this.requests.retrieveBibRequestsList(...args);

	/**
	 * @see {@link RequestsResource.retrieveBibRequest}
	 */
	retrieveBibRequest: RequestsResource["retrieveBibRequest"] = (...args) =>
		this.requests.retrieveBibRequest(...args);

	/**
	 * @see {@link RequestsResource.createBibRequest}
	 */
	createBibRequest: RequestsResource["createBibRequest"] = (...args) =>
		this.requests.createBibRequest(...args);

	/**
	 * @see {@link RequestsResource.updateBibRequest}
	 */
	updateBibRequest: RequestsResource["updateBibRequest"] = (...args) =>
		this.requests.updateBibRequest(...args);

	/**
	 * @see {@link RequestsResource.operateBibRequest}
	 */
	operateBibRequest: RequestsResource["operateBibRequest"] = (...args) =>
		this.requests.operateBibRequest(...args);

	/**
	 * @see {@link RequestsResource.deleteBibRequest}
	 */
	deleteBibRequest: RequestsResource["deleteBibRequest"] = (...args) =>
		this.requests.deleteBibRequest(...args);

	/**
	 * @see {@link RequestsResource.retrieveBibRequestOptions}
	 */
	retrieveBibRequestOptions: RequestsResource["retrieveBibRequestOptions"] = (
		...args
	) => this.requests.retrieveBibRequestOptions(...args);

	/**
	 * @see {@link RequestsResource.retrieveItemRequestsList}
	 */
	retrieveItemRequestsList: RequestsResource["retrieveItemRequestsList"] = (
		...args
	) => this.requests.retrieveItemRequestsList(...args);

	/**
	 * @see {@link RequestsResource.retrieveItemRequest}
	 */
	retrieveItemRequest: RequestsResource["retrieveItemRequest"] = (...args) =>
		this.requests.retrieveItemRequest(...args);

	/**
	 * @see {@link RequestsResource.createItemRequest}
	 */
	createItemRequest: RequestsResource["createItemRequest"] = (...args) =>
		this.requests.createItemRequest(...args);

	/**
	 * @see {@link RequestsResource.updateItemRequest}
	 */
	updateItemRequest: RequestsResource["updateItemRequest"] = (...args) =>
		this.requests.updateItemRequest(...args);

	/**
	 * @see {@link RequestsResource.operateItemRequest}
	 */
	operateItemRequest: RequestsResource["operateItemRequest"] = (...args) =>
		this.requests.operateItemRequest(...args);

	/**
	 * @see {@link RequestsResource.deleteItemRequest}
	 */
	deleteItemRequest: RequestsResource["deleteItemRequest"] = (...args) =>
		this.requests.deleteItemRequest(...args);

	/**
	 * @see {@link RequestsResource.retrieveItemRequestOptions}
	 */
	retrieveItemRequestOptions: RequestsResource["retrieveItemRequestOptions"] = (
		...args
	) => this.requests.retrieveItemRequestOptions(...args);

	/**
	 * @see {@link RequestsResource.retrieveItemBookingAvailability}
	 */
	retrieveItemBookingAvailability: RequestsResource["retrieveItemBookingAvailability"] =
		(...args) => this.requests.retrieveItemBookingAvailability(...args);

	// ── Collections ───────────────────────────────────────────────────────────

	/**
	 * @see {@link CollectionsResource.retrieveCollections}
	 */
	retrieveCollections: CollectionsResource["retrieveCollections"] = (...args) =>
		this.collections.retrieveCollections(...args);

	/**
	 * @see {@link CollectionsResource.retrieveCollection}
	 */
	retrieveCollection: CollectionsResource["retrieveCollection"] = (...args) =>
		this.collections.retrieveCollection(...args);

	/**
	 * @see {@link CollectionsResource.createCollection}
	 */
	createCollection: CollectionsResource["createCollection"] = (...args) =>
		this.collections.createCollection(...args);

	/**
	 * @see {@link CollectionsResource.updateCollection}
	 */
	updateCollection: CollectionsResource["updateCollection"] = (...args) =>
		this.collections.updateCollection(...args);

	/**
	 * @see {@link CollectionsResource.deleteCollection}
	 */
	deleteCollection: CollectionsResource["deleteCollection"] = (...args) =>
		this.collections.deleteCollection(...args);

	/**
	 * @see {@link CollectionsResource.retrieveCollectionBibsList}
	 */
	retrieveCollectionBibsList: CollectionsResource["retrieveCollectionBibsList"] =
		(...args) => this.collections.retrieveCollectionBibsList(...args);

	/** @see {@link CollectionsResource.addBibToCollection} */
	addBibToCollection: CollectionsResource["addBibToCollection"] = (...args) =>
		this.collections.addBibToCollection(...args);

	/**
	 * @see {@link CollectionsResource.removeBibFromCollection}
	 */
	removeBibFromCollection: CollectionsResource["removeBibFromCollection"] = (
		...args
	) => this.collections.removeBibFromCollection(...args);

	// ── Digital ───────────────────────────────────────────────────────────────

	/**
	 * @see {@link DigitalResource.retrieveRepresentationsList}
	 */
	retrieveRepresentationsList: DigitalResource["retrieveRepresentationsList"] =
		(...args) => this.digital.retrieveRepresentationsList(...args);

	/**
	 * @see {@link DigitalResource.retrieveRepresentation}
	 */
	retrieveRepresentation: DigitalResource["retrieveRepresentation"] = (
		...args
	) => this.digital.retrieveRepresentation(...args);

	/**
	 * @see {@link DigitalResource.createRepresentation}
	 */
	createRepresentation: DigitalResource["createRepresentation"] = (...args) =>
		this.digital.createRepresentation(...args);

	/**
	 * @see {@link DigitalResource.updateRepresentation}
	 */
	updateRepresentation: DigitalResource["updateRepresentation"] = (...args) =>
		this.digital.updateRepresentation(...args);

	/**
	 * @see {@link DigitalResource.deleteRepresentation}
	 */
	deleteRepresentation: DigitalResource["deleteRepresentation"] = (...args) =>
		this.digital.deleteRepresentation(...args);

	/**
	 * @see {@link DigitalResource.retrieveRepresentationFilesList}
	 */
	retrieveRepresentationFilesList: DigitalResource["retrieveRepresentationFilesList"] =
		(...args) => this.digital.retrieveRepresentationFilesList(...args);

	/**
	 * @see {@link DigitalResource.retrieveRepresentationFile}
	 */
	retrieveRepresentationFile: DigitalResource["retrieveRepresentationFile"] = (
		...args
	) => this.digital.retrieveRepresentationFile(...args);

	/**
	 * @see {@link DigitalResource.createRepresentationFile}
	 */
	createRepresentationFile: DigitalResource["createRepresentationFile"] = (
		...args
	) => this.digital.createRepresentationFile(...args);

	/**
	 * @see {@link DigitalResource.updateRepresentationFile}
	 */
	updateRepresentationFile: DigitalResource["updateRepresentationFile"] = (
		...args
	) => this.digital.updateRepresentationFile(...args);

	/**
	 * @see {@link DigitalResource.deleteRepresentationFile}
	 */
	deleteRepresentationFile: DigitalResource["deleteRepresentationFile"] = (
		...args
	) => this.digital.deleteRepresentationFile(...args);

	/**
	 * @see {@link DigitalResource.retrieveECollectionsList}
	 */
	retrieveECollectionsList: DigitalResource["retrieveECollectionsList"] = (
		...args
	) => this.digital.retrieveECollectionsList(...args);

	/**
	 * @see {@link DigitalResource.retrieveECollection}
	 */
	retrieveECollection: DigitalResource["retrieveECollection"] = (...args) =>
		this.digital.retrieveECollection(...args);

	// ── Authorities ───────────────────────────────────────────────────────────

	/**
	 * @see {@link AuthoritiesResource.retrieveAuthorities}
	 */
	retrieveAuthorities: AuthoritiesResource["retrieveAuthorities"] = (...args) =>
		this.authorities.retrieveAuthorities(...args);

	/**
	 * @see {@link AuthoritiesResource.retrieveAuthority}
	 */
	retrieveAuthority: AuthoritiesResource["retrieveAuthority"] = (...args) =>
		this.authorities.retrieveAuthority(...args);

	/**
	 * @see {@link AuthoritiesResource.createAuthority}
	 */
	createAuthority: AuthoritiesResource["createAuthority"] = (...args) =>
		this.authorities.createAuthority(...args);

	/**
	 * @see {@link AuthoritiesResource.updateAuthority}
	 */
	updateAuthority: AuthoritiesResource["updateAuthority"] = (...args) =>
		this.authorities.updateAuthority(...args);

	/**
	 * @see {@link AuthoritiesResource.deleteAuthority}
	 */
	deleteAuthority: AuthoritiesResource["deleteAuthority"] = (...args) =>
		this.authorities.deleteAuthority(...args);

	// ── Reminders ─────────────────────────────────────────────────────────────

	/**
	 * @see {@link RemindersResource.retrieveBibRemindersList}
	 */
	retrieveBibRemindersList: RemindersResource["retrieveBibRemindersList"] = (
		...args
	) => this.reminders.retrieveBibRemindersList(...args);

	/**
	 * @see {@link RemindersResource.retrieveBibReminder}
	 */
	retrieveBibReminder: RemindersResource["retrieveBibReminder"] = (...args) =>
		this.reminders.retrieveBibReminder(...args);

	/**
	 * @see {@link RemindersResource.createBibReminder}
	 */
	createBibReminder: RemindersResource["createBibReminder"] = (...args) =>
		this.reminders.createBibReminder(...args);

	/**
	 * @see {@link RemindersResource.updateBibReminder}
	 */
	updateBibReminder: RemindersResource["updateBibReminder"] = (...args) =>
		this.reminders.updateBibReminder(...args);

	/**
	 * @see {@link RemindersResource.deleteBibReminder}
	 */
	deleteBibReminder: RemindersResource["deleteBibReminder"] = (...args) =>
		this.reminders.deleteBibReminder(...args);
}
