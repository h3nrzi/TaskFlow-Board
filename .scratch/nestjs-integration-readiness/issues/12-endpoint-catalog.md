# Design the MVP Endpoint Catalog

Status: resolved
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: Codex (current wayfinder session)
Blocked by: 11, 04, 16, 18

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


## Approved account email scope to carry forward

Apply [MVP account email scope](../design/account-email-scope.md), approved in full by Q2 of [Define account email-change scope and security requirements](16-account-email-change.md#answer). Registered account email is read-only; account ID is immutable. Ordinary profile updates accept display name only, preserving canonical validation, ownership and independent profile optimistic concurrency. Strictly reject unsupported email/account-ID request fields. Exclude email-change endpoints, pending-change workflows and email-change verification/recovery contracts from the MVP design. Preserve email response fields and approved registration/enrollment inputs, all approved authentication lifecycle/security/isolation guarantees and restricted pending enrollment recovery. Do not add password/account recovery or alternate email-modification paths. Secure email changes require a future account-settings expansion and prior security decisions; exact approved MVP transport/schema choices retain their existing owners. Carry the six linked evaluation scenarios forward without claiming runtime verification or implementation acceptance.

## Comments

Approved asset: [MVP Endpoint Catalog](../design/endpoint-catalog.md). Final confirmation and resolution are recorded under Answer; earlier review-status comments are historical.

Subsequent Q6–Q11 approvals are captured in this history and the working catalog. The complete catalog remains claimed/unresolved; resolved research does not approve contract choices.

### 2026-10-24 — Q12–Q13 explicitly approved by the user

- Q12: same production HTTPS frontend/API origin. Active `__Host-taskflow-session; Secure; HttpOnly; SameSite=Lax; Path=/`, no Domain/Expires/Max-Age, remember-me, JS credentials or localStorage. Secure connected development/evaluation required; cross-origin needs design revision. Browser restoration may preserve cookies; authoritative revocation/30-minute inactivity/24-hour absolute expiry remain mandatory. Sign-out revokes initiating session and clears matching cookie (Max-Age=0/expired Expires permitted for clearing). Preserve multiple sessions, draft/account isolation, explicit sign-in and admitted-operation distinction. SameSite is additional defense; CSRF remains unresolved. No topology/proxy/store/framework/library selected.
- Q13: enrollment 15–128 Unicode code points after server NFC; accept printable ASCII/spaces/valid Unicode including supplementary characters; reject malformed/unpaired surrogates/disallowed controls. No trim/case-fold/truncate/alteration beyond NFC; same validity/normalization on enrollment/sign-in, before canonical length/full-candidate blocklist/hash. Distinct passwords remain distinct except NFC equivalence. Maintained common/expected/compromised blocklist at enrollment, fail closed on unavailable required validation (local list permitted); sign-in does not reapply enrollment eligibility/current blocklist. No mixtures/routine rotation; support managers/autofill/paste. Salted expensive full-password one-way KDF/hash with algorithm/cost metadata, benchmarked cost, upgrades/migration; no algorithm/library selection. Authentication operations own normalization outside wire schema transforms. No password/hash leakage; generic failures/integrity/abuse/no-store preserved. Compromise needs safe response without recovery bypass; general recovery stays excluded. Exact catalog/schema expression and later crypto/storage verification retain owners. Design requirements only, no implemented/tested security claim.

### 2026-10-24 — Q9–Q11 explicitly approved by the user

- Q9: mandatory `X-Expected-Revision` on task/project DELETE and additional `X-Expected-Deletion-Revision` on project DELETE; no JSON DELETE body. PATCH keeps body expected revision. Validate header presence/syntax/representation before resource-specific deletion; malformed preconditions fail validation regardless of existence. Owned stale preconditions produce structured `409`; valid missing/foreign and successful owned cascade return indistinguishable bodyless `204`. Preserve authentication, request-integrity and service distinctions.
- Q10: approved matrix: initial commit `201`; matching completed original/recovery request `200` with immutable historical outcome; authoritatively known running execution `202` with `state: "in-progress"`; available-evidence payload mismatch `409 IDEMPOTENCY_PAYLOAD_MISMATCH`; expired consumed or absent dedicated-recovery evidence `409 CREATION_OUTCOME_UNAVAILABLE`; unreliable evidence lookup gives safe explicit service failure. Completed bodies include `state`, `evidence: "original-creation"`, `resource`, `completedAt`, `retainedUntil`. Expiry is server time >= retention deadline, with permanent consumed marker. No historical overwrite, automatic polling/retry/recreation, or fabricated execution certainty. Final schemas/headers/envelopes remain catalog work.
- Q11: reservations are transient; keys are consumed only by actual atomic creation/outcome commit. Definite structural/canonical/domain rejection does not consume keys. Safe release requires proof no commit occurred and no earlier executor can still commit. Timeout/lost response/interrupted worker/lease expiry/missing evidence alone never permits release, takeover, restart or creation. Preserve safe protection until authoritative reconciliation and gap-free concurrency transitions. Deliberate corrected resubmission follows definite rejection/safe release only. Dedicated recovery never starts/restarts/completes creation, and absent evidence proves no safe reuse.

User explicitly approved contract/backend consistency guarantees only, without selecting infrastructure or claiming implementation acceptance, and instructed that this ticket remain open for Authentication and remaining HTTP decisions.

### 2026-10-24 — Q1–Q5 explicitly approved by the user

- Q1: `/api` base; coherent authenticated account-scoped `GET /api/workspace` returns complete `{ projects, tasks }`; POST task/project collections, PATCH/DELETE task/project IDs; GET/PATCH current `/api/profile`. No separate collection/summary/filter/sort/pagination endpoints. Registered email is read-only and identity immutable. Authentication/activity routes remain to decide.
- Q2: opaque server-issued resource `revision`; required `expectedRevision` alongside update fields. Reject updates without editable fields. Atomically check revisions even for canonical no-ops; matching no-ops retain revision and `updatedAt`; value-changing updates advance revision and return authoritative canonical data. Profile revision remains independent. Preserve strict requests, normalization, omission/null, concealment and safe errors; exact DTO expression belongs to schemas.
- Q3: owned task/project deletion requires current expected revision; stale owned resource conflicts for deliberate review. Well-formed missing/foreign IDs receive indistinguishable confirmed absence without foreign modification; malformed/auth/service failures remain explicit. Preserve atomic cascade/commit-time consistency. Membership-sensitive project deletion is explicitly unsettled.
- Q4: required `Idempotency-Key`, scoped by authenticated account and creation operation. Compare original structurally validated values independent of JSON key order; text whitespace differences count, even when canonical results would match. Retain authoritative completed outcome for seven days after completion with atomic concurrent creation/outcome guarantees. Recovery cannot resurrect, overwrite edits or repeat effects; authenticate/authorize each attempt. Expired/unavailable evidence never establishes safe recreation. Key format, in-progress, replay, conflicts, retention edges and unavailable-record recovery remain to decide.
- Q5: email/password authentication with opaque server-managed cookie sessions. Registration email only; verified owner supplies display name/password during restricted enrollment. No provisional credentials/profile/context from unverified registrants. Activation never signs in automatically. Server identity/revocation, 30-minute inactivity, 24-hour absolute expiry, per-session sign-out and isolation remain required. Protected HttpOnly/Secure cookies, deliberate SameSite/scope and effective CSRF/request integrity; no reusable session secrets in localStorage. Password/storage rules, precise transport, errors, rate limits, touch and sensitive responses remain to decide. No hashing library/store/ORM/database/auth framework/email provider selected.

User explicitly states these are contract-design approvals, not implemented/security-tested API evidence. Ticket remains claimed and unresolved. New research prerequisite: [Research password and cookie-session contract security](18-password-cookie-security-evidence.md); it supplies facts for remaining decisions, not approval.


### 2026-10-24 — Q6–Q8 explicitly approved by the user

**Q6–Q8 — Approved (yes to all), with the following contract and consistency clarifications.**

**Q6 — Project deletion preconditions: Approved.**

Expose two independent opaque revisions for each project:

- `revision` represents the project's own canonical editable fields.
- `deletionRevision` represents the project and the current state and membership of its associated tasks.

Advance `deletionRevision` whenever a committed operation meaningfully changes the project's editable values or creates, edits, deletes, or reassigns a task into or out of that project.

A task move between two projects must invalidate the deletion revision of both affected projects. A move between a project and standalone status invalidates the affected project's deletion revision.

Canonical no-op updates and idempotency-result replays must not advance either revision. A child-task change must not advance the project's ordinary `revision`.

Require both `expectedRevision` and `expectedDeletionRevision` when deleting an existing owned project. Atomically validate both preconditions and execute the account-scoped deletion/cascade as one consistent operation.

If either revision is stale, return a structured conflict. Preserve the user's deletion context and require a fresh coherent Workspace read and deliberate reconfirmation. Never silently delete tasks that appeared or changed after the user's earlier review.

Maintain the previously approved indistinguishable confirmed-absence semantics for well-formed missing or foreign resource IDs. Do not reveal foreign resource existence. Invalid request syntax, authentication failures and service failures retain their appropriate distinct outcomes.

The Endpoint Catalog and shared schemas must define the exact revision fields, precondition placement, conflict payloads and deletion responses. Do not select a particular database, locking strategy or transaction implementation here.

**Q7 — Dedicated creation recovery: Approved.**

Define:

- `POST /api/tasks/creation-recovery`
- `POST /api/projects/creation-recovery`

Both operations require authentication, the original `Idempotency-Key` and the exact original creation payload.

These endpoints are strictly read/recovery operations in domain effect: they must never create a task or project, replay creation side effects, restore deleted resources or overwrite subsequent edits.

For a matching completed submission within full-outcome retention, return its recorded original authoritative creation outcome, original completion timestamp and outcome-retention deadline, explicitly labeled as historical/original creation evidence.

That historical response may describe a resource that has since been updated or deleted. Frontend consumers must not install its historical resource representation over current authoritative Workspace state. Use a fresh coherent Workspace read to determine the resource's present state.

For a matching in-progress submission, provide a defined pending outcome without creating or reissuing the operation. For a different original payload using the same scoped key, provide a defined conflict while equivalence evidence remains available.

If the full outcome is expired or unavailable, return an explicit unavailable-recovery result. Do not infer success, failure or permission to recreate the resource.

Apply original authenticated-account and creation-operation scoping to every lookup. Do not expose another account's submissions or distinguish foreign submission existence through recovery responses.

Retain the previously approved distinction between definite rejection, recorded success, pending execution and uncertain completion. Specify concrete HTTP statuses and response/error schemas in this catalog.

**Q8 — Idempotency key format and lifetime: Approved.**

Require every task/project creation submission to use an `Idempotency-Key` consisting of exactly 32 lowercase hexadecimal characters, representing 16 cryptographically random bytes generated by the client.

Validate the exact format server-side. The key is a logical-submission identifier, not an authentication credential. Authenticate and authorize all creation and recovery requests independently.

Scope key uniqueness and consumption by authenticated account and creation operation.

Retain the complete original creation outcome, its original-input equivalence evidence and completion metadata for seven days after completion.

Once creation commits, the scoped key must remain permanently non-reusable for the lifetime of that account, even after the seven-day full-outcome retention period expires.

After full-outcome expiry, retain only the minimal consumed-key evidence needed to prevent reuse. Do not retain full resource snapshots or unnecessary personal information indefinitely.

A previously consumed key whose full outcome has expired must never authorize new creation. Return a stable explicit unavailable-outcome conflict instead.

If only the minimal consumed-key marker remains, do not pretend to know whether a submitted recovery payload matches the historical original input; report unavailable original outcome rather than fabricating a payload-mismatch determination.

Ensure the transition from full outcome retention to minimal consumed-key evidence is atomic or otherwise gap-free. Concurrent requests and retention cleanup must never create a window where a previously committed key appears unused.

The resource creation, original outcome recording and key consumption must preserve the approved atomic consistency guarantee. An unfinished operation must not be incorrectly treated as a completed creation merely because its key was reserved.

The seven-day full-outcome window and account-lifetime consumed-key retention are deliberate MVP product decisions. Account deletion remains outside MVP; future account-data lifecycle policies must explicitly cover these markers.

Do not choose a storage engine, ORM, background-job system or cache implementation at this stage.

These approvals define contract and domain guarantees, not implementation acceptance.


### 2026-10-24 — Q14–Q16 explicitly approved by the user

- Q14: server-bound CSRF bootstrap at GET `/api/auth/csrf`, no-store; anonymous protected cookie/context fixed 30 minutes, no account/enrollment/profile/Workspace authority. Every POST/PATCH/DELETE requires operation-appropriate bound token and exact configured HTTPS Origin (absent/null/malformed/foreign rejected), JSON media type where body required. Anonymous proof cannot authorize other contexts. Integrity failure is `403 REQUEST_INTEGRITY_FAILED`, no business execution. Tokens memory-only, no URLs/logs/persistence/unrelated destinations; no credentialed cross-origin. Repeat bootstrap reuses valid token without extending deadlines, replacing/downgrading auth or needless rotation. Authority transitions invalidate relevant prior context/token; sign-in creates fresh session, not promotion. No automatic replay after CSRF rejection; earlier uncertainty remains. GET/HEAD no business mutation; bootstrap security context only. Exact enrollment binding remains downstream. SameSite is defense in depth; enforcement must be demonstrated.
- Q15: ASCII ordinary unquoted single mailbox including eligible ASCII punycode; reject wrappers/comments/literals/multiple/malformed/embedded whitespace/unsafe controls. Explicit permitted surrounding ASCII whitespace only; CR/LF/header injection cannot be accepted as formatting. Preserve local part case/dots/+ tags, lowercase domain for identity/storage/presentation; same rules across registration/resend/verification/enrollment/sign-in and atomic canonical uniqueness. No provider equivalence/merging or verification bypass. Case-distinct identities may share a mailbox by deliberate policy. Well-tested parser/validator at implementation; international local/Unicode-domain input requires future approval. Generic acknowledgements/ownership proof/activation/anti-enumeration remain.
- Q16: seven-day pending issuance eligibility from original acceptance, never extended by repeated requests. Before expiry reuse eligible pending account; at/after expiry issue no further proofs. Honor all previously issued proofs/enrollment authority to their original deadlines, including post-cutoff redemption issuing 15-minute enrollment and activation within its deadline. Retire only without valid authority or already-admitted possible activation. Atomic retirement/verification/enrollment/new registration prevents active retirement, lost in-flight activation, duplicate canonical identities and untrusted resurrection. Fresh pending account only after safe retirement, entirely fresh authority. No public disclosure of eligibility/expiry/retirement. Product retention policy only; no storage/scheduler/provider/lifecycle mechanism. Exact transport/states/errors remain catalog/schema work. Approved design only, implementation/runtime acceptance pending.


### 2026-10-24 — Q17–Q19 explicitly approved by the user

- Q17: fragment proof captured in memory and immediately history-removed before unrelated behavior; GET/HEAD/hydration/prefetch safe. Explicit confirmation POST with token+proper CSRF/Origin, atomic proof/enrollment authority; protected enrollment cookie. Explicit displayName/password completion with enrollment CSRF atomically consumes authority/establishes auth/activates/clears cookie, never normal sign-in. Independent purpose-bound canonical 43-character unpadded base64url encodings of random 32-byte credentials for all proof/enrollment/session/anonymous/CSRF values; protect server representations/no leakage. Exact anonymous/enrollment cookie attributes and no issuance persistence as catalog. Verification page no-referrer/no-store/no third parties. No API-URL/persistent secrets. Authority CSRF rotation and lost-response uncertainty/fresh-proof recovery required; successful enrollment leaves safe explicit sign-in path. Exact observation semantics unresolved.
- Q18: valid auth blocks lifecycle account replacement with `409 AUTH_CONTEXT_CONFLICT` before consumption/mutation/replacement, requires explicit sign-out/other context. Valid enrollment cannot switch pending accounts/normal session, except same-pending-account fresh proof replacement. Explicit protected enrollment exit required; no implicit page-triggered discard. Invalid contexts may clear/bootstrap anon; never downgrade valid auth. Deterministic multi-cookie selection required without lower authority override, accidental precedence or unrelated-existence leaks.
- Q19: exact `{}` activity POST route, session CSRF/Origin, sole post-login inactivity extension. All other reads/writes/bootstrap/lookup/automatic/replay traffic does not extend. Meaningful foreground signals coalesced <=1 request/60s/browser context; server extension <=1/60s/session; extra valid touches unchanged deadlines. No periodic passive keepalive/client-time authority/expiry revival/absolute deadline reset. Return server deadlines; no resource/profile revision changes. Signal is not human-presence proof. Exact envelopes/errors/transition details remain catalog/schema decisions. No infrastructure/crypto storage/library approval or implementation/security acceptance.


### 2026-10-24 — Q20–Q22 explicitly approved by the user

- Q20: all Authentication paths, strict request shapes and success statuses in the working catalog table explicitly approved, including same generic `202` registration/resend; enrollment confirmation/observation metadata; `200` activation with explicit sign-in; bodyless `204` leave/sign-out; authenticated envelope containing canonical account/profile revision and server inactivity/absolute deadlines. Session lookup `200` unauthenticated only on reliable absence/invalidity/expiry/revocation; service uncertainty remains error. Session/enrollment observation never renews, issues authority, transitions business or auto-recovers. Existing CSRF/Origin/transport/no-store/canonicalization/security requirements preserved. Remaining detailed errors still owned here.
- Q21: bootstrap validates purposes/bindings/expiry/revocation and explicitly selects valid auth > enrollment > anonymous > fresh anonymous, returning context-bound token. Service uncertainty blocks fallback; reject duplicate same-name security cookies; safely clear invalid/revoked/expired. No cookie-order/presence authority; no implicit downgrade, deadline renewal, lifecycle transition or lower-enrollment revocation when auth exists. Higher context does not authorize lower operations. Existing conflict rules/same-pending recovery hold. Later context change requires deliberate observation/proof; no business replay permission inferred.
- Q22: protected leave revokes current enrollment/token only, clears cookie, `204`; no pending retirement/deletion/activation, independent-proof revocation, auth replacement or session. Explicit later bootstrap may create anonymous. Lost verification: observe, continue valid enrollment; absence proves no failure; pending fresh proof recovery honors seven-day cutoff and valid proofs' own deadlines; no automatic consumed-proof replay. Lost completion: deliberate sign-in, failure proves no prior failure, no automatic replay/recreation/active reopening. Lost exit: deliberate authority observation; existing context explicit resolve/retry, reliable absence permits anon workflow, failed lookup proves no revocation. Preserve state distinctions/no automatic uncertain authority retries. Design/trust boundaries only, no runtime security acceptance.


### 2026-10-24 — Q23–Q25 explicitly approved by the user

- Q23: uniform safe `{ error: { code, message, fieldErrors? } }`, path roots body/headers/path/query then strings/indices; exact proposed HTTP/code matrix approved and transcribed in working catalog. Integrity remains 403, privacy/confirmed absence retained. No secrets/internal details/current conflict snapshots/replacement revisions. Validated authoritative rejection must prove noncommit for definite failure; 500/503, invalid envelopes and transport failure after dispatch preserve uncertainty. Historical-outcome unavailability proves no original failure.
- Q24: exact cumulative rolling budgets approved in working catalog (IP all 600/min; session 300/min; anonymous issuance 30/min/IP; registration/resend20/h/IP and1/min5/h20/d/email; sign-in30/15m/IP10/15m/email; verification60/15m/IP10/15m/context; enrollment10/15m/authority). Atomic accounting; address equivalence across existence states, success no reset. Email suppression/cap remain generic202 with no revealing retry info or new issuance. Observable throttles429+Retry-After, bounded expiry/no permanent lockout, trusted IP derivation. Fail safely if critical protection unavailable; demonstrate during implementation. Initial product values require load/security/abuse/usability and victim-budget DoS evaluation. Existing activity/pending/proof limits retained, no technology chosen.
- Q25: exact ID/revision grammar, key/credential encoding, single-valued headers with proxy ambiguity/duplicates rejected, no unknown query, malformed UTF8/JSON/ambiguous encoding/duplicate members at any level rejected before evidence loss. Effective body262144-byte preparse cap cannot be bypassed by transfer/decompression. JSON media enforcement; email only surrounding U+0020 trimmed, no control formatting, canonical254/local64 valid DNS/punycode, no MX canonicalization. Password malformed Unicode/Cc rejected and existing NFC/length/noalteration rules retained. Raw->normalization->canonical->protected domain pipeline, no premature raw title/name limits. Trace catalog/schema/OpenAPI/tests; runtime-only rules explicit. Design only, no infrastructure/runtime acceptance.


### 2026-10-24 — Q26–Q28 approved; consolidated review requested

- Q26: exact success representations, context enum/metadata and generic acknowledgement approved; all timestamp instants UTC with three fractional digits. All API responses/errors/HEAD/204 no-store. JSON UTF8/application-json;204 no body/JSON Content-Type. No Location/new individual GET.401 challenge `TaskFlow realm="TaskFlow"` describes existing cookie/JSON only. No new Project/Profile timestamps; no-op timestamp retention only where fields exist.
- Q27: approved observable ingress->authoritative context->Origin/CSRF->provable context conflict->remaining raw/normalization/canonical->protected atomic domain pipeline. Required missing authority wins over absent CSRF; valid authority badCSRF before business conflicts. DELETE syntax before lookup, PATCH existence/ownership before revisions/relations. Creation exception consults scoped evidence after auth/integrity/structure before current domain; preserve historical recovery despite deletions/changes, safe-new-execution only after evidence/reservation guarantees. Different-account proof-binding conflict never consumes/exposes proof. Sign-in structural/Unicode/Cc/NFC rules but no separate enrollment length/blocklist eligibility outcome: valid failing candidate generic401, malformed types/Unicode/control400. Generic failures/invalid responses/transport loss retain uncertainty.
- Q28: GET/HEAD/DELETE no bodies, POST/PATCH declared strict object including{}, unknownqueries rejected. HEAD allGET equivalent metadata/status no body/business/activity; bootstrap security-only exception, no token header.405+accurateAllow;404ENDPOINT_NOT_FOUND noresource lookup. No credentialedcrossoriginOPTIONS/CORS. Reserve creation-recovery from generated Task/Project IDs/static routes cannot be resources. Existing safe errors/no-store/strictness/privacy/context remain.

User explicitly states proposed transport choices are approved and requests consolidation of all Q1–Q28/clarifications, downstream ownership and reproducible scenarios for final shared-understanding review. User explicitly prohibits resolving this decision until that consolidated specification is reviewed and confirmed. Status remains claimed; no Answer/resolution or map decision index entry is added. The consolidated [MVP Endpoint Catalog](../design/endpoint-catalog.md) is the review artifact, not implementation/security acceptance.


### 2026-10-24 — Consolidated specification preflight and review handoff

Consolidated [MVP Endpoint Catalog](../design/endpoint-catalog.md) now contains Q1–Q28/clarifications as a coherent specification, 22 explicit operations plus five GET-derived HEAD operations, exact success/error/header/context/retention contracts, downstream ownership, a complete Q1–Q28 traceability index and 34 reproducible evaluation checkpoints. The user's first action is the final shared-understanding review described in its Section13. No claim of consolidated confirmation yet.

Actual preflight: baseline HEAD `effe5da18639491c6130438e1a92e46665852dd4`; read map/tracker/domain/glossary/prerequisite designs/downstream scopes and current resource types. Verified no invented Project/Profile audit fields. A read-only independent consistency audit covered approval history/prerequisites, endpoint counts, payload/envelope/metadata, context/CSRF boundaries, concurrency, retention and uncertainty. It found two wording ambiguities: missing-lower-authority versus conflicting-valid-higher-authority precedence, and new-proof issuance eligibility versus previously-issued proof redemption after the cutoff. Both were clarified without changing approved policy; follow-up review reported no remaining material discrepancy. Context validity/conflict/invalidation at the authoritative transition boundary explicitly preserves existing concurrency guarantees.

Documentary checks passed: 22 unique explicit operations and five GET/HEAD counterparts; Q1–Q28 traceability complete; E1–E34 checkpoints complete; 13 catalog local-link targets exist; prerequisites resolved; owning ticket claimed/no Answer; no premature catalog decision index in map; obsolete partial-draft claims removed. `git diff --check` passed. The catalog's source-backed research is evidence only. No application/dependency/configuration changes, builds, application tests, real email, runtime API/browser/security tests or human implementation evaluation were performed.

User explicitly requested this review before resolution. Leave Status claimed, dependencies and map decision index unchanged until the user confirms the consolidated specification. Automated documentary checks/independent review/guide readiness do not substitute for that design confirmation or later runtime/human implementation acceptance. Next planning action after confirmation would be resolving this decision and handing its requirements to the existing shared-schema decision, not implementing an API or resolving another non-research ticket in this session.


## Answer

Resolved on 2026-10-24 after explicit final shared-understanding confirmation of the complete [MVP Endpoint Catalog](../design/endpoint-catalog.md), all Q1–Q28 decisions and clarifications, Sections 3 and 5–9, E1–E34, approval traceability and downstream ownership. The user found no material discrepancies and required no revisions.

### Explicit final confirmation and scope

The user stated: “I explicitly confirm that the complete `endpoint-catalog.md` accurately reflects our shared understanding and all approved Q1–Q28 decisions and clarifications.” They confirmed the 22 explicit operations/five HEAD counterparts and all Workspace/revision/idempotency/recovery/authentication/enrollment/session/CSRF/HTTP/error/input/abuse requirements, and stated: “No material discrepancies were found. No revisions are required.”

The controlling instruction authorizes only this resolution, recording confirmation, map/existing downstream-reference updates, documentation checks and a final report, then stop. No claim, start or work on any subsequent decision and no commit/push is authorized. Subsequent ticket lifecycle states remain unchanged.

### Approved outcome, retained behavior and preparation

The approved catalog fixes 22 explicit operations and five HEAD counterparts, coherent complete account-scoped Workspace reads, independent revisions and membership-sensitive deletion, atomic cascade and concurrency-safe creation/recovery with seven-day immutable full outcomes and account-lifetime minimal consumed-key markers. It fixes same-origin protected-cookie email/password authentication, distinct proof/enrollment/session/CSRF authority, enrollment/activation/activity boundaries, safe HTTP/error/validation/precedence/input contracts and cumulative abuse budgets. Preserve resource inventory, canonicalization, omission/null, standalone Tasks, ownership/privacy, read-only email/immutable account identity, drafts/completion/uncertainty and local independence. Later explicit catalog choices refine earlier detail/mechanism deferrals; no new Project/Profile audit fields are added.

Documentation/contract-only result: no production package, application/dependency/configuration change, universal refactor or backend technology selection is required. Capability activation later requires applicable isolation, validation, security, atomicity, compatibility and evidence obligations. Connected failure never silently switches to local/demo authority.

### Deferred owners and verification

Existing shared-schema, OpenAPI, evidence-strategy and readiness-disposition decisions retain their named responsibilities. Color/icon constraints, schema/export/path/code inventory and Profile identity-field naming remain with shared-schema design; crypto/storage/deployment/enforcement technology remains separate implementation planning. References are propagated without starting those decisions. Preserve all E1–E34 and prerequisite feature checkpoints. Email changes, password/account recovery, collaboration, offline sync and transition-data migration remain outside approved MVP scope.

The user’s approval establishes design/contracts only. Implementation, runtime/security verification and human implementation acceptance remain pending actual evidence and observations. Prior independent consistency review and reproducible documentary preflight are recorded above; final resolution checks follow below. No further architectural action is authorized in this session.


### Final resolution consistency checks — 2026-10-24

Passed: resolved status and single Answer/final confirmation; approved catalog; exactly one map decision pointer; resolved prerequisites; 22 explicit operations/five HEAD counterparts; Q1–Q28 and E1–E34 complete; 104 existing local link targets; four existing downstream references updated. All 17 other ticket statuses and assignees were compared with their pre-action values and remain unchanged. Documentation whitespace check passed. No subsequent ticket was claimed, opened for decision work, started or resolved in this scope-limited action. No commit/push, application/build/test or runtime/security operation was performed. This completes the authorized resolution-only scope; stop after reporting. Implementation/runtime/security/human implementation acceptance remain pending.
