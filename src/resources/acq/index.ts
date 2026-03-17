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

	// ── Funds ─────────────────────────────────────────────────────────────────

	/**
	 * @see {@link FundsResource.retrieveFundsList}
	 */
	retrieveFundsList: FundsResource["retrieveFundsList"] = (...args) =>
		this.funds.retrieveFundsList(...args);

	/**
	 * @see {@link FundsResource.retrieveFund}
	 */
	retrieveFund: FundsResource["retrieveFund"] = (...args) =>
		this.funds.retrieveFund(...args);

	/**
	 * @see {@link FundsResource.createFund}
	 */
	createFund: FundsResource["createFund"] = (...args) =>
		this.funds.createFund(...args);

	/**
	 * @see {@link FundsResource.updateFund}
	 */
	updateFund: FundsResource["updateFund"] = (...args) =>
		this.funds.updateFund(...args);

	/**
	 * @see {@link FundsResource.operateFund}
	 */
	operateFund: FundsResource["operateFund"] = (...args) =>
		this.funds.operateFund(...args);

	/**
	 * @see {@link FundsResource.deleteFund}
	 */
	deleteFund: FundsResource["deleteFund"] = (...args) =>
		this.funds.deleteFund(...args);

	/**
	 * @see {@link FundsResource.retrieveFundTransactionsList}
	 */
	retrieveFundTransactionsList: FundsResource["retrieveFundTransactionsList"] =
		(...args) => this.funds.retrieveFundTransactionsList(...args);

	/**
	 * @see {@link FundsResource.createFundTransaction}
	 */
	createFundTransaction: FundsResource["createFundTransaction"] = (...args) =>
		this.funds.createFundTransaction(...args);

	// ── Invoices ──────────────────────────────────────────────────────────────

	/**
	 * @see {@link InvoicesResource.getInvoices}
	 */
	getInvoices: InvoicesResource["getInvoices"] = (...args) =>
		this.invoices.getInvoices(...args);

	/**
	 * @see {@link InvoicesResource.retrieveInvoice}
	 */
	retrieveInvoice: InvoicesResource["retrieveInvoice"] = (...args) =>
		this.invoices.retrieveInvoice(...args);

	/**
	 * @see {@link InvoicesResource.createInvoice}
	 */
	createInvoice: InvoicesResource["createInvoice"] = (...args) =>
		this.invoices.createInvoice(...args);

	/**
	 * @see {@link InvoicesResource.updateInvoice}
	 */
	updateInvoice: InvoicesResource["updateInvoice"] = (...args) =>
		this.invoices.updateInvoice(...args);

	/**
	 * @see {@link InvoicesResource.operateInvoice}
	 */
	operateInvoice: InvoicesResource["operateInvoice"] = (...args) =>
		this.invoices.operateInvoice(...args);

	/**
	 * @see {@link InvoicesResource.retrieveInvoiceAttachmentsList}
	 */
	retrieveInvoiceAttachmentsList: InvoicesResource["retrieveInvoiceAttachmentsList"] =
		(...args) => this.invoices.retrieveInvoiceAttachmentsList(...args);

	/**
	 * @see {@link InvoicesResource.retrieveInvoiceAttachment}
	 */
	retrieveInvoiceAttachment: InvoicesResource["retrieveInvoiceAttachment"] = (
		...args
	) => this.invoices.retrieveInvoiceAttachment(...args);

	/**
	 * @see {@link InvoicesResource.createInvoiceAttachment}
	 */
	createInvoiceAttachment: InvoicesResource["createInvoiceAttachment"] = (
		...args
	) => this.invoices.createInvoiceAttachment(...args);

	/**
	 * @see {@link InvoicesResource.retrieveInvoiceLinesList}
	 */
	retrieveInvoiceLinesList: InvoicesResource["retrieveInvoiceLinesList"] = (
		...args
	) => this.invoices.retrieveInvoiceLinesList(...args);

	/**
	 * @see {@link InvoicesResource.retrieveInvoiceLine}
	 */
	retrieveInvoiceLine: InvoicesResource["retrieveInvoiceLine"] = (...args) =>
		this.invoices.retrieveInvoiceLine(...args);

	/**
	 * @see {@link InvoicesResource.createInvoiceLine}
	 */
	createInvoiceLine: InvoicesResource["createInvoiceLine"] = (...args) =>
		this.invoices.createInvoiceLine(...args);

	/**
	 * @see {@link InvoicesResource.updateInvoiceLine}
	 */
	updateInvoiceLine: InvoicesResource["updateInvoiceLine"] = (...args) =>
		this.invoices.updateInvoiceLine(...args);

	// ── Licenses ──────────────────────────────────────────────────────────────

	/**
	 * @see {@link LicensesResource.retrieveLicensesList}
	 */
	retrieveLicensesList: LicensesResource["retrieveLicensesList"] = (...args) =>
		this.licenses.retrieveLicensesList(...args);

	/**
	 * @see {@link LicensesResource.retrieveLicense}
	 */
	retrieveLicense: LicensesResource["retrieveLicense"] = (...args) =>
		this.licenses.retrieveLicense(...args);

	/**
	 * @see {@link LicensesResource.createLicense}
	 */
	createLicense: LicensesResource["createLicense"] = (...args) =>
		this.licenses.createLicense(...args);

	/**
	 * @see {@link LicensesResource.updateLicense}
	 */
	updateLicense: LicensesResource["updateLicense"] = (...args) =>
		this.licenses.updateLicense(...args);

	/**
	 * @see {@link LicensesResource.deleteLicense}
	 */
	deleteLicense: LicensesResource["deleteLicense"] = (...args) =>
		this.licenses.deleteLicense(...args);

	/**
	 * @see {@link LicensesResource.retrieveLicenseAmendmentsList}
	 */
	retrieveLicenseAmendmentsList: LicensesResource["retrieveLicenseAmendmentsList"] =
		(...args) => this.licenses.retrieveLicenseAmendmentsList(...args);

	/**
	 * @see {@link LicensesResource.retrieveLicenseAmendment}
	 */
	retrieveLicenseAmendment: LicensesResource["retrieveLicenseAmendment"] = (
		...args
	) => this.licenses.retrieveLicenseAmendment(...args);

	/**
	 * @see {@link LicensesResource.createLicenseAmendment}
	 */
	createLicenseAmendment: LicensesResource["createLicenseAmendment"] = (
		...args
	) => this.licenses.createLicenseAmendment(...args);

	/**
	 * @see {@link LicensesResource.updateLicenseAmendment}
	 */
	updateLicenseAmendment: LicensesResource["updateLicenseAmendment"] = (
		...args
	) => this.licenses.updateLicenseAmendment(...args);

	/**
	 * @see {@link LicensesResource.deleteLicenseAmendment}
	 */
	deleteLicenseAmendment: LicensesResource["deleteLicenseAmendment"] = (
		...args
	) => this.licenses.deleteLicenseAmendment(...args);

	/**
	 * @see {@link LicensesResource.retrieveLicenseAttachmentsList}
	 */
	retrieveLicenseAttachmentsList: LicensesResource["retrieveLicenseAttachmentsList"] =
		(...args) => this.licenses.retrieveLicenseAttachmentsList(...args);

	/**
	 * @see {@link LicensesResource.retrieveLicenseAttachment}
	 */
	retrieveLicenseAttachment: LicensesResource["retrieveLicenseAttachment"] = (
		...args
	) => this.licenses.retrieveLicenseAttachment(...args);

	/**
	 * @see {@link LicensesResource.createLicenseAttachment}
	 */
	createLicenseAttachment: LicensesResource["createLicenseAttachment"] = (
		...args
	) => this.licenses.createLicenseAttachment(...args);

	/**
	 * @see {@link LicensesResource.updateLicenseAttachment}
	 */
	updateLicenseAttachment: LicensesResource["updateLicenseAttachment"] = (
		...args
	) => this.licenses.updateLicenseAttachment(...args);

	/**
	 * @see {@link LicensesResource.deleteLicenseAttachment}
	 */
	deleteLicenseAttachment: LicensesResource["deleteLicenseAttachment"] = (
		...args
	) => this.licenses.deleteLicenseAttachment(...args);

	// ── PO Lines ──────────────────────────────────────────────────────────────

	/**
	 * @see {@link PoLinesResource.retrievePoLinesList}
	 */
	retrievePoLinesList: PoLinesResource["retrievePoLinesList"] = (...args) =>
		this.poLines.retrievePoLinesList(...args);

	/**
	 * @see {@link PoLinesResource.retrievePoLine}
	 */
	retrievePoLine: PoLinesResource["retrievePoLine"] = (...args) =>
		this.poLines.retrievePoLine(...args);

	/**
	 * @see {@link PoLinesResource.createPoLine}
	 */
	createPoLine: PoLinesResource["createPoLine"] = (...args) =>
		this.poLines.createPoLine(...args);

	/**
	 * @see {@link PoLinesResource.updatePoLine}
	 */
	updatePoLine: PoLinesResource["updatePoLine"] = (...args) =>
		this.poLines.updatePoLine(...args);

	/**
	 * @see {@link PoLinesResource.deletePoLine}
	 */
	deletePoLine: PoLinesResource["deletePoLine"] = (...args) =>
		this.poLines.deletePoLine(...args);

	/**
	 * @see {@link PoLinesResource.retrievePoLineItemsList}
	 */
	retrievePoLineItemsList: PoLinesResource["retrievePoLineItemsList"] = (
		...args
	) => this.poLines.retrievePoLineItemsList(...args);

	/**
	 * @see {@link PoLinesResource.createPoLineItem}
	 */
	createPoLineItem: PoLinesResource["createPoLineItem"] = (...args) =>
		this.poLines.createPoLineItem(...args);

	/**
	 * @see {@link PoLinesResource.operatePoLineItem}
	 */
	operatePoLineItem: PoLinesResource["operatePoLineItem"] = (...args) =>
		this.poLines.operatePoLineItem(...args);

	// ── Vendors ───────────────────────────────────────────────────────────────

	/**
	 * @see {@link VendorsResource.retrieveVendorsList}
	 */
	retrieveVendorsList: VendorsResource["retrieveVendorsList"] = (...args) =>
		this.vendors.retrieveVendorsList(...args);

	/**
	 * @see {@link VendorsResource.retrieveVendor}
	 */
	retrieveVendor: VendorsResource["retrieveVendor"] = (...args) =>
		this.vendors.retrieveVendor(...args);

	/**
	 * @see {@link VendorsResource.createVendor}
	 */
	createVendor: VendorsResource["createVendor"] = (...args) =>
		this.vendors.createVendor(...args);

	/**
	 * @see {@link VendorsResource.updateVendor}
	 */
	updateVendor: VendorsResource["updateVendor"] = (...args) =>
		this.vendors.updateVendor(...args);

	/**
	 * @see {@link VendorsResource.deleteVendor}
	 */
	deleteVendor: VendorsResource["deleteVendor"] = (...args) =>
		this.vendors.deleteVendor(...args);

	/**
	 * @see {@link VendorsResource.retrieveVendorInvoicesList}
	 */
	retrieveVendorInvoicesList: VendorsResource["retrieveVendorInvoicesList"] = (
		...args
	) => this.vendors.retrieveVendorInvoicesList(...args);

	/**
	 * @see {@link VendorsResource.retrieveVendorPoLinesList}
	 */
	retrieveVendorPoLinesList: VendorsResource["retrieveVendorPoLinesList"] = (
		...args
	) => this.vendors.retrieveVendorPoLinesList(...args);

	// ── Purchase requests ─────────────────────────────────────────────────────

	/**
	 * @see {@link MiscResource.retrievePurchaseRequestsList}
	 */
	retrievePurchaseRequestsList: PurchaseRequestsResource["retrievePurchaseRequestsList"] =
		(...args) => this.purchaseRequests.retrievePurchaseRequestsList(...args);

	/**
	 * @see {@link PurchaseRequestsResource.retrievePurchaseRequest}
	 */
	retrievePurchaseRequest: PurchaseRequestsResource["retrievePurchaseRequest"] =
		(...args) => this.purchaseRequests.retrievePurchaseRequest(...args);

	/**
	 * @see {@link PurchaseRequestsResource.operatePurchaseRequest}
	 */
	operatePurchaseRequest: PurchaseRequestsResource["operatePurchaseRequest"] = (
		...args
	) => this.purchaseRequests.operatePurchaseRequest(...args);

	/**
	 * @see {@link PurchaseRequestsResource.updatePurchaseRequest}
	 */
	updatePurchaseRequest: PurchaseRequestsResource["updatePurchaseRequest"] = (
		...args
	) => this.purchaseRequests.updatePurchaseRequest(...args);

	/**
	 * @see {@link PurchaseRequestsResource.deletePurchaseRequest}
	 */
	deletePurchaseRequest: PurchaseRequestsResource["deletePurchaseRequest"] = (
		...args
	) => this.purchaseRequests.deletePurchaseRequest(...args);

	// ── Misc ──────────────────────────────────────────────────────────────────

	/**
	 * @see {@link MiscResource.retrieveCurrencies}
	 */
	retrieveCurrencies: MiscResource["retrieveCurrencies"] = (...args) =>
		this.misc.retrieveCurrencies(...args);

	/**
	 * @see {@link MiscResource.retrieveFiscalPeriods}
	 */
	retrieveFiscalPeriods: MiscResource["retrieveFiscalPeriods"] = (...args) =>
		this.misc.retrieveFiscalPeriods(...args);
}
