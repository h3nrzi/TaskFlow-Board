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

## Validation requirements to carry forward

Apply [Validation ownership and canonicalization requirements](../design/validation-policy.md): approved in full by Q8 confirmation of its resolved owning decision. Preserve staged raw/canonical validation without premature length checks, authenticated domain enforcement, canonical output and tolerant-extra-field readers, validated safe errors, whole-read failure and uncertain-mutation recovery. Exact responsibilities and evaluation scenarios are linked there; retain this ticket's existing scope.

## Approved Blueprint requirements to carry forward

Apply [API Architecture Blueprint for progressive integration](../design/api-architecture-blueprint.md), approved in full by Q22, including its remaining-owner table and all fifteen evaluation scenarios. Explicitly settle the coherent account-scoped Workspace read, task/project/profile revision transport and conflict semantics, destructive preconditions, serial cascade/mutation outcomes and original-versus-current idempotency recovery representation.

Cover the approved pending registration, intentional verification, bounded resend, restricted enrollment/recovery, explicit sign-in, session lookup, scoped sign-out and foreground activity/touch contracts. Preserve server-enforced 30-minute inactivity/24-hour absolute sessions, 30-minute proofs with atomic three-valid-proof cap, one 15-minute enrollment authority, atomic activation/recovery and no active-account enrollment reopening. Public acknowledgements and service/verification/enrollment outcomes must preserve enumeration resistance, delivery distinctions and uncertainty.

Own implementable contract-facing credential/session transport choices, authentication metadata, request-integrity/CSRF requirements, no-store behavior, exact rate limits and foreground activity handling. Settle remaining registration/enrollment input, email identity/comparison, repeat/pending-lifetime and provisional-presentation review policies needed by that chosen flow. Do not silently defer API-visible choices to implementation; do not implement providers, storage or deployment. Schema owner expresses the approved decisions without selecting business policy independently.
