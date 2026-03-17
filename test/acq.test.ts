import { describe, expect, it } from "bun:test";

import { AlmaClient, type AlmaRegion } from "@";

const apiKey = Bun.env.ALMA_API_KEY;
const region = (Bun.env.ALMA_REGION ?? "eu") as AlmaRegion;
const skip = !apiKey;

const client = skip ? null : new AlmaClient({ apiKey, region });

describe("acq - vendors", () => {
	it("retrieveVendorsList returns a result", async () => {
		if (skip || !client) return;
		const result = await client.acq.vendors.retrieveVendorsList({ limit: 10 });
		expect(result).toBeDefined();
	});
});

describe("acq - funds", () => {
	it("retrieveFundsList returns a result", async () => {
		if (skip || !client) return;
		const result = await client.acq.funds.retrieveFunds({ limit: 10 });
		expect(result).toBeDefined();
	});
});

describe("acq - currencies", () => {
	it("retrieveCurrencies returns a result", async () => {
		if (skip || !client) return;
		const result = await client.acq.misc.retrieveCurrencies();
		expect(result).toBeDefined();
	});
});

describe("acq - po-lines", () => {
	it("retrievePoLinesList returns a result", async () => {
		if (skip || !client) return;
		const result = await client.acq.poLines.retrievePoLines({
			q: "all",
			limit: 10,
			expand: "vendor",
		});
		expect(result).toBeDefined();
	});
});

describe("acq - invoices", () => {
	it("getInvoices returns a result", async () => {
		if (skip || !client) return;
		const result = await client.acq.invoices.getInvoices({ limit: 10 });
		expect(result).toBeDefined();
	});
});

describe("acq - licenses", () => {
	it("retrieveLicensesList returns a result", async () => {
		if (skip || !client) return;
		const result = await client.acq.licenses.getLicenses({
			limit: 10,
		});
		expect(result).toBeDefined();
	});
});
