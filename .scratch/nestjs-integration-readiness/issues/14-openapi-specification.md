# Specify the OpenAPI document and its contract consistency rules

Status: open
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: unassigned
Blocked by: 13

## Question

What OpenAPI document completely describes the approved MVP Endpoint Catalog and canonical shared schemas, and how will consistency be maintained? Produce a linked OpenAPI design artifact and define supported specification version, security descriptions, operation identifiers, schema references, examples and error coverage. Choose generated versus authored portions with canonical runtime schemas remaining the source of truth; avoid a second manually maintained DTO authority. Record planned validation/drift checks and explicit user review. Generation wiring, dependencies, server handlers and CI implementation remain outside this planning map.

## Resolution requirements

Human-in-the-loop decision. Consult grilling and domain-modeling. Explicit user approval is required before resolution. Link detailed design assets from this ticket; the map indexes only the answer gist. Planning-only: no application, dependency or production package changes.

## Prerequisites

- [Specify the shared Schema-First contracts](13-shared-schema-contracts.md)
