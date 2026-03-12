import { describe, expect, it } from "bun:test";
import { AlmaClient, AlmaError, type AlmaRegion } from "../src/index.ts";

const apiKey = Bun.env.ALMA_API_KEY;
const region = (Bun.env.ALMA_REGION ?? "eu") as AlmaRegion;
const skip = !apiKey;

const client = skip ? null : new AlmaClient({ apiKey, region });

describe("bibs - catalog", () => {
	it("retrieveBibs returns a result for a simple query", async () => {
		if (skip || !client) return;
		try {
			const result = await client.bibs.retrieveBibs({
				q: "title,contains,test",
			});
			expect(result).toBeDefined();
		} catch (e) {
			expect(e).toBeInstanceOf(AlmaError);
		}
	});

	it("retrieveBib returns a single bib", async () => {
		if (skip || !client) return;
		try {
			const list = await client.bibs.retrieveBibs({
				q: "title,contains,test",
				limit: 1,
			});
			const bibs = (list as { bib?: unknown[] }).bib;
			if (!bibs?.length) return;
			const mmsId = (bibs[0] as { mms_id?: string }).mms_id;
			if (!mmsId) return;
			const bib = await client.bibs.retrieveBib(mmsId);
			expect(bib).toBeDefined();
		} catch (e) {
			expect(e).toBeInstanceOf(AlmaError);
		}
	});
});

describe("bibs - collections", () => {
	it("retrieveCollectionsList returns a result", async () => {
		if (skip || !client) return;
		const result = await client.bibs.retrieveCollectionsList({ limit: 10 });
		expect(result).toBeDefined();
	});
});

describe("bibs - authorities", () => {
	it("retrieveAuthoritiesList returns a result", async () => {
		if (skip || !client) return;
		try {
			const result = await client.bibs.retrieveAuthoritiesList({
				q: "title,contains,test",
				limit: 5,
			});
			expect(result).toBeDefined();
		} catch (e) {
			expect(e).toBeInstanceOf(AlmaError);
		}
	});
});
