# Phase 07 — Salesforce Connect & OData

External objects, virtual data, and federating OData endpoints as if native.

## External Data Sources

Salesforce Connect exposes external data **as if it were native — no data copy**
(virtually). An External Data Source (type OData 2.0/4.0, custom adapter, or
Apex) feeds **External Objects** (suffix `__x`).

> External objects cannot be the master in Master-Detail, do not support
> roll-up summaries, and bypass Apex sharing — but they respect the external data
> source policy.

## Joining Worlds

- **External Lookup** — an external record points to a local record.
- **Indirect Lookup** — joins external records by a common key field.

You can mix local + external fields in a single SOQL statement:

```text
SELECT Id, Local_Name__c, ext.Erp_Id__c
FROM Account a
LEFT JOIN External_Account__x ext   -- via indirect lookup on Erp_Id__c
ON a.Erp_Ref__c = ext.Erp_Id__c
```

## When to Use Connect vs Sync

| Situation | Choice |
|---|---|
| Realtime external source, small reads | Salesforce Connect (virtual) |
| Need advanced reporting/rollups locally | Data sync / replication |
| Large volume always-on joins | Connect + policy tuning |
| Offline or sandbox of external data | Sync |

**Self-check:** You need local roll-up summaries over external data. What do you
choose? *Sync a copy* — external objects do not support roll-up summaries.

## Enabling Federated OData

1. Create an **External Data Source** (type: OData 4.0, URL of the endpoint).
2. **Validate & Sync** — external objects appear (suffix `__x`).
3. Query via SOQL:
   `SELECT Id, Name__c, Status__c FROM External_Account__x`
4. Add an **indirect lookup** from a local object to the external key.

Federated reads are **live** — updates in the source show up on the next query,
with read-only or read-write policy as configured.

## Exercise — OData External Objects

Expose a JSON/OData endpoint and consume it as external data:

- Stand up a local OData v4 endpoint (or use a public sample)
- Create an External Data Source of type OData 4.0
- Generate an external object + indirect lookup to Account
- Query with a mixed SOQL

Verify: a SOQL query returns local + external fields together.

## Repo Artifacts to Open

- `force-app/main/default/classes/ConnectService.cls` — Connect / OData helper
- `force-app/main/default/objects/` — `External_Account__x` external object
- `docs/assets/answers.js` — `C7EX1` model answer