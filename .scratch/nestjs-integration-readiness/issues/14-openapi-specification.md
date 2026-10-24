# Specify the OpenAPI document and its contract consistency rules

Status: open
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: unassigned
Blocked by: 13

## Question

What OpenAPI document completely describes the approved MVP Endpoint Catalog and canonical shared schemas, and how will consistency be maintained? Apply the [approved tooling and generation design](../design/shared-schema-tooling.md): OpenAPI 3.1 generated from the authoritative operation catalog and shared Zod schemas by native conversion plus a small assembler, with all mandatory safeguards. Produce a linked OpenAPI design artifact and specify security descriptions, operation identifiers, schema references, examples and error coverage. Do not introduce independently maintained payload schemas or competing controller-derived operation authority. Record planned validation/drift checks and explicit user review. Generation wiring, dependencies, server handlers and CI implementation remain outside this planning map.

## Resolution requirements

Human-in-the-loop decision. Consult grilling and domain-modeling. Explicit user approval is required before resolution. Link detailed design assets from this ticket; the map indexes only the answer gist. Planning-only: no application, dependency or production package changes.

## Prerequisites

- [Specify the shared Schema-First contracts](13-shared-schema-contracts.md)

## Validation requirements to carry forward

Apply [Validation ownership and canonicalization requirements](../design/validation-policy.md): approved in full by Q8 confirmation of its resolved owning decision. Preserve staged raw/canonical validation without premature length checks, authenticated domain enforcement, canonical output and tolerant-extra-field readers, validated safe errors, whole-read failure and uncertain-mutation recovery. Exact responsibilities and evaluation scenarios are linked there; retain this ticket's existing scope.


## Approved account email scope to carry forward

Apply [MVP account email scope](../design/account-email-scope.md), approved in full by Q2 of [Define account email-change scope and security requirements](16-account-email-change.md#answer). Registered account email is read-only; account ID is immutable. Ordinary profile updates accept display name only, preserving canonical validation, ownership and independent profile optimistic concurrency. Strictly reject unsupported email/account-ID request fields. Exclude email-change endpoints, pending-change workflows and email-change verification/recovery contracts from the MVP design. Preserve email response fields and approved registration/enrollment inputs, all approved authentication lifecycle/security/isolation guarantees and restricted pending enrollment recovery. Do not add password/account recovery or alternate email-modification paths. Secure email changes require a future account-settings expansion and prior security decisions; exact approved MVP transport/schema choices retain their existing owners. Carry the six linked evaluation scenarios forward without claiming runtime verification or implementation acceptance.


## Approved Endpoint Catalog to carry forward

Apply the complete [MVP Endpoint Catalog](../design/endpoint-catalog.md), explicitly confirmed with no material discrepancies in the final review of [Design the MVP Endpoint Catalog](12-endpoint-catalog.md#answer) on 2026-10-24. Preserve all Q1–Q28/clarifications, 22 explicit operations/five HEAD counterparts, exact success/error/header/authority/validation/retention/abuse contracts, downstream ownership and E1–E34 checkpoints. Explicit catalog choices refine earlier detail/mechanism deferrals; do not independently revise approved policy or add fields. Implementation, runtime/security evidence and human implementation acceptance remain pending. This reference update does not claim, start, resolve or otherwise change the lifecycle/assignee of this decision.
