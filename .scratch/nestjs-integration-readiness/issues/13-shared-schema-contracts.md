# Specify the shared Schema-First contracts

Status: open
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: unassigned
Blocked by: 12, 10, 05

## Question

How should the approved domain model and Endpoint Catalog be expressed in one shared runtime-schema contract using the selected tooling? Produce a linked design specification covering DTO/schema inventory, common enums, request/response validation, nullability, dates, opaque IDs, server-controlled fields, error structures, account/profile and compatibility examples. Keep UI state, browser snapshots and business logic outside. Specify package exports and consumer obligations without creating/wiring the production package. Ensure schemas describe both successful and failed outcomes and do not create competing frontend/backend contract definitions. Record any schema/tooling limitations requiring a user decision.

## Resolution requirements

Human-in-the-loop decision. Consult grilling and domain-modeling. Explicit user approval is required before resolution. Link detailed design assets from this ticket; the map indexes only the answer gist. Planning-only: no application, dependency or production package changes.

## Prerequisites

- [Design the MVP Endpoint Catalog](12-endpoint-catalog.md)
- [Choose shared-schema and OpenAPI tooling](10-contract-tooling.md)
- [Assign validation ownership across forms, domain rules and external data](05-validation-ownership.md)

## Approved async requirements to carry forward

Specify the catalog-selected creation idempotency submission/result/conflict/recovery contracts and compatibility obligations, including concurrent and expired/unavailable-record outcomes. Retain UI operation state outside shared wire schemas. See [Asynchronous completion, feedback and recovery requirements](../design/async-operation-policy.md), approved in full by Q14 confirmation of its owning decision.
