# Choose the policy for existing local data when remote capabilities arrive

Status: resolved
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow NestJS Integration Readiness — decision map](../map.md)
Assignee: unassigned
Blocked by: 02, 03, 05

## Question

When a user first connects a future remote capability, what happens to existing browser-local work, and what migration decisions are necessary before readiness can be called complete?

Compare separate local and connected workspaces, explicit import, and other justified policies without assuming any transfer must exist. Evaluate empty/nonempty server data, repeated or interrupted import, ID/reference collisions, missing projects, partial failures and returning to the local MVP. Decide protection, consent, recovery and verification requirements before considering mechanics.

Clarify which local data categories are transferable: projects/tasks versus profile/theme/demo identity. Specify whether migration is deliberately deferred and what triggers its design, or which guarantees must be agreed now. Do not equate replacing local persistence with safely importing user data; do not assume automatic merge or deletion of the source snapshot.

## Existing evidence

Existing work is stored under taskflow-store-v1 as one validated snapshot. Exact saved-byte export and current-workspace export already exist. No backend identity, import endpoint or migration mechanism currently exists.

Source paths: `apps/web/src/workspace/`, `apps/web/src/app/workspace-shell.tsx`, `apps/api/src/app.module.ts`, `docs/architecture/frontend.md`, and `docs/testing/e2e-coverage-hardening-audit.md`. These are inspected facts, not approved architectural answers.

## Resolution requirements

Human-in-the-loop decision. Use grilling and domain-modeling; ask the live user, do not substitute their answers. Record alternatives, trade-offs, retained behavior, preparation if needed, deferrals and verification implications. Explicit user approval is required before resolution. Keep implementation tickets and application changes outside this map.

## Prerequisites

- [Choose the minimum persistence boundary for local and future remote operation](02-persistence-boundary.md)
- [Define the frontend-facing contract needed for incremental API integration](03-api-contract.md)
- [Assign validation ownership across forms, domain rules and external data](05-validation-ownership.md)


## Answer

### Scope closure — 2026-10-23

Retired from the frontier, not resolved as a second decision session. The user explicitly approved disposable local development/test data and no transition migration, import/export, preservation or offline synchronization requirement while resolving [Choose the unit and ownership rules for progressive integration](01-progressive-integration-boundary.md#answer). Its Answer is the canonical policy. The transfer alternatives above are historical question framing and are no longer live questions. Existing local MVP export/recovery functionality is not removed.

No migration readiness gate remains. Removed this ticket from the testability decision's blockers; remaining dependencies are unchanged. This scope closure makes no claim about implementation or runtime verification.
