# Define account email-change scope and security requirements

Status: resolved
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: Codex (current wayfinder session)
Blocked by: 03, 11

## Question

Given the approved separation of immutable account identity, editable display name and account email, does the MVP API expose email changes now, or deliberately defer that capability? If included, what verification, authorization, conflict, failure and completion requirements must the contract guarantee before the new email becomes authoritative? Specify the frontend-visible outcomes without selecting an authentication mechanism or implementing delivery/security infrastructure. Keep ordinary profile updates unable to change email. If deferred, explicitly specify read-only account email for this MVP and the trigger for reconsideration.

## Resolution requirements

Human-in-the-loop decision. Consult grilling and domain-modeling. Explicit user approval is required before resolution. Record the approved scope and security requirements in a linked design asset or Answer. This child supplies requirements to the Endpoint Catalog, not implementation work. No backend/authentication/dependency changes.

## Comments

Created from the user's explicit Q18 clarification on 2026-10-24. Neither inclusion nor deferral of an MVP email-change endpoint is approved yet; verification and authorization requirements must be designed separately.

### Approved architectural prerequisite — 2026-10-24

Apply [API Architecture Blueprint for progressive integration](../design/api-architecture-blueprint.md), approved in full by Q22. Account/Profile owns canonical identity/state/presentation; Authentication coordinates lifecycle/security authority. Pending verification/enrollment recovery cannot reopen active accounts or replace their credentials. Email-change scope remains this decision's own question and is not implicitly approved by registration verification. Use the approved active-account/session/security guarantees when deciding its requirements; no provider, credential strategy or transport is inferred.

### Q1 approval and consolidated confirmation checkpoint — 2026-10-24

The user explicitly approved deferring account email changes beyond the MVP: registered email is read-only; ordinary profile updates support only display name with existing validation, ownership and optimistic concurrency. Account ID remains immutable and client-supplied data cannot modify registered email. Exclude email-change endpoints/workflows and their verification/recovery from all MVP API design artifacts. Preserve the approved authentication lifecycle/security/isolation guarantees. Revisit upon account-settings expansion, establishing authorization, reauthentication, new-mailbox proof, conflicts, session effects and recovery before endpoint design/implementation. No password recovery, account recovery or alternate email-modification paths are introduced.

The user requested consolidation and final shared-understanding confirmation before resolution. [MVP account email scope](../design/account-email-scope.md) consolidates the approved outcome, downstream obligations, preflight evidence and six reproducible evaluation scenarios. No further architectural decision is identified within this ticket's deferred scope. Exact catalog/schema details remain with their existing owners. Ticket remains claimed; no Answer or resolved map index entry until confirmation.


### Q2 final shared-understanding confirmation — 2026-10-24

The user reviewed the complete consolidated specification against Q1 and all six scenarios, confirmed no material discrepancies, approved it and explicitly authorized resolution and propagation to the map, Blueprint, Endpoint Catalog, shared schemas and OpenAPI requirements. This supersedes the pending-confirmation checkpoint above. Design approval only; runtime verification and human implementation acceptance remain pending.

## Answer

Resolved on 2026-10-24 with explicit Q2 approval of [MVP account email scope](../design/account-email-scope.md), the canonical requirement artifact.

Approved choice: defer secure email changes beyond the MVP. The linked specification defines read-only registered email, immutable account identity, display-name-only profile updates and strict rejection of unsupported email/account-ID request fields. It excludes email-change endpoints/workflows/contracts and alternate account/credential recovery paths while preserving all approved authentication lifecycle, security and isolation guarantees.

Retained behavior and minimum preparation: retain profile canonical validation, ownership and optimistic concurrency; browser-local behavior is unchanged. Documentation/contract-only outcome; no application, dependency, configuration, storage or test changes or mandatory preliminary refactor.

Deferred work and trigger: revisit secure email changes when account settings expand, establishing authorization, reauthentication, new-mailbox proof, conflicts, session effects and recovery before endpoint design or implementation. Exact approved MVP API/schema details retain their existing downstream owners. No new decision child is needed for this out-of-scope capability.

Verification and handoff: Q2 accepted the design and all six linked review scenarios. Whitespace, local-link, lifecycle and dependency checks passed; no application tests, builds or runtime/security checks were run. Runtime verification and human implementation acceptance remain pending. First concrete action: resume the map with [Design the MVP Endpoint Catalog](12-endpoint-catalog.md). This session resolves only the present decision.
