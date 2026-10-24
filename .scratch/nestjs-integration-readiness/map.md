# TaskFlow NestJS Integration Readiness — decision map

Labels: wayfinder:map

## Destination

Reach a user-approved architectural decision set identifying what must change, what can stay, and what can wait before progressive NestJS integration, sufficient to begin implementation planning. Preserve existing user-facing behavior and a fully operational browser-local MVP independent of NestJS.

## Notes

- Apply the approved ownership and activation decision linked in Decisions so far to every subsequent ticket; earlier whole-workspace transition wording is superseded by module-by-module integration.
- Approved in chat on 2026-10-23: decision-focused readiness, followed by separate implementation planning; no application changes or implementation tickets in this effort.
- Approved architectural direction: progressive integration. Identify minimum frontend preparation for future asynchronous operations and incremental API integration. Connect and verify NestJS capabilities as they become available; an all-at-once migration is not required.
- Actual backend persistence, real authentication and deployment belong to later integration. This map may define frontend-facing requirements and identify future decisions, without designing those systems prematurely.
- Every architectural choice needs explicit user approval. The progressive direction does not choose an adapter, repository, shared DTO package, optimistic update policy, cache, rollout switch, database, or sync system.
- Consult Wayfinder, grilling and domain-modeling in each decision session. Consult docs/agents/issue-tracker.md and docs/agents/domain.md. Use Context7 if a decision needs current library-specific documentation; use a research child ticket if external evidence is needed. No such research prerequisite has been established during charting.
- All initial children are human-in-the-loop grilling decisions. Ask across the breadth of the selected question, recommend alternatives with concrete scenarios, then wait for the user's answers. Charting resolves no child ticket.
- Follow local tracker lifecycle and dependencies. Claim the lowest-numbered open, unblocked, unclaimed child before working it. Resolve at most one non-research decision per session. Append an approved answer under its ticket's Answer heading, mark resolved, and index only its gist here.
- Every answer must distinguish: approved choice; retained behavior; minimum preparation (if any); documentation/contract-only outcome; deferred work and trigger; verification implications; explicit user approval. A topic does not imply a code change.
- Baseline facts and prior phase evidence are context, not readiness proof. See [frontend architecture](../../docs/architecture/frontend.md), [final E2E evaluation](../../docs/testing/e2e-coverage-hardening-evaluation.md), and [E2E audit](../../docs/testing/e2e-coverage-hardening-audit.md). Automated completion and human acceptance remain separate.
- Planning preflight: read-only inspection at 62fde940d3b6e0d3a96983b2aaf4c14e167a0f39; checkout clean before these artifacts. Inspected workspace types, operations, validation, persistence, shell coordination and API health skeleton. No tests, builds or runtime checks executed in this charting session. Historical E2E evidence reports three consecutive runs of 270 passes / 6 justified skips, with repository checks passing; it does not establish integration readiness.

## Decisions so far

- [Choose the unit and ownership rules for progressive integration](issues/01-progressive-integration-boundary.md#answer): integrate and verify modules progressively in one workspace, with one authority per coupled domain and explicit activation; profile follows real accounts, theme stays local, and connected failures never silently fall back.
- [Choose the minimum persistence boundary for local and future remote operation](issues/02-persistence-boundary.md#answer): keep source selection behind explicit domain operations, isolate connected authority from local snapshot persistence, distinguish completion states, and defer concrete abstractions until justified.

## Not yet specified

- Integration-specific complications may emerge once the unit of integration and ownership are chosen. Graduate concrete questions about cross-boundary operations, ordering, conflicts or reconciliation only where the chosen direction makes them necessary; do not assume distributed transactions or offline synchronization.
- External research or a throwaway prototype may become necessary to discriminate between live alternatives. Identify a precise uncertainty first, then create the appropriate child and dependency.
- A chosen contract or module boundary may expose compatibility and recovery cases not visible yet. Promote each precise new decision when it emerges rather than silently assigning an implementation task.

## Out of scope

- Application, API, test, dependency or configuration changes; implementation tickets, estimates and build sequencing. Implementation planning begins after the decision map is resolved and the user approves its conclusions.
- Building backend persistence, authentication, database schemas/ORMs, production deployment or multi-user collaboration. Return frontend-facing prerequisites to this map only if needed for readiness.
- Product redesign or changed domain semantics. Preserve standalone tasks, project deletion cascade, free-text assignees, existing field/date behavior, state lifetimes and local demo workflows until deliberately replaced by the approved real-authentication increment. Any other discovered incompatibility must return to the user as a scope question.
- Treating incremental integration as an implicit requirement for offline sync, background queues, automatic failover, dual writes or universal abstractions.
- Reopening completed MVP/E2E work or claiming broader human acceptance from automated evidence.

- [Choose the policy for existing local data when remote capabilities arrive](issues/06-local-data-migration.md#answer): retired because development data is disposable and the user explicitly excludes transition migration, import/export, preservation and offline synchronization.
