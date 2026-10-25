# Asynchronous completion, feedback and recovery requirements

Decision owner: [Define asynchronous operation completion and user feedback](../issues/04-async-operations.md).

Status: approved on 2026-10-24. Q14 explicitly confirmed the complete specification against Q1–Q13, their clarifications and all ten review scenarios, with no material discrepancies, and authorized resolution of the owning decision. This is planning documentation, not implemented behavior or implementation acceptance.

## Completion and authority

Apply the approved [frontend-facing contract](frontend-facing-contract.md) and persistence/ownership decisions. Connected task/project creation, editing, reassignment and deletion, including project cascade, use confirmed completion. Wait for a successful server response validated against the shared response contract before committing authoritative UI data, closing the active submitted editor, reporting success or navigating to a created resource. Show pending feedback. No optimistic committed mutations, rollback or optimistic reconciliation machinery is selected for the MVP.

Real profile/authentication operations follow the same pending, validated-success and explicit-failure requirements where applicable. Authentication success establishes the approved account identity; sign-out succeeds only on confirmed completion. Connected failures never trigger local/demo fallback.

Local operations retain immediate in-memory completion with separately reported browser persistence. In-memory change, successful local save and server-confirmed completion remain distinct. Preserve local workflows and storage safeguards; this decision makes no browser-local behavior/storage changes.

## Editing, conflicts and definite rejection

Freeze the submitted editor's fields while pending and preserve its exact payload and associated operation identity. Suppress repeated submission across all relevant entry points. Block conflicting actions on the same resource while allowing unrelated work. Do not queue or automatically replay a second mutation.

Conflict scope follows domain dependencies: pending project deletion blocks creation inside that project, edits/deletes of its tasks, and reassignment into or out of it. Conflicting pending task operations likewise prevent deletion of the associated project. A move involves both source and destination dependencies. Other projects and unrelated standalone tasks remain usable. These are frontend coordination requirements, not cross-client locking guarantees. Backend ownership, consistency and transactional project cascade remain independently required.

On definite rejection, retain input and the form/editing context; restore editing and show field-specific validation errors where appropriate, otherwise a safe actionable operation error. Do not claim success or discard the draft. Error classification follows the shared contract. Missing-resource updates never silently recreate resources. Confirmed session expiry has separate handling below.

## Navigation, late responses and memory lifetime

Allow intentional in-app navigation or dismissal of a pending editor after an appropriate warning. The dispatched operation continues; leaving the view does not imply server-side cancellation. Preserve draft and operation status in memory for the originating account, allowing return to the editing/recovery context.

A later confirmed current-account success may update relevant authoritative data, but cannot force navigation, reopen an editor or restore an abandoned view. Prevent stale reads and obsolete asynchronous results from overwriting newer state. Previous-account results never update the current account's UI or data. Ignoring a stale response does not undo a possible server commit; use authoritative refresh when reconciliation is needed. Concrete sequencing and cancellation mechanisms remain implementation choices.

Drafts survive in-app navigation and session expiry in memory, scoped to their originating account. Explicit discard or confirmed sign-out clears drafts. Removing a draft neither cancels nor resolves a dispatched operation: retain unresolved-operation tracking as necessary for safe reconciliation, under account isolation. No particular tracking store, lifetime beyond that need or cross-reload mechanism is selected.

Warn before reload/tab closure when recoverable drafts or unresolved operations exist, within browser limitations. Do not promise draft persistence, request cancellation or recovery across reloads.

## Uncertain outcomes and deliberate recovery

Timeouts, connection loss after dispatch and invalid success responses mean completion could not be confirmed. Preserve the exact submitted payload and operation identity; do not falsely declare success or definite failure. A server may already have committed. Never automatically replay uncertain creations or potentially non-idempotent mutations. The MVP recovery path is deliberate and user-initiated; no automatic mutation-retry subsystem is selected.

Offer authoritative refresh and recovery options. Refresh may establish present state without proving what happened to the original operation, especially after intervening changes. Keep conflicting mutations paused until sufficient reconciliation or an informed recovery choice is available. Never replay stale updates or recreate missing resources automatically. Draft discard alone does not clear uncertainty.

### Task/project creation

Require account-scoped idempotency for each logical creation submission. Assign a unique submission identifier and retain the exact original payload for deliberate recovery. Repeated equivalent submissions return the original authoritative outcome rather than create another resource. Identifier reuse with a different payload returns a defined conflict error.

Concurrent requests sharing an identifier must safely prevent duplicate creation; recording identifiers only after independently creating resources is insufficient. A collection refresh cannot uniquely identify an uncertain creation because duplicate titles/names are permitted. Expired or unavailable idempotency records never prove that retrying is safe. Do not silently treat uncertain recovery as a new creation with a new identifier.

The Endpoint Catalog and shared-schema decisions must explicitly specify key transport, equivalence/result semantics, conflicts, retention window, concurrent/in-progress outcomes and recovery behavior, including expired/unavailable records. The blueprint owns the necessary responsibility/consistency design without choosing a database or persistence implementation here. No exact wire protocol or recovery window is approved by this document.

### Updates and deletes

Require authoritative refresh plus an explicit user recovery decision before another attempt after uncertainty. Pause conflicting mutations until sufficient reconciliation or informed recovery. Refresh is not guaranteed proof of the original outcome. Preserve applicable drafts; never automatically replay a potentially stale update or recreate a missing resource. Existing confirmed-absence deletion semantics remain governed by the approved frontend-facing contract; they do not mask service/authentication errors or retroactively prove a timed-out deletion succeeded.

## Account/session handling

On confirmed expiry, stop further protected mutations and require reauthentication. Retain recoverable memory drafts only for the originating account. Resume/reconcile only after the same account authenticates again, without automatically replaying uncertain mutations. Other accounts cannot access those drafts or receive prior-account late results.

Sign-out needs confirmed completion. Definite failure and uncertain sign-out outcomes remain explicit, without pretending success or switching to demo authentication. Session expiry never retroactively changes an earlier uncertain mutation into confirmed failure. The authentication mechanism and exact session transport remain separate design decisions.

## Preparation and downstream ownership

This decision requires documentation/contract design only. No application, package, test, dependency or configuration changes; no preliminary universal async abstraction. Before each connected module activates, provide explicit pending, validated-success, rejection and uncertainty handling, authority isolation, account isolation and the applicable coordination/recovery requirements. Preserve unrelated local modules. Choose interfaces, sequencing, cancellation and client tooling when actual integration justifies them, subject to existing tooling review obligations.

| Remaining detail | Owner |
| --- | --- |
| API responsibilities, concurrent creation safety and transactional cascade | [Define the API Architecture Blueprint for progressive integration](../issues/11-api-architecture-blueprint.md) |
| Creation key transport, outcomes/conflicts, concurrent recovery, retention and expired/unavailable recovery behavior; operation-specific HTTP semantics | [Design the MVP Endpoint Catalog](../issues/12-endpoint-catalog.md) |
| Shared submission/result/error schemas and compatibility obligations | [Specify the shared Schema-First contracts](../issues/13-shared-schema-contracts.md) |
| Form/domain/boundary validation and canonicalization | [Assign validation ownership across forms, domain rules and external data](../issues/05-validation-ownership.md) |
| Detailed reproducible integration and contract evidence | [Choose evidence that proves local independence and each integration increment](../issues/07-testability.md) |

These owners must resolve the exact requirements before readiness completes; deferral here does not defer them past the map destination. No database, ORM, repository, cache, authentication technology, collaboration feature or offline synchronization system is selected.

## Review and future evaluation guide

Review each scenario against Q1–Q13 now. During implementation evaluation, reproduce using controlled delays, definite errors, lost responses and account changes, and record observed results. These are requirements, not executed tests or acceptance evidence.

1. **Create project and navigate:** delay success; show pending without committing a project, closing the editor or navigating. After validated success, perform normal completion if the editor is still active. If the user left, update relevant current-account data without redirecting or reopening.
2. **Edit/reassign task:** keep committed data unchanged while pending, freeze the submitted editor and suppress duplicates from other controls. On definite validation rejection retain input, restore editing and show the field error; success uses authoritative normalized values.
3. **Delete project/cascade:** delay deletion; keep committed project/tasks visible until confirmation, with conflicts blocked across child edits/deletes, creation and moves. A pending conflicting task operation also blocks project deletion. Unrelated work remains usable. Backend confirmation covers the consistent cascade.
4. **Leave and return:** leave a pending editor after warning, return to its account-scoped draft/status, and observe completion without abandoned-view side effects. Discard the draft while uncertain: operation tracking remains unresolved and does not imply cancellation.
5. **Late/stale data:** deliver an older read after newer state and a previous-account mutation response after an account switch. Neither overwrites the current view/data. Ignoring a response never claims a server rollback.
6. **Uncertain creation:** lose the response after possible commit. Show unconfirmed completion and retain original payload/identifier. User-initiated same-submission recovery returns the original outcome without duplicate creation; concurrent same-key requests also create at most once. Different-payload reuse conflicts. Expired/unavailable records do not authorize blind recreation. Exercise exact outcomes once the catalog specifies them.
7. **Uncertain update/delete:** refresh, then require an explicit recovery choice. Intervening changes prevent assuming refresh proves the original outcome. No automatic stale replay, new-resource recreation or success inference from a transport error.
8. **Expiry/account isolation:** expire the session during work; stop protected submissions and retain originating-account drafts. Another account cannot see them or consume old responses. Same-account reauthentication permits reconciliation without automatic replay. Earlier uncertainty stays uncertain.
9. **Profile/sign-out:** delay profile success and verify confirmed completion. Definite or uncertain sign-out failure stays explicit; confirmed sign-out clears drafts, with safe account-scoped tracking retained where needed. No demo fallback.
10. **Reload/local independence:** exercise browser-permitted warning for drafts/unresolved work without promising reload recovery. With NestJS unavailable, independently local modules retain immediate completion and separate storage notices; connected modules show explicit errors without fallback.

The user confirmed this specification and its ten review scenarios in Q14. These scenarios remain requirements for future implementation evaluation. Next planning action: resume the map with [Assign validation ownership across forms, domain rules and external data](../issues/05-validation-ownership.md). Architectural approval does not establish implementation acceptance; human implementation evaluation remains pending observations.
