/* ============================================================================
 * Headless & MCP Academy - Curriculum data
 * 16 phases following the `developer Headless and MCP Roadmap/` guides. Content
 * is condensed from the phase guides and points back to the real repo artifacts.
 * ============================================================================
 */

const GUIDE = 'https://github.com/AbdoAddouli/Salesforce-HeadLess-MCP/blob/main/developer%20Headless%20and%20MCP%20Roadmap/';

const ACADEMY = [

/* -------------------------------------------------------------------------- */
/* PHASE 1 - HEADLESS FUNDAMENTALS                                             */
/* -------------------------------------------------------------------------- */
{
  id: 'headless-fund',
  n: 1,
  title: 'Headless Fundamentals',
  icon: '01',
  color: '#0B5CAB',
  tagline: 'API-first platform, Headless 360, architecture layers',
  guide: '01-Headless-Fundamentals.md',
  art: [
    { label: 'HeadlessFundamentalsService.cls', href: 'force-app/main/default/classes/HeadlessFundamentalsService.cls' },
    { label: 'config/project-scratch-def.json', href: 'config/project-scratch-def.json' },
    { label: 'Headless_Architecture__c (objects/)', href: 'force-app/main/default/objects/' },
  ],
  objectives: [
    'Explain what headless means: any front-end, decoupled from the platform UI',
    'Describe Headless 360: Data, Business Logic, Orchestration and Engagement layers',
    'Name the layers and where each public API lives',
    'Pick an integration pattern (REST, GraphQL, Bulk, Streaming) for a use case',
    'Understand platform-hosted MCP servers as the newest engagement layer',
  ],
  lessons: [
    {
      title: 'What Headless Really Means', mins: 8,
      blocks: [
        { t: 'p', x: 'Headless means the presentation layer is decoupled from the platform that provides data and logic. You build any UI — React, Next.js, a mobile app, an Express worker, a CLI, an Agent — and consume Salesforce through APIs. Salesforce never renders the screen.' },
        { t: 'table', head: ['Traditional (LWC/Aura)', 'Headless'], rows: [
          ['UI rendered by Salesforce', 'UI rendered by your stack'],
          ['Session on platform', 'OAuth token on client'],
          ['UI + logic tightly coupled', 'API is the UI'],
          ['Model View Controller (MVC)', 'Client (fetch) + API + platform'],
        ]},
        { t: 'callout', kind: 'tip', x: 'Headless never means "without Salesforce". It means "without Salesforce UI". All the platform power — security, sharing, automation, data — stays on and is exposed via APIs.' },
        { t: 'selfcheck', q: 'A React storefront reads products via Fetch REST middleware. Is this headless?', a: 'Yes. The UI lives off-platform and consumes Salesforce via an API.' },
      ]
    },
    {
      title: 'The Headless 360 Architecture', mins: 8,
      blocks: [
        { t: 'p', x: 'Salesforce Headless 360 (announced at TDX 2026) turns the platform into composition-ready building blocks behind one API surface. Four layers:' },
        { t: 'list', items: [
          'Data 360 — the metadata and data services (REST, GraphQL, Bulk, SOQL)',
          'Business Logic 360 — Apex, flows, invocable actions, functions',
          'Orchestration 360 — inbound/outbound composition, event mesh, agents',
          'Engagement 360 — the headless engagement layer (HXL) that fronts everything',
        ]},
        { t: 'code', lang: 'text', x: `Your UI / App / Agent  (any framework)
        |
        |  HTTP + OAuth
        v
( Engagement 360 / HXL )  <- platform-hosted MCP servers + tools
        |
        v
( Orchestration 360 )  <- event mesh, platform events, agents
        |
        v
( Business Logic 360 ) <- Apex, flows, invocable actions
        |
        v
( Data 360 )           <- REST, GraphQL, Bulk, SOQL, records API` },
        { t: 'callout', kind: 'warn', x: 'Exams and interviews expect the LAYERS and where each one exposes its API. Data lives in Data 360; MCP tools are hosted in the Engagement layer, not in Data 360.' },
      ]
    },
    {
      title: 'Do I Need a Framework?', mins: 7,
      blocks: [
        { t: 'p', x: 'HTTP + JSON is the baseline. But production headless apps benefit from an SDK or data fetcher that handles auth, caching, batching and errors for you.' },
        { t: 'table', head: ['Tool', 'What it gives you'], rows: [
          ['Fetch API (JS)', 'Built-in client, zero deps'],
          ['Salesforce JS SDK (jsforce)', 'Auth, CRUD, bulk, streaming on Node + browser'],
          ['@salesforce/sdk (composable)', 'Composable commerce storefront client'],
          ['GraphQL clients (Relay/urql)', 'Declarative data fetching for the GraphQL API'],
        ]},
        { t: 'selfcheck', q: 'When is plain fetch enough?', a: 'For small demos and single calls. Production apps with batch/streaming/auth flows usually adopt an SDK or a thin client layer.' },
      ]
    },
    {
      title: 'Choosing the Right API', mins: 6,
      blocks: [
        { t: 'table', head: ['Need', 'Best-fit API'], rows: [
          ['CRUD on records', 'REST API / GraphQL'],
          ['Nested related data in one round trip', 'GraphQL'],
          ['Backfill 10M records', 'Bulk API 2.0'],
          ['Subscribe to changes in real time', 'Streaming API / Platform Events'],
          ['Call Apex as an endpoint', 'Apex REST'],
          ['Lambda-like custom logic off-platform', 'Functions / Express worker'],
        ]},
        { t: 'callout', kind: 'tip', x: 'Exams love this table in reverse: given a scenario, pick the API. Practice the matching until it is instant.' },
        { t: 'selfcheck', q: 'You must push 2M Accounts each night. Which API?', a: 'Bulk API 2.0 — async, batched, designed for high-volume backfills.' },
      ]
    },
    {
      title: 'Exercise — Map the Layers', mins: 6,
      blocks: [
        { t: 'ex', id: 'C1EX1', title: 'Headless 360 layer matching', obj: 'Match each capability to the correct Headless 360 layer.', kind: 'matching',
          pairs: [
            ['SOQL query over Account', 'Data 360'],
            ['Invocable Apex action', 'Business Logic 360'],
            ['Event mesh / platform events', 'Orchestration 360'],
            ['Platform-hosted MCP tools', 'Engagement 360'],
          ],
          verify: 'All four pairs are correct; double-check the invocable action goes to Business Logic.' },
      ]
    },
  ],
  quiz: {
    title: 'Phase 1 Quiz - Headless Fundamentals', mins: 5,
    questions: [
      { q: 'Headless means the platform is...',
        opts: ['removed from the solution', 'decoupled from the UI (API is the UI)', 'running a different database', 'only for mobile'], a: 1, why: 'Headless keeps all platform power but decouples the presentation layer; the API becomes the UI.' },
      { q: 'Where do platform-hosted MCP servers live in Headless 360?',
        opts: ['Data 360', 'Business Logic 360', 'Engagement (HXL) 360', 'Orchestration 360 only'], a: 2, why: 'MCP servers + tools are hosted in the headless engagement layer.' },
      { q: 'Backfilling 5M Leads nightly is best done with...',
        opts: ['SOAP', 'Bulk API 2.0', 'GraphQL', 'Apex REST'], a: 1, why: 'Bulk API 2.0 is designed for high-volume asynchronous data operations.' },
      { q: 'A GraphQL query returning related records in one round trip replaces...',
        opts: ['Bulk loads', 'multiple REST get calls', 'platform events', 'password flow'], a: 1, why: 'GraphQL fetches nested data in a single request the way REST chains cannot.' },
    ]
  }
},

/* -------------------------------------------------------------------------- */
/* PHASE 2 - REST API FUNDAMENTALS                                             */
/* -------------------------------------------------------------------------- */
{
  id: 'rest-api',
  n: 2,
  title: 'REST API',
  icon: '02',
  color: '#0E9AA7',
  tagline: 'CRUD, query, versions, limits, composite',
  guide: '02-REST-API.md',
  art: [
    { label: 'RestApiService.cls', href: 'force-app/main/default/classes/RestApiService.cls' },
    { label: 'REST_Integration_Log__c (objects/)', href: 'force-app/main/default/objects/' },
    { label: 'rest-tests/ Answers (Apt2)', href: 'docs/assets/answers.js' },
  ],
  objectives: [
    'Construct a URL against the REST endpoint /services/data/vXX.X/',
    'Perform CRUD via GET/POST/PATCH/DELETE',
    'Use composite and composite-tree requests',
    'Read query and search endpoints (sobjects, query, search)',
    'Handle pagination, limits and error payloads',
  ],
  lessons: [
    {
      title: 'The Endpoint & Auth', mins: 8,
      blocks: [
        { t: 'p', x: 'The base URL is https://yourInstance.salesforce.com/services/data/v68.0/. Everything below that root is versioned and JSON. You authenticate with an OAuth 2.0 access token in the Authorization: Bearer header.' },
        { t: 'code', lang: 'bash', x: `curl https://MY-INSTANCE.salesforce.com/services/data/v68.0/sobjects/Account \\
  -H "Authorization: Bearer 00D5g00000abcdef!AQo..."` },
        { t: 'table', head: ['Path', 'Meaning'], rows: [
          ['/services/data/v68.0/sobjects', 'List all objects'],
          ['/services/data/v68.0/sobjects/Account', 'Describe Account'],
          ['/services/data/v68.0/sobjects/Account/<id>', 'Get one record'],
          ['/services/data/v68.0/query?q=<SOQL>', 'Run a SOQL query'],
        ]},
        { t: 'callout', kind: 'tip', x: 'Always use the apiVersion pin (v68.0) not "latest". "latest" breaks your client when the platform upgrades.' },
      ]
    },
    {
      title: 'CRUD in Practice', mins: 8,
      blocks: [
        { t: 'code', lang: 'bash', x: `# Create - returns the new record id
curl -X POST .../sobjects/Account -H "Content-Type: application/json" \\
  -d '{"Name":"Acme","Health_Score__c":82}'

# Read
curl .../sobjects/Account/001xx

# Update (PATCH - partial)
curl -X PATCH .../sobjects/Account/001xx \\
  -d '{"Health_Score__c":91}'

# Delete
curl -X DELETE .../sobjects/Account/001xx` },
        { t: 'callout', kind: 'warn', x: 'PATCH only sends changed fields; PUT is not used for records. If a field read back differs from what you set, check field-level security (FLS) not your JSON.' },
        { t: 'selfcheck', q: 'Which HTTP verb updates a Salesforce record?', a: 'PATCH (partial update). DELETE deletes; POST creates.' },
      ]
    },
    {
      title: 'Query, Pagination & Limits', mins: 8,
      blocks: [
        { t: 'code', lang: 'bash', x: `curl ".../query?q=SELECT+Id,Name+FROM+Account+LIMIT+50"

{
  "totalSize": 1234,
  "done": false,
  "nextRecordsUrl": "/services/data/v68.0/query/01g...-2000",
  "records": [ ... ]
}` },
        { t: 'p', x: 'query returns at most 2000 records per page. Follow nextRecordsUrl until done=true. queryAll includes deleted + archived (undeleted via /queryAll).' },
        { t: 'table', head: ['Limit', 'Value'], rows: [
          ['Query rows per request', '2000'],
          ['QueryAll rows per request', '2000 (with deleted)'],
          ['Bulk API 2.0 rows per job (query)', '15,000,000'],
          ['Retrieve/`/sobjects/<obj>` default fields', '200'],
        ]},
      ]
    },
    {
      title: 'Composite Requests', mins: 7,
      blocks: [
        { t: 'p', x: 'Composite lets you chain up to 25 subrequests in ONE call sharing headers and auth — a big win for latency. Use :refN to reference a subrequest result, including generated IDs.' },
        { t: 'code', lang: 'json', x: `POST /services/data/v68.0/composite
{
  "compositeRequest": [
    { "method": "POST", "url": "/services/data/v68.0/sobjects/Account",
      "referenceId": "acct", "body": { "Name": "Acme" } },
    { "method": "POST", "url": "/services/data/v68.0/sobjects/Contact",
      "referenceId": "cont",
      "body": { "LastName": "Doe", "AccountId": "@acct@id" } }
  ],
  "allOrNone": true
}` },
        { t: 'selfcheck', q: 'How do you wire the created Account ID into a Contact in composite?', a: 'Give the Account a referenceId (acct) and use @acct@id in the Contact body.' },
      ]
    },
    {
      title: 'Exercise — Build a REST Client', mins: 8,
      blocks: [
        { t: 'ex', id: 'C2EX1', title: 'REST CRUD + composite', obj: 'Use your favorite HTTP client to create an Account, update it, then read all fields.', reqs: [
          'Create Account {\"Name\":\"Acme\"} via POST /sobjects/Account',
          'PATCH Health_Score__c to 88',
          'GET the record back and assert the score',
          'Optional: refactor to a composite request with a Contact',
        ], verify: '200 status + an Id on create; PATCH returns 204; GET returns Health_Score__c = 88.', stars: 3, code: 'POST /services/data/v68.0/sobjects/Account' },
      ]
    },
  ],
  quiz: {
    title: 'Phase 2 Quiz - REST API', mins: 5,
    questions: [
      { q: 'The REST base URL must include...',
        opts: ['your instance + /services/data/v68.0/', 'your org id only', 'a SOQL string', 'the session id'] , a: 0, why: 'The base is <instance>/services/data/vXX.X/ with the version pinned.' },
      { q: 'To update a single field you use...',
        opts: ['POST', 'PATCH', 'PUT', 'DELETE'], a: 1, why: 'PATCH performs partial updates on a record.' },
      { q: 'A query with 6000 matches returns...',
        opts: ['all in one payload', 'pages of 2000 until done=true', 'only 200', 'an error'], a: 1, why: 'GET query returns 2000 rows per page with a nextRecordsUrl.' },
      { q: 'Composite lets you...',
        opts: ['run 25 subrequests in one call', 'stream events', 'bulk load files', 'use SOAP'], a: 0, why: 'Composite batches up to 25 subrequests sharing auth and headers.' },
    ]
  }
},

/* -------------------------------------------------------------------------- */
/* PHASE 3 - APEX REST & CUSTOM APIS                                          */
/* -------------------------------------------------------------------------- */
{
  id: 'apex-rest',
  n: 3,
  title: 'Apex REST & Custom APIs',
  icon: '03',
  color: '#7C3AED',
  tagline: '@RestResource, @HttpPost, JSON, custom endpoints',
  guide: '03-Apex-REST-and-Custom-APIs.md',
  art: [
    { label: 'CustomRestEndpoint.cls', href: 'force-app/main/default/classes/CustomRestEndpoint.cls' },
    { label: 'CustomRestEndpointTest.cls', href: 'force-app/main/default/classes/CustomRestEndpointTest.cls' },
    { label: 'OpenAPI / Postman artifact', href: 'docs/assets/answers.js' },
  ],
  objectives: [
    'Expose Apex with @RestResource(urlMapping=...)',
    'Handle JSON in and out with System.JSON',
    'Return proper HTTP status codes',
    'Secure your endpoint (with sharing, whitelisting, CORS)',
    'Write tests that cover happy + error paths',
  ],
  lessons: [
    {
      title: 'Defining Your Endpoint', mins: 8,
      blocks: [
        { t: 'code', lang: 'apex', x: `@RestResource(urlMapping='/acme/health/v1/*')
global with sharing class CustomRestEndpoint {

  @HttpPost
  global static HealthResponse upsertHealth(HealthRequest req) {
    if (req == null) throw new RestRequestException('Missing body');
    ...
    return new HealthResponse(ok, message);
  }
}` },
        { t: 'p', x: 'urlMapping is relative to /services/apexrest/ so this class is reachable at /services/apexrest/acme/health/v1/*. Annotations: @HttpGet, @HttpPost, @HttpPut, @HttpPatch, @HttpDelete.' },
        { t: 'callout', kind: 'warn', x: 'Method names are arbitrary — the HTTP verb comes from the annotation pairing. Map one method per verb per URL.' },
      ]
    },
    {
      title: 'Reading & Writing JSON', mins: 7,
      blocks: [
        { t: 'code', lang: 'apex', x: `global class HealthRequest {
  global String accountId;
  global Integer score;
}

// from incoming body
HealthRequest req = (HealthRequest) JSON.deserialize(
  RestContext.request.requestBody.toString(), HealthRequest.class);

// build outgoing JSON
String body = JSON.serialize(new HealthResponse(true, 'Ok'));` },
        { t: 'callout', kind: 'tip', x: 'Version your payloads. Public REST APIs should put a version in the URL (/v1) and never break existing consumers on a breaking field change.' },
      ]
    },
    {
      title: 'Status Codes & Errors', mins: 7,
      blocks: [
        { t: 'table', head: ['Case', 'Code'], rows: [
          ['Success', '200 / 201 Created'],
          ['Created in POST', '201'],
          ['Wrong input', '400 Bad Request'],
          ['Not authenticated', '401 Unauthorized'],
          ['Forbidden', '403 Forbidden'],
          ['Not found', '404 Not Found'],
          ['Server error', '500'],
        ]},
        { t: 'code', lang: 'apex', x: `global static HttpResponse myGet() {
  RestResponse res = RestContext.response;
  res.statusCode = 404;
  res.responseBody = Blob.valueOf('Not found');
  return res;
}` },
      ]
    },
    {
      title: 'Exercise — Apex Health Endpoint', mins: 9,
      blocks: [
        { t: 'ex', id: 'C3EX1', title: 'Health score upsert API', obj: 'Expose an endpoint that upserts an Account by external key and returns the new score.', reqs: [
          '@RestResource(urlMapping=\'/acme/health/v1/*\')',
          '@HttpPost accepting {externalId, score}',
          'Upsert on Id or External_Key__c',
          'Return JSON {id, score} with 201 on create, 200 on update',
          'with sharing + a test covering both paths',
        ], verify: 'POST returns created Id (201) the first time grave 200 afterwards; test passes with coverage.', stars: 3, code: '@RestResource(urlMapping=\'/acme/health/v1/*\')' },
      ]
    },
  ],
  quiz: {
    title: 'Phase 3 Quiz - Apex REST', mins: 5,
    questions: [
      { q: 'A class serving POSTs declares...',
        opts: ['@HttpPost method', 'static void', 'AuraEnabled', 'ContactPointType'], a: 0, why: 'The HTTP verb is chosen by the annotation on the global method.' },
      { q: 'The full URL for urlMapping=\'/acme/health/v1/*\' is...',
        opts: ['/services/apexrest/acme/health/v1/*', '/services/data/v68.0/acme', '/acme/health', '/apex/acme'], a: 0, why: 'Apex REST mounts under /services/apexrest/ + the mapping.' },
      { q: 'To forbid a caller you return...',
        opts: ['403', '200', '204', '301'], a: 0, why: '403 Forbidden signals the caller is authenticated but not allowed.' },
    ]
  }
},

/* -------------------------------------------------------------------------- */
/* PHASE 4 - GRAPHQL API                                                       */
/* -------------------------------------------------------------------------- */
{
  id: 'graphql',
  n: 4,
  title: 'GraphQL API',
  icon: '04',
  color: '#0EA5E9',
  tagline: 'Query, mutate, fragments, one round trip',
  guide: '04-GraphQL-API.md',
  art: [
    { label: 'GraphQLService.cls', href: 'force-app/main/default/classes/GraphQLService.cls' },
    { label: 'GraphQL exercise (Avp4)', href: 'docs/assets/answers.js' },
  ],
  objectives: [
    'POST a GraphQL query to /services/data/v68.0/graphql',
    'Read nested related records without client joins',
    'Use fragments and variables for reusable queries',
    'Run mutations for writes',
    'Handle validation and partial errors',
  ],
  lessons: [
    {
      title: 'The GraphQL Endpoint', mins: 8,
      blocks: [
        { t: 'code', lang: 'graphql', x: `POST /services/data/v68.0/graphql
Authorization: Bearer <token>
Content-Type: application/json

{
  "query": "query { uiapi { query { Account(first: 5) {
              edges { node { Id Name { value } } } } } } }"
}` },
        { t: 'p', x: 'Salesforce GraphQL API models records as nodes/edges. Access is behind the uiapi namespace so respect field-level security — you only see fields your user can.' },
        { t: 'callout', kind: 'tip', x: 'GraphQL shines for dashboards and mobile lists: define exactly the fields you need (no over-fetching) and traverse relationships in one round trip.' },
      ]
    },
    {
      title: 'Fragments & Variables', mins: 7,
      blocks: [
        { t: 'code', lang: 'graphql', x: `query GetAccounts($n: Int!){
  uiapi {
    query {
      Account(first: $n) {
        edges { node { Id  name: Name { value } } }
      }
    }
  }
}` },
        { t: 'selfcheck', q: 'Why put a $variable for the limit?', a: 'Reusable, cache-friendly, and avoids building the query string per request. Validation catches type errors server-side.' },
      ]
    },
    {
      title: 'Exercise — Fetch Nested Data', mins: 9,
      blocks: [
        { t: 'ex', id: 'C4EX1', title: 'Accounts with contacts', obj: 'One GraphQL query returning the first 3 Accounts with each related Contact.', reqs: [
          'POST to /graphql',
          'Query Account(first:3) including Id, Name',
          'Traverse contacts relationship in the same query',
          'Include a fragment for reuse',
        ], verify: 'The response nests contacts under each account with zero extra REST calls.', stars: 3 },
      ]
    },
    {
      title: 'Mutations & Errors', mins: 7,
      blocks: [
        { t: 'p', x: 'Mutations change data. The signature returns the affected record so the client stays in sync. Errors come back in the errors array with partial results — never assume all-or-nothing.' },
        { t: 'callout', kind: 'warn', x: 'Unlike composite allOrNone, GraphQL returns partial success. Always check the errors array per field before trusting the data.' },
      ]
    },
  ],
  quiz: {
    title: 'Phase 4 Quiz - GraphQL', mins: 5,
    questions: [
      { q: 'GraphQL records are exposed as...',
        opts: ['nodes / edges', 'XML elements', 'blobs', 'reports'], a: 0, why: 'Salesforce GraphQL uses the cursor/edge nodes model.' },
      { q: 'Fetching Accounts AND their Contacts in one query is possible because...',
        opts: ['GraphQL traverses relationships server-side', 'of composite', 'of Bulk', 'of SOAP'], a: 0, why: 'You traverse related records in a single round trip.' },
      { q: 'A failed field returns...',
        opts: ['an errors array with partial data', 'an HTTP 500 only', 'a silent skip', 'a session reset'], a: 0, why: 'GraphQL returns partial results plus an errors array.' },
    ]
  }
},

/* -------------------------------------------------------------------------- */
/* PHASE 5 - SOAP, BULK & STREAMING APIS                                      */
/* -------------------------------------------------------------------------- */
{
  id: 'soap-bulk',
  n: 5,
  title: 'SOAP, Bulk 2.0 & Streaming',
  icon: '05',
  color: '#D97706',
  tagline: 'Bulk 2.0 jobs, SOAP WSDLs, long-polling',
  guide: '05-SOAP-Bulk-and-Streaming-APIs.md',
  art: [
    { label: 'BulkService.cls', href: 'force-app/main/default/classes/BulkService.cls' },
    { label: 'BulkServiceTest.cls', href: 'force-app/main/default/classes/BulkServiceTest.cls' },
  ],
  objectives: [
    'Create a Bulk API 2.0 job, add batches, wait for results',
    'Choose delete/query/ingest and serial vs parallel batches',
    'Interpret Bulk 2.0 limits (15M query rows, 150M total)',
    'Know when SOAP is still the right tool',
    'Understand long-polling for streaming',
  ],
  lessons: [
    {
      title: 'Bulk API 2.0', mins: 9,
      blocks: [
        { t: 'code', lang: 'bash', x: `# 1. Create the job
POST /services/data/v68.0/jobs/ingest
{ "object": "Account", "operation": "insert",
  "contentType": "CSV", "lineEnding": "LF" }

# 2. Upload CSV batches (max 10k rows / 10MB)
PUT  /services/data/v68.0/jobs/ingest/<jobId>/batches

# 3. Close the job -> platform starts processing
PATCH /services/data/v68.0/jobs/ingest/<jobId>  { "state": "UploadComplete" }` },
        { t: 'p', x: 'Bulk 2.0 is async and thus free of the 10k DML-row limit per transaction. Jobs = object + operation; batches = CSV chunks; states: Open → UploadComplete → InProgress → JobComplete.' },
        { t: 'callout', kind: 'warn', x: 'Watch limits: 15,000,000 query rows / job, 150,000,000 total, 10,000 rows per batch, 5 concurrent jobs. DML is not subject to the sync 10k limit.' },
      ]
    },
    {
      title: 'Bulk Variants', mins: 7,
      blocks: [
        { t: 'table', head: ['Operation', 'Endpoint (/jobs/...)', 'Use'], rows: [
          ['ingest', '/jobs/ingest', 'Insert/update/upsert/delete bulk'],
          ['query', '/jobs/query', 'Export big query results'],
          ['bulk v1 (legacy)', '/services/async/38.0/', 'Legacy, avoid'],
        ]},
        { t: 'callout', kind: 'tip', x: 'Use parallel batches for ingest throughput, serial when you must preserve order (e.g., parent before child in upserts).' },
      ]
    },
    {
      title: 'SOAP API Today', mins: 6,
      blocks: [
        { t: 'p', x: 'SOAP remains relevant for SSO/single-message operations and enterprise middleware that still speaks WSDL. Partner vs Enterprise WSDL: Partner uses dynamic fields (harder), Enterprise is static + object-specific.' },
        { t: 'selfcheck', q: 'Your Java middleware is WSDL-only. Which API do you use for one-off account creates?', a: 'SOAP (Partner or Enterprise WSDL) — mature WSDL tooling without JSON.' },
      ]
    },
    {
      title: 'Exercise — Bulk 2.0 Load', mins: 10,
      blocks: [
        { t: 'ex', id: 'C5EX1', title: 'Bulk load 10k Accounts', obj: 'Load a 10k-row CSV into Account with Bulk 2.0 and confirm results.', reqs: [
          'Create an ingest job (insert, CSV)',
          'Upload two batches of 5k rows',
          'Close the job and poll state to JobComplete',
          'Fetch the successfulResults URL and verify 10k Ids',
        ], verify: 'JobComplete with NumberRecordsProcessed = 10000 and 0 failed.', stars: 3 },
      ]
    },
  ],
  quiz: {
    title: 'Phase 5 Quiz - Bulk & Streaming', mins: 5,
    questions: [
      { q: 'Bulk API 2.0 is best for...',
        opts: ['high-volume async loads', 'realtime UI', 'OAuth refresh', 'metadata deploy'], a: 0, why: 'Designed for large asynchronous data processing.' },
      { q: 'A job with 25k rows and 10k row batches needs...',
        opts: ['3 batches', '25 batches', '1 batch', '5 batches'], a: 0, why: '25k / 10k per batch = 3 batches (ceil).' },
      { q: 'The correct final state to trigger processing is...',
        opts: ['UploadComplete', 'Open', 'InProgress', 'Closed'], a: 0, why: 'Closing with UploadComplete signals the platform to process uploaded batches.' },
    ]
  }
},

/* -------------------------------------------------------------------------- */
/* PHASE 6 - PLATFORM EVENTS & CDC                                            */
/* -------------------------------------------------------------------------- */
{
  id: 'events-cdc',
  n: 6,
  title: 'Platform Events & CDC',
  icon: '06',
  color: '#DB2777',
  tagline: 'Publish, subscribe, replay, Change Data Capture',
  guide: '06-Platform-Events-and-CDC.md',
  art: [
    { label: 'PlatformEventService.cls', href: 'force-app/main/default/classes/PlatformEventService.cls' },
    { label: 'health_changed__e (objects/)', href: 'force-app/main/default/objects/' },
    { label: 'CDC__Change_Evaluation__e (objects/)', href: 'force-app/main/default/objects/' },
  ],
  objectives: [
    'Model a platform event and publish with EventBus.publish',
    'Subscribe from Apex triggers, flows, or via streaming',
    'Explain replay IDs and the replay buffer',
    'Use Change Data Capture to react to record changes',
    'Compare push (events) vs pull (query/polling)',
  ],
  lessons: [
    {
      title: 'Publishing Events', mins: 8,
      blocks: [
        { t: 'p', x: 'A platform event is a lightweight, transient record (custom_event__e suffix). Publish by creating an instance and calling EventBus.publish(). It is atomic with the transaction.' },
        { t: 'code', lang: 'apex', x: `health_changed__e evt = new health_changed__e(
  External_Key__c = 'ACCT-001',
  New_Score__c   = 91
);
Database.SaveResult rs = EventBus.publish(evt);
System.debug('published? ' + rs.isSuccess());` },
        { t: 'callout', kind: 'tip', x: 'EventBus.publish returns SaveResult; check isSuccess() so you catch limits exceptions instead of silently dropping events.' },
      ]
    },
    {
      title: 'Subscribing', mins: 9,
      blocks: [
        { t: 'p', x: 'Four ways to consume: Apex trigger on the event, flow (after-save on an event), connections via Streaming API, and CometD/EMP client. Triggers fire asynchronously after the publishing transaction commits.' },
        { t: 'code', lang: 'apex', x: `trigger HealthChangedHandler on health_changed__e (after insert) {
  for (health_changed__e e : Trigger.New) {
    IntegrationLog__c log = new IntegrationLog__c(
      External_Key__c = e.External_Key__c,
      Event_Type__c   = 'health_changed'
    );
    inserts.add(log);
  }
  insert inserts;
}` },
        { t: 'selfcheck', q: 'When does a platform-event trigger run?', a: 'Asynchronously, after the publishing transaction commits (fire-and-forget by design).' },
      ]
    },
    {
      title: 'Replay & Change Data Capture', mins: 8,
      blocks: [
        { t: 'p', x: 'Event streams persist in a replay buffer so late consumers can replay missed events. CometD clients pass a replay ID (-1 = replay everything). CDC captures creates/updates/deletes/undeletes on standard or custom objects as change event records.' },
        { t: 'code', lang: 'text', x: `// Change event record for an Account change
ChangeEventHeader { changeType: "UPDATE", entityName: "Account",
  recordIds: ["001xxx"], changedFields: ["Health_Score__c"] }` },
        { t: 'callout', kind: 'warn', x: 'Replay is not infinite — events age out of the buffer. Size your buffer or your replay ID will 400 (ReplayIdOutOfBounds).' },
      ]
    },
    {
      title: 'Exercise — Publish & Log', mins: 9,
      blocks: [
        { t: 'ex', id: 'C6EX1', title: 'Event-driven health alerts', obj: 'Publish a health_changed event on every Account score change and log it.', reqs: [
          'Add a trigger on Account (after update) that publishes only when score changed',
          'health_changed__e includes AccountId, New_Score__c, Old_Score__c',
          'Subscribe with an after-insert trigger that writes a REST_Integration_Log__c',
          'Verify with an anonymous script',
        ], verify: 'Updating a score leads to exactly one log record per change.', stars: 3 },
      ]
    },
  ],
  quiz: {
    title: 'Phase 6 Quiz - Platform Events', mins: 5,
    questions: [
      { q: 'Publishing an event is done with...',
        opts: ['EventBus.publish()', 'Database.insert()', 'Callout', 'SOQL'], a: 0, why: 'EventBus.publish is the dedicated publisher and is atomic with the transaction.' },
      { q: 'Subscriber triggers run...',
        opts: ['after the publisher commits', 'inline in the publisher', 'only in batch', 'only via REST'], a: 0, why: 'Delivery is asynchronous — fire-and-forget after commit.' },
      { q: 'Replaying past events uses...',
        opts: ['replay IDs against the buffer', 'bulk queries', 'SOAP binding', 'report filters'], a: 0, why: 'CometD clients pass a replay ID to resume from a checkpoint.' },
    ]
  }
},

/* -------------------------------------------------------------------------- */
/* PHASE 7 - SALESFORCE CONNECT & OData                                       */
/* -------------------------------------------------------------------------- */
{
  id: 'connect',
  n: 7,
  title: 'Salesforce Connect & OData',
  icon: '07',
  color: '#059669',
  tagline: 'External objects, OData, virtual data',
  guide: '07-Salesforce-Connect-and-OData.md',
  art: [
    { label: 'ConnectService.cls', href: 'force-app/main/default/classes/ConnectService.cls' },
    { label: 'External_Account__x (objects/)', href: 'force-app/main/default/objects/' },
  ],
  objectives: [
    'Explain external data sources and external objects',
    'Connect OData v4 endpoints without copying data',
    'Use external lookups / indirect lookups for joins',
    'Adhere to policy (read/read-write) and column limits',
    'Know when Salesforce Connect beats data sync',
  ],
  lessons: [
    {
      title: 'External Data Sources', mins: 7,
      blocks: [
        { t: 'p', x: 'Salesforce Connect exposes external data as if it were native — no data copy (virtually). An External Data Source (type OData 2.0/4.0, custom adapter, or Apex) feeds External Objects (suffix __x).' },
        { t: 'callout', kind: 'warn', x: 'External objects cannot be the master in Master-Detail; they do not support roll-up summaries; and they bypass Apex sharing but respect the external data source policy.' },
      ]
    },
    {
      title: 'Joining Worlds', mins: 7,
      blocks: [
        { t: 'p', x: 'External Lookup lets an external record point to a local record; Indirect Lookup joins external records by a common key field. You can mix local + external in SOQL for unified views.' },
        { t: 'code', lang: 'text', x: `SELECT Id, Local_Name__c, ext.Erp_Id__c
FROM Account a
LEFT JOIN External_Account__x ext   -- via indirect lookup on Erp_Id__c
ON a.Erp_Ref__c = ext.Erp_Id__c` },
      ]
    },
    {
      title: 'When to Use Connect vs Sync', mins: 7,
      blocks: [
        { t: 'table', head: ['Situation', 'Choice'], rows: [
          ['Realtime external source, small reads', 'Salesforce Connect (virtual)'],
          ['Need advanced reporting/rollups locally', 'Data sync / replication'],
          ['Large volume always-on joins', 'Connect + policy tuning'],
          ['Offline or sandbox of external data', 'Sync'],
        ]},
        { t: 'selfcheck', q: 'You need local roll-up summaries over external data. What do you choose?', a: 'Sync a copy — external objects do not support roll-up summaries.' },
      ]
    },
    {
      title: 'Exercise — Expose a Recipe API', mins: 8,
      blocks: [
        { t: 'ex', id: 'C7EX1', title: 'OData external objects', obj: 'Expose a JSON/OData endpoint and consume it as external data.', reqs: [
          'Stand up a local OData v4 endpoint (or use a public sample)',
          'Create an External Data Source of type OData 4.0',
          'Generate an external object + indirect lookup to Account',
          'Query with a mixed SOQL',
        ], verify: 'A SOQL query returns local + external fields together.', stars: 3 },
      ]
    },
  ],
  quiz: {
    title: 'Phase 7 Quiz - Salesforce Connect', mins: 5,
    questions: [
      { q: 'Salesforce Connect reads external data...',
        opts: ['live, without copying', 'by nightly replication', 'via Bulk', 'via spreadsheets'], a: 0, why: 'It federates data in real time — no copy.' },
      { q: 'External objects typically use the suffix...',
        opts: ['__x', '__c', '__e', '__mdt'], a: 0, why: 'External object API names end in __x.' },
      { q: 'Joining an external record to a local record uses...',
        opts: ['external/indirect lookups', 'roll-up summaries', 'triggers on the external object', 'bulk jobs'], a: 0, why: 'External or indirect lookups link the two worlds.' },
    ]
  }
},

/* -------------------------------------------------------------------------- */
/* PHASE 8 - OAUTH 2.0 & SECURE INTEGRATIONS                                  */
/* -------------------------------------------------------------------------- */
{
  id: 'oauth',
  n: 8,
  title: 'OAuth 2.0 & Security',
  icon: '08',
  color: '#9333EA',
  tagline: 'Flows, tokens, scopes, cipher, PKCE',
  guide: '08-OAuth-and-Secure-Integrations.md',
  art: [
    { label: 'AuthService.cls', href: 'force-app/main/default/classes/AuthService.cls' },
    { label: 'Named Credential (Apex integration)', href: 'force-app/main/default/classes/IntegrationService.cls' },
  ],
  objectives: [
    'Pick web-server, user-agent, JWT and client-credentials flows',
    'Use connected apps + scopes (api, refresh_token, full)',
    'Refresh access tokens and store them safely',
    'Choose Named Credentials over hardcoded endpoints',
    'Apply TLS, cipher, headers and rate checks',
  ],
  lessons: [
    {
      title: 'OAuth 2.0 Flows', mins: 9,
      blocks: [
        { t: 'table', head: ['Flow', 'Who', 'Use'], rows: [
          ['Web server', 'Server apps', 'Secure backend, refresh tokens'],
          ['User agent', 'SPAs / client-side', 'No server secret, PKCE'],
          ['JWT bearer', 'Server-to-server', 'Named-credential friendly, no user'],
          ['Client credentials', 'Server-to-server', 'System-to-system, no user'],
        ]},
        { t: 'callout', kind: 'tip', x: 'Refresh tokens are the long-lived keys; access tokens are the short-lived currency. Never ship a refresh token to a browser (SPA) — use PKCE + user-agent.' },
      ]
    },
    {
      title: 'Tokens, Scopes & Secrets', mins: 8,
      blocks: [
        { t: 'p', x: 'Scopes gate what a token can do: api (data API), full (everything incl. metadata), refresh_token (get new access tokens), web (id/name). Store secrets in Named Credentials, not in code or custom settings.' },
        { t: 'code', lang: 'apex', x: `System.HttpRequest req = new System.HttpRequest();
req.setEndpoint('callout:External_ERP/customers');
req.setMethod('GET');
req.setHeader('Accept', 'application/json');
HttpResponse res = new Http().send(req);
if (res.getStatusCode() == 200) { ... }` },
        { t: 'callout', kind: 'warn', x: 'Never hardcode secrets. Use Named Credentials so the platform mints + refreshes the token. Rotate client secrets and set expiry on connected apps.' },
      ]
    },
    {
      title: 'Exercise — Secure Callout', mins: 9,
      blocks: [
        { t: 'ex', id: 'C8EX1', title: 'Named-credential integration', obj: 'Replace a hardcoded endpoint with a Named Credential and handle 401 refresh.', reqs: [
          'Create a Connected App with api + refresh_token',
          'Configure a Named Credential (principal) with the auth URL',
          'Call it from IntegrationService with setEndpoint(\'callout:External_ERP/...\')',
          'Handle 401 by refreshing and retrying once',
        ], verify: 'One Named Credential drives auth; logs show no hardcoded URLs in Apex.', stars: 3 },
      ]
    },
  ],
  quiz: {
    title: 'Phase 8 Quiz - OAuth & Security', mins: 5,
    questions: [
      { q: 'A SPA without a server secret should use...',
        opts: ['user-agent + PKCE', 'client credentials', 'username-password', 'JWT only'], a: 0, why: 'SPAs must not hold client secrets; PKCE secures the code exchange.' },
      { q: 'The scope that grants API access is...',
        opts: ['api', 'full', 'web', 'offline_access'], a: 0, why: 'api scope authorizes REST/SOAP/Bulk usage.' },
      { q: 'Hardcoded secrets are replaced by...',
        opts: ['Named Credentials', 'custom labels', 'Apex constants', 'IP ranges'], a: 0, why: 'Named Credentials centralize endpoints + tokens and handle refresh.' },
    ]
  }
},

/* -------------------------------------------------------------------------- */
/* PHASE 9 - HEADLESS COMMERCE & COMPOSABLE                                  */
/* -------------------------------------------------------------------------- */
{
  id: 'commerce',
  n: 9,
  title: 'Headless Commerce & Composable',
  icon: '09',
  color: '#F97316',
  tagline: 'B2B/B2C headless, CBAPI, storefront',
  guide: '09-Headless-Commerce-and-Composable.md',
  art: [
    { label: 'CommerceService.cls', href: 'force-app/main/default/classes/CommerceService.cls' },
    { label: 'Commerce Storefront exercise (Avp9)', href: 'docs/assets/answers.js' },
    { label: 'Shopping Cart / Checkout artifacts', href: 'docs/assets/answers.js' },
  ],
  objectives: [
    'Differentiate B2B vs B2C Commerce Cloud headless',
    'Call Commerce Cloud Business Manager APIs (hosted/CC API)',
    'Explain cart, catalog, pricebooks, promotions headlessly',
    'Build a minimal storefront client on the Composable APIs',
    'Handle cart session + checkout orchestration',
  ],
  lessons: [
    {
      title: 'Commerce in Headless 360', mins: 7,
      blocks: [
        { t: 'p', x: 'Commerce Cloud exposes B2B and B2C commerce via standard product/cart/checkout resources. Headless storefronts call those APIs instead of the Storefront Reference Architecture (SFRA) server-rendered pages.' },
        { t: 'callout', kind: 'tip', x: 'Composable means assemble commerce from APIs — catalog, cart, pricing, promotions as separate services you compose. No monolithic page stack.' },
      ]
    },
    {
      title: 'Key Resources', mins: 8,
      blocks: [
        { t: 'table', head: ['Area', 'API/Resource', 'Notes'], rows: [
          ['Catalog / products', 'GET /products, /categories', 'Paged, filtered'],
          ['Cart', '/*/carts operations', 'Session-scoped'],
          ['Checkout', '/*/checkout', 'Orchestrates payment'],
          ['Promotions', 'promotions list', 'Apply at cart'],
          ['Shopper', 'shopper resources', 'AuthNZ for the shopper'],
        ]},
        { t: 'p', x: 'Know the difference between hosted checkout vs headless checkout: hosted keeps the payment page on Commerce Cloud; headless calls payment service provider APIs yourself (more control, more PCI scope).' },
      ]
    },
    {
      title: 'Exercise — Minimal Storefront', mins: 9,
      blocks: [
        { t: 'ex', id: 'C9EX1', title: 'List & cart in React', obj: 'A tiny React client that lists products and adds one to a cart via the Commerce APIs.', reqs: [
          'GET /products to seed the list',
          'POST to create a cart',
          'Add an item with a pricebook entry',
          'Render cart total from the response',
        ], verify: 'Cart total reflects the added item; APIs called from the client with Bearer token.', stars: 3 },
      ]
    },
  ],
  quiz: {
    title: 'Phase 9 Quiz - Headless Commerce', mins: 5,
    questions: [
      { q: 'Headless checkout means...',
        opts: ['you call payment/checkout APIs yourself', 'no checkout exists', 'checkout is hidden', 'only B2C'], a: 0, why: 'Headless checkout orchestrates payment via APIs; hosted keeps pages on-platform.' },
      { q: 'A cart in Commerce APIs is...',
        opts: ['session-scoped CRUD', 'a static file', 'a report', 'an Aura app'], a: 0, why: 'Cart resources maintain a shopper session across add/update/checkout calls.' },
    ]
  }
},

/* -------------------------------------------------------------------------- */
/* PHASE 10 - SERVERLESS, FUNCTIONS & APP PLATFORM                            */
/* -------------------------------------------------------------------------- */
{
  id: 'serverless',
  n: 10,
  title: 'Serverless & App Platform',
  icon: '10',
  color: '#0D9488',
  tagline: 'Functions, Express workers, Node runtime',
  guide: '10-Serverless-and-App-Platform.md',
  art: [
    { label: 'FunctionsService / serverless example', href: 'docs/assets/answers.js' },
    { label: 'app_worker.mjs (serverless/ folder)', href: 'force-app/main/default/classes/ServerlessWorker.cls' },
  ],
  objectives: [
    'Describe Salesforce Functions (hosted Node runtime)',
    'Compare Functions, Heroku, and Express workers',
    'Build a tiny Express API that calls Salesforce CRUD',
    'Use environment variables + secrets for tokens',
    'Handle cold starts and scale concepts',
  ],
  lessons: [
    {
      title: 'Functions & the Runtime', mins: 6,
      blocks: [
        { t: 'p', x: 'Salesforce Functions run Node.js/TypeScript close to the platform with @salesforce/core to auth. They are ideal for CPU-heavy or processing jobs that do not fit in Apex limits.' },
        { t: 'callout', kind: 'warn', x: 'Apex is the co-selling default; compute constraints (heap, CPU, 10k DML) are when you reach for Functions or a worker.' },
      ]
    },
    {
      title: 'Express Worker', mins: 8,
      blocks: [
        { t: 'code', lang: 'js', x: `import express from 'express';
import jsforce from 'jsforce';
const app = express();
app.use(express.json());

app.post('/api/health', async (req, res) => {
  const conn = new jsforce.Connection({
    instanceUrl: process.env.SF_INSTANCE,
    accessToken: process.env.SF_TOKEN
  });
  const r = await conn.sobject('Account').create({ Name: req.body.name });
  res.json({ id: r.id });
});

app.listen(process.env.PORT || 3000);` },
        { t: 'selfcheck', q: 'Why environment variables for tokens?', a: 'Secrets should never be in source. Env vars + secret manager keep tokens out of Git and rotateable.' },
      ]
    },
    {
      title: 'Exercise — Worker + Trigger', mins: 9,
      blocks: [
        { t: 'ex', id: 'C10EX1', title: 'Score worker', obj: 'An Express endpoint that recomputes an Account Health field and writes back.', reqs: [
          'POST /api/score {accountId, data}',
          'Compute a score in JS',
          'PATCH the Account via jsforce',
          'Fire a platform event on change (optional)',
          'Config-driven via env vars',
        ], verify: 'Calling the endpoint updates the record and (optionally) publishes health_changed.', stars: 3 },
      ]
    },
  ],
  quiz: {
    title: 'Phase 10 Quiz - Serverless', mins: 5,
    questions: [
      { q: 'Functions run on...',
        opts: ['Node.js/TS near the platform', 'Aura', 'REST only', 'the browser'], a: 0, why: 'Functions are a hosted Node/TypeScript runtime integrated with Salesforce.' },
      { q: 'The worker stores tokens in...',
        opts: ['environment vars / secrets', 'source code', 'custom labels', 'URL query'], a: 0, why: 'Secrets belong in env vars/secrets managers, not Git.' },
    ]
  }
},

/* -------------------------------------------------------------------------- */
/* PHASE 11 - MCP FUNDAMENTALS                                                 */
/* -------------------------------------------------------------------------- */
{
  id: 'mcp-fund',
  n: 11,
  title: 'MCP Fundamentals',
  icon: '11',
  color: '#2563EB',
  tagline: 'Model Context Protocol, clients, servers, tools',
  guide: '11-MCP-Fundamentals.md',
  art: [
    { label: 'McpFundamentalsService.cls', href: 'force-app/main/default/classes/McpFundamentalsService.cls' },
    { label: 'MCP architecture diagram', href: 'docs/assets/answers.js' },
    { label: 'MCP facts (mdt)', href: 'docs/assets/answers.js' },
  ],
  objectives: [
    'Explain what the Model Context Protocol is and why it exists',
    'Name MCP primitives: tools, resources, prompts',
    'Describe how an AI client connects to an MCP server',
    'Place MCP inside Headless 360 (Engagement layer)',
    'List Salesforce platform-hosted MCP servers and tools',
  ],
  lessons: [
    {
      title: 'What is MCP?', mins: 8,
      blocks: [
        { t: 'p', x: 'The Model Context Protocol (MCP) standardizes how AI applications talk to tools and data. A host (Agentforce, Claude Desktop, your app) connects to an MCP server that exposes capabilities as tools, resources and prompts. It is to AI tools what USB is to peripherals: one standard plug, many devices.' },
        { t: 'callout', kind: 'tip', x: 'Memorize the three primitives: TOOLS (callable actions), RESOURCES (readable data), PROMPTS (reusable instructions). Tool calls are how AI actually acts on your org.' },
      ]
    },
    {
      title: 'MCP Architecture', mins: 8,
      blocks: [
        { t: 'code', lang: 'text', x: `AI Host (Agentforce / your app / Claude)
     |  (MCP protocol: initialize, list tools, call)
     v
MCP Server (platform-hosted or yours)
     |  (tools -> mediated Salesforce commands)
     v
Salesforce (Data/BL/Orchestration via mediated APIs)` },
        { t: 'p', x: 'Platform-hosted MCP servers ship with an ever-growing set of tools (60+ at TDX 2026) and coding skills (30+) that perform mediated, safe, permission-checked Salesforce operations — CRUD and process invocation.' },
        { t: 'selfcheck', q: 'What does "mediated" mean in platform MCP tools?', a: 'The tool call goes through the platform enforcing permissions, limits and audit — never a raw SQL-like backdoor.' },
      ]
    },
    {
      title: 'MCP Inside Headless 360', mins: 6,
      blocks: [
        { t: 'p', x: 'MCP servers live in the Engagement layer. They are another headless surface: any AI client — including agents — gets typed, permissioned, chat-native access to Salesforce data and processes without building bespoke tools.' },
        { t: 'list', items: [
          'Usage types: "Salesforce Record Operation (CRUD)" and "Salesforce Process Invocation"',
          'Tool catalog: query, create, patch records; run flows; invoke invocable actions',
          'Safety: sharing checks, field-level security, audit trails, rate limits',
        ]},
      ]
    },
    {
      title: 'Exercise — Diagram It', mins: 6,
      blocks: [
        { t: 'ex', id: 'C11EX1', title: 'MCP surface map', obj: 'Draw (or pseudo-collapse into text) how an Agent calls Salesforce via an MCP server.', reqs: [
          'Label the host, the MCP server, and the Salesforce layers',
          'Name at least three tools it would expose',
          'Mark where permission checks happen',
        ], verify: 'The diagram clearly shows mediation at the platform before any data access.', stars: 1 },
      ]
    },
  ],
  quiz: {
    title: 'Phase 11 Quiz - MCP Fundamentals', mins: 5,
    questions: [
      { q: 'MCP standardizes how...',
        opts: ['AI apps use tools/data', 'payments work', 'records replicate', 'UI renders'], a: 0, why: 'MCP is the standard interface between AI and tools/data.' },
      { q: 'The three MCP primitives are...',
        opts: ['tools, resources, prompts', 'events, jobs, batches', 'flows, forms, tabs', 'soql, dml, sosl'], a: 0, why: 'Tools, resources and prompts are the primitives.' },
      { q: 'Platform MCP tools execute Salesforce operations...',
        opts: ['through mediated, permission-checked calls', 'as raw SQL', 'via guest access', 'bypassing audit'], a: 0, why: 'Mediation enforces sharing, FLS and audit.' },
    ]
  }
},

/* -------------------------------------------------------------------------- */
/* PHASE 12 - BUILDING MCP SERVERS FOR SALESFORCE                            */
/* -------------------------------------------------------------------------- */
{
  id: 'mcp-build',
  n: 12,
  title: 'Build MCP Servers',
  icon: '12',
  color: '#7C3AED',
  tagline: 'TypeScript SDK, registration, Agentforce tools',
  guide: '12-Building-MCP-Servers-for-Salesforce.md',
  art: [
    { label: 'McpServerBuilder class (SDK sample)', href: 'force-app/main/default/classes/McpServerService.cls' },
    { label: 'MCP server folder (mcpserver/)', href: 'docs/assets/answers.js' },
    { label: 'MCP tool manifest example', href: 'docs/assets/answers.js' },
  ],
  objectives: [
    'Stand up an MCP server with the TypeScript SDK',
    'Define typed tools backed by Salesforce APIs',
    'Register a server + tools with Agentforce',
    'Secure your server: auth, scopes, allowlists',
    'Test tool calls end-to-end from an MCP client',
  ],
  lessons: [
    {
      title: 'A Minimal MCP Server', mins: 9,
      blocks: [
        { t: 'code', lang: 'ts', x: `import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new McpServer({ name: 'sf-health', version: '1.0.0' });

server.tool('get_account_health', { accountId: z.string() },
  async ({ accountId }) => ({
    content: [{ type: 'text', text: await fetchHealth(accountId) }]
  }));

const transport = new StdioServerTransport();
await server.connect(transport);` },
        { t: 'callout', kind: 'tip', x: 'Tools declare input schemas (zod). Type-safe inputs = fewer hallucinated args and clearer failures for the model.' },
      ]
    },
    {
      title: 'Backing Tools with Salesforce', mins: 8,
      blocks: [
        { t: 'p', x: 'Your tools typically call Salesforce via jsforce or a mediated gateway. Prefer platform-hosted MCP servers when they cover the need; build your own when you need custom, domain-specific multi-step operations.' },
        { t: 'list', items: [
          'Use Instance + token from env vars injected on the server',
          'Validate the caller scope before acting',
          'Return structured results the model can reason over (not "done")',
        ]},
        { t: 'selfcheck', q: 'Why return structured results from a tool?', a: 'Models reason from data they receive; rich structured output reduces guesswork and re-queries.' },
      ]
    },
    {
      title: 'Register with Agentforce', mins: 7,
      blocks: [
        { t: 'p', x: 'Registering connects your server to an agent: agent gets the tool list (name, description, schema) and can invoke tools during a conversation. Scopes+auth ensure the agent only calls what it may.' },
        { t: 'callout', kind: 'warn', x: 'Test from a real MCP client, not just curl. Verify tool discovery, argument validation and error surfacing — the failure modes an agent hits are API failures, not UI ones.' },
      ]
    },
    {
      title: 'Exercise — Health Tool', mins: 10,
      blocks: [
        { t: 'ex', id: 'C12EX1', title: 'Build the MCP health tool', obj: 'A server exposing an MCP tool that returns an Account health summary.', reqs: [
          'Scaffold with @modelcontextprotocol/sdk + zod',
          'tool: get_account_health(accountId)',
          'Back it with a jsforce read of Account + Health fields',
          'Wire env vars for instance/token/scope',
          'Connect via StdioTransport and call it from a client',
        ], verify: 'The client lists and calls the tool, returning the account health JSON.', stars: 3 },
      ]
    },
  ],
  quiz: {
    title: 'Phase 12 Quiz - Build MCP Servers', mins: 5,
    questions: [
      { q: 'A minimal MCP server starts with...',
        opts: ['McpServer + transport connect', 'an Aura bundle', 'a Bulk job', 'a report folder'], a: 0, why: 'McpServer + a transport (stdio) is the SDK entry point.' },
      { q: 'Tool input schemas are declared with...',
        opts: ['zod / JSON Schema', 'SOQL', 'Apex triggers', 'flexipages'], a: 0, why: 'Tools declare zod/JSON Schema input — validated before the model calls.' },
      { q: 'To have an agent invoke your tool you...',
        opts: ['register the server + declare tools', 'publish a dashboard', 'write a test class', 'deploy a tab'], a: 0, why: 'Registration exposes the tool catalog to the agent.' },
    ]
  }
},

/* -------------------------------------------------------------------------- */
/* PHASE 13 - PRACTICAL EXERCISES                                             */
/* -------------------------------------------------------------------------- */
{
  id: 'exercises',
  n: 13,
  title: 'Practical Exercises',
  icon: '13',
  color: '#0891B2',
  tagline: 'End-to-end mini projects you build',
  guide: '13-Practical-Exercises.md',
  art: [
    { label: 'Isolation/Prefix patterns (scripts)', href: 'docs/assets/answers.js' },
    { label: 'MiniProjectService / flows', href: 'docs/assets/answers.js' },
  ],
  objectives: [
    'Consolidate all phases into buildable mini projects',
    'Exercise isolation, naming, and prefix conventions',
    'Deploy patterns that respect limits and sharing',
    'Verify each project with tests and logs',
  ],
  lessons: [
    {
      title: 'Mini Projects Overview', mins: 6,
      blocks: [
        { t: 'table', head: ['Project', 'Skills'], rows: [
          ['MP1 Health REST client', 'REST + composite'],
          ['MP2 Bulk load pipeline', 'Bulk 2.0 + polling'],
          ['MP3 Event-driven alerts', 'Platform events + CDC'],
          ['MP4 OData external read', 'Salesforce Connect'],
          ['MP5 MCP health tool', 'TypeScript SDK + tool'],
          ['MP6 Headless storefront', 'Composable APIs'],
        ]},
        { t: 'p', x: 'Build them in order — each reuses the previous tools. Full answers and expected results live in docs/assets/answers.js.' },
      ]
    },
    {
      title: 'Working With the Repo Metadata', mins: 6,
      blocks: [
        { t: 'p', x: 'force-app/ carries real, deployable patterns: services, triggers, objects, flows bespoke for Headless & MCP. Use them as skeletons; never paste secrets in.' },
        { t: 'callout', kind: 'tip', x: 'Prefix everything consistently (e.g., Headless or MCP) so cross-references and permission sets stay coherent — the repo does this so you can copy the habit.' },
      ]
    },
    {
      title: 'Exercise — Pick Your First', mins: 8,
      blocks: [
        { t: 'ex', id: 'C13EX1', title: 'Mini project kickoff', obj: 'Choose and scaffold your first mini project (MP1 recommended).', steps: [
          'Fork/clone this roadmap and open the MP folder',
          'Scaffold a scratch org from config/project-scratch-def.json',
          'Run the reference service + test as your baseline',
          'Extend it with one new behavior',
        ], verify: 'Baseline tests pass and your extension is covered by a new test.', stars: 4 },
      ]
    },
  ],
  quiz: {
    title: 'Phase 13 Quiz - Exercises', mins: 5,
    questions: [
      { q: 'Mini projects are ordered so that...',
        opts: ['each builds on the prior tools', 'they are independent', 'only MP5 matters', 'they need no tests'], a: 0, why: 'Progressive reuse keeps each project reviewable.' },
      { q: 'You should paste secrets...',
        opts: ['never', 'into classes', 'into triggers', 'into dashboards'], a: 0, why: 'Secrets belong in Named Credentials/env env, never metadata.' },
    ]
  }
},

/* -------------------------------------------------------------------------- */
/* PHASE 14 - ANSWERS & RESULTS                                              */
/* -------------------------------------------------------------------------- */
{
  id: 'answers',
  n: 14,
  title: 'Answers & Results',
  icon: '14',
  color: '#4D7C0F',
  tagline: 'Everything a guide says, verified',
  guide: '14-Answers-and-Results.md',
  art: [
    { label: 'answers.js (all solutions)', href: 'docs/assets/answers.js' },
  ],
  objectives: [
    'Get the canonical solution for every exercise',
    'Understand why each answer works (not just what)',
    'Avoid the most common mistakes',
    'Use tests as documentation of expected behavior',
  ],
  lessons: [
    {
      title: 'How to Use This Phase', mins: 7,
      blocks: [
        { t: 'p', x: 'Before you peek: attempt the exercise, then compare. The answers file is indexed per exercise id (C1EX1 … C13EX1, MP…) with code, expected resultston and common-mistake notes.' },
        { t: 'callout', kind: 'tip', x: 'The answers are teaching artifacts — they show the WHY via expected-result and mistake sections, so model your own reasoning, not just your code.' },
      ]
    },
    {
      title: 'Self-Verification Habits', mins: 6,
      blocks: [
        { t: 'list', items: [
          'Run the associated test class after every class you write',
          'Check debug logs for the expected assertion messages',
          'Re-explain the solution aloud to a rubber duck',
          'Contrast your attempt vs the answer: find the deltas',
        ]},
      ]
    },
  ],
  quiz: {
    title: 'Phase 14 Quiz - Answers', mins: 5,
    questions: [
      { q: 'The best way to study the answers is to...',
        opts: ['attempt first then compare', 'read them fast', 'PDF print everything', 'skip guides'], a: 0, why: 'Attempt-then-compare makes the delta meaningful.' },
      { q: 'Tests in force-app serve as...',
        opts: ['documentation of expected behavior', 'random files', 'build blockers', 'UI themes'], a: 0, why: 'Maintained tests encode exactly what success means.' },
    ]
  }
},

/* -------------------------------------------------------------------------- */
/* PHASE 15 - REAL-WORLD USE CASES                                            */
/* -------------------------------------------------------------------------- */
{
  id: 'usecases',
  n: 15,
  title: 'Real-World Use Cases',
  icon: '15',
  color: '#334155',
  tagline: 'Field-facing scenarios, decision logic',
  guide: '15-Real-World-Use-Cases.md',
  art: [
    { label: 'Scenario → decision tables', href: 'docs/assets/answers.js' },
  ],
  objectives: [
    'Map business scenarios to headless architecture',
    'Justify API + security + data choices from requirements',
    'Spot architecture smells (over-fetching, chatty, sync loops)',
    'Write the "why" an architect gives in a review',
  ],
  lessons: [
    {
      title: 'Scenario: Realtime Approval Pull', mins: 8,
      blocks: [
        { t: 'p', x: 'A field app must show pending approvals and let managers approve instantly, offline-tolerant.' },
        { t: 'list', items: [
          'API: REST (low volume, per-manager) or GraphQL for the dashboard tile',
          'Pub/sub: subscribe to approval process updates if they must be instant',
          'Offline: cache POJOs + replay on reconnect',
        ]},
        { t: 'callout', kind: 'warn', x: 'Avoid polling every 5s for approvals — that is chatty. Prefer streaming or acceptable-delay refresh with cache.' },
      ]
    },
    {
      title: 'Scenario: 10M-row Sync', mins: 8,
      blocks: [
        { t: 'p', x: 'Nightly sync of 10M external accounts into Salesforce, order-guaranteed with a durable log.' },
        { t: 'list', items: [
          'API: Bulk API 2.0 (async, order via serial batches)',
          'CDC/replay for deltas after the full load',
          'Monitoring: job state polling + failure resume via replay',
        ]},
        { t: 'selfcheck', q: 'Sync 10M nightly — which API?', a: 'Bulk API 2.0 with serial batches to preserve parent/child order.' },
      ]
    },
    {
      title: 'Scenario: Agent Answering Users', mins: 8,
      blocks: [
        { t: 'p', x: 'An AI agent must answer "what is my account health?" from Salesforce data safely.' },
        { t: 'list', items: [
          'Expose a platform-hosted or custom MCP tool (get_account_health)',
          'Mediate through the platform: sharing + FLS + audit',
          'Return structured JSON so the agent can reason + cite',
        ]},
        { t: 'callout', kind: 'tip', x: 'For agent surfaces, prefer MCP tools over raw API keys: the platform mediates permissions and audit.' },
      ]
    },
    {
      title: 'Exercise — Decide & Justify', mins: 9,
      blocks: [
        { t: 'ex', id: 'C15EX1', title: 'Use-case architecture brief', obj: 'Choose an API + security approach for one real scenario and write the justification.', steps: [
          'Pick: realtime inflight-view, 10M sync, or agent Q&A',
          'Justify API, transport, security, scale decisions',
          'Note the top trade-off and the smell you avoided',
        ], verify: 'Your brief names trade-offs and defends the API choice with requirements — the way a solution-architecture review expects.', stars: 2 },
      ]
    },
  ],
  quiz: {
    title: 'Phase 15 Quiz - Use Cases', mins: 5,
    questions: [
      { q: 'For instant approval updates in a field app you prefer...',
        opts: ['streaming/pub-sub', 'polling every 5s', 'monthly reports', 'mass mail'], a: 0, why: 'Streaming delivers changes without chatty polling.' },
      { q: 'For an AI agent answering data questions you...',
        opts: ['expose MCP tools mediated by the platform', 'give the agent the admin password', 'export to CSV', 'build VF pages'], a: 0, why: 'Mediated MCP tools keep permissions and audit in place.' },
    ]
  }
},

/* -------------------------------------------------------------------------- */
/* PHASE 16 - USE CASE SOLUTIONS                                              */
/* -------------------------------------------------------------------------- */
{
  id: 'solutions',
  n: 16,
  title: 'Use Case Solutions',
  icon: '16',
  color: '#166534',
  tagline: 'Canonical answers for every use case',
  guide: '16-Use-Case-Solutions.md',
  art: [
    { label: 'CaseC1 / CaseC2 / CaseC3 solutions', href: 'docs/assets/answers.js' },
  ],
  objectives: [
    'Audit your solution against the canonical one',
    'Understand the acceptance criteria each case checks',
    'Grab reusable snippets for interviews',
    'See how trade-offs map to requirements',
  ],
  lessons: [
    {
      title: 'Reading a Solution', mins: 7,
      blocks: [
        { t: 'p', x: 'Each use-case solution lists the deliverable, the reasoning, and the acceptance checklist. Compare to your brief and note only the meaningful deltas.' },
        { t: 'callout', kind: 'tip', x: 'When a review scenario is asked in an interview, walking through the use case → trade-off → decision structure scores far higher than naming an API.' },
      ]
    },
    {
      title: 'Exercise — Self-audit', mins: 8,
      blocks: [
        { t: 'ex', id: 'C16EX1', title: 'Grade your own brief', obj: 'Compare your Phase 15 brief to the canonical solution and list one improvement.', steps: [
          'Open the matching solution in answers.js',
          'List where your brief disagrees (if any)',
          'Rewrite the justification incorporating the feedback',
        ], verify: 'Your revised brief is stricter on trade-offs and security than the first draft.', stars: 1 },
      ]
    },
  ],
  quiz: {
    title: 'Phase 16 Quiz - Solutions', mins: 5,
    questions: [
      { q: 'The value of reading a canonical solution is...',
        opts: ['finding meaningful deltas in your reasoning', 'memorizing code', 'auto-passing', 'skipping tests'], a: 0, why: 'Compare-and-correct sharpens architect reasoning.' },
      { q: 'In an interview, a scenario answer should...',
        opts: ['walk use case → trade-off → decision', 'name one tool', 'say "it depends"', 'show code only'], a: 0, why: 'Structured trade-off reasoning is what interviewers reward.' },
    ]
  }
}
];

/* -------------------------------------------------------------------------- */