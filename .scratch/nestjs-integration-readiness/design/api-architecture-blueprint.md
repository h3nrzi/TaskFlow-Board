# API Architecture Blueprint for progressive integration

Decision owner: [Define the API Architecture Blueprint for progressive integration](../issues/11-api-architecture-blueprint.md).

Status: approved on 2026-10-24. Q22 explicitly confirmed the complete specification against Q1–Q21, their clarifications, revised Q18 and all fifteen review scenarios, found no material discrepancies and authorized resolution of the owning decision. Q18 adopts the user's foreground-interaction policy, not the rejected mutation-only proposal. This document is planning, not application implementation or security acceptance evidence.

## Authority and scope

This Blueprint applies the approved [frontend-facing contract](frontend-facing-contract.md), [asynchronous operation policy](async-operation-policy.md), [validation policy](validation-policy.md), and [tooling decision](../issues/10-contract-tooling.md#answer). Their resource fields, canonicalization, private-workspace access, deletion privacy, completion, account isolation and compatibility requirements remain binding except where the later approvals explicitly refine them below.

In particular, coherent Workspace reads now strengthen the earlier absence of a cross-request snapshot guarantee; resource/profile revisions refine update requirements; verification and owner-controlled enrollment expand the approved Authentication scope. These are connected-API design changes, not changes to the browser-local implementation. The server Workspace read below is not a browser-storage snapshot or whole-workspace save API.

## Responsibility areas and ownership

| Area | Owns | Boundary |
| --- | --- | --- |
| Account/Profile | Canonical account identity, state and presentation; immutable account ID and approved editable display name | Exactly one authoritative account record. Ordinary profile updates cannot change identity/email. |
| Authentication | Verification credentials, enrollment authority, authentication credentials, sessions, revocation and security policy; lifecycle application operations | Coordinates registration, verification, enrollment and activation against the canonical account record; no competing identity/profile copy. |
| Workspace | Account-scoped projects/tasks, standalone tasks, assignment rules, revisions, coherent reads, creation idempotency and project cascade | Projects/tasks share one consistent domain authority, even if internal services/submodules differ. |
| Shared contracts | API payload definitions, reusable structural/declarative validity, inferred types and error contracts | No business logic, account authorization, UI state or browser snapshots. Apply approved Schema-First tooling. |
| Frontend | Forms, presentation, pending/draft/recovery coordination and intentional capability use | Client validation/conflict prevention never establishes server permission, domain consistency or successful completion. |

Authentication may depend on the account core before editable Profile UI integration. Workspace receives active authenticated identity from trusted server-side context and independently enforces ownership/resource access. It never obtains authority from a client-selected account ID, demo profile, editable email/name or free-text assignee. Canonical lifecycle state belongs to Account/Profile; Authentication coordinates its transitions without circular ownership or duplicated authoritative state.

These are responsibility and consistency boundaries, not deployment boundaries. Internal interfaces and infrastructure separation must preserve them; no database, ORM, deployment topology, generic repository, cache or persistence abstraction is chosen.

## Application operations and validation

Thin transport handlers delegate to explicit application operations. Operations coordinate the approved raw-input checks, explicit normalization, canonical validation, authenticated account context, domain/access rules, infrastructure boundaries and commit-time consistency. Security-sensitive transitions and idempotency/cascade policies do not live solely in controllers.

Preserve the approved pipeline: strict raw request shape/type/field checks; explicit trimming only of approved fields; canonical nonblank and Unicode-code-point length checks; authoritative domain/access enforcement. Shared wire schemas do not coerce, trim, default or repair data. Preserve omission/null distinctions and description content. This specifies responsibilities, not a universal middleware ordering that could expose resource existence before authentication.

Validate server output and frontend-received output, including canonical known fields and safe structured errors. Tolerate permitted additional response fields; reject invalid/missing declared fields. An invalid read fails the whole read. Invalid mutation success or an unclassifiable dispatched result remains uncertain; output validation failure cannot be treated as proof that an already committed mutation rolled back. Preserve drafts and deliberate recovery.

## Workspace reads and updates

Loading/refreshing Workspace yields one consistent logical snapshot of the authenticated account's complete project/task collections. Every task references a project present and accessible in that same snapshot or has `projectId: null`. Concurrent changes cannot yield mixed-generation orphan relationships. Empty collections succeed, without pagination/silent truncation; filtering and presentation sorting remain frontend-side.

Consistency applies to that individual logical read, not subsequent time or unrelated operations. It implies neither permanent snapshot consistency nor workspace-wide locks. The Endpoint Catalog chooses the precise read operation and response structure; implementation planning chooses enforcement.

Task/project updates, including status changes and reassignment, require the server-issued revision on which the user's changes were based. Atomically compare against persisted state before applying an authorized mutation. Success returns the authoritative resource and its new revision. Revision mismatch returns a structured conflict: retain the draft and require deliberate refresh/review before resubmission. No silent overwrites/merges, automatic stale replay or long-lived editing locks.

Display-name updates use the same optimistic-concurrency principle with an independent profile revision. Atomically check its base revision before canonical authorized change; return canonical profile data/current revision on success. Profile revisions are independent of Workspace revisions, session activity, inactivity updates and unrelated authentication/session lifecycle changes. Exact revision representation, conflict/missing distinctions and no-op semantics remain catalog/schema responsibilities; no whole-Workspace revision is selected.

Destructive-operation preconditions remain an explicit Endpoint Catalog decision. Update revision approval does not silently decide delete preconditions. Preserve successful indistinguishable confirmed absence for deletion of well-formed missing/foreign IDs, no foreign modification, concealed not-found reads/updates and explicit malformed/auth/service errors under the approved contract.

## Workspace commit-time consistency

Project deletion and its account-scoped task cascade form one consistent backend-owned operation: no partial cascade, orphan or cross-account modification. Project/task mutation races must be equivalent to a valid serial ordering of the committed domain operations:

- A task moved out before former-project deletion survives.
- A task moved into a project before its deletion participates in the cascade.
- If deletion commits first, later creation/reassignment into that project fails safely.

Enforce ownership, relationships and applicable resource revisions at the authoritative commit boundary. Earlier form checks, earlier server reads and frontend conflict coordination are insufficient. Preserve standalone tasks and the approved rules for all task status transitions and duplicate names/titles. No particular transaction, database or locking mechanism is chosen.

Workspace application operations own an atomic guarantee covering task/project creation and its durable idempotency outcome. Scope logical submission by authenticated account and creation operation. Concurrent equivalent submissions with the same identifier/original payload create at most one resource. Creation cannot commit while losing the authoritative record required to recognize/recover that logical submission.

Authenticate/authorize every recovery attempt and enforce original account/operation scope. Returning a recorded outcome never recreates a deleted resource, restores pre-edit values or repeats downstream side effects. The recorded original outcome is not necessarily the resource's current state. Catalog/schema owners must settle equivalence, key transport, in-progress handling, outcome encoding, retention, different-payload conflict and expired/unavailable-record recovery. Record expiry/unavailability never establishes that a new creation is safe. Preserve deliberate user recovery and no automatic replay.

## Registration, proof and activation lifecycle

The following are conceptual lifecycle stages, not approved wire enum names or storage schemas:

| Stage or transition | Granted authority |
| --- | --- |
| Accepted registration | Restricted unverified pending account; acknowledgement does not prove email delivery. No normal Workspace session. |
| Intentional mailbox verification | Mailbox ownership proof and restricted time-bounded enrollment authority only. Account remains pending until enrollment completes. |
| Owner-controlled enrollment completion | Establishes the owner's authentication method, invalidates untrusted access paths and activates the canonical account consistently. No automatic sign-in. |
| Explicit successful sign-in | Establishes a normal authenticated Workspace session for an active account. |

Account activation requires both mailbox proof and owner-controlled enrollment. Credentials, pending browser sessions, authentication contexts, linked identifiers or enrollment state created by an earlier unverified registrant must never become usable merely because the owner verifies the email. Enrollment securely establishes/replaces the actual authentication path and invalidates prior untrusted access paths.

Verification/enrollment authority cannot authorize ordinary authentication, profile operations, Workspace operations or session establishment. Direct API calls must enforce these restrictions. Neither delivery acknowledgement nor a frontend state change proves eligibility. Authentication lifecycle operations coordinate canonical Account/Profile state and their security artifacts under the required consistency boundary.

### Verification credentials and intentional confirmation

- Credentials are account-bound, cryptographically secure/unpredictable and single-use, expiring exactly 30 minutes after server-side issuance.
- Atomically check binding, validity, expiration and unused state, record proof and consume the submitted credential. Concurrent redemption permits at most one successful consumption. Success invalidates every other outstanding verification credential for that pending account.
- Expired, revoked, invalid or replayed credentials cannot verify, grant access or establish a Workspace session.
- At most three verification credentials may be simultaneously valid per pending account; enforce the cap atomically under concurrent issuance. Expired/consumed credentials do not count. New issuance preserves earlier usable credentials and their original deadlines; each new credential has its own issuance-based deadline.
- At capacity suppress issuance without invalidating usable links or revealing eligibility. If usable links are unavailable/undelivered, remain pending; new issuance becomes eligible when capacity is available, subject to independent abuse/rate controls. Thirty minutes and three credentials are TaskFlow product limits, not standard-mandated values.
- Opening the link via GET/HEAD displays confirmation without consumption, mailbox proof, account activation, enrollment transition or Workspace session. Require explicit user action for a state-changing confirmation request. No auto-confirmation on load, hydration, background requests or prefetch; scanners/link previews must not unintentionally trigger confirmation. Explicit action is a flow requirement, not cryptographic proof of humanity.
- Protect proofs from logs, errors, referrers, caching and unrelated third-party resources. Exact route, method, credential transport and response belong to the Endpoint Catalog/shared schemas.

### Enrollment authority and recovery

Intentional verification establishes exactly one account-bound, cryptographically unpredictable enrollment credential with a 15-minute lifetime from server issuance. It grants only restricted completion authority. Issuance/delivery failure cannot accidentally activate an account or authorize an untrusted registrant.

Successful completion is one authoritative consistent transition: validate binding, purpose, expiry, revocation and single-use status; consume the credential; establish owner-controlled authentication; invalidate prior untrusted credentials, contexts and enrollment paths; activate the account. At most one concurrent completion succeeds. Partial activation is unacceptable. Correctable validation failures may leave authority usable under abuse controls until the original deadline; no failure extends it. Success/expiry terminates authority. Explicit sign-in is still required afterward.

Lost/expired authority requires fresh intentional mailbox proof for an account that remains pending. The same bounded flow supports already-verified but enrollment-incomplete accounts, retaining 30-minute proofs, the three-valid-proof cap, generic acknowledgements and abuse limits. Merely requesting another email cannot revoke usable enrollment authority. Successful fresh proof atomically revokes prior enrollment authority and issues exactly one replacement with its own 15-minute deadline.

Once active, verification/enrollment recovery cannot reopen enrollment, replace established authentication credentials or issue enrollment authority. Credential recovery is outside MVP. Check pending eligibility authoritatively without exposing it in public acknowledgements or restoring an earlier unverified browser context's access.

Lost enrollment-completion responses mean uncertainty: never automatically repeat, infer failure or create a second account. Offer deliberate sign-in without treating failed sign-in as definitive proof of the original outcome. Fresh-proof recovery remains conditional on authoritative pending state. Issuance/completion/recovery conflict/error/transport semantics belong to catalog/schema owners.

### Generic acknowledgements and delivery

Accepted registration/resend requests use enumeration-resistant acknowledgements such as “If this request is eligible, check your email.” Do not disclose new/pending/active address state. Keep HTTP behavior, response structure and timing consistent as reasonably achievable; apply rate/abuse protections without avoidable existence signals. Structural input validation may reject malformed requests without exposing eligibility.

Distinguish acceptance, actual delivery, mailbox proof, enrollment completion, activation and sign-in. Acknowledgement never claims delivery. If the service cannot accept or reliably record processing, return a safe explicit service failure without observable account-existence dependence. Subsequent delivery failure preserves secure recoverable pending state and bounded resend, never unverified activation. No email provider, queue or delivery infrastructure is selected.

## Sessions, sign-out and activity

Allow simultaneous sessions across browsers/devices. Sign-out affects only the initiating session. Once confirmed, server-side enforcement prevents its credentials, including prior copies, from authorizing subsequent protected requests. Browser cleanup alone is insufficient. Already-authorized/admitted operations may finish; sign-out does not cancel/roll back them. Preserve explicit failures and uncertain sign-out outcomes, without demo/local fallback. Global sign-out is outside MVP.

Server enforces expiry at the earlier of 30 minutes of inactivity or 24 hours since successful authentication. Activity/token renewal cannot extend the absolute deadline. Expiry rejects further protected operations and requires reauthentication. Preserve account isolation, same-account in-memory drafts and deliberate reconciliation; expiry/reauthentication never automatically replays uncertain mutations. These are TaskFlow product limits, not a NIST assurance-level claim.

Meaningful foreground user-initiated authenticated interactions may refresh inactivity whether or not they commit a mutation: deliberate reads/navigation, filtering, meaningful Workspace interaction and active form editing qualify. Background polling/synchronization, prefetch, passive timers, idempotency replays and unrelated automatic requests cannot extend inactivity.

For meaningful interactions that stay in memory, integration may use a narrowly scoped authenticated, rate-limited activity-touch operation. It cannot run periodically merely because the page is open. The server owns last activity and both deadlines; client timestamps/arbitrary flags do not establish authority. Requests received after expiry cannot extend/resurrect sessions. Client signals are not cryptographic human-presence proof: protect authentication/request integrity and apply abuse controls. This explicitly accepts a security/usability trade-off; transport, throttling, eligibility handling and client integration remain downstream design work.

## Mandatory connected-boundary security

Apply these requirements consistently, as applicable, to registration, verification, enrollment, sign-in/out, session lookup, activity touch and protected Account/Workspace operations:

- HTTPS for externally exposed traffic and secure transport across relevant deployed trust boundaries. Local development exceptions cannot weaken deployed security.
- Validated server-derived account authority; deny invalid, expired, revoked, insufficient and unauthorized credentials by default. Workspace/profile access requires the appropriate active authenticated account context.
- No reusable authentication secrets, passwords, session credentials, enrollment authority or sensitive tokens in logs, errors, telemetry or ordinary URL parameters. Restricted single-use verification links retain their separately approved handling.
- Transport-appropriate request-integrity protections and effective CSRF defenses wherever exposed. CORS, HTTPS or SameSite alone are not complete CSRF protection.
- Generic enumeration-resistant sign-in failures and consistent observable behavior where practical. Bounded rate/abuse controls without attacker-triggered permanent account lockout. Independent account/address and abuse-oriented registration/resend limits; exact policies/outcomes require catalog decisions.
- Appropriate no-store behavior for sensitive authentication/session responses.
- Security event recording for sign-in outcomes, verification/enrollment, session creation/expiry/revocation and suspicious failures, minimizing sensitive data and excluding reusable secrets/raw session tokens.

The [primary-source security evidence](authentication-security-evidence.md) explains the facts and trade-offs; it does not itself approve mechanisms. Blueprint approval is not evidence of implemented security. Endpoint Catalog must make protections/authentication metadata concrete, and implementation evaluation must demonstrate enforcement before activation.

## Progressive integration and minimum preparation

Retain one logical workspace and deliberate developer-controlled capability activation. Authentication can integrate with its account core while projects/tasks remain browser-local and editable Profile UI follows later. Connected Workspace requires real active-account authentication. Projects/tasks, assignment and cascade transition under one authority for reads/writes. No deployment order is selected beyond these dependencies.

Theme remains local. Connected profile/account authority cannot be independently persisted or overwritten by a local whole-store snapshot. Connected failure never silently invokes browser storage, demo data or demo authentication. The independently operational local MVP retains its current immediate in-memory behavior and separate browser-persistence safeguards, including existing recovery/export behavior. No development-data migration, preservation, import/export or offline-sync project is introduced.

Before activating a connected capability, its implementation must satisfy applicable authority isolation, validation, pending/confirmed/rejected/uncertain completion, draft/account isolation, server consistency, concurrency and security requirements. This is documentation/contract design only: no preliminary universal refactor, production contracts package, endpoint implementation, dependency/configuration change, database, ORM or authentication mechanism is approved here.

## Remaining owners and scope boundaries

The following are precise responsibilities of existing downstream decisions, not implementation-time permission to leave an API contract unspecified:

| Remaining detail | Owner and trigger |
| --- | --- |
| Concrete methods/paths, coherent read response, revisions, conflicts/missing distinctions, explicit destructive preconditions, deletion encoding, idempotency equivalence/results/retention/recovery | [Design the MVP Endpoint Catalog](../issues/12-endpoint-catalog.md), after Blueprint and email-change decisions |
| Implementable registration/verification/enrollment/sign-in/out/session/activity contracts; credential/session transport and its request-integrity requirements; safe repeated/uncertain outcomes; exact rate limits, activity handling and sensitive-response metadata | [Design the MVP Endpoint Catalog](../issues/12-endpoint-catalog.md); resolve contract-facing choices during readiness without implementing providers or stores |
| Registration/enrollment input inventory, account-email identity/comparison policy, pending-registration repeat/lifetime semantics and owner review of provisional presentation data where required by the chosen flow | Catalog for workflow/identity policy; [Specify the shared Schema-First contracts](../issues/13-shared-schema-contracts.md) for approved raw/canonical schema expression. No unapproved policy is implied here. |
| Email-change inclusion/security | [Define account email-change scope and security requirements](../issues/16-account-email-change.md); this Blueprint does not approve an email-change endpoint |
| Exact DTO/revision/lifecycle/submission/result/error schemas and compatibility | [Specify the shared Schema-First contracts](../issues/13-shared-schema-contracts.md), after catalog |
| OpenAPI consistency and explicit runtime-only constraints | [Specify the OpenAPI document and its contract consistency rules](../issues/14-openapi-specification.md) |
| Reproducible simulated/live integration, contract/security/consistency evidence and module checkpoints | [Choose evidence that proves local independence and each integration increment](../issues/07-testability.md) |
| Concrete internal interfaces, persistence/transaction mechanisms, provider/library selection, deployment and activation wiring | Separate implementation planning after readiness approval, constrained by completed API/security contracts; typed client tooling review at first real integration remains mandatory |

Password recovery, third-party identity providers, account deletion and global sign-out are outside the Authentication MVP. Active-account credential recovery cannot be smuggled into pending enrollment recovery. Collaboration, offline sync and transition-data migration remain outside this effort. No application changes, implementation tickets or build sequencing belong to this map.

## Reproducible design review and future evaluation

The user reviewed and confirmed all fifteen scenarios in Q22, specifically checking scenario 13 against revised Q18. During implementation, use controlled concurrency, clocks, failures and lost responses to reproduce them and record actual observations. The scenarios below are requirements, not executed tests or human implementation acceptance.

1. **Ownership/activation:** trace real authentication plus local projects/tasks and local theme. Profile integration may follow; local saves cannot overwrite connected profile. Then trace connected Workspace requiring real active-account context, with no client-ID authority or fallback.
2. **Validation:** submit a whitespace-padded boundary-length title and a foreign project reference. Apply approved raw/normalization/canonical stages and commit-time access checks; invalid output/error handling preserves read integrity and mutation uncertainty.
3. **Coherent read:** race project deletion/cascade with Workspace loading. Every returned task references a project in that same account-scoped snapshot or null; empty results succeed without truncation or demo initialization.
4. **Stale edits:** submit competing task/project updates, including status/reassignment. Only a matching revision commits; conflict preserves draft/review. Repeat for display name; session activity and unrelated Workspace changes must not change profile revision semantics. Delete preconditions are checked against the later explicit catalog choice, not inferred here.
5. **Cascade races:** race task moves into/out of a project, creation and deletion. Observe valid serial outcomes, no orphans/partial cascade/cross-account effects and commit-time revision/access enforcement.
6. **Creation recovery:** race equivalent same-key requests and interrupt around commit/result recording. At most one resource and a recoverable original outcome; wrong payload/account/operation cannot bypass checks. Edit/delete afterward and recover: no resurrection, field restoration or repeated side effects. Expired/unavailable records do not authorize blind recreation.
7. **Public registration/delivery:** compare new/pending/active addresses, malformed input, capacity suppression and delivery failure. Preserve safe generic acknowledgement and reasonably consistent behavior; distinguish acceptance from delivery. Inability to accept/record returns a safe explicit service failure without an existence oracle.
8. **Verification issuance/redemption:** race issuance at the three-valid-credential cap and redemption of valid proofs. Enforce independent 30-minute deadlines, no invalidation on resend, at most one successful consumption and invalidation of siblings. Expired/revoked/replayed proofs grant no access.
9. **Safe link opening:** retrieve via GET/HEAD, scanner/prefetch and page hydration. No proof consumption/state transition/implicit session; only intentional protected confirmation proceeds. Check logs, referrers, cache and unrelated-resource exposure.
10. **Pre-registration takeover:** an attacker starts registration with the owner's email; the owner later verifies/enrolls. No attacker credential, context, identifier or access path becomes valid. Verification/enrollment credentials cannot call profile/Workspace APIs or establish normal sessions.
11. **Enrollment completion/recovery:** race completions and injected failures. One consistent activation with consumed 15-minute authority, owner-controlled authentication and revoked untrusted paths; no partial activation/auto-session. Correctable errors never extend authority. Lost/expired authority requires fresh proof while pending; email requests alone do not revoke it. Active accounts cannot reopen enrollment. Lost completion response stays uncertain, and failed sign-in alone proves nothing about that earlier operation.
12. **Sessions/revocation:** establish two sessions, sign out one and reuse its copied credential after confirmation. Reject it; the unrelated session remains usable. Previously admitted mutations may finish, and lost sign-out responses remain explicit uncertainty.
13. **Activity/expiry:** exercise foreground filtering/editing/navigation and applicable touch behavior; contrast polling, prefetch, passive timers and idempotency replay. Server times remain authoritative; fabricated client timestamps and post-expiry touches cannot resurrect. Enforce 30-minute inactivity and nonextendable 24-hour absolute limits; preserve drafts/account isolation/reconciliation.
14. **Security boundaries:** exercise direct API calls, expired/insufficient credentials, transport/request-integrity defenses, enumeration/abuse controls, no-store behavior and secret-free security diagnostics. Required outcomes must hold before activation; documentation approval alone proves none of them.
15. **Local independence:** with API unavailable in local configuration, exercise existing local operations and browser-storage recovery/export/conflict safeguards. Connected configuration instead reports failures and never silently changes authority.

## Actual preflight and review status

Initial checkout inspection for this decision reported a clean worktree before the claim. Read the map, tracker/domain guidance, glossary, approved ownership/persistence/contract/async/validation requirements and downstream scopes. Read-only baseline inspection found a health-only API and demo authentication; those are context, not implementation readiness. Primary-source authentication research and its pending-registration supplement are linked above.

This decision changes planning Markdown and approved glossary terms only. No application tests, builds, runtime integration, deployed security checks or human implementation evaluation have been executed or claimed. Draft documentation preflight passed: 152 local Markdown file targets and dependency references across 17 tickets existed; `git diff --check` was clean. Read-only consistency review found no actionable discrepancy against the approved Q1–Q21 and incorporated prerequisite requirements. Q22 completed user architectural review with no material discrepancies. Final resolution checks are recorded in the owning ticket.

First concrete planning action: resume the map with [Define account email-change scope and security requirements](../issues/16-account-email-change.md), the next frontier decision. Preserve all fifteen scenarios as future implementation-evaluation checkpoints. Application implementation, runtime security verification and human implementation acceptance remain pending actual evidence and user observations, independently of this architectural approval or automated checks.
