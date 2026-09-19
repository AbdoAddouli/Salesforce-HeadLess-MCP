# Phase 06 — Platform Events & Change Data Capture

Event-driven architecture inside Salesforce: publish platform events, subscribe
asynchronously, and replay via CDC.

## The Platform Event

A platform event is a **lightweight, transient record** (suffix `__e`). You
publish by creating an instance and calling `EventBus.publish()`. Publishing is
**atomic with the transaction**.

```apex
health_changed__e evt = new health_changed__e(
  AccountId__c  = acct.Id,
  New_Score__c  = acct.Health_Score__c,
  Old_Score__c  = oldScore
);
List<Database.SaveResult> results = EventBus.publish(new List<health_changed__e>{ evt });
for (Database.SaveResult r : results) {
  System.assert(r.isSuccess(), 'event dropped: ' + r.getErrors()[0].getMessage());
}
```

> `EventBus.publish` returns `SaveResult`; check `isSuccess()` so you catch
> limits exceptions instead of silently dropping events.

## Consuming Events

Four ways to consume:

- Apex trigger on the event (after insert)
- Flow (after-save on an event)
- Connections via the **Streaming API**
- CometD / EMP client

Subscriber triggers run **asynchronously, after the publishing transaction
commits** — fire-and-forget by design.

```apex
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
```

**Self-check:** When does a platform-event trigger run? *Asynchronously, after the
publishing transaction commits.*

## Replay & Change Data Capture

Event streams persist in a **replay buffer** so late consumers can replay missed
events. CometD clients pass a replay ID (`-1` = replay everything).

**CDC** captures creates/updates/deletes/undeletes as change event records:

```text
ChangeEventHeader { changeType: "UPDATE", entityName: "Account",
  recordIds: ["001xxx"], changedFields: ["Health_Score__c"] }
```

> Replay is not infinite — events age out of the buffer. Size your buffer or your
> replay ID will 400 (`ReplayIdOutOfBounds`).

## Exercise — Event-Driven Health Alerts

- A trigger on Account (after update) publishes **only when the score changed**
- `health_changed__e` carries `AccountId__c`, `New_Score__c`, `Old_Score__c`
- A subscriber after-insert trigger writes a `REST_Integration_Log__c` record
- Verify with an anonymous script

Verify: updating a score produces **exactly one log record per change**.

## Repo Artifacts to Open

- `force-app/main/default/classes/PlatformEventService.cls` — publisher service
- `force-app/main/default/objects/` — `health_changed__e` and
  `CDC__Change_Evaluation__e` event objects
- `docs/assets/answers.js` — `C6EX1` model answer