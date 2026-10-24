# TaskFlow API Architecture & Integration Readiness — decision map

Labels: wayfinder:map

## Destination

Reach a user-approved TaskFlow API architecture and integration-readiness design for the MVP before implementing its NestJS modules. Planned deliverables include an API Architecture Blueprint, a concrete Endpoint Catalog, shared Schema-First contract specifications, domain/business-rule specifications, an OpenAPI Specification, and an integration/contract-testing strategy. Preserve module-by-module backend development and frontend integration, and an independently operational browser-local MVP.

## Notes

- Apply the approved ownership and activation decision linked in Decisions so far to every subsequent ticket; earlier whole-workspace transition wording is superseded by module-by-module integration.
- Destination expanded by explicit user approval on 2026-10-24. API architecture and concrete API contract design are first-class readiness goals. This supersedes earlier deferral of endpoint/transport detail until module implementation. Readiness remains planning-only, followed by separate implementation planning; no application changes or implementation tickets in this effort.
- Approved architectural direction: progressive integration. Identify minimum frontend preparation for future asynchronous operations and incremental API integration. Connect and verify NestJS capabilities as they become available; an all-at-once migration is not required.
- Design the MVP API surface and its required domain/access semantics during readiness. Actual backend persistence, authentication implementation and deployment remain later work. Do not infer a database, ORM, authentication mechanism, collaboration system or deployment topology from the expanded destination.
- Approved Contract-First direction: a shared monorepo contracts package owns API DTOs, common enums, request/response schemas, error contracts and account/profile contracts. Runtime schemas are the source of truth with inferred TypeScript types; validate API inputs/responses at relevant boundaries. UI state, browser snapshots and business logic stay outside. Exact tooling remains open; `packages/contracts` is the proposed location, not an implemented package.
- Partial approvals in the claimed contract decision are recorded there, not treated as a resolved answer. Server IDs are opaque strings; omitted update fields are unchanged, supported fields clear with null, and future API standalone tasks use projectId: null. Approved product scope: private account workspaces; defer collaboration. Due dates are calendar dates; creation/update metadata uses server-controlled instants. Task due dates use YYYY-MM-DD without timezone conversion; server-controlled creation/update timestamps use UTC ISO 8601 with milliseconds and display in the viewer's local timezone. Assignees are optional free text, distinct from account identity; revisit account-linked assignment when collaboration is approved. This is a current product choice, not a permanent architectural restriction. Already-absent deletion confirms absence successfully; missing updates return not-found, and authentication/authorization/service failures remain explicit errors. Tooling and remaining API-design choices are still open.
- Every architectural choice needs explicit user approval. No schema library, adapter, repository, optimistic update policy, cache, rollout mechanism, database or sync system is implicitly selected.
- Consult Wayfinder, grilling and domain-modeling in each decision session. Consult docs/agents/issue-tracker.md and docs/agents/domain.md. Use Context7 if a decision needs current library-specific documentation; use a research child ticket if external evidence is needed. The shared-schema tooling evidence ticket is now a precise external research prerequisite; it supplies facts, not tooling approval.
- Decision children are human-in-the-loop grilling decisions; research children gather facts without substituting for user approval. Ask across the breadth of the selected question, recommend alternatives with concrete scenarios, then wait for the user's answers. Charting resolves no child ticket.
- Follow local tracker lifecycle and dependencies. Claim the lowest-numbered open, unblocked, unclaimed child before working it. Resolve at most one non-research decision per session. Append an approved answer under its ticket's Answer heading, mark resolved, and index only its gist here.
- Every answer must distinguish: approved choice; retained or explicitly revised behavior; minimum preparation (if any); documentation/contract-only outcome; deferred work and trigger; verification implications; explicit user approval. A topic does not imply a code change. Closed earlier answers retain their historical context; the expanded destination and later explicit approvals supersede conflicting deferrals without rewriting that history.
- Baseline facts and prior phase evidence are context, not readiness proof. See [frontend architecture](../../docs/architecture/frontend.md), [final E2E evaluation](../../docs/testing/e2e-coverage-hardening-evaluation.md), and [E2E audit](../../docs/testing/e2e-coverage-hardening-audit.md). Automated completion and human acceptance remain separate.
- Planning preflight: read-only inspection at 62fde940d3b6e0d3a96983b2aaf4c14e167a0f39; checkout clean before these artifacts. Inspected workspace types, operations, validation, persistence, shell coordination and API health skeleton. No tests, builds or runtime checks executed in this charting session. Historical E2E evidence reports three consecutive runs of 270 passes / 6 justified skips, with repository checks passing; it does not establish integration readiness.

### Planned deliverable ownership

This table identifies decision owners, not approved designs or completed deliverables. Detailed specifications live in linked ticket assets; the map remains an index. Design documents and an OpenAPI design artifact are within planning; installing dependencies, creating a production contracts package, wiring generators and implementing endpoints are outside it.

| Deliverable | Decision owner |
| --- | --- |
| Domain and business-rule specifications, including date/assignment decisions | [Define the frontend-facing contract needed for incremental API integration](issues/03-api-contract.md) |
| API Architecture Blueprint | [Define the API Architecture Blueprint for progressive integration](issues/11-api-architecture-blueprint.md) |
| Endpoint Catalog: concrete paths, methods, requests, responses and errors | [Design the MVP Endpoint Catalog](issues/12-endpoint-catalog.md) |
| Shared Schema-First contract specifications | [Specify the shared Schema-First contracts](issues/13-shared-schema-contracts.md) |
| OpenAPI Specification | [Specify the OpenAPI document and its contract consistency rules](issues/14-openapi-specification.md) |
| Integration and contract-testing strategy | [Choose evidence that proves local independence and each integration increment](issues/07-testability.md) |

## Decisions so far

- [Choose the unit and ownership rules for progressive integration](issues/01-progressive-integration-boundary.md#answer): integrate and verify modules progressively in one workspace, with one authority per coupled domain and explicit activation; profile follows real accounts, theme stays local, and connected failures never silently fall back.
- [Choose the minimum persistence boundary for local and future remote operation](issues/02-persistence-boundary.md#answer): keep source selection behind explicit domain operations, isolate connected authority from local snapshot persistence, distinguish completion states, and defer concrete abstractions until justified.

- [Research shared-schema and OpenAPI tooling compatibility](issues/09-schema-tooling-evidence.md#answer): source-backed comparison identifies viable schema approaches, version constraints and design-time OpenAPI requirements; tooling selection remains unapproved.

## Not yet specified

- Integration-specific complications may emerge as the remaining domain, schema and API decisions settle. Graduate concrete questions about cross-boundary operations, ordering, conflicts or reconciliation only where the chosen direction makes them necessary; do not assume distributed transactions or offline synchronization.
- Beyond the now-ticketed schema/OpenAPI tooling comparison, further external research or a throwaway prototype may become necessary to discriminate between live alternatives. Identify a precise uncertainty first, then create the appropriate child and dependency.
- A chosen contract or module boundary may expose compatibility and recovery cases not visible yet. Promote each precise new decision when it emerges rather than silently assigning an implementation task.

## Out of scope

- Application, API, test, dependency or configuration changes; implementation tickets, estimates and build sequencing. Implementation planning begins after the decision map is resolved and the user approves its conclusions.
- Implementing backend persistence/authentication, database schemas/ORMs, production deployment or multi-user collaboration. API-facing access and account/assignment requirements are in scope for design; adding collaborative product behavior requires explicit user approval.
- Unapproved product changes. Current browser-local behavior remains unchanged during planning. Future API date representation/display, optional free-text assignees and private workspace scope are approved as noted above. projectId: null for standalone tasks is approved. Preserve standalone-task support and project deletion cascade. Future reconsideration of account-linked assignment does not itself authorize collaboration or broader product redesign; revisit when collaboration is approved.
- Treating incremental integration as an implicit requirement for offline sync, background queues, automatic failover, dual writes or universal abstractions.
- Reopening completed MVP/E2E work or claiming broader human acceptance from automated evidence.

- [Choose the policy for existing local data when remote capabilities arrive](issues/06-local-data-migration.md#answer): retired because development data is disposable and the user explicitly excludes transition migration, import/export, preservation and offline synchronization.
