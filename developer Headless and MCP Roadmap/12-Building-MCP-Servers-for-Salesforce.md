# Phase 12 — Building MCP Servers for Salesforce

TypeScript SDK, typed tools, Agentforce registration, and end-to-end testing.

## A Minimal MCP Server

```ts
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({ name: 'sf-health', version: '1.0.0' });

server.tool('get_account_health', { accountId: z.string() },
  async ({ accountId }) => ({
    content: [{ type: 'text', text: await fetchHealth(accountId) }]
  }));

const transport = new StdioServerTransport();
await server.connect(transport);
```

> Tools declare **input schemas (zod / JSON Schema)**. Type-safe inputs mean
> fewer hallucinated args and clearer failures for the model.

## Backing Tools with Salesforce

Your tools typically call Salesforce via **jsforce** or a mediated gateway.
Prefer platform-hosted MCP servers when they cover the need; build your own when
you need custom, domain-specific multi-step operations.

- Use Instance + token from **env vars** injected on the server
- **Validate the caller scope** before acting
- Return **structured results** the model can reason over (not just "done")

**Self-check:** Why return structured results from a tool? Models reason from the
data they receive; rich structured output reduces guesswork and re-queries.

## Registering with Agentforce

Registering connects your server to an agent:

1. The agent gets the **tool list** (name, description, schema).
2. During a conversation the agent can **invoke** a tool it declares.
3. **Scopes + auth** ensure the agent only calls what it may.

> Test from a **real MCP client, not just curl**. Verify tool discovery, argument
> validation, and error surfacing — the failure modes an agent hits are API
> failures, not UI ones.

## Security Checklist

- Inject credentials via env vars / secret manager — never commit them.
- Scope each tool to the minimum Salesforce permission.
- Sanitize and validate every argument (zod does the shape; you do the domain).
- Log tool invocations to an audit trail.
- Support both `stdio` (local/dev) and `streamable-http` (remote) transports.

## Exercise — Health Tool

A server exposing an MCP tool that returns an Account health summary:

- Scaffold with `@modelcontextprotocol/sdk` + zod
- Tool: `get_account_health(accountId)`
- Back it with a jsforce read of Account + Health fields
- Wire env vars for instance/token/scope
- Connect via `StdioTransport` and call it from a client

Verify: the client lists and calls the tool, returning the account health JSON.

## Repo Artifacts to Open

- `force-app/main/default/classes/McpServerService.cls` — SDK sample reference
- `docs/assets/answers.js` — `C12EX1` model answer