# Specify the shared Schema-First contracts

Status: resolved
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: Codex (current wayfinder session)
Blocked by: 12, 10, 05

## Question

How should the approved domain model and Endpoint Catalog be expressed in one shared runtime-schema contract using the selected tooling? Produce a linked design specification covering DTO/schema inventory, common enums, request/response validation, nullability, dates, opaque IDs, server-controlled fields, error structures, account/profile and compatibility examples. Keep UI state, browser snapshots and business logic outside. Specify package exports and consumer obligations without creating/wiring the production package. Ensure schemas describe both successful and failed outcomes and do not create competing frontend/backend contract definitions. Record any schema/tooling limitations requiring a user decision.

## Resolution requirements

Human-in-the-loop decision. Consult grilling and domain-modeling. Explicit user approval is required before resolution. Link detailed design assets from this ticket; the map indexes only the answer gist. Planning-only: no application, dependency or production package changes.

## Prerequisites

- [Design the MVP Endpoint Catalog](12-endpoint-catalog.md)
- [Choose shared-schema and OpenAPI tooling](10-contract-tooling.md)
- [Assign validation ownership across forms, domain rules and external data](05-validation-ownership.md)

## Approved async requirements to carry forward

Specify the catalog-selected creation idempotency submission/result/conflict/recovery contracts and compatibility obligations, including concurrent and expired/unavailable-record outcomes. Retain UI operation state outside shared wire schemas. See [Asynchronous completion, feedback and recovery requirements](../design/async-operation-policy.md), approved in full by Q14 confirmation of its owning decision.

## Validation requirements to carry forward

Apply [Validation ownership and canonicalization requirements](../design/validation-policy.md): approved in full by Q8 confirmation of its resolved owning decision. Preserve staged raw/canonical validation without premature length checks, authenticated domain enforcement, canonical output and tolerant-extra-field readers, validated safe errors, whole-read failure and uncertain-mutation recovery. Exact responsibilities and evaluation scenarios are linked there; retain this ticket's existing scope.

## Approved Blueprint requirements to carry forward

Apply [API Architecture Blueprint for progressive integration](../design/api-architecture-blueprint.md), approved in full by Q22. Express the catalog-selected coherent Workspace read, independent task/project/profile revisions, conflicts/missing distinctions, original creation outcomes and recovery cases, and approved authentication lifecycle/session/activity outcomes. Keep verification, enrollment, activation and sign-in authority distinct; conceptual lifecycle stages in the Blueprint do not themselves approve wire enums.

Specify the chosen registration/enrollment raw/canonical input schemas and account-email policy consistently with the catalog's workflow/business decisions. Encode safe acknowledgement/failure/validation/conflict/recovery contracts and compatibility obligations without moving authorization, time/cap enforcement, atomic transitions or browser draft state into shared schemas. Preserve all approved 30-minute/three-proof/15-minute/session limits as runtime obligations where schema expression alone cannot establish them.


## Approved account email scope to carry forward

Apply [MVP account email scope](../design/account-email-scope.md), approved in full by Q2 of [Define account email-change scope and security requirements](16-account-email-change.md#answer). Registered account email is read-only; account ID is immutable. Ordinary profile updates accept display name only, preserving canonical validation, ownership and independent profile optimistic concurrency. Strictly reject unsupported email/account-ID request fields. Exclude email-change endpoints, pending-change workflows and email-change verification/recovery contracts from the MVP design. Preserve email response fields and approved registration/enrollment inputs, all approved authentication lifecycle/security/isolation guarantees and restricted pending enrollment recovery. Do not add password/account recovery or alternate email-modification paths. Secure email changes require a future account-settings expansion and prior security decisions; exact approved MVP transport/schema choices retain their existing owners. Carry the six linked evaluation scenarios forward without claiming runtime verification or implementation acceptance.


## Approved Endpoint Catalog to carry forward

Apply the complete [MVP Endpoint Catalog](../design/endpoint-catalog.md), explicitly confirmed with no material discrepancies in the final review of [Design the MVP Endpoint Catalog](12-endpoint-catalog.md#answer) on 2026-10-24. Preserve all Q1–Q28/clarifications, 22 explicit operations/five HEAD counterparts, exact success/error/header/authority/validation/retention/abuse contracts, downstream ownership and E1–E34 checkpoints. Explicit catalog choices refine earlier detail/mechanism deferrals; do not independently revise approved policy or add fields. Implementation, runtime/security evidence and human implementation acceptance remain pending. This reference update does not claim, start, resolve or otherwise change the lifecycle/assignee of this decision.


## Design asset

- [Shared Schema-First contract specification](../design/shared-schema-contracts.md): consolidated Q1–Q16 specification, full public schema/type inventory, 22-operation/five-HEAD traceability and feature-by-feature review. Approved in full by Q17 on 2026-10-25, including the exact Unicode 17.0.0 baseline and S1–S16 guide; the resolution is recorded below.

## Comments

### Q1–Q5 approval and clarifications — 2026-10-24

The user explicitly approved Q1–Q5 with the following binding clarifications. This is partial schema-design approval only. Keep this ticket claimed and unresolved while remaining decisions are discussed; do not start another ticket or change application code. No implementation acceptance is established.

- **Q1 — Schema roles:** distinguish strict raw wire requests, canonical-value validators that perform no transformations, strict authoritative canonical server responses, and tolerant frontend readers that strip permitted additional fields while validating every declared field. Compose all roles from reusable field definitions. Preserve raw validation → explicit normalization → canonical validation → domain enforcement. Shared schemas do not silently trim, coerce, default or repair. Business rules, authorization and cross-resource consistency remain outside contracts; browser-local storage schemas and UI operation state remain separate.
- **Q2 — Profile:** exactly `{ accountId, email, displayName, revision }`. `accountId` is immutable/server-owned; email is canonical/read-only in the MVP; displayName is the only ordinary editable field; revision is independent/opaque/server-issued. Reuse this representation in authenticated envelopes. No competing `id` alias, additional timestamps or stored avatar fields. Avatar initials remain derived frontend presentation.
- **Q3 — Project color:** exactly `^#[0-9a-f]{6}$`. Any lowercase six-digit RGB value is accepted, including current picker presets. Reject uppercase hex letters, shorthand, named colors, alpha variants and malformed values. No implicit lowercasing/repair in schemas or backend canonicalization. Keep the browser-local picker unchanged; connected integration must submit conforming values.
- **Q4 — Project icon:** exactly one well-formed Unicode scalar value, not one UTF-16 code unit. Accept individual visible letters, numbers, punctuation and symbols, including `A`, `ن`, `😀`. Reject whitespace, controls, malformed surrogates, standalone combining marks, default-ignorable invisible formatting characters and multiple-code-point sequences, including joined emoji and variation-selector sequences. Preserve accepted input exactly; no implicit uppercase/truncation/default/substitution. Current local uppercase/UTF-16 slicing is not an API normalization rule; reconcile connected Project forms explicitly during integration without premature changes to unrelated local behavior.
- **Q5 — Field-error paths:** arrays beginning with `body`, `headers`, `path` or `query`, followed by field names/numeric array indices. Examples: `["body", "title"]`, `["headers", "X-Expected-Revision"]`. Use stable canonical header spellings despite case-insensitive HTTP matching. Public validation codes are stable and independent of Zod/Nest internals. Recognized editable paths map inline; unknown/unsupported/non-editable paths remain visible as safe operation feedback. Exact field-code inventory is still open for the next round.

Planning preflight: inspected approved catalog, validation/tooling/domain contracts and current Project form; the form offers six lowercase RGB presets and uppercases/slices its icon to one UTF-16 unit. These are source observations, not runtime evaluation. Before this approval record, the only checkout change was this ticket's claim. No application tests/builds/live API or security checks were run. No new glossary term or ADR is needed for these technical schema decisions.


### Q6–Q9 approval and clarifications — 2026-10-24

User approval, recorded verbatim:

**Q6–Q9 — Approved (yes to all), with the following contract and compatibility clarifications.**

**Q6 — Public field-error codes: Approved.**

Adopt the proposed stable public field-error code inventory:

- `REQUIRED`
- `INVALID_TYPE`
- `UNKNOWN_FIELD`
- `INVALID_FORMAT`
- `INVALID_VALUE`
- `TOO_SHORT`
- `TOO_LONG`
- `NO_CHANGES`
- `PASSWORD_NOT_ALLOWED`
- `PROJECT_UNAVAILABLE`

These codes are part of TaskFlow's public API contract, not direct exports of Zod issue types or NestJS validation exceptions.

Define deterministic mappings from raw-input, canonical-value and relevant domain validation failures to these codes.

Preserve the approved distinctions:

- `REQUIRED` for missing required fields or headers.
- `INVALID_TYPE` for incorrect types, including unsupported null.
- `UNKNOWN_FIELD` for forbidden object fields and query parameters.
- `INVALID_FORMAT` for invalid lexical representations.
- `INVALID_VALUE` for unsupported enum values or canonical constraints not more specifically classified.
- `TOO_SHORT` and `TOO_LONG` for applicable canonical length bounds, measured according to the approved Unicode-code-point rules.
- `NO_CHANGES` for PATCH requests containing no editable fields.
- `PASSWORD_NOT_ALLOWED` only for the enrollment-time password eligibility policy, never as a public sign-in credential failure.
- `PROJECT_UNAVAILABLE` for unusable project assignments without distinguishing missing from foreign resources.

Keep machine-readable field codes distinct from top-level operation error codes and HTTP statuses. These field codes do not alter the approved status/error matrix, validation ordering, ownership concealment or uncertainty classification.

**Q7 — Error-path precision: Approved.**

Every `fieldErrors` entry must contain:

- `path`: a structured location array.
- `code`: a supported public field-error code.
- `message`: a safe user-facing explanation.

Require the first path segment to be `"body"`, `"headers"`, `"path"` or `"query"`. Subsequent segments may be field names or nonnegative integer array indices.

Permit location-only paths when an error affects the entire request location.

Approved examples:

- Empty PATCH: `["body"]` with `NO_CHANGES`.
- Unsupported profile field: `["body", "accountId"]` with `UNKNOWN_FIELD`.
- Missing delete precondition: `["headers", "X-Expected-Revision"]` with `REQUIRED`.

Use canonical header spelling from the authoritative transport contract, independently of case-insensitive HTTP header matching.

If `fieldErrors` is present, require a nonempty array. Omit it when no meaningful field attribution is available; do not emit empty or fabricated field errors.

Never include submitted field values, passwords, credentials, session material or other secrets in paths or messages. Unknown field names may identify their locations only when they can be represented safely and within appropriate bounds; otherwise attribute the error to the containing object.

Frontend consumers map recognized editable-field paths inline and display unsupported or non-editable locations through safe operation-level feedback. No error may disappear merely because its field path is unfamiliar.

**Q8 — Unknown future error codes: Approved.**

Frontend response readers must validate the public top-level error code and any present field-error codes against their supported contract inventory.

An unfamiliar code means the received error contract is unsupported by that client version.

Do not render its untrusted message, silently discard the error, fabricate a known code, or assume that a dispatched mutation was definitely rejected.

Show safe generic operation-level feedback and retain the approved uncertainty/recovery handling whenever completion cannot be reliably established.

Continue to fail closed on authentication and account-access boundaries. An unsupported error contract must never be treated as permission to proceed with protected operations or restore local/demo authority.

Adding or modifying public error codes requires explicit compatibility review and coordinated consumer handling. Do not silently expand accepted enums simply to tolerate unknown error codes.

This is distinct from the approved tolerance for additional unknown JSON response fields: additional fields may be stripped where permitted, while invalid values of declared fields—including known error-code fields—must not be silently accepted.

**Q9 — Public schema naming and exports: Approved.**

Use explicit role-oriented schema names and inferred TypeScript types.

Examples include:

- `TaskCreateRequestSchema`
- `TaskCreateCanonicalSchema`
- `TaskResponseSchema`
- `TaskResponseReaderSchema`

Apply a consistent convention to Projects, Profile, authentication requests and responses, creation/recovery outcomes, error envelopes, request metadata, headers and applicable cookie/security-context contracts.

Specify a complete public export inventory in the design document, traceable to the approved Endpoint Catalog's 22 explicit operations and five HEAD counterparts.

Reuse shared field definitions rather than independently maintaining different copies of resource constraints.

Distinguish:

1. Strict raw request validation.
2. Canonical-value validation without transformation.
3. Strict authoritative server response validation.
4. Tolerant frontend response projection with strict validation of declared fields.

Infer TypeScript types from their respective Zod schemas. Do not hand-maintain parallel DTO interfaces or introduce competing API contract authorities.

The public inventory must preserve all approved field names, nullability, revisions, lifecycle states, error envelopes, transport metadata and runtime-only constraint declarations.

Document which constraints cannot be faithfully represented through generated JSON Schema/OpenAPI and retain the approved fail-closed tooling safeguards.

Leave physical file organization, package exports wiring, module format and build compatibility verification to implementation planning under the existing tooling requirements.

**Scope:** Record Q6–Q9 in Ticket 13 and continue only its remaining decision questions. Keep Ticket 13 claimed and unresolved until its complete consolidated specification receives final explicit approval.

Do not begin another ticket, implement application code, commit or push without a separate instruction.


### Q10–Q12 approval and clarifications — 2026-10-24

The user explicitly approved Q10–Q12 with the following binding clarifications. Keep this ticket claimed and unresolved until its complete consolidated specification receives final explicit confirmation. Do not start another ticket, change application code, commit or push without separate authorization.

- **Q10 — Calendar and instant boundaries:** proleptic Gregorian calendar, years 0001–9999 inclusive. Calendar dates require exact YYYY-MM-DD and real month/day/leap-year validity; reject year zero, impossible dates, alternate formats and timezone-bearing values. Preserve dates without timezone conversion. Instants require exact YYYY-MM-DDTHH:mm:ss.sssZ, the same calendar/year validity, hours 00–23, minutes/seconds 00–59 and exactly three fractional digits. Reject leap seconds, offsets, 24:00, alternate ISO forms and missing/extra precision. Use explicit lexical/semantic validation, never permissive parsing/rollover/normalization. Preserve every expressible generated constraint and explicitly document runtime-only requirements.
- **Q11 — Ordinary Unicode text:** task titles, project names, descriptions, display names and non-null assignees must be well-formed Unicode without unpaired surrogates. Validate before canonical code-point lengths. Only approved text trimming occurs; preserve descriptions and valid multiple-code-point sequences including combined emoji. No ordinary-text NFC/casefold/uppercase/truncation/replacement/repair; no icon category/visibility restrictions on ordinary text. Password NFC and Project icon policies remain distinct. Apply consistently to raw/canonical/server response fields; malformed Unicode fails rather than being replaced.
- **Q12 — Diagnostic bounds:** top-level/field messages are 1–300 code points; present fieldErrors has 1–32 entries; each path has 1–16 segments including the location; named segments have 1–128 code points; numeric segments are nonnegative safe integers. Each entry requires supported path/code/safe message. Server constructs bounded diagnostics before serialization and deterministically selects at most 32 using documented ordering without changing rejection, failure precedence, operation error or HTTP status. Top-level error still communicates rejection even if some details are omitted; it never independently proves noncommit for uncertain service outcomes. Use recognized safe field names; attribute arbitrary/long/malformed/potentially sensitive keys to nearest safe containing object. Never expose submitted values, credentials/passwords/tokens, exceptions or internals. Frontend validates the complete diagnostic structure, rejecting rather than truncating/repairing/partially accepting invalid content; show safe generic feedback and retain uncertainty handling when dispatched mutation outcome is unconfirmed. Preserve the Q6–Q9 field-code inventory; explicitly document runtime-only Unicode/diagnostic constraints.


### Consolidated draft and remaining detail review — 2026-10-25

Prepared the linked Shared Schema-First contract specification without resolving this ticket or changing the map. Q1–Q12 are incorporated. Remaining consolidation proposals are explicitly marked: exact trimming/icon predicate composition, deterministic bounded error ordering/message selection, complete selected transport metadata/reader and server-only cookie descriptor shapes, and concrete Content-Type/Retry-After/Allow serialization. They are proposed for discussion, not retroactive approvals. Complete consolidated approval remains pending after those details are settled.

Actual documentary preflight: 22 unique operation method/path pairs exactly match the approved catalog; five GET-derived HEAD counterparts; all 22 operation-error codes match; 115 planned schema exports enumerated from explicit names and finite public families with inferred-type naming; 20 local links in draft/ticket resolve; Q1–Q12 have traceability entries; S1–S16 feature review cases are present; ticket remains claimed with no Answer section. Tracked and new-document whitespace checks passed (the new-file no-index diff returns its normal differences exit code with no whitespace diagnostics). These are documentation/inventory checks, not runtime schema execution or type/build verification.

Independent read-only consistency review found missing exact metadata shapes/readers and a diagnostic message deduplication tie. The draft was repaired and re-reviewed; the reviewer found no remaining concrete inconsistency in those changes. This review does not establish user approval or runtime/security enforcement. No application/dependency/configuration changes, production tests/builds/API/browser/mail checks, other ticket work, commit or push occurred. Human implementation evaluation remains pending actual observations.


### Q13–Q16 approval and clarifications — 2026-10-25

User approval, recorded verbatim:

**Q13–Q16 — Approved (yes to all), with the following schema and transport clarifications.**

**Q13 — Exact trimming and icon predicates: Approved.**

For the previously approved trimmable ordinary-text fields—Task title, Project name, Profile display name and non-null assignee—explicitly remove leading and trailing characters defined by ECMAScript `WhiteSpace` and `LineTerminator` semantics.

Perform this normalization outside shared Zod wire schemas, after raw structural and Unicode-validity checks and before canonical nonblank/code-point-length validation.

Do not extend this trimming rule to descriptions, passwords, email addresses or project icons:

- Descriptions preserve all valid Unicode, whitespace and line breaks.
- Email removes surrounding U+0020 ASCII space only.
- Passwords use their separately approved explicit NFC normalization without trimming.
- Project icons preserve the accepted character exactly.

For Project `icon`, require exactly one well-formed Unicode scalar value whose General Category belongs to Letter, Number, Punctuation or Symbol.

Reject whitespace, controls, standalone combining marks, default-ignorable code points, malformed surrogates, unassigned/private-use values and multi-code-point sequences.

Keep the approved examples `A`, `ن` and `😀` valid without automatic case conversion, truncation or substitution.

Document a single explicit Unicode-data baseline for category and default-ignorable classification. Ensure browser and server implementations agree through version-aware compatibility fixtures rather than assuming independently updated Unicode libraries always classify identically.

Do not introduce implicit schema transforms or modify existing browser-local form behavior during this planning decision.

**Q14 — Deterministic diagnostic selection: Approved.**

Construct bounded public `fieldErrors` deterministically:

1. Sanitize each candidate path against the approved location, segment-type, length and secrecy constraints.
2. Replace unsafe or unrecognized submitted field names with the nearest safe containing-object path when appropriate.
3. Deduplicate identical `(path, fieldCode)` pairs.
4. Sort by location in this exact order: `body`, `headers`, `path`, `query`.
5. Within a location, order paths deterministically: prefixes before their descendants, numeric indices numerically, and named segments by Unicode code-point order.
6. For otherwise identical paths, sort by the explicit approved public field-code inventory order.
7. Use fixed, bounded, server-controlled safe messages for each retained diagnostic, independent of submitted values, validation traversal order or internal validator messages.
8. Return the first 32 entries after sanitization, deduplication and sorting.

Preserve the previously approved 1–300-code-point message limits, 1–16 path segments, 1–128-code-point named segments and nonnegative safe-integer numeric indices.

Never silently truncate untrusted paths or reflect secrets.

Diagnostic ordering and truncation must not change HTTP status, top-level error code, failure precedence, authorization behavior or the fact that the entire request was rejected.

If no useful field attribution remains, omit `fieldErrors` and retain safe operation-level feedback.

**Q15 — Transport metadata roles and cookie descriptors: Approved.**

Adopt the proposed Section 6 response-header contract shapes, with separate strict server-output and tolerant frontend-reader schemas over the selected declared headers.

Require every declared header to satisfy its approved presence, value and formatting rules. Permit unrelated HTTP headers without treating them as violations of the selected-header contract.

Preserve case-insensitive HTTP header-name matching while using canonical names in the public schema inventory and diagnostic paths.

Cover the approved response metadata, including `Cache-Control`, `Content-Type` where applicable, `WWW-Authenticate`, `Retry-After` and `Allow`.

Cookie descriptors are server-only metadata and must never become API JSON payloads, frontend-readable credential data or exported browser-consumer secrets.

Define issuance descriptors with:

- `name`: an approved context-specific cookie name.
- `value`: the matching valid purpose-bound credential.
- `secure: true`
- `httpOnly: true`
- `sameSite: "Lax"`
- `path: "/"`

Issuance must omit `Domain`, `Expires` and `Max-Age`.

Define clearing descriptors with the corresponding cookie name, security flags and path, an empty value, and exactly one expiration mechanism:

- `maxAgeSeconds: 0`, or
- an `expiresAt` timestamp already in the past.

Do not require both clearing mechanisms simultaneously.

Cookie issuance/clearing descriptors describe serialization requirements only. Server-side authority, revocation, credential lifetime, atomic transitions and account isolation remain mandatory independently of browser cookie handling.

Do not include `Set-Cookie` credential values in frontend response-reader output, logs, diagnostic messages or generated example payloads.

**Q16 — Exact header representations: Approved.**

For requests requiring JSON bodies, accept `Content-Type` with case-insensitive media type `application/json`, optionally followed by exactly one `charset=utf-8` parameter.

Treat permitted media-type and charset token casing according to HTTP case-insensitive comparison, while rejecting unsupported parameters, duplicate parameters, conflicting values and non-UTF-8 character sets.

Emit JSON response content type consistently as:

`application/json; charset=utf-8`

Preserve the approved absence of JSON content type and response body for `204 No Content`.

Use canonical nonnegative decimal integer delta-seconds for `Retry-After`, within the JavaScript safe-integer range. Do not emit HTTP-date variants, signs, fractions or ambiguous numeric encodings. Use one canonical serialization, including `0` when appropriate.

Generate `Allow` exclusively from the actual catalog-supported methods for that route, ordered:

`GET → HEAD → POST → PATCH → DELETE`

Join methods using comma followed by one space, omitting unsupported methods. Include HEAD only where supported by the approved GET/HEAD contract.

Do not derive `Allow` from framework-default methods that are absent from the authoritative catalog.

HEAD retains corresponding applicable GET status/headers but no response body, no business transition and no session-activity renewal.

Preserve the approved universal `Cache-Control: no-store` policy, `401` TaskFlow challenge, same-origin restrictions and error-response contracts.

All public schema representations must remain traceable to the authoritative Endpoint Catalog, without creating competing HTTP or payload definitions.

**Scope boundary:** Record Q13–Q16 as approved within Ticket 13. Preserve the existing Q1–Q12 decisions and the approved tooling safeguards.

Prepare the consolidated Shared Schema-First specification for final review, including its public export inventory, transport metadata roles, and all evaluation checkpoints.

**Do not resolve Ticket 13 yet. Do not claim or start another ticket. Do not modify application code, commit or push without separate authorization.**

The next step is explicit review and confirmation of the complete consolidated specification. Architectural approval does not constitute implementation acceptance.


### Complete specification prepared for final review — 2026-10-25

Incorporated Q13–Q16 and their clarifications into the linked specification, preserving Q1–Q12. Added Q13–Q16 traceability and strengthened icon/version-aware, diagnostic-omission and transport evaluation checkpoints. Previous consolidation proposals are now identified as approved. The exact Unicode 17.0.0 classification baseline is explicitly proposed for final confirmation; the available Node 24.22.0 runtime reports Unicode 17.0, which is environment evidence only, not proof of browser/server parity or schema enforcement. No version-specific production package or engine is selected.

Independent read-only review found one remaining wording gap: charset parameter name/value casing needed to be explicitly case-insensitive. Corrected Section 6.1 and included Application/JSON; CHARSET="UTF-8" as a permitted example. No other actionable discrepancy was reported. This documentary review does not replace the user's whole-specification confirmation.

Actual final documentary checks passed: 22 unique operations exactly match the approved catalog; all five GET-derived HEAD counterparts are present; 22 operation-error codes exactly match; all ten field codes appear once in their explicit order; the finite inventory expands to 115 planned schema exports with inferred-type naming; all 20 local links across ticket/specification resolve; Q1–Q16 traceability and S1–S16 evaluation checkpoints are present; ticket remains claimed with no Answer/resolution. Tracked/new-document whitespace checks produced no diagnostics. No production tests/builds/runtime schema probes/generator/browser/API/mail/security checks were run. No application/dependency/configuration changes, other ticket work, commit or push occurred.

First concrete review action: read specification Sections 3, 6 and 7 against approved clarifications, explicitly confirm or revise the proposed Unicode 17.0.0 baseline, then review the 22-operation/five-HEAD mapping and S1–S16 guide. Final whole-specification approval and authorization to resolve remain pending. Human implementation evaluation/acceptance also remains pending future actual observations.


### Q17 — Final Shared-Understanding Confirmation — 2026-10-25

The user explicitly approved the complete linked specification and its evaluation guide. They reviewed Sections 3, 6 and 7 first, then the complete endpoint-to-schema mapping in Section 8 and all S1–S16 checkpoints in Section 11 against Q1–Q16, their clarifications and the authoritative Endpoint Catalog. They verified 115 planned schema exports, 22 explicit API operations/five HEAD counterparts, 22 operation-error codes/ten field-error codes, four roles, shared fields, strict requests/output, tolerant validating readers, transport/cookies, bounded deterministic diagnostics, runtime declarations, safeguards and compatibility requirements.

Exact final confirmations:

> I approve Unicode 17.0.0 as the exact common baseline for Unicode classification.

> No material discrepancies were found. The consolidated specification and S1–S16 evaluation guide are approved. No additional architectural decisions are required for Ticket 13.

The user authorized resolving this decision only, recording this approval, updating the map and existing downstream references as required, running documentation/consistency checks, reporting the outcome and then stopping. They expressly prohibited starting/claiming/working another ticket, continuing Wayfinder, further architectural questions, application/implementation/dependency work and commit/push. All other ticket states must remain unchanged. Implementation, generated OpenAPI verification, runtime/browser compatibility testing, security evidence and human implementation acceptance remain pending. This supersedes earlier comments requiring the ticket to remain claimed pending final confirmation; historical approvals are retained unchanged.

## Answer

Resolved on 2026-10-25 under explicit Q17 approval. The canonical decision detail is the approved [Shared Schema-First contract specification](../design/shared-schema-contracts.md), incorporating Q1–Q16 and clarifications with no material discrepancies. This answer indexes the specification rather than introducing a competing schema authority.

- **Approved choice:** one shared runtime-schema authority with four distinct roles, reusable canonical fields and inferred types; full public/export/operation/error/metadata inventory and exact Unicode 17.0.0 classification baseline, as specified in the linked design. S1–S16 are approved design/evaluation checkpoints.
- **Retained or explicitly revised behavior:** preserve the approved catalog, staged validation, progressive integration and independent local MVP. Connected Project integration must reconcile icon preservation/scalar handling and contract-valid color submission. Browser-local forms/storage/UI behavior is unchanged by this decision.
- **Minimum preparation:** documentation/contract requirements only during readiness. Before separately authorized connected-module activation, implement and demonstrate applicable validation, shared consumers, transport/domain/security and recovery obligations; no preliminary production refactor is authorized here.
- **Outcome boundary:** approved specification and evaluation guide, not a production contracts package, generator or implementation artifact. No application, dependency, configuration, test implementation, commit or push.
- **Deferred work and trigger:** separate implementation planning after readiness approval owns production package/build/runtime wiring and enforcement. Existing OpenAPI and testing-strategy decisions retain derived-document/parity and evidence-design ownership. No other decision is started or claimed in this session.
- **Verification implications:** retain S1–S16 and all linked prerequisite/catalog checkpoints. Enforce fail-closed generation and explicit runtime-only declarations. Later version-aware fixtures must prove browser/server Unicode parity, security/runtime correctness and package compatibility. Documentation checks and design approval establish neither executable correctness nor human implementation acceptance.
- **Explicit approval:** Q17 confirms the whole specification, exact baseline and guide, finds no material discrepancies, and authorizes this resolution/documentation update only, followed by stopping.


### Resolution verification and stop — 2026-10-25

Documentation/consistency checks passed after resolution: 115 planned schema exports; exact 22-operation/five-HEAD catalog coverage; 22 operation-error codes and ten unique ordered field codes; Q1–Q17 traceability; S1–S16 checkpoints; 79 valid local links across the six authorized documentation files, including Answer/Comments anchors; approved Unicode 17.0.0/specification status; exactly one Answer and one map decision index; acyclic existing dependencies. All other tickets retain their exact pre-resolution Status, Assignee and Blocked by values. Only the map, this ticket, its design specification and existing carry-forward reference sections in the OpenAPI, testability and readiness-disposition tickets changed. No other ticket was claimed or started.

Tracked and new-document whitespace checks passed without diagnostics. The no-index new-file check reports its normal differences exit code; no whitespace issue was reported. Earlier independent review and corrected charset wording remain recorded above. No application tests/builds, runtime/generator/browser/security checks or implementation work were performed; no commit or push. User-approved S1–S16 remain reproducible future evaluation requirements, with actual human implementation acceptance pending observations. Resolution/documentation work is complete; stop without continuing Wayfinder.
