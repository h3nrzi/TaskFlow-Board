# Define asynchronous operation completion and user feedback

Status: resolved
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: Codex (current wayfinder session)
Blocked by: 02, 03

## Question

With ownership and contract guarantees established, what should callers observe while an operation is pending, succeeds or fails, and what minimum frontend preparation is necessary?

Use create-project-and-navigate, edit-task-and-close, task reassignment, and delete-project-with-cascade as concrete scenarios. Decide when data changes, when a form closes, when success appears, and what happens to the draft and current view after failure. Cover duplicate submission, stale responses, unmount/navigation and repeated actions proportionately.

Apply the approved error/input-retention policy to each connected module, including authentication/profile where enabled; do not silently fall back to demo/local behavior. Exact success timing and retry semantics remain decisions here.

Compare confirmed completion and optimistic alternatives without selecting one in advance. Distinguish local in-memory completion from existing asynchronous saving notices; preserve current local workflows. Decide what readiness must change, what can be exercised with controlled delays/failures, and which policies should wait for the first connected capability. Do not assume every command must become a Promise or introduce a query library.

## Existing evidence

Current operations update local React state synchronously; only createProject returns a value (the new ID). The shell immediately closes forms, reports success and sometimes navigates. Local persistence completion/failure is reported separately.

Source paths: `apps/web/src/workspace/`, `apps/web/src/app/workspace-shell.tsx`, `apps/api/src/app.module.ts`, `docs/architecture/frontend.md`, and `docs/testing/e2e-coverage-hardening-audit.md`. These are inspected facts, not approved architectural answers.

## Resolution requirements

Human-in-the-loop decision. Use grilling and domain-modeling; ask the live user, do not substitute their answers. Record alternatives, trade-offs, retained behavior, preparation if needed, deferrals and verification implications. Explicit user approval is required before resolution. Keep implementation tickets and application changes outside this map.


## Prerequisites

- [Choose the minimum persistence boundary for local and future remote operation](02-persistence-boundary.md)
- [Define the frontend-facing contract needed for incremental API integration](03-api-contract.md)

## Comments

### Decision session opened — 2026-10-24

Claimed the lowest-numbered open, unblocked decision. Applied Wayfinder, grilling and domain-modeling; read the map, tracker/domain instructions, glossary, persistence answer and approved frontend-facing contract specification. Delegated read-only inspection confirms synchronous in-memory operations, immediate form closure/success/navigation, and separately reported asynchronous browser persistence. Form drafts are component state and disappear on unmount. These facts do not select future connected behavior.

First discussion round proposes, pending explicit user answers:

1. Connected mutations wait for confirmed, validated authoritative success before applying committed UI changes, closing forms, reporting success or navigating to newly created resources; no optimistic mutation by default. Project deletion/cascade follows the same rule.
2. Definite rejected writes retain the form, submitted input and current view, show field errors or a safe operation error, and allow correction/resubmission. Ambiguous outcomes, authentication failures and missing-resource recovery need subsequent choices.
3. Suppress duplicate submissions and conflicting actions for the pending operation/resource while allowing unrelated work; avoid a workspace-wide lock. Exact overlap handling remains for a later round.
4. Preserve existing browser-local completion and separately reported persistence notices; do not require every operation to become asynchronous or mandate a client library. Preparation is a documented requirement to satisfy before connected activation, with concrete implementation shape deferred.

These are recommendations, not approvals. Navigation/unmount, late responses, repeated actions, ambiguous outcomes/retry and authentication/profile scenarios remain to be discussed after this round. No Answer or map decision entry is added.

Actual preflight: initial git status was clean. Only this ticket's claim and discussion checkpoint were edited. git diff --check passed before this checkpoint. No application tests, builds or runtime/API checks ran; no application changes were made. First concrete action: answer the first discussion round in chat. Human evaluation of future implementation remains pending.

### User decisions — 2026-10-24, first discussion round

The user explicitly approved Q1–Q4 with these binding clarifications:

- Q1: connected mutations wait for successful server responses validated against the shared response contract before committing authoritative data, closing forms, displaying success or navigating. This includes task creation/editing/reassignment, project operations and project deletion/cascade. Show pending feedback. Do not introduce optimistic committed updates or rollback/reconciliation complexity for the MVP.
- Q2: definite rejection preserves input and the form/editing context, with field-specific validation errors or a safe actionable operation error. No success or discarded draft. Uncertain outcomes and expired sessions remain separate choices.
- Q3: suppress repeated submissions and conflicting actions on the affected resource across relevant UI entry points; unrelated resources and independent functionality remain usable.
- Q4: preserve immediate local in-memory completion and separate browser-persistence notices. Require explicit pending, validated success and failure states before connected activation, without changing unrelated local modules or silently falling back. Choose implementation abstractions/client tooling only when justified by integration.

These approvals do not resolve navigation/unmount, stale responses, ambiguity/retry, account/session failures or dependent-resource overlap. The ticket remains claimed without an Answer.

### Next discussion frontier — proposals awaiting approval

- Q5: intentional in-app navigation or dismissal may leave a pending editing context after an explicit warning that the request continues; retain its draft and operation result in memory for the same account until acknowledged/reopened. Do not force navigation or reopen a form on late success. Reload/tab-close recovery is separate; no persistent draft system is implied.
- Q6: stale reads and responses from an earlier account/context must not overwrite current authoritative UI state. Accepted current-account mutation results may update relevant data after navigation, without obsolete view-specific effects. Concrete sequencing mechanisms remain deferred.
- Q7: transport timeout, connection loss after dispatch or an invalid success response represents an uncertain outcome, not confirmed rejection. Preserve input, report uncertainty and do not automatically retry writes. Offer authoritative refresh and deliberate recovery; a refresh cannot reliably prove whether creation occurred when duplicate names are allowed. Detailed recovery UX and duplicate-risk acknowledgement remain to settle after this policy.
- Q8: session expiry stops further protected mutations and requests reauthentication; retain drafts only for the same account in memory and never reveal/apply them to another account. Sign-out waits for confirmed completion; on failure show an explicit error without pretending sign-out succeeded. Outcome uncertainty remains distinct from expiry/rejection. Authentication mechanism stays deferred.

Preflight: read this ticket and its prior approval context; retained existing claim/edit. git diff --check passed after recording this checkpoint. No tests, builds or runtime checks were run. Next action: answer Q5–Q8; dependent-resource overlap and remaining recovery details follow their prerequisites. No application changes or human implementation acceptance are claimed.

### User decisions — 2026-10-24, navigation, late results and account/session outcomes

The user explicitly approved Q5–Q8 with these binding clarifications:

- Q5: allow navigation/dismissal of pending editors after an appropriate warning. Dispatched work continues; leaving does not imply server cancellation. Retain draft and operation status in memory scoped to the originating account. Later confirmed success may update that account's data but must not navigate, reopen editors or restore abandoned views. Full-reload recovery is not implied.
- Q6: stale reads and obsolete results cannot overwrite newer state. Previous-account results never update the current account's UI/data. Current-account mutations may complete after navigation without abandoned-view effects. Ignoring a response does not undo a possible server commit; use authoritative refresh where needed. Sequencing/cancellation mechanisms remain implementation choices.
- Q7: timeouts, post-dispatch connection loss and invalid success responses preserve input and explicitly report unconfirmed completion. Do not automatically retry potentially non-idempotent mutations or falsely declare success/failure. Offer authoritative refresh and deliberate recovery. Collection refresh cannot uniquely identify uncertain creation when duplicate titles/names are permitted. Creation recovery/duplicate prevention remains to decide.
- Q8: confirmed expiry stops further protected mutations and requires reauthentication. Recoverable drafts remain in memory only for their originating account. Resume/reconcile only after that same account authenticates, without automatic replay of uncertain mutations. Sign-out needs confirmed completion; failures/uncertainty remain explicit, without demo fallback. Expiry never retroactively turns an earlier uncertain mutation into confirmed failure.

The ticket remains claimed. The next round asks for requirements for recoverable creation, deliberate recovery of other operations, related-resource conflict scope, editing while pending and draft lifecycle. No concrete server idempotency mechanism, replay window, retry policy or persistent draft system is yet approved. Architectural requirements approved in chat will be consolidated before final shared-understanding confirmation.

Planning preflight: reread the ticket and local tracker lifecycle; retained existing edits. git diff --check passed after this record. No application/runtime changes or tests. First action: answer the next discussion round; human implementation evaluation remains pending.

### User decisions — 2026-10-24, recovery, conflicts and draft lifetime

The user explicitly approved Q9–Q13 with these binding clarifications:

- Q9: account-scoped task/project creation idempotency uses a unique logical-submission identifier and the exact original payload on deliberate recovery. Equivalent repeats return the original authoritative outcome; different-payload reuse produces a defined conflict. Concurrent same-identifier requests must safely prevent duplicate creation, not just record identifiers afterward. Catalog/schema owners must specify transport, results, conflicts, retention and recovery. Expired/unavailable records never prove retry safety. No automatic replay of uncertain creations.
- Q10: uncertain updates/deletes preserve drafts and require authoritative refresh plus an explicit recovery decision before another attempt. Pause conflicting mutations pending sufficient reconciliation or informed recovery. No automatic stale update replay or recreation of missing resources. Refresh may not prove whether a mutation committed when intervening changes occurred.
- Q11: conflict coordination follows actual dependencies. Pending project deletion blocks task creation inside it, child edits/deletes and moves into/out of it. Conflicting pending task operations prevent associated-project deletion. Other projects/unrelated standalone tasks remain usable. Client coordination never substitutes for backend ownership, consistency or transactional cascade guarantees.
- Q12: submitted editor fields are read-only while pending; retain exact submitted payload and operation identity. Definite rejection restores editing; uncertain completion retains payload and offers recovery before resubmission. Leaving does not cancel dispatched work.
- Q13: account-scoped memory drafts survive in-app navigation/expiry; explicit discard or confirmed sign-out clears drafts without cancelling or resolving dispatched operations. Preserve unresolved-operation tracking as needed for safe reconciliation. Warn before reload/tab closure within browser limits, without promising recovery across reloads. No cross-account draft or late-response exposure.

### Complete specification prepared for confirmation — 2026-10-24

[Asynchronous completion, feedback and recovery requirements](../design/async-operation-policy.md) consolidates Q1–Q13, concrete evaluation scenarios and downstream ownership. The detailed choices are approved; final confirmation that the consolidated specification captures shared understanding is pending. No Answer or map resolution entry is added yet.

The existing catalog, shared-schema, blueprint and testing-strategy owners receive pointers to these requirements. No new child is necessary: the now-precise recovery/consistency questions fit those existing scopes. No tooling, persistence implementation, authentication mechanism or cross-reload recovery system is selected.

Consolidation preflight and review: preserved this session's existing claim/history. Read catalog, shared-schema and blueprint scopes; added requirement pointers to those owners and the testability owner. Checked the consolidated policy against all Q1–Q13 approvals, especially exact-payload account-scoped recovery, concurrent duplicate prevention, expired-record uncertainty, refresh limitations, bidirectional project/task conflicts, discarded-draft versus unresolved-operation lifetime and sign-out/expiry distinction. No new glossary term or ADR was necessary: these are operation/contract policies, not new product vocabulary.

Actual documentation checks passed: git diff --check; 16 ticket lifecycles/dependency references valid; graph acyclic; all 105 local Markdown link targets found. The async decision remains claimed without an Answer, and the map is unchanged. No application tests, builds or runtime/API checks ran. The linked document's ten scenarios are the reproducible evaluation guide; first action is Q14 consolidated confirmation in chat. Future implementation evaluation remains pending user observations.


### User confirmation — 2026-10-24

Q14 explicitly confirmed: the user reviewed the complete async specification against Q1–Q13 and their clarifications, accepted all ten review scenarios and downstream responsibilities, found no material discrepancies, and approved the specification and this decision's resolution. Implementation acceptance remains pending. This supersedes the earlier pending-confirmation checkpoints without rewriting their historical record.

## Answer

Resolved on 2026-10-24 with explicit Q14 confirmation of [Asynchronous completion, feedback and recovery requirements](../design/async-operation-policy.md). That specification is the canonical consolidated requirement artifact; Comments preserve Q1–Q13 approvals, clarifications and the alternatives considered.

Approved choice: confirmed, shared-contract-validated completion for connected mutations; explicit pending, rejection and uncertainty feedback; retained exact submitted payloads, account-scoped memory drafts and operation identities; coordinated resource/dependency conflicts; navigation without implied cancellation or abandoned-view effects; stale/account-switched result isolation; deliberate recovery with concurrent-safe account-scoped creation idempotency; explicit expiry/sign-out handling. The linked specification contains exact policy requirements and their downstream owners.

Retained/revised behavior: preserve immediate browser-local in-memory completion, separately reported local persistence and independent local operation. Connected mutations intentionally wait for validated confirmation and never silently fall back. Optimistic committed updates were considered and excluded from the MVP because their rollback/reconciliation complexity is unnecessary for the approved approach. Refresh does not necessarily prove a mutation's historical outcome, and expired/unavailable idempotency records never prove retry safety.

Minimum preparation/outcome: documentation and contract requirements only; no application, test, dependency or configuration changes, universal async abstraction or mandatory preliminary refactor. Each connected module must satisfy the applicable pending/completion/failure, authority/account isolation, coordination and recovery requirements before activation.

Deferred details and triggers: the blueprint owns API responsibilities and necessary consistency guarantees; the catalog and shared-schema owners must specify creation key transport, results, conflicts, concurrency/in-progress outcomes, retention and expired/unavailable-record recovery before readiness completes. Validation and detailed evidence retain their existing owners. Concrete sequencing/cancellation, interfaces and client tooling await justified integration needs. No database, ORM, cache, authentication mechanism, persistent draft recovery or offline synchronization is selected. Existing ticket scopes cover all newly precise questions; no new child or fog graduation is necessary.

Verification and handoff: Q14 accepts the architectural specification and all ten reproducible scenarios. They remain future implementation evaluation requirements, not executed runtime evidence. Documentation preflight retained prior planning edits and checked the approved policy, downstream pointers and map index for consistency. Final checks cover whitespace, local links, ticket lifecycles/dependencies and graph acyclicity; no application tests, builds or API runtime checks ran. Human implementation evaluation/acceptance remains pending observations.

First concrete action: resume the map with [Assign validation ownership across forms, domain rules and external data](05-validation-ownership.md), the next lowest-numbered open, unblocked, unclaimed decision. This session resolves only the async decision.

Final documentation results: git diff --check passed; 16 ticket lifecycle/dependency records and the acyclic graph validated; all 109 local Markdown link targets exist. Confirmed this decision is resolved with an Answer and that validation ownership is the next lowest-numbered frontier decision. Updated the specification's approval status and all four downstream pointers to remove obsolete pending-confirmation wording. The map contains only the decision gist/link. No application/runtime checks were run.
