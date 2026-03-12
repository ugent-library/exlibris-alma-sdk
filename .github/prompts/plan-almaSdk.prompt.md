# Plan: Alma API SDK - Full TypeScript SDK

**TL;DR**: Build a fully-typed, namespaced TypeScript SDK for 4 Alma REST APIs using `openapi-typescript` v7 for type generation (devDep), native `fetch` for HTTP (no runtime dependencies), a typed `AlmaError` class, full CRUD methods, JSDoc documentation, and real-API-call tests using env vars.

---

## Decisions

| Question     | Answer |
|--------------|---|
| API coverage | All CRUD (GET, POST, PUT, DELETE) |
| Types        | `openapi-typescript` v7 with `--resolve-external-refs` |
| Tests | Real API calls - `ALMA_API_KEY` + `ALMA_REGION` env vars |
| Errors | `AlmaError` class with `status`, `message`, `body` |

---

## Phase 1 - Project Setup
1. Add `openapi-typescript` as devDependency (v7)
2. Add `gen:types` scripts to `package.json` for all 4 specs, plus a combined `gen:all`. This can call a custom generate script. Make sure to also download the spec files locally (e.g. `specs/conf.json`) for later reference and to avoid hitting rate limits or network issues during generation.
3. Run `bun run gen:all` → produces `src/types/generated/{conf,bibs,acq,users}.d.ts`

## Phase 2 - Error & Base HTTP Client
4. Create `src/errors.ts` - `AlmaError extends Error` with `status: number`, `message: string`, `body: unknown`. If requests are unauthenticated or unauthorized, the Alma API responds with an XML response (ignoring the Accept header) - parse this XML to extract a meaningful error message of type `AlmaUnauthorizedError`.
5. Create `src/client.ts` - `AlmaHttpClient` class:
   - Config: `{ apiKey: string; region?: 'eu'|'na'|'ap'|'aps'|'cn'|'ca'; version?: ``v${number}``; baseUrl?: string; }`
   - Base URL: `https://api-{region}.hosted.exlibrisgroup.com`
   - Private `request<T>()` method; public `get<T>()`, `post<T>()`, `put<T>()`, `delete<T>()`
   - Appends `?apikey={key}`, sets `Accept: application/json`, `Content-Type: application/json` (note that unauthenticated/unauthorized requests return XML regardless of headers)
   - Throws `AlmaError` on any non-2xx response

## Phase 3 - `conf` namespace
6. `src/resources/conf/types.ts` - Type aliases from generated types
7. Split by tag group:
   - `organizations.ts` - libraries, circ desks, locations, departments (full CRUD where available)
   - `configuration.ts` - general config, code tables, mapping tables, letters, open-hours, relations
   - `jobs.ts` - list/get jobs, get instances, submit/cancel jobs
   - `sets.ts` - list/get/create/update/delete sets + set members
   - `profiles.ts` - import profiles, integration profiles, deposit profiles
   - `printers.ts` - list/get printers, test printer
   - `reminders.ts` - list/create/update/delete reminders
8. `src/resources/conf/index.ts` - `ConfResource` class aggregating all sub-resources

## Phase 4 - `bibs` namespace
9. `src/resources/bibs/types.ts` - Type aliases from generated types
10. Split by tag group:
    - `catalog.ts` - get/update bibs, holdings CRUD, items CRUD, portfolios GET
    - `loans.ts` - list/get/renew/return bib and item loans
    - `requests.ts` - list/get/create/update/delete bib and item requests + request options
    - `collections.ts` - list/get/create/update/delete collections + bibs in collection
    - `digital.ts` - representations CRUD, files, e-collections GET
    - `authorities.ts` - get authority records
    - `reminders.ts` - list/create/update/delete reminders
11. `src/resources/bibs/index.ts` - `BibsResource` class

## Phase 5 - `acq` namespace
12. `src/resources/acq/types.ts` - Type aliases from generated types
13. Split by tag group:
    - `funds.ts` - list/get funds, fund transactions
    - `invoices.ts` - CRUD invoices, invoice lines, attachments
    - `licenses.ts` - CRUD licenses, amendments, attachments
    - `po-lines.ts` - list/get/create/update/delete PO lines + items
    - `vendors.ts` - list/get/create/update/delete vendors + vendor invoices + PO lines
    - `misc.ts` - currencies, fiscal periods, purchase requests CRUD
14. `src/resources/acq/index.ts` - `AcqResource` class

## Phase 6 - `users` namespace
15. `src/resources/users/types.ts` - Type aliases from generated types
16. Split by tag group:
    - `users.ts` - list/get/create/update/delete users + attachments
    - `loans.ts` - list/get/renew user loans
    - `requests.ts` - list/get/create/update/delete user requests + resource sharing requests
    - `fees.ts` - list/get fines + pay/waive + deposits CRUD
    - `purchase-requests.ts` - list/get/create/update/delete purchase requests
    - `leganto.ts` - list Leganto notifications
    - `staff-login-report.ts` - get staff login report
17. `src/resources/users/index.ts` - `UsersResource` class

## Phase 7 - Entry Point
18. `src/index.ts` - `AlmaClient` class:
    - Constructor accepting `AlmaClientConfig` (apiKey + region OR custom baseUrl)
    - Properties: `conf: ConfResource`, `bibs: BibsResource`, `acq: AcqResource`, `users: UsersResource`
    - Barrel exports: all resource classes, all types, `AlmaError`, `AlmaClientConfig`

## Phase 8 - Tests
19. One test file per namespace: `test/conf.test.ts`, `test/bibs.test.ts`, `test/acq.test.ts`, `test/users.test.ts`
    - Read `ALMA_API_KEY` and `ALMA_REGION` from `Bun.env` (Bun natively reads `.env`)
    - Cover representative GET + at least one mutation per sub-resource group
    - Mutation tests (POST/PUT/DELETE) guarded by an additional `ALMA_TEST_ALLOW_MUTATIONS=true` flag to prevent accidental data changes

---

## File Structure

```
src/
  error.ts
  client.ts
  types/
    generated/
      conf.d.ts                 # openapi-typescript generated
      bibs.d.ts
      acq.d.ts
      users.d.ts
  resources/
    conf/
      types.ts
      organizations.ts
      configuration.ts
      jobs.ts
      sets.ts
      profiles.ts
      printers.ts
      reminders.ts
      index.ts
    bibs/
      types.ts
      catalog.ts
      loans.ts
      requests.ts
      collections.ts
      digital.ts
      authorities.ts
      reminders.ts
      index.ts
    acq/
      types.ts
      funds.ts
      invoices.ts
      licenses.ts
      po-lines.ts
      vendors.ts
      misc.ts
      index.ts
    users/
      types.ts
      users.ts
      loans.ts
      requests.ts
      fees.ts
      purchase-requests.ts
      leganto.ts
      staff-login-report.ts
      index.ts
  index.ts
test/
  conf.test.ts
  bibs.test.ts
  acq.test.ts
  users.test.ts
```

---

## AlmaClient Usage

```typescript
const client = new AlmaClient({ apiKey: 'xxx', region: 'eu' });
// or with custom base URL:
const client = new AlmaClient({ apiKey: 'xxx', baseUrl: 'https://api-eu.hosted.exlibrisgroup.com' });

// conf namespace
await client.conf.retrieveLibraries()
await client.conf.retrieveLibrary('LIB01')
await client.conf.retrieveSets({ limit: 10 })

// bibs namespace
await client.bibs.retrieveBib('99123456789')
await client.bibs.retrieveHoldingsList('99123456789')
await client.bibs.retrieveItemsList('99123456789', '22123456789')

// acq namespace
await client.acq.retrieveFunds({ library: 'MAIN' })
await client.acq.getInvoice('INV-001')

// users namespace
await client.users.getUserDetails('user123')
await client.users.retrieveUserLoans('user123', { limit: 50 })
```

---

## Relevant Files

- `src/index.ts` - entry point (currently empty, will become `AlmaClient` barrel)
- `test/index.test.ts` - empty, can be repurposed for generic config or error handling tests
- `package.json` - add `openapi-typescript` devDep + `gen:*` scripts
- `tsconfig.json` - already strict, `isolatedDeclarations: true`, `verbatimModuleSyntax: true` (no changes needed)

---

## Verification Checklist

- [ ] `bun run gen:all` completes - 4 `.d.ts` files in `src/types/generated/`
- [ ] `bun run type-check` - zero errors
- [ ] `bun run lint` - zero warnings
- [ ] `bun run build` - produces `dist/index.js` + `dist/index.d.ts`
- [ ] `bun test` - all real-API tests pass (or skip cleanly)
- [ ] `ALMA_TEST_ALLOW_MUTATIONS=true bun test` - mutation tests pass

---

## Further Considerations

1. **`openapi-typescript` external refs**: The 4 spec files reference response schemas via external URLs (`rest_*.json`). If `--resolve-external-refs` successfully resolves them, response types will be fully typed. If not, response body types fall back to `unknown` - supplement with hand-crafted interfaces in each `types.ts` for the most important models.

2. **Test `.env` setup**: Bun natively reads `.env` files from the project root. A `.env.local` (gitignored) with `ALMA_API_KEY=` and `ALMA_REGION=` is sufficient - no `dotenv` package needed.

3. **Mutation test safety**: POST/PUT/DELETE tests against a real Alma instance risk creating or modifying real data. Guard these with `ALMA_TEST_ALLOW_MUTATIONS=true` and use clearly identifiable test record IDs (e.g. prefixed `TEST_SDK_*`) to facilitate cleanup.

4. **Trailing slashes**: Some Alma endpoints have trailing slashes (e.g. `/almaws/v1/acq/invoices/`). These must be preserved in the URL construction inside the HTTP client.

5. **Pagination helpers**: Consider adding a convenience `paginate<T>()` method or async generator on `AlmaHttpClient` that automatically follows `offset`/`limit` pagination for list endpoints.
