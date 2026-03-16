# exlibris-alma-sdk

> [!WARNING]
> This SDK is currently a **work in progress**. Releases prior to `1.0.0` may contain breaking changes to method signatures, return types, etc.

TypeScript SDK for the Ex Libris Alma REST APIs.

The client currently provides a typed interface for the main Alma API domains:

- `conf` - Configuration and Administration
- `bibs` - Bibliographic Records and Inventory
- `acq` - Acquisitions
- `users` - Users and Fulfillment

## Installation

```bash
npm install exlibris-alma-sdk
```

```bash
bun add exlibris-alma-sdk
```

## Quick Start

```ts
import { AlmaClient } from "exlibris-alma-sdk";

const client = new AlmaClient({
	apiKey: "...",
	region: "eu" // eu | na | ap | aps | cn | ca
});

const libraries = await client.conf.retrieveLibraries();
const bib = await client.bibs.retrieveBib("990000000000541");
const funds = await client.acq.retrieveFundsList();
const user = await client.users.retrieveUser("12345");
```

## Client Configuration

`AlmaClient` accepts the following options:

- `apiKey` (**required**) - your Alma API key
- `region` - Alma hosted region (`eu`, `na`, `ap`, `aps`, `cn`, `ca`)
- `baseUrl` - custom base URL (overrides `region`)
- `version` - API version segment, default is `v1`

Use either `region` or `baseUrl`.

```ts
import { AlmaClient } from "exlibris-alma-sdk";

const client = new AlmaClient({
	apiKey: "your-api-key",
	baseUrl: "https://api-eu.hosted.exlibrisgroup.com",
	version: "v1"
});
```

## Resource Overview

Top-level resources:

- `client.conf` - libraries, locations, jobs, sets, profiles, printers, reminders
- `client.bibs` - bibs, holdings, items, collections, digital, loans, requests, authorities
- `client.acq` - funds, invoices, licenses, po-lines, vendors, misc
- `client.users` - users, loans, requests, fees, purchase requests, leganto, staff login report

Each top-level resource also exposes sub-resources (for example `client.bibs.catalog` or `client.acq.funds`) and convenience methods directly on the parent resource.

## Error Handling

The SDK throws typed errors:

- `AlmaUnauthorizedError` for authorization/authentication failures
- `AlmaError` for other non-2xx responses

```ts
import {
	AlmaClient,
	AlmaError,
	AlmaUnauthorizedError
} from "exlibris-alma-sdk";

const client = new AlmaClient({ apiKey: "...", region: "eu" });

try {
	await client.users.retrieveUser("12345");
} catch (error) {
	if (error instanceof AlmaUnauthorizedError) {
		console.error("Unauthorized", error.message);
	} else if (error instanceof AlmaError) {
		console.error(`Alma API error (${error.status})`, error.message);
	} else {
		throw error;
	}
}
```

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

Licensed under the [MIT License](./LICENSE).
