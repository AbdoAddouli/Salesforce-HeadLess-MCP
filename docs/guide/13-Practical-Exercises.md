# Phase 13 — Practical Exercises

End-to-end mini projects that consolidate every phase into buildable, testable
work.

## Mini Projects Overview

| Project | Skills |
|---|---|
| MP1 Health REST client | REST + composite |
| MP2 Bulk load pipeline | Bulk 2.0 + polling |
| MP3 Event-driven alerts | Platform events + CDC |
| MP4 OData external read | Salesforce Connect |
| MP5 MCP health tool | TypeScript SDK + tool |
| MP6 Headless storefront | Composable APIs |

Build them **in order** — each reuses the tools from the previous project. Full
answers and expected results live in `docs/assets/answers.js`.

## Working With the Repo Metadata

`force-app/` carries real, deployable patterns: **services, triggers, objects,
flows bespoke for Headless & MCP**. Use them as skeletons; never paste secrets in.

> Prefix everything consistently (e.g., `Headless` or `MCP`) so cross-references
> and permission sets stay coherent — the repo does this so you can copy the
> habit.

## Project Checklist (use for every mini project)

- [ ] Scaffold a scratch org from `config/project-scratch-def.json`
- [ ] Create or extend the reference service class
- [ ] Keep naming and prefix conventions consistent
- [ ] Respect limits and sharing (`with sharing` where data crosses boundaries)
- [ ] Write an `@isTest` covering happy + error paths
- [ ] Verify via a runnable script / logs
- [ ] No secrets in source (env vars / Named Credentials only)

## Exercise — Pick Your First

Choose and scaffold your first mini project (**MP1 recommended**):

- Fork/clone this roadmap and open the MP folder
- Scaffold a scratch org from `config/project-scratch-def.json`
- Run the reference service + test as your baseline
- Extend it with one new behavior

Verify: baseline tests pass **and** your extension is covered by a new test.

## Repo Artifacts to Open

- `force-app/main/default/classes/` — the services to extend
- `config/project-scratch-def.json` — scratch org shape
- `docs/assets/answers.js` — expected results for every project