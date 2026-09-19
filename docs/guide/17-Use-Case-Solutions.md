# Phase 17 — Use Case Solutions

Canonical answers for every use case, with acceptance criteria and reusable
reasoning.

## Reading a Solution

Each use-case solution lists the **deliverable**, the **reasoning**, and the
**acceptance checklist**. Compare to your brief and note only the *meaningful*
deltas.

> When a review scenario is asked in an interview, walking through the
> **use case → trade-off → decision** structure scores far higher than naming an
> API.

## Case C1 — Realtime Approval Pull (Solution)

- **Deliverable:** REST/GraphQL read + platform-event subscription + offline
  cache that replays on reconnect.
- **Reasoning:** volume is low and per-manager, so REST suffices; *instant*
  approval updates push you to pub/sub, never polling.
- **Acceptance checklist:**
  - [ ] Latest approval state rendered without a visible refresh
  - [ ] No polling interval firing every few seconds
  - [ ] Offline queue replays approvals once connectivity returns

## Case C2 — 10M-Row Sync (Solution)

- **Deliverable:** Bulk 2.0 ingest with serial batches + post-load CDC deltas.
- **Reasoning:** only Bulk is async, batched, and free of the 10k DML-row limit;
  serial batches preserve parent-before-child order.
- **Acceptance checklist:**
  - [ ] Job completes; `numberRecordsProcessed` matches the source count
  - [ ] Failures are resumable via replay/batch re-run
  - [ ] Delta window covered by CDC rather than a full re-sync

## Case C3 — Agent Answering Users (Solution)

- **Deliverable:** an MCP tool (`get_account_health`) backed by a mediated read.
- **Reasoning:** the platform enforces sharing/FLS/audit on every tool call —
  safer than handing an agent an API key.
- **Acceptance checklist:**
  - [ ] Tool returns structured JSON the agent can cite
  - [ ] Caller scope validated before any data access
  - [ ] Audit trail shows who/what asked and got what

## Exercise — Grade Your Own Brief

- Compare your Phase 16 brief to the canonical solution
- List where your brief disagrees (if any)
- Rewrite the justification incorporating the feedback

Verify: your revised brief is **stricter on trade-offs and security** than the
first draft.

## Repo Artifacts to Open

- `docs/assets/answers.js` — `C17EX1` model self-audit