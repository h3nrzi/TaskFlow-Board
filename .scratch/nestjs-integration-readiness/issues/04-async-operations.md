# Define asynchronous operation completion and user feedback

Status: open
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow NestJS Integration Readiness — decision map](../map.md)
Assignee: unassigned
Blocked by: 02, 03

## Question

With ownership and contract guarantees established, what should callers observe while an operation is pending, succeeds or fails, and what minimum frontend preparation is necessary?

Use create-project-and-navigate, edit-task-and-close, task reassignment, and delete-project-with-cascade as concrete scenarios. Decide when data changes, when a form closes, when success appears, and what happens to the draft and current view after failure. Cover duplicate submission, stale responses, unmount/navigation and repeated actions proportionately.

Compare confirmed completion and optimistic alternatives without selecting one in advance. Distinguish local in-memory completion from existing asynchronous saving notices; preserve current local workflows. Decide what readiness must change, what can be exercised with controlled delays/failures, and which policies should wait for the first connected capability. Do not assume every command must become a Promise or introduce a query library.

## Existing evidence

Current operations update local React state synchronously; only createProject returns a value (the new ID). The shell immediately closes forms, reports success and sometimes navigates. Local persistence completion/failure is reported separately.

Source paths: `apps/web/src/workspace/`, `apps/web/src/app/workspace-shell.tsx`, `apps/api/src/app.module.ts`, `docs/architecture/frontend.md`, and `docs/testing/e2e-coverage-hardening-audit.md`. These are inspected facts, not approved architectural answers.

## Resolution requirements

Human-in-the-loop decision. Use grilling and domain-modeling; ask the live user, do not substitute their answers. Record alternatives, trade-offs, retained behavior, preparation if needed, deferrals and verification implications. Explicit user approval is required before resolution. Keep implementation tickets and application changes outside this map.

## Prerequisites

- [Choose the minimum persistence boundary for local and future remote operation](02-persistence-boundary.md)
- [Define the frontend-facing contract needed for incremental API integration](03-api-contract.md)
