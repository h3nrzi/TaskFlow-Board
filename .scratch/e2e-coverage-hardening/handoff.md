# E2E Coverage Audit & Hardening — implementation handoff

## Start here

Planning is complete. Implementation has not started. In a **fresh Codex session**, invoke `.agents/skills/implement/SKILL.md` with this handoff and ticket 01. Read `spec.md` and `issues/01-audit-and-baseline.md` in full and state the ticket title before starting. Complete the baseline before changing tests or test configuration. Do not repeat discovery, seam approval, specification approval, or ticket-breakdown approval unless new evidence requires a scope change.

Repository: `/Users/hossein/Downloads/TaskFlow-Board`.

Planning snapshot, 2026-10-23: branch `main`, HEAD `61c872d9ddf195caaede740847d58738cef1049a`. Before planning artifacts the checkout was clean. At handoff the specification, six tickets, and this handoff are local uncommitted files under `.scratch/e2e-coverage-hardening/`. Reinspect state and preserve user changes; this snapshot is not permission to reset or overwrite. Include these planning artifacts in the next authorized implementation commit so they accompany the work.

## Authority and approvals

- Q1–Q7: explicitly approved, including the clarification that correct product-defect regression expectations must be preserved and affected journeys explicitly blocked rather than weakened or silently skipped.
- Consolidated Shared Understanding: explicitly approved as presented.
- Existing browser-level Playwright seam: explicitly approved separately.
- Published specification: explicitly approved before ticket breakdown.
- Six-ticket breakdown, granularity, and dependency structure: explicitly approved before publication.
- This session: publish planning artifacts and prepare this handoff only. No application/test edits, execution, or implementation-skill work.
- Fresh session: implement approved tickets using the implement skill, test-first reproduction where practical at the approved seam, and the established code-review workflow. Commit completed work to the current branch as required by implement. This handoff grants no push/merge authorization.

The spec's publication-time pending-approval text records an earlier checkpoint. This handoff records the subsequent approvals; the parent specification was not modified during ticket publication. Ticket `ready-for-agent` labels do not imply implementation or human acceptance.

## Tickets and dependencies

| Ticket | Deliverable | Blocked by |
| --- | --- | --- |
| [01 — Establish the journey audit matrix and execution baseline](issues/01-audit-and-baseline.md) | Full MVP inventory, classifications, risk/disposition decisions, fresh pre-edit baseline. | None |
| [02 — Harden task lifecycle and cross-surface consistency](issues/02-task-lifecycle-consistency.md) | Field preservation, lifecycle, assignment and summaries across surfaces; standalone/overdue preservation. | 01 |
| [03 — Harden project lifecycle, cascade boundaries, and empty-workspace journeys](issues/03-project-cascade-empty-states.md) | Project operations, explicit entry points, cascade survivors, empty-state capture. | 01 |
| [04 — Harden discovery, navigation, and local profile workflows](issues/04-discovery-navigation-profile.md) | Search/filter/sort identities/order, state lifetimes, demo forms, profile/theme, recovery. | 01 |
| [05 — Harden browser-local safeguards and interaction reliability](issues/05-local-safeguards-reliability.md) | Classified storage safeguards and causal interaction/reliability improvements. | 01 |
| [06 — Verify phase-wide reliability and finalize evaluation evidence](issues/06-final-reliability-evidence.md) | Reconciled matrix, consecutive final runs, repository check, review and evaluation evidence. | 02, 03, 04, 05 |

Use 01 → 02 → 03 → 04 → 05 → 06 as the recommended risk-first execution order. Tickets 02–05 have no mutual blocking edges: shared files and convenient order are not technical dependencies. Run browser invocations sequentially regardless of ticket scheduling because they share report/artifact locations. No application prefactoring ticket is authorized or needed.

01's prerequisite is a recorded baseline and audit, not a fabricated passing result. Record baseline failures truthfully, investigate, and attach blockers to affected journeys. Continue useful independent in-scope work where possible; a product defect does not authorize a product fix or a green phase-completion claim.

## Scope and non-negotiable behavior

- Audit every completed browser-local MVP journey. Prioritize lost work, wrong task/project state, and broken multi-step flows, followed by navigation, accessibility, and presentation. Choose representative combinations by risk, not a test-count target.
- Required areas: task/project lifecycle; field and identity preservation; cancellation; saved state after reload; standalone/default/explicit assignment; source/destination consistency; cascade survivors; Dashboard metrics and project counts/progress; search/filter/sort; empty states; overdue; profile/theme/demo login/signup; navigation/recovery; keyboard/mobile interaction.
- Distinguish **user-facing E2E contracts**, **browser-local storage safeguards**, and **fixture setup dependencies**. Mixed tests can remain mixed if clearly classified; physical file separation is not required.
- Controlled fixtures may establish starting conditions. Actions under test use the UI and observable assertions. Creation/persistence journeys explicitly exercise those steps. Raw storage checks may protect schema, identity, exact export, recovery, and write safety, but must not replace portable UI evidence.
- Preserve useful existing tests and assertions. Strengthen before duplicating. Test IDs are not inherently inappropriate; assess unnecessary CSS, inventory, stored-representation, and interaction-detail coupling against the actual protected contract.
- Proportionate changes to test helpers, fixtures, locators, synchronization, boundaries, and configuration are allowed only where justified. No product features or defect fixes, application refactoring/instrumentation, new framework/dependency, schema change, or speculative backend fixture abstraction.
- If a correct test exposes a product defect: retain the expectation, record the defect and reproduction separately, mark the journey blocked, and preserve actual failure evidence. Do not invert expectations, weaken assertions, silently skip, or fix product code. A correct blocked expectation prevents clean passing completion until resolved.
- Retain local semantics: demo authentication is not real auth; assignees are free text. Date-only recency cannot establish precise same-day edit order. Overdue uses the browser's local calendar, updates on relevant render/reload, and needs no idle-page midnight timer. Preserve project deletion cascade semantics.
- Do not start NestJS Integration Readiness or backend integration. Audit/hardening completion alone does not certify backend readiness.

## Evidence and file map

Read `AGENTS.md`, `docs/agents/domain.md`, `docs/agents/issue-tracker.md`, and `docs/agents/triage-labels.md`. Follow root glossary/relevant ADRs if introduced after planning. `docs/architecture/frontend.md` documents ownership and state lifetimes; prior evaluation guides are historical evidence only.

| Area | Existing sources and prior art |
| --- | --- |
| General CRUD, cascade, search/sort, profile/theme, responsive navigation | `tests/frontend/workflows.spec.ts` |
| Storage validation/failure/recovery/conflicts, board creation, keyboard and dates | `tests/frontend/stability.spec.ts` |
| Assignment/defaults, optional-field/identity preservation, standalone filters | `tests/frontend/standalone.spec.ts` |
| Controlled overdue dates/statuses/surfaces/midnight | `tests/frontend/overdue.spec.ts` |
| Welcome and route recovery | `tests/frontend/welcome.spec.ts`, `tests/frontend/recovery.spec.ts` |
| Focus, nesting, cancellation, scroll/pointer behavior | `tests/frontend/overlays.spec.ts` |
| Shared resource isolation and browser matrix | `tests/frontend/test.ts`, `playwright.config.ts` |
| Observable UI behavior | `apps/web/src/features/tasks/`, `projects/`, `overview/`, `settings/`, `auth/`; `apps/web/src/app/workspace-shell.tsx`; `apps/web/src/pages/not-found.tsx` |
| Behavior/fixtures/persistence inspection | `apps/web/src/workspace/selectors.ts`, `transitions.ts`, `dates.ts`, `fixtures.ts`, `validation.ts`, `browser-storage.ts`, `use-workspace-persistence.ts` |
| Historical results and limitations | `docs/testing/frontend-mvp-completion-evaluation.md` and earlier frontend evaluation guides |

Static findings to validate against the fresh checkout:

- The general task CRUD scenario edits several fields but after reload asserts only title/project, leaving data-retention gaps.
- Cascade proof relies on stored representation without UI/reload survivor checks.
- Board entry-point checks conditionally omit work if a control is absent.
- Search/sort assertions are shallow; demo signup asserts navigation rather than resulting profile, and login/validation evidence is missing.
- Missing-project fallback text is checked without using Browse projects.
- Cross-surface reassignment, Dashboard/project summary updates, and empty-workspace capture need meaningful evidence.
- Timing, swallowed reload failures, drag/geometry assumptions, immediate layout checks, and long responsive workflows warrant investigation; these are static risks, not confirmed current flakes.

Actual planning preflight: inspected documentation, source/tests/configuration, branch/HEAD, and working-tree state. **No test, typecheck, build, browser execution, or fresh runtime verification occurred in this session.** Historical Phase 4 final check recorded 222 frontend passes and six intentional skips after cosmetic-font isolation. It is not this phase's baseline or reliability proof. Earlier intermittent timeouts do not establish current reproduced flakes.

## Commands and final reliability protocol

Verify runtime first; declared versions are Node `24.22.0` and pnpm `10.11.0`. Check browser availability and port ownership without killing unrelated processes. Default preview uses `127.0.0.1:22017`; optional development mode uses port 22016 and must not accidentally replace the required production-default baseline/final evidence. Verify `TASKFLOW_TEST_SERVER` is not selecting development mode for those runs.

Commands below are repository-declared planning references, **not executed results**:

```sh
node --version
pnpm --version
git status --short
git rev-parse HEAD
pnpm test:frontend
pnpm typecheck
pnpm exec playwright test tests/frontend/workflows.spec.ts
pnpm exec playwright test tests/frontend/stability.spec.ts
pnpm exec playwright test tests/frontend/standalone.spec.ts
pnpm exec playwright test tests/frontend/overdue.spec.ts
pnpm exec playwright test tests/frontend/welcome.spec.ts
pnpm exec playwright test tests/frontend/recovery.spec.ts
pnpm exec playwright test tests/frontend/overlays.spec.ts
pnpm check
```

Run only focused files justified by the current ticket, not every listed command after each edit. Use TDD where practical at the approved browser seam and typecheck regularly. If library-specific APIs need verification, use Context7 per AGENTS.md; no documentation lookup was needed to synthesize this plan.

Retain all six Chromium/Firefox/WebKit × desktop/mobile configurations, Asia/Tehran timezone, production build/preview default, normal three-worker setting, zero retries, and cosmetic-font isolation. Preserve justified skip reasons, currently mobile beforeunload and desktop-wheel-only cases. Emulated configurations do not certify physical devices or mobile touch scrolling. Keep causal reliability evidence rather than treating longer timeouts, retries, or lower concurrency as a fix.

At final integration after material edits and review fixes, run these **sequentially** on the same final application/test/configuration revision and equivalent environment:

1. `pnpm test:frontend` — full run 1.
2. `pnpm test:frontend` — full run 2.
3. `pnpm check` — supplies full frontend run 3 plus dependency audit, typechecks, builds, and existing API/tooling regressions.

All three frontend runs must pass consecutively at normal concurrency with zero retries; the full repository check must also pass. A failure interrupts the sequence. Material application/test/configuration changes restart it. Documentation-only evidence updates do not change the tested implementation. Record revision, commands, environment, results/durations, and skip reasons; preserve useful traces/screenshots/reports before subsequent runs overwrite them. Failed-test or serial-worker reruns may diagnose failures but do not count toward this sequence. A failure/fix can justify additional checks; do not run extra full suites after valid final evidence without a reason.

The phase-specific three-run requirement takes precedence over implement's general one-full-suite-at-end default. Existing API checks are regressions only, not backend implementation scope.

## Review and evaluation handoffs

For every ticket, follow `.agents/skills/code-review/SKILL.md`: Standards and Spec axes, actionable findings, fixes, and justified rechecks. Record a candidate pre-ticket HEAD at ticket start. The review skill requires a user-supplied fixed point; no review base was approved in this planning session. Obtain/confirm that review input when needed, validate the ref and non-empty diff, and follow the skill's comparison procedure. Planning approval is not an invented review-base approval. This does not block beginning the authorized ticket implementation.

Suggested durable artifacts for the implementation session:

- `docs/testing/e2e-coverage-hardening-audit.md`: matrix with stable journey IDs, test references, three-way classification, priority/disposition, coverage ownership, gaps, evidence, and blockers.
- `docs/testing/e2e-coverage-hardening-evaluation.md`: per-ticket preflight/review/checkpoints, reproducible feature-by-feature steps, expected outcomes, first actions, final reliability evidence, and separate pending human observations.
- Local defect records under `.scratch/e2e-coverage-hardening/` as needed, recording correct expectations and explicit journey blockers. Do not silently convert them into this phase's product-fix tickets.

First concrete evaluation actions per ticket: 01 inspect a matrix journey against its cited assertion and baseline evidence; 02 create/edit/reassign a uniquely named task and compare surfaces/reload; 03 cancel and then confirm deletion of a disposable project with assigned/unrelated/standalone survivors; 04 search for a known task then verify local profile saving and recovery; 05 exercise the documented disposable-workspace recovery/keyboard scenario; 06 inspect the three final run records and reproduce a representative journey. Expand these into feature-by-feature steps with actual evidence during implementation, rather than treating this planning list as an executed evaluation guide.

Prepare each ticket's handoff after required checks and review while context remains available. Preserve earlier checkpoints across tickets. Guide readiness and automated passes do not establish human acceptance: leave observations pending until the user reports them, without adding an unrequested human-approval gate for implementation completion.

## Current completion state

Approved specification and six tickets are published; this handoff carries approvals, scope, dependencies, file map, verification commands, evidence limits, and evaluation requirements. No application or test files changed and no tests ran. No scope or seam question remains open. Runtime prerequisites, fresh baseline, actual hardening, review fixed points, and final reliability/human observations remain for the fresh session.

Stop planning here. Start the fresh implementation session with **01: Establish the journey audit matrix and execution baseline**.
