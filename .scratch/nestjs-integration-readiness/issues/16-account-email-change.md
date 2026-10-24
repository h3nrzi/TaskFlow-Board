# Define account email-change scope and security requirements

Status: open
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: unassigned
Blocked by: 03, 11

## Question

Given the approved separation of immutable account identity, editable display name and account email, does the MVP API expose email changes now, or deliberately defer that capability? If included, what verification, authorization, conflict, failure and completion requirements must the contract guarantee before the new email becomes authoritative? Specify the frontend-visible outcomes without selecting an authentication mechanism or implementing delivery/security infrastructure. Keep ordinary profile updates unable to change email. If deferred, explicitly specify read-only account email for this MVP and the trigger for reconsideration.

## Resolution requirements

Human-in-the-loop decision. Consult grilling and domain-modeling. Explicit user approval is required before resolution. Record the approved scope and security requirements in a linked design asset or Answer. This child supplies requirements to the Endpoint Catalog, not implementation work. No backend/authentication/dependency changes.

## Comments

Created from the user's explicit Q18 clarification on 2026-10-24. Neither inclusion nor deferral of an MVP email-change endpoint is approved yet; verification and authorization requirements must be designed separately.

### Approved architectural prerequisite — 2026-10-24

Apply [API Architecture Blueprint for progressive integration](../design/api-architecture-blueprint.md), approved in full by Q22. Account/Profile owns canonical identity/state/presentation; Authentication coordinates lifecycle/security authority. Pending verification/enrollment recovery cannot reopen active accounts or replace their credentials. Email-change scope remains this decision's own question and is not implicitly approved by registration verification. Use the approved active-account/session/security guarantees when deciding its requirements; no provider, credential strategy or transport is inferred.
