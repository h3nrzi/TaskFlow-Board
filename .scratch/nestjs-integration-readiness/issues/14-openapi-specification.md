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
