# Define the frontend-facing contract needed for incremental API integration

Status: open
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow NestJS Integration Readiness — decision map](../map.md)
Assignee: unassigned
Blocked by: 01

## Question

What minimum data, operation and error contract must frontend and future NestJS capabilities agree on, independently of a server implementation?

Define the necessary guarantees for reads, create/update/delete results, IDs, optional and cleared fields, standalone project assignment, dates, validation errors, missing resources and project deletion cascade. Distinguish existing in-memory/domain types from a wire contract; decide whether translation or shared artifacts are necessary rather than assuming either.

What compatibility and contract-evolution rules are needed for incremental capabilities? Decide how much endpoint/transport detail readiness actually needs and what can wait. Preserve domain semantics; any proposed incompatibility requires explicit scope review. Detailed retry, versioning or idempotency guarantees should be specified only where the chosen operations require them, with unresolved dependent questions ticketed.

## Existing evidence

There are no domain API endpoints or DTOs. /api is the documented future browser API base; only /api/healthz is implemented. Local IDs are generated from Date.now(); standalone tasks use an empty projectId, assignees are free text, and stored creation/update dates are date-only strings.

Source paths: `apps/web/src/workspace/`, `apps/web/src/app/workspace-shell.tsx`, `apps/api/src/app.module.ts`, `docs/architecture/frontend.md`, and `docs/testing/e2e-coverage-hardening-audit.md`. These are inspected facts, not approved architectural answers.

## Resolution requirements

Human-in-the-loop decision. Use grilling and domain-modeling; ask the live user, do not substitute their answers. Record alternatives, trade-offs, retained behavior, preparation if needed, deferrals and verification implications. Explicit user approval is required before resolution. Keep implementation tickets and application changes outside this map.

## Prerequisites

- [Choose the unit and ownership rules for progressive integration](01-progressive-integration-boundary.md)
