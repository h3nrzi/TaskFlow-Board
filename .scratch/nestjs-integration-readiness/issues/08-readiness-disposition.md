# Approve the minimum readiness scope before implementation planning

Status: open
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: unassigned
Blocked by: 07, 11, 14

## Question

Considering the approved decisions, is the expanded API architecture and integration-readiness design complete, explicitly approved and clear enough to begin implementation planning?

For each earlier decision, link its answer and classify the outcome as retain existing design, document/agree a contract, require minimum frontend preparation, or defer with an explicit trigger. Do not restate the answers here as a competing specification. Challenge proposed abstractions or changes that lack a concrete integration requirement.

Identify any remaining architectural blocker, contradictory guarantees or hidden assumption; create new decision children and dependencies if necessary rather than declaring readiness prematurely. Confirm the six planned deliverables are present, traceable and consistent, with dates/assignment and other product changes explicitly approved rather than inherited from the MVP. Confirm retained behavior, local-configuration independence and module-by-module frontend/backend verification requirements, including the permitted authentication-connected/tasks-and-projects-local increment. Seek explicit user approval of the resulting scope; approval opens later implementation planning and authorizes no code changes in this map.

## Existing evidence

The user approved a decision set covering what must change, stay and wait, with progressive integration and a fully operational independent local MVP. No application changes or implementation tickets are authorized by charting.

Source paths: `apps/web/src/workspace/`, `apps/web/src/app/workspace-shell.tsx`, `apps/api/src/app.module.ts`, `docs/architecture/frontend.md`, and `docs/testing/e2e-coverage-hardening-audit.md`. These are inspected facts, not approved architectural answers.

## Resolution requirements

Human-in-the-loop decision. Use grilling and domain-modeling; ask the live user, do not substitute their answers. Record alternatives, trade-offs, retained behavior, preparation if needed, deferrals and verification implications. Explicit user approval is required before resolution. Keep implementation tickets and application changes outside this map.


## Prerequisites

- [Choose evidence that proves local independence and each integration increment](07-testability.md)
- [Define the API Architecture Blueprint for progressive integration](11-api-architecture-blueprint.md)
- [Specify the OpenAPI document and its contract consistency rules](14-openapi-specification.md)


## Approved Endpoint Catalog to carry forward

Apply the complete [MVP Endpoint Catalog](../design/endpoint-catalog.md), explicitly confirmed with no material discrepancies in the final review of [Design the MVP Endpoint Catalog](12-endpoint-catalog.md#answer) on 2026-10-24. Preserve all Q1–Q28/clarifications, 22 explicit operations/five HEAD counterparts, exact success/error/header/authority/validation/retention/abuse contracts, downstream ownership and E1–E34 checkpoints. Explicit catalog choices refine earlier detail/mechanism deferrals; do not independently revise approved policy or add fields. Implementation, runtime/security evidence and human implementation acceptance remain pending. This reference update does not claim, start, resolve or otherwise change the lifecycle/assignee of this decision.


## Approved shared Schema-First specification to carry forward

Apply the complete [Shared Schema-First contract specification](../design/shared-schema-contracts.md), explicitly confirmed in Q17 of [Specify the shared Schema-First contracts](13-shared-schema-contracts.md#answer) on 2026-10-25 with no material discrepancies. Preserve its approved Q1–Q16 clarifications, public inventory/operation coverage, four-role validation boundaries, transport/security/error contracts, exact Unicode 17.0.0 classification baseline, runtime-only declarations, generation safeguards, compatibility obligations and S1–S16 evaluation checkpoints. It refines previously unspecified schema/transport details without creating a competing catalog or payload authority. Generated OpenAPI verification, implementation/runtime/browser parity, security evidence and human implementation acceptance remain pending. Apply these requirements only within this ticket's existing scope when it is separately started; this reference update does not claim, start, resolve or change its status, assignee or dependencies.
