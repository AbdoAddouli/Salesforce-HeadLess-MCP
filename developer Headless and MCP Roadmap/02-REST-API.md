# Phase 02 — REST API

CRUD, query, versions, limits, and composite requests against the Salesforce
REST API.

## The Endpoint & Auth

The base URL is `https://yourInstance.salesforce.com/services/data/v68.0/`.
Everything below that root is **versioned and JSON**. You authenticate with an
OAuth 2.0 access token in the `Authorization: Bearer` header.

```bash
curl https://MY-INSTANCE.salesforce.com/services/data/v68.0/sobjects/Account \
  -H "Authorization: Bearer 00D5g00000abcdef!AQo..."
```

| Path | Meaning |
|---|---|
| /services/data/v68.0/sobjects | List all objects |
| /services/data/v68.0/sobjects/Account | Describe Account |
| /services/data/v68.0/sobjects/Account/<id> | Get one record |
| /services/data/v68.0/query?q=<SOQL> | Run a SOQL query |

> Always use the **apiVersion pin (v68.0)**, never "latest". "latest" breaks your
> client when the platform upgrades.

## CRUD in Practice

```bash
# Create — returns the new record id
curl -X POST .../sobjects/Account -H "Content-Type: application/json" \
  -d '{"Name":"Acme","Health_Score__c":82}'

# Read one record (by id or external id with /sobjects/{obj}/ext/{field}/{val})
curl .../sobjects/Account/001xx

# Update — PATCH is a PARTIAL update
curl -X PATCH .../sobjects/Account/001xx \
  -d '{"Health_Score__c":91}'

# Delete
curl -X DELETE .../sobjects/Account/001xx
```

> PATCH only sends changed fields; **PUT is not used** for records. If a field
> read back differs from what you set, check **field-level security (FLS)**, not
> your JSON.

**Self-check:** Which HTTP verb updates a Salesforce record? `PATCH` (partial
update). `DELETE` deletes; `POST` creates.

## Query, Pagination & Limits

```bash
curl ".../query?q=SELECT+Id,Name+FROM+Account+LIMIT+50"

{
  "totalSize": 1234,
  "done": false,
  "nextRecordsUrl": "/services/data/v68.0/query/01g...-2000",
  "records": [ ... ]
}
```

`query` returns at most **2000 records per page**. Follow `nextRecordsUrl` until
`done=true`. `queryAll` includes deleted + archived records.

| Limit | Value |
|---|---|
| Query rows per request | 2000 |
| QueryAll rows per request | 2000 (with deleted) |
| Bulk API 2.0 rows per job (query) | 15,000,000 |
| Default fields on /sobjects/<obj> | 200 |

## Composite Requests

Composite lets you chain up to **25 subrequests in ONE call** sharing headers and
auth — a big latency win. Use `:refN` to reference a subrequest result, including
generated IDs.

```json
POST /services/data/v68.0/composite
{
  "compositeRequest": [
    { "method": "POST", "url": "/services/data/v68.0/sobjects/Account",
      "referenceId": "acct", "body": { "Name": "Acme" } },
    { "method": "POST", "url": "/services/data/v68.0/sobjects/Contact",
      "referenceId": "cont",
      "body": { "LastName": "Doe", "AccountId": "@acct@id" } }
  ],
  "allOrNone": true
}
```

**Self-check:** How do you wire the created Account ID into a Contact in
composite? Give the Account a `referenceId` (acct) and use `@acct@id` in the
Contact body.

## Exercise — Build a REST Client

- Create Account `{"Name":"Acme"}` via `POST /sobjects/Account`
- `PATCH` `Health_Score__c` to 88
- `GET` the record back and assert the score
- Optional: refactor to a composite request that also creates a Contact

Verify: 200 + an Id on create; PATCH returns 204; GET returns `Health_Score__c = 88`.

## Repo Artifacts to Open

- `force-app/main/default/classes/RestApiService.cls` — REST client service
- `force-app/main/default/objects/` — `REST_Integration_Log__c` custom object
- `docs/assets/answers.js` — `C2EX1` model answer