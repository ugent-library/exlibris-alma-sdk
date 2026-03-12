import { describe, expect, it, mock } from "bun:test";

import { AlmaClient, AlmaError, type AlmaRegion } from "alma-sdk";

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

	it("should be possible to change the API version", async () => {
		if (skip) return;
		const client = new AlmaClient({
			apiKey: "test-key",
			region,
			version: "v2345",
		});

		const originalFetch = globalThis.fetch;

		const fetchMock = mock();
		fetchMock.mockResolvedValueOnce(
			new Response(JSON.stringify({}), { status: 200 }),
		);
		// @ts-expect-error - We are intentionally mocking fetch here
		globalThis.fetch = fetchMock;

		try {
			await client.conf.retrieveLibraries();

			expect(fetchMock).toHaveBeenCalledTimes(1);
			expect(fetchMock).toHaveBeenCalledWith(
				"https://api-eu.hosted.exlibrisgroup.com/almaws/v2345/conf/libraries",
				expect.anything(),
			);
		} finally {
			globalThis.fetch = originalFetch;
		}
	});
});
