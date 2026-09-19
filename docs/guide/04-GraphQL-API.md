# Phase 04 — GraphQL API

Query, mutate, fragments, and one-round-trip nested reads over the Salesforce
GraphQL API.

## The Endpoint

GraphQL runs over `POST /services/data/v68.0/graphql` with the same OAuth Bearer
token as REST.

```graphql
POST /services/data/v68.0/graphql
Content-Type: application/json

{ "query": "{ uiapi { query { Account(first: 2) {
    edges { node { Id Name { value } } } } } } }" }
```

Salesforce GraphQL models records as **nodes/edges**. Access is behind the
`uiapi` namespace, so **field-level security is respected** — you only see fields
your user can.

> GraphQL shines for dashboards and mobile lists: define exactly the fields you
> need (no over-fetching) and traverse relationships in **one round trip**.

## Queries with Variables

```graphql
query GetAccounts($n: Int!){
  uiapi {
    query {
      Account(first: $n) {
        edges {
          node {
            Id
            Name { value }
            Health_Score__c { value }
          }
        }
      }
    }
  }
}
```

**Self-check:** Why put a `$variable` for the limit? Reusable, cache-friendly,
and it avoids building the query string per request. Validation catches type
errors server-side.

## Fragments for Reuse

```graphql
fragment AccountFields on Account {
  Id
  Name { value }
  Health_Score__c { value }
}

query WithFragment($n: Int!){
  uiapi { query { Account(first: $n) { edges { node { ...AccountFields } } } } }
}
```

## Mutations

Mutations change data. The signature returns the affected record so the client
stays in sync. Errors come back in the **errors array with partial results** —
never assume all-or-nothing.

```graphql
mutation {
  uiapi {
    Account {
      update(recordId: "001xx", fields: { Health_Score__c: 92 }) {
        record { Id Health_Score__c { value } }
      }
    }
  }
}
```

> Unlike composite `allOrNone`, GraphQL returns **partial success**. Always check
> the `errors` array per field before trusting the data.

## Exercise — Accounts with Contacts

One GraphQL query returning the first 3 Accounts with each related Contact.

Verify: 3 Accounts with their first 5 Contacts each arrive in **one response** —
no N+1 of separate Contact calls.

## Repo Artifacts to Open

- `force-app/main/default/classes/GraphQLService.cls` — service wrapping GraphQL calls
- `docs/assets/answers.js` — `C4EX1` model answer