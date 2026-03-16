import type { AlmaHttpClient } from "@/client";

import { AcqFundsResource } from "./funds";
import { AcqInvoicesResource } from "./invoices";
import { AcqLicensesResource } from "./licenses";
import { AcqMiscResource } from "./misc";
import { AcqPoLinesResource } from "./po-lines";
import { AcqVendorsResource } from "./vendors";

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
 * - `misc` - currencies, fiscal periods, purchase requests, test endpoint
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
	readonly funds: AcqFundsResource;
	/** Invoices sub-resource: invoices, lines, attachments. */
	readonly invoices: AcqInvoicesResource;
	/** Licenses sub-resource: licenses, amendments, attachments. */
	readonly licenses: AcqLicensesResource;
	/** PO Lines sub-resource: PO lines and PO line items. */
	readonly poLines: AcqPoLinesResource;
	/** Vendors sub-resource: vendors, vendor invoices, vendor PO lines. */
	readonly vendors: AcqVendorsResource;
	/** Misc sub-resource: currencies, fiscal periods, purchase requests. */
	readonly misc: AcqMiscResource;

	constructor(client: AlmaHttpClient) {
		this.funds = new AcqFundsResource(client);
		this.invoices = new AcqInvoicesResource(client);
		this.licenses = new AcqLicensesResource(client);
		this.poLines = new AcqPoLinesResource(client);
		this.vendors = new AcqVendorsResource(client);
		this.misc = new AcqMiscResource(client);
	}

	// ── Funds ─────────────────────────────────────────────────────────────────

	/**
	 * @see {@link AcqFundsResource.retrieveFundsList}
	 */
	retrieveFundsList: AcqFundsResource["retrieveFundsList"] = (...args) =>
		this.funds.retrieveFundsList(...args);

	/**
	 * @see {@link AcqFundsResource.retrieveFund}
	 */
	retrieveFund: AcqFundsResource["retrieveFund"] = (...args) =>
		this.funds.retrieveFund(...args);

	/**
	 * @see {@link AcqFundsResource.createFund}
	 */
	createFund: AcqFundsResource["createFund"] = (...args) =>
		this.funds.createFund(...args);

	/**
	 * @see {@link AcqFundsResource.updateFund}
	 */
	updateFund: AcqFundsResource["updateFund"] = (...args) =>
		this.funds.updateFund(...args);

	/**
	 * @see {@link AcqFundsResource.operateFund}
	 */
	operateFund: AcqFundsResource["operateFund"] = (...args) =>
		this.funds.operateFund(...args);

	/**
	 * @see {@link AcqFundsResource.deleteFund}
	 */
	deleteFund: AcqFundsResource["deleteFund"] = (...args) =>
		this.funds.deleteFund(...args);

	/**
	 * @see {@link AcqFundsResource.retrieveFundTransactionsList}
	 */
	retrieveFundTransactionsList: AcqFundsResource["retrieveFundTransactionsList"] =
		(...args) => this.funds.retrieveFundTransactionsList(...args);

	/**
	 * @see {@link AcqFundsResource.createFundTransaction}
	 */
	createFundTransaction: AcqFundsResource["createFundTransaction"] = (
		...args
	) => this.funds.createFundTransaction(...args);

	// ── Invoices ──────────────────────────────────────────────────────────────

	/**
	 * @see {@link AcqInvoicesResource.getInvoices}
	 */
	getInvoices: AcqInvoicesResource["getInvoices"] = (...args) =>
		this.invoices.getInvoices(...args);

	/**
	 * @see {@link AcqInvoicesResource.retrieveInvoice}
	 */
	retrieveInvoice: AcqInvoicesResource["retrieveInvoice"] = (...args) =>
		this.invoices.retrieveInvoice(...args);

	/**
	 * @see {@link AcqInvoicesResource.createInvoice}
	 */
	createInvoice: AcqInvoicesResource["createInvoice"] = (...args) =>
		this.invoices.createInvoice(...args);

	/**
	 * @see {@link AcqInvoicesResource.updateInvoice}
	 */
	updateInvoice: AcqInvoicesResource["updateInvoice"] = (...args) =>
		this.invoices.updateInvoice(...args);

	/**
	 * @see {@link AcqInvoicesResource.operateInvoice}
	 */
	operateInvoice: AcqInvoicesResource["operateInvoice"] = (...args) =>
		this.invoices.operateInvoice(...args);

	/**
	 * @see {@link AcqInvoicesResource.retrieveInvoiceAttachmentsList}
	 */
	retrieveInvoiceAttachmentsList: AcqInvoicesResource["retrieveInvoiceAttachmentsList"] =
		(...args) => this.invoices.retrieveInvoiceAttachmentsList(...args);

	/**
	 * @see {@link AcqInvoicesResource.retrieveInvoiceAttachment}
	 */
	retrieveInvoiceAttachment: AcqInvoicesResource["retrieveInvoiceAttachment"] =
		(...args) => this.invoices.retrieveInvoiceAttachment(...args);

	/**
	 * @see {@link AcqInvoicesResource.createInvoiceAttachment}
	 */
	createInvoiceAttachment: AcqInvoicesResource["createInvoiceAttachment"] = (
		...args
	) => this.invoices.createInvoiceAttachment(...args);

	/**
	 * @see {@link AcqInvoicesResource.retrieveInvoiceLinesList}
	 */
	retrieveInvoiceLinesList: AcqInvoicesResource["retrieveInvoiceLinesList"] = (
		...args
	) => this.invoices.retrieveInvoiceLinesList(...args);

	/**
	 * @see {@link AcqInvoicesResource.retrieveInvoiceLine}
	 */
	retrieveInvoiceLine: AcqInvoicesResource["retrieveInvoiceLine"] = (...args) =>
		this.invoices.retrieveInvoiceLine(...args);

	/**
	 * @see {@link AcqInvoicesResource.createInvoiceLine}
	 */
	createInvoiceLine: AcqInvoicesResource["createInvoiceLine"] = (...args) =>
		this.invoices.createInvoiceLine(...args);

	/**
	 * @see {@link AcqInvoicesResource.updateInvoiceLine}
	 */
	updateInvoiceLine: AcqInvoicesResource["updateInvoiceLine"] = (...args) =>
		this.invoices.updateInvoiceLine(...args);

	// ── Licenses ──────────────────────────────────────────────────────────────

	/**
	 * @see {@link AcqLicensesResource.retrieveLicensesList}
	 */
	retrieveLicensesList: AcqLicensesResource["retrieveLicensesList"] = (
		...args
	) => this.licenses.retrieveLicensesList(...args);

	/**
	 * @see {@link AcqLicensesResource.retrieveLicense}
	 */
	retrieveLicense: AcqLicensesResource["retrieveLicense"] = (...args) =>
		this.licenses.retrieveLicense(...args);

	/**
	 * @see {@link AcqLicensesResource.createLicense}
	 */
	createLicense: AcqLicensesResource["createLicense"] = (...args) =>
		this.licenses.createLicense(...args);

	/**
	 * @see {@link AcqLicensesResource.updateLicense}
	 */
	updateLicense: AcqLicensesResource["updateLicense"] = (...args) =>
		this.licenses.updateLicense(...args);

	/**
	 * @see {@link AcqLicensesResource.deleteLicense}
	 */
	deleteLicense: AcqLicensesResource["deleteLicense"] = (...args) =>
		this.licenses.deleteLicense(...args);

	/**
	 * @see {@link AcqLicensesResource.retrieveLicenseAmendmentsList}
	 */
	retrieveLicenseAmendmentsList: AcqLicensesResource["retrieveLicenseAmendmentsList"] =
		(...args) => this.licenses.retrieveLicenseAmendmentsList(...args);

	/**
	 * @see {@link AcqLicensesResource.retrieveLicenseAmendment}
	 */
	retrieveLicenseAmendment: AcqLicensesResource["retrieveLicenseAmendment"] = (
		...args
	) => this.licenses.retrieveLicenseAmendment(...args);

	/**
	 * @see {@link AcqLicensesResource.createLicenseAmendment}
	 */
	createLicenseAmendment: AcqLicensesResource["createLicenseAmendment"] = (
		...args
	) => this.licenses.createLicenseAmendment(...args);

	/**
	 * @see {@link AcqLicensesResource.updateLicenseAmendment}
	 */
	updateLicenseAmendment: AcqLicensesResource["updateLicenseAmendment"] = (
		...args
	) => this.licenses.updateLicenseAmendment(...args);

	/**
	 * @see {@link AcqLicensesResource.deleteLicenseAmendment}
	 */
	deleteLicenseAmendment: AcqLicensesResource["deleteLicenseAmendment"] = (
		...args
	) => this.licenses.deleteLicenseAmendment(...args);

	/**
	 * @see {@link AcqLicensesResource.retrieveLicenseAttachmentsList}
	 */
	retrieveLicenseAttachmentsList: AcqLicensesResource["retrieveLicenseAttachmentsList"] =
		(...args) => this.licenses.retrieveLicenseAttachmentsList(...args);

	/**
	 * @see {@link AcqLicensesResource.retrieveLicenseAttachment}
	 */
	retrieveLicenseAttachment: AcqLicensesResource["retrieveLicenseAttachment"] =
		(...args) => this.licenses.retrieveLicenseAttachment(...args);

	/**
	 * @see {@link AcqLicensesResource.createLicenseAttachment}
	 */
	createLicenseAttachment: AcqLicensesResource["createLicenseAttachment"] = (
		...args
	) => this.licenses.createLicenseAttachment(...args);

	/**
	 * @see {@link AcqLicensesResource.updateLicenseAttachment}
	 */
	updateLicenseAttachment: AcqLicensesResource["updateLicenseAttachment"] = (
		...args
	) => this.licenses.updateLicenseAttachment(...args);

	/**
	 * @see {@link AcqLicensesResource.deleteLicenseAttachment}
	 */
	deleteLicenseAttachment: AcqLicensesResource["deleteLicenseAttachment"] = (
		...args
	) => this.licenses.deleteLicenseAttachment(...args);

	// ── PO Lines ──────────────────────────────────────────────────────────────

	/**
	 * @see {@link AcqPoLinesResource.retrievePoLinesList}
	 */
	retrievePoLinesList: AcqPoLinesResource["retrievePoLinesList"] = (...args) =>
		this.poLines.retrievePoLinesList(...args);

	/**
	 * @see {@link AcqPoLinesResource.retrievePoLine}
	 */
	retrievePoLine: AcqPoLinesResource["retrievePoLine"] = (...args) =>
		this.poLines.retrievePoLine(...args);

	/**
	 * @see {@link AcqPoLinesResource.createPoLine}
	 */
	createPoLine: AcqPoLinesResource["createPoLine"] = (...args) =>
		this.poLines.createPoLine(...args);

	/**
	 * @see {@link AcqPoLinesResource.updatePoLine}
	 */
	updatePoLine: AcqPoLinesResource["updatePoLine"] = (...args) =>
		this.poLines.updatePoLine(...args);

	/**
	 * @see {@link AcqPoLinesResource.deletePoLine}
	 */
	deletePoLine: AcqPoLinesResource["deletePoLine"] = (...args) =>
		this.poLines.deletePoLine(...args);

	/**
	 * @see {@link AcqPoLinesResource.retrievePoLineItemsList}
	 */
	retrievePoLineItemsList: AcqPoLinesResource["retrievePoLineItemsList"] = (
		...args
	) => this.poLines.retrievePoLineItemsList(...args);

	/**
	 * @see {@link AcqPoLinesResource.createPoLineItem}
	 */
	createPoLineItem: AcqPoLinesResource["createPoLineItem"] = (...args) =>
		this.poLines.createPoLineItem(...args);

	/**
	 * @see {@link AcqPoLinesResource.operatePoLineItem}
	 */
	operatePoLineItem: AcqPoLinesResource["operatePoLineItem"] = (...args) =>
		this.poLines.operatePoLineItem(...args);

	// ── Vendors ───────────────────────────────────────────────────────────────

	/**
	 * @see {@link AcqVendorsResource.retrieveVendorsList}
	 */
	retrieveVendorsList: AcqVendorsResource["retrieveVendorsList"] = (...args) =>
		this.vendors.retrieveVendorsList(...args);

	/**
	 * @see {@link AcqVendorsResource.retrieveVendor}
	 */
	retrieveVendor: AcqVendorsResource["retrieveVendor"] = (...args) =>
		this.vendors.retrieveVendor(...args);

	/**
	 * @see {@link AcqVendorsResource.createVendor}
	 */
	createVendor: AcqVendorsResource["createVendor"] = (...args) =>
		this.vendors.createVendor(...args);

	/**
	 * @see {@link AcqVendorsResource.updateVendor}
	 */
	updateVendor: AcqVendorsResource["updateVendor"] = (...args) =>
		this.vendors.updateVendor(...args);

	/**
	 * @see {@link AcqVendorsResource.deleteVendor}
	 */
	deleteVendor: AcqVendorsResource["deleteVendor"] = (...args) =>
		this.vendors.deleteVendor(...args);

	/**
	 * @see {@link AcqVendorsResource.retrieveVendorInvoicesList}
	 */
	retrieveVendorInvoicesList: AcqVendorsResource["retrieveVendorInvoicesList"] =
		(...args) => this.vendors.retrieveVendorInvoicesList(...args);

	/**
	 * @see {@link AcqVendorsResource.retrieveVendorPoLinesList}
	 */
	retrieveVendorPoLinesList: AcqVendorsResource["retrieveVendorPoLinesList"] = (
		...args
	) => this.vendors.retrieveVendorPoLinesList(...args);

	// ── Misc ──────────────────────────────────────────────────────────────────

	/**
	 * @see {@link AcqMiscResource.retrieveCurrencies}
	 */
	retrieveCurrencies: AcqMiscResource["retrieveCurrencies"] = (...args) =>
		this.misc.retrieveCurrencies(...args);

	/**
	 * @see {@link AcqMiscResource.retrieveFiscalPeriods}
	 */
	retrieveFiscalPeriods: AcqMiscResource["retrieveFiscalPeriods"] = (...args) =>
		this.misc.retrieveFiscalPeriods(...args);

	/**
	 * @see {@link AcqMiscResource.retrievePurchaseRequestsList}
	 */
	retrievePurchaseRequestsList: AcqMiscResource["retrievePurchaseRequestsList"] =
		(...args) => this.misc.retrievePurchaseRequestsList(...args);

	/**
	 * @see {@link AcqMiscResource.retrievePurchaseRequest}
	 */
	retrievePurchaseRequest: AcqMiscResource["retrievePurchaseRequest"] = (
		...args
	) => this.misc.retrievePurchaseRequest(...args);

	/**
	 * @see {@link AcqMiscResource.operatePurchaseRequest}
	 */
	operatePurchaseRequest: AcqMiscResource["operatePurchaseRequest"] = (
		...args
	) => this.misc.operatePurchaseRequest(...args);

	/**
	 * @see {@link AcqMiscResource.updatePurchaseRequest}
	 */
	updatePurchaseRequest: AcqMiscResource["updatePurchaseRequest"] = (...args) =>
		this.misc.updatePurchaseRequest(...args);

	/**
	 * @see {@link AcqMiscResource.deletePurchaseRequest}
	 */
	deletePurchaseRequest: AcqMiscResource["deletePurchaseRequest"] = (...args) =>
		this.misc.deletePurchaseRequest(...args);

	/**
	 * @see {@link AcqMiscResource.test}
	 */
	test: AcqMiscResource["test"] = (...args) => this.misc.test(...args);
}
