import type { AlmaHttpClient } from "@/client";
import { path } from "@/util/uri";

import type {
	Invoice,
	InvoiceAttachment,
	InvoiceAttachments,
	InvoiceLine,
	InvoiceLines,
	Invoices,
} from "./types";

/**
 * Methods for managing invoices, invoice lines, and invoice attachments
 * in the Alma Acquisitions API.
 */
export class AcqInvoicesResource {
	constructor(private readonly client: AlmaHttpClient) {}

	/**
	 * Retrieves a list of invoices.
	 *
	 * @param params - Optional filters and pagination.
	 * @returns A list of invoices.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL2ludm9pY2VzLw==/
	 */
	async getInvoices(params?: {
		q?: string;
		limit?: number;
		offset?: number;
		view?: string;
		expand?: string;
		base_status?: string;
		invoice_workflow_status?: string;
		owner?: string;
		creation_form?: string;
	}): Promise<Invoices> {
		return this.client.get<Invoices>("/acq/invoices/", params);
	}

	/**
	 * Retrieves a single invoice.
	 *
	 * @param invoiceId - The invoice ID.
	 * @returns The invoice.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL2ludm9pY2VzL3tpbnZvaWNlX2lkfQ==/
	 */
	async retrieveInvoice(
		invoiceId: string,
		params?: { view?: string; expand?: string },
	): Promise<Invoice> {
		return this.client.get<Invoice>(path`/acq/invoices/${invoiceId}`, params);
	}

	/**
	 * Creates a new invoice.
	 *
	 * @param body - The invoice data.
	 * @returns The created invoice.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UE9TVCAvYWxtYXdzL3YxL2FjcS9pbnZvaWNlcw==/
	 */
	async createInvoice(body: Invoice): Promise<Invoice> {
		return this.client.post<Invoice>("/acq/invoices", body);
	}

	/**
	 * Updates an existing invoice.
	 *
	 * @param invoiceId - The invoice ID.
	 * @param body - The updated invoice data.
	 * @returns The updated invoice.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UFVUIC9hbG1hd3MvdjEvYWNxL2ludm9pY2VzL3tpbnZvaWNlX2lkfQ==/
	 */
	async updateInvoice(invoiceId: string, body: Invoice): Promise<Invoice> {
		return this.client.put<Invoice>(path`/acq/invoices/${invoiceId}`, body);
	}

	/**
	 * Performs an action on an invoice (e.g. process, paid).
	 *
	 * @param invoiceId - The invoice ID.
	 * @param body - The operation body.
	 * @param params - Optional parameters.
	 * @param params.op - The operation to perform.
	 * @returns The resulting invoice.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UE9TVCAvYWxtYXdzL3YxL2FjcS9pbnZvaWNlcy97aW52b2ljZV9pZH0=/
	 */
	async operateInvoice(
		invoiceId: string,
		body: Invoice,
		params?: { op?: string; create_rt_invoice?: boolean },
	): Promise<Invoice> {
		return this.client.post<Invoice>(
			path`/acq/invoices/${invoiceId}`,
			body,
			params,
		);
	}

	/**
	 * Retrieves all attachments for an invoice.
	 *
	 * @param invoiceId - The invoice ID.
	 * @returns A list of invoice attachments.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL2ludm9pY2VzL3tpbnZvaWNlX2lkfS9hdHRhY2htZW50cw==/
	 */
	async retrieveInvoiceAttachmentsList(
		invoiceId: string,
		params?: { limit?: number; offset?: number },
	): Promise<InvoiceAttachments> {
		return this.client.get<InvoiceAttachments>(
			path`/acq/invoices/${invoiceId}/attachments`,
			params,
		);
	}

	/**
	 * Retrieves a single invoice attachment.
	 *
	 * @param invoiceId - The invoice ID.
	 * @param attachmentId - The attachment ID.
	 * @returns The attachment.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL2ludm9pY2VzL3tpbnZvaWNlX2lkfS9hdHRhY2htZW50cy97YXR0YWNobWVudF9pZH0=/
	 */
	async retrieveInvoiceAttachment(
		invoiceId: string,
		attachmentId: string,
		params?: { expand?: string },
	): Promise<InvoiceAttachment> {
		return this.client.get<InvoiceAttachment>(
			path`/acq/invoices/${invoiceId}/attachments/${attachmentId}`,
			params,
		);
	}

	/**
	 * Creates an attachment on an invoice.
	 *
	 * @param invoiceId - The invoice ID.
	 * @param body - The attachment data.
	 * @returns The created attachment.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UE9TVCAvYWxtYXdzL3YxL2FjcS9pbnZvaWNlcy97aW52b2ljZV9pZH0vYXR0YWNobWVudHM=/
	 */
	async createInvoiceAttachment(
		invoiceId: string,
		body: InvoiceAttachment,
	): Promise<InvoiceAttachment> {
		return this.client.post<InvoiceAttachment>(
			path`/acq/invoices/${invoiceId}/attachments`,
			body,
		);
	}

	/**
	 * Retrieves a list of lines for an invoice.
	 *
	 * @param invoiceId - The invoice ID.
	 * @param params - Optional pagination.
	 * @returns A list of invoice lines.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL2ludm9pY2VzL3tpbnZvaWNlX2lkfS9saW5lcw==/
	 */
	async retrieveInvoiceLinesList(
		invoiceId: string,
		params?: { q?: string; limit?: number; offset?: number },
	): Promise<InvoiceLines> {
		return this.client.get<InvoiceLines>(
			path`/acq/invoices/${invoiceId}/lines`,
			params,
		);
	}

	/**
	 * Retrieves a single invoice line.
	 *
	 * @param invoiceId - The invoice ID.
	 * @param invoiceLineId - The invoice line ID.
	 * @returns The invoice line.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/R0VUIC9hbG1hd3MvdjEvYWNxL2ludm9pY2VzL3tpbnZvaWNlX2lkfS9saW5lcy97aW52b2ljZV9saW5lX2lkfQ==/
	 */
	async retrieveInvoiceLine(
		invoiceId: string,
		invoiceLineId: string,
	): Promise<InvoiceLine> {
		return this.client.get<InvoiceLine>(
			path`/acq/invoices/${invoiceId}/lines/${invoiceLineId}`,
		);
	}

	/**
	 * Creates an invoice line.
	 *
	 * @param invoiceId - The invoice ID.
	 * @param body - The invoice line data.
	 * @returns The created invoice line.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UE9TVCAvYWxtYXdzL3YxL2FjcS9pbnZvaWNlcy97aW52b2ljZV9pZH0vbGluZXM=/
	 */
	async createInvoiceLine(
		invoiceId: string,
		body: InvoiceLine,
	): Promise<InvoiceLine> {
		return this.client.post<InvoiceLine>(
			path`/acq/invoices/${invoiceId}/lines`,
			body,
		);
	}

	/**
	 * Updates an invoice line.
	 *
	 * @param invoiceId - The invoice ID.
	 * @param invoiceLineId - The invoice line ID.
	 * @param body - The updated invoice line data.
	 * @returns The updated invoice line.
	 * @see https://developers.exlibrisgroup.com/alma/apis/docs/acq/UFVUIC9hbG1hd3MvdjEvYWNxL2ludm9pY2VzL3tpbnZvaWNlX2lkfS9saW5lcy97aW52b2ljZV9saW5lX2lkfQ==/
	 */
	async updateInvoiceLine(
		invoiceId: string,
		invoiceLineId: string,
		body: InvoiceLine,
	): Promise<InvoiceLine> {
		return this.client.put<InvoiceLine>(
			path`/acq/invoices/${invoiceId}/lines/${invoiceLineId}`,
			body,
		);
	}
}
