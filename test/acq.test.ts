import { describe, expect, it } from "bun:test";

import { AlmaClient, type AlmaRegion } from "alma-sdk";

const apiKey = Bun.env.ALMA_API_KEY;
const region = (Bun.env.ALMA_REGION ?? "eu") as AlmaRegion;
const skip = !apiKey;

const client = skip ? null : new AlmaClient({ apiKey, region });

describe("acq - test endpoint", () => {
	it("test returns a result", async () => {
		if (skip || !client) return;
		const result = await client.acq.test();
		expect(result).toBeDefined();
	});
});

describe("acq - vendors", () => {
	it("retrieveVendorsList returns a result", async () => {
		if (skip || !client) return;
		const result = await client.acq.retrieveVendorsList({ limit: 10 });
		expect(result).toBeDefined();
	});
});

describe("acq - funds", () => {
	it("retrieveFundsList returns a result", async () => {
		if (skip || !client) return;
		const result = await client.acq.retrieveFundsList({ limit: 10 });
		expect(result).toBeDefined();
	});
});

describe("acq - currencies", () => {
	it("retrieveCurrencies returns a result", async () => {
		if (skip || !client) return;
		const result = await client.acq.retrieveCurrencies();
		expect(result).toBeDefined();
	});
});

describe("acq - po-lines", () => {
	it("retrievePoLinesList returns a result", async () => {
		if (skip || !client) return;
		const result = await client.acq.retrievePoLinesList({ limit: 10 });
		expect(result).toBeDefined();
	});
});

describe("acq - invoices", () => {
	it("retrieveInvoicesList returns a result", async () => {
		if (skip || !client) return;
		const result = await client.acq.retrieveInvoicesList({ limit: 10 });
		expect(result).toBeDefined();
	});
});

describe("acq - licenses", () => {
	it("retrieveLicensesList returns a result", async () => {
		if (skip || !client) return;
		const result = await client.acq.retrieveLicensesList({ limit: 10 });
		expect(result).toBeDefined();
	});
});
