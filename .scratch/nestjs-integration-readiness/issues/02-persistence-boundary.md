# Choose the minimum persistence boundary for local and future remote operation

Status: resolved
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow NestJS Integration Readiness — decision map](../map.md)
Assignee: Codex (current wayfinder session)
Blocked by: 01

## Question

Given the approved module-by-module integration unit and one authority per tightly coupled domain, where should state ownership, domain operations and persistence meet, and does the existing separation already provide enough of a seam?

Compare retaining current responsibilities, a narrow capability seam, and a broader abstraction only where a concrete need justifies it. Establish the meanings of in-memory application, durable local save and confirmed remote operation without equating them. Decide whether anything must be prepared before a remote adapter exists, and what remains local-only.

Account for real account/profile ownership and browser-local theme while task/project storage may remain local. Do not let a local whole-store snapshot overwrite a remotely authoritative domain. Account for load/empty/demo-data behavior, workspace snapshots versus resource operations, cross-tab conflicts, failed writes, recovery export and unsaved-work protection. State which browser-local safeguards remain unchanged and which remote questions require a distinct contract. Identify any need for an interface without assuming an adapter, repository or cache implementation.

## Existing evidence

use-workspace.ts owns React state and explicit operations. Pure transitions are separate from browser code. use-workspace-persistence.ts writes the whole workspace after state changes, with byte comparison, cross-tab locking, failure reporting and unload protection. browser-storage.ts validates reads and preserves recovery data.

Source paths: `apps/web/src/workspace/`, `apps/web/src/app/workspace-shell.tsx`, `apps/api/src/app.module.ts`, `docs/architecture/frontend.md`, and `docs/testing/e2e-coverage-hardening-audit.md`. These are inspected facts, not approved architectural answers.

## Resolution requirements

Human-in-the-loop decision. Use grilling and domain-modeling; ask the live user, do not substitute their answers. Record alternatives, trade-offs, retained behavior, preparation if needed, deferrals and verification implications. Explicit user approval is required before resolution. Keep implementation tickets and application changes outside this map.

## Prerequisites

- [Choose the unit and ownership rules for progressive integration](01-progressive-integration-boundary.md)

## Answer

### Approved choice — explicit user approval on 2026-10-24

The user explicitly approved all four choices in chat:

1. Frontend features continue interacting through explicit domain operations. Persistence and source selection sit behind those operations, using the approved authority for each domain. Browser snapshot persistence remains local-specific.
2. Preserve existing architectural boundaries wherever sufficient. Define the required separation now; defer concrete interfaces, repositories, adapters and extraction until a demonstrated integration need justifies them. Once a domain connects to NestJS, its authoritative data must no longer be independently persisted in the local workspace snapshot.
3. Distinguish an in-memory state update, a successful browser-storage save and a server-confirmed operation. None establishes either of the other completion states by itself. Form closure, success feedback and optimistic-update policy remain with [Define asynchronous operation completion and user feedback](04-async-operations.md).
4. Preserve existing local-specific storage safeguards. Connected loading, empty results and failures are distinct states. An empty server result remains empty; a server failure surfaces an error and never triggers demo data or automatic local fallback.

### Alternatives and trade-offs

Keep the current separation where it is sufficient, with the minimum domain-specific separation introduced when integration demonstrates a need. The current whole-store persistence coupling cannot remain unchanged for remotely authoritative data. A generic replacement of browser snapshot load/save with remote snapshot load/save would not by itself meet incremental domain ownership requirements. Per-entity repositories or a broad universal abstraction are not approved prerequisites; they add interfaces and coordination before a concrete integration has established their value.

The selected boundary preserves explicit feature-facing operations while allowing local and connected domains to have different persistence mechanics. It requires ownership isolation without choosing a particular implementation shape or remote transport.

### Retained behavior

The browser-local MVP remains independently operational. Keep local demo initialization, valid empty task/project collections, storage validation and recovery, exact-byte recovery export, cross-tab conflict protection, failed-write reporting, in-memory retention of unsaved changes, current-state export and unload protection. These remain local mechanisms, not promises of equivalent remote conflict handling or recovery export.

The earlier ownership decision still applies: profile follows the real account when integrated, theme remains browser-local, and task/project operations including deletion cascade share one authority. For example, connecting profile must not let a later local task save independently persist that remotely authoritative profile as part of the old aggregate snapshot. No transition-data migration or preservation requirement is introduced.

### Minimum preparation and documentation-only outcome

This ticket records separation requirements; it makes no application changes and mandates no preliminary abstraction refactor. During implementation planning, assess each integration against the existing boundaries. Before activating a connected domain, isolate its authoritative data from independent local snapshot persistence and direct its reads and writes to the approved authority. The precise local storage representation, interface shape and extraction are not selected here.

### Deferred work and triggers

- [Define the frontend-facing contract needed for incremental API integration](03-api-contract.md) owns remote data, operation and error guarantees, including any necessary distinction between snapshot and resource operations. This answer does not choose remote whole-workspace saves or resource endpoints.
- [Define asynchronous operation completion and user feedback](04-async-operations.md) owns pending/success/failure presentation, form closure, drafts, retry and optimistic behavior. The completion distinctions above are inputs to that decision.
- [Assign validation ownership across forms, domain rules and external data](05-validation-ownership.md) owns validation responsibilities.
- [Choose evidence that proves local independence and each integration increment](07-testability.md) owns the detailed verification evidence.
- Remote concurrency, reconciliation and recovery mechanisms remain deferred until a concrete contract or integration need makes a precise decision necessary. Local cross-tab locking does not settle remote concurrency. No distributed transaction, synchronization system or remote export mechanism is inferred.

No newly precise question requires a new child ticket: the outstanding contract, async, validation and evidence questions already have owners. Existing fog remains speculative.

### Verification implications

Future implementation evaluation must separately establish local save success and remote confirmation. Exercise a mixed increment such as remote profile with local tasks/theme: local edits must not independently persist or overwrite the remotely authoritative profile. Confirm both halves of the project deletion cascade share their approved authority. Check that an empty remote result remains empty, a delayed read is represented as loading, and a failed read or write surfaces an error without demo/local fallback. Recheck local storage conflict, failed-write, recovery/export and unload behavior with NestJS stopped. These are future verification requirements, not executed integration checks.

### Preflight, consistency review and evaluation handoff

Actual preflight: the initial checkout status showed only this ticket's earlier claim edit. Read the map, approved ownership answer and downstream decision scopes; inspected the frontend architecture and workspace state, transitions, browser storage, persistence and shell responsibilities during this decision session. No application tests, builds or runtime checks were executed. Only this ticket and the map are changed for resolution.

Documentation checks passed: `git diff --check`; all local Markdown link targets and dependency references exist; this decision is resolved; the only open, unblocked, unclaimed child is the frontend-facing contract decision. Consistency review found no conflict with the approved ownership answer and no new ticket needed.

Documentation evaluation guide:

1. Read Approved choice and confirm that it matches the user's four numbered approvals.
2. Trace remote profile with local tasks/theme through Retained behavior and Minimum preparation: the local snapshot must not independently persist remote profile authority.
3. Trace in-memory application, local save and remote confirmation as separate facts; follow the async decision for presentation policy.
4. Trace connected loading, empty results and failure; confirm none silently invokes demo/local fallback. Check that existing safeguards still apply to the browser-local MVP.
5. Follow the map to the next frontier, [Define the frontend-facing contract needed for incremental API integration](03-api-contract.md).

First concrete action: review this Answer against those scenarios. The architectural choices are explicitly approved; evaluation and human acceptance of any future implemented integration remain pending user observations.
