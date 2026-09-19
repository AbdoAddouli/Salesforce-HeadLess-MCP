# Phase 01 — Headless Fundamentals

API-first platform, Headless 360, and the four architecture layers.

## What Headless Really Means

Headless means the **presentation layer is decoupled** from the platform that
provides data and logic. You build any UI — React, Next.js, a mobile app, an
Express worker, a CLI, an Agent — and you consume Salesforce through **APIs**.
Salesforce never renders the screen.

| Traditional (LWC/Aura) | Headless |
|---|---|
| UI rendered by Salesforce | UI rendered by your stack |
| Session on the platform | OAuth token on the client |
| UI + logic tightly coupled | The API **is** the UI |
| MVC server-rendered | Client (fetch) + API + platform |

> Headless never means "without Salesforce". It means **without Salesforce UI**.
> All the platform power — security, sharing, automation, data — stays on and is
> exposed via APIs.

**Self-check:** A React storefront reads products via a Fetch REST middleware. Is
this headless? Yes. The UI lives off-platform and consumes Salesforce via an API.

## The Headless 360 Architecture

Salesforce Headless 360 (announced at TDX 2026) turns the platform into
**composition-ready building blocks behind one API surface**. There are four
layers:

- **Data 360** — the data and records services (REST, GraphQL, Bulk, SOQL)
- **Business Logic 360** — Apex, flows, invocable actions, functions
- **Orchestration 360** — inbound/outbound composition, event mesh, agents
- **Engagement 360** — the headless engagement layer (HXL) that fronts everything

```text
Your UI / App / Agent   (any framework)
        |
        |  HTTP + OAuth
        v
( Engagement 360 / HXL )   <- platform-hosted MCP servers + tools
        |
        v
( Orchestration 360 )      <- event mesh, platform events, agents
        |
        v
( Business Logic 360 )     <- Apex, flows, invocable actions
        |
        v
( Data 360 )               <- REST, GraphQL, Bulk, SOQL, records API
```

> Exams and interviews expect the **LAYERS** and where each one exposes its API.
> Data lives in Data 360; **MCP tools are hosted in the Engagement layer**, not in
> Data 360.

## Do I Need a Framework?

HTTP + JSON is the baseline. But production headless apps benefit from an SDK or
data fetcher that handles auth, caching, batching and errors for you.

| Tool | What it gives you |
|---|---|
| Fetch API (JS) | Built-in client, zero dependencies |
| Salesforce JS SDK (jsforce) | Auth, CRUD, bulk, streaming on Node + browser |
| @salesforce/sdk (composable) | Composable commerce storefront client |
| GraphQL clients (Relay/urql) | Declarative data fetching for the GraphQL API |

**Self-check:** When is plain fetch enough? For small demos and single calls.
Production apps with batch/streaming/auth flows usually adopt an SDK or a thin
client layer.

## Choosing the Right API

Different jobs call for different APIs. This matching table is exam gold — learn
to run it **in reverse** (scenario → API).

| Need | Best-fit API |
|---|---|
| CRUD on records | REST API / GraphQL |
| Nested related data in one round trip | GraphQL |
| Backfill 10M records | Bulk API 2.0 |
| Subscribe to changes in real time | Streaming API / Platform Events |
| Call Apex as an endpoint | Apex REST |
| Lambda-like custom logic off-platform | Functions / Express worker |

**Self-check:** You must push 2M Accounts each night. Which API? *Bulk API 2.0* —
async, batched, designed for high-volume backfills.

## Exercise — Map the Layers

Match each capability to the correct Headless 360 layer:

- SOQL query over Account → **Data 360**
- Invocable Apex action → **Business Logic 360**
- Event mesh / platform events → **Orchestration 360**
- Platform-hosted MCP tools → **Engagement 360**

Verify all four pairs; double-check the invocable action goes to **Business Logic**.

## Repo Artifacts to Open

- `force-app/main/default/classes/HeadlessFundamentalsService.cls` — reference layered service
- `config/project-scratch-def.json` — the SFDX scratch org shape used across this roadmap
- `force-app/main/default/objects/` — `Headless_Architecture__c` custom object