# OpenAPI design specification

Decision owner: [Specify the OpenAPI document and its contract consistency rules](../issues/14-openapi-specification.md).

Status: **approved in full by Q14 on 2026-10-25**. The user explicitly confirmed this complete specification, Q1–Q13 and the example/counterexample companion with all O1–O16 evaluation checkpoints and no material discrepancies. The owning decision is resolved. This document and its example companion specify intended behavior; they are not generated OpenAPI, executable shared schemas, runtime/security verification or implementation acceptance.

## 1. Authority, scope and retained behavior

Apply the [Endpoint Catalog](endpoint-catalog.md), [Shared Schema-First specification](shared-schema-contracts.md), [tooling design](shared-schema-tooling.md), [Blueprint](api-architecture-blueprint.md), [validation policy](validation-policy.md), [async policy](async-operation-policy.md), [frontend-facing contract](frontend-facing-contract.md) and [MVP account email scope](account-email-scope.md). The Q1–Q13 approval record in the owning ticket governs this representation; Q11–Q13 explicitly settle the earlier ambiguous enrollment-read, recovery-description and prohibited-content bindings. Historical prerequisite approvals are preserved rather than rewritten.

Runtime schemas remain the payload authority; the operation catalog owns paths/methods/status/error/security/schema bindings. This document specifies their OpenAPI representation. Tables and examples are traceable documentation, not separately maintained DTOs, enum lists, constraints or a competing executable catalog. Later implementation must derive from actual authoritative inputs rather than transcribe a second payload model.

Readiness delivers this complete design specification. A generated and validated OpenAPI 3.1 JSON document remains an implementation deliverable, derived from the authoritative operation catalog and browser-safe shared Zod 4 schemas using guarded native conversion and the approved small assembler. No independent handwritten OpenAPI YAML/JSON contract is created. Nest wrappers conform; controller/decorator discovery never becomes competing operation authority.

Minimum readiness preparation is documentation only. Browser-local storage/forms/behavior and independent local operation remain unchanged. Progressive integration retains explicit module authority, no silent connected-error fallback, no automatic uncertain-mutation replay and no implicit offline synchronization. Email remains read-only; Profile editing changes displayName only. No database, ORM, deployment topology, generator package pin, authentication implementation, production dependency, CI wiring or client generation is selected. First-real-module integration must revisit client tooling and prove browser/compiled-API contract compatibility. Human implementation evaluation remains pending actual observations.

## 2. Document identity and effective URLs

| Item | Exact design |
| --- | --- |
| Title | `TaskFlow MVP API` |
| Contract version | `0.1.0` |
| Specification | OpenAPI 3.1; implementation must select/validate its explicit supported 3.1 patch without weakening this design |
| Server URL | `/` |
| Path keys | Exact catalog `/api/...` strings below, unchanged |
| Effective base path | Exactly `/api`, once; verify origin-root resolution plus each path |
| Tags in order | `Workspace`, `Tasks`, `Projects`, `Profile`, `Authentication` |

Same-origin HTTPS is mandatory. Relative server URLs do not authorize cross-origin deployment. No environment-specific hostname, API version path, credentialed CORS/OPTIONS grant or extra module is introduced. Synthetic example origins illustrate syntax only and are never server configuration. Contract version is neither release numbering nor implementation dependency. Coordinated-consumer contract changes and intentional operationId changes require explicit compatibility review and intentional version management; internal refactors alone change neither.

## 3. Complete method/path/identifier and wire mapping

Exactly 22 explicit operations and five HEAD counterparts, in the following approved inventory order. One tag per entry. Stable lowerCamelCase operationIds survive handler/controller refactors. No extra resource GET, pagination/filter/query endpoint or OPTIONS operation is implied.

Body bases expand to exact `<Base>RequestSchema`; JSON success bases expand to exact `<Base>ResponseSchema`. Each is a reference to the approved export, not a new shape. Strict server response roles are mandatory. HEAD entries inherit their GET status/header/security rules, suppress every body and have no response payload schema. No-body entries have no requestBody declaration; all POST/PATCH JSON bodies are required, including EmptyObject.

Security keys S/N/E/V/O are defined exactly in Section 6. All routes reject query parameters through NoQueryRequestSchema; absence of query parameters in OpenAPI alone is not enforcement.

| Method | Catalog path | Stable operationId | Tag | Security | Raw body base | Success status / strict response base |
| --- | --- | --- | --- | --- | --- | --- |
| GET | `/api/workspace` | `getWorkspace` | Workspace | S | — | 200 Workspace |
| HEAD | `/api/workspace` | `headWorkspace` | Workspace | S | — | 200 no body; GET status/headers otherwise |
| POST | `/api/tasks` | `createTask` | Tasks | S | TaskCreate | 201/200 TaskCreationCompleted; 202 CreationPending |
| PATCH | `/api/tasks/{id}` | `updateTask` | Tasks | S | TaskPatch | 200 Task |
| DELETE | `/api/tasks/{id}` | `deleteTask` | Tasks | S | — | 204 no content |
| POST | `/api/projects` | `createProject` | Projects | S | ProjectCreate | 201/200 ProjectCreationCompleted; 202 CreationPending |
| PATCH | `/api/projects/{id}` | `updateProject` | Projects | S | ProjectPatch | 200 Project |
| DELETE | `/api/projects/{id}` | `deleteProject` | Projects | S | — | 204 no content |
| POST | `/api/tasks/creation-recovery` | `recoverTaskCreation` | Tasks | S | TaskCreate | 200 TaskCreationCompleted; 202 CreationPending |
| POST | `/api/projects/creation-recovery` | `recoverProjectCreation` | Projects | S | ProjectCreate | 200 ProjectCreationCompleted; 202 CreationPending |
| GET | `/api/profile` | `getProfile` | Profile | S | — | 200 Profile |
| HEAD | `/api/profile` | `headProfile` | Profile | S | — | 200 no body; GET status/headers otherwise |
| PATCH | `/api/profile` | `updateProfile` | Profile | S | ProfilePatch | 200 Profile |
| GET | `/api/auth/csrf` | `getCsrfContext` | Authentication | O | — | 200 CsrfBootstrap |
| HEAD | `/api/auth/csrf` | `headCsrfContext` | Authentication | O | — | 200 no body; GET status/headers otherwise |
| POST | `/api/auth/registrations` | `registerAccount` | Authentication | N | Registration | 202 Accepted |
| POST | `/api/auth/verification/resend` | `resendVerification` | Authentication | N | VerificationResend | 202 Accepted |
| POST | `/api/auth/verification/confirm` | `confirmVerification` | Authentication | V | VerificationConfirm | 200 Enrollment |
| GET | `/api/auth/enrollment` | `getEnrollment` | Authentication | E | — | 200 Enrollment |
| HEAD | `/api/auth/enrollment` | `headEnrollment` | Authentication | E | — | 200 no body; GET status/headers otherwise |
| POST | `/api/auth/enrollment/complete` | `completeEnrollment` | Authentication | E | EnrollmentComplete | 200 EnrollmentActivated |
| POST | `/api/auth/enrollment/leave` | `leaveEnrollment` | Authentication | E | EmptyObject | 204 no content |
| POST | `/api/auth/sign-in` | `signIn` | Authentication | N | SignIn | 200 Authenticated |
| GET | `/api/auth/session` | `getSession` | Authentication | O | — | 200 Session |
| HEAD | `/api/auth/session` | `headSession` | Authentication | O | — | 200 no body; GET status/headers otherwise |
| POST | `/api/auth/sign-out` | `signOut` | Authentication | S | EmptyObject | 204 no content |
| POST | `/api/auth/session/activity` | `recordSessionActivity` | Authentication | S | EmptyObject | 200 Authenticated |

Task/Project completed creation envelopes bind the correct resource type. New creation is 201, matching completed replay is 200, known-running is 202; recovery never returns 201 or creates anything. Registration/resend 202 uses Accepted, never CreationPending. Session is exactly the Authenticated/Unauthenticated union. Activation does not sign in. Task/Project/Profile PATCH returns the direct resource, not a creation envelope.

## 4. Request parameters, metadata and validation stages

| Applicable entries | Selected representation and authoritative reference |
| --- | --- |
| All routes | No query parameters; NoQueryRequestSchema; no arbitrary query allowance |
| Task `{id}` PATCH/DELETE | Required path `id`, from TaskPathRequestSchema / TaskIdSchema |
| Project `{id}` PATCH/DELETE | Required path `id`, from ProjectPathRequestSchema / ProjectIdSchema |
| Every POST/PATCH/DELETE | Required Origin and X-CSRF-Token, from RequestIntegrityHeadersRequestSchema / OriginHeaderSchema / CsrfTokenSchema |
| All POST/PATCH | Required application/json requestBody; exact media/UTF-8 handling from JsonBodyHeadersRequestSchema / JsonContentTypeSchema; no duplicate standalone Content-Type parameter as substitute |
| Create and dedicated recovery | Also required Idempotency-Key from CreationHeadersRequestSchema / IdempotencyKeySchema, scoped to original account/creation operation |
| Task DELETE | Also required X-Expected-Revision from TaskDeleteHeadersRequestSchema / RevisionSchema |
| Project DELETE | Also required X-Expected-Revision and X-Expected-Deletion-Revision from ProjectDeleteHeadersRequestSchema / RevisionSchema |
| Cookie extraction | SecurityCookiesRequestSchema and purpose-specific credential schemas; use the named security schemes, not an ordinary JSON credential body |

Metadata parameters project the authoritative selected fields; projection never closes the entire HTTP header/cookie map or loses original duplicate/framing evidence. All ID/revision/key/token grammar, missing/optional distinctions and strict nested request object policies come from shared schemas. Task/Project IDs exclude the reserved creation-recovery string; static route matching never treats it as a resource ID.

All declared JSON requests use raw request roles, not canonical request companions. Apply ingress → relevant authoritative context → mutation Origin/CSRF → provable context conflict → remaining raw/lexical → explicit approved normalization → canonical → protected atomic domain validation. Missing required A/E authority precedes absent CSRF; a valid conflicting higher context instead reaches selected-context integrity then conflict. Bad proof under valid authority precedes business conflict. Never perform domain checks merely to add diagnostics after earlier authority failure.

**Q12 creation/recovery boundary:** strict raw structure, lexical constraints and applicable preserved-value constraints precede scoped evidence lookup. Description is never normalized: >10,000 Unicode code points returns 422 VALIDATION_FAILED with TOO_LONG at ["body", "description"] where useful, on both original creation and recovery. Wrong type/malformed Unicode retain earlier 400 classifications. Then consult existing evidence before normalized title/name or current domain rechecks. Recovery does not normalize/substitute original values, recheck current Project membership, require historical resources to exist or start/restart execution. Only authoritatively safe new creation proceeds through remaining canonical/domain checks. Preserve raw-input equivalence independently of JSON member order.

**Q13 content boundary:** effective body cap is 262,144 bytes including transfer/decompression; unsafe/ambiguous framing retains prior handling. Actual content above the cap returns 413 on every method. GET/HEAD/DELETE content within the cap is prohibited and returns 400 REQUEST_VALIDATION_FAILED subject to prior applicable authority/integrity precedence. A Content-Type header with no content does not itself fail these methods. 415 is reserved for declared POST/PATCH JSON body media violations. Accepted JSON syntax permits the approved case-insensitive application/json and optional single UTF-8 charset parameter; do not accept other/duplicate parameters or repair framing/values. Duplicate JSON members, malformed UTF-8/JSON and security/precondition ambiguity remain rejected before evidence is lost. No body is added to GET/HEAD/DELETE.

## 5. Exact success, error and response-metadata bindings

### 5.1 Error assembly and applicability

Every JSON error uses ApiErrorResponseSchema; strict FieldErrorResponseSchema and approved helper exports define optional field diagnostics. The catalog-derived operation/status restriction must additionally narrow error.code to that entry's allowed code set; a generic ApiError reference alone is insufficient. Such narrowing is derived assembly metadata, never an independently maintained enum/DTO. Consumers validate status, operation, envelope and code together. Unknown top-level/field codes fail the whole error; safe generic feedback never infers noncommit.

**Common errors G apply to every declared method:** 400 MALFORMED_REQUEST and REQUEST_VALIDATION_FAILED, 413 REQUEST_TOO_LARGE, 429 RATE_LIMITED, 500 INTERNAL_ERROR, 503 SERVICE_UNAVAILABLE, only when their approved conditions occur. This lists potential observable failures, not permission to run later checks before precedence permits. **J** additionally applies to all POST/PATCH: 415 UNSUPPORTED_MEDIA_TYPE. **M** additionally applies to all POST/PATCH/DELETE: 403 REQUEST_INTEGRITY_FAILED. The following table adds operation-specific bindings; the full allowed set is G plus applicable J/M plus its row. HEAD inherits the matching GET row and suppresses all error content. No unlisted code/status is accepted simply because the global error enum contains it.

| Explicit operationId | Additional status / allowed code(s) |
| --- | --- |
| `getWorkspace` | 401 AUTHENTICATION_REQUIRED |
| `createTask` | 401 AUTHENTICATION_REQUIRED; 409 IDEMPOTENCY_PAYLOAD_MISMATCH, CREATION_OUTCOME_UNAVAILABLE; 422 VALIDATION_FAILED, PROJECT_UNAVAILABLE |
| `updateTask` | 401 AUTHENTICATION_REQUIRED; 404 RESOURCE_NOT_FOUND; 409 STALE_REVISION; 422 VALIDATION_FAILED, PROJECT_UNAVAILABLE |
| `deleteTask` | 401 AUTHENTICATION_REQUIRED; 409 STALE_PRECONDITION |
| `createProject` | 401 AUTHENTICATION_REQUIRED; 409 IDEMPOTENCY_PAYLOAD_MISMATCH, CREATION_OUTCOME_UNAVAILABLE; 422 VALIDATION_FAILED |
| `updateProject` | 401 AUTHENTICATION_REQUIRED; 404 RESOURCE_NOT_FOUND; 409 STALE_REVISION; 422 VALIDATION_FAILED |
| `deleteProject` | 401 AUTHENTICATION_REQUIRED; 409 STALE_PRECONDITION |
| `recoverTaskCreation` | 401 AUTHENTICATION_REQUIRED; 409 IDEMPOTENCY_PAYLOAD_MISMATCH, CREATION_OUTCOME_UNAVAILABLE; 422 VALIDATION_FAILED (422 only applicable initial preserved-description constraint; no current canonical/domain revalidation) |
| `recoverProjectCreation` | 401 AUTHENTICATION_REQUIRED; 409 IDEMPOTENCY_PAYLOAD_MISMATCH, CREATION_OUTCOME_UNAVAILABLE; 422 VALIDATION_FAILED (422 only applicable initial preserved-description constraint; no current canonical/domain revalidation) |
| `getProfile` | 401 AUTHENTICATION_REQUIRED |
| `updateProfile` | 401 AUTHENTICATION_REQUIRED; 409 STALE_REVISION; 422 VALIDATION_FAILED |
| `getCsrfContext` | None beyond G and applicable J/M |
| `registerAccount` | 409 AUTH_CONTEXT_CONFLICT; 422 VALIDATION_FAILED |
| `resendVerification` | 409 AUTH_CONTEXT_CONFLICT; 422 VALIDATION_FAILED |
| `confirmVerification` | 400 VERIFICATION_PROOF_INVALID; 409 AUTH_CONTEXT_CONFLICT |
| `getEnrollment` | 401 ENROLLMENT_REQUIRED; 409 AUTH_CONTEXT_CONFLICT |
| `completeEnrollment` | 401 ENROLLMENT_REQUIRED; 409 AUTH_CONTEXT_CONFLICT; 422 VALIDATION_FAILED |
| `leaveEnrollment` | 401 ENROLLMENT_REQUIRED; 409 AUTH_CONTEXT_CONFLICT |
| `signIn` | 401 INVALID_CREDENTIALS; 409 AUTH_CONTEXT_CONFLICT; 422 VALIDATION_FAILED (eligible canonical email constraints only; never enrollment password length/blocklist disclosure) |
| `getSession` | None beyond G and applicable J/M |
| `signOut` | 401 AUTHENTICATION_REQUIRED |
| `recordSessionActivity` | 401 AUTHENTICATION_REQUIRED |

404 RESOURCE_NOT_FOUND applies to concealed resource lookup/update, not missing/foreign deletion: valid concealed absence on DELETE is 204 after prior checks. Profile/Workspace current-account reads do not invent individual-resource lookup routes. Stale PATCH is STALE_REVISION; stale owned DELETE is STALE_PRECONDITION. Unusable Task Project assignment is 422 PROJECT_UNAVAILABLE. No stale error carries replacement revisions/snapshots. Sign-in retains eligible canonical email failures as 422 VALIDATION_FAILED/TOO_LONG. Its password exception removes enrollment password length/blocklist eligibility only: a structurally/Unicode-valid password candidate outside enrollment lengths that cannot authenticate returns generic 401 INVALID_CREDENTIALS, provided other applicable input checks pass.

Routing failures are separately documented protocol cases: unknown API path → 404 ENDPOINT_NOT_FOUND without resource lookup; unsupported method on known path → 405 METHOD_NOT_ALLOWED plus accurate catalog-derived Allow. They are not extra supported operations and are not blanket decoder outcomes on successfully matched catalog methods. Include reusable catalog-derived routing response documentation without a catch-all default success/error allowance or invented routes. The full 22-code inventory remains shared-schema Section 7.1; the ten field codes/stage mapping/bounded deterministic safe diagnostic algorithm remain Sections 7.2–7.3.

### 5.2 Status-specific selected response metadata

| Response case | Authoritative selected schema / representation |
| --- | --- |
| All responses, including every error/HEAD/204 | Cache-Control: no-store; NoStoreHeadersResponseSchema |
| JSON success/error | JsonHeadersResponseSchema; body media application/json, server emits application/json; charset=utf-8 |
| Every 401, including enrollment/sign-in | AuthenticationRequiredHeadersResponseSchema; WWW-Authenticate: TaskFlow realm="TaskFlow" |
| Observable 429 | RateLimitedHeadersResponseSchema; appropriate canonical nonnegative safe-integer delta-seconds Retry-After |
| Unsupported known-path method 405 | MethodNotAllowedHeadersResponseSchema; Allow derived only from that path's supported catalog methods |
| 204 | NoContentHeadersResponseSchema; no body/content declaration, independent prohibition on Content-Type |
| HEAD | Corresponding GET/status selected metadata, no success/error body/content declaration; GET Content-Type may remain |

OpenAPI content/media declarations describe JSON bodies; do not rely on a generic Content-Type Header Object to prove charset, absence or raw media parsing. Record exact Content-Type requirements/HEAD retention in descriptions and H1 and verify actual HTTP metadata separately. Likewise absent content declarations cannot alone prove no bytes or forbidden header was sent. No Content-Length value is invented. Creation responses have no Location; no new GET follows from creation. Allow uses GET → HEAD → POST → PATCH → DELETE order for methods actually on the matched path, no OPTIONS/CORS grant. Header lookup is case-insensitive; values are not silently repaired. Frontend selected-header readers permit unrelated headers but independently enforce required/prohibited metadata; they never read HttpOnly Set-Cookie values.

## 6. Exact per-operation security and lifecycle representation

| Scheme key | OpenAPI kind/location | Exact cookie name | Purpose |
| --- | --- | --- | --- |
| AnonymousContextCookie | apiKey / cookie | __Host-taskflow-anonymous | Anonymous security context only |
| EnrollmentCookie | apiKey / cookie | __Host-taskflow-enrollment | Restricted enrollment |
| SessionCookie | apiKey / cookie | __Host-taskflow-session | Authenticated session |

Use these three schemes only, with empty scope arrays in security requirement entries. No Basic/Bearer/Authorization-header protocol. No document-level security inheritance. Each operation explicitly selects the following representation; HEAD mirrors GET:

| Key in Section 3 | Explicit security alternatives | Semantic limit / required behavior |
| --- | --- | --- |
| S | One requirement object containing SessionCookie | Valid active-account authenticated authority required; absent/invalid authority401; lookup uncertainty service failure |
| N | One object containing AnonymousContextCookie | Registration/resend/sign-in require anonymous integrity context; higher valid E/A conflicts409 after applicable integrity; no fabricated missing-anonymous401 |
| E | One object containing EnrollmentCookie | Restricted E required; valid A conflicts409, including GET/HEAD under Q11; absent E without conflicting A401 |
| V | Separate AnonymousContextCookie and EnrollmentCookie requirement objects (OR) | E alternative permits only approved same-pending-account fresh-proof replacement; different pending account conflicts; valid A conflicts; no proof consumption on conflict |
| O | Four alternatives: empty object, AnonymousContextCookie, EnrollmentCookie, SessionCookie | Only csrf/bootstrap and session observation; absent cookie is permitted. Highest relevant valid context wins; this never makes protected operations anonymous |

Separate requirement objects mean OR; multiple schemes in one object mean AND. Never add an AND requirement for all three cookies or treat OR as freely selectable authority. Cookie presence alone does not validate purpose/binding/expiry/revocation. The selected relevant authority is server-validated, A > E > N; failed relevant lookup cannot fall through to a lower context or false logout. Security schemes describe necessary combinations for successful access, not all error-context inputs. Conflicting higher cookies remain observable as specified even when the success declaration names E/N only.

All mutations separately declare required Origin/X-CSRF-Token from shared metadata. With required A/E missing and no valid conflicting higher context,401 precedes absent integrity403. With valid selected authority, bad integrity403 precedes conflict409. N tokens cannot authorize E/A operations; A tokens do not grant lower lifecycle permissions. Exact configured HTTPS Origin comparison rejects missing/null/malformed/foreign values without equivalent-spelling repair. No credentialed cross-origin CORS/OPTIONS permission is introduced.

**Q11 enrollment observation:** valid A →409 AUTH_CONTEXT_CONFLICT even without an E cookie; valid E/no A →200 Enrollment for GET; no E/no conflicting A →401 ENROLLMENT_REQUIRED; unreliable validation → safe service failure. GET/HEAD require no Origin/CSRF, create/replace no E, perform no lifecycle transition or activity renewal; HEAD suppresses all success/error bodies and retains applicable no-store/challenge metadata.

Cookie issuance is host-only Secure/HttpOnly/SameSite=Lax/Path=/ with exact __Host names; no Domain or persistent issue Expires/Max-Age. Clear descriptors preserve names/flags/path and approved Max-Age=0 or expired Expires, using the shared server-only descriptors. Anonymous fixed lifetime 30min; E 15min; A earlier of inactivity30min/absolute 24h. Credential encoding is 32 random bytes,43 canonical unpadded base64url characters; encoding alone proves neither randomness nor authority. No cookie credentials in JSON, URLs, persistent browser storage, generated example payloads or logs. No reader for cookie descriptors.

| Operation/event | Permitted credential/context effect; preserve approved atomicity |
| --- | --- |
| getCsrfContext / headCsrfContext | Resolve highest relevant valid context; permitted anonymous bootstrap only if needed, no auth/E creation or deadline extension. HEAD returns no CSRF token header/body |
| registerAccount / resendVerification | Generic202; approved pending proof issuance only, no session/E grant; hidden address suppression stays202 without Retry-After |
| confirmVerification | Intentional protected proof redemption only; atomically consume proof/invalidate siblings/issue exactly one E; same-account replacement revokes previous E; invalidate relevant old context/token |
| getEnrollment / headEnrollment | Observe only, no issue/replace/renew; Q11 classification |
| completeEnrollment | Atomically consume E and activate owner credentials; clear E/token, no automatic sign-in |
| leaveEnrollment | Revoke only current E/token, clear cookie; retain pending account/independent valid proofs; no activation/deletion/session |
| signIn | Explicit fresh session, destroy anonymous context/token rather than promote it |
| getSession / headSession | Observation; reliable absent/invalid/expired/revoked A produces200 unauthenticated for GET, never infer it from failed lookup; no renewal |
| signOut | Server-revoke initiating session/token, clear matching cookie; other sessions retained; previously admitted operations may finish |
| recordSessionActivity | Only endpoint extending inactivity; exact {}; frontend/server coalescing <=once/60s; never absolute extension, expired-session revival or domain revision change |
| Ordinary domain reads/writes/replays | No authentication lifecycle or activity renewal |

Proof cap 3/lifetime 30min, pending issuance window 7days, E expiry/one-time activation, session revocation/timing/context transitions, cumulative abuse budgets and safe retirement remain catalog Sections 6–9. These are runtime server obligations A1/H1/B1/I1. Proof links remain intentional fragment-based flow; API GET/HEAD/scanners never consume them. Verification/enrollment lost responses retain deliberate observation/fresh-proof/explicit-sign-in recovery; no automatic replay or reopening active enrollment.

## 7. Components and all 115 public-export dispositions

Preserve exact authoritative public export names including Schema/role suffixes. `#/components/schemas/<ExactExportName>` identifies an emitted public schema. No aliases, stripping/renaming, collision overwrite or reader-for-server substitution. Reuse exact named exports and references wherever definitions are shared. Reachability starts at Section 3 wire bodies/successes, Section 5 errors and selected parameter/header references. Emit necessary nested named public definitions; keep unnamed composition nodes inline unless the approved generator's internal naming can demonstrate no collision or competing public identity. Do not invent additional public DTO exports. Fail on missing/colliding identities, dangling or inconsistent references and incorrect role substitution.

The complete design inventory below expands only finite authoritative naming rules. All 115 remain traced even if not emitted. Actual emitted graph/constraints must be demonstrated against the implemented schemas, not inferred from this table. Raw accepted bodies, canonical request companions, strict output, tolerant frontend readers, selected metadata and server-only cookie descriptors retain distinct roles. Canonical scalar fields may be reused within strict canonical responses; this does not turn canonical request-body stages into alternate wire requests. Metadata objects are selected transport projections, not JSON payloads or a closure of every HTTP header/cookie.

| Exact public export | Owning section | Role/disposition |
| --- | --- | --- |
| `ResourceIdSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `TaskIdSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `ProjectIdSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `AccountIdSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `RevisionSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `TaskStatusSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `TaskPrioritySchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `SecurityContextSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `CalendarDateSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `CanonicalInstantSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `OrdinaryTextRequestSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `TaskTitleCanonicalSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `ProjectNameCanonicalSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `DisplayNameCanonicalSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `AssigneeCanonicalSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `DescriptionSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `ProjectColorSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `ProjectIconSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `EmailRequestSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `EmailCanonicalSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `PasswordRequestSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `EnrollmentPasswordCanonicalSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `SignInPasswordCanonicalSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `IdempotencyKeySchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `VerificationProofSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `CsrfTokenSchema` | Shared-schema contracts §3.1 | Shared field; emit only when referenced in its authoritative role |
| `AnonymousCredentialSchema` | Shared-schema contracts §3.1 | Purpose-specific server/transport credential; never JSON response/example payload |
| `EnrollmentCredentialSchema` | Shared-schema contracts §3.1 | Purpose-specific server/transport credential; never JSON response/example payload |
| `SessionCredentialSchema` | Shared-schema contracts §3.1 | Purpose-specific server/transport credential; never JSON response/example payload |
| `TaskResponseSchema` | Shared-schema contracts §3.2 | Strict authoritative JSON response; wire reference |
| `TaskResponseReaderSchema` | Shared-schema contracts §3.2 | Frontend reader/projection; never strict server wire output |
| `ProjectResponseSchema` | Shared-schema contracts §3.2 | Strict authoritative JSON response; wire reference |
| `ProjectResponseReaderSchema` | Shared-schema contracts §3.2 | Frontend reader/projection; never strict server wire output |
| `ProfileResponseSchema` | Shared-schema contracts §3.2 | Strict authoritative JSON response; wire reference |
| `ProfileResponseReaderSchema` | Shared-schema contracts §3.2 | Frontend reader/projection; never strict server wire output |
| `WorkspaceResponseSchema` | Shared-schema contracts §3.2 | Strict authoritative JSON response; wire reference |
| `WorkspaceResponseReaderSchema` | Shared-schema contracts §3.2 | Frontend reader/projection; never strict server wire output |
| `TaskCreateRequestSchema` | Shared-schema contracts §4 | Raw request body; wire reference |
| `TaskCreateCanonicalSchema` | Shared-schema contracts §4 | Post-normalization request stage; never alternative wire body |
| `TaskPatchRequestSchema` | Shared-schema contracts §4 | Raw request body; wire reference |
| `TaskPatchCanonicalSchema` | Shared-schema contracts §4 | Post-normalization request stage; never alternative wire body |
| `ProjectCreateRequestSchema` | Shared-schema contracts §4 | Raw request body; wire reference |
| `ProjectCreateCanonicalSchema` | Shared-schema contracts §4 | Post-normalization request stage; never alternative wire body |
| `ProjectPatchRequestSchema` | Shared-schema contracts §4 | Raw request body; wire reference |
| `ProjectPatchCanonicalSchema` | Shared-schema contracts §4 | Post-normalization request stage; never alternative wire body |
| `ProfilePatchRequestSchema` | Shared-schema contracts §4 | Raw request body; wire reference |
| `ProfilePatchCanonicalSchema` | Shared-schema contracts §4 | Post-normalization request stage; never alternative wire body |
| `RegistrationRequestSchema` | Shared-schema contracts §4 | Raw request body; wire reference |
| `RegistrationCanonicalSchema` | Shared-schema contracts §4 | Post-normalization request stage; never alternative wire body |
| `VerificationResendRequestSchema` | Shared-schema contracts §4 | Raw request body; wire reference |
| `VerificationResendCanonicalSchema` | Shared-schema contracts §4 | Post-normalization request stage; never alternative wire body |
| `VerificationConfirmRequestSchema` | Shared-schema contracts §4 | Raw request body; wire reference |
| `VerificationConfirmCanonicalSchema` | Shared-schema contracts §4 | Post-normalization request stage; never alternative wire body |
| `EnrollmentCompleteRequestSchema` | Shared-schema contracts §4 | Raw request body; wire reference |
| `EnrollmentCompleteCanonicalSchema` | Shared-schema contracts §4 | Post-normalization request stage; never alternative wire body |
| `SignInRequestSchema` | Shared-schema contracts §4 | Raw request body; wire reference |
| `SignInCanonicalSchema` | Shared-schema contracts §4 | Post-normalization request stage; never alternative wire body |
| `EmptyObjectRequestSchema` | Shared-schema contracts §4 | Raw request body; wire reference |
| `EmptyObjectCanonicalSchema` | Shared-schema contracts §4 | Post-normalization request stage; never alternative wire body |
| `AcceptedResponseSchema` | Shared-schema contracts §5 | Strict authoritative JSON response; wire reference |
| `AcceptedResponseReaderSchema` | Shared-schema contracts §5 | Frontend reader/projection; never strict server wire output |
| `EnrollmentResponseSchema` | Shared-schema contracts §5 | Strict authoritative JSON response; wire reference |
| `EnrollmentResponseReaderSchema` | Shared-schema contracts §5 | Frontend reader/projection; never strict server wire output |
| `EnrollmentActivatedResponseSchema` | Shared-schema contracts §5 | Strict authoritative JSON response; wire reference |
| `EnrollmentActivatedResponseReaderSchema` | Shared-schema contracts §5 | Frontend reader/projection; never strict server wire output |
| `AuthenticatedResponseSchema` | Shared-schema contracts §5 | Strict authoritative JSON response; wire reference |
| `AuthenticatedResponseReaderSchema` | Shared-schema contracts §5 | Frontend reader/projection; never strict server wire output |
| `UnauthenticatedResponseSchema` | Shared-schema contracts §5 | Strict authoritative JSON response; wire reference |
| `UnauthenticatedResponseReaderSchema` | Shared-schema contracts §5 | Frontend reader/projection; never strict server wire output |
| `SessionResponseSchema` | Shared-schema contracts §5 | Strict authoritative JSON response; wire reference |
| `SessionResponseReaderSchema` | Shared-schema contracts §5 | Frontend reader/projection; never strict server wire output |
| `CsrfBootstrapResponseSchema` | Shared-schema contracts §5 | Strict authoritative JSON response; wire reference |
| `CsrfBootstrapResponseReaderSchema` | Shared-schema contracts §5 | Frontend reader/projection; never strict server wire output |
| `CreationPendingResponseSchema` | Shared-schema contracts §5 | Strict authoritative JSON response; wire reference |
| `CreationPendingResponseReaderSchema` | Shared-schema contracts §5 | Frontend reader/projection; never strict server wire output |
| `TaskCreationCompletedResponseSchema` | Shared-schema contracts §5 | Strict authoritative JSON response; wire reference |
| `TaskCreationCompletedResponseReaderSchema` | Shared-schema contracts §5 | Frontend reader/projection; never strict server wire output |
| `ProjectCreationCompletedResponseSchema` | Shared-schema contracts §5 | Strict authoritative JSON response; wire reference |
| `ProjectCreationCompletedResponseReaderSchema` | Shared-schema contracts §5 | Frontend reader/projection; never strict server wire output |
| `OriginHeaderSchema` | Shared-schema contracts §6.1 | Selected metadata scalar; not JSON payload |
| `JsonContentTypeSchema` | Shared-schema contracts §6.1 | Selected metadata scalar; not JSON payload |
| `RetryAfterSchema` | Shared-schema contracts §6.1 | Selected metadata scalar; not JSON payload |
| `AllowHeaderSchema` | Shared-schema contracts §6.1 | Selected metadata scalar; not JSON payload |
| `SecurityCookieNameSchema` | Shared-schema contracts §6.1 | Selected metadata scalar; not JSON payload |
| `TaskPathRequestSchema` | Shared-schema contracts §6.2 | Selected request metadata; project to parameters/cookies, not JSON bodies |
| `ProjectPathRequestSchema` | Shared-schema contracts §6.2 | Selected request metadata; project to parameters/cookies, not JSON bodies |
| `NoQueryRequestSchema` | Shared-schema contracts §6.2 | Selected request metadata; project to parameters/cookies, not JSON bodies |
| `RequestIntegrityHeadersRequestSchema` | Shared-schema contracts §6.2 | Selected request metadata; project to parameters/cookies, not JSON bodies |
| `JsonBodyHeadersRequestSchema` | Shared-schema contracts §6.2 | Selected request metadata; project to parameters/cookies, not JSON bodies |
| `CreationHeadersRequestSchema` | Shared-schema contracts §6.2 | Selected request metadata; project to parameters/cookies, not JSON bodies |
| `TaskDeleteHeadersRequestSchema` | Shared-schema contracts §6.2 | Selected request metadata; project to parameters/cookies, not JSON bodies |
| `ProjectDeleteHeadersRequestSchema` | Shared-schema contracts §6.2 | Selected request metadata; project to parameters/cookies, not JSON bodies |
| `SecurityCookiesRequestSchema` | Shared-schema contracts §6.2 | Selected request metadata; project to parameters/cookies, not JSON bodies |
| `NoStoreHeadersResponseSchema` | Shared-schema contracts §6.3 | Selected response metadata |
| `NoStoreHeadersResponseReaderSchema` | Shared-schema contracts §6.3 | Frontend reader/projection; never strict server wire output |
| `JsonHeadersResponseSchema` | Shared-schema contracts §6.3 | Selected response metadata |
| `JsonHeadersResponseReaderSchema` | Shared-schema contracts §6.3 | Frontend reader/projection; never strict server wire output |
| `AuthenticationRequiredHeadersResponseSchema` | Shared-schema contracts §6.3 | Selected response metadata |
| `AuthenticationRequiredHeadersResponseReaderSchema` | Shared-schema contracts §6.3 | Frontend reader/projection; never strict server wire output |
| `RateLimitedHeadersResponseSchema` | Shared-schema contracts §6.3 | Selected response metadata |
| `RateLimitedHeadersResponseReaderSchema` | Shared-schema contracts §6.3 | Frontend reader/projection; never strict server wire output |
| `MethodNotAllowedHeadersResponseSchema` | Shared-schema contracts §6.3 | Selected response metadata |
| `MethodNotAllowedHeadersResponseReaderSchema` | Shared-schema contracts §6.3 | Frontend reader/projection; never strict server wire output |
| `NoContentHeadersResponseSchema` | Shared-schema contracts §6.3 | Selected response metadata |
| `NoContentHeadersResponseReaderSchema` | Shared-schema contracts §6.3 | Frontend reader/projection; never strict server wire output |
| `SecurityCookieIssueSchema` | Shared-schema contracts §6.4 | Server-only descriptor; never ordinary API JSON |
| `SecurityCookieClearSchema` | Shared-schema contracts §6.4 | Server-only descriptor; never ordinary API JSON |
| `OperationErrorCodeSchema` | Shared-schema contracts §7 | Error/helper |
| `FieldErrorCodeSchema` | Shared-schema contracts §7 | Error/helper |
| `ErrorLocationSchema` | Shared-schema contracts §7 | Error/helper |
| `ErrorPathSchema` | Shared-schema contracts §7 | Error/helper |
| `FieldErrorResponseSchema` | Shared-schema contracts §7 | Strict server field diagnostic; nested in error envelope |
| `FieldErrorResponseReaderSchema` | Shared-schema contracts §7 | Frontend reader/projection; never strict server wire output |
| `ApiErrorResponseSchema` | Shared-schema contracts §7 | Strict server error envelope; restrict code per operation/status |
| `ApiErrorResponseReaderSchema` | Shared-schema contracts §7 | Frontend reader/projection; never strict server wire output |

## 8. Runtime-rule inventory, representation and enforcement ownership

The single catalog-linked declaration inventory resolves `x-taskflow-runtime-rules` references. At document root, this extension is a map keyed by the exact rule IDs below; each declaration has `id`, `sources`, `operations`, `schemas`, `openapiRepresentation`, `additionalRuntimeObligation`, `enforcementOwners`, `evaluationCheckpoints`. Source pointers are stable repository-relative specification/section pointers, never machine paths or secrets. Operation/schema lists contain exact identities and resolve to the operation catalog/public inventory; applicability includes transitive nested use. A declaration may cover multiple authoritative sources without redefining any rule.

At applicable operations and emitted schema components, the extension is an array of those IDs. Definitions are held at root only; references resolve deterministically there. Sort IDs by the inventory order below, deduplicate references, reject unknown IDs, omissions of applicable obligations or contradictory mappings. The inventory is assembly/traceability metadata, not an additional business-rule or schema authority. Avoid describing an entire mixed rule as inherently unexpressible: preserve its expressible part and identify its precise extra runtime checks. Generation limitations require visible failure, not a runtime-only relabeling.

| ID / authoritative source | Affected operations / public schemas (including nested use) | Represent in OpenAPI | Additional runtime obligation and enforcement owner | Evaluation |
| --- | --- | --- | --- | --- |
| U1 / shared-schema §§2–4,7,9 | Text inputs, resource/success/error outputs and readers; OrdinaryTextRequestSchema, DescriptionSchema and all dependent text/path/message schemas | Expressible string/code-point length constraints at their correct stage; raw values never acquire premature post-trim limits | Shared validators enforce scalar well-formedness and exact code-point counting; browser/API parity and no surrogate repair. Server performs eligible canonical-stage length checks | O5; S4,S9 |
| U2 / shared-schema §§3.1,9 | createProject/updateProject; ProjectIconSchema and Project-containing outputs/readers | Single-scalar and supported lexical/category constraints faithfully represented where possible | Shared validators enforce approved Letter/Number/Punctuation/Symbol admission, whitespace/default-ignorable/control/combining/private-use/unassigned exclusions using Unicode 17.0.0; no font promise, uppercase or truncation | O5; S5 |
| U3 / shared-schema §§2–4,9 | Normalized create/update/auth inputs and canonical outputs; named Canonical schemas and canonical scalar fields | Correct raw vs canonical roles, expressible canonical patterns, no transform/default/coercion | Operations explicitly trim ordinary names by approved ECMAScript whitespace, email U+0020/domain rules, password NFC; no trim descriptions/passwords or known-value repair. Shared canonical/output/readers reject noncanonical values. Recovery preserves original raw inputs and skips current canonical/domain rechecks after initial Q12 checks | O4–O5,O9; S1,S4,S11 |
| D1 / shared-schema §§3.1,9 | CalendarDateSchema, CanonicalInstantSchema and dependent operations/outputs | Exact YYYY-MM-DD / UTC fixed-millisecond patterns, ranges and supported format constraints | Shared validators check real proleptic Gregorian calendar/year0001–9999, leap/month semantics, clock bounds; no rollover, offsets, leap seconds or timezone repair. Formats alone do not prove this | O5; S6 |
| T1 / shared-schema §§3.1,6,9 | VerificationProofSchema, CsrfTokenSchema and three credential scalars; auth and context-protected operations | Purpose-specific names, exact canonical encoding constraints supported by representation | Shared validators verify canonical32-byte/43-character unpadded base64url decode/re-encode/trailing-bit equivalence. Server supplies randomness, purpose, binding, expiry/revocation; syntax alone grants nothing | O5,O7; S12–S13 |
| E1 / shared-schema §§3.1,4,9; catalog §7 | registerAccount/resendVerification/signIn and email-bearing outputs; EmailRequestSchema/EmailCanonicalSchema | Approved raw/canonical lexical/length distinctions, faithfully supported grammar constraints | Shared/browser/API parser compatibility for exact ASCII ordinary mailbox policy, U+0020-only margins, local-part preservation/domain lowercase and canonical bounds; server atomically enforces identity uniqueness, no provider merging/MX normalization | O5,O7; S12; E16 |
| P1 / shared-schema §§4,9 | updateTask/updateProject/updateProfile; corresponding raw/canonical schemas | Required expectedRevision; at least one editable field for Task/Project, required displayName for Profile; omission/null distinctions, no defaults | Server atomically checks expected revision including no-ops; unchanged normalized values retain applicable times/revisions. A converter must preserve expressible PATCH presence rather than omit it | O4,O8; S3; E5 |
| X1 / shared-schema §§7,9 | All errors; ApiError/FieldError response/reader and helper exports | Exact envelope, separate supported enums, bounded paths/messages/entries and per-operation/status code restriction | Server sanitizes paths/messages without secrets, deduplicates safe path/code pairs, applies approved location/segment/field-code ordering and fixed templates, takes first32/omits empty fieldErrors. Readers reject invalid whole errors; no reflected values or unsafe repair | O6; S8–S9 |
| H1 / shared-schema §§6,9; catalog §5; owning ticket Q11,Q13 | All 27 operations, selected metadata and cookie descriptors | Parameters/media/status/headers/security declarations, no body/content on prohibited methods/outcomes, no-store, challenge, Retry-After/Allow | Server preserves original framing/duplicate/UTF-8/member evidence, enforces 262144-byte cap, exact approved media grammar, Origin/CSRF/header/cookie rules and status-specific prohibited headers. Frontend checks accessible selected metadata; no credential inspection | O3,O7,O10; S7,S14 |
| B1 / shared-schema §9; catalog §§3–5 | Workspace/Tasks/Projects/Profile operations and their resource/revision schemas | Exact resource fields, IDs/relations/nullability/revision inputs and relevant success/error bindings | Server enforces private ownership, coherent complete snapshots/resource uniqueness, allowed assignment, concealment, revision/no-op/deletionRevision/atomic cascade and serial effects. Schemas do not prove cross-resource consistency or ownership | O8; S2,S10; E4–E8 |
| I1 / shared-schema §§5,8–9; catalog §6; owning ticket Q12 | createTask/createProject/recoverTaskCreation/recoverProjectCreation; keys/completed/pending schemas | Correct201/200/202/resource envelopes, mismatch/unavailable errors, fixed original evidence fields | Server scopes account/operation/raw-value equivalence; concurrent reservation/commit/outcome atomicity; seven-day full evidence and account-lifetime minimal consumed-key marker with gap-free cleanup. No unsafe timeout takeover/release/recreation. Recovery never executes or overwrites current state; frontend deliberately reconciles | O9; S11; E10–E 15 |
| A1 / shared-schema §9; catalog §§7–9; owning ticket Q11 | All authority-dependent operations plus auth operations; security context/credential/enrollment/session schemas | Cookie/context security declarations and exact lifecycle/status/deadline representations | Server enforces proof30min/cap 3, pending issuance7days/safe retirement, E 15min/one-time activation, context conflicts/rotation/concurrency, A inactivity 30min/absolute 24h/revocation, activity coalescing 60s and exact cumulative rolling abuse budgets. Mailbox/link/browser transition safeguards remain catalog policy, not schema enforcement | O7,O11; S12–S13; E17–E30 |
| C1 / shared-schema §§2,9–10; async/validation policies | Every frontend-consumed operation, response/error/metadata reader | Strict server wire contracts plus separately documented tolerant reader projection; operation/status/error applicability | Frontend validates all declared fields/status/metadata, fails invalid whole reads/errors, isolates accounts/drafts/late results, never installs stale historical evidence or treats malformed/lost generic responses as noncommit. Deliberate recovery only; local independence, no connected fallback or automatic replay | O12; S10,S15–S16; E9,E24,E33 |

The later evidence strategy owns broader simulated/live evidence policy; these checkpoints preserve obligations without starting that decision. Declaration presence, formats or security schemes do not prove server/shared/frontend enforcement.

## 9. Guarded generation, consistency and drift contract

Generation input is the approved catalog, actual shared schemas, declared rule inventory, fixed examples and reviewed configuration. The implementation must prove each of the following before treating a generated artifact as faithful:

1. Resolve every operation/schema/export identity and role. Verify exactly 27 methods,22 explicit/five derived HEADs, unique stable IDs, tags, title/version and effective `/api` URLs. No extra route, operation or payload family may appear from controller discovery or a wildcard/default entry.
2. Apply a fail-closed schema-feature guard before native conversion. Reject transforms, coercion, defaults, implicit normalization, unknown/unsupported constructs and undeclared refinements. Allow only reviewed supported construction patterns and declared necessary extra runtime checks; converter success/throw-on-unsupported alone is insufficient. No empty/any placeholder may conceal lost information.
3. Classify every constraint: faithfully represented, expressible but unsupported/lost (fatal), or precisely declared additional runtime obligation with parity fixtures. Preserve enums, required/optional/null, primitive/array/object constraints, nested strictness, raw-stage vs canonical-stage lengths, exact patterns/formats, ID exclusions and PATCH presence. String-format annotations alone do not establish semantic date/token/mailbox validity.
4. Use native conversion where supported, with the small assembler deriving all methods/paths/statuses/parameters/security/reference bindings from catalog and actual schemas. Correctly lift selected metadata to transport positions; never serialize header/cookie descriptors as payload DTOs. Use strict response schemas, not readers. Preserve tolerant reader behavior in separate documentation/fixtures without falsely closing its accepted input.
5. Assemble catalog-derived per-operation/status error-code restrictions and runtime references. Resolve the full component graph; fail on collisions/dangling identities/role substitutions. Verify prohibited-body/204/HEAD metadata and cookie lifecycle documentation. OpenAPI schema validation is one check, not a substitute for these rules.
6. Validate the complete generated OpenAPI 3.1 artifact with a compatible validator/dialect and reference resolution. No generator/validator version, file placement, CI command or build export wiring is selected here. Verify the selected implementation rather than assume feasibility research proved it.
7. Validate each positive example against actual shared raw/strict response/metadata schemas and applicable operation/status/code binding; validate canonical-stage fixtures at their declared stage. Check counterexamples at the correct boundary for expected rejection and precedence; do not mislabel an invalid fixture as a positive OpenAPI example.
8. Demonstrate deterministic repeated generation and independent verification. Verify structure/semantics against authoritative inputs and byte equality against the reviewed artifact. Verification must not overwrite, regenerate, normalize, repair or update snapshots. Intentional changes require compatibility review, explicit regeneration and repeat verification.

Every failure report identifies affected operation/component/rule, expected versus observed result, authoritative owning source and one category: missing coverage, inconsistent metadata, unsupported conversion, semantic information loss or artifact drift. Reports use stable relative pointers and safe bounded summaries; no submitted passwords/tokens/cookies/headers, personal data or exception secrets. Diagnostics do not mutate authority or turn a failed security check into a weakened contract.

Mutation output failure after possible commit remains unconfirmed, not rollback. Generic500/503/transport loss never proves noncommit. Missing/expired creation history proves neither original failure nor permission to recreate. No document/schema/example check establishes transaction security or human implementation acceptance.

## 10. Exact deterministic serialization

Reviewed generated format: UTF-8 JSON, no BOM, two spaces per indentation level, LF line endings, exactly one final newline, no trailing whitespace. Serialize unchanged authoritative string values without NFC/other value normalization. Use standard JSON values only, reject undefined/nonfinite/unserializable input. Strings use JSON escaping for quotes/backslashes/control characters (short escapes where defined, otherwise lowercase four-hex Unicode escapes); other well-formed Unicode scalars remain literal, solidus remains unescaped. Use deterministic shortest round-trip JSON number serialization, canonical zero for numeric zero. Production serializer compatibility and edge fixtures must be verified, not inferred from this design.

Use these object/array ordering rules; lexical means Unicode scalar-value ordinal order, never locale order. Unknown object-key categories use lexical order; category exceptions below override it. Do not use unordered sets or arbitrary reflection traversal.

| Category | Fixed ordering |
| --- | --- |
| Top-level known keys | openapi, jsonSchemaDialect (only if explicitly configured), info, servers, tags, paths, components, x-taskflow-runtime-rules; any further expressly reviewed keys afterward lexically |
| info | title, version, description; other expressly reviewed keys lexically |
| servers | One approved `/` entry; its object fields use ordinary lexical ordering |
| tags | Workspace, Tasks, Projects, Profile, Authentication; each operation has its one owning tag |
| paths / method keys | First appearance of each path in Section 3 inventory; methods within that path follow inventory order. This defines object presentation, not route-matching priority |
| operation object keys | operationId, tags, summary, description, parameters, requestBody, responses, security, x-taskflow-runtime-rules; further reviewed keys lexically |
| response status keys | Numeric ascending. No range/default currently approved. If deliberately approved later, numeric statuses first, ranges lexically next, default last, with compatibility review |
| component groups | schemas, parameters, headers, requestBodies, responses, securitySchemes, examples, links, callbacks; emit only needed/approved groups; no empty speculative groups. Group entries sort lexically |
| schema component identities | Exact public export names, lexically; named references retain exact spelling |
| schema property/keyword objects | Keys lexically, including properties/$defs. Preserve source-authoritative order of required/enum/union/composition arrays; do not sort away meaningful diagnostic or tuple order |
| parameters | Location path → query → header → cookie; within location, canonical name lexically. Query has no entries; cookies use security schemes rather than duplicate ordinary cookie parameters |
| selected headers | Canonical public names lexically for documentation/serialization; actual HTTP field matching remains case-insensitive. Allow value has its separate approved method order |
| security declarations | Scheme map names lexically. Alternatives: empty object first when permitted, then AnonymousContextCookie, EnrollmentCookie, SessionCookie. Within a requirement object, names lexically; scope arrays empty for these cookie schemes |
| runtime declarations/references | U1,U2,U3,D1,T1,E1,P1,X1,H1,B1,I1,A1,C1. Declaration fields: id,sources,operations,schemas,openapiRepresentation,additionalRuntimeObligation,enforcementOwners,evaluationCheckpoints; source/schema/owner lists lexical, operation lists Section 3 order, checkpoint lists numeric |
| examples and reference maps | Stable fixture identities lexically; reference-valued object properties follow their containing category's order. Never rename/normalize reference targets. Example payload object keys lexically; fixture arrays preserve intended order |
| all other arrays | Retain deterministic authoritative declared sequence; no semantic rewriting, sorting tuple items or reordering diagnostic arrays |

Exact-byte verification compares the reviewed file as supplied. Structural consistency checks may inspect parsed values but do not silently reserialize the file to make its bytes pass. Prove unchanged-input repeatability across the supported generator environment; versions/configuration are explicit generation inputs. No timestamps, random values, hostnames tied to environments or machine paths.

## 11. Examples, counterexamples and binding coverage

The [OpenAPI example and counterexample design](openapi-examples.md) supplies concrete synthetic JSON fixtures, distinct positive/negative/explanatory classifications, status/error/header binding requirements and boundary scenarios. These are illustrations derived from approved schemas, never independent payload definitions. They are **unverified intended-positive fixtures**, not a claim that executable shared schemas or a generated artifact already exist. Every executable example requires implementation-time shared-schema/operation/status validation.

Use fixed mock values satisfying lexical requirements, including canonical base64url encodings,32-hex idempotency keys, opaque revisions and UTC millisecond timestamps. Never use live account identifiers, personal data, reusable cookies/proofs/tokens or live secrets. No cookie credential literals or Set-Cookie values are published as example payloads. Synthetic proof/CSRF mock values have no live binding/authority. Explanatory placeholders/fixture recipes must be marked non-executable and expanded before validation; invalid fixtures remain outside positive OpenAPI examples.

Coverage is exhaustive by binding, not by duplicating independent schemas: for every Section 3 success/status branch attach the corresponding positive fixture; for every allowed Section 5 operation/status/code combination attach the error fixture plus correct selected metadata. Apply HEAD suppression rather than attaching an error JSON example. Counterexamples carry expected rejection boundary/status/code and relevant earlier authority/integrity preconditions. Test both isolation of one failure and combined-failure precedence. Never send an unbound mock token to a live service and report it as an authorized positive operation.

## 12. Reproducible feature-by-feature evaluation

Review now by tracing each row through this document, its controlling source and the example companion. Future hands-on evaluation requires a separately authorized implementation, actual schemas/catalog/generator, isolated accounts/contexts, controlled clocks/concurrency/failure injection and recorded observations. All planned outcomes below are **unexecuted**. Preserve E1–E34, S1–S16 and the linked validation/async/Blueprint/email/tooling scenarios; these checkpoints supplement them.

| Checkpoint | Reproduce during implementation | Required observation / owner |
| --- | --- | --- |
| O1 — Identity and URL inventory | Enumerate all 27 entries; resolve server `/` and each full catalog path; compare IDs/tags/title/version | Exactly22+5 unique methods/IDs, exact single `/api`, no environment hostname/version path/new operation; catalog/generator owner |
| O2 — Export graph and roles | Trace all 115 exports to source/role; traverse emitted references; inject collision/missing reference/reader substitution | Complete inventory, exact names, reachable components, visible rejection of collisions/loss/role errors; shared-contract/generator owners |
| O3 — HTTP/body/metadata | Each GET/HEAD/DELETE: no content, Content-Type alone, small content,262144/262145 bytes; all POST/PATCH bodies/media; every success/error header case | Q13 exact400/413/415 distinctions with precedence; mandatory no-store/challenge/Retry-After/Allow;204 no body/Content-Type; HEAD no bytes/token header; server/transport owner |
| O4 — Completeness/PATCH/stages | Omit each required create field, add forbidden identity/email/query, send revision-only PATCH, omission/null and canonical no-op/stale cases | Correct raw400/canonical422 distinction, strict fields, required revisions/expressible PATCH presence, no premature title length or transforms; shared/server owners |
| O5 — Semantic parity | Well-formed/unpaired Unicode, exact/+1 code-point bounds, Unicode 17 icons, email grammar, Gregorian dates, exact UTC instants and canonical token trailing bits | Shared/browser/API agreement and generated expressible constraints; no converter loss disguised as runtime-only or format-only proof; shared/generator owners |
| O6 — Error applicability/safety | Each Section 5 code/status/operation binding and each field code; inject wrong-status/code,33 fields,unsafe paths/reflected secrets | Operation narrowing, safe deterministic first32/omission, whole-error rejection and generic safe uncertainty; server/shared/frontend owners |
| O7 — Security contexts/precedence | N/E/A/missing/invalid/duplicate cookie combinations, failed lookup, bad/missing/wrong-context Origin/CSRF, A on enrollment GET/HEAD | Q11 exact200/401/409/service outcomes, prior401/403/conflict precedence, no lower-permission bypass or false logout; server/browser-security owners |
| O8 — Domain/revisions/privacy | Two isolated accounts, coherent read vs cascade race, Task moves/standalone tasks, stale/no-op PATCH/DELETE, foreign IDs | Coherent private data, concealed absence, atomic serial effects and correct ordinary/deletion/Profile revision independence; server/domain owner |
| O9 — Creation/recovery | Same-key concurrency, raw whitespace mismatch, deleted resource/Project, expired/missing/unreliable evidence, paused executor; recovery overlong description | Correct201/200/202/409/service bindings; Q12 description422 before evidence; no canonical/domain recheck before eligible history; no unsafe replay/takeover/stale installation; server/frontend owners |
| O10 — Routing and HEAD | Unknown path, unsupported method on each known path, reserved recovery string, compare five GET/HEAD status/header pairs | Correct404endpoint/405Allow without extra routes; HEAD suppresses every body and renews no lifecycle/activity; server/generator owners |
| O11 — Lifecycle/abuse | Proof cap/expiry/one-time races, seven-day issuance cutoff, E 15min, activation/sign-in, session30min/24h, sign-out copied credential,60s activity and each catalog budget | Server-authoritative limits/atomic transitions/revocation, no passive renewal or account enumeration; cookie flags/clear legality, no leakage; security/server owners |
| O12 — Consumer/local independence | Invalid/extra response fields, malformed success after possible commit, late prior-account response, uncertain transitions/recovery, API unavailable in local/connected modes | Strict server output, tolerant validated reader projection, whole-read failure, account isolation/deliberate recovery; independent local MVP and no connected fallback; frontend owner |
| O13 — Generation guard | Supported constructs plus transforms/coercion/default/unknown/undeclared refinement, converter silently weakened constraints | Fail closed before artifact acceptance; every expressible predicate retained and unavoidable extra rule declared with owner/fixtures; generator/shared owners |
| O14 — Determinism and drift | Repeat unchanged generation, vary environment metadata, mutate reviewed bytes/format/reference/status/security, run verification while tracking file hash | Identical approved bytes; semantic and byte drift reported with safe actionable diagnostics; verification leaves reviewed artifact hash unchanged; generator owner |
| O15 — Example classification | Materialize all positive bodies/metadata and each binding; test counterexamples at declared boundary with proper authority/context | Positives pass actual appropriate schemas/bindings; negatives reject as expected; no placeholder promoted to validated example, no live-secret leakage; shared/server/generator owners |
| O16 — Imports and human observations | Run browser and compiled API imports, first-module client-tooling review; user exercises O1–O15 applicable features | Real package/runtime compatibility and recorded feature observations; automated passes and guide readiness do not establish human acceptance; implementation owner/user |

No concrete CI command, production file location, package install, live mail/API exercise or testing-strategy decision is authorized here. Implementation planning will make these reproduction steps executable and record versions/configuration, commands, expected versus observed outcomes, failures and evidence locations per module. Required security/transaction behavior must be demonstrated at its authoritative runtime boundary; document/example validation alone cannot establish it.

## 13. Approval traceability and final review

| Approval | Consolidated coverage |
| --- | --- |
| Q1 | §§1,9,11–12 planning artifact vs later generated/executable evidence |
| Q2 | §§3,7 exact 27 stable operationIds, schema identities and strict server wire roles |
| Q3 | §§5,11–12 and example companion, complete success/error/boundary coverage and safe fixtures |
| Q4 | §7 complete115 export inventory, reachable exact components and role/collision/reference rejection |
| Q5 | §§2–3 metadata/tags/version management; no URL versioning/hostname/deployment choice |
| Q6 | §§5,8–10 exact binding/guard/drift checks and safe actionable diagnostics |
| Q7 | §§2–3,12 origin-root server plus unchanged `/api/...` paths, exactly once |
| Q8 | §§4–6 cookie schemes, explicit per-operation alternatives, integrity/Origin/precedence/runtime limits |
| Q9 | §§8–9 all 13 stable runtime declarations, exact references/owners/evaluation, no competing rule policy |
| Q10 | §10 exact deterministic ordering/serialization, semantic plus byte verification without repair |
| Q11 | §§5–6,12 authenticated enrollment GET/HEAD conflict vs E success/missing-E/service failure |
| Q12 | §§4–5,8,12 initial preserved-description checks and later historical-evidence boundary |
| Q13 | §§4–5,12 prohibited content/cap/media precedence and irrelevant bodyless Content-Type |
| Q14 | Final confirmation of this complete specification, its companion and all O1–O16 checkpoints with no material discrepancies; bounded authorization to resolve only the owning decision |

Detailed evidence and independent consistency-review findings are recorded in the owning ticket. Planning checks inspect documentation inventories, identities, references, examples and approval traceability only. No production schemas/assembler/generation, executable validation, builds/application tests, browser/API/mail/transaction/security exercises or human implementation acceptance are established.

**Completed design review:** in Q14 the user explicitly confirmed Section 3's full mapping, Section 5's error/status/header applicability, security/runtime rules, all Q1–Q13 clarifications, all O1–O16 checkpoints and the complete example/counterexample companion. No material discrepancies were found and no further design revision was requested. This completes design review only.

**First concrete future evaluation action:** when a separately authorized implementation exists, start O1 by enumerating the 27 operation entries and resolving each root-server/catalog-path URL; verify identities, tags/version and exactly one /api prefix. Record actual observations before proceeding through applicable O2–O16. No implementation evaluation is authorized or executed here; human implementation acceptance remains pending.

**Resolution scope:** Q14 authorizes resolving only the owning decision, recording confirmation, updating the map/downstream references and documentation checks, then stopping. No subsequent ticket, application change, dependency install, production OpenAPI generation, commit or push is authorized. No new domain term or ADR is introduced.

## 14. Actual documentary preflight — 2026-10-25

Passed checks: 27 unique method/path/operationId entries;22 exact approved catalog matches plus five GET-derived HEAD counterparts; effective single-/api paths;115 exact public export names matched to independent source-rule expansion;60 parseable literal JSON fixture blocks; eight mock proof/CSRF occurrences with canonical43-character/32-byte encoding; exact seven-day completed-outcome fixture retention;22 approved error-code fixture matches;13 runtime declarations;13 approval rows;16 evaluation checkpoints; existing local link targets; authorized documentation-only scope; claimed/no-Answer lifecycle; documentation whitespace.

Independent consistency review found and corrected one missing sign-in email422 binding; focused recheck reported no remaining material issue. This does not broaden password eligibility disclosures. Detailed results are in the owning ticket. No executable shared-schema/example validation, generated OpenAPI production/validation, application tests/builds, browser/API/mail/security/transaction checks or user implementation observations were performed. Final design confirmation was supplied in Q14; human implementation acceptance remains distinct and pending.


Final workspace audit note: the earlier authorized-scope check passed before concurrent out-of-scope changes appeared. The final checkout additionally shows deletions of .agents/memory/MEMORY.md and .agents/memory/taskflow-product-boundary.md, plus an untracked .vscode/ directory. These were not made or modified by this decision work and were left untouched. This session edited only the owning ticket and its two linked design documents; the final checkout as a whole is therefore not documentation-only. No attribution or restoration of the unrelated changes is attempted.


Resolution preflight after Q14 also passed: all85 local links across six updated documents; Q1–Q14 traceability; exactly one resolved owning Answer/map entry; acyclic dependencies; unchanged lifecycle/assignee/dependency metadata for every other ticket; unchanged non-authorized file hashes and staged-index state; documentation whitespace. The map and existing downstream references now carry the approved design without starting their decisions. This update changes approval/lifecycle references only, introduces no further design revision and stops after the resolution report.
