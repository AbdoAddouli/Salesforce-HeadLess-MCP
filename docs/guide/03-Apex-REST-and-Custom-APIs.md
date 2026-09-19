# Phase 03 — Apex REST & Custom APIs

Expose Apex as public endpoints with `@RestResource`, handle JSON, return proper
HTTP status codes, and secure the endpoint.

## Defining Your Endpoint

```apex
@RestResource(urlMapping='/acme/health/v1/*')
global with sharing class CustomRestEndpoint {

  @HttpPost
  global static HealthResponse upsertHealth(HealthRequest req) {
    if (req == null) throw new RestRequestException('Missing body');
    // ... upsert by external key ...
    return new HealthResponse(ok, message);
  }
}
```

`urlMapping` is relative to `/services/apexrest/`, so this class is reachable at
`/services/apexrest/acme/health/v1/*`. Annotations: `@HttpGet`, `@HttpPost`,
`@HttpPut`, `@HttpPatch`, `@HttpDelete`.

> Method names are arbitrary — the **HTTP verb comes from the annotation
> pairing**. Map one method per verb per URL.

## Reading & Writing JSON

```apex
global class HealthRequest {
  global String accountId;
  global Integer score;
}

// from the incoming body
HealthRequest req = (HealthRequest) JSON.deserialize(
  RestContext.request.requestBody.toString(), HealthRequest.class);

// build outgoing JSON
String body = JSON.serialize(new HealthResponse(true, 'Ok'));
```

> **Version your payloads.** Public REST APIs should put a version in the URL
> (`/v1`) and never break existing consumers on a breaking field change.

## Status Codes & Errors

| Case | Code |
|---|---|
| Success | 200 / 201 Created |
| Created in POST | 201 |
| Wrong input | 400 Bad Request |
| Not authenticated | 401 Unauthorized |
| Forbidden | 403 Forbidden |
| Not found | 404 Not Found |
| Server error | 500 |

```apex
global static HttpResponse myGet() {
  RestResponse res = RestContext.response;
  res.statusCode = 404;
  res.responseBody = Blob.valueOf('Not found');
  return res;
}
```

## Securing Your Endpoint

- Declare `with sharing` so records respect the caller's sharing rules.
- Validate and whitelist input before any DML (no raw JSON passthrough).
- Use Named Credentials for any outbound calls the endpoint makes.
- Configure CORS for browser clients that need to call the endpoint directly.

## Exercise — Apex Health Endpoint

- `@RestResource(urlMapping='/acme/health/v1/*')`
- `@HttpPost` accepting `{externalId, score}`
- Upsert on Id or `External_Key__c`
- Return JSON `{id, score}` with **201 on create, 200 on update**
- `with sharing` + a test covering both paths

Verify: POST returns a created Id (201) the first time and 200 afterwards; the
test passes with coverage.

## Repo Artifacts to Open

- `force-app/main/default/classes/CustomRestEndpoint.cls` — the endpoint itself
- `force-app/main/default/classes/CustomRestEndpointTest.cls` — happy + error path tests
- `docs/assets/answers.js` — `C3EX1` model answer