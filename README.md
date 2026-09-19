# Salesforce Headless & MCP Academy

An interactive, self-paced learning app for **Salesforce Headless and MCP** — from REST API basics to building Model Context Protocol (MCP) servers on a composable architecture. Everything lives in this single repository: a zero-build interactive study UI plus a full Salesforce DX metadata project whose Apex, objects, triggers and custom metadata are the same artifacts your exercises link to.

[![Live site](https://img.shields.io/badge/live-GitHub%20Pages-24292f)](https://abdoaddouli.github.io/Salesforce-HeadLess-MCP/)
[![Stack](https://img.shields.io/badge/stack-vanilla%20JS-39A0FF)](./docs/index.html)
[![No build](https://img.shields.io/badge/build-none-10B981)](./docs)
[![Salesforce](https://img.shields.io/badge/Salesforce-API%2068.0-00A1E0)](./sfdx-project.json)

---

## Table of contents

- [The big picture](#the-big-picture)
- [Try it](#try-it)
- [Run locally](#run-locally)
- [The 16-phase roadmap](#the-16-phase-roadmap)
- [Repository structure](#repository-structure)
- [Inside the interactive app](#inside-the-interactive-app)
  - [How it works](#how-it-works)
  - [Curriculum data model](#curriculum-data-model)
  - [Adding or editing phases](#adding-or-editing-phases)
- [The Salesforce DX metadata](#the-salesforce-dx-metadata)
  - [Custom objects](#custom-objects)
  - [Apex services](#apex-services)
  - [Triggers](#triggers)
- [Deploy to an org](#deploy-to-an-org)
- [Consistency checks](#consistency-checks)

---

## The big picture

This repo has two halves that reinforce each other:

1. **`docs/` — the learning app.** A hand-rolled single-page app (`index.html` + `app.js`) with 16 phases, 58 lessons, 44 quiz questions, 15 hands-on exercise/project cards, and 16 full markdown guides. It runs entirely in the browser — no build step, no server, no framework, no dependencies.
2. **`force-app/` — real Salesforce metadata.** The modules teach a topic, then point you at *actual deployable metadata* in this repo via artifact links: Apex classes, platform events, external objects, custom metadata, scratch-org-friendly objects and triggers that match what the lessons explain.

You study online, then recreate the patterns in your own org using the shipped metadata as ground truth.

## Try it

The app is deployed on GitHub Pages from the `main` branch, `docs/` folder:

**https://abdoaddouli.github.io/Salesforce-HeadLess-MCP/**

Deep links use hash routing, so these all work:

- `#/` — dashboard
- `#/phase/rest-api` — a phase overview
- `#/guide/rest-api` — the full markdown guide for a phase
- `#/quiz/rest-api` — phase quiz

## Run locally

The app is fully static. Open it straight from disk, or serve it with any static server:

```bash
# simplest — on Windows
start docs/index.html

# or serve it (keeps guide fetch happy even on file:// quirks)
npx serve docs
```

> Note: the full guide pages fetch `.md` files at runtime (`docs/guide/*.md`). On the published site this works out of the box; when opening `index.html` directly from disk, a plain static server avoids browser-specific `file://` fetch restrictions.

## The 16-phase roadmap

| # | Phase | Lessons | Quiz | Artifacts |
|---|-------|:-------:|:----:|:---------:|
| 01 | Headless Fundamentals | 5 | 4 | 3 |
| 02 | REST API | 5 | 4 | 3 |
| 03 | Apex REST & Custom APIs | 4 | 3 | 3 |
| 04 | GraphQL API | 4 | 3 | 2 |
| 05 | SOAP, Bulk 2.0 & Streaming | 4 | 3 | 2 |
| 06 | Platform Events & CDC | 4 | 3 | 3 |
| 07 | Salesforce Connect & OData | 4 | 3 | 2 |
| 08 | OAuth 2.0 & Security | 3 | 3 | 2 |
| 09 | Headless Commerce & Composable | 3 | 2 | 3 |
| 10 | Serverless & App Platform | 3 | 2 | 2 |
| 11 | MCP Fundamentals | 4 | 3 | 3 |
| 12 | Build MCP Servers | 4 | 3 | 3 |
| 13 | Practical Exercises | 3 | 2 | 2 |
| 14 | Answers & Results | 2 | 2 | 1 |
| 15 | Real-World Use Cases | 4 | 2 | 1 |
| 16 | Use Case Solutions | 2 | 2 | 1 |
| | **Total** | **58** | **44** | **36** |

Each phase has:

- **Lessons** with content blocks (prose, tables, code samples, callouts) — each worth 2 progress units.
- A **full markdown guide** (auto-rendered in-app with a table of contents — reading it marks the whole phase complete).
- A **quiz** with instant feedback and explanations (worth 1 progress unit), scored per attempt, best score saved.
- **Exercise / project cards** (`ex` / `proj`) with step-by-step requirements, a self-graded star rating, and a collapsible **Show answer** keyed to `answers.js`.
- **Artifact links** straight into the repo — one-click hops to the exact Apex class or object the phase is about. 36 entries / 18 unique files.

## Repository structure

```
.
├─ docs/                          # the learning app (served on GitHub Pages)
│  ├─ index.html                  # single-page entry point (hash-routed SPA)
│  ├─ guide/                      # 16 full markdown guides, one per phase
│  └─ assets/
│     ├─ app.js                   # router, renderer, quiz engine, guide renderer
│     ├─ curriculum.js            # all module data (ACADEMY)
│     ├─ answers.js               # exercise answer keys (EXERCISE_ANSWERS)
│     └─ style.css                # theme + component styles
├─ force-app/main/default/        # Salesforce DX source
│  ├─ classes/                    # 15 Apex services + tests
│  ├─ objects/                    # custom objects, events, external object
│  └─ triggers/                   # platform event + CDC automation
├─ manifest/package.xml           # deploy everything at once
├─ config/project-scratch-def.json# scratch org definition
├─ sfdx-project.json              # API 68.0, force-app is the default package
└─ validate-answers.js            # keeps curriculum <-> answers in sync
```

## Inside the interactive app

### How it works

- **Zero dependencies, zero build.** `index.html` loads three scripts: `curriculum.js` (data), `answers.js` (exercise keys), `app.js` (logic). No bundler, no config.
- **Hash routing.** Every view is a URL you can share: dashboard, phase, lesson, quiz, guide (with section anchors like `#/guide/rest-api/oauth`).
- **Progress lives in `localStorage`** (`devacademy-v1`): completed lessons, guide-read flags, best quiz scores, star ratings, and your last-opened position for the "Continue where you left off" card.
- **Progress model:** lessons are worth 2 units each, the quiz 1. A phase is *complete* when all units are earned; reading the full guide marks all its lessons done at once.
- **Guide renderer:** a compact markdown engine (`md()`) renders each `.md` guide with heading TOCs, code fences, tables and task lists — no external markdown library.
- **Search & shortcuts:** press `/` (or `F`) anywhere to search lessons and quiz content; `←` / `→` navigate between lessons; the theme toggle (dark/light) is persisted.
- **Feedback loops:** instant right/wrong states with explanations, per-question progress dots, a confetti burst on a perfect quiz, and toasts throughout.

### Curriculum data model

All course content lives in `docs/assets/curriculum.js` as a single `ACADEMY` array of modules:

```js
{
  id: 'rest-api',          // used in hashes: #/phase/rest-api, #/guide/rest-api
  n: 2,                    // phase number
  title: 'REST API',
  tagline: '...',
  color: '#0ea5e9',        // accent used across the UI
  guide: '02-REST-API.md', // file in docs/guide/, must match exactly
  objectives: [...],
  art: [{ href: 'force-app/.../RestApiService.cls', label: 'RestApiService.cls' }],
  lessons: [{ title, mins, blocks: [...] }],
  quiz:   { title, mins, questions: [{ q, opts, a, why }] }
}
```

Lesson **blocks** are typed objects rendered by `renderBlock()` in `app.js`:

| Type | Renders as | Notes |
|------|-----------|-------|
| `p`, `h`, `list`, `num` | paragraph / sub-heading / bullets / numbered list | |
| `table` | styled data table | `head` + `rows` |
| `code` | copyable code block | `x`, optional `lang` |
| `callout` | tip / warning card | `kind: 'tip' \| 'warn'` |
| `selfcheck` | collapsible "Check yourself" | `q` + `a` |
| `ex` / `proj` | exercise or project card | steps, stars, success criteria, answer |

Exercise cards look up their answer markdown in `docs/assets/answers.js` by id (`C1EX1` … `C16EX1`) and render it with the same markdown engine.

### Adding or editing phases

1. Add / edit modules in `docs/assets/curriculum.js`.
2. If a module references a guide, add or edit the matching `docs/guide/<file>.md` (the exact filename must equal its `guide` field).
3. Add/exercise keys to `docs/assets/answers.js` for any new `ex`/`proj` cards.
4. Run the consistency checks (below) and re-serve.

## The Salesforce DX metadata

The `force-app` package is the "real stuff" behind the course. It compiles against **API version 68.0** and is organized so each phase maps to classes you can open, read, deploy and tweak.

### Custom objects

| Metadata | Role in the course |
|----------|--------------------|
| `Account` (enhanced) | Ships `External_Key__c` and `Health_Score__c`; the demo flow flags account health scores via the score-publishing trigger chain |
| `Headless_Architecture__c` | Reference object for composable / headless architecture building blocks |
| `REST_Integration_Log__c` | Append-only log of inbound REST calls — the raw material for REST API exercises |
| `health_changed__e` | Platform event published on account health changes |
| `CDC__Change_Evaluation__e` | Change Data Capture event used for streaming/CDC lessons |
| `External_Account__x` | External object wired to an external data source — the Salesforce Connect / OData study piece |

### Apex services

API and integration surface:

- `RestApiService` — clean REST API callout patterns (Auth 2.0 handshake + JSON round-trip)
- `CustomRestEndpoint` (+ `CustomRestEndpointTest`) — `@RestResource` global endpoint for inbound requests and its test class
- `GraphQLService` — querying the GraphQL API
- `BulkService` (+ `BulkServiceTest`) — Bulk API 2.0 job orchestration with its test class
- `PlatformEventService` — publishing and subscribing to platform events
- `ConnectService` — external object + Salesforce Connect / OData access
- `AuthService` — OAuth 2.0 flows: JWT bearer, refresh token, and callout headers
- `ServerlessWorker` — HTTP-callable entry point (serverless / App Platform pattern) for long-running work
- `CommerceService` — storefront / composable commerce API patterns
- `IntegrationService` — shared callout plumbing and graceful-failure envelope

Domain services:

- `HeadlessFundamentalsService` — orientation: architecture, mediated vs. unmediated, headless-ready orgs
- `McpFundamentalsService` — the MCP protocol: tools, resources, prompts, transport
- `McpServerService` — a server-side sketch of an MCP server exposing Salesforce tools to clients

### Triggers

- `AccountScorePublisher` — on Account insert/update, computes the health score and publishes `health_changed__e` (REST/event exercise pipeline).
- `HealthChangedLogger` — subscribes in Apex to health events and appends rows to `REST_Integration_Log__c`.

## Deploy to an org

Prereqs: [Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli) and an org (Dev Hub for scratch orgs).

```bash
# 1. authorize
sf org login web -a myorg

# 2. deploy everything in the manifest (classes, objects, triggers, custom metadata...)
sf project deploy start --manifest manifest/package.xml -o myorg

# 3. run the Apex tests
sf apex run test -o myorg --class-names BulkServiceTest,CustomRestEndpointTest --result-format human

# 4. scratch org alternative
sf org create scratch -f config/project-scratch-def.json -a scratch01 --set-default
sf project deploy start -o scratch01
sf org open -o scratch01
```

To round-trip from an org instead:

```bash
sf project retrieve start -o myorg --manifest manifest/package.xml
```

## Consistency checks

A couple of small Node scripts keep the three content layers honest:

```bash
node validate-answers.js   # curriculum exercise ids <-> answers.js keys (15/15)
```

Guide rendering and artifact links are validated with lightweight Node helper scripts as part of the development workflow (every `guide:` field resolves to a file in `docs/guide/`, and every artifact href resolves to a real path in the repo).

---

Built to study Salesforce Headless + MCP end-to-end. Start at the dashboard, follow the phases in order, and finish with practical exercises, real-world use cases, and their canonical solutions.