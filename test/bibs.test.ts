import { describe, expect, it } from "bun:test";

import { AlmaClient, type AlmaRegion } from "@";

const apiKey = Bun.env.ALMA_API_KEY;
const region = (Bun.env.ALMA_REGION ?? "eu") as AlmaRegion;
const skip = !apiKey;

const client = skip ? null : new AlmaClient({ apiKey, region });

describe("bibs - catalog", () => {
	it("retrieveBibs returns a result for a simple query", async () => {
		if (skip || !client) return;
		const result = await client.bibs.retrieveBibs({
			mms_id: Bun.env.ALMA_TEST_BIB_MMS_IDS,
		});
		expect(result).toBeDefined();
		expect(result.total_record_count).toEqual(3);
		expect(result.bib).toBeInstanceOf(Array);
		expect(result.bib.length).toEqual(3);
	});

	it("retrieveBib returns a single bib", async () => {
		if (skip || !client) return;
		const mmsId = Bun.env.ALMA_TEST_BIB_MMS_IDS!.split(",")[0]!;
		const bib = await client.bibs.retrieveBib(mmsId);
		expect(bib).toBeDefined();
		expect(bib.mms_id).toEqual(mmsId);
	});
});

describe("bibs - collections", () => {
	it("retrieveCollections returns a result", async () => {
		if (skip || !client) return;
		const result = await client.bibs.retrieveCollections();
		expect(result).toBeDefined();
	});
});

describe("bibs - authorities", () => {
	it("retrieveAuthorities returns a result", async () => {
		if (skip || !client) return;
		const result = await client.bibs.retrieveAuthorities({
			other_system_id: "ABC-123",
			limit: 5,
		});
		expect(result).toBeDefined();
	});
});
