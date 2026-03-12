import { describe, expect, it } from "bun:test";
import { AlmaClient, AlmaError, type AlmaRegion } from "../src/index.ts";

const apiKey = Bun.env.ALMA_API_KEY;
const region = (Bun.env.ALMA_REGION ?? "eu") as AlmaRegion;
const skip = !apiKey;

describe("AlmaClient", () => {
	it("can be instantiated with default options", () => {
		const client = new AlmaClient({ apiKey: "test-key", region: "eu" });
		expect(client.conf).toBeDefined();
		expect(client.bibs).toBeDefined();
		expect(client.acq).toBeDefined();
		expect(client.users).toBeDefined();
	});

	it("can be instantiated with a custom base URL", () => {
		const client = new AlmaClient({
			apiKey: "test-key",
			baseUrl: "https://custom.example.com",
		});
		expect(client).toBeDefined();
	});

	it("throws AlmaError on invalid API key", async () => {
		if (skip) return;
		const bad = new AlmaClient({ apiKey: "INVALID_KEY", region });
		await expect(bad.conf.retrieveLibraries()).rejects.toBeInstanceOf(
			AlmaError,
		);
	});
});
