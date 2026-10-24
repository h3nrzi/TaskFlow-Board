# TaskFlow API Architecture & Integration Readiness — decision map

Labels: wayfinder:map

## Destination

Reach a user-approved TaskFlow API architecture and integration-readiness design for the MVP before implementing its NestJS modules. Planned deliverables include an API Architecture Blueprint, a concrete Endpoint Catalog, shared Schema-First contract specifications, domain/business-rule specifications, an OpenAPI Specification, and an integration/contract-testing strategy. Preserve module-by-module backend development and frontend integration, and an independently operational browser-local MVP.

## Notes

- Apply the approved ownership and activation decision linked in Decisions so far to every subsequent ticket; earlier whole-workspace transition wording is superseded by module-by-module integration.
- Destination expanded by explicit user approval on 2026-10-24. API architecture and concrete API contract design are first-class readiness goals. This supersedes earlier deferral of endpoint/transport detail until module implementation. Readiness remains planning-only, followed by separate implementation planning; no application changes or implementation tickets in this effort.
- Approved architectural direction: progressive integration. Identify minimum frontend preparation for future asynchronous operations and incremental API integration. Connect and verify NestJS capabilities as they become available; an all-at-once migration is not required.
- Design the MVP API surface and its required domain/access semantics during readiness. Actual backend persistence, authentication implementation and deployment remain later work. Do not infer a database, ORM, authentication mechanism, collaboration system or deployment topology from the expanded destination.
- Approved Contract-First direction: a shared monorepo contracts package owns API DTOs, common enums, request/response schemas, error contracts and account/profile contracts. Runtime schemas are the source of truth with inferred TypeScript types; validate API inputs/responses at relevant boundaries. UI state, browser snapshots and business logic stay outside. Tooling/package approvals live in the resolved tooling decision linked in Decisions so far; no production package is implemented.
- Apply the approved contract specification linked from the resolved contract decision in Decisions so far. Subsequent sessions must read its latest approved requirements and supersessions rather than infer current requirements from earlier discussion entries. Tooling is resolved; remaining API-design decisions retain their named owners. Architectural approval does not establish implementation acceptance.
- Every architectural choice needs explicit user approval. Apply the resolved tooling design linked in Decisions so far; design approval does not establish implementation acceptance. No repository, optimistic update policy, cache, rollout mechanism, database or sync system is implicitly selected.
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

- [Research shared-schema and OpenAPI tooling compatibility](issues/09-schema-tooling-evidence.md#answer): source-backed comparison identifies viable schema approaches, version constraints and design-time OpenAPI requirements without selecting tooling.
- [Verify catalog-driven OpenAPI generator compatibility](issues/15-openapi-generator-evidence.md#answer): isolated probes compare native conversion/catalog assembly with a purpose-built generator; neither meets visible-failure requirements without safeguards.
- [Choose shared-schema and OpenAPI tooling](issues/10-contract-tooling.md#answer): Zod 4 shared schemas, Nest-side nestjs-zod and catalog-driven native conversion/OpenAPI 3.1 assembly, with mandatory safeguards to demonstrate during implementation and a first-module client-tooling review.
- [Define the frontend-facing contract needed for incremental API integration](issues/03-api-contract.md#answer): approved domain and frontend-facing contract specification, including resource fields, canonicalization, access/deletion privacy, account guarantees and compatibility; exact HTTP/schema design and email-security scope retain downstream owners.

## Not yet specified

- Integration-specific complications may emerge as the remaining domain, schema and API decisions settle. Graduate concrete questions about cross-boundary operations, ordering, conflicts or reconciliation only where the chosen direction makes them necessary; do not assume distributed transactions or offline synchronization.
- Further external research or a throwaway prototype may become necessary beyond the ticketed tooling and catalog-driven generator evidence. Identify a precise uncertainty first, then create the appropriate child and dependency.
- A chosen contract or module boundary may expose compatibility and recovery cases not visible yet. Promote each precise new decision when it emerges rather than silently assigning an implementation task.

## Out of scope

- Application, API, test, dependency or configuration changes; implementation tickets, estimates and build sequencing. Implementation planning begins after the decision map is resolved and the user approves its conclusions.
- Implementing backend persistence/authentication, database schemas/ORMs, production deployment or multi-user collaboration. API-facing access and account/assignment requirements are in scope for design; adding collaborative product behavior requires explicit user approval.
- Unapproved product changes. Current browser-local behavior remains unchanged during planning. Future API date representation/display, optional free-text assignees and private workspace scope are approved as noted above. projectId: null for standalone tasks is approved. Preserve standalone-task support and project deletion cascade. Future reconsideration of account-linked assignment does not itself authorize collaboration or broader product redesign; revisit when collaboration is approved.
- Treating incremental integration as an implicit requirement for offline sync, background queues, automatic failover, dual writes or universal abstractions.
- Reopening completed MVP/E2E work or claiming broader human acceptance from automated evidence.

- [Choose the policy for existing local data when remote capabilities arrive](issues/06-local-data-migration.md#answer): retired because development data is disposable and the user explicitly excludes transition migration, import/export, preservation and offline synchronization.
