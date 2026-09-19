# Session Memory — SalesForce Headless & MCP Learning App (RESUME HERE)

> Written: end of the "finish the buildout" session — read this before doing ANYTHING.
> Purpose: record that the static app + guides + force-app are complete and verified; only git commit/push decisions remain.

---

## 1. Project facts

- **Project root (use this as `workdir` for every command):**
  `C:\Users\addou\OneDrive\Bureau\Salesforce Abdo Academy\Salesforce HeadLeess and MCP\Salesforce headless & MCP`
- Path contains spaces AND an `&`. Always pass it as the tool's `workdir`; never `cd` inside commands.
- **Static study app** (no build step, no server): open `docs/index.html` directly in a browser.
- Reference repo slug: **`AbdoAddouli/Salesforce-HeadLess-MCP`** (one `e`, capital `L`).

---

## 2. ✅ Git status (was the critical gotcha; now DONE)

- `git init` ran **inside the project root**. `git rev-parse --show-toplevel` now prints the project root, NOT `C:/Users/addou`.
- Remote set to the verified-correct upstream: `https://github.com/AbdoAddouli/Salesforce-HeadLess-MCP.git`.
- Branch renamed to `main` to match the remote default.
- **NOTHING has been committed or pushed yet.** The user must confirm before any commit/push (see §7).

---

## 3. What is DONE and VERIFIED working (this session)

| Area | Status | Notes |
|---|---|---|
| `docs/` app (index.html, app.js, curriculum.js, answers.js, style.css) | ✅ already done + re-verified | All 3 JS files pass `node --check`. |
| **Answers contract** | ✅ fixed + verified | Real facts: curriculum has **15** exercise blocks (`C1EX1…C17EX1`, minus C13/C15), NOT 17. `C6EX1` was **missing** from answers.js → fixed by adding a full publish+log answer. `node validate-answers.js` → **15 exercise ids, 15 answer keys, MISSING: NONE**. |
| **Curriculum naming fix** | ✅ | Phase 6 exercise now says `REST_Integration_Log__c` (matches the object force-app ships) instead of `IntegrationLog__c`. |
| **17 guides** | ✅ created + verified | Authored in `developer Headless and MCP Roadmap/`, copied to `docs/guide/`. Exact filenames **from curriculum `guide:` fields** (memory draft had 2 wrong names; actual are `09-Headless-Commerce-and-Composable.md`, `13-Certification-Prep.md`, etc.). Verified: roadmap=17, guide=17, names match, curriculum references all resolve (`check-guides.js` → 17/17). All 17 render through the app's real `md()` engine with TOCs (render-check). |
| **force-app metadata** | ✅ created | 16 classes, 6 objects, 2 triggers, 2 customMetadata files (28 files). All curriculum `art` hrefs that point into the repo resolve — `check-art.js` → **39/39**. |
| **manifest/package.xml** | ✅ updated | Added `CustomMetadata` + `CustomObject` types. |
| **Git gotcha resolved** | ✅ | See §2. `.gitignore` already covers `.sf/`, `.sfdx/`. |

Files shipped in `force-app`:
- **classes/** — `HeadlessFundamentalsService`, `RestApiService`, `CustomRestEndpoint` (+`CustomRestEndpointTest`), `GraphQLService`, `BulkService` (+`BulkServiceTest`), `PlatformEventService`, `ConnectService`, `AuthService`, `IntegrationService`, `CommerceService`, `ServerlessWorker`, `McpFundamentalsService`, `McpServerService`, `CertificationService`.
- **objects/** — `Account.object` (custom fields `External_Key__c`, `Health_Score__c`), `Headless_Architecture__c`, `REST_Integration_Log__c`, `health_changed__e`, `CDC__Change_Evaluation__e`, `External_Account__x`.
- **triggers/** — `AccountScorePublisher.trigger` (Account after update → publish `health_changed__e` only on score delta), `HealthChangedLogger.trigger` (`health_changed__e` after insert → write `REST_Integration_Log__c`).
- **customMetadata/** — `HeadlessArchitectExamFacts` type + `Default` record (60 Q / 120 min / 5 domain weights).

Verification helper scripts live in `C:\Users\addou\AppData\Local\Temp\opencode\`:
`check-guides.js`, `check-art.js`, `render-check.js`. Root `validate-answers.js` is now the canonical answers-coverage check.

> Caveat: Apex classes/tests are syntactically authored and conceptually verified, but NOT compiled against a real org. `CustomRestEndpointTest` uses the proper RestContext pattern (no fake callout classes). First `sfdx force:source:deploy -u <scratch>` will be the true compile gate. `<ExternalAccountDataSource>` is referenced by `External_Account__x` but no external data source metadata file is shipped — acceptable for a study skeleton (Connect is configured in Setup), but note it.

---

## 4. Known / acceptable limitations

- `force-app/main/default/classes/ServerlessWorker.cls` is an Apex-side sketch of the Node worker concept (curriculum art maps `app_worker.mjs (serverless/ folder)` → this class); the real `.mjs` lives in the guides as a code sample (phase 10).
- `docs/guide/*.md` and roadmap folder are intentionally identical (mirror of the reference layout).
- The `*.md` guides render with the app's markdown engine (tables, fences, lists, task lists supported).

---

## 5. Working environment gotchas (still true — obey these)

1. **PowerShell 5.1 + `node -e "…"` is a quoting nightmare.** Do not fight it — Write helper `.js` into `C:\Users\addou\AppData\Local\Temp\opencode`, then run `node <helper>.js`.
2. Commands with many `"` inside a single `-c` will fail; split into Write+run steps.
3. Confirm writes by listing counts/sizes (OneDrive + relative-path pitfalls).
4. `rg` is NOT installed on this machine — use the Grep tool instead.

---

## 6. One-line verification recipes (re-run freely)

- **Answers coverage:** `node validate-answers.js` → expect 15/15, MISSING: NONE.
- **Guides count:** `(Get-ChildItem docs\guide -File).Count` → 17; same for `developer Headless and MCP Roadmap`.
- **Art hrefs:** `node "C:\Users\addou\AppData\Local\Temp\opencode\check-art.js"` → 39/39.
- **Guide render:** `node "C:\Users\addou\AppData\Local\Temp\opencode\render-check.js"` → ALL GUIDES RENDER CLEANLY.
- **Git sanity:** from project root, `git rev-parse --show-toplevel` → prints the project root.

---

## 7. ❗ REMAINING — user decision required (do NOT act without it)

1. **Commit locally?** Everything is untracked (20 items incl. `/docs/`, guides, force-app). Suggested message style (single commit):
   `feat: complete Headless & MCP learning app — docs app, 17 guides, force-app metadata`
   - Optionally stage only `docs/ developer Headless and MCP Roadmap/ force-app/ manifest/` + root config; the `scripts/apex`, `scripts/soql`, `validate-answers.js` SFDX leftovers are harmless (keep or delete).
2. **Push to `origin/main` (the empty upstream)?** The remote `Salesforce-HeadLess-MCP` exists and is empty; first push with `-u origin main`.
3. **Enable GitHub Pages?** Docs-only static site; nothing has been enabled so far.
4. If pushing: confirm GitHub auth works (credential manager / `gh auth status`).