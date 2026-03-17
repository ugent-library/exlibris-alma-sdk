import type { AlmaHttpClient } from "@/client";

import { FundsResource } from "./funds";
import { InvoicesResource } from "./invoices";
import { LicensesResource } from "./licenses";
import { MiscResource } from "./misc";
import { PoLinesResource } from "./po-lines";
import { PurchaseRequestsResource } from "./purchase-requests";
import { VendorsResource } from "./vendors";

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
} from "./types";

/**
 * Resource client for the Alma Acquisitions API.
 *
 * Exposes sub-resources for all acquisitions entities:
 * - `funds` - funds and fund transactions
 * - `invoices` - invoices, invoice lines, invoice attachments
 * - `licenses` - licenses, amendments, attachments
 * - `poLines` - PO lines and PO line items
 * - `vendors` - vendors, vendor invoices, vendor PO lines
 * - `misc` - currencies, fiscal periods, purchase requests
 *
 * All methods can also be accessed directly on this resource object via
 * convenience delegations.
 *
 * @example
 * ```typescript
 * const client = new AlmaClient({ apiKey: 'xxx', region: 'eu' });
 *
 * // via sub-resource
 * await client.acq.funds.retrieveFundsList();
 * await client.acq.vendors.retrieveVendorsList();
 *
 * // via direct convenience methods
 * await client.acq.retrieveFundsList();
 * await client.acq.retrieveVendorsList();
 * ```
 */
export class AcqResource {
	/** Funds sub-resource: funds and fund transactions. */
	readonly funds: FundsResource;
	/** Invoices sub-resource: invoices, lines, attachments. */
	readonly invoices: InvoicesResource;
	/** Licenses sub-resource: licenses, amendments, attachments. */
	readonly licenses: LicensesResource;
	/** PO Lines sub-resource: PO lines and PO line items. */
	readonly poLines: PoLinesResource;
	/** Vendors sub-resource: vendors, vendor invoices, vendor PO lines. */
	readonly vendors: VendorsResource;
	/** Purchase requests sub-resource: purchase requests. */
	readonly purchaseRequests: PurchaseRequestsResource;
	/** Misc sub-resource: currencies, fiscal periods. */
	readonly misc: MiscResource;

	constructor(client: AlmaHttpClient) {
		this.funds = new FundsResource(client);
		this.invoices = new InvoicesResource(client);
		this.licenses = new LicensesResource(client);
		this.poLines = new PoLinesResource(client);
		this.vendors = new VendorsResource(client);
		this.purchaseRequests = new PurchaseRequestsResource(client);
		this.misc = new MiscResource(client);
	}
}
