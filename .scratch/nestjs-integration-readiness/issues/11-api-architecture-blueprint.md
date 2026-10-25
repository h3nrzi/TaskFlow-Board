# Define the API Architecture Blueprint for progressive integration

Status: resolved
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: Codex (current wayfinder session)
Blocked by: 03, 05, 17

## Question

What API module boundaries, responsibilities, access/account context and interaction rules support the approved product/domain model and progressive integration? Specify the MVP API Architecture Blueprint as a linked design asset, with dependencies, one authority per coupled domain, account/profile boundaries, validation responsibilities and project deletion cascade guarantees. Identify consistency/concurrency/retry decisions only where concrete workflows require them. Preserve local independence and intentional activation. Do not infer a database, ORM, deployment topology or authentication mechanism. Any API-visible authentication/security requirements must be decided rather than hidden behind implementation deferral.

## Resolution requirements

Human-in-the-loop decision. Consult grilling and domain-modeling. Explicit user approval is required before resolution. Link detailed design assets from this ticket; the map indexes only the answer gist. Planning-only: no application, dependency or production package changes.

## Prerequisites

- [Define the frontend-facing contract needed for incremental API integration](03-api-contract.md)
- [Assign validation ownership across forms, domain rules and external data](05-validation-ownership.md)

## Approved async requirements to carry forward

Define the API responsibilities and consistency guarantees required by the approved async policy, including concurrent same-submission creation safety and transactional project cascade. Do not treat frontend conflict coordination as a server guarantee. See [Asynchronous completion, feedback and recovery requirements](../design/async-operation-policy.md), approved in full by Q14 confirmation of its owning decision.

## Validation requirements to carry forward

Apply [Validation ownership and canonicalization requirements](../design/validation-policy.md): approved in full by Q8 confirmation of its resolved owning decision. Preserve staged raw/canonical validation without premature length checks, authenticated domain enforcement, canonical output and tolerant-extra-field readers, validated safe errors, whole-read failure and uncertain-mutation recovery. Exact responsibilities and evaluation scenarios are linked there; retain this ticket's existing scope.

## Comments

### Q1–Q3 approved — 2026-10-24

- Three primary API responsibility areas: Authentication owns registration, sign-in, session/identity establishment, current authentication state and sign-out. Account/Profile owns authenticated account presentation, display-name management and explicitly approved account-facing operations. Workspace owns account-scoped projects/tasks, standalone tasks, assignment validation and consistent project deletion/task cascade.
- Projects/tasks share one consistent Workspace authority. Internal services/submodules may differ without compromising transactional domain operations, ownership enforcement or coordinated activation. No deployment topology, database or ORM is selected.
- Thin transport handlers delegate to explicit application operations coordinating raw-input validation, explicit normalization, canonical validation, authenticated account context, business/access rules, persistence boundaries and domain consistency. Shared contracts own payload definitions and structural/declarative validity, not business logic or authorization. Concrete infrastructure interfaces remain deferred until justified.
- Application operations must accommodate account-scoped concurrency-safe creation idempotency and consistent cascade; controllers and frontend conflict prevention cannot supply those guarantees.
- Authentication scope includes registration, sign-in, current-session/account lookup and sign-out. Password recovery, third-party identity providers and account deletion are deferred beyond MVP. Email change remains with its existing decision owner.
- Establish necessary authentication security guarantees, session lifecycle and trust boundaries before selecting an implementation mechanism. No JWT/cookie choice, credential strategy, session storage or provider is approved.

External security evidence is recorded in [Research mechanism-independent authentication security guarantees](17-authentication-security-evidence.md), including its pending-registration supplement. These findings do not approve additional architecture. The blueprint remains claimed and unresolved pending subsequent decisions and final user confirmation.

### Q4–Q5 approved — 2026-10-24

- Task/project updates, including task reassignment and status changes, require optimistic concurrency control. Each resource exposes a server-issued editable-version revision. Updates supply their base revision; the backend atomically checks the persisted version before mutation. Successful updates return authoritative data and its new revision.
- Revision mismatch rejects the mutation with a structured conflict. Preserve the draft and require deliberate refresh/review before resubmission. No silent merging, overwriting newer data, automatic stale replay or long-lived editing locks.
- Endpoint Catalog/shared schemas own revision representation, transport, error semantics and conflict versus missing-resource distinctions. Destructive-operation preconditions must be explicitly evaluated in the Endpoint Catalog; update approval does not silently decide them.
- Loading/refreshing Workspace returns a consistent logical snapshot of the authenticated account's complete projects/tasks, without pagination. Every task references an accessible project present in that same snapshot or has projectId: null. Concurrent project deletion/cascade cannot produce mixed-generation relationships.
- Consistency applies to each logical read, not subsequent time or unrelated operations. Frontend presentation filtering/sorting remain. Endpoint Catalog owns the exact operation/response; implementation planning chooses enforcement. No workspace-wide locks, database/ORM or permanent snapshot consistency is selected.

### Q6–Q8 approved — 2026-10-24

- Allow simultaneous authenticated sessions across browsers/devices. Sign-out invalidates only the initiating session. Once confirmed, server-side enforcement prevents that session's credentials, including pre-sign-out copies, from authorizing subsequent protected requests. Browser cleanup alone is insufficient. Previously authorized/admitted operations may finish; sign-out does not cancel or roll back them. Preserve confirmed-completion and uncertain-sign-out handling. Global sign-out is outside MVP.
- Enforce server-side session expiry at the earlier of 30 minutes of inactivity or 24 hours since successful authentication. Only meaningful user-driven authenticated activity refreshes inactivity; polling, background refreshes and passive activity cannot keep sessions alive. Activity and token renewal cannot extend the absolute deadline. Detailed design must specify reliable server-observable activity semantics without trusting arbitrary client reports.
- Expiration rejects further protected operations and requires reauthentication. Preserve same-account in-memory drafts, account isolation and deliberate reconciliation; neither expiry nor reauthentication automatically replays uncertain mutations. These durations are TaskFlow MVP decisions, not NIST assurance-level compliance claims.
- Registration creates a pending/unverified account, without a usable private Workspace session. Require proof of mailbox ownership before activation for protected Workspace access, including direct API calls. Authentication MVP includes verification and bounded resend flows. Verification credentials must be cryptographically secure, single-use, time-limited and replay-protected. Apply appropriate anti-abuse, rate-limiting and account-enumeration protections to registration, verification and resend.
- Pending-account behavior, verification lifetime/invalidation, resend semantics, email delivery failures and activation/session transition remain explicit next decisions. No provider, authentication framework, credential transport or database is selected. Email changes remain with [Define account email-change scope and security requirements](16-account-email-change.md). Browser-local/demo MVP remains independent; connected authentication failures never trigger fallback.

### Q9–Q10 approved — 2026-10-24

- Email verification credentials expire exactly 30 minutes after server-side issuance and must be cryptographically secure, unpredictable and single-use. Atomically check account binding, validity, expiration and unused state, record email-ownership proof and consume/invalidate the credential. Concurrent redemption cannot produce multiple successful consumptions.
- Successful verification invalidates all other outstanding verification credentials for the same pending account. Expired, revoked, invalid or replayed credentials cannot verify, establish a Workspace session or grant access. Resend never extends an existing credential's deadline; new credentials receive their own issuance-based lifetime. Replacement policy and activation/session transition remain subsequent decisions. Never expose verification credentials in logs or error responses. These are server guarantees; 30 minutes is a TaskFlow MVP limit.
- Accepted registration/resend requests return generic enumeration-resistant acknowledgements, such as "If this request is eligible, check your email." Do not reveal new, pending or active account state. Keep observable HTTP behavior, response structure and timing as consistent as reasonably achievable, including abuse/rate-limit behavior; identical wording alone is insufficient.
- Request acceptance, actual delivery, mailbox verification and Workspace activation are distinct. Accepted-request acknowledgement never claims delivery. If the service cannot accept or reliably record a request for processing, return a safe explicit service failure without observable account-existence dependence. Subsequent delivery failure preserves secure recoverable pending state and bounded resend; no unverified Workspace activation.
- Structural validation may reject malformed requests without leaking account eligibility/existence. Endpoint Catalog/shared schemas own acknowledgement, failure and verification outcomes. Email delivery infrastructure remains an implementation decision.

### Q11–Q13 approved — 2026-10-24

- At most three verification credentials may be simultaneously valid per pending account. Enforce the cap atomically under concurrent issuance. New issuance preserves earlier unexpired credentials, each with its own issuance-based 30-minute deadline. Expired/consumed credentials do not count. At capacity suppress issuance without revoking usable links or revealing eligibility; preserve generic acknowledgements. Verification atomically consumes the submitted credential and invalidates all remaining verification credentials for that pending account.
- Independent account/address and abuse-oriented rate limits remain mandatory; Endpoint Catalog owns exact limits/outcomes. If usable links are unavailable/undelivered, remain pending and allow new issuance when capacity returns, subject to abuse controls. Three is an MVP product cap, not a security-standard requirement.
- Verification landing GET/HEAD displays confirmation without consuming credentials, proving mailbox ownership, activating accounts, creating Workspace sessions or transitioning enrollment. No automatic confirmation on load, hydration, background requests or prefetch. Explicit user action submits the state-changing request; backend atomically enforces credential validity, expiration, single-use and binding. Protect credentials from logs, referrers, caches and unrelated third-party resources; prevent unintended scanner/preview confirmation. Endpoint Catalog owns exact routes/methods/outcomes.
- Account lifecycle: registration creates restricted unverified pending state; explicit verification establishes mailbox proof only; proof grants limited time-bounded enrollment authority; owner-controlled enrollment establishes the authentication method and activates the account; explicit successful sign-in alone establishes the normal Workspace session.
- Verification/enrollment authority cannot authorize Workspace operations or implicitly sign in. Credentials, browser sessions, contexts, linked identifiers and enrollment state belonging to an earlier unverified registrant never gain authority merely through owner verification. Enrollment must securely establish/replace actual credentials and invalidate earlier untrusted authentication/enrollment paths.
- Enrollment issuance, expiry, consumption, concurrent completion, recovery and active transition remain subsequent detailed decisions. No password/passkey/provider/database/session transport is selected. Keep registration acknowledgement, delivery, mailbox proof, enrollment completion, activation and sign-in distinct, with abuse/enumeration protections throughout.

### Q14–Q15 approved — 2026-10-24

- Intentional mailbox verification establishes exactly one account-bound cryptographically unpredictable enrollment credential, expiring 15 minutes after server issuance. Its sole purpose is enrollment completion; it cannot authorize ordinary authentication, profile operations, Workspace operations or session establishment.
- Enrollment completion atomically validates binding, purpose, expiry, revocation and single-use status, consumes authority, establishes owner-controlled authentication, invalidates earlier untrusted credentials/contexts/enrollment paths and activates the account. Concurrent completions allow at most one successful transition; partial activation is unacceptable. Correctable validation failures may preserve authority until the original deadline under abuse controls, never extend it. Success/expiry ends authority. No automatic Workspace session; explicit sign-in remains required. Issuance/delivery failures cannot accidentally activate an account or authorize an untrusted registrant.
- Lost/expired enrollment authority requires fresh intentional mailbox proof while the account is still pending. The bounded verification/resend flow supports verified-but-incomplete pending accounts, retaining 30-minute proof lifetimes, three-valid-proof cap, generic acknowledgements and abuse controls. Email requests alone never revoke usable enrollment authority; successful fresh proof atomically revokes prior enrollment authority and issues exactly one replacement with its own 15-minute lifetime.
- Active accounts cannot reopen enrollment, replace established authentication credentials or receive enrollment authority through verification/recovery. Credential recovery is outside MVP. Pending-state eligibility must be authoritatively enforced without exposing state in public acknowledgements or reauthorizing an earlier unverified browser context.
- Lost enrollment completion responses are uncertain: no automatic repetition, failure inference or second account. Offer deliberate sign-in; failed sign-in alone does not prove the original outcome. Fresh-proof recovery remains conditional on authoritative pending state.
- Blueprint owns these lifecycle/atomicity guarantees; Endpoint Catalog/shared schemas own precise issuance, completion, recovery, conflict and error semantics. Token transport/storage/format, provider, database and session transport remain unselected and with downstream design/implementation owners.

### Q16–Q18 approved and revised — 2026-10-24

- Q16 approved: concurrent project deletion, task creation and reassignment must match a valid serial ordering of committed domain operations. Moving out before deletion survives; moving in before deletion joins the cascade; creation/reassignment after deletion fails safely. Enforce ownership, relationships and applicable resource revisions at commit. No orphans, partial cascades, cross-account changes or lost updates. Frontend coordination cannot replace backend consistency; no database/transaction/locking mechanism selected.
- Q17 approved: Workspace application operations own atomic resource creation and durable idempotency outcome. Scope logical submission by authenticated account and creation operation; concurrent equivalent original-payload submissions create at most one resource. Creation cannot commit while losing its recovery record. Authenticate/authorize every recovery and preserve original account/operation scope. Replayed original outcomes never recreate deleted resources, restore earlier field values or repeat side effects; original outcome is not necessarily current resource state. Catalog owns equivalence, key transport, in-progress/concurrent handling, outcome representation, retention, conflicts and expired/unavailable recovery. Expired records never prove recreation safe.
- Q18 revised: the mutation-only activity proposal was rejected. Meaningful foreground user-initiated authenticated interactions may refresh inactivity, including deliberate reads/navigation, filtering, meaningful Workspace interaction and active form editing. Background polling/synchronization, prefetch, passive timers, idempotency replays and unrelated automatic requests cannot extend inactivity.
- Integration may use a narrowly scoped authenticated, rate-limited activity-touch operation for meaningful foreground interactions that otherwise remain in memory. It must not run periodically merely because the page is open. Server maintains authoritative last activity and both deadlines. Client timestamps/flags never establish authority; requests received after expiry cannot extend/resurrect sessions. Client interaction signals are not cryptographic proof of human presence. Require authentication, request-integrity protection and abuse controls.
- The 24-hour absolute limit, expiry/account isolation/draft/reconciliation rules remain unchanged. This is an explicit TaskFlow security/usability trade-off. Blueprint owns behavior/trust boundary; downstream specifications own exact activity transport, throttling and client integration.

### Q19–Q21 approved — 2026-10-24

- Account/Profile owns canonical account identity, account state and presentation, including immutable account ID and approved display-name data. Authentication owns verification/enrollment/authentication credentials, sessions, revocation and authentication security policy; explicit application operations coordinate canonical account lifecycle changes. No competing account/profile copy, circular ownership or duplicated authoritative state. Preserve atomic cross-module activation/security transitions.
- Workspace receives authenticated active account identity from trusted server context and independently enforces ownership/access. Client IDs/frontend authorization cannot establish authority. Authentication depends on account core without requiring editable Profile UI integration. Real authentication may coexist with local projects/tasks; connected Workspace requires real authentication. No connected fallback or inferred deployment/database/persistence abstraction.
- Display-name updates require independent server-issued profile revisions. Atomically check base revision before authorized canonical mutation; stale edits return structured conflicts, preserve drafts and require deliberate refresh/review. Success returns canonical profile and current revision. Profile revisions are independent of Workspace, session activity, inactivity and unrelated auth/session lifecycle changes. Catalog/schemas own transport/outcomes/access semantics; no long-lived locks/merging.
- Mandatory connected-boundary security: HTTPS externally and across relevant deployed trust boundaries; local exceptions cannot weaken deployment. Server-derived identity/access; fail closed on invalid/expired/revoked/insufficient/unauthorized credentials. No reusable secrets/passwords/session or enrollment credentials in logs/errors/telemetry/ordinary URL parameters; restricted verification links retain approved leakage controls.
- Transport-appropriate integrity protection, including effective CSRF defense where exposed; CORS/HTTPS/SameSite alone are not complete CSRF defenses. Generic enumeration-resistant sign-in failures with consistent behavior where practical; bounded rate/abuse controls without attacker-triggered permanent lockouts. Sensitive authentication/session responses require appropriate no-store behavior.
- Record sign-in outcomes, verification/enrollment, session creation/expiry/revocation and suspicious failures with minimal sensitive data and no reusable secrets/raw session tokens. Apply protections consistently across registration, verification, enrollment, sign-in/out, session lookup, activity touch and protected account/Workspace operations as applicable.
- Blueprint owns security/trust boundaries; Endpoint Catalog owns concrete transport requirements/outcomes/auth metadata/protections; implementation evaluation must demonstrate enforcement before activation. No authentication provider/credential strategy/session transport/database/ORM/deployment architecture selected. Design approval is not implemented-security evidence.

### Assembled Blueprint — final review pending

[API Architecture Blueprint for progressive integration](../design/api-architecture-blueprint.md) assembles the approved Q1–Q21 decisions and clarifications, including the revised Q18, with downstream owners and fifteen reproducible review/evaluation scenarios. This draft is not yet a final user confirmation or resolution. The ticket remains claimed.

Actual preflight: initial checkout was clean before the claim; inspected the map, tracker/domain instructions, glossary, approved prerequisite assets, frontend/API baseline and downstream scopes. Primary-source security research and its supplement are resolved as evidence only. Changes are planning Markdown/glossary only; no application tests, builds, runtime/security checks or implementation acceptance are claimed.

Documentation checks passed: all 152 local Markdown file targets in this effort and dependency IDs across 17 tickets exist; `git diff --check` is clean. Read-only consistency review found no actionable discrepancy against Q1–Q21 and incorporated prerequisite requirements, including revised foreground activity, canonical account-state ownership, original-outcome idempotency, restricted active-account recovery and atomic verification/enrollment guarantees. Final user review of the assembled asset remains pending.

### Q22 confirmation — 2026-10-24

The user reviewed the complete Blueprint against Q1–Q21, all clarifications and revised Q18; confirmed all fifteen evaluation scenarios and downstream ownership; found no material discrepancies; approved the Blueprint and explicitly authorized resolution. They specifically confirmed scenario 13: meaningful foreground activity may refresh inactivity without committed mutations, background/automatic requests cannot, and server-authoritative 30-minute inactivity/nonextendable 24-hour absolute limits remain. This confirmation supersedes the draft-review-pending entries above; implementation, runtime security verification and human implementation acceptance remain pending.

## Answer

### Approved choice and explicit confirmation

Approved in full by Q22 on 2026-10-24: [API Architecture Blueprint for progressive integration](../design/api-architecture-blueprint.md). This is the detailed specification of the approved Q1–Q21 choices and clarifications, including the user's revised Q18. It defines Account/Profile canonical ownership, Authentication lifecycle/security responsibilities, coupled Workspace authority, thin transport/application operations, coherent reads, optimistic task/project/profile concurrency, serial domain-operation outcomes, durable creation idempotency and progressive integration dependencies.

Authentication scope includes pending registration, intentional mailbox proof, bounded resend, restricted owner-controlled enrollment, explicit sign-in, session lookup, scoped sign-out and foreground activity handling. The specification carries the approved credential/time/cap limits, atomic transitions, revocation, server authority, anti-abuse and browser trust boundaries without selecting infrastructure or an authentication mechanism.

### Retained and explicitly revised behavior

Preserve approved resource/business/access rules, private account scope, standalone tasks, transactional project cascade, confirmed connected completion, draft/account isolation, validation and deliberate recovery. Preserve independent local MVP behavior and browser-storage safeguards; no connected failure invokes fallback.

The approved connected design strengthens read consistency, adds resource/profile revision preconditions and establishes verification/enrollment/session lifecycle requirements. Q18 explicitly replaces mutation-only activity with meaningful foreground interaction and a protected activity-touch option. These refinements supersede conflicting earlier deferrals without changing historical answers or local code.

### Minimum preparation and documentation-only outcome

No application/package/dependency/configuration/test changes or implementation tickets are created. Before connected activation, implement the applicable authority, account isolation, validation, async/recovery, revision, consistency/idempotency and security guarantees. No mandatory preliminary universal abstraction, database, ORM, provider, credential strategy, session transport or deployment topology is selected.

### Remaining owners and triggers

The Blueprint's ownership table assigns all remaining precise workflow, contract, transport, schema, OpenAPI and evaluation details to existing decisions. Updated downstream ticket references preserve those obligations; these API-visible choices must be settled during readiness. Concrete infrastructure/enforcement mechanisms and build sequencing await separate implementation planning after readiness approval. Password recovery, third-party identity providers, account deletion and global sign-out remain out of scope; pending enrollment recovery cannot reopen active accounts. No new decision child is required: newly precise catalog/schema questions fit their existing owners; security evidence was resolved in its research child.

### Verification and hands-on evaluation handoff

Q22 confirms design review of all fifteen reproducible scenarios, including revised foreground activity in scenario 13. Preserve the per-feature checkpoints in the linked Blueprint for future controlled concurrency, clock, response-loss, direct-API security and local-independence evaluation. These are accepted design requirements, not executed runtime/security evidence or human implementation acceptance.

Actual preflight and draft consistency checks are recorded above and in the Blueprint. Only planning Markdown/glossary were changed; no tests, builds or runtime checks were run. Final documentation checks are recorded below after tracker updates.

First concrete action: resume the decision map with [Define account email-change scope and security requirements](16-account-email-change.md), the next frontier. Application implementation, runtime security verification and human implementation acceptance remain pending evidence and user observations.

Final resolution checks passed: `git diff --check`; 160 local Markdown file targets exist; all dependency IDs across 17 tickets exist and the graph has no cycles; Blueprint asset is approved and its owner is resolved; the only open unblocked unclaimed frontier decision is Define account email-change scope and security requirements. Updated catalog, schema, testability and email-change prerequisites reference the approved Blueprint. No application tests/builds/runtime or security verification were executed. Q22 completes architectural review only; future human implementation evaluation remains pending.
