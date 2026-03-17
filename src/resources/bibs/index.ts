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
}
