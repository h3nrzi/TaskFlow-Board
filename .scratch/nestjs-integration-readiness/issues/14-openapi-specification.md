# Specify the OpenAPI document and its contract consistency rules

Status: resolved
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: Codex (current wayfinder session)
Blocked by: 13

## Question

What OpenAPI document completely describes the approved MVP Endpoint Catalog and canonical shared schemas, and how will consistency be maintained? Apply the [approved tooling and generation design](../design/shared-schema-tooling.md): OpenAPI 3.1 generated from the authoritative operation catalog and shared Zod schemas by native conversion plus a small assembler, with all mandatory safeguards. Produce a linked OpenAPI design artifact and specify security descriptions, operation identifiers, schema references, examples and error coverage. Do not introduce independently maintained payload schemas or competing controller-derived operation authority. Record planned validation/drift checks and explicit user review. Generation wiring, dependencies, server handlers and CI implementation remain outside this planning map.

## Resolution requirements

Human-in-the-loop decision. Consult grilling and domain-modeling. Explicit user approval is required before resolution. Link detailed design assets from this ticket; the map indexes only the answer gist. Planning-only: no application, dependency or production package changes.

## Prerequisites

- [Specify the shared Schema-First contracts](13-shared-schema-contracts.md)

## Validation requirements to carry forward

Apply [Validation ownership and canonicalization requirements](../design/validation-policy.md): approved in full by Q8 confirmation of its resolved owning decision. Preserve staged raw/canonical validation without premature length checks, authenticated domain enforcement, canonical output and tolerant-extra-field readers, validated safe errors, whole-read failure and uncertain-mutation recovery. Exact responsibilities and evaluation scenarios are linked there; retain this ticket's existing scope.


## Approved account email scope to carry forward

Apply [MVP account email scope](../design/account-email-scope.md), approved in full by Q2 of [Define account email-change scope and security requirements](16-account-email-change.md#answer). Registered account email is read-only; account ID is immutable. Ordinary profile updates accept display name only, preserving canonical validation, ownership and independent profile optimistic concurrency. Strictly reject unsupported email/account-ID request fields. Exclude email-change endpoints, pending-change workflows and email-change verification/recovery contracts from the MVP design. Preserve email response fields and approved registration/enrollment inputs, all approved authentication lifecycle/security/isolation guarantees and restricted pending enrollment recovery. Do not add password/account recovery or alternate email-modification paths. Secure email changes require a future account-settings expansion and prior security decisions; exact approved MVP transport/schema choices retain their existing owners. Carry the six linked evaluation scenarios forward without claiming runtime verification or implementation acceptance.


## Approved Endpoint Catalog to carry forward

Apply the complete [MVP Endpoint Catalog](../design/endpoint-catalog.md), explicitly confirmed with no material discrepancies in the final review of [Design the MVP Endpoint Catalog](12-endpoint-catalog.md#answer) on 2026-10-24. Preserve all Q1–Q28/clarifications, 22 explicit operations/five HEAD counterparts, exact success/error/header/authority/validation/retention/abuse contracts, downstream ownership and E1–E34 checkpoints. Explicit catalog choices refine earlier detail/mechanism deferrals; do not independently revise approved policy or add fields. Implementation, runtime/security evidence and human implementation acceptance remain pending. This reference update does not claim, start, resolve or otherwise change the lifecycle/assignee of this decision.


## Approved shared Schema-First specification to carry forward

Apply the complete [Shared Schema-First contract specification](../design/shared-schema-contracts.md), explicitly confirmed in Q17 of [Specify the shared Schema-First contracts](13-shared-schema-contracts.md#answer) on 2026-10-25 with no material discrepancies. Preserve its approved Q1–Q16 clarifications, public inventory/operation coverage, four-role validation boundaries, transport/security/error contracts, exact Unicode 17.0.0 classification baseline, runtime-only declarations, generation safeguards, compatibility obligations and S1–S16 evaluation checkpoints. It refines previously unspecified schema/transport details without creating a competing catalog or payload authority. Generated OpenAPI verification, implementation/runtime/browser parity, security evidence and human implementation acceptance remain pending. Apply these requirements only within this ticket's existing scope when it is separately started; this reference update does not claim, start, resolve or change its status, assignee or dependencies.


## Design asset

- [OpenAPI design specification](../design/openapi-specification.md): approved in full by Q14 on 2026-10-25, incorporating Q1–Q13, all 27 operation bindings, 115 exports, runtime-rule/serialization/generation safeguards and O1–O16 evaluation. This design decision is resolved; implementation evidence remains pending.
- [OpenAPI example and counterexample design](../design/openapi-examples.md): approved in full by Q14 on 2026-10-25, including concrete synthetic intended-positive fixtures, error/binding coverage and explicitly classified invalid/explanatory scenarios. No shared-schema or runtime validation is claimed.

## Comments

### Q1–Q3 approval and clarifications — 2026-10-25

The user explicitly approved Q1–Q3 with binding clarifications:

- **Q1 — Planning artifact:** produce a complete OpenAPI design specification covering all operations, request/response mappings, identifiers/component rules, bodies/parameters/selected headers/statuses/errors, authentication/enrollment/anonymous contexts/CSRF/Origin/cookies, examples/counterexamples, runtime-only rules, deterministic generation/validation/drift/fail-closed checks and reproducible future evaluation checkpoints. No competing handwritten OpenAPI YAML/JSON payload contract. The actual generated and validated OpenAPI 3.1 document is an implementation deliverable derived from the operation catalog and authoritative shared Zod 4 schemas through the approved guarded approach. Preserve browser-safe contracts, supported native conversion, explicit runtime-only declarations and visible rejection of unsupported/lossy conversion. Planning acceptance establishes no generated-document, schema, browser, API or security verification.
- **Q2 — Stable identifiers:** assign a complete inventory of 27 unique descriptive lowerCamelCase operationIds: 22 explicit operations and five HEAD counterparts. Preserve identifiers across internal refactors; intentional public changes require explicit compatibility review. Derive component names mechanically/deterministically from approved public schema exports; document exact rule, demonstrate uniqueness and fail on collisions/missing references. Strict authoritative server responses define wire output; reader tolerance is separately documented, never substituted. Reuse authoritative schemas/references without independent DTOs/enums/payloads/constraints.
- **Q3 — Examples:** require representative examples for each distinct success/status shape and operation-specific error/status binding, including required/missing create fields; PATCH omission/null; canonical text/Unicode; dates/timestamps/colors/icons; revisions and stale PATCH/DELETE; ownership/concealment; creation 201/replay-recovery 200/running 202/mismatch/unavailable history; immutable history versus current state; generic registration/resend; verification/enrollment/sign-in/session; context boundaries; CSRF/Origin; expiry/sign-out/activity/conflicts; bodyless HEAD/204; errors/selected headers/rate limits. Examples illustrate, never override authority. Use synthetic non-sensitive values. Executable positive examples must satisfy exact schema constraints, including canonical base64url, keys, revisions and timestamps. Label invalid counterexamples and explanatory placeholders distinctly. Never publish live/reusable credentials, cookies, proofs, CSRF secrets, personal data or live account identifiers. Implementation validates positive examples against actual shared schemas and operation/status bindings and checks counterexamples for their expected rejection, rather than success validation.
- **Security and consistency:** faithfully represent server-managed cookies without Basic/Bearer/Authorization credentials. Distinguish account/session, restricted enrollment and anonymous permissions; document semantic limits of security declarations. All mutations require approved Origin/context-bound CSRF; higher-context conflicts grant no lower permission; token purposes remain distinct; anonymous bootstrap grants no authentication; sessions are server-authoritative/revocable. No cross-origin credentialed CORS/OPTIONS grant. HEAD has no body/activity renewal; 204 has no body/JSON content type; no-store applies everywhere; applicable 401 retains TaskFlow challenge. Document precise partially expressible/runtime security and consistency rules and implementation/evaluation owners without claiming schema enforcement.
- **Authority and scope:** preserve the approved Endpoint Catalog, five HEAD counterparts, 115 planned schema exports, error inventories and runtime-only declarations. Continue only this decision; keep it claimed/unresolved until explicit final confirmation of its complete consolidation. No application code, dependencies, competing handwritten OpenAPI file, other ticket, commit or push is authorized.

This is partial design approval only. No Answer or map decision index is added. The linked working artifact will carry the complete design and final review checkpoints before confirmation.


### Q4–Q6 approval and clarifications — 2026-10-25

The user explicitly approved Q4–Q6 with these binding clarifications:

- **Q4 — Component identity/roles:** retain exact authoritative public export names including Schema/role suffixes; no renaming, abbreviation, suffix stripping or independent alternative identities. Emit the reference graph's required components, necessary nested definitions and explicitly referenced public schemas. Trace all 115 exports without making all HTTP payloads. Raw request schemas own accepted bodies; strict server responses own JSON output. Reader projection and canonical stages remain separate; cookie descriptors are server-only transport contracts, never ordinary JSON payloads. Fail on duplicate names, collisions, unresolved/inconsistent references or role substitution. Preserve runtime-only obligations regardless of expressiveness.
- **Q5 — Identity:** exact title TaskFlow MVP API; contract version 0.1.0; OpenAPI 3.1; exact tags Workspace, Tasks, Projects, Profile, Authentication with consistent ownership. Document same-origin HTTPS without environment hostnames. Effective base path is exactly /api, applied once across servers/paths, never omitted or doubled. Version identifies the reviewed specification, not URL versioning, release numbering, deployment topology or implementation dependency. Public coordinated-consumer changes require compatibility review and intentional version management; internal refactors alone do not change version/operationIds.
- **Q6 — Determinism:** unchanged catalog/schemas/runtime declarations/configuration must produce structurally and byte-for-byte identical output after approved deterministic serialization. Stable operation inventory ordering, component/reference/status/parameter/header/security ordering, fixed synthetic examples and stable formatting. No timestamps, random values, machine paths, environment hostnames or nondeterministic metadata. Verification detects/reports drift without silently regenerating, repairing or overwriting reviewed artifacts. Review/explicit regeneration/reverification follow intentional changes.
- **Required checks:** all 22 operations/five HEADs; all unique IDs; component identities/references/roles; exact request/success/error/code bindings; headers/bodylessness/metadata/parameters; cookie/Origin/CSRF/context rules; all expressible constraints; runtime-rule declarations and enforcement/evaluation owners; positive examples and correctly classified counterexamples; version/tags/base path/inventory. Failures identify affected operation/component/rule, expected/observed result, authoritative source, and category (missing coverage, inconsistent metadata, unsupported conversion, semantic information loss, artifact drift). Unsupported/undeclared/lossy conversion fails closed without weaker/placeholder schemas. Converter success is not semantic fidelity; runtime parity obligations remain mandatory.
- **Scope:** these are planned generation/checking behaviors, not executable validation, generated-document/runtime/security acceptance. Continue only this ticket; remain claimed/unresolved until complete consolidated design receives explicit final confirmation. No other ticket, application edit, dependency install, competing handwritten OpenAPI artifact, commit or push.


### Q7–Q10 approval and clarifications — 2026-10-25

The following user approval is preserved verbatim:

**Ticket 14 — Q7–Q10: Approved (yes to all), with the following architectural and consistency clarifications.**

### Q7 — Apply `/api` exactly once: Approved.

Use the origin-root OpenAPI server URL:

`/`

Preserve the authoritative Endpoint Catalog's complete `/api/...` path strings unchanged.

The effective URL for every operation must contain exactly one `/api` base-path prefix.

Do not duplicate `/api` in both `servers` and `paths`, strip it accidentally, or introduce environment-specific development, staging or production hostnames.

Document same-origin HTTPS as a mandatory deployment and browser-security requirement. The relative server URL does not relax that requirement or authorize cross-origin deployment.

Do not introduce URL-based API versioning.

Verify the effective URL for all 22 explicit operations and five HEAD counterparts.

### Q8 — Security representation: Approved.

Define exactly these three distinctly named OpenAPI cookie security schemes:

- `AnonymousContextCookie` — the approved anonymous security-context cookie.
- `EnrollmentCookie` — the approved restricted enrollment cookie.
- `SessionCookie` — the approved authenticated-session cookie.

Use the appropriate OpenAPI cookie-based API-key scheme representation with each exact approved cookie name.

Do not introduce Basic, Bearer, Authorization-header credentials or an alternative authentication protocol.

Declare `security` explicitly on every operation rather than relying on document-level global security inheritance.

Represent operation-specific context requirements faithfully:

- Authenticated Workspace/Profile operations require valid authenticated authority.
- Registration, resend and sign-in require the approved anonymous context and must reject conflicting higher authority.
- Enrollment operations require valid restricted enrollment authority.
- Verification confirmation must preserve its approved anonymous-context and same-pending-account enrollment-replacement alternatives.
- CSRF bootstrap and session inspection must document their permitted missing-cookie outcomes.
- Existing-cookie alternatives must never imply bypass of context precedence, expiry, revocation or purpose-binding rules.

Respect OpenAPI security semantics: separate Security Requirement Objects express alternatives (OR), while schemes listed within the same object express simultaneous requirements (AND).

Where an endpoint explicitly permits a missing credential, represent the optional security alternative accurately, without making unrelated protected endpoints anonymous.

All POST/PATCH/DELETE operations must separately declare the required `Origin` and `X-CSRF-Token` request headers, referencing their authoritative shared contract definitions.

Keep CSRF request-integrity evidence distinct from cookie-based authority. A syntactically valid token, header or cookie is not sufficient proof of authorization.

Explicitly document the runtime requirements for:

- Authoritative cookie validation and context precedence.
- Higher-authority context conflicts.
- CSRF binding to the selected context.
- Exact configured HTTPS Origin verification.
- Verification and enrollment purpose/expiry/revocation.
- Session expiry and server-side sign-out revocation.
- Security-context rotation on approved authority transitions.
- Duplicate or ambiguous cookie/header rejection.
- No credentialed cross-origin CORS/OPTIONS grant.

Ensure `401` responses retain their required TaskFlow challenge and applicable routes preserve the approved `403`, `409` and service-failure distinctions.

These OpenAPI declarations document security requirements; they do not themselves enforce authentication, CSRF, Origin, transaction safety or authority isolation.

### Q9 — Runtime-rule traceability: Approved.

Use structured `x-taskflow-runtime-rules` extension references backed by one authoritative, catalog-linked runtime-rule declaration inventory.

Preserve the previously approved rule identifiers:

`U1`, `U2`, `U3`, `D1`, `T1`, `E1`, `P1`, `X1`, `H1`, `B1`, `I1`, `A1`, `C1`.

Do not rename, merge, drop or silently weaken their approved meanings.

For each declaration, document:

- Its stable rule identifier.
- Its authoritative source specification.
- Its affected operations and/or public schemas.
- What is represented in generated OpenAPI.
- The precise additional runtime obligation.
- Its server, shared-contract or frontend enforcement owner.
- Its corresponding reproducible evaluation checkpoint(s).

Keep this inventory as a traceability and assembly authority, **not a competing source of business/security rules**. The Endpoint Catalog, Shared Schema-First specification and other controlling approved documents remain authoritative for their respective policies.

Use extension references on applicable OpenAPI operations and components, with a deterministic resolution to the declared rule inventory.

Fail generation/verification on missing references, dangling identifiers, contradictory rule mappings, unsupported conversion or undocumented loss of expressible constraints.

Distinguish runtime-only obligations from constraints that OpenAPI/JSON Schema can express. Do not label a rule runtime-only merely because the selected converter does not support it.

A generated extension records an obligation; it is not evidence that runtime enforcement or browser/server parity was implemented or tested.

### Q10 — Exact serialization: Approved.

Use UTF-8 JSON as the reviewed generated OpenAPI artifact format.

Require:

- Exactly two spaces of indentation.
- LF line endings.
- Exactly one final newline.
- No BOM.
- Stable deterministic object-key ordering.
- No random values, generation timestamps, environment-specific URLs, machine paths or other nondeterministic values.

Preserve the approved operation inventory order for paths and operations, and use the approved stable operation identifiers.

Order schema component names lexicographically by their exact authoritative public export names.

Order HTTP response status keys numerically, with any explicitly supported nonnumeric/default entry handled by a fixed documented rule rather than arbitrary insertion order.

Define fixed documented ordering for:

- Request parameters.
- Selected request and response headers.
- OpenAPI security declarations and alternatives.
- Tags and other top-level metadata.
- Component groups and references.

Preserve the order of arrays whose order has contract meaning. Do not reorder values in a way that changes semantics or the approved representation.

The deterministic serializer must define its ordering rules sufficiently precisely that repeated generation from unchanged authoritative inputs produces byte-for-byte identical output.

Verification must separately compare both:

1. Structural/semantic consistency against the approved catalog, shared schemas, declared runtime rules and OpenAPI requirements.
2. Exact serialized bytes against the reviewed generated artifact.

Verification must not silently rewrite, regenerate, normalize or repair the artifact under review.

Any intentional change requires compatibility review, explicit regeneration where appropriate, and repeated consistency verification.

### Scope boundary

Record Q7–Q10 and these clarifications in **Ticket 14 — Specify the OpenAPI document and its contract consistency rules**.

Preserve Q1–Q6 and all approved controlling API/schema decisions.

Continue only the remaining Ticket 14 questions or prepare its consolidated design document for final review.

**Do not resolve Ticket 14 yet. Do not claim or start another ticket. Do not modify application code, install dependencies, produce a competing hand-maintained OpenAPI artifact, commit or push without a separate instruction.**

Planning approval is not generated-document validation, executable-schema verification, runtime-security evidence or implementation acceptance.


### Remaining error-binding questions surfaced by consolidation — 2026-10-25

Read-only review of catalog Sections 3/5/8, schema Sections 2/4/7 and originating approvals identified three precise edge cases without an explicit recorded resolution. They remain questions, not approved policy:

- Q11: authenticated higher context on GET/HEAD enrollment observation; recommend 409 AUTH_CONTEXT_CONFLICT, while absent valid E/conflicting A remains 401 ENROLLMENT_REQUIRED and unreliable relevant lookup remains service failure. No CSRF requirement/activity transition is added to reads.
- Q12: original recovery body with preserved description over 10,000 code points; recommend retaining immediate raw shared-schema rejection as 422 VALIDATION_FAILED/TOO_LONG before evidence lookup, without normalization or current canonical/domain revalidation. This does not permit rejecting a valid original submission because its historical resource/Project later changed.
- Q13: ingress on GET/HEAD/DELETE; recommend bounded-content enforcement 413 first for oversized content, otherwise prohibited content 400; 415 applies only to declared JSON POST/PATCH routes. Content-Type alone without content does not create a request body or a JSON-media requirement. Earlier framing/security precedence and HEAD error-body suppression remain binding.

The working design now traces all 115 public exports. No generated graph, schema validation, runtime evidence or final design approval is claimed. Ticket remains claimed and unresolved.


### Q11–Q13 approval and clarifications — 2026-10-25

The following user approval is preserved verbatim:

**Ticket 14 — Q11–Q13: Approved (yes to all), with the following exact error-binding and precedence clarifications.**

### Q11 — Enrollment reads under authenticated authority: Approved.

For `GET /api/auth/enrollment` and its `HEAD` counterpart:

- With a valid authenticated session, return `409 AUTH_CONTEXT_CONFLICT`, even if a separate enrollment credential is absent.
- With valid restricted enrollment authority and no conflicting authenticated authority, return `200` with the approved enrollment metadata for GET.
- Without valid enrollment authority or a conflicting higher authenticated context, return `401 ENROLLMENT_REQUIRED`.
- If authoritative context validation cannot be completed reliably, return the approved safe service failure rather than assuming a credential is invalid or the user is logged out.

Preserve the approved security-context precedence: authenticated authority outranks enrollment authority. Do not treat a valid authenticated session merely as missing enrollment authority.

These observational methods require no Origin or CSRF proof, perform no lifecycle transition, do not renew session activity, and do not create or replace enrollment credentials.

HEAD must use the corresponding status and applicable headers but suppress every response body, including errors.

For applicable `401` outcomes, include the approved `WWW-Authenticate: TaskFlow realm="TaskFlow"` challenge. Preserve `Cache-Control: no-store`.

Document all relevant success/error bindings accurately in the OpenAPI design and future generated document.

### Q12 — Recovery and raw description limits: Approved.

For both dedicated creation-recovery endpoints:

- Validate the original supplied request's strict raw structure and applicable raw-stage constraints before consulting existing idempotency evidence.
- Because Task and Project descriptions are never normalized, enforce the approved 10,000-Unicode-code-point maximum at this initial validation stage.
- A description exceeding that limit returns `422 VALIDATION_FAILED`, with `TOO_LONG` attributed to `["body", "description"]` where useful.
- Preserve the approved error status even though this specific canonical-value limit can be checked immediately on the unmodified raw value.
- Reject malformed Unicode or incorrect field types using their earlier applicable raw-validation classifications.

After those initial checks, perform the authorized, operation-scoped idempotency evidence lookup before rechecking normalized title/name constraints or current domain conditions.

Recovery must not:

- Re-normalize and substitute the original payload.
- Require the historical resource or Project to still exist.
- Recheck historical creation against the current Project relationship.
- Start, restart or recreate a resource.
- Replace current Workspace state with historical creation evidence.

Matching retained original evidence continues to return the approved historical completed outcome. Payload mismatch, known-in-progress, consumed-key, expiration and unreliable-evidence outcomes retain their previously approved semantics.

Keep the same initial raw description validation boundary for the corresponding original creation endpoints. This clarification does not permit ordinary current-domain validation to run before an eligible historical evidence lookup.

### Q13 — Prohibited content, body size and media types: Approved.

For GET, HEAD and DELETE:

- Request bodies are prohibited.
- If actual request content exceeds the approved 262,144-byte effective body limit, return `413 REQUEST_TOO_LARGE`, subject to higher-priority unsafe-framing/ingress handling.
- If nonempty request content is supplied within that limit, return `400 REQUEST_VALIDATION_FAILED`, subject to the earlier approved authority/integrity precedence where applicable.
- A `Content-Type` header by itself, with no request body, is not evidence of prohibited request content and does not create a JSON body requirement.
- Do not return `415 UNSUPPORTED_MEDIA_TYPE` merely because a bodyless method carries a Content-Type header.

Reserve the approved `415 UNSUPPORTED_MEDIA_TYPE` classification for requests whose declared POST/PATCH JSON body requires `application/json` and whose media type does not meet the approved exact media-type and UTF-8 charset rules.

Continue to reject unsafe or ambiguous framing, contradictory length/transfer information and prohibited duplicate security-sensitive headers according to the earlier ingress rules. Do not use a parsed or silently normalized request as proof that ambiguous original framing was safe.

All approved POST/PATCH routes continue to require their specified JSON object bodies, including exact `{}` for designated empty-object operations.

Preserve these observable distinctions:

- Oversized prohibited content: `413`.
- Otherwise prohibited content on GET/HEAD/DELETE: `400 REQUEST_VALIDATION_FAILED`.
- Unsupported media type for an operation requiring a JSON request body: `415`.
- A permitted bodyless request with an otherwise irrelevant Content-Type header: no error solely on that basis.

Apply the existing context, CSRF, method-specific validation and error-precedence rules without exposing privileged resource information.

HEAD must suppress all success/error response bodies. All responses retain the applicable approved no-store and security metadata.

### OpenAPI consistency obligations

Update the operation-specific response/error bindings, request-body declarations, HEAD behavior and future example/counterexample requirements to reflect Q11–Q13.

Do not add a JSON request body to GET, HEAD or DELETE; do not invent new status codes or operation-error codes.

Preserve every previous Q1–Q10 approval, the authoritative Endpoint Catalog and the Shared Schema-First specification.

**Scope boundary:** Record Q11–Q13 in Ticket 14 and incorporate these clarifications into the working OpenAPI design specification.

Keep **Ticket 14 claimed and unresolved** until the complete consolidated design receives explicit final confirmation.

Do not resolve this ticket, start another ticket, modify application code, create a hand-maintained OpenAPI artifact, commit or push without a separate instruction.


### Consolidated design prepared for explicit final review — 2026-10-25

Q1–Q13 and all binding clarifications are incorporated in the two linked design assets. Q11–Q13 resolve the three earlier error-binding questions; their historical questions above are retained only as conversation history. No new product policy, domain terminology or ADR is introduced. The complete draft remains subject to explicit final confirmation; Status remains claimed, with no Answer or new Decisions-so-far entry.

Independent read-only consistency review examined operation/status/security/header mappings, Q11–Q13, all exports/roles, runtime declarations, serialization and fixtures. It found one omission: signIn must retain 422 VALIDATION_FAILED for eligible canonical email-length constraints. Corrected the main table/narrative and companion binding guidance; enrollment-only password eligibility remains excluded and otherwise eligible unsuccessful password candidates retain generic401. A focused independent recheck confirmed the correction with no remaining material issue reported. This is documentary review, not a runtime security or schema-verification result.

Actual preflight evidence:

- 27 unique method/path entries and operationIds;22 exactly matched approved explicit catalog operations and five matching GET-derived HEAD methods. Effective paths preserve exactly one /api prefix.
- 115 unique named exports matched an independent finite expansion of the approved shared-schema inventory, with correct roles and no added export.
- 60 literal JSON example blocks parsed as JSON. Eight mock proof/CSRF occurrences were43-character canonical unpadded base64url values decoding to32 bytes. Completed-creation examples have exactly seven-day retention. These are documentary fixture construction checks, not actual shared-schema validation, HTTP authorization or generated-document evidence.
- All 22 error-code fixtures matched the approved operation-error inventory;13 runtime declarations,13 Q1–Q13 traceability rows and16 O1–O16 evaluation checkpoints were present.
- Local documentation link targets, authorized documentation-only file scope, claimed/no-Answer lifecycle and git diff --check passed. Other tickets/map, application/dependencies/configuration remain unmodified; no ticket was started, commit made or push performed.

The reproducible feature-by-feature guide is main design Section12/O1–O16, supplemented by the example companion and controlling E1–E34/S1–S16 scenarios. First concrete user review action: compare main Sections3/5 against Q1–Q13, especially enrollment-read409, recovery-description422, prohibited-content413/400 versus JSON415 and canonical email422 versus generic password401 on sign-in. Then follow the full guide and report discrepancies before final confirmation.

Implementation trigger: separate implementation planning/authorization after readiness decisions. Actual generator/schema/example validation, browser/compiled-API import compatibility, live HTTP/mail/security/concurrency checks and human feature observations all remain pending. Guide readiness and documentary checks establish no human implementation acceptance. No production tests/builds, schemas/assembler/generation, API/browser/mail/security exercises or package installs were performed.


Final workspace audit note: the earlier authorized-scope check passed before concurrent out-of-scope changes appeared. The final checkout additionally shows deletions of .agents/memory/MEMORY.md and .agents/memory/taskflow-product-boundary.md, plus an untracked .vscode/ directory. These were not made or modified by this decision work and were left untouched. This session edited only the owning ticket and its two linked design documents; the final checkout as a whole is therefore not documentation-only. No attribution or restoration of the unrelated changes is attempted.


### Q14 — explicit final shared-understanding confirmation — 2026-10-25

The user's final confirmation and bounded authorization are preserved verbatim:

**Q14 — Final Shared-Understanding Confirmation: Approved.**

I explicitly approve the complete:

- `openapi-specification.md`
- `openapi-examples.md`

I reviewed Section 3's complete method/path/operationId mapping, Section 5's exact error/status/header bindings, the security and runtime-rule representation, all O1–O16 evaluation checkpoints, and the examples/counterexamples companion.

I verified consistency with the approved Q1–Q13 decisions and clarifications, including:

- All 22 explicit operations and five HEAD counterparts.
- All 27 unique operation identifiers.
- All 115 planned shared-schema export identities.
- Correct strict server wire roles and separate frontend reader behavior.
- Per-operation cookie security, Origin and CSRF requirements.
- Authenticated enrollment GET/HEAD conflict handling.
- Creation-recovery raw-description validation and historical-evidence precedence.
- The bodyless-method 400/413 versus JSON-media 415 distinctions.
- Operation-specific error applicability and selected HTTP response metadata.
- Runtime-rule traceability, guarded generation, deterministic serialization and drift detection.
- Synthetic examples, invalid counterexamples and their evaluation boundaries.

**No material discrepancies were found. Both documents and the complete O1–O16 evaluation guide are approved. No further design revisions are required for Ticket 14.**

Please perform **only** the following actions:

1. Resolve **Ticket 14 — Specify the OpenAPI document and its contract consistency rules**.
2. Record this explicit final confirmation in the owning ticket.
3. Finalize its resolution and update the Wayfinder map and existing downstream references as required.
4. Run the relevant documentation and consistency checks.
5. Report the resulting changes and final ticket status, then **stop**.

**Strict scope boundary:**

- Do not claim, start or work on any subsequent ticket.
- Do not continue Wayfinder to another decision.
- Do not ask new architectural questions.
- Do not modify application code, install dependencies or generate a production OpenAPI artifact.
- Do not commit or push unless explicitly instructed.
- Leave unrelated workspace modifications, including `.agents/memory` and `.vscode`, untouched.

**This instruction authorizes resolving Ticket 14 only. Stop immediately after completing its resolution, required documentation updates and status report.**

This approval confirms the OpenAPI design and examples, not generated-document validity, executable-schema correctness, runtime/security verification or human implementation acceptance.

## Answer

Resolved on 2026-10-25 under explicit Q14 final confirmation, with no material discrepancies or further design revisions requested.

- **Approved choice:** the complete [OpenAPI design specification](../design/openapi-specification.md) and [example/counterexample companion](../design/openapi-examples.md), incorporating Q1–Q13 and all O1–O16 checkpoints. Their exact operation/schema/security/error/serialization/runtime-rule mappings remain in those assets rather than being duplicated here.
- **Retained/refined behavior:** preserve all controlling catalog/schema/tooling requirements and independently operational browser-local behavior. Q11–Q13 explicitly clarify enrollment observations, initial preserved-description validation and prohibited-content/media precedence. Strict server wire roles and separate tolerant readers remain binding; no production behavior is changed.
- **Minimum preparation/outcome:** documentation and contract design only. This resolution creates no production schemas, generator, OpenAPI artifact, dependency, endpoint, test or application edit.
- **Deferred work/trigger:** actual catalog/shared-schema/guard/assembler implementation and generated/validated OpenAPI belong to separately authorized implementation planning after readiness. Browser/compiled-API imports, executable positive/negative fixture validation and authoritative HTTP/domain/security evidence remain required then. Broader evidence/readiness decisions retain their existing owners and are not started by this resolution.
- **Verification and human acceptance:** documentary preflight and independent consistency review are recorded above; O1–O16 plus E1–E34/S1–S16 remain the reproducible future evaluation guide. User design review is complete through Q14. Generated-document validity, executable-schema correctness, runtime/security proof and human implementation acceptance remain pending actual implementation/evaluation observations.
- **Explicit authorization/stop:** Q14 authorizes this decision's resolution, map/reference updates and documentation checks only. No subsequent ticket is claimed or worked; no application change, install, commit or push. Unrelated workspace/index state is preserved.

First concrete future evaluation action, only when a separately authorized implementation exists: start O1 by enumerating all 27 method/path/operationId entries, resolving the root server URL against each full catalog path and checking the single /api prefix and approved identities/tags/version. Record observations, then continue the applicable O2–O16 features. No runtime evaluation is started now.


### Resolution preflight — 2026-10-25

Documentation/consistency checks passed after Q14 resolution:27 unique method/path/operationId entries,22 exact explicit catalog matches/five GET-derived HEADs,115 exact approved exports,60 parseable literal JSON fixture blocks, eight canonical32-byte/43-character mock token occurrences, exact seven-day completed-outcome fixture retention,22 error-code matches,13 runtime declarations,14 Q1–Q14 traceability rows and16 evaluation checkpoints. All85 local link targets across the six updated documents resolve; Answer/Comments anchors resolve where referenced. Dependency graph is acyclic and this decision's prerequisites are resolved. Exactly one owning Answer and one map decision entry exist.

Every other ticket's status/type/labels/parent/assignee/dependency lines are byte-for-byte unchanged. Read-only hashes confirm all non-authorized tracked/untracked files captured at the start of resolution remain unchanged; staged-index raw state is also unchanged, including unrelated memory deletions. Only six authorized documentation paths were edited by this resolution: the owning ticket, both approved design assets, map and two existing downstream reference sections. Documentation whitespace checks passed. No subsequent decision was claimed/started, application/dependency change made, production OpenAPI generated, commit made or push performed.

These are documentary consistency results, not generated-document/schema/runtime/security evidence. Q14 establishes completed design review only; all future implementation evidence and human implementation acceptance remain pending. Resolution work stops after the status report.
