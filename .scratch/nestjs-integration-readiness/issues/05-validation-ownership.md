# Assign validation ownership across forms, domain rules and external data

Status: resolved
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: Codex (current wayfinder session)
Blocked by: 03

## Question

Which layer owns each kind of validation, and what needs to be agreed now for future API input/output while local behavior stays intact?

Separate user-facing form feedback, domain invariants, stored-data validation, transport validation and authoritative server rejection. Use whitespace-only names, nonexistent project assignment, optional-field clearing, malformed dates and a server rejecting a form-valid request as scenarios.

Include the boundary between a local demo profile and a real account/profile when authentication is enabled; API-visible transport/account enforcement requirements belong to this readiness design; backend enforcement implementation remains later work.

Decide where duplicate checks are intentional, how field and operation errors reach callers, and how to apply the approved shared runtime-schema source of truth. Identify existing checks that can remain unchanged, any minimum ownership clarification or preparation, and server enforcement requirements to specify now versus implementation deferred to backend work. A trusted TypeScript type alone does not settle how external data is checked.

## Existing evidence

Full-workspace validation is in validation.ts; shell/auth/settings perform form checks. Transitions normalize some text but do not independently enforce all invariants. Existing stored-data validation protects local recovery behavior and is not already an API response contract.

Source paths: `apps/web/src/workspace/`, `apps/web/src/app/workspace-shell.tsx`, `apps/api/src/app.module.ts`, `docs/architecture/frontend.md`, and `docs/testing/e2e-coverage-hardening-audit.md`. These are inspected facts, not approved architectural answers.

## Resolution requirements

Human-in-the-loop decision. Use grilling and domain-modeling; ask the live user, do not substitute their answers. Record alternatives, trade-offs, retained behavior, preparation if needed, deferrals and verification implications. Explicit user approval is required before resolution. Keep implementation tickets and application changes outside this map.


## Prerequisites

- [Define the frontend-facing contract needed for incremental API integration](03-api-contract.md)

## Comments

### Decision session opened — 2026-10-24

Claimed the lowest-numbered open, unblocked, unclaimed decision. Applied Wayfinder, grilling and domain-modeling; read tracker/domain instructions, glossary, the approved frontend-facing contract and shared-schema tooling specifications, and the async decision. Delegated read-only inspection confirms form checks, uneven transition normalization and a separate stored-snapshot validator. Those local facts do not select future API enforcement or justify a local refactor.

First discussion frontier, awaiting explicit user answers:

1. Forms own timely feedback; shared schemas own API payload contracts; authoritative backend domain operations enforce business/access rules even when callers bypass forms. Duplicate boundary checks are intentional, with no mandatory form rewrite.
2. Validate raw request shape/types/allowed fields, explicitly canonicalize approved text fields outside wire schemas, then validate normalized field constraints before domain/access enforcement. Preserve descriptions and omission/null distinctions. Raw boundary checks must not apply normalized-value length limits prematurely.
3. Validate external API responses before authoritative frontend use; validate server output before sending it. Keep stored-snapshot validation/recovery distinct and preserve local behavior. An invalid connected response never triggers demo/local fallback; uncertain mutation outcomes follow the approved async policy.
4. Shared field paths/codes carry safe validation failures; forms map recognized editable fields to inline feedback and retain all other errors as visible operation feedback. Server validation can reject form-valid input; dynamic access/reference rules remain authoritative at commit time, without foreign-resource disclosure.

These are proposals, not approvals. Exact canonicalization/schema composition, dynamic-rule failure scenarios, account boundaries and remaining edge cases will be sharpened after this round. No Answer or resolution is recorded. No application, dependency or configuration changes are made.

Actual preflight: initial git status after claiming showed only this ticket modified; git diff --check passed after the claim. Read approved contract requirements for normalized Unicode-code-point limits, null clearing, date representation, response readers and domain privacy. No application tests, builds or API runtime checks ran. First concrete action: answer this discussion round in chat. Future implementation evaluation remains pending user observations.

### User decisions — 2026-10-24, first discussion round

The user explicitly approved Q1–Q4 with these binding clarifications:

- Q1: React forms provide early user-friendly feedback. Shared Zod contracts define structural wire-payload validity and relevant declarative constraints. NestJS domain operations authoritatively enforce business rules, account ownership, relationships and access. Browser checks never replace backend enforcement. Preserve existing local forms unless a specific integration requires changes.
- Q2: validate incoming JSON structure/types first; explicitly normalize text outside shared wire schemas; then validate normalized-value constraints and domain rules. Apply approved Unicode-code-point limits after trimming titles, project names, display names and non-null assignees. Reject normalized blank required names/titles and blank non-null assignees. Preserve descriptions, line breaks and omitted-versus-null semantics. Early structural checks must not reject solely because surrounding whitespace makes raw length exceed a normalized-value limit. Distinct stages must avoid duplicate or contradictory length enforcement; no implicit schema transforms or defaults.
- Q3: validate server output and frontend-received API responses before authoritative use. Preserve strict server output and tolerant-extra-field frontend readers. An invalid mutation success response means unconfirmed completion under the approved async policy, never confirmed success or definite rejection. Never fall back silently to local/demo behavior. Browser snapshot validation/recovery stays separate.
- Q4: recognized editable-field errors appear inline; other validation, domain, authorization, conflict and service errors receive safe visible operation feedback as appropriate. Form-valid requests can still be rejected authoritatively. Definite rejection preserves drafts. Enforce project existence/ownership at mutation commit time without foreign-resource disclosure; expose no internal details.

These are approved architectural requirements, not implementation acceptance. The ticket remains claimed pending remaining edge cases and consolidated confirmation.

### Next discussion frontier — proposals awaiting approval

- Q5: use distinct raw-input and canonical-value validation stages derived from common field definitions. Raw input admits surrounding whitespace; explicit normalization produces canonical values; normalized constraints apply once at their proper stage. Canonical server responses must already satisfy canonical-value requirements and must not be silently repaired by readers. Keep changing business/access rules outside the shared contracts package. Exact schema inventory and declarative/runtime-only representation remain with the shared-schema owner.
- Q6: at a connected profile boundary, derive the target account from authenticated context; never accept editable account identity or account email through an ordinary display-name update. Demo-profile values provide no proof of identity, ownership or authorization. Apply approved display-name normalization/constraints independently of old demo-form checks. Authentication mechanism and email-change security remain with their named owners.
- Q7: reject an invalid read payload as a whole for that operation rather than salvage individual collection items or silently repair dates/nulls/relationships. Retain previously validated account-scoped data only as visibly stale/unavailable as appropriate; do not present it as a successful fresh read. Malformed error payloads produce safe operation feedback without rendering raw server content or trusting field paths; they do not establish definite rejection of an uncertain write.

Planning preflight: reread the existing claim and discussion checkpoint; only this ticket was modified. No application tests, builds or runtime/API checks ran. First concrete action: answer Q5–Q7. Future implementation evaluation remains pending user observations.

### User decisions — 2026-10-24, validation stages and trust boundaries

The user explicitly approved Q5–Q7 with these binding clarifications:

- Q5: distinct raw-input and canonical-value validation stages share reusable field definitions/constraints where appropriate. Raw structural checks permit surrounding whitespace and cannot prematurely apply normalized-value limits. Explicit normalization stays outside shared wire schemas; canonical checks enforce nonblank and Unicode-code-point lengths. Responses must already be canonical; frontend readers never trim, coerce, default or repair known fields. They may strip additional fields under the approved compatibility policy. Backend domain operations own account scope, cross-resource relationships and business rules outside packages/contracts.
- Q6: derive connected-profile identity/target exclusively from authenticated server context, never demo state, arbitrary client account IDs or editable profile fields. Ordinary profile updates accept display-name changes only, with approved server normalization/validation; ID/email are not editable there. Authentication and secure email-change behavior retain their designated owners.
- Q7: invalid read responses fail the entire read, without discarding individual entries, repairing dates/nulls or partially committing collections. Previously validated data may remain visible with explicit stale/error feedback, never as successful refresh. Validate errors before field/message use; malformed/untrusted errors produce safe operation feedback without raw server content. A malformed error alone cannot establish definite rejection when a dispatched mutation's outcome cannot be reliably classified; preserve approved uncertainty/recovery behavior.

### Complete specification prepared for confirmation — 2026-10-24

[Validation ownership and canonicalization requirements](../design/validation-policy.md) consolidates Q1–Q7, nine reproducible evaluation scenarios and downstream owners. All detailed choices are approved; Q8 asks whether the consolidated policy captures shared understanding and may resolve this decision. The ticket remains claimed without an Answer; no map resolution entry is added.

Existing blueprint, catalog, schema, OpenAPI and testability owners receive pointers to this policy. Its precise downstream questions fit existing tickets; no new child or fog graduation is necessary. No new product term or ADR is needed. No application/dependency/configuration/test changes are made.

Actual preflight: retained this session's existing claim and history; read this ticket, the approved contract/tooling assets, async answer and relevant downstream scopes. Checked the policy against Q1–Q7, especially normalized Unicode lengths, no hidden schema transforms, canonical responses, whole-read failure, account targeting and uncertain malformed mutation outcomes. Documentation checks and their results are recorded below. No application tests, builds or runtime/API checks ran. First concrete action: review the linked policy and answer Q8 in chat. Future implementation evaluation remains pending user observations.

Documentation results: git diff --check passed; 16 ticket lifecycle/dependency records validated; dependency graph acyclic; all 124 local Markdown link targets exist. Confirmed this decision remains claimed without an Answer. The map remains unchanged. The nine linked scenarios are the reproducible guide; no runtime or human implementation acceptance is inferred.

### User confirmation — 2026-10-24

Q8 explicitly confirmed: the user reviewed the complete validation policy against Q1–Q7 and their clarifications, including all nine evaluation scenarios. The user confirmed validation ownership, raw/canonical stages, explicit normalization, authoritative backend business/access enforcement, API response/error validation, authenticated account boundaries, local independence and downstream responsibilities, found no material discrepancies, and approved the specification and resolution. Implementation acceptance remains pending. This supersedes earlier pending-confirmation checkpoints without rewriting their history.

## Answer

Resolved on 2026-10-24 with explicit Q8 confirmation of [Validation ownership and canonicalization requirements](../design/validation-policy.md). The linked specification is the canonical consolidated requirement artifact; Comments retain approvals, clarifications and alternatives.

Approved choice: forms provide early feedback; shared schemas define structural/declarative contracts; backend domain operations authoritatively enforce business/access rules and commit-time relationships. Raw structure validation precedes explicit normalization outside wire schemas and canonical nonblank/Unicode-code-point constraints. Server output and frontend responses/errors are validated; responses are already canonical, invalid reads fail as a whole, malformed mutation outcomes retain the approved uncertainty policy, and connected profile identity comes exclusively from authenticated server context.

Retained/revised behavior: preserve browser-local forms, snapshot validation/recovery and independent operation unless a specific integration requires changes. Intentional checks at distinct trust boundaries reuse shared definitions rather than competing payload contracts. Reject premature raw-length limits, hidden schema transforms/defaults, response repair, partial collection salvage, frontend-only enforcement and silent local/demo fallback. Definite rejection preserves drafts; unsafe errors never expose raw server/internal content.

Minimum preparation/outcome: documentation and contract requirements only. Before activation, each connected module must satisfy the applicable staged validation, authoritative account/domain enforcement, canonical response/error validation and async recovery requirements. No application, dependency, configuration or test changes and no mandatory preliminary form refactor.

Deferred details and triggers: existing blueprint, catalog, schema, OpenAPI, email-change and testability owners retain their named responsibilities in the linked policy. Exact schema inventory, runtime-only constraint representation, transport/error encoding, authentication/email security and commit-time enforcement design remain with those owners. Concrete wiring, abstractions and enforcement implementation await separate implementation planning. Existing tickets cover the now-precise questions; no new child or fog graduation is needed. No database, ORM, authentication mechanism or synchronization system is selected.

Verification/handoff: Q8 approves the specification and all nine reproducible review scenarios as design requirements. They are not executed runtime evidence. Documentation preflight checks approval consistency, local links, lifecycles/dependencies, graph acyclicity and whitespace. No application tests, builds or API runtime checks ran. Human implementation evaluation/acceptance remains pending observations.

First concrete action: resume the map with [Define the API Architecture Blueprint for progressive integration](11-api-architecture-blueprint.md), the next lowest-numbered open, unblocked, unclaimed decision. This session resolves only the validation decision.

Final documentation results: git diff --check passed; 16 ticket lifecycle/dependency records valid; dependency graph acyclic; all 128 local Markdown link targets exist. Confirmed this decision is resolved with an Answer and the blueprint decision is next on the frontier. Updated specification approval status and five downstream pointers; map contains only the decision gist/link. No application/runtime checks or implementation acceptance are claimed.
