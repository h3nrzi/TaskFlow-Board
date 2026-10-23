# Approve the minimum readiness scope before implementation planning

Status: open
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow NestJS Integration Readiness — decision map](../map.md)
Assignee: unassigned
Blocked by: 07

## Question

Considering the approved decisions, what is the smallest justified readiness scope, and is the route clear enough to begin implementation planning?

For each earlier decision, link its answer and classify the outcome as retain existing design, document/agree a contract, require minimum frontend preparation, or defer with an explicit trigger. Do not restate the answers here as a competing specification. Challenge proposed abstractions or changes that lack a concrete integration requirement.

Identify any remaining architectural blocker, contradictory guarantees or hidden assumption; create new decision children and dependencies if necessary rather than declaring readiness prematurely. Confirm behavior preservation, local independence and progressive verification requirements. Seek explicit user approval of the resulting scope; approval opens later implementation planning and authorizes no code changes in this map.

## Existing evidence

The user approved a decision set covering what must change, stay and wait, with progressive integration and a fully operational independent local MVP. No application changes or implementation tickets are authorized by charting.

Source paths: `apps/web/src/workspace/`, `apps/web/src/app/workspace-shell.tsx`, `apps/api/src/app.module.ts`, `docs/architecture/frontend.md`, and `docs/testing/e2e-coverage-hardening-audit.md`. These are inspected facts, not approved architectural answers.

## Resolution requirements

Human-in-the-loop decision. Use grilling and domain-modeling; ask the live user, do not substitute their answers. Record alternatives, trade-offs, retained behavior, preparation if needed, deferrals and verification implications. Explicit user approval is required before resolution. Keep implementation tickets and application changes outside this map.

## Prerequisites

- [Choose evidence that proves local independence and each integration increment](07-testability.md)
