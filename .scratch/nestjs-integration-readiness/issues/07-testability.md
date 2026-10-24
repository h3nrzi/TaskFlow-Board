# Choose evidence that proves local independence and each integration increment

Status: open
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: unassigned
Blocked by: 04, 05, 14

## Question

What minimum test seams and evidence will demonstrate that the approved architecture preserves local behavior and supports verified incremental integration?

Separate portable user-facing behavior, browser-local storage safeguards, fixture setup and remote contract/operation behavior. Decide which existing tests and pure seams suffice, whether controlled async delays/failures or contract examples are needed, and what must wait for a real API capability.

Account for pending/error/retry scenarios selected in prior answers, invalid external data, disposable development data (no transfer requirement), cross-surface consistency and the ability to run the local MVP with NestJS stopped. Identify deterministic setup requirements without inventing a universal backend fixture layer. Cover intentionally activated modules, authentication/profile connected while tasks/projects remain local, coupled-operation ownership, and absence of availability-based activation or fallback. Define the verification checkpoint for an integration increment, distinguish simulated evidence from live integration evidence, and preserve pending human evaluation explicitly. Produce a linked integration and contract-testing strategy covering shared schemas, both consumers, endpoint/OpenAPI consistency, error and cascade contracts, and compatibility across deployed versions. Specify design-time checks versus future simulated/live evidence and per-module evaluation checkpoints. Decide evidence requirements, not a test implementation backlog.

## Existing evidence

The hardened browser suite distinguishes UI contracts, local storage safeguards and fixture dependencies. Pure transitions/selectors already exist. Historical complete E2E evidence is documented, but there are no domain API integration tests and no readiness claim.

Source paths: `apps/web/src/workspace/`, `apps/web/src/app/workspace-shell.tsx`, `apps/api/src/app.module.ts`, `docs/architecture/frontend.md`, and `docs/testing/e2e-coverage-hardening-audit.md`. These are inspected facts, not approved architectural answers.

## Resolution requirements

Human-in-the-loop decision. Use grilling and domain-modeling; ask the live user, do not substitute their answers. Record alternatives, trade-offs, retained behavior, preparation if needed, deferrals and verification implications. Explicit user approval is required before resolution. Keep implementation tickets and application changes outside this map.


## Prerequisites

- [Define asynchronous operation completion and user feedback](04-async-operations.md)
- [Assign validation ownership across forms, domain rules and external data](05-validation-ownership.md)
- [Specify the OpenAPI document and its contract consistency rules](14-openapi-specification.md)

## Approved async requirements to carry forward

Cover all ten async-policy scenarios with controlled pending, rejection, response-loss, concurrent same-submission creation, stale/account-switched results and draft-lifetime evidence. Preserve local independence; design approval and test passes do not establish human implementation acceptance. See [Asynchronous completion, feedback and recovery requirements](../design/async-operation-policy.md), approved in full by Q14 confirmation of its owning decision.

## Validation requirements to carry forward

Apply [Validation ownership and canonicalization requirements](../design/validation-policy.md): approved in full by Q8 confirmation of its resolved owning decision. Preserve staged raw/canonical validation without premature length checks, authenticated domain enforcement, canonical output and tolerant-extra-field readers, validated safe errors, whole-read failure and uncertain-mutation recovery. Exact responsibilities and evaluation scenarios are linked there; retain this ticket's existing scope.

## Approved Blueprint requirements to carry forward

Apply [API Architecture Blueprint for progressive integration](../design/api-architecture-blueprint.md), approved in full by Q22 and all fifteen scenarios. Cover coherent snapshots, stale task/project/profile edits, serial cascade races, atomic durable idempotency with original-outcome recovery, verification cap/expiry/concurrent redemption, scanner-safe confirmation, pre-registration takeover, atomic enrollment/recovery and active-account exclusion, scoped revocation and copied credentials, foreground versus background activity and server deadlines, security boundary enforcement and independent local operation.

Define deterministic concurrency/clock/failure evidence, direct API authorization/request-integrity checks and module activation checkpoints. Distinguish simulated checks from live security/consistency evidence and design approval from pending human implementation acceptance. Revised Q18 permits meaningful foreground reads/editing and a protected activity-touch operation; do not substitute the rejected mutation-only policy.


## Approved Endpoint Catalog to carry forward

Apply the complete [MVP Endpoint Catalog](../design/endpoint-catalog.md), explicitly confirmed with no material discrepancies in the final review of [Design the MVP Endpoint Catalog](12-endpoint-catalog.md#answer) on 2026-10-24. Preserve all Q1–Q28/clarifications, 22 explicit operations/five HEAD counterparts, exact success/error/header/authority/validation/retention/abuse contracts, downstream ownership and E1–E34 checkpoints. Explicit catalog choices refine earlier detail/mechanism deferrals; do not independently revise approved policy or add fields. Implementation, runtime/security evidence and human implementation acceptance remain pending. This reference update does not claim, start, resolve or otherwise change the lifecycle/assignee of this decision.


## Approved shared Schema-First specification to carry forward

Apply the complete [Shared Schema-First contract specification](../design/shared-schema-contracts.md), explicitly confirmed in Q17 of [Specify the shared Schema-First contracts](13-shared-schema-contracts.md#answer) on 2026-10-25 with no material discrepancies. Preserve its approved Q1–Q16 clarifications, public inventory/operation coverage, four-role validation boundaries, transport/security/error contracts, exact Unicode 17.0.0 classification baseline, runtime-only declarations, generation safeguards, compatibility obligations and S1–S16 evaluation checkpoints. It refines previously unspecified schema/transport details without creating a competing catalog or payload authority. Generated OpenAPI verification, implementation/runtime/browser parity, security evidence and human implementation acceptance remain pending. Apply these requirements only within this ticket's existing scope when it is separately started; this reference update does not claim, start, resolve or change its status, assignee or dependencies.
