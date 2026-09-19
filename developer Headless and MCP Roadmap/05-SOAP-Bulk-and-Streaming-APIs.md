# Phase 05 — SOAP, Bulk API 2.0 & Streaming

When REST is too chatty or too small, reach for Bulk (high volume) and describe
how SOAP and Streaming fit the picture.

## Bulk API 2.0 — the Job Lifecycle

Bulk 2.0 is **async and free of the sync 10k DML-row limit**. Jobs = object +
operation; batches = CSV chunks; states:

```text
Open -> UploadComplete -> InProgress -> JobComplete
```

- **Ingest (write)** — CSV in, by object.
- **Query (read)** — async SOQL to CSV, up to 15M rows.
- **QueryAll** — includes deleted + archived records.

```bash
# 1. Create the job
POST /services/data/v68.0/jobs/ingest
{ "object": "Account", "operation": "insert", "contentType": "CSV" }

# 2. Upload batches (<=10,000 rows per batch)
PUT  /services/data/v68.0/jobs/ingest/<jobId>/batches   (CSV body)

# 3. Close the job — nothing processes until you do this
PATCH /services/data/v68.0/jobs/ingest/<jobId>
{ "state": "UploadComplete" }

# 4. Poll GET .../jobs/ingest/<jobId> until "JobComplete"
```

| Limit | Value |
|---|---|
| Query rows per job | 15,000,000 |
| Total rows per 24h | 150,000,000 |
| Rows per batch | 10,000 |
| Concurrent jobs | 5 |

> Watch limits: DML in Bulk is **not** subject to the synchronous 10k limit, so
> multi-million-row loads are safe — but plan batches to stay under per-batch caps.

## Parallel vs Serial Batches

Use **parallel** batches for ingest throughput; use **serial** when you must
preserve order (e.g., parent before child in upserts).

## Where SOAP Still Matters

SOAP remains relevant for **SSO / single-message operations** and enterprise
middleware that still speaks WSDL. Partner vs Enterprise WSDL:

- **Partner WSDL** — dynamic fields (harder, generic tooling).
- **Enterprise WSDL** — static, object-specific (easier when schema is stable).

**Self-check:** Your Java middleware is WSDL-only. Which API for one-off account
creates? *SOAP (Partner or Enterprise WSDL)* — mature WSDL tooling without JSON.

## Streaming API & Platform Events (Preview)

When you need to be **notified** instead of polling:

- **Streaming API** — push topics, CometD/EMP client.
- **Platform Events** — custom event records you publish; subscribers get them
  asynchronously.
- **CDC (Change Data Capture)** — change events for record creates/updates on any
  object.

> Streaming and events are the antidote to chatty polling. Replay IDs let late
> subscribers resume from a checkpoint.

## Exercise — Bulk Load 10k Accounts

Load a 10k-row CSV into Account with Bulk 2.0 and confirm results.

Refer to `docs/assets/answers.js` (`C5EX1`) for the expected job lifecycle and
verification via `numberRecordsProcessed` / `numberRecordsFailed`.

## Repo Artifacts to Open

- `force-app/main/default/classes/BulkService.cls` — Bulk 2.0 client
- `force-app/main/default/classes/BulkServiceTest.cls` — job-lifecycle tests
- `docs/assets/answers.js` — `C5EX1` model answer