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

Ticket 02 review: Standards **0 findings**; Spec **1 finding** (reload proof after deletion cancellation). Resolved by reloading, checking the same row identity, reopening the preserved description and Done status, then confirming deletion. Optional fixture correction final focus: **6 passed, 12.2s** (`ticket02-optional-fixed.log`). Follow-up task CRUD is included in `ticket03-final-focus.log`. Human observations remain Pending.

## Ticket 03 — projects, cascade and empty capture

Candidate pre-ticket HEAD: `ef9bfe7`. Project CRUD now uses controlled unrelated projects plus an assigned survivor and standalone survivor. All project fields are entered through the UI; rename preserves description/icon/color, navigation/reload expose saved values, cancelled edits/deletions preserve work. Confirmed cascade is checked through storage plus Projects, source board, Tasks and reload. Board entry points explicitly require project/column buttons and desktop quick-add; mobile quick-add must be hidden. Explicit choices appear on the destination board and not the source. New empty-workspace scenarios use guarded fixtures only for setup, then capture through actual empty-state actions.

Preflight/checks: project/entry-point focus **12 passed, 24.7s** (`ticket03-projects.log`). First empty-state check had **6 failed / 12 passed**, because `Add a task` matched both header and empty-state actions (`ticket02-review-ticket03-empty.log`). Scoped the action to the Recently touched section containing the empty-state message; kept actual capture assertions. Representative failure trace/screenshot/context preserved in `evidence/empty-locator-failure/`. This was a locator ambiguity, not a product defect or intermittent failure. Typecheck passed (`typecheck-03.log`). Final focused results/review follow below.

First action: in a disposable workspace, create an evaluation project, another project, a task assigned to each, and one No project task.

| Feature | Reproducible actions | Expected result |
| --- | --- | --- |
| Project fields | Create with name, description, icon and a selected color. Rename only; return through Projects, reload, open edit form. Cancel a draft rename. | Name/description/icon/color survive, cancelled name does not appear. |
| Entry points | On two boards, open project Add task, To do plus and desktop quick-add. Change project choice then cancel; open next form. Save an explicit choice of another project. | Defaults follow current board; cancelled choice does not leak. Saved task appears only on chosen board. Quick-add is hidden at mobile width. |
| Cancellation/cascade | Cancel deleting the evaluation project and reload. Reopen it, confirm deletion, reload Projects and Tasks. | Cancel preserves project and assigned task. Confirm removes both; other project/task and No project task remain usable. |
| Empty Dashboard | In a separate fresh empty fixture, use Recently touched's Add a task, save and reload. Use Start with a project's Create project action, then Create your first project; add from the board column. | Standalone task requires no project; first project leads to usable board; board task retains its chosen project after reload. |
| Empty Tasks | In another empty fixture, use Create a task; save, reload and open details. | Exactly one task is usable with No project selected. |

For an empty manual fixture, use a disposable profile's DevTools on the application origin to set `taskflow-store-v1` to `{"projects":[],"tasks":[],"profile":{"name":"Evaluator","email":"evaluation@example.com","avatar":"E"},"theme":"light"}`, then reload. This is fixture setup, not an application reset feature. Human observations: Pending.

Ticket 03 final focused execution: `ticket03-final-focus.log` **33 passed / 3 failed, 42.7s**; all task CRUD review checks, project CRUD and required board entry checks passed. Only desktop empty-Dashboard Create project action was ambiguous with the sidebar button. Scoped that action to `main`, preserving the empty-state workflow. Second representative failure preserved in `evidence/empty-project-locator-failure/`. Final empty-workspace recheck: **12 passed, 16.7s** (`ticket03-empty-fixed.log`). No product defect inferred. Profile assertions sharing `workflows.spec.ts` were also strengthened for ticket 04 before this checkpoint; their focused verification remains ticket 04 work.

Tickets 02–03 review recheck at `537812a`: **Standards 0, Spec 0 remaining findings**. Ticket 02 cancellation reload proof accepted. Ticket 03 feature actions and actual failure/fix/check records retained. Human observations remain Pending.

## Ticket 04 — discovery, navigation and local profile

Candidate pre-ticket HEAD: `537812a` (shared-file profile assertion preparation noted above). New controlled discovery fixture has five distinct tasks: title/description/project-name search, combined status/priority/project filtering, explicit No project and All projects membership, no-result recovery, full priority/due ordering including ties and undated work, date-only recency groups, and in-app search retention with page-local filters/sort reset. Saved reload resets shell search. Demo-form tests cover required/native-email and signup-name validation, failed submissions preserving the current profile, mode draft reset, trimmed signup profile, login email update with retained name/workspace and saved reload. Existing workflows now retain both profile fields/light+dark settings and verify signup result; existing recovery adds Browse projects, board navigation, task retention and exact saved bytes.

Preflight evidence: `ticket04-focus.log` **42 passed / 18 failed, 1.2m**. Demo/profile/welcome/recovery and existing search tests passed. All new discovery tests failed because the task-open button includes subtitle/project/due/overdue text as well as the title; the expected title-only text locator was wrong. Corrected to ordered task-row identities (existing UI test IDs), preserving exact matching memberships and all sort assertions. Representative trace/screenshot/context in `evidence/discovery-locator-failure/`. Recheck **18 passed, 18.5s** (`ticket04-discovery-fixed.log`); a subsequent small polling/membership assertion refinement is included in the ticket 05 focused recheck and final sequence. Typecheck passed (`typecheck-04.log`). No product defect or intermittent failure observed.

First action: search Tasks for a known title, then for text found only in its description and then its project name.

| Feature | Reproducible actions | Expected result |
| --- | --- | --- |
| Search/filter recovery | Use case-varied title/context/project terms; combine status, priority and project filters. Switch All projects/No project; enter an absent term and clear it. | Exact intended tasks remain; assigned work is excluded by No project; clearing filters restores the matching identities. |
| Sorts | Use distinct priorities/dates and at least two undated tasks. Choose Priority, Due date, Recently updated. | All results follow supported order; undated work comes last by due date. Equal-day edits have no precise recency order requirement. |
| Navigation lifetimes | Set a search and restrictive filters plus Due sort; use app navigation to Projects and back to Tasks; reload. | Query survives app navigation; filters reset to All and sorting to Recently updated. Reload resets search. |
| Signup validation | Submit empty name, invalid email, then whitespace name with valid email. Switch to login and back; submit ` Demo Person ` and a valid email. | Invalid submissions stay on form; current profile remains; mode switches reset drafts; valid signup shows Welcome back, Demo and saved trimmed profile/email in Settings after reload. |
| Demo login | Keep a uniquely named saved task; open login, try invalid email, then submit a valid replacement email. | Invalid input stays on login; valid submission preserves name/workspace, changes local email and persists after reload. This is a local demo, not authentication. |
| Appearance/profile | Save both profile fields; choose dark, reload; choose light, wait for saved status and reload. Open Dashboard. | Both fields and selected theme persist; welcome uses first name without time-of-day assumptions. |
| Recovery | Create/save a unique task, visit an unknown route, use Back to Dashboard with keyboard. Visit a missing project and choose Browse projects, then a valid board and Tasks. | All routes recover to usable pages; saved task remains after reload. |

Human observations: Pending. Required review recorded below.

## Ticket 05 — local safeguards and interaction reliability

Candidate pre-ticket HEAD: `d2cb998`. Beforeunload handling was checked against current Playwright v1.63.0 documentation via Context7 ([dialog handling](https://github.com/microsoft/playwright/blob/v1.63.0/docs/src/dialogs.md)). A registered handler must handle the native prompt; a cancelled reload cannot supply a successful load event. The test now awaits dismissal plus a browser reload request without catching every error. Primary and secondary tabs share the existing cosmetic font isolation. Responsive checks poll the same overflow conditions instead of inspecting a single instant; browser/worker/retry configuration is unchanged. Cross-tab assertions now reject the stale task and expose the retained first-tab work through UI after reload.

Focused command: `pnpm exec playwright test tests/frontend/stability.spec.ts tests/frontend/overlays.spec.ts tests/frontend/workflows.spec.ts tests/frontend/discovery.spec.ts -g 'invalid|storage|tab|locking|reads|unsaved|focus|keyboard|overlay|overflow|responsive|search identifies|sorts order|in-app navigation'`. Result: **150 passed, 6 skipped, 1.1m** (`ticket05-focus.log`). Typecheck passed (`typecheck-05.log`). The six skips retain the original three mobile beforeunload and three mobile wheel reasons. Native desktop drag was preserved and passed in ticket 03. No fresh intermittent failure reproduced. Reliability findings/causes/dispositions are tabulated in the audit rather than claiming static risks are proven flakes.

First action: in a disposable browser profile, open the same saved workspace in two tabs; save a new uniquely named task in the first, then attempt a different new task in the stale second tab.

| Feature | Reproducible actions | Expected result |
| --- | --- | --- |
| Cross-tab conflict | Follow the first action, then reload the first tab. | Second tab warns of changes elsewhere; first task persists, rejected second task is absent from the saved workspace. |
| Invalid-data recovery | In a separate disposable profile set the storage key to `{broken workspace`, reload, download saved data. | Recovery warning appears; original bytes stay untouched and downloaded bytes match exactly. |
| Write/read failure and export | Use the focused stability scenarios for deterministic browser-boundary failures. For manual write failure on the disposable origin, replace `Storage.prototype.setItem` with a function throwing `QuotaExceededError`, then create a task and download current workspace. | UI remains usable, reports unsaved work and export contains that task. Reload restores native browser methods; do not treat unsaved work as saved. Read failure and missing locks never overwrite stored bytes. |
| Beforeunload | On desktop save dark theme, simulate write failure, choose light, attempt reload and cancel the native prompt. | Prompt occurs; unsaved warning and light in-memory UI remain. Mobile uses warning/export rather than a guaranteed prompt. |
| Keyboard overlays | Open task/project forms and task drawer via keyboard; Tab/Shift-Tab through boundaries. Open edit/delete over drawer, cancel each with Escape. | Focus stays within active layer, one layer closes at a time and focus returns to its opener; cancellation preserves work. |
| Pointer/scroll | Desktop: drag a board card between columns; open a tall form, scroll inside and on backdrop, press inside/release outside and separately press exposed backdrop. | Status changes through actual drag; inside/outside-release retains form; exposed backdrop cancels; documented background scrolling remains usable. Wheel evidence does not certify touch scrolling. |
| Responsive navigation/forms | At 320/390/844px and 768/1024/1440px, visit all documented routes, open forms, use mobile menu/bottom navigation. | No document/form horizontal overflow; intended routes open and menu closes; fields/actions remain operable. Physical-device observations are still Pending. |

Human observations: Pending. Required review recorded below.

Ticket 04 review: Standards **0 findings**; Spec **1 finding** (undocumented ordering within tied priority/date/undated groups). Resolved using ordered groups with exact tied identities compared as sets, including no extra rows; precise ordering remains required between distinct sort values. Also added Settings UI checks that invalid signup/login attempts preserve both current profile fields before valid submission. Final review-focus recheck: **30 passed, 25.0s** (`ticket04-review-fixed.log`). No expectation for actual supported sorting or validation was weakened. Review recheck pending below.

For deterministic manual write failure, run this in DevTools on the disposable application origin: `Storage.prototype.setItem = () => { throw new DOMException('Quota exceeded', 'QuotaExceededError'); }`. This affects only that page's JavaScript realm and ends on reload. Export unsaved work before reloading.
