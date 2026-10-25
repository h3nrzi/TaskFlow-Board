# Research shared-schema and OpenAPI tooling compatibility

Status: resolved
Type: research
Labels: wayfinder:research
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: Codex — schema tooling research
Blocked by: none

## Question

Which viable tooling approaches can satisfy one runtime-schema source of truth, inferred TypeScript API types, browser/backend boundary validation and a consistent OpenAPI document in this repository? Compare a small justified set using current primary documentation and Context7. Inspect installed versions and module/build constraints. Report concrete compatibility, generation limits, schema transformations/refinements, request/response differences, maintenance/upgrade costs and how to avoid a second handwritten contract. Distinguish repository facts, documented capabilities and inferences. Do not select tooling, install dependencies or implement contracts. Link a single research Markdown asset and its isolated research branch; no PR.

## Resolution requirements

Fact-finding only. Use the research skill in a subagent and Context7 for current library documentation. Record source-backed findings, limitations and an asset/context pointer. Research completion does not approve an architectural choice.

## Answer

Resolved on 2026-10-24 as documentary research only. Tool selection remains subject to explicit human approval in [Choose shared-schema and OpenAPI tooling](10-contract-tooling.md).

[Shared-schema and OpenAPI tooling evidence](https://github.com/h3nrzi/TaskFlow-Board/blob/8d694101e95d5133f3fd1cdbeb21c0a489947c38/.scratch/nestjs-integration-readiness/research/schema-tooling-evidence.md) compares two viable lanes: Zod4 schemas with compatible Nest integration, and TypeBox0.34 LTS JSON schemas with validator integration. Both can maintain one runtime-schema authority and inferred API types; neither removes the need to author HTTP-operation metadata and domain rules.

Key version facts: current TypeScript5.9/CommonJS API fits documented Zod4 and TypeBox0.x toolchain ranges. Latest TypeBox1.x is ESM-only and documents TS6–7 support. `nestjs-zod`5.5.0 peers cover Nest11 and Zod3.25/4; Swagger11.4.7 supports Nest11, whereas latest Swagger12 requires Nest12. Current Nest documentation includes StandardSchema built-ins absent from installed Nest11.2.7 exports. Conversion/refinement limits, request/output differences, format enforcement, strictness, package exports, and design-time OpenAPI generation ownership are documented in the report. No tooling was selected.

Context: isolated [research/schema-tooling-evidence branch](https://github.com/h3nrzi/TaskFlow-Board/tree/research/schema-tooling-evidence), pushed at `8d694101e95d5133f3fd1cdbeb21c0a489947c38`; no PR, never merge. Local report: `/Users/hossein/.codex/worktrees/schema-tooling-research/TaskFlow-Board/.scratch/nestjs-integration-readiness/research/schema-tooling-evidence.md`.

Preflight: inspected repository configurations/lockfile, used Context7 resolution and focused queries, and checked official docs/specifications plus versioned published metadata. No installs, application edits, runtime experiments or tests. These are documentary compatibility findings; later integration must demonstrate execution, schema/OpenAPI parity and deployed-version behavior. First review action: compare the two lanes and open questions in the report before approving tooling. Research resolution does not establish human acceptance of a tooling choice.
