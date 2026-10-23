# E2E hardening evaluation

Human observations for all six tickets: **Pending**. Automated checks do not establish acceptance. Use a disposable browser profile; deletion examples intentionally remove test work. Run `pnpm preview` after `pnpm --filter @taskflow/web build`, then open http://127.0.0.1:22017 (set `WEB_PORT=22017` for preview). Browser emulation does not certify physical devices or touch scrolling.

## Environment and preflight — ticket 01

2026-10-23, starting branch `main`, HEAD `61c872d9ddf195caaede740847d58738cef1049a`. Eight staged planning Markdown files were present and preserved. No initial test/application/configuration changes. Node v24.22.0, pnpm 10.11.0. Chromium 1243, Firefox 1543 and WebKit 2359 caches present (older Firefox/WebKit caches also present). Port 22017 had no listener. `TASKFLOW_TEST_SERVER=b`, which is not `development`; production build/preview selected. Configuration: six desktop/mobile browser combinations, Tehran timezone, three workers, zero retries, cosmetic Google font isolation. Glossary/ADRs absent. Read architecture, all existing frontend tests and source contracts. Historical 222-pass results were not counted as current evidence.

Baseline command: `pnpm test:frontend`, before any test/configuration changes. Complete output: `.scratch/e2e-coverage-hardening/evidence/baseline.log`. Result: **222 passed, 6 skipped, 1.8m**, exit 0. The six skips are mobile beforeunload (three) and desktop-wheel characterization on mobile (three).

First action: choose T01 in [the matrix](e2e-coverage-hardening-audit.md), open `workflows.spec.ts` and compare the pre-edit post-reload assertion with the fields the scenario entered. Follow the baseline log to its terminal result. Expected: the baseline protects title/project but lacks complete field retention proof. Inspect each matrix family against its cited test; classifications must distinguish UI assertions, raw-storage guarantees and fixture-only setup.

Review/checkpoint: pending required two-axis review. No product blocker inferred from inspection alone.

## Evaluation checkpoints

Implementation checkpoints, executed checks, review results and feature-by-feature actions will be appended per ticket. User observations remain pending until reported.

### Ticket 01 feature inspection checkpoints

| Feature | Reproducible inspection | Expected finding at baseline |
| --- | --- | --- |
| Task lifecycle and assignment | Read T01–T08, then follow `workflows: task CRUD` and `standalone: unassignment preserves` from input to last assertion. | Task reload checks only title/project; raw task equality protects identity but cannot replace UI retention evidence. |
| Projects and cascade | Follow P01–P04 to project CRUD and board-entry loop. Inspect assertions after confirmation. | Cascade proof is raw storage only; required control checks can be omitted by `isVisible`; survivor/empty capture additions are planned, not executed evidence. |
| Discovery and profile | Compare D01–D03 and A01–A02 with first-item sorting, signup redirect and saved profile checks. | Full order, login/profile result and email retention need stronger assertions. |
| Navigation/recovery | Follow N01–N02 through `recovery.spec.ts` keyboard link and saved task check. | Unknown-route recovery already has meaningful UI/byte proof; Browse projects and state lifetime coverage are missing. |
| Overdue | Trace O01–O02 through fixed Tehran dates, status/date edits and midnight render/reload assertions. | Past active work is overdue; done/today/future/undated are not; current tests are preserved. No idle timer is required. |
| Storage and interactions | Trace L01–L05 and I01–I05; compare raw export, seeded setup, focus and geometry assertions. | Exact bytes and write safety are local contracts; fixture setup is a dependency; focus/cancellation are portable UI contracts. Six skips have explicit platform reasons. |

Ticket 01 review: Standards **0 findings**; Spec **1 finding**, insufficient per-feature evaluation guidance. Resolved by the table above; documentation-only inspection recheck confirms every matrix family has an action and expected outcome. Typecheck passed (see `typecheck-01.log`). Candidate pre-ticket HEAD was `61c872d`; reviewed checkpoint `2dbfbc4`, cumulative base `61c872d`. No test/configuration edits preceded the recorded baseline. Human observations: Pending.

## Ticket 02 — task lifecycle and consistency

Candidate pre-ticket HEAD: `2dbfbc4`. Approved seam: browser UI; test-only additions, no product fixes. Strengthened `workflows: task CRUD` with dirty-create cancellation/reload, dirty-edit cancellation and all drawer fields after saved reload. `consistency.spec.ts` uses two known projects and a UI-created rich task, follows its ID across list/Dashboard/boards, completes/reassigns/unassigns/reopens, verifies project membership, counts/progress and saved field retention. `standalone` retains exact local identity/optional-representation checks and adds empty-field UI evidence. Existing overdue tests preserved unchanged.

Executed: six-config task CRUD focus **6 passed, 16.9s** (`ticket02-fields.log`); consistency/standalone/overdue **54 passed, 44.9s** (`ticket02-consistency.log`); typecheck passed (`typecheck-02.log`). Optional-value UI assertion was added during that focused run; a separate final focused recheck is recorded below. No failing product expectation observed. Review pending.

First action: create `Evaluation moving task` in Tasks, with description `Keep this context`, assignee `Sam`, a due date, high priority and a known source project.

| Feature | Reproducible actions | Expected result |
| --- | --- | --- |
| Cancellation | Begin a new named task and cancel; reload. Open your saved task, change title/description and cancel editing. | Cancelled task is absent; saved original title/description remain. |
| Field retention | Set status/assignee in the drawer; edit only title in the full form; wait for saved status and reload. Reopen details. | Description, status, priority, project, due date and assignee survive unchanged. Repeat with blank optional fields. |
| Reassignment | Complete the saved task, assign it to a second project in the drawer, close it; visit source and destination boards and Tasks project filters. | Exactly the same task disappears from source and appears once in destination Done; source/destination summaries change by one. |
| Unassignment/reopening | Reopen the task to In progress and choose No project. Visit destination board, No project filter and Dashboard; reload and open details. | Destination excludes it, No project includes it; content/fields retained, Dashboard open/active/completed metrics agree. Use a small disposable workspace to keep it in Recently touched. |
| Deletion | Cancel task deletion once, then confirm; wait for saved status and reload. | Cancellation preserves the task; confirmed deletion stays absent. |
| Overdue | With local dates, inspect past active, due-today, future, undated and done tasks; complete/reopen and change date. | Only past active work is overdue across list/drawer/board/recent; relevant render/reload refreshes calendar boundaries. No idle-page refresh requirement. |

Human observations: Pending.

Ticket 02 causal finding: adding the final optional-field reload assertion exposed the existing fixture's unconditional `addInitScript` storage replacement, resetting the assignment to `p` on every reload. Focused run: **6 failed**, expected No project, received `p` (`ticket02-optional.log`). This is deterministic fixture interference, not product evidence. Kept the expectation and switched that fixture to guarded initialization. Representative Chromium desktop trace/screenshot/context preserved under `evidence/optional-fixture-failure/`. No product changes. The passing earlier combined run did not reliably execute that last added assertion in every worker and is not counted as its final verification.
