# Design the MVP Endpoint Catalog

Status: open
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: unassigned
Blocked by: 11, 04, 16

## Question

What is the complete MVP API surface required by the approved domain/business rules and architecture? Produce a linked Endpoint Catalog with concrete paths, methods, request/query/body shapes, authoritative success responses, status codes and error outcomes. Cover task/project reads and mutations, standalone tasks, cascade deletion, repeated deletion, account/profile and authentication operations required by the approved scope. Deliberately choose collection ordering/filtering/pagination and any summary endpoints based on MVP needs. Define not-found versus authorization visibility, null/omission, malformed inputs and failures. Establish transport/authentication-facing details needed for an implementable catalog without implementing backend auth. Trace each endpoint to a workflow and avoid adding speculative endpoints.

## Resolution requirements

Human-in-the-loop decision. Consult grilling and domain-modeling. Explicit user approval is required before resolution. Link detailed design assets from this ticket; the map indexes only the answer gist. Planning-only: no application, dependency or production package changes.

## Prerequisites

- [Define the API Architecture Blueprint for progressive integration](11-api-architecture-blueprint.md)
- [Define asynchronous operation completion and user feedback](04-async-operations.md)
- [Define account email-change scope and security requirements](16-account-email-change.md)

## Approved async requirements to carry forward

Specify account-scoped task/project creation idempotency: key transport, exact-original-payload recovery, equivalence/original-outcome semantics, different-payload conflict, safe concurrent/in-progress handling, retention window and expired/unavailable-record recovery. No automatic replay or inference that an unavailable record makes retry safe. See [Asynchronous completion, feedback and recovery requirements](../design/async-operation-policy.md), approved in full by Q14 confirmation of its owning decision.
