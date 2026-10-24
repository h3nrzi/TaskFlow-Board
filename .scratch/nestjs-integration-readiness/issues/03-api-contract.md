# Define the frontend-facing contract needed for incremental API integration

Status: claimed
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: Codex (current wayfinder session)
Blocked by: 01, 10

## Question

What minimum data, operation and error contract must frontend and future NestJS capabilities agree on, independently of a server implementation?

Define the necessary guarantees for reads, create/update/delete results, IDs, optional and cleared fields, standalone project assignment, dates, validation errors, missing resources and project deletion cascade. Use the approved shared Schema-First API contract as the single frontend/backend API source of truth. Distinguish internal UI/storage concerns from the shared API contract; do not reopen separate frontend/backend API contracts.

Include frontend-facing real-account/profile and authentication contracts needed for an authentication increment while tasks/projects remain local. Do not treat the demo profile as authenticated identity; theme remains browser-local. Specify only readiness requirements, not backend authentication design.

What compatibility and contract-evolution rules are needed for incremental capabilities? The expanded destination now requires concrete endpoint design during readiness, owned by the Endpoint Catalog child. Establish the domain/business-rule specification here, including calendar dates versus timestamps and free-text versus account-linked assignment, with explicit user approval. Current local semantics do not freeze those future API choices. Detailed retry, versioning or idempotency guarantees should be specified only where the chosen operations require them, with unresolved dependent questions ticketed.

## Existing evidence

There are no domain API endpoints or DTOs. /api is the documented future browser API base; only /api/healthz is implemented. Local IDs are generated from Date.now(); standalone tasks use an empty projectId, assignees are free text, and stored creation/update dates are date-only strings.

Source paths: `apps/web/src/workspace/`, `apps/web/src/app/workspace-shell.tsx`, `apps/api/src/app.module.ts`, `docs/architecture/frontend.md`, and `docs/testing/e2e-coverage-hardening-audit.md`. These are inspected facts, not approved architectural answers.

## Resolution requirements

Human-in-the-loop decision. Use grilling and domain-modeling; ask the live user, do not substitute their answers. Record alternatives, trade-offs, retained behavior, preparation if needed, deferrals and verification implications. Explicit user approval is required before resolution. Keep implementation tickets and application changes outside this map.

## Comments

### User decisions — 2026-10-24, first discussion round

- Approved Q1: readiness defines data, operation, result and error semantics; exact endpoint paths, HTTP methods and response envelopes wait for each module's integration.
- Rejected the Q2 recommendation to maintain separate frontend and backend API contracts. Contract-First with shared API types, DTOs and contracts in the pnpm monorepo is an explicit architectural goal of this readiness phase. Consider a shared package such as `packages/contracts`, with runtime-validation schemas where justified. Exact tooling remains open. This supersedes the rejected recommendation; it does not yet select a schema library or package implementation.
- Approved Q3: connected operations express domain actions rather than upload the browser's whole workspace snapshot. Project deletion includes its task cascade under one authority; local task saves must not overwrite connected profile authority.
- Approved Q4: specify frontend requirements for current authenticated account, profile load/update, authentication versus service failures, and sign-out completion; defer the authentication mechanism.

These are partial explicit approvals. The ticket remains claimed pending the remaining contract decisions and final confirmation of shared understanding. No application or package changes are authorized within this planning map.

### User decisions — 2026-10-24, second discussion round and destination expansion

- Q5 approved: shared contracts package in the pnpm monorepo for API DTOs, common enums, request/response schemas, error contracts and account/profile contracts. Exclude internal UI state, browser-storage snapshots and business logic.
- Q6 approved: runtime schemas are the source of truth; infer TypeScript types and validate API inputs/responses at relevant boundaries. Tool selection remains open and requires evidence plus explicit user approval.
- Q7 partially approved: NestJS generates authoritative connected resource IDs; the frontend treats them as opaque strings. Calendar dates versus timestamps and free-text versus account-linked assignment remain open, driven by the intended product model. The recommendation to freeze MVP date/assignee semantics was not approved.
- Q8 approved with revision: omitted update fields mean unchanged; explicit null clears supported fields. Standalone tasks use projectId: null in the future shared API contract, replacing the proposed empty string. No browser-local code/storage change is made here.
- Q9 approved: authoritative resources from create/update; confirmed deletion/cascade; restrict server-controlled fields; consistent validation, not-found, authentication, authorization and service errors. Repeated-deletion outcomes must be specified. The user's approval requires an explicit outcome; detailed endpoint encoding remains open for the catalog.
- Q10 approved: check both consumers and potentially different deployed frontend/backend versions; avoid unnecessary versioning infrastructure.
- Destination explicitly expanded to TaskFlow API Architecture & Integration Readiness. Design the MVP API surface before implementing corresponding NestJS modules. Planned deliverables: API Architecture Blueprint; concrete Endpoint Catalog; shared Schema-First contracts; domain/business-rule specifications; OpenAPI Specification; integration/contract-testing strategy.
- This supersedes the first-round Q1 endpoint-detail deferral and earlier map scope exclusions where they conflict. Module-by-module development/integration and planning-only scope remain in force.
- Explicit instruction: do not resolve this ticket prematurely. Dates, assignees, tooling and newly necessary API-design choices still require approval.

### Scope/dependency reevaluation — 2026-10-24

This ticket remains claimed and owns the semantic/domain decisions and their linked specification asset. The tooling choice is now a prerequisite to final resolution, but product questions may continue while tooling evidence is gathered. Existing validation and async children retain their own decisions. New children own tooling evidence/approval, the architecture blueprint, concrete endpoints, shared schema specifications and OpenAPI. Creating those children records questions, not selected architecture. No decision ticket is resolved by this update.

## Prerequisites

- [Choose the unit and ownership rules for progressive integration](01-progressive-integration-boundary.md)
- [Choose shared-schema and OpenAPI tooling](10-contract-tooling.md)

### Rechart preflight and review guide — 2026-10-24

Actual evidence: initial git status showed only this ticket and the map modified from the earlier discussion. Read the map and all live downstream questions plus tracker/domain instructions. Inspected repository manifests for research context; pnpm workspace currently includes apps/* only, with no contracts package created. Reviewed the revised scope against the user's Q5–Q10 decisions and expanded destination. Earlier approved Answers remain historical; only their map-name parent links were updated.

Planning checks passed: git diff --check; all 14 ticket lifecycles and dependency references are valid; dependency graph is acyclic; local Markdown link targets exist; this ticket remains claimed with no Answer. New decision tickets are open, not approved; the tooling research ticket may be independently claimed/resolved as evidence. No application tests, builds, live API checks or human implementation evaluation were performed or inferred.

Reproducible documentation evaluation:

1. Open the map Destination and planned-deliverable table: confirm all six requested outputs have an owner and concrete endpoint design is in scope before module implementation.
2. Read this ticket's second-round decisions: check opaque server IDs, null clearing/standalone assignment, shared Schema-First authority and consumer compatibility. Verify dates, assignees and tooling are explicitly still open.
3. Follow the tooling evidence -> tooling approval -> contract path, then architecture -> Endpoint Catalog -> schema specification -> OpenAPI -> testing strategy -> final readiness approval. Validation and async decisions remain prerequisites where needed. Verify no new ticket is an implementation slice.
4. Compare Out of scope with Notes: no application/package/dependency changes; local independence, progressive integration and the absence of automatic fallback remain requirements. Prior endpoint deferral and frozen date/assignee assumptions no longer constrain the expanded design.

First concrete action: answer the pending product-access and date-model questions. Those are live product choices, not implied approvals from recharting. Documentation review and future implementation acceptance remain pending user observations.

### User decisions — 2026-10-24, product model prerequisites

- Q11 explicitly approved via question reply: private account workspace; defer collaboration. The planned MVP does not introduce shared/team workspaces. This is a product-access requirement, not a selection of backend authentication or tenancy implementation.
- Q12 explicitly approved via question reply: due dates are calendar dates; creation/update metadata represents server-controlled timestamp instants. Exact encoding, precision and display rules remain subject to approval.
- Assignment remains undecided. Private workspace scope constrains the alternatives; it does not silently approve free text, self-assignment, assigning other accounts or removing the field.
- Recorded the settled product vocabulary in root GLOSSARY.md. No runtime behavior or browser storage representation changed.

### Discussion round — proposals subsequently approved below

- Q13: recommend keeping an optional free-text assignee label, separate from account identity, for the private-workspace MVP; defer cross-account assignment until collaboration is deliberately approved. Alternatives: owner-only linked assignment or remove assignment from the planned API.
- Q14: recommend dueDate as YYYY-MM-DD without timezone conversion; creation/update timestamps as canonical UTC strings with milliseconds, displayed in the viewer's local timezone. Server-controlled metadata is not editable. Exact encoding/display is awaiting approval.
- Q15: recommend successful confirmed absence for deletion of an already-absent resource in the current account workspace; missing updates return not-found. Authentication/authorization and service failures remain errors; ambiguous-failure retry policy is not chosen. Repeated-deletion semantics are awaiting explicit approval.

Tooling research is independent evidence. Its completion cannot approve tooling or resolve this contract decision.

### User decisions — 2026-10-24, assignment, date representation and repeated deletion

The user explicitly approved the following in chat:

- Q13: assignees remain optional free-text labels for the private-workspace MVP, separate from authenticated account identity. Revisit account-linked assignment when collaboration is approved. This is an intentional current product decision, not a permanent backend architecture limitation.
- Q14: task due dates use YYYY-MM-DD calendar-date strings without timezone conversion. createdAt and updatedAt use server-controlled UTC ISO 8601 timestamps with millisecond precision; display those timestamps in the viewer's local timezone. Creation/update metadata is not user-editable.
- Q15: deletion of an already-absent resource succeeds as confirmed absence. Updating a missing resource returns a defined not-found error. Authentication, authorization and service failures remain explicit errors and must never be masked as successful deletion. This decision does not select automatic retry behavior after an ambiguous failure.

These approvals supersede the corresponding unresolved statements and alternatives in earlier discussion entries. They apply to the planned API, without modifying current browser-local data or behavior. They do not authorize a permanent restriction against future account-linked assignment.

Remaining work: tooling approval is still a prerequisite; complete the domain/business-rule specification and remaining account/profile, field and error-contract details before final shared-understanding confirmation. Concrete endpoint encodings and full schema/OpenAPI design retain their named downstream owners. This ticket remains claimed, with no Answer and no resolution.

Verification/evaluation checkpoint: read Q13–Q15 above against the user's message; confirm optional text assignment is distinct from account identity, due dates are not shifted by timezone conversion, timestamp metadata represents server-controlled instants, and absent-resource deletion never swallows authentication/authorization/service errors. Follow the map to Choose shared-schema and OpenAPI tooling for the next prerequisite. Human evaluation of an implemented integration remains pending; no application change is made by this approval record.
