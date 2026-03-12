import type { AlmaHttpClient } from "@/client";

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
	 */
	async retrieveInvoicesList(params?: {
		q?: string;
		limit?: number;
		offset?: number;
		order_by?: string;
		direction?: string;
		view?: string;
	}): Promise<Invoices> {
		return this.client.get<Invoices>("/almaws/v1/acq/invoices/", params);
	}

	/**
	 * Retrieves a single invoice.
	 *
	 * @param invoiceId - The invoice ID.
	 * @returns The invoice.
	 */
	async retrieveInvoice(invoiceId: string): Promise<Invoice> {
		return this.client.get<Invoice>(
			`/almaws/v1/acq/invoices/${encodeURIComponent(invoiceId)}`,
		);
	}

	/**
	 * Creates a new invoice.
	 *
	 * @param body - The invoice data.
	 * @returns The created invoice.
	 */
	async createInvoice(body: Invoice): Promise<Invoice> {
		return this.client.post<Invoice>("/almaws/v1/acq/invoices", body);
	}

	/**
	 * Updates an existing invoice.
	 *
	 * @param invoiceId - The invoice ID.
	 * @param body - The updated invoice data.
	 * @returns The updated invoice.
	 */
	async updateInvoice(invoiceId: string, body: Invoice): Promise<Invoice> {
		return this.client.put<Invoice>(
			`/almaws/v1/acq/invoices/${encodeURIComponent(invoiceId)}`,
			body,
		);
	}

	/**
	 * Performs an action on an invoice (e.g. process, paid).
	 *
	 * @param invoiceId - The invoice ID.
	 * @param body - The operation body.
	 * @param params - Optional parameters.
	 * @param params.op - The operation to perform.
	 * @returns The resulting invoice.
	 */
	async operateInvoice(
		invoiceId: string,
		body: Invoice,
		params?: { op?: string },
	): Promise<Invoice> {
		return this.client.post<Invoice>(
			`/almaws/v1/acq/invoices/${encodeURIComponent(invoiceId)}`,
			body,
			params,
		);
	}

	/**
	 * Retrieves all attachments for an invoice.
	 *
	 * @param invoiceId - The invoice ID.
	 * @returns A list of invoice attachments.
	 */
	async retrieveInvoiceAttachmentsList(
		invoiceId: string,
	): Promise<InvoiceAttachments> {
		return this.client.get<InvoiceAttachments>(
			`/almaws/v1/acq/invoices/${encodeURIComponent(invoiceId)}/attachments`,
		);
	}

	/**
	 * Retrieves a single invoice attachment.
	 *
	 * @param invoiceId - The invoice ID.
	 * @param attachmentId - The attachment ID.
	 * @returns The attachment.
	 */
	async retrieveInvoiceAttachment(
		invoiceId: string,
		attachmentId: string,
	): Promise<InvoiceAttachment> {
		return this.client.get<InvoiceAttachment>(
			`/almaws/v1/acq/invoices/${encodeURIComponent(invoiceId)}/attachments/${encodeURIComponent(attachmentId)}`,
		);
	}

	/**
	 * Creates an attachment on an invoice.
	 *
	 * @param invoiceId - The invoice ID.
	 * @param body - The attachment data.
	 * @returns The created attachment.
	 */
	async createInvoiceAttachment(
		invoiceId: string,
		body: InvoiceAttachment,
	): Promise<InvoiceAttachment> {
		return this.client.post<InvoiceAttachment>(
			`/almaws/v1/acq/invoices/${encodeURIComponent(invoiceId)}/attachments`,
			body,
		);
	}

	/**
	 * Retrieves a list of lines for an invoice.
	 *
	 * @param invoiceId - The invoice ID.
	 * @param params - Optional pagination.
	 * @returns A list of invoice lines.
	 */
	async retrieveInvoiceLinesList(
		invoiceId: string,
		params?: { limit?: number; offset?: number },
	): Promise<InvoiceLines> {
		return this.client.get<InvoiceLines>(
			`/almaws/v1/acq/invoices/${encodeURIComponent(invoiceId)}/lines`,
			params,
		);
	}

	/**
	 * Retrieves a single invoice line.
	 *
	 * @param invoiceId - The invoice ID.
	 * @param invoiceLineId - The invoice line ID.
	 * @returns The invoice line.
	 */
	async retrieveInvoiceLine(
		invoiceId: string,
		invoiceLineId: string,
	): Promise<InvoiceLine> {
		return this.client.get<InvoiceLine>(
			`/almaws/v1/acq/invoices/${encodeURIComponent(invoiceId)}/lines/${encodeURIComponent(invoiceLineId)}`,
		);
	}

	/**
	 * Creates an invoice line.
	 *
	 * @param invoiceId - The invoice ID.
	 * @param body - The invoice line data.
	 * @returns The created invoice line.
	 */
	async createInvoiceLine(
		invoiceId: string,
		body: InvoiceLine,
	): Promise<InvoiceLine> {
		return this.client.post<InvoiceLine>(
			`/almaws/v1/acq/invoices/${encodeURIComponent(invoiceId)}/lines`,
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
	 */
	async updateInvoiceLine(
		invoiceId: string,
		invoiceLineId: string,
		body: InvoiceLine,
	): Promise<InvoiceLine> {
		return this.client.put<InvoiceLine>(
			`/almaws/v1/acq/invoices/${encodeURIComponent(invoiceId)}/lines/${encodeURIComponent(invoiceLineId)}`,
			body,
		);
	}
}
