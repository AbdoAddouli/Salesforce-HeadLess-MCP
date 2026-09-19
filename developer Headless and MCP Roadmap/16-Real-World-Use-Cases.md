# Phase 16 — Real-World Use Cases

Field-facing scenarios and the decision logic behind architecture choices.

## Scenario: Realtime Approval Pull

A field app must show pending approvals and let managers approve instantly,
offline-tolerant.

- **API:** REST (low volume, per-manager) or GraphQL for the dashboard tile
- **Pub/sub:** subscribe to approval process updates if they must be instant
- **Offline:** cache POJOs + replay on reconnect

> Avoid polling every 5s for approvals — that is **chatty**. Prefer streaming or
> acceptable-delay refresh with cache.

## Scenario: 10M-Row Sync

Nightly sync of 10M external accounts into Salesforce, order-guaranteed with a
durable log.

- **API:** Bulk API 2.0 (async, order via serial batches)
- **CDC/replay:** deltas after the full load
- **Monitoring:** job state polling + failure resume via replay

**Self-check:** Sync 10M nightly — which API? *Bulk API 2.0* with serial batches
to preserve parent/child order.

## Scenario: Agent Answering Users

An AI agent must answer "what is my account health?" from Salesforce data safely.

- Expose a platform-hosted or custom **MCP tool** (`get_account_health`)
- **Mediate** through the platform: sharing + FLS + audit
- Return **structured JSON** so the agent can reason + cite

> For agent surfaces, prefer **MCP tools over raw API keys**: the platform
> mediates permissions and audit.

## Architecture Smells to Avoid

- **Over-fetching** — pulling full records to render a status dot.
- **Chatty clients** — N+1 REST calls where GraphQL/composite would do.
- **Sync loops** — polling where streaming belongs.
- **Hardcoded secrets** — tokens in source or custom settings.
- **Raw passthrough** — letting clients hit the platform without mediation.

## Exercise — Decide & Justify

Choose an API + security approach for one real scenario and write the
justification:

- Pick: realtime inflight view, 10M sync, or agent Q&A
- Justify API, transport, security, and scale decisions
- Note the top trade-off and the smell you avoided

Verify: your brief names trade-offs and defends the API choice with requirements —
the way a cert scenario expects.

## Repo Artifacts to Open

- `docs/assets/answers.js` — `C16EX1` model brief