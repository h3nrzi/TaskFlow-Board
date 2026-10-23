# Choose evidence that proves local independence and each integration increment

Status: open
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow NestJS Integration Readiness — decision map](../map.md)
Assignee: unassigned
Blocked by: 04, 05, 06

## Question

What minimum test seams and evidence will demonstrate that the approved architecture preserves local behavior and supports verified incremental integration?

Separate portable user-facing behavior, browser-local storage safeguards, fixture setup and remote contract/operation behavior. Decide which existing tests and pure seams suffice, whether controlled async delays/failures or contract examples are needed, and what must wait for a real API capability.

Account for pending/error/retry scenarios selected in prior answers, invalid external data, migration policy, cross-surface consistency and the ability to run the local MVP with NestJS stopped. Identify deterministic setup requirements without inventing a universal backend fixture layer. Define the verification checkpoint for an integration increment, distinguish simulated evidence from live integration evidence, and preserve pending human evaluation explicitly. Decide evidence requirements, not a test implementation backlog.

## Existing evidence

The hardened browser suite distinguishes UI contracts, local storage safeguards and fixture dependencies. Pure transitions/selectors already exist. Historical complete E2E evidence is documented, but there are no domain API integration tests and no readiness claim.

Source paths: `apps/web/src/workspace/`, `apps/web/src/app/workspace-shell.tsx`, `apps/api/src/app.module.ts`, `docs/architecture/frontend.md`, and `docs/testing/e2e-coverage-hardening-audit.md`. These are inspected facts, not approved architectural answers.

## Resolution requirements

Human-in-the-loop decision. Use grilling and domain-modeling; ask the live user, do not substitute their answers. Record alternatives, trade-offs, retained behavior, preparation if needed, deferrals and verification implications. Explicit user approval is required before resolution. Keep implementation tickets and application changes outside this map.

## Prerequisites

- [Define asynchronous operation completion and user feedback](04-async-operations.md)
- [Assign validation ownership across forms, domain rules and external data](05-validation-ownership.md)
- [Choose the policy for existing local data when remote capabilities arrive](06-local-data-migration.md)
