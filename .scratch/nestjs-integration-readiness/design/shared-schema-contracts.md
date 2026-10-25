# Shared Schema-First contract specification

Decision owner: [Specify the shared Schema-First contracts](../issues/13-shared-schema-contracts.md).

Status: **approved on 2026-10-25**. Q17 explicitly confirmed this complete specification, all Q1–Q16 decisions and clarifications, the public schema inventory, endpoint coverage and S1–S16 evaluation guide with no material discrepancies. Unicode 17.0.0 is approved as the exact common classification baseline. The user authorized resolution of the owning decision and required documentation updates only, then stopping; no other decision is started. This is a design document, not a production contracts package, executable validator, generated OpenAPI document or implementation acceptance record.

## 1. Authority and scope

Apply the approved [Endpoint Catalog](endpoint-catalog.md), [schema tooling design](shared-schema-tooling.md), [validation policy](validation-policy.md), [frontend-facing contract](frontend-facing-contract.md), [Blueprint](api-architecture-blueprint.md), [async policy](async-operation-policy.md) and [MVP account email scope](account-email-scope.md). Later explicit approvals refine earlier detail deferrals. No known ADR conflicts exist; the repository has no `docs/adr/` directory. No new domain term is introduced by these technical schema roles.

`packages/contracts` is the future browser-safe, framework-independent authority for Zod 4 runtime wire schemas and inferred types. The authoritative operation catalog owns HTTP routing, methods, status bindings, security and schema references. OpenAPI 3.1 is derived from those authorities. Nest wrappers and validation adapters belong in the API application. UI state, drafts, snapshots, authorization, persistence and business enforcement are outside contracts. Physical source layout, export wiring, module format, dependency versions and compiled-runtime/browser compatibility remain implementation-planning work.

The inventory below specifies the planned public surface without creating it. No production package, generator, dependency, controller, frontend form, test or configuration is changed by this decision. Local modules remain independently operational, with explicit module authority and no connected-failure fallback.

## 2. Four roles and validation stages

| Role | Naming | Obligation |
| --- | --- | --- |
| Raw request | `...RequestSchema` | Strict wire fields/types, lexical validity and omission/null distinctions; do not enforce post-normalization length prematurely |
| Canonical value | `...CanonicalSchema` | Validate already normalized values; perform no transformations |
| Strict server response | `...ResponseSchema` | Validate authoritative canonical declared output; reject unknown fields at all declared object boundaries |
| Frontend reader | `...ResponseReaderSchema` | Validate every declared field recursively, accept/strip permitted extra object fields, and return a projection of known fields |

Compose each role from shared field definitions. Identical roles may share a definition internally, but public role names remain explicit. Reader projection is the only approved unknown-field removal; it is not known-value repair or normalization. Do not strip unknown request fields. Strip permitted extras at every declared response object boundary, including Workspace resources, authenticated account/session objects, creation resources, error envelopes and field-error objects. Arrays are fully validated; unknown enum/discriminant values are not additional fields.

Boundary pipeline: validate raw shape and lexical rules → explicitly normalize only approved fields outside schemas → validate canonical values → enforce domain/access rules at the authoritative operation boundary. Apply the catalog's earlier ingress/authority/integrity checks first. Its creation/recovery exception remains binding: after raw structural validation, consult existing scoped idempotency evidence before revalidating present canonical/domain conditions. Recovery retains the exact supplied values, not canonical reconstruction.

No schema silently trims, coerces, defaults, repairs, uppercases, substitutes nulls, normalizes dates or supplies missing create fields. Canonical validators test canonical form without producing it. A raw string containing an overlong whitespace margin may pass the raw stage and become valid after explicit trimming; the independent 262,144-byte ingress limit still applies.

Server output validation failure is a server failure, never a trustworthy successful payload. A possible committed mutation remains unconfirmed if its response is invalid. A frontend reader fails the whole read when any declared field/collection entry is invalid; retain previously validated same-account data only with stale/error feedback. Never partially salvage a response or collection.

## 3. Shared fields, enums and runtime predicates

Every named schema in this document has an inferred type with the final `Schema` suffix removed. No separately maintained interfaces or validator-specific public issue types. Table abbreviations refer to these public names, not competing definitions.

### 3.1 Public field inventory

| Exact public schema export | Required contract |
| --- | --- |
| `ResourceIdSchema` | Case-sensitive ASCII `^[A-Za-z0-9_-]{1,128}$`; opaque, no generation algorithm |
| `TaskIdSchema`, `ProjectIdSchema` | Resource ID syntax excluding the exact reserved string `creation-recovery` |
| `AccountIdSchema` | Resource ID syntax; immutable server-owned account identity |
| `RevisionSchema` | Same opaque ASCII syntax; revision equality only, no ordering/meaning inferred |
| `TaskStatusSchema` | Exactly `todo`, `in-progress`, `done` |
| `TaskPrioritySchema` | Exactly `low`, `medium`, `high`, `urgent` |
| `SecurityContextSchema` | Exactly `anonymous`, `enrollment`, `authenticated`; identifies bootstrap context, not authority granted by a JSON value |
| `CalendarDateSchema` | Exact YYYY-MM-DD; proleptic Gregorian, years 0001–9999, valid month/day/leap year; no instant conversion |
| `CanonicalInstantSchema` | Exact YYYY-MM-DDTHH:mm:ss.sssZ; same year/calendar rules; hour 00–23, minute/second 00–59, three millisecond digits |
| `OrdinaryTextRequestSchema` | String of well-formed Unicode scalar values; no unpaired surrogates; no ordinary-text normalization or icon visibility filter |
| `TaskTitleCanonicalSchema` | Well-formed, already trimmed, nonblank; at most 200 code points |
| `ProjectNameCanonicalSchema` | Well-formed, already trimmed, nonblank; at most 120 code points |
| `DisplayNameCanonicalSchema` | Well-formed, already trimmed, nonblank; at most 100 code points |
| `AssigneeCanonicalSchema` | Non-null label is well-formed, already trimmed, nonblank; at most 120 code points; nullability added at Task field use sites |
| `DescriptionSchema` | Well-formed string, 0–10,000 code points, preserved exactly including whitespace/newlines |
| `ProjectColorSchema` | Exactly `^#[0-9a-f]{6}$`; arbitrary lowercase RGB, not a six-preset enum; never lowercase/repair |
| `ProjectIconSchema` | Exactly one well-formed scalar representing an allowed visible letter/number/punctuation/symbol; reject whitespace, controls, combining marks, default-ignorable formatting/invisible values and multi-code-point sequences; preserve exactly |
| `EmailRequestSchema` | Raw ASCII ordinary unquoted single mailbox input, allowing only approved surrounding U+0020 margins and domain case variation; no wrappers/comments/literals/multiple mailboxes/embedded whitespace/controls; do not return a normalized value |
| `EmailCanonicalSchema` | Already canonical mailbox: no surrounding margins; local-part case/dots/plus preserved, domain lowercase; overall at most 254 ASCII characters and local part at most 64; eligible DNS/punycode labels; no implicit DNS/MX lookup |
| `PasswordRequestSchema` | Well-formed Unicode string without category Cc controls; no trimming, casing, truncation or premature enrollment-length check |
| `EnrollmentPasswordCanonicalSchema` | Already NFC, same Unicode/control rules, 15–128 code points; blocklist eligibility is an external domain obligation |
| `SignInPasswordCanonicalSchema` | Already NFC, same Unicode/control rules; no enrollment length/blocklist eligibility gate |
| `IdempotencyKeySchema` | Exactly 32 lowercase hexadecimal characters; random generation and operation/account scope are external obligations |
| `VerificationProofSchema`, `CsrfTokenSchema`, `AnonymousCredentialSchema`, `EnrollmentCredentialSchema`, `SessionCredentialSchema` | Separate semantic definitions sharing exact encoding: 32 bytes represented by 43 canonical unpadded base64url characters; validate canonical encoding, not character count alone; never substitute purposes |

Canonical base64url includes valid unused trailing bits and exact decode/re-encode equivalence, without accepting padded/noncanonical alternatives. Validation may inspect representations but never repair the supplied value. Purpose, randomness, binding, expiry and revocation cannot be established by the string schema. Credentials are transport/server-only data; no credential JSON response export is introduced.

Ordinary text allows valid multi-code-point emoji and combining sequences within code-point limits. `😀` is one code point; a joined emoji sequence can occupy several. It is eligible in ordinary text, but only the single scalar qualifies as an icon. Icon category/visibility rules do not apply to titles/descriptions. Well-formedness precedes length counting in raw/canonical/output roles; no replacement-character repair of malformed surrogates. A deliberately supplied valid U+FFFD is not evidence of a surrogate-repair step.

**Approved Q13:** ordinary text trimming means removal of leading/trailing ECMAScript WhiteSpace and LineTerminator characters, performed explicitly by the operation. It never trims descriptions or passwords; email trims U+0020 only. The icon predicate admits Unicode Letter/Number/Punctuation/Symbol categories, additionally excluding White_Space and Default_Ignorable_Code_Point values. The icon rejects unassigned and private-use values as well as the excluded categories above. **Approved Q17 baseline: Unicode 17.0.0**, used consistently for General_Category and Default_Ignorable_Code_Point classification. The local Node runtime reports Unicode 17.0; this observation motivates a concrete baseline without selecting or proving a browser/server implementation. Implementation must use the same classification baseline in both consumers and version-aware fixtures, rather than assume independently updated engine Unicode tables agree. Baseline changes that alter acceptance require explicit compatibility review. No database/library version is selected here. No font-dependent promise about glyph appearance is implied.

Dates use explicit lexical and semantic validation, never permissive rollover. Reject `0000-01-01`, `2027-02-29`, `2026-04-31`, `24:00`, leap seconds, offsets, variable precision and alternate ISO forms. No due-date timezone conversion or instant normalization. Dates such as `2028-02-29` and instants such as `2026-10-24T09:30:00.000Z` pass these component rules.

Email parsing must use a well-tested parser/validator in eventual implementation. Its selected raw grammar must accept the approved margins/domain case without transforming schema output or prematurely applying canonical length. Do not select a generic built-in email validator by name and assume it has this policy. Email/parser and Unicode compatibility require implementation evidence; they are not capabilities verified by this design.

### 3.2 Resource composition

| Resource | Exact fields; all required |
| --- | --- |
| Task | `id: TaskId`; canonical `title`, preserved `description`, `status`, `priority`; `projectId: ProjectId or null`, `dueDate: CalendarDate or null`, `assignee: canonical label or null`; `createdAt`, `updatedAt`: CanonicalInstant; `revision: Revision` |
| Project | `id: ProjectId`; canonical `name`, preserved `description`, `color`, `icon`; `createdAt: CanonicalInstant`; `revision`, `deletionRevision`: Revision |
| Profile | `accountId: AccountId`, canonical read-only `email`, canonical `displayName`, independent `revision: Revision` |

Export exactly `TaskResponseSchema`, `TaskResponseReaderSchema`, `ProjectResponseSchema`, `ProjectResponseReaderSchema`, `ProfileResponseSchema`, `ProfileResponseReaderSchema`. Reuse the exact Profile shape in authenticated envelopes; no `id` alias, audit timestamps, credential fields or stored avatar initials. Project has no invented `updatedAt`. Server-owned fields are absent from editable requests.

A complete Workspace is `{ projects: Project[], tasks: Task[] }`. Export `WorkspaceResponseSchema` and `WorkspaceResponseReaderSchema`. No pagination, filtering, truncation or order guarantee. Coherent membership, account scope, resource uniqueness and ownership are authoritative domain obligations; valid individual IDs cannot prove them.

## 4. Public request and canonical export inventory

Each row exports both `<Base>RequestSchema` and `<Base>CanonicalSchema`, with corresponding inferred types. This is a finite expansion rule: no additional public DTO family is implied. Canonical values remain operation inputs, not a new transport accepted in place of the raw request.

| Base | Exact body shape and stage distinctions |
| --- | --- |
| `TaskCreate` | Exactly seven required editable fields: title, description, status, priority, projectId, dueDate, assignee. Raw title/assignee permit approved trim margins; canonical checks trimmed constraints. Explicit null only for projectId/dueDate/assignee |
| `TaskPatch` | Required expectedRevision; optional seven editable fields with identical field rules; at least one editable field must be present |
| `ProjectCreate` | Exactly name, description, color, icon, all required; raw/canonical name stages as above |
| `ProjectPatch` | Required expectedRevision; optional name/description/color/icon; at least one editable field |
| `ProfilePatch` | Exactly expectedRevision and displayName, both required; reject accountId/id/email and all unsupported fields |
| `Registration` | Exactly email; raw and canonical email policies |
| `VerificationResend` | Exactly email; shares Registration definitions, explicit operation-facing export names |
| `VerificationConfirm` | Exactly token: VerificationProof; canonical role does not establish token authority |
| `EnrollmentComplete` | Exactly displayName and password; explicit display-name trim and password NFC precede canonical checks |
| `SignIn` | Exactly email and password; explicit email normalization and password NFC; no enrollment-only length/blocklist rejection |
| `EmptyObject` | Exactly `{}`; used for enrollment leave, sign-out and activity; never absence/null or a body carrying activity timestamps |

Recovery bodies use the exact `TaskCreateRequestSchema` or `ProjectCreateRequestSchema`, not a new reconstructed schema or current canonical resource. Recovery does not require running the create canonical stage again before existing evidence; its original-input identity must survive. No public recovery canonical-body alias is exported because it could imply canonical equivalence or new execution.

Raw description constraints apply immediately because descriptions are not normalized. Color and lexical date/ID/token rules apply in raw validation; canonical field values cannot relax them. Icon raw checks require a well-formed single scalar; its allowed visibility/category predicate is a canonical-value constraint. Enum membership fails raw validation. Whitespace-only names/labels reach canonical nonblank validation. Empty required password reaches enrollment canonical minimum after NFC, while a Unicode-valid sign-in candidate cannot authenticate through an eligibility error.

Omitted PATCH fields remain omitted; explicit null clears only the three supported Task fields. `description: ""` is valid; null description is not. Required fields with null are INVALID_TYPE; absent fields are REQUIRED. No defaults. Canonical no-op updates still compare expectedRevision and return current resources without revision/time advances. Server domain operations enforce this behavior, not shared structural schemas.

## 5. Public success-envelope inventory

Each row exports `<Base>ResponseSchema` and `<Base>ResponseReaderSchema`, with corresponding inferred types. Nested resources reuse Section 3 and preserve the role's strict/tolerant object policy.

| Base | Exact required JSON shape |
| --- | --- |
| `Accepted` | `{ state: "accepted", message: "If this request is eligible, check your email." }`; literal acknowledgement, no delivery/existence claim |
| `Enrollment` | `{ state: "enrollment-required", email: EmailCanonical, enrollmentExpiresAt: CanonicalInstant }` |
| `EnrollmentActivated` | `{ state: "activated", next: "sign-in" }`; activation does not sign in |
| `Authenticated` | `{ state: "authenticated", account: Profile, session: { inactivityExpiresAt: CanonicalInstant, absoluteExpiresAt: CanonicalInstant } }` |
| `Unauthenticated` | `{ state: "unauthenticated" }`; only reliably established lack of valid authenticated authority |
| `Session` | Union of exactly Authenticated and Unauthenticated; no added lifecycle states |
| `CsrfBootstrap` | `{ context: SecurityContext, csrfToken: CsrfToken }`; never a credential field |
| `CreationPending` | `{ state: "in-progress" }` |
| `TaskCreationCompleted` | `{ state: "completed", evidence: "original-creation", resource: Task, completedAt: CanonicalInstant, retainedUntil: CanonicalInstant }` |
| `ProjectCreationCompleted` | Same completed shape with Project, never interchangeable resource types |

Response status binds these payloads per operation: a 202 creation is pending, not an accepted registration; 201/200 completed creation has the appropriate resource type. A malformed or wrong-status envelope never establishes success. 204 and HEAD carry no JSON body and have no invented `{}`/null response schema.

Completed creation metadata and resource snapshot describe immutable original evidence, retained seven days after completion. Replays do not alter it. The historical resource may subsequently be modified/deleted: never install it over newer Workspace state; request a fresh coherent read. Retention arithmetic, expiry and recorded-outcome atomicity are external obligations. Missing/expired evidence is not permission to recreate. In-progress 202 authorizes no automatic polling or replay.

## 6. Transport metadata and public security inventory

**Approved Q15–Q16:** the exact descriptor shapes, metadata role exports and header serialization rules below complete the earlier policy. Public metadata remains traceable to the Endpoint Catalog, with these later approvals refining its previously unspecified representation details.

Schemas validate a selected metadata projection, not the entire HTTP header map, all browser cookies or a grant of authority. Unrelated HTTP headers/cookies are not automatically forbidden. Preserve original duplicate/framing evidence before projection; parsed maps alone cannot demonstrate single unambiguous values. Frontend code must never read HttpOnly credentials. Canonicalizing selected header *names* for lookup/error paths is transport extraction, not permission to repair invalid header values or JSON fields.

### 6.1 Public metadata scalar exports

| Exact public export | Selected value representation |
| --- | --- |
| `OriginHeaderSchema` | String containing one serialized HTTPS origin, no credentials/path/query/fragment or null/multiple origins. Runtime operation checks exact configured origin without silently accepting an equivalent spelling |
| `JsonContentTypeSchema` | String with case-insensitive application/json media type, optionally one charset=utf-8 parameter (quoted or unquoted value); the charset parameter name and UTF-8 value are also case-insensitive. HTTP spaces/tabs around parameter separators and the outer value are permitted. For example, `Application/JSON; CHARSET="UTF-8"` is accepted. No other/duplicate parameters, malformed syntax or non-UTF-8 charset. Server emits application/json; charset=utf-8 |
| `RetryAfterSchema` | String of nonnegative decimal integer delta-seconds, canonical 0 or nonzero-leading digits; numerical value must be a safe integer. Server chooses appropriate delay from authoritative budgets; no HTTP-date variant, signs, fractions, leading-zero alternatives or other ambiguous encoding |
| `AllowHeaderSchema` | Nonempty canonical comma-space-separated supported method names, no duplicates, in GET → HEAD → POST → PATCH → DELETE order, restricted to methods actually supported by the matched catalog path. Do not infer OPTIONS/CORS permission |
| `SecurityCookieNameSchema` | Exactly __Host-taskflow-anonymous, __Host-taskflow-enrollment or __Host-taskflow-session |

Origin syntax and media parsing need explicit adapters/predicates and fixtures, not permissive URL/MIME repair. No trailing-slash/default-port/case rewrite may convert a mismatching Origin into authorization. Security-sensitive header duplicates remain invalid even if a parser would join or overwrite them. An appropriate numeric retry value does not itself prove correct rate-limit enforcement.

### 6.2 Exact selected request object exports

Objects below are strict for their declared selected keys; required keys are required unless explicitly optional. Integrity/JSON/creation/deletion composition reuses the same fields. Every export has its inferred type by suffix removal. HTTP key spellings below are literal canonical public names.

| Exact export | Exact selected shape |
| --- | --- |
| `TaskPathRequestSchema` | `{ id: TaskId }` |
| `ProjectPathRequestSchema` | `{ id: ProjectId }` |
| `NoQueryRequestSchema` | Exactly `{}`; any query parameter rejected |
| `RequestIntegrityHeadersRequestSchema` | `{ Origin: OriginHeader, "X-CSRF-Token": CsrfToken }` |
| `JsonBodyHeadersRequestSchema` | `{ "Content-Type": JsonContentType }` |
| `CreationHeadersRequestSchema` | Integrity and JSON fields plus `{ "Idempotency-Key": IdempotencyKey }` |
| `TaskDeleteHeadersRequestSchema` | Integrity fields plus `{ "X-Expected-Revision": Revision }`; no Content-Type/body requirement |
| `ProjectDeleteHeadersRequestSchema` | Task deletion fields plus `{ "X-Expected-Deletion-Revision": Revision }` |
| `SecurityCookiesRequestSchema` | Optional keys "__Host-taskflow-anonymous": AnonymousCredential, "__Host-taskflow-enrollment": EnrollmentCredential, "__Host-taskflow-session": SessionCredential; no fabricated absent/null cookie values |

Request metadata has no separately normalized Canonical role: its raw selected values are checked as supplied. These schemas do not replace auth/context selection: malformed/missing selected integrity data yields catalog 403 after required-authority precedence, not blanket 400. Invalid credentials grant nothing; missing/invalid authority and unreliable lookup retain distinct 401/service outcomes. Cookie syntax failure is not proof of server-side logout/revocation. Never echo header/cookie values as field diagnostics.

### 6.3 Finite response-header roles

For every Base below export `<Base>ResponseSchema` and `<Base>ResponseReaderSchema`, plus inferred types. Server role validates its exact selected object. Reader validates declared values and projects selected known headers while permitting unrelated headers. In particular, projection must not access credentials through Set-Cookie or require a frontend to inspect HttpOnly cookie values. This header projection is separate from JSON body projection; no HEAD/204 body is invented.

| Base | Exact selected shape |
| --- | --- |
| `NoStoreHeaders` | `{ "Cache-Control": "no-store" }` |
| `JsonHeaders` | NoStore fields plus Content-Type; strict server schema requires literal `application/json; charset=utf-8`, while reader uses JsonContentType's permitted forms |
| `AuthenticationRequiredHeaders` | JsonHeaders fields plus `{ "WWW-Authenticate": 'TaskFlow realm="TaskFlow"' }` |
| `RateLimitedHeaders` | JsonHeaders fields plus `{ "Retry-After": RetryAfter }` |
| `MethodNotAllowedHeaders` | JsonHeaders fields plus `{ Allow: AllowHeader }` |
| `NoContentHeaders` | Exactly NoStore selected fields; independent runtime assertion forbids Content-Type on 204, since a projection must not hide a prohibited header |

HEAD uses the corresponding GET/status-specific selected header schemas and no body. It can retain JSON Content-Type from GET even though no content is sent. Applicable 401/429/405 metadata remains present. Public response header readers validate accessible HTTP metadata; extracting a selected subset never waives a mandatory/prohibited-header check. Case-insensitive header-name access uses canonical selected keys, without changing supplied values. There is no frontend cookie descriptor reader.

### 6.4 Exact server-only cookie descriptors

Export `SecurityCookieIssueSchema` and `SecurityCookieClearSchema`, with inferred types. These are server transport descriptors, never API JSON payloads, browser state or exposed response fields. Never include Set-Cookie credential values in frontend reader output, logs, diagnostics or generated example payloads; schema exports contain definitions, not credential instances. All keys below are literal and required; unknown keys fail. Cookie name/value pairing is a strict union by name, using the corresponding purpose-specific credential schema.

Issue descriptor: `{ name: SecurityCookieName, value: matchingCredential, secure: true, httpOnly: true, sameSite: "Lax", path: "/" }`. No Domain, Expires or Max-Age descriptor field is allowed. The HTTP serializer preserves the exact __Host name/host-only scope and approved flags; server lifetime is enforced independently.

Clear descriptor has the same name/flags/path with `value: ""`, and exactly one of `{ maxAgeSeconds: 0 }` or `{ expiresAt: CanonicalInstant }`. For the latter, server runtime verifies the chosen instant is already expired. No issue credential, Domain or extra fields. The serializer emits the corresponding Max-Age=0 or expired Expires representation; the descriptor instant is not a claim that Set-Cookie uses JSON timestamp syntax. Match the original name/host/path and do not claim server revocation from clearing alone.

Origin equality, CSRF binding, descriptor name/value purpose, legal issuance/clearing transitions and header serialization are operation/server obligations. Encoding validity is insufficient. Cookie expiry is server-enforced: anonymous 30 minutes; enrollment 15 minutes; authenticated earlier of 30-minute inactivity and 24-hour absolute. No persistent browser credential store or remember-me.

Creation responses have no Location. No new GET-resource routes arise from header validation. HEAD observes corresponding GET status/headers and no body, without lifecycle/activity transitions; bootstrap HEAD may only establish permitted anonymous context and cannot expose a CSRF token in headers. Session/enrollment GET and ordinary calls never renew activity. These metadata contracts are owned here; the OpenAPI owner faithfully represents them without independently selecting a second grammar or descriptor shape.

## 7. Error schema, mappings and bounded diagnostics

Public exports: `OperationErrorCodeSchema`, `FieldErrorCodeSchema`, `ErrorLocationSchema`, `ErrorPathSchema`, `FieldErrorResponseSchema`, `FieldErrorResponseReaderSchema`, `ApiErrorResponseSchema`, `ApiErrorResponseReaderSchema`. Inferred types follow the same suffix rule.

Exact JSON: `{ error: { code, message, fieldErrors?: [{ path, code, message }] } }`. Top-level code comes exclusively from the catalog operation-error inventory. Field codes are a distinct enum, even where PROJECT_UNAVAILABLE has the same spelling. No snapshots/replacement revisions in stale errors. Strict output and tolerant readers share all declared constraints. An unfamiliar top-level or field code invalidates the complete received error; do not broaden enums, partially use entries or render its message.

### 7.1 Complete operation-error inventory

| HTTP | Operation error codes |
| --- | --- |
| 400 | MALFORMED_REQUEST, REQUEST_VALIDATION_FAILED, VERIFICATION_PROOF_INVALID |
| 401 | AUTHENTICATION_REQUIRED, ENROLLMENT_REQUIRED, INVALID_CREDENTIALS |
| 403 | REQUEST_INTEGRITY_FAILED |
| 404 | RESOURCE_NOT_FOUND, ENDPOINT_NOT_FOUND |
| 405 | METHOD_NOT_ALLOWED |
| 409 | STALE_REVISION, STALE_PRECONDITION, AUTH_CONTEXT_CONFLICT, IDEMPOTENCY_PAYLOAD_MISMATCH, CREATION_OUTCOME_UNAVAILABLE |
| 413 | REQUEST_TOO_LARGE |
| 415 | UNSUPPORTED_MEDIA_TYPE |
| 422 | VALIDATION_FAILED, PROJECT_UNAVAILABLE |
| 429 | RATE_LIMITED |
| 500 | INTERNAL_ERROR |
| 503 | SERVICE_UNAVAILABLE |

An operation decoder must check HTTP status plus the operation's applicable code and body shape, not accept every supported code as every operation's outcome. Preserve catalog precedence, higher-context conflicts, privacy and concealment. No new status/code is added here.

### 7.2 Deterministic field mappings

| Condition | Field code | Stage/observable classification |
| --- | --- | --- |
| Required field/header absent | REQUIRED | Raw structural 400, except earlier authority/integrity/ingress outcomes |
| Wrong type/unsupported null | INVALID_TYPE | Raw 400 |
| Forbidden field/query | UNKNOWN_FIELD | Raw 400; safely attributed path |
| Malformed Unicode, date/instant/ID/token/color/email lexical syntax | INVALID_FORMAT | Raw lexical 400 when this stage is applicable; do not override security/token authority precedence |
| Unsupported status/priority enum | INVALID_VALUE | Raw 400 |
| Canonical nonblank/trim/NFC requirement or icon allowed-category failure | INVALID_VALUE | Canonical 422 for eligible request validation; invalid server output is never a client rejection |
| Applicable canonical minimum/maximum length | TOO_SHORT / TOO_LONG | Canonical 422; description preserved-value maximum can be checked raw as a canonical constraint without changing its 422 classification |
| Revision-only/empty Task or Project PATCH | NO_CHANGES | Raw 400 at body path; missing required revision may also yield REQUIRED |
| Enrollment full-candidate blocklist rejection | PASSWORD_NOT_ALLOWED | Domain eligibility 422 VALIDATION_FAILED; never public sign-in eligibility detail |
| Unusable Project assignment | PROJECT_UNAVAILABLE | Domain 422 PROJECT_UNAVAILABLE for both missing and inaccessible projects |

Dates also require semantic calendar validity; impossible dates map INVALID_FORMAT/400, not permissive rollover. A multi-code-point icon maps INVALID_FORMAT/400; a single disallowed invisible scalar maps INVALID_VALUE/422. In canonical validation an empty normalized required name/label maps INVALID_VALUE; empty enrollment password after NFC maps TOO_SHORT. Code-point maximum violations always map TOO_LONG; never UTF-16 length. Malformed email syntax is structural/lexical; email canonical-length violation is TOO_LONG/422 after approved normalization. Raw email lexical validation must permit exactly the approved U+0020 margins without silently returning transformed text.

Mapping order within a field is missing → type → well-formedness/lexical or enum → canonical form/nonblank → length → relevant domain eligibility, stopping dependent checks that would be meaningless after earlier failure. This is diagnostic ordering, not permission to skip earlier catalog-level auth/CSRF/ingress/context or creation-evidence checks. Domain checks must not run to populate extra diagnostics after an earlier required-authority failure. Service/security/privacy errors may omit fieldErrors entirely. A validly encoded but unusable proof is VERIFICATION_PROOF_INVALID, not evidence of a malformed body. No blocklist/length field eligibility is exposed by sign-in.

### 7.3 Path, message and selection rules

- Every entry has path, supported field code and safe message. Path starts with body/headers/path/query and contains 1–16 segments total. Further named segments contain 1–128 well-formed Unicode code points; numeric segments are nonnegative safe integers. Location-only paths are valid.
- Top-level/field messages contain 1–300 well-formed Unicode code points. Present fieldErrors contains 1–32 complete entries; otherwise omit it. No empty arrays or fabricated field attribution. If no useful field attribution remains after safe construction, omit fieldErrors and retain safe operation-level feedback.
- Paths/messages never contain supplied values, credentials, tokens, password material, exceptions or internal details. A recognized safe forbidden field such as accountId may be named. Untrusted arbitrary/long/malformed/sensitive keys are replaced by the nearest safe containing-object path during diagnostic construction, not reader-side repair. Retain the error, not the unsafe key.
- **Approved Q14:** after applicable-stage failures are mapped and paths sanitized, deduplicate identical path/code pairs, order locations body → headers → path → query, compare path segments left-to-right (prefix first, numbers numerically, numbers before names, names by Unicode code-point order), break equal-path ties by the explicit field-code precedence below, then retain the first 32. Exact field-code precedence is REQUIRED → INVALID_TYPE → UNKNOWN_FIELD → INVALID_FORMAT → INVALID_VALUE → TOO_SHORT → TOO_LONG → NO_CHANGES → PASSWORD_NOT_ALLOWED → PROJECT_UNAVAILABLE. Never locale-sort or use schema-library issue enumeration order. For each sanitized path/code pair, select the same fixed, bounded server-controlled message template (for the configured response language), independent of traversal order or submitted data; do not select a message from competing reflected candidate text.
- This bounded subset does not change rejection, status or top-level code. A safe top-level message remains even when some field diagnostics are omitted. For failures with uncertain domain completion, it must not claim no commit merely because a service error is returned.
- Readers validate the entire envelope, all codes, messages and paths before use; reject rather than truncate, repair or partially accept invalid diagnostics. Recognized editable paths map inline; unsupported/non-editable paths retain safe visible operation feedback. Unknown future codes are unsupported contracts, unlike permitted extra JSON object fields.

Generic 500/503, malformed success/error or post-dispatch transport failure do not prove noncommit. Show safe generic feedback when validation fails; preserve original submission and deliberate recovery where outcome is uncertain. Fail closed for protected access, never restore demo/local authority. Only validated applicable authoritative rejection proving noncommit permits definite-failure handling.

## 8. Complete operation-to-schema traceability

Abbreviations below are exact bases expanded by Sections 3–7. `R` means RequestSchema, `C` CanonicalSchema, `S` ResponseSchema, `F` ResponseReaderSchema; each success S has its paired F. Every route also uses NoQueryRequestSchema, applicable NoStore metadata and applicable ApiError S/F plus operation/status binding. Every POST/PATCH uses declared JSON metadata and context-bound integrity; DELETE uses integrity but no JSON body. GET/HEAD have no request body. Authority and every applicable failure remain as the catalog defines.

| Method and path | Body exports/stage | Additional selected metadata | Success exports/status |
| --- | --- | --- | --- |
| GET /api/workspace | None | Authenticated context | 200 Workspace S/F |
| POST /api/tasks | TaskCreate R/C, existing-evidence exception | CreationHeaders R | 201/200 TaskCreationCompleted S/F; 202 CreationPending S/F |
| PATCH /api/tasks/{id} | TaskPatch R/C | TaskPath R; integrity | 200 Task S/F |
| DELETE /api/tasks/{id} | None | TaskPath R; TaskDeleteHeaders R | 204 bodyless |
| POST /api/projects | ProjectCreate R/C, existing-evidence exception | CreationHeaders R | 201/200 ProjectCreationCompleted S/F; 202 CreationPending S/F |
| PATCH /api/projects/{id} | ProjectPatch R/C | ProjectPath R; integrity | 200 Project S/F |
| DELETE /api/projects/{id} | None | ProjectPath R; ProjectDeleteHeaders R | 204 bodyless |
| POST /api/tasks/creation-recovery | Original TaskCreate R only | Original CreationHeaders R/key | 200 TaskCreationCompleted S/F; 202 CreationPending S/F |
| POST /api/projects/creation-recovery | Original ProjectCreate R only | Original CreationHeaders R/key | 200 ProjectCreationCompleted S/F; 202 CreationPending S/F |
| GET /api/profile | None | Authenticated context | 200 Profile S/F |
| PATCH /api/profile | ProfilePatch R/C | Integrity | 200 Profile S/F |
| GET /api/auth/csrf | None | Selected applicable SecurityCookies R | 200 CsrfBootstrap S/F |
| POST /api/auth/registrations | Registration R/C | Anonymous integrity | 202 Accepted S/F |
| POST /api/auth/verification/resend | VerificationResend R/C | Anonymous integrity | 202 Accepted S/F |
| POST /api/auth/verification/confirm | VerificationConfirm R/C | Applicable selected-context integrity | 200 Enrollment S/F; restricted cookie issue |
| GET /api/auth/enrollment | None | Enrollment context | 200 Enrollment S/F |
| POST /api/auth/enrollment/complete | EnrollmentComplete R/C | Enrollment integrity | 200 EnrollmentActivated S/F; restricted cookie clear |
| POST /api/auth/enrollment/leave | EmptyObject R/C | Enrollment integrity | 204 bodyless; restricted cookie clear |
| POST /api/auth/sign-in | SignIn R/C | Anonymous integrity | 200 Authenticated S/F; fresh session cookie |
| GET /api/auth/session | None | Relevant presented context | 200 Session S/F |
| POST /api/auth/sign-out | EmptyObject R/C | Authenticated integrity | 204 bodyless; initiating session cookie clear |
| POST /api/auth/session/activity | EmptyObject R/C | Authenticated integrity | 200 Authenticated S/F |

Five exact HEAD counterparts: `/api/workspace`, `/api/profile`, `/api/auth/csrf`, `/api/auth/enrollment`, `/api/auth/session`. Each reuses its GET request/authority/status/metadata contract, suppresses every success/error body and does not acquire a payload schema. Include no-store, applicable 401 challenge, rate-limit/method metadata and relevant permitted bootstrap cookie behavior; never a token response header. There are 22 explicit operations plus five HEAD methods, not 27 independently defined payload authorities.

Auth mutations are not generic task-creation-idempotent operations. Preserve lost verification/completion/leave recovery from the catalog: deliberate enrollment observation or fresh proof within issuance rules, deliberate sign-in after uncertain completion, deliberate authority observation after uncertain leave. Never replay automatically, infer failure from absent evidence or reopen active enrollment. Neither schema enums nor response unions add lifecycle product states beyond those already approved.

## 9. Runtime-only declarations and generation obligations

The following identifiers are public design-time rule declarations, not a new wire enum or production registry. Every eventual rule must trace to its field/operation, runtime owner, generated representation and evidence. A rule being declared does not establish enforcement.

| Declaration | Owner and required treatment |
| --- | --- |
| U1 — Unicode validity/counting | Shared raw/canonical/output/readers enforce scalar well-formedness and exact code-point lengths; verify cross-runtime behavior rather than assume ordinary string length is suitable |
| U2 — Icon predicates | Shared validators enforce single scalar/category/visibility; use the approved single Unicode 17.0.0 baseline and test supplementary, combining, joiner, variation-selector and invisible cases |
| U3 — Canonical checks | Shared canonical/output/readers reject noncanonical known values; operations explicitly trim/email-normalize/NFC as applicable; schemas never perform normalization |
| D1 — Calendar validity | Shared runtime checks real proleptic Gregorian dates/ranges; generated lexical constraints alone do not establish leap-year/month semantics |
| T1 — Canonical token encoding | Shared runtime checks exact canonical base64url encoding; randomness/purpose/binding/revocation are separate server obligations |
| E1 — Mailbox grammar | Approved parser/policy compatibility is demonstrated in shared/browser/API validation; do not replace it with a permissive approximate regex |
| P1 — PATCH changes | Express required expectedRevision plus at least one editable field in schemas and generated constraints where possible; omission/null semantics remain exact |
| X1 — Diagnostic safety/bounds/order | Shared shapes validate bounds; server constructs safe bounded ordered diagnostics without reflecting secrets; shape validation alone cannot prove message safety |
| H1 — HTTP ingress/metadata | Server validates original bytes, duplicates/framing, cookies/headers, UTF-8/media/size, Origin and CSRF; parsed-object schemas alone cannot detect evidence already lost |
| B1 — Domain authority/consistency | Server enforces private ownership, coherent snapshot, relationships, revision/no-op/deletionRevision/cascade semantics, serial committed effects and foreign-resource concealment |
| I1 — Creation evidence | Server enforces account/operation scope, original raw equivalence, concurrency-safe reservation/commit/outcome recording, seven-day retention, gap-free cleanup and account-lifetime consumed-key evidence; never unsafe takeover/replay |
| A1 — Lifecycle/security/time | Server enforces proof purpose, 30-minute lifetime/three-valid-proof cap, seven-day pending issuance/retirement, 15-minute enrollment, one-time activation, context rotation/conflicts, 30-minute/24-hour session expiry, sign-out revocation, 60-second activity coalescing and all catalog abuse budgets |
| C1 — Consumer authority/uncertainty | Frontend validates status/body/metadata, isolates account drafts/results, rejects invalid whole reads and handles unsupported/malformed outcomes without automatic replay or local fallback |

JSON Schema/OpenAPI must preserve all expressible lexical patterns, enums, required/nullable distinctions, object policies, lengths and PATCH-presence constraints. Where a format annotation alone cannot establish semantic validity, document the additional runtime rule explicitly. Reader stripping is runtime projection; do not describe its accepted extra fields as closed objects. Strict server output uses its declared closed object model. Scalar/purpose distinction does not make the security properties of a token machine-verifiable.

A generator limitation is not automatically an OpenAPI expressiveness limitation. The OpenAPI owner must determine faithful representation against the actual selected implementation, not silently label convertible constraints runtime-only. Fail-closed feature guards reject unsupported/undeclared/lossy schema constructs before native conversion. Allow unavoidable runtime-only predicates only when explicitly declared with their exact rules and parity fixtures; converter success is insufficient. Never use an empty/any schema to conceal loss. Preserve deterministic output, unique schema/operation identities, valid references and catalog status/security/HEAD coverage. Production guard/assembler capability is still unimplemented and unverified.

## 10. Compatibility examples and consumer obligations

| Scenario | Required result |
| --- | --- |
| Task create omits assignee vs supplies null | Missing required field fails; explicit null succeeds structurally |
| Task PATCH omits dueDate vs supplies null | Omission preserves, null clears; unsupported null description fails |
| 200-code-point title plus whitespace vs 201 canonical code points | First passes after explicit trim; second TOO_LONG/422; raw UTF-16 length is not authority |
| Profile input includes email/accountId/id | Strict request rejects unsupported fields; target identity comes only from authenticated context |
| Profile appears in session | Exact accountId/email/displayName/revision contract, no competing id alias |
| Color #558b73 vs #558B73/#abc/red/alpha | First passes, alternatives fail without repair |
| Icon A/ن/😀 vs combining mark/joined emoji/invisible | Visible single scalars pass; prohibited values/sequences fail; local uppercase/slicing is not an API rule |
| Ordinary description contains joined emoji/newlines | Preserve valid scalar sequence and whitespace within 10,000 code points; do not apply icon rules |
| New response object property vs unknown declared enum/error code | Permitted extra stripped; invalid declared value fails complete payload |
| One malformed nested Task in Workspace | Whole-read failure; no partial authoritative commit |
| Valid error has unfamiliar editable location | Safe operation feedback remains visible; never silently discard |
| Unsupported code or 33 field errors | Entire error rejected; generic safe feedback and applicable uncertain-outcome recovery |
| Recovery payload has different whitespace but same canonical title | Original supplied values differ; matching evidence permits mismatch response; never canonical equivalence |
| Resource deleted after recorded creation | Historical completed result remains original evidence within retention, not current resource restoration |
| Sign-in password outside enrollment length but valid Unicode | Generic INVALID_CREDENTIALS if unsuccessful; never TOO_SHORT/PASSWORD_NOT_ALLOWED eligibility disclosure |
| Invalid or unsupported response after possible mutation commit | Unconfirmed outcome, preserved submission and deliberate recovery; no success/rollback inference |

Required request additions, removal/type changes to declared response fields, enum expansion, error-code changes and newly restrictive constraints require explicit compatibility review/coordinated consumers. Additional response-field tolerance does not authorize silently accepting unknown values of declared fields. No speculative API versioning or automatic migration is selected. Public role changes and Unicode baseline changes that alter acceptance also require compatibility review.

When connecting the Project forms, reconcile icon preservation/scalar handling and ensure lowercase RGB submission. Current browser-local uppercase/UTF-16 slicing behavior is not copied into backend normalization. Keep unrelated local behavior unchanged. Before the first real module integration, revisit typed client generation/tooling and prove package imports in both browser and compiled API environments, as the tooling decision requires. Shared types alone do not prove end-to-end safe API calls.

## 11. Feature-by-feature design review and future hands-on evaluation

Use this checklist to review the design now. During later implementation, execute each applicable case through raw HTTP/shared validators/server output/frontend readers and record observations separately. These expected outcomes are not executed tests. Preserve the catalog's E1–E34, validation-policy scenarios, Blueprint scenarios, account-email checks and async recovery scenarios in addition to this checklist.

| Checkpoint | Reproduction and expected observation |
| --- | --- |
| S1 — Roles/authority | Trace one Task title through raw→external trim→canonical→domain→strict output→reader. Reject duplicate contract definitions/transforms. Extra response fields strip recursively; unknown request fields fail |
| S2 — Resource identity/fields | Compare Task/Project/Profile exact inventories, independent revisions and metadata. Profile session representation is identical; email immutable; no added avatar/timestamps |
| S3 — Completeness/null/PATCH | Omit each create field, send null/empty descriptions, revision-only PATCH and no-op revision match/mismatch. Confirm approved distinctions and revision behavior |
| S4 — Unicode/limits | Test supplementary and multi-code-point ordinary text, unpaired surrogates, trim margins, exact/over-limit strings and preserved descriptions; no replacement repair or premature length |
| S5 — Color/icon | Exercise accepted arbitrary RGB and A/ن/😀; reject uppercase/shorthand/alpha, malformed surrogate, combining mark, invisible, unassigned/private-use and multi-code-point icon; compare version-aware browser/server fixtures against the pinned Unicode baseline; no uppercase/truncation |
| S6 — Dates/instants | Test leap years 1900/2000/2028, years 0000/0001/9999, impossible dates, offsets, leap seconds, 24:00 and fractional precision; no rollover/timezone conversion |
| S7 — Requests/headers/cookies | Directly bypass form checks, test unknown queries, duplicate original JSON/header/cookie evidence, missing delete headers, bodyful GET/HEAD/DELETE, exact {} operations and ingress limits. Preserve earlier authority/integrity precedence |
| S8 — Error mappings/safety | Trigger each public field code at its allowed stage and every applicable operation code/status. Verify field/top-level separation, safe paths/messages, known forbidden fields and no reflection of arbitrary sensitive keys |
| S9 — Diagnostic bounds/order | Generate >32 candidate failures, reorder input members, test unsafe-name fallback, equal path/code duplicates/fixed messages and path ordering; output deterministic bounded subset; omit fieldErrors if no useful attribution remains. Reader rejects empty/oversized arrays/messages/paths, malformed Unicode, unsafe indices and unfamiliar codes without partial use |
| S10 — Response/read integrity | Add nested extra fields and invalid declared fields/collection members; server strict output rejects extras, frontend projects permitted extras but rejects invalid payloads completely; no repair |
| S11 — Creation/recovery | Concurrent same-key creation, differing raw whitespace, pending, completed replay, deletion after completion, seven-day boundary, missing evidence and unreliable lookup. Preserve original evidence, no duplicate/restart/recreation or stale snapshot installation |
| S12 — Authentication | Registration/resend generic ack; proof encoding/purpose/expiry/cap; same-account enrollment replacement; explicit activation then sign-in; NFC/blocklist scope; no credentials in JSON; exact Profile reuse |
| S13 — Context/session | Higher-context conflicts, CSRF/Origin/malformed credentials, trustworthy unauthenticated vs failed lookup, cookie issue/clear, revocation, session expiry/activity and foreground coalescing. No observation renewal/authority downgrade/local fallback |
| S14 — HEAD/HTTP | Compare each of five HEAD responses to corresponding GET status/headers, with no body/token header; test no-store/401 challenge, exact JSON media/charset rules, canonical integer Retry-After, catalog-only ordered Allow and 204 without JSON content; never expose cookie credentials through reader output/examples |
| S15 — Compatibility/uncertainty | Extra fields vs enum/code change; invalid success/error after possible commit; late prior-account results; deliberate recovery and drafts. Generic errors never fabricate rejection/permission |
| S16 — Generation/build/local independence | Trace every schema/rule to generated coverage or explicit runtime declaration; reject lossy/unsupported conversion; prove browser/API import compatibility later. Exercise independent local MVP with API unavailable, without connected fallback |

## 12. Approval traceability, preflight and handoff

| Approved round | Consolidated coverage |
| --- | --- |
| Q1 | Sections 1–2, four roles, external normalization, contracts exclusions |
| Q2 | Section 3 Profile and authenticated account reuse |
| Q3 | Section 3 color; Sections 10–11 integration/compatibility |
| Q4 | Section 3 icon and ordinary-text distinction; connected-form reconciliation |
| Q5 | Sections 6–7 canonical structured field paths/visibility |
| Q6 | Section 7 separate stable field-code inventory and deterministic stage mappings |
| Q7 | Section 7 required path/code/message, nonempty optional fieldErrors, safe location fallback |
| Q8 | Sections 7/10 unsupported-code fail-closed behavior and uncertainty |
| Q9 | Sections 3–8 complete public schema/type families and 22+5 operation mapping |
| Q10 | Section 3 Gregorian/date/instant rules and Section 9 runtime/generation safeguards |
| Q11 | Sections 3–4 well-formed ordinary Unicode, stage/length/normalization distinctions |
| Q12 | Section 7 diagnostic bounds, safe construction, deterministic subset and whole-reader failure |
| Q13 | Section 3 ECMAScript trimming, exact icon categories/exclusions and one documented Unicode baseline obligation |
| Q14 | Section 7 sanitization/deduplication/order/fixed safe messages/first-32 selection and omission when no useful attribution |
| Q15 | Section 6 strict selected response metadata and tolerant readers; server-only cookie issue/clear descriptors and no credential exposure |
| Q16 | Section 6 exact JSON media/charset, canonical delta-seconds Retry-After, catalog-derived Allow and preserved HEAD/204/security metadata |
| Q17 | Final complete-specification and S1–S16 confirmation, exact Unicode 17.0.0 baseline approval, no material discrepancies and authorization to resolve only the owning decision |

Q13–Q16 approved the previously marked trimming/icon composition, deterministic diagnostic algorithm and metadata shapes/roles/serialization with the clarifications now incorporated above. Q17 explicitly approved the complete consolidation and Unicode 17.0.0 as the exact common classification baseline; no additional architectural decisions remain for this ticket. No other product policy is intentionally revised. The approval record in the owning ticket governs if a discrepancy is found.

Actual preflight: reviewed controlling approved specifications, Q1–Q16 clarifications, local glossary/domain instructions and current Project form source. The local form's preset palette and uppercase/UTF-16 slicing were observed in source, not executed. Documentary checks passed: 22 catalog-matched unique operations, five HEAD counterparts, 22 operation-error codes, ten ordered field codes, 115 planned schema exports, 20 valid local links across draft/ticket, Q1–Q16 traceability and S1–S16 checkpoints. Independent consistency review identified a charset-casing wording gap, which was corrected; no other actionable discrepancy was reported. Full preflight evidence is recorded in the owning ticket. The available Node 24.22.0 runtime reported Unicode 17.0; this is environment metadata, not validator/parity evidence. No production tests/builds, runtime schema probes, browser/API/mail/security exercises, generator execution or package compatibility checks were run for this draft. Rule declaration and documentary coverage do not prove executable/runtime parity.

Resolution preflight on 2026-10-25 additionally passed Q1–Q17 traceability, all 79 local links across the six updated documentation files, final approved statuses/baseline, the single Answer/map entry, acyclic dependencies, exact unchanged lifecycle/assignee/dependency metadata for every other ticket, authorized documentation-only scope and whitespace checks. No subsequent decision was claimed or started.

Minimum preparation during readiness: this documentation only. Before activating a module, implement and prove its applicable contracts, canonicalization, domain/security obligations, consumer uncertainty/account isolation and compatibility checkpoints. Concrete mechanisms remain separate implementation planning. The OpenAPI decision owns the derived document/expressiveness checks; the testing-strategy decision owns the broader evidence plan. Neither is started here.

**Completed design review:** in Q17 the user explicitly confirmed Sections 3, 6 and 7 against Q1–Q16 and the catalog, the full Section 8 operation mapping, the public inventory and all S1–S16 checkpoints. No material discrepancies were found. Unicode 17.0.0 is approved; browser/server parity still requires version-aware implementation fixtures. The owning decision is resolved under this explicit confirmation.

**First concrete future evaluation action:** when a shared-contract implementation is separately authorized and available, start with S1: follow a Task title through raw validation, explicit trimming, canonical validation, domain enforcement, strict server output and frontend reading; record actual observations. Continue S2–S16 for applicable features and retain the catalog/prerequisite checkpoints. No implementation evaluation is run or authorized by this resolution. Human implementation acceptance remains pending actual user observations. This session stops after resolution/documentation checks, without starting another decision, application changes, commit or push.
