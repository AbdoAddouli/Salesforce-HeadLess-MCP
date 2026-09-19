# Phase 13 — Certification Prep: Headless Architect

Exam snapshot, domain weighting, and the study loop for the Salesforce Certified
Headless Architect cert.

## Exam Snapshot

The **Salesforce Certified Headless Architect** exam (formerly Headless Commerce
Architect) validates solution design across headless Salesforce architectures.
Verify the current edition on the official exam guide PDF — facts below are the
standard architect profile.

| Item | Typical |
|---|---|
| Questions | 60 |
| Time | 120 minutes |
| Passing | ~68% (verify current guide) |
| Retake | Waiting period + fee |
| Cost | US $400 (verify) |

> Exam costs and passing score change edition-to-edition. Always confirm against
> the official current "Headless Architect" exam guide before scheduling.

## Domain Weighting (Sample)

| Domain | Weight |
|---|---|
| Solution Architecture & Design | ~30% |
| Technical Architecture & Integrations | ~25% |
| Storefront / Headless Client Design | ~20% |
| Performance & Scalability | ~15% |
| Security & Compliance | ~10% |

The heaviest domain is always **solution architecture**: scenario → requirements
→ trade-offs → design. Spend your study time on **trade-off reasoning**, not
isolated API trivia.

**Self-check:** Which domain usually weighs the most? *Solution Architecture /
Design* — scenario reasoning carries it.

## Architecture Fundamentals to Review

- **Headless 360 layers** and where each API surface lives.
- **API selection**: REST / GraphQL / Bulk 2.0 / Streaming / Apex REST / MCP.
- **OAuth 2.0 flows** + Named Credentials vs hardcoded endpoints.
- **Commerce**: hosted checkout vs headless checkout; B2B vs B2C.
- **Events**: platform events, CDC, replay, pub/sub.
- **MCP**: primitives, mediation, engagement layer placement.

## Study Loop

- Read each roadmap phase guide (this academy!)
- Do every exercise + verify with the answers file
- Mine exam facts from the custom metadata
- Take the Phase 13 quiz, review wrong answers
- Book the exam only after scoring ~80% on a practice attempt

## Repo Artifacts to Open

- `force-app/main/default/classes/CertificationService.cls` — cert facts service
- `force-app/main/default/customMetadata/` — exam facts custom metadata
- `docs/assets/answers.js` — practice exam notes