/* ============================================================================
 * Exercise & mini-project answers for the interactive UI ("Show answer").
 * Each key is an exercise block id declared in curriculum.js (C1EX1 … C17EX1).
 * Bodies use markdown; inline code and fences are escaped so template
 * literals always parse.
 * ============================================================================ */

const EXERCISE_ANSWERS = {

  "C1EX1": {
    title: "Headless 360 architect rules — answer",
    body: `**Apply the 4-layer mediation check to EVERY integration:**

| Question you ask | Layer it gates |
|---|---|
| "Where does the record live?" | Data 360 |
| "Is a platform process involved (invocable/flow)?" | Business Logic 360 |
| "Is this an event/change needing orchestration?" | Orchestration 360 |
| "Is an AI agent / engagement surface calling in?" | Engagement 360 (HXL) |

**Expected result:** you can state, for any tool call, which layer mediates it — and you never push a raw "SELECT *" straight from the UI without a platform check in between.

**Common mistakes:**
- Treating MCP as "just another REST call" — MCP tools are mediated APEX/invocable operations, not raw HTTP passthrough.
- Putting auth at the UI layer instead of the Engagement/Orchestration boundary.
- Forgetting platform events (Orchestration 360) exist for decoupling — falling back to chatty REST polling instead.`,
  },

  "C2EX1": {
    title: "REST endpoint anatomy — answer",
    body: `**Anatomy with version pinning:**
\`\`\`text
https://<my-org>.my.salesforce.com/services/data/v68.0/sobjects/Account/001xxxx
|_________________|  |_____________|  |__|        |       |     |  |____|
  instance host         context path    vers    resource  object  id
\`\`\`

| Part | Rule |
|---|---|
| Host | Always your **instance** URL, never login.salesforce.com for data calls |
| Version | Pin it (v68.0) — "latest" breaks your client on platform upgrades |
| Resource | /sobjects, /query, /queryAll, /search, /composite, /graphql |
| Object | API name (custom objects end in __c) |
| Id | 18-char, case-insensitive safe |

**Expected result:** any data URL you construct starts with \`/services/data/v<ver>/\` immediately after the instance host.

**Common mistakes:**
- Using login.salesforce.com for API calls (it only issues tokens).
- Not URL-encoding the SOQL query string (spaces → %20, quotes → %27).
- Forgetting the trailing content-type/accept headers on PATCH (partial update).`,
  },

  "C3EX1": {
    title: "Apex REST redirect audit — answer",
    body: `**Named Credential + endpoint:**
\`\`\`apex
public with sharing class HealthEndpoint {
  @HttpPost
  global static String post(String payload) {
    HttpRequest req = new HttpRequest();
    req.setEndpoint('callout:External_ERP/health');
    req.setMethod('POST');
    req.setHeader('Content-Type', 'application/json');
    req.setBody(payload trocha);
    return new Http().send(req).getBody();
  }
}
\`\`\`

**Expected result:** no hardcoded URLs/tokens in Apex — Named Credential supplies URL + auth, and the platform refactors it to a full HTTPS endpoint safely.

**Common mistakes:**
- Embedding the token in the class body.
- Using raw \`https://\` instead of \`callout:\` prefix (secrets + endpoint live in one managed place).`,
  },

  "C4EX1": {
    title: "GraphQL nested query — answer",
    body: `**One round trip, nested:**
\`\`\`json
POST /services/data/v68.0/graphql
{ "query": "{ uiapi { query { Account(first: 3) {
    edges { node { Id Name { value }
      Contacts(first: 5) { edges { node { Id LastName { value } } } } } } } } } }" }
\`\`\`

**Expected result:** 3 Accounts with their first 5 Contacts each, all in ONE response — no N+1 of separate Contact calls.

**Common mistakes:**
- Using two REST calls (account list + per-account contact fetch) — that's the chatty thing GraphQL exists to replace.
- Forgetting \`.value\` on scalar custom fields under Android/Schema interface — GraphQL standard fields come back under a \`value\` key.
- Not pinning limits on children (\`first: 5\`) → massive payloads.`,
  },

  "C5EX1": {
    title: "Bulk 2.0 load — answer",
    body: `**Job lifecycle (async, no sync DML limit):**
\`\`\`text
1. POST /services/data/v68.0/jobs/ingest      -> { "id": jobId, "state": "Open" }
2. PUT  /services/data/v68.0/jobs/ingest/<id>/batches   (CSV, <=10k rows/batch)
3. PATCH /services/data/v68.0/jobs/ingest/<id>  { "state": "UploadComplete" }
4. Poll GET .../jobs/ingest/<id>  until "JobComplete"
\`\`\`

**Expected result:** 10M records load asynchronously in batches; state machine Open → UploadComplete → InProgress → JobComplete. No 10k DML-row governor inside a batch.

**Common mistakes:**
- Treating it like REST (sync) — you MUST close the job (UploadComplete) before it processes.
- One giant CSV in a single batch — chunk to ≤1,000,000 characters per batch.
- Ignoring \`numberRecordsProcessed\` / \`numberRecordsFailed\` for verification.`,
  },

  "C6EX1": {
    title: "Event-driven health alert pipeline — answer",
    body: `**Publisher: an after-update trigger that fires only on a score change** (what the trigger-on-update guard controls):
\`\`\`apex
trigger AccountScorePublisher on Account (after update) {
  List<health_changed__e> events = new List<health_changed__e>();
  for (Account a : Trigger.new) {
    Account old = Trigger.oldMap.get(a.Id);
    if (a.Health_Score__c != old.Health_Score__c) {
      events.add(new health_changed__e(
        AccountId__c = a.Id,
        New_Score__c  = a.Health_Score__c,
        Old_Score__c  = old.Health_Score__c
      ));
    }
  }
  if (!events.isEmpty()) {
    List<Database.SaveResult> results = EventBus.publish(events);
    for (Database.SaveResult r : results) System.assert(r.isSuccess(), 'event dropped: ' + r.getErrors()[0].getMessage());
  }
}
\`\`\`

**Subscriber: an after-insert trigger on the event that logs the change.**
\`\`\`apex
trigger HealthChangedLogger on health_changed__e (after insert) {
  List<REST_Integration_Log__c> logs = new List<REST_Integration_Log__c>();
  for (health_changed__e e : Trigger.new) {
    logs.add(new REST_Integration_Log__c(
      AccountId__c      = e.AccountId__c,
      Event_Type__c     = 'HealthChanged',
      Status__c         = 'PROCESSED',
      Observed_Score__c = e.New_Score__c
    ));
  }
  insert logs;
}
\`\`\`

**Verify (anonymous script):** update one Account's \`Health_Score__c\`, wait a beat, then:
\`\`\`soql
SELECT Id, AccountId__c, Observed_Score__c FROM REST_Integration_Log__c ORDER BY CreatedDate DESC LIMIT 5
\`\`\`

**Expected result:** a single score change produces exactly ONE log record — no log when the score is untouched, because the trigger guard only publishes on a real delta (the "verify exactly one log per change" contract).

**Common mistakes:**
- Publishing on every update (insert/irrelevant fields) → duplicate/phantom events.
- Forgetting to assert \`isSuccess()\` so swallowed events fail loudly.
- Trying to DML the log from the same transaction/trigger recursion instead of the async subscriber.`,
  },

  "C7EX1": {
    title: "Salesforce Connect external objects — answer",
    body: `**OData: enable the system OData URL** in Setup ▸ Salesforce Connect, then:
\`\`\`text
1. Create External Data Source (type: OData 4.0, URL of the endpoint)
2. Validate & Sync  -> external objects appear (__x suffix)
3. Query via SOQL:  SELECT Id, Name__c, Status__c FROM HealthRecord__x
\`\`\`

**Expected result:** external records federate LIVE (no copy) — updates in the source show up on next query; read-only policy by default.

**Common mistakes:**
- Confusing external objects (__x, virtual, no storage) with custom objects (__c, stored).
- Expecting roll-up summaries / reports on external objects (not supported — virtual data).
- Forgetting FLS + sharing on the external data source per user.`,
  },

  "C8EX1": {
    title: "Named Credential + secure callout — answer",
    body: `**Named Credential (Setup ▸ Named Credentials):**
\`\`\`text
Label: External_ERP      URL: https://api.erp.example.com
Auth:  OAuth 2.0 / JWT   (token lives in the NC, not in code)
\`\`\`

**Apex call:**
\`\`\`apex
public with sharing class ErpCalloutService {
  public static String getHealth(String accountId) {
    HttpRequest req = new HttpRequest();
    req.setEndpoint('callout:External_ERP/health/' + accountId);
    req.setMethod('GET');
    req.setHeader('Accept', 'application/json');
    return new Http().send(req).getBody();
  }
}
\`\`\`

**Expected result:** endpoint + auth centralized in the Named Credential; Apex references only \`callout:External_ERP/...\` — zero secrets in source.

**Common mistakes:**
- Hardcoding the bearer token or the full URL in Apex.
- Not enabling "Allow Merge" / using schema dry-run without FLS check.
- Skipping the mock callout in tests (need \`Test.setMock(HttpCalloutMock.class, ...)\`).`,
  },

  "C9EX1": {
    title: "Headless commerce storefront — answer",
    body: `**Commerce API surface (composable):**
\`\`\`text
1. Hosted catalog   -> GET /services/data/v68.0/commerce/webstores/<id>/products
2. Cart            -> POST .../carts                     (create cart)
   PUT  .../carts/<id>/cart-items                        (add item)
3. Checkout        -> POST .../carts/<id>/checkout
4. Orders          -> GET .../orders/<id>
\`\`\`

**Expected result:** a headless storefront drives catalog/cart/checkout through Commerce APIs with no storefront pages hosted in Salesforce — mobile/React/Express can all compose the same cart.

**Common mistakes:**
- Assuming Commerce Cloud requires the hosted storefront (it doesn't — headless is the point).
- Ignoring cart-scoped auth — every cart op needs the shopper identity (guest token or customer access token).
- Forgetting merchant metadata / pricebooks — catalog reads need pricebook context.`,
  },

  "C10EX1": {
    title: "Serverless & app platform — answer",
    body: `**Express worker pattern:**
\`\`\`text
1. Create Salesforce-based Apex REST surface  (services/data/.../sobjects/Account)
2. Express worker (Node) talks out to that REST surface
3. OAuth2 client-credentials or JWT bearer from the worker
4. Deploy worker as Salesforce Functions or Heroku
\`\`\`

**Expected result:** platform logic stays in Salesforce; CPU/long-running + polyglot work moves to a serverless worker that calls Salesforce API — clean separation, no platform governor limits on the worker.

**Common mistakes:**
- Trying to do long-running work inside Apex queueables when the app needs true stateless scale.
- Embedding credentials in the worker repo.
- Not using a Named Credential / connected app for the worker's OAuth.`,
  },

  "C11EX1": {
    title: "MCP server fundamentals — answer",
    body: `**MCP in one diagram:**
\`\`\`text
AI Client (Agentforce / Claude / custom)
         |  MCP protocol (JSON-RPC 2.0)
         v
   MCP Server  (hosted by Salesforce or self-hosted)
         |  mediated tool calls -> platform APIs
         v
   Salesforce (requests, invocable actions, SOQL/CRUD, events)
\`\`\`

**Expected result:** you can place the MCP server between any AI client and Salesforce, exposing typed tools, and describe the three MCP primitives: TOOLS (callable actions), RESOURCES (readable data), PROMPTS (reusable instructions).

**Common mistakes:**
- Treating MCP server as a plain REST endpoint (it has its own discovery/JSON-RPC contract).
- Exposing raw query access instead of mediated tools.
- Forgetting to declare input schemas (Zod) so the agent knows how to call your tool.`,
  },

  "C12EX1": {
    title: "Build an MCP server for Salesforce — answer",
    body: `**TypeScript, @modelcontextprotocol/sdk:**
\`\`\`ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "sf-health", version: "1.0.0" });

server.tool("get_account_health",
  { accountId: z.string() },
  async ({ accountId }) => ({
    content: [{ type: "text", text: \`health of \${accountId} = 92\` }],
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

**Expected result:** an MCP client (Agentforce or any JSON-RPC MCP host) can list your \`get_account_health\` tool and invoke it, and the tool can call Salesforce via jsforce / hosted MCP backend.

**Common mistakes:**
- Missing the Zod schema — agent can't discover params.
- Not testing with a real MCP client.
- Hardcoding tokens in the server (use env vars / Salesforce-hosted mediation).`,
  },

  "C14EX1": {
    title: "Mini project strategy — answer",
    body: `**Pick MP1 = "Health score widget"** (small, observable, all layers):
\`\`\`text
1. REST: GET /services/data/v68.0/sobjects/Account/001xxx  (read health field)
2. Apex REST: custom /health endpoint that clamps 0-100
3. LWC/Aura: display score + a refresh button
4. GraphQL (bonus): read health + related contacts in one call
\`\`\`

**Expected result:** one self-contained mini project that exercises REST + Apex REST + a UI component + a test — ideal first capstone because each layer is verifiable alone.

**Common mistakes:**
- Starting with the hardest scenario (full storefront) before the health widget.
- Only reading via REST and skipping the Apex REST write path (upsert by external key).
- No test class → can't prove behavior.`,
  },

  "C16EX1": {
    title: "Real-world use case — answer",
    body: `**Use case: insurance claims app needs live account + health data on mobile.**
\`\`\`text
Client  ->  GET /services/data/v68.0/graphql   (nested account + contacts, 1 call)
        ->  POST /services/data/v68.0/sobjects/Claim__c  (create claim)
        ->  platform events: Claim_Event__e  (notify adjuster via CDC/subscriber)
\`\`\`

**Expected result:** the mobile app gets account + related health + contacts in one GraphQL round trip, writes claims via REST, and adjusters react through platform events — no screen/server-side pages in Salesforce.

**Common mistakes:**
- Choosing SOQL/REST over GraphQL for multi-relationship reads (chatty).
- Polling for updates instead of subscribing to platform events/CDC.
- Leaving confidential fields exposed without FLS + maybeAuth on the API call.`,
  },

  "C17EX1": {
    title: "Use-case solution walkthrough — answer",
    body: `**Compare against the canonical in the phase guide:**
\`\`\`text
1. Requirements → 2. API & layer choice → 3. Security → 4. Test → 5. Trade-offs
\`\`\`

**Expected result:** you can explain, per scenario:
- which Headless 360 layer mediates it
- which API (REST / GraphQL / Bulk / Streaming / MCP) fits
- how sharing/FLS/callouts are secured
- why a different choice would be worse (the "why not" matters most)

**Common mistakes:**
- Naming an API without justifying the layer and limits.
- Skipping the security section entirely.
- Not linking artifact → answer key so an interviewer can verify.`,
  },

};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EXERCISE_ANSWERS };
}
