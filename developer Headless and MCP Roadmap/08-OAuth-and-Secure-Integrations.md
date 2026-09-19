# Phase 08 — OAuth 2.0 & Secure Integrations

Flows, tokens, scopes, and secrets — the security spine of every headless app.

## OAuth 2.0 Flows

| Flow | Who | Use |
|---|---|---|
| Web server | Server apps | Secure backend, refresh tokens |
| User agent | SPAs / client-side | No server secret, PKCE |
| JWT bearer | Server-to-server | Named-credential friendly, no user |
| Client credentials | Server-to-server | System-to-system, no user |

> **Refresh tokens are the long-lived keys; access tokens are the short-lived
> currency.** Never ship a refresh token to a browser (SPA) — use **PKCE +
> user-agent** flow.

## Tokens, Scopes & Secrets

Scopes gate what a token can do:

- `api` — data API access
- `full` — everything, including metadata
- `refresh_token` — get new access tokens
- `web` — id/name claims

Store secrets in **Named Credentials**, not in code or custom settings.

```apex
System.HttpRequest req = new System.HttpRequest();
req.setEndpoint('callout:External_ERP/customers');
req.setMethod('GET');
req.setHeader('Accept', 'application/json');
HttpResponse res = new Http().send(req);
if (res.getStatusCode() == 200) { /* handle body */ }
```

> Never hardcode secrets. Named Credentials let the platform **mint and refresh
> the token**. Rotate client secrets and set expiry on connected apps.

## Named Credentials in Practice

1. Create a **Connected App** with the scopes you need (`api`, `refresh_token`).
2. Create a **Named Credential** pointing at the auth URL — the platform exchanges
   and refreshes the token for you.
3. Use `callout:<Credential>/path` in Apex; the platform substitutes the full URL
   and token at runtime.
4. On a **401**, refresh and retry once, then fail with an actionable error.

## Defense-in-Depth Checklist

- TLS for every transport; never accept plaintext HTTP.
- Validate redirect URIs and **use PKCE for browser clients**.
- Least-privilege scopes; separate connected apps per integration.
- Rate-limit and monitor integration endpoints.
- Log integration calls (the repo uses `REST_Integration_Log__c`), never tokens.

## Exercise — Secure Callout

- Create a Connected App with `api` + `refresh_token`
- Configure a Named Credential (principal) with the auth URL
- Call it from `IntegrationService` with
  `setEndpoint('callout:External_ERP/...')`
- Handle 401 by refreshing and retrying once

Verify: one Named Credential drives auth; logs show **no hardcoded URLs** in Apex.

## Repo Artifacts to Open

- `force-app/main/default/classes/AuthService.cls` — OAuth flow helpers
- `force-app/main/default/classes/IntegrationService.cls` — Named-credential callers
- `docs/assets/answers.js` — `C8EX1` model answer