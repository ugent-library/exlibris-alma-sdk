import { describe, expect, it } from "bun:test";

import { AlmaClient, type AlmaRegion } from "alma-sdk";

const apiKey = Bun.env.ALMA_API_KEY;
const region = (Bun.env.ALMA_REGION ?? "eu") as AlmaRegion;
const skip = !apiKey;

const client = skip ? null : new AlmaClient({ apiKey, region });

describe("users - test endpoint", () => {
	it("test returns a result", async () => {
		if (skip || !client) return;
		const result = await client.users.test();
		expect(result).toBeDefined();
	});
});

describe("users - ME endpoint", () => {
	it("retrieveMe returns the current user", async () => {
		if (skip || !client) return;
		const result = await client.users.retrieveMe();
		expect(result).toBeDefined();
	});
});

describe("users - list", () => {
	it("retrieveUsersList returns a result", async () => {
		if (skip || !client) return;
		const result = await client.users.retrieveUsersList({ limit: 5 });
		expect(result).toBeDefined();
	});

	it("retrieveUser returns a single user", async () => {
		if (skip || !client) return;
		const list = await client.users.retrieveUsersList({ limit: 1 });
		const users = (list as { user?: unknown[] }).user;
		if (!users?.length) return;
		const userId = (users[0] as { primary_id?: string }).primary_id;
		if (!userId) return;
		const user = await client.users.retrieveUser(userId);
		expect(user).toBeDefined();
	});
});

describe("users - loans", () => {
	it("retrieveUserLoansList returns a result", async () => {
		if (skip || !client) return;
		const list = await client.users.retrieveUsersList({ limit: 1 });
		const users = (list as { user?: unknown[] }).user;
		if (!users?.length) return;
		const userId = (users[0] as { primary_id?: string }).primary_id;
		if (!userId) return;
		const result = await client.users.retrieveUserLoansList(userId, {
			limit: 10,
		});
		expect(result).toBeDefined();
	});
});

describe("users - requests", () => {
	it("retrieveUserRequestsList returns a result", async () => {
		if (skip || !client) return;
		const list = await client.users.retrieveUsersList({ limit: 1 });
		const users = (list as { user?: unknown[] }).user;
		if (!users?.length) return;
		const userId = (users[0] as { primary_id?: string }).primary_id;
		if (!userId) return;
		const result = await client.users.retrieveUserRequestsList(userId, {
			limit: 10,
		});
		expect(result).toBeDefined();
	});
});

describe("users - fees", () => {
	it("retrieveUserFeesList returns a result", async () => {
		if (skip || !client) return;
		const list = await client.users.retrieveUsersList({ limit: 1 });
		const users = (list as { user?: unknown[] }).user;
		if (!users?.length) return;
		const userId = (users[0] as { primary_id?: string }).primary_id;
		if (!userId) return;
		const result = await client.users.retrieveUserFeesList(userId);
		expect(result).toBeDefined();
	});
});

describe("users - staff login report", () => {
	it("retrieveStaffLoginReport returns a result", async () => {
		if (skip || !client) return;
		const result = await client.users.retrieveStaffLoginReport({ limit: 5 });
		expect(result).toBeDefined();
	});
});
