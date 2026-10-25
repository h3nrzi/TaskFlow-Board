# TaskFlow API and progressive integration specification

Status: ready-for-agent
Created: 2026-10-25
Source: [Completed readiness map](map.md)
Scope: Consolidated specification of the approved MVP design; implementation planning, execution and activation remain separate work.

## Problem Statement

TaskFlow currently provides a browser-local workspace with demo authentication and local persistence. Its API currently exposes only a health endpoint. Connecting real accounts and server-owned projects/tasks without agreed boundaries would risk inconsistent task assignment and project deletion, lost edits, duplicate creations, misleading success messages, and accidental replacement of authenticated data with browser-local state.

The user needs a precise, actionable specification for developing and integrating backend capabilities progressively while preserving an independently operational local MVP. Contract, security and evidence requirements must remain consistent across frontend, API and generated documentation, without requiring an all-at-once migration or treating design approval as proof that an implementation works.

## Solution

Introduce the approved connected Authentication, Account/Profile and Workspace capabilities through deliberate module-by-module integration. Keep one authority for each coupled domain: Tasks, Projects, assignment and cascade connect together as Workspace; Authentication/account core can connect while Workspace stays local, and editable Profile can follow. Theme remains local.

Use shared runtime schemas and a concrete API catalog so both consumers agree on inputs, results, failures and security requirements. Connected actions report success only after validated server confirmation; preserve drafts and provide deliberate recovery when outcomes are uncertain. Require capability-specific contract, API, persistence, browser and delivery evidence before activation, and record human observations separately.

This spec consolidates the existing approved decisions. The authoritative source table in Further Notes incorporates their full requirements, exact protocol values and evaluation cases by reference; this summary does not narrow them or reopen their decisions. Later explicit approvals supersede earlier source deferrals as recorded in the readiness disposition.

## User Stories

1. As a local user, I want Tasks, Projects and demo workflows to work with the API unavailable, so that the local MVP remains independently usable.
2. As a local user, I want immediate edits and browser-save feedback distinguished, so that I understand whether my changes have persisted.
3. As a local user, I want storage validation, conflicts, recovery, isolation and existing exports retained, so that integration does not weaken local safeguards.
4. As a user, I want theme preferences to remain local, so that appearance does not depend on server availability.
5. As a maintainer, I want explicit capability activation, so that server availability cannot silently change data authority.
6. As a user, I want connected failures shown clearly, so that I am not unknowingly switched to demo authentication or local data.
7. As an account owner, I want real Authentication and Profile to coexist with local Workspace, so that capabilities can arrive incrementally.
8. As an account owner, I want local saves isolated from connected account data, so that a browser snapshot cannot overwrite my identity or profile.
9. As a prospective account owner, I want enumeration-resistant registration and resend responses, so that public requests do not disclose account eligibility.
10. As a prospective account owner, I want intentional mailbox confirmation, so that opening or scanning a link does not consume verification authority.
11. As a prospective account owner, I want bounded verification issuance and expiry, so that resend behavior preserves usable proofs without unbounded issuance.
12. As a pending account owner, I want restricted enrollment after mailbox proof, so that verification alone cannot grant access to a private workspace.
13. As a pending account owner, I want enrollment to establish my own credentials and invalidate untrusted prior access paths, so that pre-registration cannot compromise my account.
14. As a pending account owner, I want fresh-proof recovery when enrollment is incomplete, so that I can recover restricted authority without reopening an active account.
15. As an account owner, I want activation followed by explicit sign-in, so that activation is distinct from an authenticated session.
16. As an account owner, I want session-status failures distinguished from reliably established unauthenticated state, so that outages do not misrepresent my session.
17. As an account owner, I want protected session cookies and request integrity checks, so that only the approved context can perform protected operations.
18. As an account owner, I want session activity to follow the approved foreground-interaction policy, so that background traffic does not silently keep my session alive.
19. As an account owner, I want sign-out to revoke the initiating session with confirmed feedback, so that other independent sessions retain their intended scope.
20. As an account owner, I want my account ID stable and registered email read-only, so that profile presentation changes do not alter account identity.
21. As an account owner, I want to edit my display name with conflict protection, so that competing edits are visible instead of silently overwritten.
22. As an account owner, I want only my private workspace returned, so that other accounts cannot discover or modify my resources.
23. As an account owner, I want complete coherent task/project reads, so that every project reference is valid within the same returned workspace.
24. As an account owner, I want empty collections treated as valid, so that an empty workspace is not replaced with demo data.
25. As a task author, I want explicit task fields and supported nullable values, so that omitted inputs are not silently invented by the API.
26. As a project author, I want the approved project fields and validation, so that project presentation is consistent across clients.
27. As a user, I want duplicate names and all approved task status transitions supported, so that integration preserves the intended domain rules.
28. As a task author, I want standalone tasks and safe reassignment, so that tasks can exist independently or belong to an accessible project.
29. As a task author, I want an optional free-text assignee, so that assignment remains a label rather than granting account access.
30. As a task author, I want due dates represented as calendar days, so that changing timezone does not shift the due day.
31. As a user, I want server-owned creation and last update times displayed as instants, so that audit metadata remains authoritative.
32. As an author, I want approved text trimming and Unicode limits with descriptions preserved, so that accepted input and displayed content follow predictable rules.
33. As an editor, I want omitted update fields preserved and explicit supported nulls cleared, so that partial edits do not destroy unrelated values.
34. As an editor, I want stale revision conflicts and canonical no-op behavior respected, so that concurrent work is not silently overwritten.
35. As a project owner, I want deletion and its task cascade to commit consistently, so that concurrent moves and edits cannot leave orphan tasks or partial deletion.
36. As an account owner, I want foreign-resource concealment and safe confirmed-absence deletion, so that resource existence is not leaked or foreign data changed.
37. As a user, I want pending feedback and frozen submitted fields, so that an in-flight operation has an unambiguous payload.
38. As a user, I want duplicate and conflicting submissions suppressed while unrelated work remains usable, so that waiting on one action does not block the whole workspace.
39. As an editor, I want definite rejection to preserve my input and show safe field or operation feedback, so that I can correct the problem.
40. As a user, I want navigation away from pending work with a warning and return to its draft/status, so that in-flight work does not trap me in a view.
41. As a user, I want late responses prevented from reopening abandoned views or overwriting newer data, so that navigation and current state remain under my control.
42. As an account owner, I want drafts and asynchronous results isolated by account, so that switching accounts cannot expose or apply another account's work.
43. As a user, I want uncertain outcomes distinguished from rejection, so that a lost or malformed response does not falsely imply rollback.
44. As a task or project author, I want deliberate recovery of the original creation submission, so that response loss and concurrent retries do not create duplicates.
45. As a user, I want historical creation results distinguished from current resource state, so that recovery cannot restore deleted resources or overwrite later edits.
46. As a user, I want expired or unavailable recovery evidence handled explicitly, so that absence of a record is not treated as permission to create again.
47. As an editor, I want refresh and an informed recovery choice after uncertain updates or deletes, so that stale operations are not replayed automatically.
48. As an account owner, I want same-account reauthentication to permit reconciliation of retained drafts, so that expiry does not lose recoverable work or trigger automatic mutation replay.
49. As a user, I want invalid reads rejected as a whole and stale data identified, so that partial or malformed data is not presented as a successful refresh.
50. As a user, I want bounded, validated errors without raw server content, so that failures remain actionable without exposing sensitive details.
51. As an integrator, I want shared runtime contracts used by both real consumers, so that compile-time agreement is backed by runtime compatibility.
52. As an integrator, I want strict requests and tolerant but validated response readers, so that permitted additions work without accepting invalid declared fields.
53. As an integrator, I want deterministic, guarded OpenAPI generation and independent drift checks, so that published contracts cannot silently lose constraints or diverge from implementation.
54. As a maintainer, I want exact operation, schema, runtime-rule and example traceability, so that every approved contract binding remains covered.
55. As a maintainer, I want real concurrency, restart, security and browser evidence, so that mocks cannot substitute for authoritative guarantees.
56. As a maintainer, I want email acknowledgement, transport acceptance and receipt distinguished, so that a controlled sink or queued request is not mistaken for configured delivery.
57. As a maintainer, I want supported frontend/API/browser combinations recorded explicitly, so that unsupported and untested combinations are not advertised as compatible.
58. As an evaluator, I want a reproducible feature-by-feature guide and actual preflight evidence per increment, so that I can report observations without automated passes being treated as my acceptance.

## Implementation Decisions

- Preserve the approved responsibility boundaries: Account/Profile owns one canonical account identity, lifecycle state and presentation; Authentication coordinates verification, enrollment, credentials and sessions; Workspace owns account-scoped Tasks, Projects, assignment, coherent reads, revisions, cascade and durable creation outcomes.
- Use trusted server authentication context for ownership. Client-selected identity, demo state, display name, registered email and assignee labels confer no authority.
- Keep thin transport handlers over explicit application operations. Enforce ownership, revisions, relationships, cascade and security-sensitive transitions at authoritative commit boundaries; frontend coordination is supplementary.
- Integrate by coupled capability with explicit configuration. Authentication/account core may connect before editable Profile; connected Workspace requires active-account Authentication. These are dependency constraints and permitted configurations, not a selected build order.
- Reuse explicit frontend operations and preserve local persistence safeguards. Add only preparation justified by each capability: authority separation, asynchronous completion, validation, account isolation and necessary controls. No preliminary universal adapter or form migration is prescribed.
- Carry the complete approved task/project field inventory, enums, create completeness, partial-update rules, nullable standalone assignment, optional free-text assignee, calendar due dates and server-owned timestamp/revision metadata. Preserve duplicate names and all allowed status transitions.
- Return one coherent complete Workspace read with valid account-scoped references. Enforce atomic revision checks, the exact canonical no-op rules, independent Profile revisions and serially consistent cascade/move outcomes. Apply the catalog's distinct missing/foreign read, update and deletion semantics.
- Connected mutations use pending, validated confirmation, definite rejection and uncertainty states. Preserve submitted payload and operation identity; freeze pending editors, coordinate dependent conflicts and permit unrelated work. Do not commit optimistic authoritative changes.
- Preserve account-scoped in-memory drafts, navigation/dismissal behavior and stale-result protection. Discard or confirmed sign-out clears drafts but does not prove cancellation or resolution of dispatched operations. Do not promise cross-reload draft recovery.
- Creation and its idempotency outcome share an atomic durable guarantee. Apply exact account/operation/key scope, original-input equivalence, concurrent reservation, historical results, retention and consumed-marker rules. Recovery is deliberate; missing/expired/unavailable evidence never authorizes blind recreation. Updates/deletes require authoritative refresh and informed recovery after uncertainty.
- Carry the approved same-origin HTTPS API, password authentication, cookie contexts, Origin/CSRF protections, credential rotation/revocation, request precedence and abuse budgets. Preserve registration, intentional proof confirmation, restricted owner enrollment, activation and separate sign-in. Apply exact deadlines/caps and foreground-activity rules from the controlling catalog, including pending-only recovery and active-account exclusion.
- Ordinary Profile updates accept display name only; account ID is immutable and registered email is read-only. Authentication/account lifecycle and Profile revision responsibilities remain distinct.
- Use the approved shared Schema-First package direction: browser-safe Zod 4, inferred TypeScript types, Nest-side nestjs-zod, and the complete 115 public export identities. Keep UI state, browser snapshots and business logic outside shared contracts. Preserve raw request, canonical value, strict output and tolerant reader roles, plus exact transport metadata and error bindings.
- Validate raw structure, apply only approved explicit normalization, validate canonical values, then enforce authoritative domain/access rules subject to security precedence. Shared wire schemas never implicitly transform, coerce, default or repair values. Apply the exact Unicode 17.0.0 baseline and declared runtime predicates.
- Validate server output, received success bodies and errors. Invalid reads fail wholly; permitted extra response fields are projected away while invalid declared fields fail. Invalid mutation output cannot prove rollback. Keep bounded safe diagnostics and visible feedback for unmapped field paths.
- Preserve all 22 explicit API operations and five HEAD counterparts, their 27 operationIds, exact methods/paths, headers, cookies, media rules, success/error bindings and security contexts. The authoritative catalog and OpenAPI specification supply their complete inventories; no alternate transport contract is introduced here.
- Derive OpenAPI 3.1 from the approved catalog and schemas through native conversion and guarded assembly. Require fail-closed unsupported-feature/loss checks, complete references, runtime-rule declarations, binding-specific examples/counterexamples, exact deterministic serialization and independent read-only semantic/byte drift verification.
- Preserve consumer compatibility review, real browser and compiled-API package import proof, and the client-tooling review at first real module integration. Concrete versions, package exports/build settings, persistence/transaction mechanisms, internal interfaces and provider/deployment/activation wiring remain implementation-planning choices constrained by these requirements.

## Testing Decisions

- **Seam confirmation already recorded:** the map and approved testing strategy record explicit user approval of Q1–Q9, including minimum seams and evidence boundaries. This synthesis carries that approval unchanged and proposes no new seam or testing architecture.
- Prefer the highest observable boundary: user-facing browser workflows for product behavior and actual HTTP requests against the application for authoritative behavior. Use existing explicit frontend operation/transport boundaries only to control pending, rejected, malformed, lost, delayed or reordered results. Do not introduce a universal repository or mock architecture.
- Test external outcomes and domain invariants rather than private state, internal call sequences or incidental component structure. Setup/seeding is not evidence of successful creation. Reuse shared contracts instead of duplicating payload definitions in fixtures.
- Test the local Workspace/persistence boundary independently with the API unavailable, observing classified product traffic and state. Cover the permitted mixed configurations separately from connected Workspace; availability must not change authority.
- Exercise frontend completion, dependent conflicts, drafts/navigation, stale reads, account switching, expiry, malformed responses and deliberate recovery through controlled results. These tests establish UI behavior only, never persistence, authorization or actual cookie enforcement.
- Exercise Authentication, Account/Profile and Workspace through actual API requests and selected persistence. Include direct requests bypassing forms, two-account isolation, coherent reads, revision/no-op semantics, cascade and move races, concurrent same-key creation, interruption/restart, proof/enrollment races, revocation, deadline edges, abuse controls and fail-safe dependency failures.
- Use deterministic barriers, time/fault controls and fresh independent execution contexts where required to prove actual authoritative invariants. Choose only justified implementation controls; arbitrary sleeps or mocked durability cannot establish those claims.
- Test public shared exports and both real consumers, all applicable operation/binding combinations, approved Unicode/date predicates, strict requests, canonical values, response projection, error safety and unknown/invalid payload behavior. Validate the complete approved example/counterexample set at its intended boundary with required preconditions.
- Test guarded OpenAPI generation, complete export/reference/operation/runtime-rule mapping, positive and negative bindings, exact serialization, reproducibility and read-only drift detection. A generated document or valid schema alone cannot prove runtime-only enforcement.
- Use real browser/API flows for actual cookie/context/security, lifecycle and connected workflows across the strategy's six required browser configurations. Preserve explicit supported, unsupported and untested frontend/API revision combinations and justified per-capability allocations.
- Separate controlled-email-sink lifecycle tests from configured outbound delivery evidence. Record acknowledgement, transport acceptance and receiving-system receipt separately, without exposing reusable secrets.
- Existing prior art includes browser workflow assertions for task assignment/status across boards, summaries and reload, standalone tasks, project cascade, overlays, demo profile and recovery; the frontend helpers support local snapshot setup. Reuse portable UI assertions, but supply authoritative connected fixtures instead of seeding local data to impersonate server state. The API health test already starts a compiled application on an ephemeral port and asserts real HTTP behavior; it is useful lifecycle scaffolding, not proof of business/security guarantees.
- Retain the full T1–T14 evaluation strategy, E1–E34, S1–S16, O1–O16 and all thirteen runtime rules U1, U2, U3, D1, T1, E1, P1, X1, H1, B1, I1, A1 and C1. Runtime-rule identifiers and checkpoint identifiers are separate namespaces. The source traceability tables allocate required layers without waiving any applicable case.
- Before each capability activates, record revision/configuration, source checkpoints, applicable layers, reproducible setup, expected/actual results, evidence and limitations. Explain exclusions without converting failed, blocked or unexecuted requirements to passes. Carry actual compatibility evidence forward only with an impact/applicability explanation.
- Prepare a feature-by-feature human-evaluation handoff for every implemented increment with executable setup/reset instructions, isolated fixtures, first UI action and pending observation fields. Automated checks and guide readiness do not establish human acceptance.

## Out of Scope

- Application implementation, dependency installation, concrete infrastructure selection, implementation-ticket decomposition, estimates, build sequencing, deployment or capability activation as part of this spec-publication task.
- Collaboration, team workspaces or account-linked assignment.
- Offline synchronization, background mutation queues, automatic replay/failover, dual writes and speculative universal repositories/adapters/caches.
- Development-data transition migration, preservation or new import/export workflows. Existing local recovery/export safeguards remain required.
- Account email changes, password recovery, third-party identity providers, account deletion and global sign-out. Pending-only verification/enrollment recovery is included and does not create an active-account credential-recovery route.
- Pagination, silent truncation, server-side presentation filtering/sorting or unapproved product redesign.
- Treating historical tests, research probes, design approval, a health endpoint or this ready-for-agent label as implemented readiness, activation evidence or human implementation acceptance.

## Further Notes

### Controlling requirements and precedence

| Source | Binding coverage |
| --- | --- |
| [Readiness disposition](design/readiness-disposition.md) | All six deliverables, prior-decision dispositions, remaining implementation choices and scope boundaries |
| [Ownership decision](issues/01-progressive-integration-boundary.md#answer) and [persistence decision](issues/02-persistence-boundary.md#answer) | Explicit activation, coupled authority, local independence and minimum justified preparation |
| [Frontend-facing contract](design/frontend-facing-contract.md) | Domain fields, canonicalization, ownership, compatibility and retained behavior, refined by later approvals |
| [Asynchronous policy](design/async-operation-policy.md) | Completion, conflicts, navigation, drafts, uncertainty and account isolation |
| [Validation policy](design/validation-policy.md) | Form/domain/boundary responsibilities, canonical stages and external-data integrity |
| [Architecture Blueprint](design/api-architecture-blueprint.md) | Responsibility boundaries, consistency, lifecycle and foreground-activity guarantees |
| [Account email scope](design/account-email-scope.md) | Read-only registered email and display-name-only Profile |
| [Endpoint Catalog](design/endpoint-catalog.md) | Exact 22 explicit operations/five HEAD counterparts, security/protocol values and E1–E34 |
| [Schema tooling](design/shared-schema-tooling.md) and [shared contracts](design/shared-schema-contracts.md) | Selected tooling, 115 exports, four roles, Unicode baseline, safeguards and S1–S16 |
| [OpenAPI specification](design/openapi-specification.md) and [example companion](design/openapi-examples.md) | All 27 operationIds, exact bindings, runtime rules, serialization and O1–O16 |
| [Testing strategy](design/integration-testing-strategy.md) | T1–T14, all 66 E/S/O checkpoints, thirteen runtime rules, per-capability evidence and human worksheet |

These sources retain their full approval provenance. Historical instructions to resume an earlier decision are superseded by the completed map. The map's former stop instruction closed that earlier session; the present request authorizes this consolidation/publication, not application work. The ready-for-agent status indicates specification readiness, not authorization to activate a capability or an assertion that remaining implementation choices have already been made.

### Actual preflight and review

On 2026-10-25, inspected the clean checkout at `9f25c5dcadf2311288bf140575e8782610e7c1a1`, tracker/domain/triage instructions, root glossary, completed map, readiness disposition, controlling design sections, frontend architecture, existing explicit Workspace operations, representative browser tests and the actual API health skeleton/test. No ADR directory or production shared-contract package exists at this baseline. The source inspection confirms local synchronous operations and a health-only API; approved connected behavior is still prospective.

This publication changes only this spec. No application tests, builds, generator runs, browser/API/security/delivery checks, installs, commits or pushes are claimed. Documentary verification covers template completeness, continuous story numbering, referenced local targets and whitespace. It does not establish executable contracts, runtime enforcement or human acceptance.

Documentary checks passed: all seven required template sections, 58 continuously numbered stories, 15 existing local link targets, required status, final newline and no trailing whitespace. `git diff --check` passed; checkout status showed only the new spec. Link-target checks did not validate section anchors. A synthesis review preserved the approved seam allocation, exact-inventory source references, later-approval precedence and explicit implementation deferrals.

### Reproducible evaluation and first action

For this document, begin with Testing Decisions and compare its seam allocation against Sections 3–4 of the linked testing strategy. Then review the following groups against their controlling guides. Record discrepancies with source section, scenario, expected requirement and observed wording; current implementation observation for every group remains **not evaluated**.

| Feature group | Reproducible document review | Future implementation observation |
| --- | --- | --- |
| Local and mixed authority | Compare the disposition's scenarios 1–4 with stories 1–8 and T1/T11 | API-unavailable local workflows, mixed-authority isolation and classified traffic |
| Workspace/domain | Compare catalog E1–E15 and domain scenarios with stories 22–36, 44–47 | CRUD, standalone/reassignment, coherent views, revisions, cascade, races and durable recovery |
| Async and validation | Walk all ten async and nine validation scenarios against stories 37–50 | Delay/reject/lose responses, leave/return, account switch, malformed reads and deliberate recovery |
| Authentication/Profile | Compare Blueprint lifecycle and catalog E16–E32 with stories 9–21, 48 | Intentional proof, enrollment, separate sign-in, profile conflict, expiry, scoped sign-out and real security |
| Contracts/OpenAPI | Compare S1–S16 and O1–O16 with stories 51–54 | Both consumer imports, exact binding/fixture coverage, guarded generation and independent drift proof |
| Evidence/compatibility | Compare testing Sections 14–16 with stories 55–58 | Named supported combinations, authoritative restart/concurrency evidence, delivery and user observations |

For each later implemented ticket, instantiate the testing strategy's worksheet with actual commands, revisions, authorities, fixtures, feature actions and evidence before handoff. Leave user observations pending until reported; preserve checkpoints per ticket rather than treating this umbrella spec as a single acceptance event.
