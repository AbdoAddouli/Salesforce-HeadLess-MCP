# Phase 10 — Serverless & App Platform

Salesforce Functions, Express workers, and the Node runtime for off-platform
logic.

## Functions & the Runtime

Salesforce Functions run **Node.js/TypeScript close to the platform** with
`@salesforce/core` to auth. They are ideal for CPU-heavy or processing jobs that
do not fit in Apex limits.

> Apex is the co-selling default; when you hit **compute constraints (heap, CPU,
> 10k DML)**, that is the signal to reach for Functions or a worker.

## A Minimal Express Worker

```js
import express from 'express';
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

app.listen(process.env.PORT || 3000);
```

**Self-check:** Why environment variables for tokens? Secrets should never live in
source. Env vars + a secret manager keep tokens out of Git and make them
rotatable.

## Workers vs Functions vs Heroku

| Option | Sweet spot |
|---|---|
| Apex | Default for platform-bound logic |
| Salesforce Functions | Node/TS compute near the platform |
| Express worker | Your own runtime, your scaling, any framework |
| Heroku | Full PaaS app platform + data services |

## Cold Starts & Scale

- Warm workers with health pings; tolerate cold-start latency.
- Keep the worker **stateless** — scale horizontally behind a load balancer.
- Use queues or event messages for long jobs instead of blocking requests.

## Exercise — Score Worker

An Express endpoint that recomputes an Account Health field and writes back:

- `POST /api/score {accountId, data}`
- Compute a score in JS
- `PATCH` the Account via jsforce
- Optionally fire a platform event on change
- Config-driven via env vars

Verify: calling the endpoint updates the record and (optionally) publishes
`health_changed`.

## Repo Artifacts to Open

- `force-app/main/default/classes/ServerlessWorker.cls` — serverless example
- `docs/assets/answers.js` — `C10EX1` model answer (worker code)