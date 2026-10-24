# Validation ownership and canonicalization requirements

Decision owner: [Assign validation ownership across forms, domain rules and external data](../issues/05-validation-ownership.md).

Status: approved on 2026-10-24. Q8 explicitly confirmed this complete specification against Q1–Q7 and their clarifications, accepted all nine review scenarios and downstream responsibilities, found no material discrepancies, and authorized resolution of the owning decision. This is a planning specification, not an implemented validation pipeline or implementation acceptance.

## Ownership

React forms provide timely, user-friendly feedback. Existing browser-local forms remain unchanged unless a specific integration requires changes. Client checks never establish permission or replace server enforcement.

Shared contracts define structural API payload validity and relevant declarative constraints, with reusable field definitions and inferred types. Keep business logic, account ownership and cross-resource relationship enforcement outside `packages/contracts`. UI state and browser snapshots retain their own models.

NestJS domain operations authoritatively enforce business rules, authenticated account scope, access and resource relationships. A request that passed frontend checks may still fail. Project existence and ownership must hold at mutation commit time; checking an earlier read is insufficient. Do not disclose whether a foreign resource exists. The approved deletion privacy and cascade semantics remain binding.

Checking at several trust boundaries is intentional. Reuse contract definitions rather than hand-maintain conflicting payload definitions; this does not require rewriting every current form or putting business logic into shared schemas.

## Incoming request pipeline

1. Validate JSON structure, field types, allowed fields and required/optional/null distinctions against raw-input rules. Preserve approved strict request policies, including applicable nested objects and exclusion of server-owned fields.
2. Explicitly normalize only the approved text fields outside shared wire schemas: trim task titles, project names, account display names and non-null assignee labels. Preserve omitted fields and explicit nulls. Preserve descriptions, whitespace and line breaks exactly.
3. Validate canonical values: nonblank required names/titles, nonblank non-null assignees, and approved Unicode-code-point lengths. Apply normalized text limits only after trimming. Validate descriptions against preserved content.
4. Enforce authoritative domain, relationship and access rules. The architecture owner specifies how commit-time guarantees are achieved; no database or transaction implementation is selected here.

Raw-input and canonical-value stages share reusable definitions and constraints where appropriate, but must not have contradictory length enforcement. A title with 200 code points plus surrounding whitespace must not fail merely because its raw length exceeds 200. A canonical 201-code-point title fails. Count code points, not UTF-16 code units, bytes or grapheme clusters.

Shared wire schemas perform no implicit transforms, coercion, defaults or repairs. Canonical-value validation checks that values are already canonical rather than transforming them. The exact schema inventory and representation of declarative versus runtime-only constraints belong to the shared-schema owner, applying the approved tooling safeguards.

Apply the existing [frontend-facing contract](frontend-facing-contract.md): create completeness, partial-update omission, null clearing only for supported fields, empty descriptions, valid calendar due dates and canonical timestamp instants. Wrong types, malformed dates and unsupported nulls cannot be silently reinterpreted. This policy adds no new date or field representation.

## Responses and errors

Validate outgoing server responses against declared shared response schemas, including canonical known-field values and approved output strictness. Validate frontend-received responses before authoritative use. Frontend readers may strip unknown additional fields under the approved nested compatibility policy; they must reject invalid or missing declared fields and must not trim, coerce, default or repair them.

An invalid read fails the entire read operation. Do not salvage individual collection entries or partially commit a collection. Previously validated data for the same account may remain visible with clear stale/error feedback; never present it as a successful refresh. This does not establish a transactionally consistent snapshot across separate requests or add client-side account-ownership inference.

Validate structured error payloads before mapping field paths or displaying messages. Recognized editable-field errors appear inline; remaining validation, domain, authorization, conflict and service errors receive safe visible operation feedback as appropriate. Unrecognized field paths cannot hide an error. Malformed/untrusted error payloads produce safe operation feedback without rendering raw server content or leaking internal details.

Preserve drafts on definite rejection. An invalid mutation success response is unconfirmed completion, not confirmed success or definite rejection. When a dispatched mutation cannot be reliably classified, a malformed error response alone does not prove rejection. Apply [Asynchronous completion, feedback and recovery requirements](async-operation-policy.md), including deliberate recovery, account isolation and no automatic replay. Exact error codes, statuses, field-path encoding and transport remain with catalog/schema owners.

## Account and local boundaries

Derive the identity and target of connected profile operations exclusively from authenticated server context. Demo-profile state, arbitrary client-supplied account IDs and editable profile fields provide no authenticated authority. Ordinary profile updates permit display-name changes only, with server-side normalization and validation. Account ID and email are not editable through ordinary profile updates.

Authentication mechanism and secure email-change scope/behavior remain with their designated decisions. This policy does not select credentials, sessions or an email-change endpoint.

Browser snapshot validation and recovery remain distinct from connected API validation. Preserve existing local operation, storage safeguards and recovery. Never silently fall back to local/demo behavior on connected failures. No local storage migration or refactor is required by this planning outcome.

## Preparation and downstream ownership

This outcome is documentation and contract requirements only. Before activating a connected module, its implementation must satisfy the applicable validation stages, authoritative enforcement, response/error checks and account isolation. No application, dependency, configuration or test changes are made here.

| Remaining design | Owner |
| --- | --- |
| Backend validation responsibilities, account context and commit-time relationship/cascade guarantees | [Define the API Architecture Blueprint for progressive integration](../issues/11-api-architecture-blueprint.md) |
| Request/error transport, statuses and operation-specific outcomes | [Design the MVP Endpoint Catalog](../issues/12-endpoint-catalog.md) |
| Raw/canonical schema inventory, shared definitions, Unicode and calendar constraints, output/reader policies and field paths | [Specify the shared Schema-First contracts](../issues/13-shared-schema-contracts.md) |
| Generated representation and explicit runtime-only constraints | [Specify the OpenAPI document and its contract consistency rules](../issues/14-openapi-specification.md) |
| Email-change scope and security | [Define account email-change scope and security requirements](../issues/16-account-email-change.md) |
| Simulated/live evidence and integration checkpoints | [Choose evidence that proves local independence and each integration increment](../issues/07-testability.md) |

Concrete implementation abstractions, dependency wiring and enforcement mechanisms await separate implementation planning. No new glossary term or ADR is needed: this policy assigns technical responsibilities using already approved product vocabulary.

## Reproducible review and future evaluation

The user reviewed these scenarios against Q1–Q7 and confirmed shared understanding in Q8. During implementation evaluation, reproduce them through the relevant boundaries and record actual observations. These are expected behaviors, not executed runtime evidence.

1. **Bypassed form:** submit whitespace-only title directly to the API. It fails canonical nonblank validation; client validation is unnecessary for enforcement.
2. **Normalized limits:** surround a 200-code-point title with spaces; it passes raw shape and canonical length checks after trimming. A normalized 201-code-point title fails. Include supplementary-plane characters to distinguish code points from UTF-16 units. Repeat at the approved limits for project/display names and assignees.
3. **Preserved values:** descriptions retain spaces/newlines. Omitted update fields stay unchanged; supported nulls clear. A blank non-null assignee fails. Malformed calendar dates, wrong types, unsupported nulls and unknown request fields fail without repair; required create fields are not defaulted.
4. **Changed relationship:** select a project, delete it before task submission, then submit. The authoritative operation rejects the relation and preserves the draft. A foreign-project reference produces no existence leak. Concurrent changes must not bypass commit-time enforcement.
5. **Response boundaries:** server output containing a noncanonical known title fails output validation. A frontend reader rejects the same invalid known field without trimming, while accepting/stripping permitted additional fields. Applicable nested policies behave consistently.
6. **Collection integrity:** place one malformed entry among valid entries. Fail the whole read without partial commit; previously validated same-account data is shown only with stale/error feedback.
7. **Errors and uncertainty:** a validated field error maps inline; an unknown path remains visible as an operation error. Malformed error content never renders raw. Invalid mutation success or unclassifiable malformed failure retains the approved uncertain-outcome recovery policy, without success, replay or local fallback.
8. **Account profile:** attempt to change account ID/email through an ordinary profile request or use demo/client identity as authority. The backend rejects unauthorized fields and targets only the authenticated account. Display-name changes follow canonical constraints.
9. **Local independence:** run the local MVP with API unavailable and exercise existing form/storage recovery behavior. It remains independent; connected failures do not activate demo/local authority. Keep snapshot rules distinct from API schemas.

First concrete action: resume the map with [Define the API Architecture Blueprint for progressive integration](../issues/11-api-architecture-blueprint.md). Human evaluation/acceptance of a future implementation remains pending user observations regardless of design approval or automated checks.
