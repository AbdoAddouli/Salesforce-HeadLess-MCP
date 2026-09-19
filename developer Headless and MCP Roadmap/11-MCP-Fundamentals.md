# Phase 11 — MCP Fundamentals

The Model Context Protocol: what it is, why it exists, and where it lives inside
Headless 360.

## What is MCP?

The **Model Context Protocol (MCP)** standardizes how AI applications talk to
tools and data. A host (**Agentforce, Claude Desktop, your app**) connects to an
**MCP server** that exposes capabilities as *tools*, *resources* and *prompts*.

It is to AI tools what USB is to peripherals: **one standard plug, many devices**.

> Memorize the three primitives:
> - **TOOLS** — callable actions (the AI actually acts on your org)
> - **RESOURCES** — readable data
> - **PROMPTS** — reusable instructions

## MCP Architecture

```text
AI Host (Agentforce / your app / Claude)
     |  (MCP protocol: initialize, list tools, call)
     v
MCP Server (platform-hosted or yours)
     |  (tools -> mediated Salesforce commands)
     v
Salesforce (Data/BL/Orchestration via mediated APIs)
```

Platform-hosted MCP servers ship with an ever-growing catalog — **60+ tools and
30+ coding skills at TDX 2026** — that perform mediated, safe,
permission-checked Salesforce operations (CRUD and process invocation).

**Self-check:** What does "mediated" mean in platform MCP tools? The tool call
goes **through the platform enforcing permissions, limits and audit** — never a
raw SQL-like backdoor.

## MCP Inside Headless 360

MCP servers live in the **Engagement (HXL) layer**. They are another headless
surface: any AI client — including agents — gets typed, permissioned,
chat-native access to Salesforce data and processes **without building bespoke
tools**.

- Usage types: "Salesforce Record Operation (CRUD)" and "Salesforce Process
  Invocation"
- Tool catalog: query, create, patch records; run flows; invoke invocable actions
- Safety: sharing checks, field-level security, audit trails, rate limits

## Why It Matters for Architects

- Agents get **permissioned** access, not API keys lying around.
- One protocol replaces bespoke tool-building per client.
- Adoption starts in the **Engagement layer**, above Data 360 — this is where the
  Headless 360 story and AI meet.

## Exercise — Diagram It

Draw (or pseudo-collapse into text) how an Agent calls Salesforce via an MCP
server:

- Label the host, the MCP server, and the Salesforce layers
- Name at least three tools it would expose
- Mark where permission checks happen

Verify: the diagram clearly shows **mediation at the platform** before any data
access.

## Repo Artifacts to Open

- `force-app/main/default/classes/McpFundamentalsService.cls` — MCP primer service
- `docs/assets/answers.js` — `C11EX1` model answer (surface map)