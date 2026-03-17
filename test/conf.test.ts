import { describe, expect, it } from "bun:test";

import { AlmaClient, type AlmaRegion } from "@";

const apiKey = Bun.env.ALMA_API_KEY;
const region = (Bun.env.ALMA_REGION ?? "eu") as AlmaRegion;
const skip = !apiKey;

const client = skip ? null : new AlmaClient({ apiKey, region });

describe("conf - organizations", () => {
	it("retrieveLibraries returns a result", async () => {
		if (skip || !client) return;
		const result = await client.conf.organizationUnits.retrieveLibraries();
		expect(result).toBeDefined();
	});

	it("retrieveLibrary returns a single library", async () => {
		if (skip || !client) return;
		const list = await client.conf.organizationUnits.retrieveLibraries();
		const libraries = (list as { library?: unknown[] }).library;
		if (!libraries?.length) return;
		const code = (libraries[0] as { code?: string }).code;
		if (!code) return;
		const lib = await client.conf.organizationUnits.retrieveLibrary(code);
		expect(lib).toBeDefined();
	});
});

describe("conf - configuration", () => {
	it("retrieveGeneralConfig returns a result", async () => {
		if (skip || !client) return;
		const result = await client.conf.general.retrieveGeneralConfig();
		expect(result).toBeDefined();
	});

	it("retrieveCodeTables returns a result", async () => {
		if (skip || !client) return;
		const result = await client.conf.general.retrieveCodeTables();
		expect(result).toBeDefined();
	});
});

describe("conf - jobs", () => {
	it("retrieveJobs returns a result", async () => {
		if (skip || !client) return;
		const result = await client.conf.jobs.retrieveJobs({ limit: 1 });
		expect(result).toBeDefined();
	}, 30000);
});

describe("conf - sets", () => {
	it("retrieveSets returns a result", async () => {
		if (skip || !client) return;
		const result = await client.conf.sets.retrieveSets({ limit: 10 });
		expect(result).toBeDefined();
	});
});
