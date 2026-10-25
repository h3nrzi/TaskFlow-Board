# MVP Endpoint Catalog

Decision owner: [Design the MVP Endpoint Catalog](../issues/12-endpoint-catalog.md).

Status: **approved on 2026-10-24**. The user explicitly confirmed the complete consolidated specification, all Q1–Q28 decisions and clarifications, Sections 3 and 5–9, all 34 evaluation checkpoints, approval traceability and downstream ownership. No material discrepancies were found and no revisions were required. The user authorized resolution of the owning decision only. Implementation, runtime/security verification and human implementation acceptance remain pending.

## 1. Scope, authority and controlling requirements

The MVP browser-facing base path is `/api`, on the same production HTTPS origin as the frontend. Connected development and evaluation must support the approved secure cookies. Cross-origin integration requires explicit design revision. No credentialed cross-origin CORS/OPTIONS grant is introduced.

Apply the approved [API Architecture Blueprint](api-architecture-blueprint.md), [frontend-facing contract](frontend-facing-contract.md), [asynchronous operation policy](async-operation-policy.md), [validation policy](validation-policy.md), [account email scope](account-email-scope.md) and [schema tooling specification](shared-schema-tooling.md). Their requirements and evaluation checkpoints remain binding. The [security evidence](password-cookie-security-evidence.md) supplies facts, not policy approval. The latest explicit approvals and clarifications govern over historical deferrals in earlier discussions.

Account/Profile owns canonical immutable account identity and presentation; Authentication coordinates proof, enrollment, credentials and sessions; Workspace owns account-scoped tasks/projects, relationships, coherent reads, revisions, cascade and creation idempotency. Trusted server context establishes authority. Client account IDs, demo profile, display names, registered email and free-text assignees cannot grant access.

Retain one logical workspace and deliberate module-by-module activation. Authentication/account core may connect while tasks/projects remain local; editable Profile integration may follow. Projects/tasks/cascade share one authority. Theme remains local. Connected failures never fall back to local/demo data or authentication, and local snapshots never overwrite connected account authority. This document changes no application behavior or storage.

Out of scope: email changes, password/account recovery, third-party identity providers, account deletion, global sign-out, collaboration, transition-data migration, offline synchronization, implementation tickets and production implementation. Future account-data lifecycle policy must cover consumed-key markers. No database, ORM, cache, queue, worker/locking/transaction mechanism, reverse proxy, deployment topology, authentication framework, cryptographic algorithm/library, session store, validator beyond approved schema tooling, email provider or rate-limit technology is selected.

## 2. Resource and payload vocabulary

`Task`, `Project` and `Profile` below designate the canonical resource schemas that [Specify the shared Schema-First contracts](../issues/13-shared-schema-contracts.md) must express. Schema export names, exact DTO definitions, Profile identity-field naming, color/icon constraints and declarative/runtime composition remain that decision's responsibilities; they cannot revise this catalog's policies or add product fields independently.

| Resource | Binding semantic inventory |
| --- | --- |
| Task | Server-owned `id`; `title`, `description`, `status`, `priority`, `projectId`, `dueDate`, `assignee`; server-owned `createdAt`, `updatedAt`, `revision` |
| Project | Server-owned `id`; `name`, `description`, `color`, `icon`; server-owned `createdAt`, `revision`, `deletionRevision` |
| Profile | Immutable account ID, canonical read-only registered email, editable display name, independent opaque `revision`; avatar initials are derived |

Project and Profile gain no audit timestamps for symmetry. Preserve existing applicable metadata only. Resource IDs/revisions are opaque case-sensitive ASCII strings matching `^[A-Za-z0-9_-]{1,128}$`; no generation algorithm is selected. Do not issue `creation-recovery` as a task/project ID; static recovery paths take precedence over parameterized paths.

### Request shapes

| Payload | Required and permitted contents |
| --- | --- |
| TaskCreate | All seven fields: `title: string`, `description: string`, `status: "todo" | "in-progress" | "done"`, `priority: "low" | "medium" | "high" | "urgent"`, `projectId: ResourceId | null`, `dueDate: CalendarDate | null`, `assignee: string | null` |
| ProjectCreate | All four fields: `name: string`, `description: string`, `color: string`, `icon: string`; exact approved color/icon schema constraints owned by shared schemas |
| TaskPatch | Required `expectedRevision`; at least one of the seven Task editable fields; no other fields |
| ProjectPatch | Required `expectedRevision`; at least one of the four Project editable fields; no other fields |
| ProfilePatch | Required `expectedRevision` and editable `displayName`; no identity/email fields |
| Creation recovery | Exact original TaskCreate or ProjectCreate body and original `Idempotency-Key` header, not a newly canonicalized reconstruction |
| Registration / resend | Exactly `{ email: string }` |
| Verification confirmation | Exactly `{ token: VerificationProof }` |
| Enrollment completion | Exactly `{ displayName: string, password: string }` |
| Sign-in | Exactly `{ email: string, password: string }` |
| Enrollment leave / sign-out / activity | Exactly `{}` |

Creates require every editable field; server defaults cannot fill missing input. PATCH omission preserves a value. Explicit null clears only nullable task project assignment, due date and assignee. Empty description is `""`, not null. Server-owned fields are never editable; Profile email/account-ID attempts fail strict validation.

Due dates are real calendar dates `YYYY-MM-DD`, with no timezone conversion. Timestamp instants, including all authentication/retention deadlines, are canonical UTC ISO 8601 with exactly three fractional digits. Empty optional Task values are explicit nulls. Duplicate task titles/project names and every transition among the three Task statuses are allowed. Assignee is optional free text, not account-linked assignment.

### Explicit normalization and canonical limits

Trim Task titles, Project names, display names and non-null assignee labels explicitly outside wire schemas; require nonblank canonical names/titles/display names and nonblank non-null assignees. Preserve description whitespace/newlines exactly. Count Unicode code points, not UTF-16 units, bytes or grapheme clusters.

| Canonical field | Maximum code points |
| --- | ---: |
| Task title | 200 |
| Project name | 120 |
| Display name | 100 |
| Non-null assignee | 120 |
| Task/Project description | 10,000 |

Shared wire schemas never implicitly transform, coerce, default or repair. Raw shape/lexical validation precedes explicit normalization and canonical validation; do not reject a valid post-trim title/name merely because surrounding whitespace increases raw length. The independent body-size limit still applies.

## 3. Complete endpoint inventory

`A` means valid authenticated active-account session; `E` valid restricted enrollment authority; `N` valid anonymous security context. Every POST/PATCH/DELETE also requires exact Origin and operation-appropriate CSRF. These labels are documentation shorthand, not new wire values. Section 8 defines deterministic context/conflict handling; higher context never silently authorizes a lower-context operation.

### Workspace and Profile

| Method / path | Authority; request | Success |
| --- | --- | --- |
| GET `/api/workspace` | A; no body/query | `200 { projects: Project[], tasks: Task[] }` |
| POST `/api/tasks` | A; TaskCreate; Idempotency-Key | `201` new creation; `200` matching completed replay; `202` known in-progress; Section 6 |
| PATCH `/api/tasks/{id}` | A; TaskPatch | `200 Task` |
| DELETE `/api/tasks/{id}` | A; X-Expected-Revision; no body | `204`, owned deletion or concealed confirmed absence |
| POST `/api/projects` | A; ProjectCreate; Idempotency-Key | Same creation matrix |
| PATCH `/api/projects/{id}` | A; ProjectPatch | `200 Project` |
| DELETE `/api/projects/{id}` | A; both deletion headers; no body | `204`, atomic cascade or concealed confirmed absence |
| POST `/api/tasks/creation-recovery` | A; original TaskCreate and key | `200` original outcome / `202` known in-progress / approved errors; never creates |
| POST `/api/projects/creation-recovery` | A; original ProjectCreate and key | Same recovery matrix; never creates |
| GET `/api/profile` | A; no body/query | `200 Profile`, direct authoritative resource |
| PATCH `/api/profile` | A; ProfilePatch | `200 Profile`, direct authoritative resource |

Workspace GET returns one coherent account-scoped logical snapshot of complete collections; every task references a Project in that snapshot or `projectId: null`. Empty arrays succeed. No pagination, truncation, server filtering/sorting or ordering guarantee. Filtering/presentation sorting remain frontend-owned. No separate collection, summary or individual-resource GET endpoints are added. Coherence applies to that logical read, not permanent consistency across later operations.

### Authentication and security context

| Method / path | Authority; request | Success |
| --- | --- | --- |
| GET `/api/auth/csrf` | Context resolution/bootstrap; no body/query | `200 { context, csrfToken }` |
| POST `/api/auth/registrations` | N; `{ email }` | Generic `202` acknowledgement |
| POST `/api/auth/verification/resend` | N; `{ email }` | Identical generic `202` acknowledgement |
| POST `/api/auth/verification/confirm` | N, or E for same pending-account fresh proof; `{ token }` | `200` enrollment metadata; sets restricted cookie |
| GET `/api/auth/enrollment` | E; no body/query | `200` current enrollment metadata; observation only |
| POST `/api/auth/enrollment/complete` | E; `{ displayName, password }` | `200 { state: "activated", next: "sign-in" }`; consumes authority/clears cookie |
| POST `/api/auth/enrollment/leave` | E; `{}` | `204` after restricted-authority revocation |
| POST `/api/auth/sign-in` | N; `{ email, password }` | `200` authenticated envelope; fresh session cookie |
| GET `/api/auth/session` | Presented context inspection; no body/query | `200` authenticated envelope or reliably established `{ state: "unauthenticated" }` |
| POST `/api/auth/sign-out` | A; `{}` | `204` after initiating-session revocation |
| POST `/api/auth/session/activity` | A; exact `{}` | `200` authenticated envelope with authoritative deadlines |

Success representations:

```text
Accepted = { state: "accepted", message: "If this request is eligible, check your email." }
Enrollment = { state: "enrollment-required", email, enrollmentExpiresAt }
Authenticated = {
  state: "authenticated",
  account: Profile,
  session: { inactivityExpiresAt, absoluteExpiresAt }
}
CsrfBootstrap = { context: "anonymous" | "enrollment" | "authenticated", csrfToken }
CreationPending = { state: "in-progress" }
CreationCompleted = {
  state: "completed", evidence: "original-creation",
  resource: Task | Project, completedAt, retainedUntil
}
```

Each creation/recovery endpoint binds `resource` to its own resource type, not arbitrary Task/Project interchange. Sign-in/session/activity use the same approved account/Profile contract and independent revision. No endpoint exposes a session/enrollment credential in JSON. CSRF values are intentionally returned only through the declared JSON context flow, not response headers.

Session lookup returns unauthenticated only after reliably determining missing/expired/revoked/invalid authenticated authority. Failed lookup is a service error, never inferred logout. Session/enrollment observations never renew deadlines, issue authentication/enrollment credentials, activate accounts or automatically recover. CSRF bootstrap has only its expressly permitted security-context behavior.

## 4. Updates, revisions and deletion

Task/Project/Profile responses include server-issued opaque `revision`. Valid authorized PATCH atomically compares required `expectedRevision` even for a canonical no-op. Matching no-op returns current authoritative resource without advancing revision or applicable `updatedAt`; value-changing updates advance revision and return canonical resource. Empty PATCH, including revision-only payload, fails structural validation. Profile revision is independent of Workspace, session activity and unrelated authentication lifecycle changes.

Project `revision` represents its own canonical editable fields. Independent `deletionRevision` represents that Project plus current state/membership of associated tasks. Meaningful Project edits and child creation/edit/deletion/reassignment advance deletionRevision. Moves between projects invalidate both projects; moves to/from standalone invalidate the affected project. Child changes do not advance ordinary Project revision. Canonical no-ops and idempotency-result replays advance neither. Parent deletion-revision changes need not invent Project audit timestamps.

DELETE has no JSON body. Require exactly one syntactically valid `X-Expected-Revision`; Project DELETE additionally requires `X-Expected-Deletion-Revision`. Validate presence/syntax before resource-specific lookup. Invalid preconditions produce structural validation failure whether target exists or not, subject to prior authority/integrity/ingress failures.

Owned Task deletion atomically checks its revision. Owned Project deletion atomically checks both revisions and applies its account-scoped cascade. Stale values yield `409 STALE_PRECONDITION`, no snapshots/replacement revisions; retain deletion context and require fresh coherent Workspace review and deliberate reconfirmation. Never silently delete tasks that appeared/changed after earlier review.

Well-formed missing/foreign IDs with syntactically valid preconditions return indistinguishable `204`; never modify foreign resources or reveal existence. Authentication/integrity/malformed/service failures stay explicit. Reads/updates conceal missing/foreign resources as `404 RESOURCE_NOT_FOUND`. Unavailable Project assignments use `422 PROJECT_UNAVAILABLE` for both missing and inaccessible projects.

Project cascade and Task mutations must be equivalent to valid serial committed operations: a task moved out before deletion survives; moved in before deletion participates; after deletion, creation/reassignment into the deleted project fails safely. Ownership, relationship and revision guarantees hold at commit, not merely earlier form/server reads. No partial cascade/orphans/cross-account effects.

## 5. Input, HTTP metadata and observable failure precedence

### Input and methods

- No query parameters; unknown queries fail. Strict object fields apply, including nested structures where applicable.
- GET/HEAD/DELETE prohibit request content: `400 REQUEST_VALIDATION_FAILED`, subject to earlier framing/security failures. Every POST/PATCH requires its declared JSON object, including exact `{}`.
- Reject malformed UTF-8/JSON/ambiguous encoding and duplicate JSON object-member names at every nesting level before ordinary parsing loses evidence. No first/last-wins interpretation.
- Effective JSON body maximum is 262,144 bytes (256 KiB), enforced before application parsing; transfer/decompression cannot bypass it. Oversize is `413`, never truncation. Required JSON bodies use `Content-Type: application/json`; unsupported media types return `415`.
- Security-sensitive/precondition headers must have one unambiguous value; reject duplicate/conflicting/comma-joined alternatives, including proxy-normalized ambiguity. Duplicate same-name security cookies are rejected before business execution.
- HEAD is supported for every listed GET with corresponding status/applicable headers and no body. No business transition/activity extension. HEAD bootstrap may establish only the approved anonymous security context, never expose a token in a header; GET is required to read the token.
- Known-route unsupported methods return `405 METHOD_NOT_ALLOWED` with accurate Allow. Unknown API paths return `404 ENDPOINT_NOT_FOUND` without resource lookup. No credentialed cross-origin OPTIONS grant. Static recovery routes cannot be treated as resource IDs.

### Response metadata

All API responses, including errors, HEAD and `204`, carry `Cache-Control: no-store`. JSON responses use UTF-8 `application/json`. `204` has no body or JSON Content-Type. Creation responses omit Location; no new GET resource route is implied. Every `401` includes `WWW-Authenticate: TaskFlow realm="TaskFlow"`, the documented application-specific cookie/JSON challenge; no Basic/Bearer/Authorization-header mechanism is introduced. Cookies are set/cleared only as authorized by their lifecycle below. Observable `429` carries appropriate Retry-After; hidden email suppression does not.

### Failure precedence

These are observable rules, not a mandatory middleware architecture:

1. Reject unsafe framing, ambiguous headers/cookies, oversized bodies, unsupported media and other ingress invalidity; apply applicable ingress budgets.
2. Resolve relevant authoritative context. Unreliable lookup is safe service failure. Without a valid conflicting higher context, missing required A/E authority returns its approved `401`. A valid higher context that conflicts with the requested lifecycle operation proceeds to selected-context integrity/conflict handling; it is not misclassified as mere missing lower authority.
3. POST/PATCH/DELETE verify exact Origin and applicable CSRF before business execution. Invalid proof returns `403`.
4. Reject context conflicts provable from route and valid current context.
5. Validate remaining structure/lexical rules, explicitly normalize approved fields, validate canonical values.
6. Apply protected resource/domain checks and atomic precondition/relationship/idempotency/commit guarantees.

When authority and CSRF are both missing, required-authority failure wins. With valid authority, bad CSRF wins over business conflict. For example, valid authenticated context on an enrollment POST with invalid proof gives `403`; with valid selected-context proof it gives `409 AUTH_CONTEXT_CONFLICT`, never enrollment execution. This does not let an authenticated CSRF token authorize an enrollment operation. Without valid enrollment or a conflicting higher context, that route returns `401 ENROLLMENT_REQUIRED`. DELETE precondition syntax precedes lookup. PATCH ownership/existence precedes revision/relationship checks, though structural/canonical validation may already reject. No errors, privileged metadata or timing-dependent resource detail may disclose foreign existence.

**Creation/recovery exception:** after authentication, integrity and structural validation, consult scoped existing idempotency evidence before rechecking present domain conditions. Recorded creation remains recoverable after Project/resource deletion or later changes. Apply mismatch/pending/consumed/expired semantics first. Only authoritatively safe new execution proceeds to canonical/domain/commit checks. Different-pending-account verification conflict requires safe proof-binding validation without consuming/exposing the proof.

Sign-in validates structure, Unicode validity and forbidden controls, then NFC. It does not independently expose enrollment-only length/blocklist eligibility: a structurally/Unicode-valid candidate outside enrollment lengths that cannot authenticate returns generic `401 INVALID_CREDENTIALS`. Malformed types/Unicode/control values retain request-validation failures. Later Q27 clarification governs earlier generic password-length wording for sign-in.

## 6. Creation idempotency and deliberate recovery

Creation/recovery requires one `Idempotency-Key` of exactly 32 lowercase hexadecimal characters, representing 16 client-generated cryptographically random bytes. It identifies a logical submission, not authentication. Scope by authenticated account and Task/Project creation operation; recovery uses the original operation scope. Authenticate/authorize every lookup, never disclose another account's submissions.

Equivalence uses original structurally validated input values. JSON member order is irrelevant; changed supplied values, including whitespace, differ even if explicit canonicalization would produce equal resources. Preserve original payload/key for deliberate recovery. No automatic retry, new-key recreation or collection-name matching (duplicate titles/names are valid).

| Authoritative condition | Original creation endpoint | Dedicated recovery endpoint |
| --- | --- | --- |
| New safely admitted creation commits | `201 CreationCompleted` | Never starts execution |
| Matching completed full outcome available | `200 CreationCompleted` | `200 CreationCompleted` |
| Matching known in-progress execution | `202 CreationPending` | `202 CreationPending` |
| Different payload, equivalence evidence available | `409 IDEMPOTENCY_PAYLOAD_MISMATCH` | Same |
| Consumed key, expired/unavailable full outcome | `409 CREATION_OUTCOME_UNAVAILABLE`; never recreate | Same |
| No available submission evidence | New execution only if authoritative reservation/evidence rules establish unused/safe state | `409 CREATION_OUTCOME_UNAVAILABLE`; no safe-recreation inference |
| Evidence validity/execution cannot be determined reliably | Safe service failure; never treat as unused/completed/known-running | Same |

Recorded original outcome, original-input equivalence evidence and completion metadata are retained for seven days after completion. `completedAt`/`retainedUntil` and resource snapshot remain immutable despite later edits/deletion. HTTP replay `200` does not alter stored outcome. Expiry is authoritative time >= retainedUntil. After expiry retain only minimal account-lifetime consumed-key evidence; no indefinite full snapshots/unnecessary personal data. A marker cannot establish input equivalence; return unavailable outcome rather than fabricate mismatch. Cleanup transitions must be gap-free under concurrency.

A transient execution reservation is not consumed/completed evidence. It prevents competing execution. Only actual resource commit atomically with recorded outcome permanently consumes the key. Definitive structural/canonical/domain rejection with no commit does not consume it; after safe release, deliberate corrected resubmission is permitted. Release requires proof no resource committed and no prior executor can still commit. Timeout/lost response/interrupted worker/lease expiry/missing evidence alone never permits release, takeover or restart. Retain protective state until authoritative reconciliation; no unsafe earlier-executor late commit.

Dedicated recovery is read-only in domain effect: never starts/restarts/completes creation, repeats effects, resurrects deleted resources or restores previous fields. Known-running `202` authorizes no automatic polling/retry/new creation. Historical success establishes original creation, not present resource state. Do not install historical data over newer Workspace data; use fresh coherent read. Missing/expired evidence proves neither success/failure nor safe recreation.

## 7. Email, registration, verification and enrollment

### Canonical email identity

Accept ASCII-only ordinary unquoted single mailbox addresses, including eligible ASCII punycode domains. Reject display wrappers/comments/literals/multiple mailboxes/malformed syntax/embedded whitespace/controls. Explicitly remove surrounding U+0020 space only, never tabs/CR/LF. After normalization: <=254 ASCII characters overall, <=64 local part, valid eligible DNS/punycode label syntax. No DNS/MX lookup is implicit canonicalization. Implementation uses a well-tested parser/validator, not a permissive custom regex.

Preserve local-part case/dots/plus tags exactly; lowercase domain for identity/storage/presentation. Alice@EXAMPLE.COM equals Alice@example.com; alice@example.com and alice+work@example.com are distinct identities. Apply consistently to registration/resend/verification eligibility/enrollment binding/sign-in. Enforce canonical uniqueness atomically. Some providers may deliver case-distinct identities to one mailbox: accepted trade-off, never provider merging/verification bypass. International local parts/Unicode-domain input require future scope approval. Registered email is read-only after activation.

### Registration, acknowledgements and retirement

Registration collects email only: no provisional password/profile/authentication context from an unverified registrant. Eligible registration establishes a restricted pending account; no Workspace session. Registration/resend return identical Accepted body/status and reasonably consistent observable behavior across new/pending/active/suppressed/ineligible states. No claim of delivery. Actual acceptance failures remain safe explicit service errors without existence dependence. Subsequent delivery failure preserves secure pending recovery, never unverified activation.

Pending proof-issuance eligibility lasts seven days from original authoritative acceptance. Repeat registration/resend reuses eligible pending account without resetting deadline. At/after cutoff issue no new proofs for that expired registration. Honor existing proofs/enrollment to their own deadlines, including post-cutoff redemption of an earlier proof issuing fresh 15-minute enrollment.

Retire expired pending account only without valid proof/enrollment or already-admitted authoritative transition that can still activate. Coordinate retirement/verification/enrollment/new registration atomically: never retire active/in-flight activation, duplicate canonical identities or restore untrusted authority. Only after safe retirement may later registration establish entirely fresh pending authority. Public acknowledgements reveal no eligibility/expiry/retirement status. No cleanup implementation selected.

### Mailbox proof and intentional redemption

Verification proofs are account-bound, purpose-bound, single-use, cryptographically unpredictable; expire exactly 30 minutes after authoritative issuance. Atomically enforce at most three simultaneously valid proofs per pending account. New issuance preserves existing usable proofs/deadlines. At capacity suppress issuance with generic acknowledgement; consumed/expired proofs do not count. Independent email/IP budgets also apply.

Email links use same-origin HTTPS `/verify-email#token=…`. Capture fragment in transient memory and immediately history-replace it before unrelated app behavior. Page enforces no-referrer/no-store/no unrelated third parties or analytics/diagnostic leakage. GET/HEAD/hydration/prefetch/link scanners never consume proof or grant enrollment. Explicit confirmation POST with proper CSRF/Origin atomically validates binding/expiry/revocation/unused state, consumes proof, records mailbox ownership, invalidates sibling proofs and issues exactly one enrollment authority. At most one concurrent redemption succeeds. Invalid/expired/revoked/replayed proof grants no authority.

### Restricted enrollment and recovery

Enrollment authority is account-bound, unpredictable, single-use, purpose-restricted and expires exactly 15 minutes after server issuance. Cookie/CSRF requirements are in Section 8. It cannot authorize Profile/Workspace/normal sessions. Owner explicitly sets display name and password only after proof; prior unverified access paths never gain authority.

Completion atomically validates/consumes enrollment authority, establishes owner-controlled credentials, invalidates prior untrusted credentials/contexts/enrollment paths and activates canonical account. At most one concurrent completion succeeds, no partial activation or automatic sign-in. Correctable validation failures may leave authority usable under abuse limits to original expiry; no extension. Successful completion clears cookie/token and leaves safe fresh-anonymous-bootstrap/explicit-sign-in path.

Lost/expired authority requires fresh intentional mailbox proof while still pending. Issuance eligibility governs issuing another proof: an already-issued valid proof remains redeemable after the seven-day cutoff and may issue enrollment within its own approved deadline. Already-verified but incomplete accounts use the same bounded flow. Requesting email alone never revokes usable enrollment. Successful same-account fresh proof atomically revokes previous enrollment and issues exactly one replacement, with new 15-minute deadline. Active accounts can never reopen enrollment, replace established credentials or use this as recovery/email-change path.

Enrollment leave requires E, enrollment CSRF and Origin; revoke current credential/token only, clear cookie, `204`. Do not activate/delete/retire account, revoke independent valid proofs, replace normal credentials or create session. Subsequent explicit bootstrap may create anonymous context if no higher valid authority.

Lost verification: deliberately bootstrap/observe enrollment; valid enrollment allows continuation, absence proves no failure or replay safety. Offer fresh proof only within pending issuance rules, preserving seven-day cutoff. Lost completion: deliberate sign-in; success establishes access, failure proves nothing about earlier completion. Lost leave: deliberate context/enrollment observation; valid remaining authority requires explicit resolution/retry, reliably absent/revoked permits new anonymous workflow, failed lookup proves no revocation. Never automatically replay uncertain authority transitions/recreate account/reopen active enrollment.

### Password policy and storage requirements

Enrollment: 15–128 Unicode code points after explicit server NFC. Accept printable ASCII/spaces/valid Unicode including supplementary-plane values. Reject malformed Unicode/unpaired surrogates and category Cc controls. No trimming/casefold/truncation/alteration beyond NFC. Normalize before canonical length/full-candidate blocklist/hash; distinct passwords remain distinct except deliberate NFC equivalence. Same Unicode-validity/NFC handling at sign-in, with its generic-failure exception in Section 5.

Enrollment checks full normalized candidate against maintained common/expected/compromised blocklist, not arbitrary substrings. If required checking fails, fail safely/explicitly rather than bypass. Maintained local dataset is permitted; online lookup not required. Sign-in does not reapply enrollment/current-blocklist eligibility. No composition mixtures/routine rotation; support managers/autofill/paste and no contradictory frontend restrictions.

Only uniquely salted expensive one-way password-specific hashing/KDF, complete canonical value without truncation, algorithm/work-factor metadata, benchmarked costs and migration/rehashing strategy. No algorithm/library selected. Authentication operation owns normalization; shared wire schemas neither transform nor duplicate normalization. No password/hash material in responses/logs/analytics/URLs/diagnostics. Maintain blocklist hygiene; compromise requires safe response without recovery bypass. General password recovery remains outside MVP.

## 8. Credentials, contexts, CSRF and sessions

### Credential encoding and cookies

Verification proofs, enrollment/session/anonymous credentials and CSRF tokens are independent purpose-bound cryptographically secure random 32-byte values, encoded as exactly 43 canonical unpadded base64url characters. Validate encoding/purpose/binding, use appropriate protected server representations, never substitute one kind for another. No verification/enrollment/session secret in API URLs or persistent browser storage; no reusable secrets in logs/errors/telemetry.

| Context | Cookie | Server lifetime/authority |
| --- | --- | --- |
| Anonymous | `__Host-taskflow-anonymous` | Fixed 30 minutes from issuance; security context only |
| Enrollment | `__Host-taskflow-enrollment` | Fixed 15 minutes from issuance; restricted pending enrollment only |
| Authenticated | `__Host-taskflow-session` | Earlier of 30-minute inactivity or 24-hour absolute authentication expiry |

All issue cookies with Secure, HttpOnly, SameSite=Lax, Path=/; no Domain/Expires/Max-Age. Exact host-only __Host scope, no JS/localStorage credentials or remember-me. Clearing matching name/host/path may use Max-Age=0/expired Expires. Browser restoration can retain cookies; browser closure is not proof of server sign-out. SameSite is additional defense, not complete CSRF.

### Context selection and boundaries

Bootstrap validates purpose/binding/expiry/revocation and selects highest valid applicable authority: authenticated > enrollment > anonymous > freshly issued anonymous. Return token bound to selected context. Never choose by cookie presence/order. Unreliable relevant validity lookup fails safely instead of falling through. Duplicate same-name security cookies are rejected. Invalid/expired/revoked contexts grant nothing and may be cleared. Bootstrap cannot downgrade auth, revoke valid lower enrollment, extend deadlines or perform business transitions.

Valid auth blocks conflicting registration/resend/verification/enrollment/another sign-in with `409 AUTH_CONTEXT_CONFLICT` before proof consumption/account mutation/authority replacement. Explicit sign-out/independent browser context required. Valid E blocks registration/resend/sign-in/different-account proof transition until deliberate exit. Same-still-pending-account fresh proof replacement is the approved exception. Higher context never permits lower business operations. Responses disclose no unrelated account existence.

### Request integrity and rotation

Every POST/PATCH/DELETE requires exact configured HTTPS Origin and X-CSRF-Token bound to applicable selected context. Missing/null/malformed/foreign Origin or invalid/missing/stale proof gives `403 REQUEST_INTEGRITY_FAILED`, with authority precedence as Section 5. Anonymous token never authorizes authenticated/enrollment action merely because another cookie exists. Required JSON bodies use approved media type.

CSRF tokens stay in frontend memory, never URLs/logs/persistent storage/unrelated destinations. Repeat bootstrap returns same token within valid context; no needless multi-tab rotation/deadline extension. Anonymous expiry remains fixed. Successful authority transitions invalidate prior relevant context/token. Verification replaces relevant prior context with restricted authority; successful sign-in destroys anonymous context and creates entirely new session/token, never promotion; completion/leave/sign-out invalidate their relevant authority/token. Enforce context validity/conflict and relevant invalidation at the authoritative transition boundary so concurrent admitted requests cannot bypass those authority guarantees; an earlier check alone cannot permit a prohibited account replacement. Bootstrap after confirmed transition obtains appropriate new proof. Fresh proof after rejection is deliberate; never automatically replay rejected/uncertain business work.

### Session validity, sign-out and activity

Explicit successful email/password sign-in establishes account and fresh opaque server-managed session. Allow multiple device/browser sessions. Confirmed sign-out revokes only initiating session server-side; copied prior credentials cannot authorize subsequent protected requests. Clear matching cookie too. Previously admitted operations may finish; sign-out is not cancellation/rollback. Failure/uncertainty stays explicit, no demo fallback. Preserve account-scoped drafts and approved reconciliation; confirmed sign-out clears drafts without erasing necessary unresolved-operation tracking.

Server enforces expiry at earlier of 30 minutes since accepted activity or 24 hours since authentication. At/either deadline reject further protected use; no resurrection/absolute renewal. Authoritative response carries both deadlines. On confirmed expiry stop protected submissions, retain same-account memory drafts, require reauthentication and deliberate reconciliation; no replay or cross-account result/draft visibility.

Only exact-empty-object activity POST may extend inactivity after sign-in. Ordinary reads/writes/session lookup/bootstrap/background polling/prefetch/idempotency replay never extend it. Meaningful foreground navigation/filtering/editing/submissions may trigger, regardless of domain commit. Frontend coalesces <=1 request/60 seconds/browser context, never passive page-open timers. Server independently extends <=once/60 seconds/session; extra valid touches return unchanged deadlines. Server time controls; client timestamps/claimed interaction type are not authority. Touch at/after expiry cannot revive, never resets absolute 24 hours or changes Task/Project/Profile revisions. Signal is not cryptographic human-presence proof; enforce auth/CSRF/Origin/abuse.

## 9. Error catalog, uncertainty and abuse budgets

JSON error shape:

```text
{ error: { code, message, fieldErrors?: [{ path, code, message }] } }
```

Optional field paths begin with body/headers/path/query then named fields or numeric array indices. Shared-schema owner expresses machine-readable field-code/path inventory consistently for API/frontend. Safe messages only; no raw secrets, internal exceptions, stack traces/database detail. Validate before use; recognized editable paths can map inline, unknown paths stay visible as safe operation feedback. Invalid/untrusted errors never render raw content.

| Condition | HTTP / code |
| --- | --- |
| Malformed JSON/UTF-8/ambiguous request encoding | `400 MALFORMED_REQUEST` |
| Structural/lexical failure, malformed IDs/headers, unknown fields/query, empty PATCH, forbidden request body | `400 REQUEST_VALIDATION_FAILED` |
| Canonical constraint failure | `422 VALIDATION_FAILED` |
| Missing/inaccessible Project assignment | `422 PROJECT_UNAVAILABLE` |
| Missing valid authenticated authority | `401 AUTHENTICATION_REQUIRED` |
| Missing valid enrollment authority | `401 ENROLLMENT_REQUIRED` |
| Sign-in does not establish active account | `401 INVALID_CREDENTIALS` |
| Invalid/expired/revoked/consumed verification proof | `400 VERIFICATION_PROOF_INVALID` |
| Concealed missing/foreign resource read/update | `404 RESOURCE_NOT_FOUND` |
| Stale owned PATCH | `409 STALE_REVISION` |
| Stale owned DELETE | `409 STALE_PRECONDITION` |
| Bad/missing Origin or context-bound CSRF | `403 REQUEST_INTEGRITY_FAILED` |
| Conflicting current browser authority | `409 AUTH_CONTEXT_CONFLICT` |
| Existing-key original-payload mismatch with equivalence evidence | `409 IDEMPOTENCY_PAYLOAD_MISMATCH` |
| Historical creation outcome unavailable | `409 CREATION_OUTCOME_UNAVAILABLE` |
| Oversized body | `413 REQUEST_TOO_LARGE` |
| Unsupported media type | `415 UNSUPPORTED_MEDIA_TYPE` |
| Observable abuse budget exhausted | `429 RATE_LIMITED` |
| Unreliable/unavailable dependency | `503 SERVICE_UNAVAILABLE` |
| Unexpected server failure | `500 INTERNAL_ERROR` |
| Known route, unsupported method | `405 METHOD_NOT_ALLOWED`, Allow |
| Unknown API route | `404 ENDPOINT_NOT_FOUND` |

Sign-in conceals nonexistent/pending/wrong-password cases and avoids unnecessary timing signals. Foreign existence stays concealed across assignment/read/update/delete. Stale conflicts contain no current snapshots/replacement revisions; authorized fresh read/review required. Bodyless HEAD/204 rules apply.

Only authoritative validated operation-specific rejection proving noncommit permits definite-failure handling. Generic 500/503, malformed success/error response and post-dispatch transport failure do not prove noncommit. Invalid mutation output after a commit remains unconfirmed, never implicit rollback. A malformed read fails the entire read; previously validated same-account data may remain only as clearly stale/error state. Validate outgoing server/received frontend declared fields and canonical values; tolerate/strip permitted additional response fields, no repair. Historical outcome unavailable proves no original failure.

### Cumulative rolling limits

| Scope | Limit |
| --- | --- |
| All API traffic/source IP | 600 requests/minute |
| Authenticated traffic/session | Additional 300 requests/minute |
| New anonymous-context issuance/source IP | 30/minute |
| Registration + resend/source IP | 20/hour |
| Registration + resend/canonical email | 1/minute, 5/hour, 20/day |
| Sign-in/source IP | 30 attempts/15 minutes |
| Sign-in/canonical email | 10 attempts/15 minutes |
| Verification confirmation/source IP | 60 attempts/15 minutes |
| Verification confirmation/applicable security context | 10 attempts/15 minutes |
| Enrollment completion/enrollment authority | 10 attempts/15 minutes |

All relevant limits apply cumulatively with server rolling windows/concurrency-safe accounting. Canonical-email sign-in budgets treat existing/pending/nonexistent identically; success never resets counters. Registration/resend address suppression returns identical generic 202/no retry metadata/no proof issuance. Three-valid-proof cap remains independent. Observable IP/context/session throttle returns 429+appropriate Retry-After without avoidable existence timing/metadata. Expire limits automatically; no attacker-triggered permanent lockout. Evaluate temporary victim-budget exhaustion, DoS/usability/load before activation.

Use actual connection IP/explicitly trusted forwarding configuration only, never arbitrary client forwarding headers. Critical protection failure must fail safely, not bypass or falsely report success. Implementation planning must define/demonstrate reliable enforcement and safe service failure under the approved error contract. Numerical budgets, seven-day windows, proof cap and session timings are TaskFlow product choices, not universal standards; no rate-limit store/technology selected.

## 10. Frontend completion and compatibility obligations

Connected operations use confirmed completion, not optimistic committed updates. Pending feedback freezes submitted input/retains exact payload and identity, suppresses duplicates and blocks dependent conflicts while allowing unrelated work. Project-delete conflict scope includes child mutations and moves into/out of it; Task operations likewise block conflicting parent deletion. Server guarantees remain independent of frontend coordination.

Validated current-account success may update authoritative data and finish an active editor. Late results never force abandoned navigation/reopen editors or overwrite newer/current-other-account state. Deliberate dismissal/navigation does not cancel server work. Preserve account-scoped in-memory drafts/tracking and browser-permitted reload warnings without cross-reload recovery promises. Rejection retains draft; uncertainty preserves original submission and explicit reconciliation. No automatic stale replay/new-resource recreation; refresh may show present state without proving original operation outcome.

Required request additions, response removal/type changes and enum expansion need explicit compatibility review/coordinated handling. Allowed additional response fields remain tolerated/stripped at approved nested boundaries; declared fields must remain valid. No speculative versioning infrastructure. Shared browser-safe runtime schemas remain authoritative with inferred types; no competing frontend/backend DTO authority, UI state, browser snapshots or business logic in contracts. First real module integration must revisit typed-client tooling under the approved tooling decision.

## 11. Downstream ownership and implementation boundary

| Owner | Required next outcome |
| --- | --- |
| [Specify the shared Schema-First contracts](../issues/13-shared-schema-contracts.md) | Express this catalog as raw/canonical input/output/error/headers/cookies/context/idempotency resource schemas, exact DTO/export inventory and allowed field paths/codes; color/icon constraints and Profile identity-field naming; enforce strict inputs/tolerant declared-field-valid readers; record runtime-only rules. Do not independently revise business/security policy. |
| [Specify the OpenAPI document and its contract consistency rules](../issues/14-openapi-specification.md) | OpenAPI 3.1 operation/security/status/header/example coverage using authoritative shared schemas and catalog-driven native conversion/assembler; fail visibly on unsupported conversion/drift, document runtime-only safeguards; include HEAD and privacy/uncertainty semantics. No independently maintained payload definitions or controller-derived competing catalog. |
| [Choose evidence that proves local independence and each integration increment](../issues/07-testability.md) | Deterministic schema/contract/concurrency/security/clock/failure evidence and module evaluation checkpoints, distinguishing documentary/simulated/live evidence and pending human implementation acceptance. Preserve this and all prerequisite scenarios. |
| [Approve the minimum readiness scope before implementation planning](../issues/08-readiness-disposition.md) | Consolidated readiness disposition after its dependencies; do not convert this planning decision into implementation acceptance. |
| Separate implementation planning, after readiness approval | Select technologies, cryptographic/storage algorithms and safe atomic enforcement/retention/cleanup/rate-limiting mechanisms, deployment/activation wiring and browser protections under these contracts; demonstrate before activation. |

No preliminary universal refactor/package creation/dependency installation/server implementation is required by this decision. Minimum preparation is obligation-based: before activating each capability, satisfy applicable authority isolation, validation/completion/draft rules, security, revisions, atomicity, contract compatibility and evidence. Local MVP remains independently operational. Deferred email changes/account recovery/collaboration require their stated future scope decisions, not implementation discretion.

## 12. Approval traceability

The owning ticket retains approval history and clarifications. These pointers index the consolidated requirements, not additional approvals.

| Approved question | Consolidated location |
| --- | --- |
| Q1 API shape | Sections 1 and 3 |
| Q2 revision transport/no-ops | Sections 2 and 4 |
| Q3 destructive preconditions/privacy | Section 4 |
| Q4 original-input creation identity/seven-day outcomes | Section 6 |
| Q5 email/password and opaque cookie sessions | Sections 7–8 |
| Q6 membership/state-sensitive project deletion | Section 4 |
| Q7 dedicated historical creation recovery | Sections 3 and 6 |
| Q8 exact key format/permanent minimal markers | Sections 2 and 6 |
| Q9 DELETE headers/bodyless 204 | Sections 3–5 |
| Q10 creation/recovery matrix and immutable evidence | Sections 3 and 6 |
| Q11 reservations/noncommit/uncertain execution | Section 6 |
| Q12 same-origin protected cookie/clearing exception | Sections 1 and 8 |
| Q13 password canonicalization/blocklist/storage | Section 7, with Q27 sign-in clarification in Section 5 |
| Q14 CSRF/bootstrap/Origin | Sections 3, 5 and 8 |
| Q15 ASCII email identity and atomic uniqueness | Section 7 |
| Q16 pending issuance cutoff and safe retirement | Section 7 |
| Q17 verification/enrollment transport and credential encoding | Sections 3 and 7–8 |
| Q18 authority collision/explicit enrollment exit | Sections 7–8 |
| Q19 sole activity operation/coalescing | Sections 3 and 8 |
| Q20 authentication routes/success/observational reads | Section 3 |
| Q21 deterministic multi-cookie selection | Sections 5 and 8 |
| Q22 lost transition responses/exit/recovery | Section 7 |
| Q23 error shape/statuses/privacy/uncertainty | Sections 5 and 9 |
| Q24 initial cumulative rate budgets | Section 9 |
| Q25 exact lexical/body/JSON/email/password boundaries | Sections 2, 5 and 7–9 |
| Q26 exact success bodies/HTTP metadata/no new timestamps | Sections 2–5 |
| Q27 observable precedence/idempotency exception/sign-in | Sections 5–6 and 9 |
| Q28 HEAD/body/method/static-route rules | Sections 2–5 and 9 |

## 13. Reproducible design review and future evaluation

**Completed design review:** the user explicitly confirmed Sections 3 and 5–9, all E1–E34 checkpoints, approval traceability and downstream ownership with no material discrepancies. Preserve these scenarios for later implementation evaluation. The current authorization ends with this decision’s resolution/documentation checks; no subsequent decision is started. Future implementation evaluation requires actual observations, not this architectural approval.

For documentary review, trace each scenario through endpoint, input/authority, success/error, mutation/evidence effect and recovery. For later implementation evaluation, use isolated active accounts A/B, pending mailbox P, owned/foreign Projects, child and standalone Tasks, two browser contexts, controlled server clocks, concurrency barriers and injected transport/storage failures. Generate valid credentials/keys rather than use placeholders as literal input. Record actual observations per feature; simulate only where the evidence strategy explicitly permits it. No real accounts, mail or runtime fixtures were created in this planning session.

### Workspace, validation and concurrency

| Checkpoint | Reproduce | Expected contract |
| --- | --- | --- |
| E1 — Complete resource inputs | Create Task with all seven fields/nulls and Project with four; omit a required field/add identity or unknown field; patch revision-only | Valid complete inputs accepted; strict structural failures 400; no backend defaults/identity edits |
| E2 — Canonical boundaries | Submit 200-code-point title plus spaces, then canonical201; supplementary characters; preserved description spaces/newlines; null vs omission; blank assignee | Post-trim limits/code points; 422 canonical errors; description preservation; null clears supported fields only |
| E3 — Calendar/metadata | Read same due date across timezones; inspect Task/Project/Profile fields and instant strings | Calendar unchanged; canonical UTC millisecond instants; no invented Project/Profile audit timestamps |
| E4 — Coherent complete read | Race Workspace read with Project cascade; include standalone Task; test empty collections and frontend filtering | Coherent full arrays/no orphan/no truncation/no ordering contract/no demo fallback |
| E5 — Revision/no-op | Two editors use same revision; submit canonical no-op/stale no-op; change display name while touching session | Atomic compare; stale409; matching no-op no revision/applicable timestamp change; independent Profile revision |
| E6 — Deletion privacy/syntax | Delete owned/missing/foreign IDs with valid/missing/malformed preconditions and absent auth | Prior failures preserved; valid missing/foreign indistinguishable204/no foreign changes; stale owned409/no snapshots |
| E7 — Project deletion scope | Change Project; create/edit/delete/move child, move between two Projects or standalone; replay/no-op | Affected deletion revisions advance; child change leaves ordinary Project revision; no-op/replay advances neither |
| E8 — Cascade races | Race moves into/out of deleted Project and post-delete create; concurrently stale deletion review | Valid serial outcomes/no partial cascade; stale preconditions require fresh coherent read/reconfirmation |
| E9 — Response boundaries | Inject bad declared field among valid entries/add tolerated extra fields/malformed error/invalid mutation success | Whole-read failure/no repair; permitted extras tolerated; safe visible errors; mutation remains uncertain after possible commit |

### Creation and retention

| Checkpoint | Reproduce | Expected contract |
| --- | --- | --- |
| E10 — Same-key concurrency | Concurrent same-account/operation/key/original payload; vary account/operation | At most one resource/atomic durable outcome; legitimate scope isolation; only known-running202 |
| E11 — Original-input equivalence | Reorder JSON keys; then change whitespace/another supplied value after commit | Equivalent reordering recovers; changed original values409 even canonical equivalence; duplicates JSON rejected before comparison |
| E12 — Historical recovery | Create then edit/delete resource or its former Project; recover through both routes | Same immutable original evidence200; no resurrection/overwrite/effects; present state from coherent read |
| E13 — Retention edge | Recover immediately before and at completedAt+7days; race cleanup/replay | Full evidence before cutoff; at/after cutoff unavailable409 and permanent minimal consumed marker; no reuse gap/fabricated mismatch |
| E14 — Unavailable evidence | Recover unknown key; fail evidence lookup; lose original response | Unknown recovery409 never creation permission; unreliable lookup503; no blind new-key replay/success/failure inference |
| E15 — Reservation safety | Pause executor, expire lease/interrupt worker; attempt second executor; inject definitive noncommit rejection | No unsafe takeover/late duplicate; safe protection until reconciliation; corrected deliberate resubmission only after proven release |

### Identity, proof and enrollment

| Checkpoint | Reproduce | Expected contract |
| --- | --- | --- |
| E16 — Email identity | Compare Alice@EXAMPLE.COM/Alice@example.com/alice@example.com/plus tags; try spaces/tabs/CRLF/non-ASCII/invalid DNS; race registration | Explicit case/domain identity, U+0020-only trim, limits/controls, atomic canonical uniqueness; no provider merging/MX canonicalization |
| E17 — Generic acceptance | Compare new/pending/active/suppressed/expired addresses, proof capacity and delivery failure; fail reliable acceptance | Identical202/no delivery claim or eligibility leak; actual service failure explicit; secure pending state preserved |
| E18 — Proof cap/expiry/races | Issue concurrently at three-valid cap; redeem siblings concurrently; advance individual30-minute deadlines | Atomic cap/no resend invalidation; one valid consumption invalidates siblings; expired/replayed proof400/no authority |
| E19 — Link safety | Open link GET/HEAD/scanner/prefetch/hydration, then explicitly confirm; inspect URL/referrers/cache/third parties/logs | No early redemption; immediate fragment removal; no secret leakage; intentional protected POST only |
| E20 — Pre-registration takeover | Attacker initiates owner-email registration; owner proves/enrolls; reuse attacker's contexts/credentials | Email-only pending, owner-created authentication; no untrusted access path becomes usable/no implicit sign-in |
| E21 — Enrollment atomicity | Concurrent completion, expiry at15min, validation/blocklist failure and injected transition failure | At most one atomic activation/consumption; no partial state/deadline extension; explicit later sign-in |
| E22 — Seven-day edge | Issue proof just before seven-day cutoff; redeem after cutoff; complete within new15min; race retirement/new registration | Existing deadlines honored, new proof issuance suppressed; no premature retirement/duplicate identity/active reopening |
| E23 — Fresh proof/exit | Request email with valid enrollment; redeem same-account fresh proof; explicitly leave | Email alone doesn't revoke; fresh proof atomically replaces; leave revokes only current enrollment/token, retains account/independent proofs |
| E24 — Lost transitions | Drop verification/completion/leave responses with and without cookie delivery; observe/fail observation; attempt failed sign-in | Deliberate observation/recovery, no automatic replay; missing cookie/failed sign-in/failed lookup proves no earlier failure/success; issuance cutoff retained |
| E25 — Password boundaries | NFC-equivalent/distinct Unicode; 15/128/129 code points, spaces, supplementary characters, Cc/unpaired surrogate; blocklist outage; sign-in short candidate | Explicit NFC only/full candidate; correct enrollment constraints/fail-closed blocklist; generic401 for valid failing sign-in candidate; no truncation/leaks/manager restrictions |

### Browser security, sessions and transport

| Checkpoint | Reproduce | Expected contract |
| --- | --- | --- |
| E26 — Context matrix | Present each valid/invalid auth/enrollment/anonymous combination; duplicate cookie; fail relevant validity lookup | Highest valid context, no accidental downgrade/lower override/revocation; ambiguous input rejected/service failure never fallthrough |
| E27 — Integrity/precedence | Missing authority+CSRF; valid authority+bad Origin/token; wrong-context token; stale token after transition; bootstrap twice | Required401 before missing-proof403; valid authority bad proof403 before conflict; stable token/fixed deadlines; no automatic retry; protected conflicts409 |
| E28 — Session cookies/revocation | Inspect issue/clear attributes; restore browser; sign out one of two sessions; reuse copied credential; finish earlier admitted operation | Host-only protected nonpersistent issuance/allowed clearing expiry; authoritative server expiry/revocation; other session retained; admitted work may finish |
| E29 — Activity/deadlines | Foreground edit/filter/navigation vs background requests; duplicate touches inside60s; advance to inactivity/absolute boundary | Only deliberate activity endpoint extends <=once/60s/session; no passive keepalive/absolute extension/revision change/revival; authoritative deadlines |
| E30 — Abuse controls | Exhaust each rolling budget, concurrent attempts and account-existence variants; fake forwarding headers; fail limiter | Cumulative enforced values; hidden address suppression202/no retry metadata; observable429+Retry-After; bounded expiry/trusted IP/fail-safe service behavior |
| E31 — Raw HTTP | Body at262144/262145 bytes including transfer/decompression; duplicate nested JSON/headers, invalid UTF8/media, unknown query, unexpected body | Correct400/413/415 without truncation/parser ambiguity; original normalization staging preserved |
| E32 — Metadata/methods | Exercise every GET/HEAD, wrong method/unknown path/recovery static path; inspect success/errors/204/401 headers | No-store everywhere; accurate405 Allow;404endpoint; bodylessHEAD/204;401TaskFlow challenge; no Location/new GET/CORS grant/token header |
| E33 — Frontend/local independence | Delay/reject/lose responses, leave editor, switch account/expire/reauthenticate; stop API in local and connected configurations | Preserve async drafts/conflict scopes/stale isolation/deliberate recovery; local independence/storage safeguards, no connected fallback; theme local |
| E34 — Schema/OpenAPI compatibility | Trace all22 explicit operations plus5 HEAD methods, payload/error/header cases and runtime-only safeguards; test additional fields/enum change | One authoritative contracts/catalog direction; explicit compatibility review; no weakened runtime guarantees or production wiring in readiness |

These checkpoints supplement, not replace, all ten async, nine validation, fifteen Blueprint, six email-scope and relevant tooling scenarios linked above. The later testing-strategy decision owns simulated/live evidence and per-module checkpoints. Automated checks and guide readiness never establish human implementation acceptance.

## 14. Actual preflight, final approval and resolution

Planning baseline inspected at commit `effe5da18639491c6130438e1a92e46665852dd4`. At consolidation start, worktree changes were the owning ticket, map research index, this catalog and the research asset/ticket from this decision session. Read tracker/domain guidance, glossary, map, approved prerequisites, downstream scopes and current frontend resource types. Current Project has createdAt without updatedAt; Task has both; no unapproved Project/Profile timestamps were added. No domain vocabulary change or new ADR was needed.

Q1–Q28 and user clarifications are consolidated above; Q27 explicitly refines generic earlier sign-in password-length wording. Research was independently source-backed and saved on its isolated branch; it is evidence only. No application/dependency/configuration changes, builds, application tests, live API/mail/browser/security checks or runtime claims were made. Documentary checks passed: 22 unique explicit operations, five GET-derived HEAD methods, complete Q1–Q28 traceability, E1–E34 checkpoints, 13 existing local-link targets, resolved prerequisites, claimed/no-Answer lifecycle and no premature map decision index. Independent consistency review and follow-up found no remaining material discrepancy after clarifying higher-authority conflict precedence and proof-issuance versus existing-proof redemption. `git diff --check` passed; detailed evidence is recorded in the owning ticket. Those documentary checks did not themselves establish confirmation; the user’s explicit final confirmation is recorded below.

**Final confirmation received on 2026-10-24:** the user explicitly confirmed the complete catalog and all Q1–Q28 clarifications, reviewed the stated sections, all 34 checkpoints, traceability and downstream ownership, and found no material discrepancies or required revisions. They authorized resolving this decision, recording confirmation, updating the map/existing downstream references, running documentation checks and then stopping. No subsequent ticket work or commit/push is authorized. Architectural approval remains distinct from implementation/runtime security acceptance, which requires later actual evidence and human observations. Resolution/check evidence is recorded in the owning ticket.
