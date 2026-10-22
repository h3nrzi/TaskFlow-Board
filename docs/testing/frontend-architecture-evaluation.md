# Frontend architecture evaluation

Human evaluation: **Pending** for every ticket until the user reports observations.
Automated regression passes and this guide establish readiness, not acceptance.

## Final integration checkpoint — 2026-10-22

Implementation of all four tickets is complete on `codex/frontend-architecture`.
Independent Standards and Spec reviews reported **0 actionable findings** against
application baseline `4cca4b6` and code integration `047bc26`; see the
[review record](frontend-architecture-review.md). Human acceptance remains
**Pending**. Automated full-matrix verification is **limited by external network
waits**: neither final full browser invocation was clean.

### Actual preflight evidence

All resumed commands used Node v24.22.0 and pnpm 10.11.0 in the integration checkout.

| Command / check | Actual result |
| --- | --- |
| `pnpm check` | Exit 1 in the browser stage: 126 passed, 3 failed by timeout, 3 existing skips, 6.0 minutes. Later stages did not run through this command. |
| `pnpm test:frontend --workers=1` | Exit 1: 126 passed, 3 different timeout failures, 3 existing skips, 13.3 minutes. Reducing concurrency did not eliminate the waits. |
| `TASKFLOW_TEST_SERVER=development pnpm test:frontend --grep 'new task on a project board&#124;board task entry points'` | Exit 0: all 18 development-mode board checks passed, 59.4 seconds. |
| `pnpm verify:dependencies` | Exit 0: 297 retained dependency snapshots and direct resolutions preserved. |
| `pnpm typecheck` | Exit 0 for web and API. |
| `pnpm build` | Exit 0 for web and API. |
| `pnpm test` | Exit 0: API test 1 passed, workflow/tooling tests 3 passed. |
| Resumed Ticket 04 focused check | Exit 0: 4/4 task CRUD and overview/settings workflow combinations passed on Firefox mobile and WebKit desktop. |
| Integration static JSX/import audit | Exit 0: 523 intrinsic elements before/after, zero changed static-attribute/style groups, 87 source modules, 155 internal import edges, zero cycles, domain imports confined to domain. |
| Scope inspection | Existing CSS, HTML, regression tests, manifests and lockfile unchanged. |

The two final full runs together recorded a successful execution for each of the
129 distinct runnable scenario/browser/viewport configurations (123 passed in
both). This is coverage evidence, **not a clean full-suite pass** or a human
acceptance claim. Three existing mobile unload-prompt configurations remain
intentionally skipped.

Default-run timeouts were Chromium desktop task-dialog focus, WebKit mobile board
creation/reload, and WebKit mobile login-to-signup navigation. The serialized-run
timeouts were WebKit desktop stale-tab task saving, WebKit mobile keyboard card
navigation, and WebKit mobile responsive-route navigation. Every failed
configuration passed in the other full run. The failures were action/load waits,
not assertion mismatches. Retained traces show pending Google Fonts stylesheet or
font requests; the Chromium trace includes stylesheet waits of 30.010 and 30.001
seconds. Local application data/markup checks and independent semantic review did
not identify an introduced regression. No fonts, test scenarios, assertions,
timeouts, dependencies or application behavior were changed to obtain passes.
A clean default full-matrix pass remains unestablished; font/network remediation
is outside this architecture-only phase.

Current-session logs: `/tmp/taskflow-architecture-final-check.log`,
`/tmp/taskflow-architecture-final-serial.log`,
`/tmp/taskflow-architecture-final-development.log`, and the corresponding
`final-typecheck`, `final-dependencies`, `final-build`, `final-other-tests` logs.
Failure artifacts were copied before subsequent runs to
`/tmp/taskflow-architecture-default-results` and
`/tmp/taskflow-architecture-serial-results`. These are temporary session artifacts;
the results above are the durable record. Historical evidence in the ticket
sections remains distinct from these resumed checks.

### Your first concrete action

The evaluation server is running from this checkout at
[TaskFlow Tasks](http://127.0.0.1:22018/tasks). HTTP preflight returned 200 with the
TaskFlow document for `/`, `/tasks` and `/settings`. This verifies serving, not
browser rendering or human acceptance. Port 22018 is a separate browser origin
with its own local workspace.

Open that link in a disposable browser profile, choose **New task**, create
`Architecture review`, wait for **All changes saved locally**, then reload.
The task should remain and open in the existing drawer. Report the observed
result and browser/viewport; no acceptance is assumed. Continue with the
feature-by-feature checks for Tickets 01–04 below.

To reproduce the server later from the integration checkout:

```sh
WEB_PORT=22018 pnpm dev:web
```

Managed-worktree archive requests were submitted for all four temporary
implementer worktrees; all implementation commits are retained in the integration
history and local branches.

## Baseline checkpoint — 2026-10-22

Before implementation, `pnpm check` exited 0 in the integration checkout at
`af3608b` (approved spec/tickets; application baseline `4cca4b6`). Actual evidence:

- Existing frontend suite: 129 passed, 3 existing skips, across Chromium, Firefox,
  and WebKit at desktop and mobile widths.
- Dependency audit: all 297 dependency snapshots preserved.
- Both application type checks and builds passed.
- API test: 1 passed; workflow tests: 3 passed.
- Log from this session: `/tmp/taskflow-architecture-baseline.log`.

The baseline used the required Node v24.22.0 runtime.

## Ticket 01 — Pure workspace model

### Preflight evidence

- Worktree: `/Users/hossein/.codex/worktrees/workspace-model/TaskFlow-Board`.
- `pnpm install --frozen-lockfile`: passed, with no lockfile or manifest changes.
- `pnpm typecheck`: passed for API and web after extraction; log
  `/tmp/taskflow-model-typecheck-node24.log` (required Node v24.22.0).
- Initial frontend run on the host-default Node v26.4.0: 126 passed, 3 failed,
  3 existing skips. Failures were 30-second browser action/navigation timeouts:
  Firefox desktop unassigned-task save, Firefox mobile stale-tab task save, and
  WebKit desktop invalid-shape navigation. Retained page contexts showed the
  expected task forms and recovery alert. Log: `/tmp/taskflow-model-frontend.log`.
  This unsupported runtime run does not establish the cause of the timeouts.
- Rechecks use the required runtime by prefixing commands with
  `PATH=/Users/hossein/.nvm/versions/node/v24.22.0/bin:$PATH`.
  Targeted command: `pnpm test:frontend tests/frontend/stability.spec.ts
  --project=firefox-desktop --project=firefox-mobile --project=webkit-desktop
  --grep 'task without a project stays|stale tab cannot|valid JSON with invalid'`.
  Result: 9 passed in 27.5 seconds; `/tmp/taskflow-model-failed-recheck.log`.
- Full required-runtime suite: 127 passed, 2 failed, 3 existing skips;
  `/tmp/taskflow-model-frontend-node24.log`. The original three failures passed;
  two different cases timed out: Firefox mobile focus and WebKit desktop project
  navigation. Artifacts preserved at `/tmp/taskflow-model-node24-test-results`.
- Trace diagnosis: Firefox `/tasks` navigation took 32.65 seconds while external
  DM Sans/Manrope font TLS handshakes took about 30.08 seconds; local JavaScript
  and CSS returned in 18 and 6 milliseconds. Focus assertions completed after
  that delayed navigation. WebKit received local document/JS/CSS in 1.8/12.8/4.2
  milliseconds while both external Google Fonts stylesheets remained pending.
  No application, test, font, or timeout changes were made to address these waits.
- Comparative baseline at integration revision `929a38f` (frontend identical to
  `4cca4b6`): both second-run timeout scenarios across Firefox mobile/WebKit
  desktop with three repeats each passed, 12/12 in 27.5 seconds; log
  `/tmp/taskflow-model-baseline-font-comparison.log`. This did not reproduce the
  intermittent network delay; trace evidence above identifies the waits.
- Final targeted extracted-frontend run: the same 12 combinations passed in
  37.6 seconds; `/tmp/taskflow-model-final-targeted.log`. Exact command (with the
  required-runtime PATH prefix above): `pnpm test:frontend
  --project=firefox-mobile --project=webkit-desktop
  --grep 'task modal contains keyboard focus|project CRUD, board status'
  --repeat-each=3`.
  Neither aggregation of successful scenarios nor a targeted rerun is claimed as
  a clean full-suite pass. The final integration `pnpm check` remains pending.
- Focused self-review: fixture creation still occurs once on module evaluation;
  task IDs are generated inside the state updater, project IDs before it, and
  task/project creation dates retain their previous updater placement. Validation
  accepts the same optional/unassigned fields and missing theme, and persistence
  still supplies the existing light-theme default. Updates retain ordering and
  project deletion retains its cascade.
- Static JSX audit against the application baseline: 523 intrinsic elements before
  and after; zero changed groups of static attributes or inline styles. This
  structural check does not establish visual or human acceptance.
- Dependency inspection: workspace modules import only sibling domain modules;
  they have no React, browser API, or presentation dependencies. No cycles.
- Existing regression scenarios, markup, styles, routes, providers, and dependency
  manifests are unchanged. Focused self-review and independent root review found
  no actionable issue. The final two-axis integration review remains pending.

### First concrete action

From the checkout you want to evaluate, run `pnpm dev:web`, then open the local URL
printed by Vite in a separate browser profile with a fresh local workspace. Open
**All tasks**, click **New task**, and create `Architecture evaluation task` with
priority **Urgent**, project **Field Notes**, and a due date you can recognize.

### Reproducible feature checks

| Feature | Actions | Expected result |
| --- | --- | --- |
| Task creation and ordering | Perform the first action above; leave the task list in Recently updated order. Open the new task. | The task appears first, has your selected project, priority and local calendar date, and shows the unchanged drawer. |
| Task updates and completion | Change status and assignee in the drawer. Use Edit task to rename it with leading/trailing spaces; save and close. Mark it done and then not done. Wait for All changes saved locally and reload. | The saved title is trimmed; changes survive reload. Completion toggles between Done and To do. |
| Cancellation and deletion | Open the task, Delete, then Keep it. Delete again and confirm. Reload after the saved indicator appears. | Cancellation preserves the task and drawer; confirmation removes the task permanently from this workspace. |
| Search, filters and sort | On a fresh demo workspace search `landing`; clear it and combine To do, Urgent, Field Notes. Reset filters, then sort by Priority and Due date. | Landing search yields one task; combined filters yield Map the onboarding journey; priority begins with that task and due-date sort begins with Audit image library. |
| Project creation, edits and cascade | Create `Architecture evaluation project`, edit its name, add a task from its board, change the task's status with its menu (and drag on desktop), then delete the project. | The board opens after creation, new tasks default to this project, status columns update, and deleting the project returns to Projects and removes its tasks. |
| Overview calculations | Create an open task, then complete it and visit Overview. Open a task from Coming up or Recently touched. | Counts, completion percentage, project summaries and recent order reflect the same tasks; links open the correct drawer. |
| Profile, theme and demo routes | In Settings change name and email, save, toggle theme, then reload. Visit /login, follow Create a demo profile, and complete signup. | Profile initials, saved values and theme remain consistent; signup starts empty and returns to the same local workspace. |
| Existing local workspace and validation | Reopen a browser profile with previously saved TaskFlow data. For invalid-data checks use a disposable profile and the existing stability regression scenarios. | Existing projects/tasks load unchanged. Invalid storage shows recovery and leaves saved bytes unchanged; empty project assignment survives editing. |

For exact automated reproductions, run `pnpm test:frontend`; named scenarios live
in `tests/frontend/workflows.spec.ts` and `tests/frontend/stability.spec.ts`.
Report browser, viewport, steps, expected/actual behavior, and the ticket number
for observations. Ticket 01 human acceptance remains **Pending**.

## Ticket 02 — Persistence and recovery boundary

### Preflight evidence

- Based on integration `055a99364595ab68275cc11827308f591deb0a63`; worktree
  `/Users/hossein/.codex/worktrees/workspace-persistence/TaskFlow-Board`.
- Required runtime: Node v24.22.0 and pnpm 10.11.0. Frozen install passed without
  manifest or lockfile changes.
- `pnpm typecheck`: passed for API and web; final log
  `/tmp/taskflow-persistence-typecheck-final.log`. An initial extraction attempt
  removed a React `useRef` import still needed by dialogs; type checking caught
  that compile error, and the import was restored before browser validation.
- Existing storage and theme regression command, prefixed with
  `PATH=/Users/hossein/.nvm/versions/node/v24.22.0/bin:$PATH`:

  ```sh
  pnpm test:frontend --grep 'invalid saved data|valid JSON with invalid workspace|storage write failure|stale tab cannot|missing cross-tab locking|unsaved return to the initial theme|unavailable reads|overview, settings, theme'
  ```

  Result: **45 passed, 3 existing mobile unload-prompt skips, 0 failed** in 1.1
  minutes across all six browser/viewport projects. Log:
  `/tmp/taskflow-persistence-regressions.log`. These cover exact recovery/current
  downloads, malformed/invalid-shape data preservation, failures, stale-tab
  refusal, missing locks, native desktop unload warning, normal saving/reload,
  profile/theme persistence and demo route behavior. No existing test changed.
- Focused self-review: the read snapshot still initializes once per mounted App;
  raw bytes, missing-theme normalization, storage key, export filename/type and
  URL revocation timing remain unchanged. Compare/read/serialize/write stays
  inside the browser lock and uses the latest store ref; cancellation still
  suppresses status updates without changing queued write behavior. Persistence
  retains `[store, loaded]`, unload protection `[loaded]`. Theme runs before
  persistence with its original `[store, loaded]` lifetime.
- The hook exposes save status and download actions; store ownership remains in
  App for Ticket 03. Pure workspace modules import no browser or React modules;
  browser storage depends on pure fixtures/validation/types, and the hook depends
  on browser storage/types. No circular dependency was introduced.
- `git diff --check`: passed. Static JSX audit against the application baseline:
  523 intrinsic elements before/after, zero changed static-attribute/style groups.
  This is structural evidence, not a visual or human acceptance claim.
- Full integration `pnpm check` and two-axis final review remain later checkpoints.

### First concrete action

Start `pnpm dev:web` using the required runtime. Open its printed URL in a
**disposable browser profile**, visit **Settings**, switch appearance, wait for
**All changes saved locally**, then reload. The selected appearance must remain.
Use this disposable profile for the failure/recovery checks below.

### Reproducible feature checks

| Feature | Actions | Expected result |
| --- | --- | --- |
| Successful local saves | Perform the first action, change profile name/email, save, create a task and reload after saved status. | Profile, appearance and task survive reload; status returns to All changes saved locally. |
| Malformed recovery and raw export | In the disposable profile's console run `localStorage.setItem('taskflow-store-v1', '{broken workspace')`; reload, then Download saved data. Inspect the download and storage key. | Recovery screen appears; both retained/downloaded bytes are exactly `{broken workspace`; filename is taskflow-workspace.json. No demo data overwrites storage. Restore a valid backup manually and choose Try again. |
| Invalid workspace shape | Set the same key to `'{"projects":[],"tasks":[{"id":"important"}],"profile":null}'`; reload. | Same recovery screen and exact original saved bytes. This is a separate validation checkpoint from malformed JSON. |
| Write failure and current export | After restoring valid data, run `Storage.prototype.setItem = () => { throw new DOMException('Evaluation quota failure', 'QuotaExceededError'); };` in this tab's console. Change appearance or create a task, then Download current workspace. | App remains usable, persistent warning/status say changes are not saved, and downloaded JSON contains the unsaved change. Download before reloading; reload removes this injection. |
| Concurrent tabs | Open two tabs before editing. In A create Tab A task and wait for saved status. In B create Tab B task and download B's current workspace. Reload only after exporting. | B reports another tab changed the workspace; B does not overwrite A. B's export includes its own draft; stored/reloaded workspace includes A's task. No automatic merge occurs. |
| Unsaved unload protection | On desktop save dark theme; inject write failure as above, then switch back to light and request reload. Choose Stay when prompted. | Native warning appears; unsaved light theme remains visible and exportable. Mobile native prompts are not guaranteed; warning/download remain available. |
| Missing locks/read failure | Run the exact regression command above (or select the named missing-lock/unavailable-read scenarios in the existing stability suite). | No unsafe write with unavailable locks. Unavailable reads preserve stored bytes, permit an unsaved session, and allow exporting current work. |

Record Ticket 02, browser/viewport, actions, expected/actual behavior and any
observed storage/download differences. Human acceptance remains **Pending**.

## Ticket 03 — Explicit workspace operations

### Preflight evidence

- Based on integration `ff1f3a562e42d0b87d7169b54b2f89bf75190d57`; worktree
  `/Users/hossein/.codex/worktrees/workspace-operations/TaskFlow-Board`.
- Frozen dependency install passed with required Node v24.22.0 and pnpm 10.11.0;
  manifests and lockfile unchanged.
- `pnpm typecheck` passed for API and web; log
  `/tmp/taskflow-operations-typecheck.log`.
- Focused self-review and independent root hook review found no actionable issue.
  The loaded snapshot/store stay in one hook per existing mounted App session.
  Task IDs are generated inside their updater; project IDs before the updater;
  creation/update dates retain their original evaluation placement. Task title
  trimming stays on form save, project trimming/order/cascades in pure transitions.
  Theme application remains a separate presentation effect before persistence,
  with its existing `[store, loaded]` lifetime. UI validation messages, notices,
  route changes, modal closure, filters/search state and selected task fallback
  remain in their existing components. Settings and demo auth receive an explicit
  profile operation; no persistent raw setter escapes the hook.
- No existing tests, rendered markup/styles, route/providers, dependencies or
  persistence contracts changed. `git diff --check` passed. Workspace dependencies
  remain directed from the React owner to persistence/domain, without cycles.
- Existing workflow/state regression command, with required-runtime PATH prefix:

  ```sh
  pnpm test:frontend --grep 'task CRUD|project CRUD|search, combined|overview, settings|board task entry|switching login|local calendar dates|task without a project|editing an unassigned|unsaved return|storage write failure|stale tab cannot'
  ```

  Initial result: **65 passed, 4 failed, 3 existing mobile unload-prompt skips**
  in 2.7 minutes across all six browser/viewport projects. Log:
  `/tmp/taskflow-operations-regressions.log`; retained artifacts:
  `/tmp/taskflow-operations-initial-test-results`. Failed scenarios: Firefox
  desktop overview drawer close, Firefox mobile project initial navigation and
  search/filter workflow, WebKit mobile task initial navigation. Firefox traces
  show Google Fonts TLS waits of about 30.088 seconds (desktop) and 30.064 seconds
  (mobile search); mobile project font requests remained pending at timeout.
  WebKit local document/CSS/JS returned in 15.6/42.5/75.7 milliseconds, with both
  external Google Fonts stylesheets still pending at the navigation timeout.
  This reproduces the external-font waits recorded in Ticket 01. No application,
  font, timeout or test changes were made to address these network delays.
- Focused recheck command with the same runtime prefix:

  ```sh
  pnpm test:frontend tests/frontend/workflows.spec.ts --project=firefox-desktop --project=firefox-mobile --project=webkit-mobile --grep 'overview, settings|project CRUD|search, combined|task CRUD'
  ```

  Result: **12 passed in 27.9 seconds**, including all four initially failed
  combinations. Log: `/tmp/taskflow-operations-recheck.log`. This targeted pass
  is not represented as a clean 72-case run or a full-suite pass.
- Full integration `pnpm check` and final two-axis review remain later checkpoints.

### First concrete action

Run `pnpm dev:web` using Node v24.22.0. Open its printed URL in a fresh disposable
browser profile, visit **Settings**, set your name to `Architecture Evaluator`,
change the email, save, and wait for **All changes saved locally** before reload.
The saved profile and initials must survive reload.

### Reproducible feature checks

| Feature | Actions | Expected result |
| --- | --- | --- |
| Profile and demo auth | Perform the first action, then visit /login, follow Create a demo profile, enter a new name/email and submit. | Signup starts empty; submission returns to Overview with the saved profile while keeping projects/tasks. |
| Task operations | Create a task with leading/trailing title spaces, open its drawer, change status/priority/date/assignee, edit its title, save, toggle completion, then delete it after trying Keep it first. | Title is trimmed on form save; drawer edits persist; completion resets to To do when toggled off; Keep it preserves the task; confirmed deletion removes it. |
| Project operations | Create a project, edit it, add a task on its board, move the task using status controls, then delete the project. | Creation navigates to its board; the new task belongs to it; movement updates the board; deletion removes its tasks and returns to Projects. |
| Transient state and cancellation | Search tasks and choose filters/sort; navigate to Settings and back. Open a task, open Edit task and cancel; then cancel deletion. Navigate between boards before creating another task. | Existing navigation/reset behavior remains unchanged; closing nested dialogs reveals the same drawer; board task defaults follow the current board and explicit assignments remain intact. |
| Appearance and unsaved work | Toggle theme in Settings/sidebar/topbar, wait for saved status and reload. Then use Ticket 02's write-failure/stale-tab checks. | Appearance persists; unsaved sessions stay usable, warn and export current changes without overwriting newer data. |
| Unassigned tasks and local dates | Use the existing named unassigned-task/local-calendar regression scenarios below, or edit a previously saved task whose projectId is empty. | Editing preserves empty assignment; creation/update dates retain the same local-calendar behavior. |

Report Ticket 03, browser/viewport, actions and expected/actual observations.
Human acceptance remains **Pending**.

## Ticket 04 — Feature modules and shell composition

### Preflight evidence

- Based on reviewed integration `6e98ce75a7b80c83df22ecd5e9126b9b2d20f693`;
  worktree `/Users/hossein/.codex/worktrees/feature-boundaries/TaskFlow-Board`,
  branch `codex/frontend-architecture-features`.
- Frozen install and `pnpm typecheck` passed using Node v24.22.0 and pnpm 10.11.0.
  Typecheck log: `/tmp/taskflow-features-typecheck.log`. No dependencies, lockfile,
  CSS, existing tests or route/provider contracts changed.
- Mechanical extraction retained all 26 original top-level declarations. A
  one-off comparison of emitted JavaScript ASTs found zero executable changes,
  including resulting JSX text, after accounting for the shell rename, exports,
  formatting and adjacent string-child splits introduced by Prettier. This is
  structural evidence, not a browser-render or human-acceptance claim. Script:
  `/tmp/taskflow-feature-preservation.cjs`; original snapshot:
  `/tmp/taskflow-ticket04-before.tsx`.
- The static JSX audit counted 523 intrinsic elements both before and after;
  zero static-attribute/style groups changed after normalizing AST formatting
  (trailing commas, quote spelling and equivalent numeric literals). Script:
  `/tmp/taskflow-architecture-audit-normalized.cjs <checkout>`.
- Import audit: 87 frontend source modules, zero cycles. Pure workspace rules
  have no React, browser, persistence or feature imports. Features do not import
  the shell. The [architecture guide](../architecture/frontend.md) documents
  resulting responsibilities and retained state lifetimes.
- Existing targeted regression command, prefixed with
  `PATH=/Users/hossein/.nvm/versions/node/v24.22.0/bin:$PATH`:

  ```sh
  pnpm test:frontend --grep 'task CRUD|project CRUD|search, combined|overview, settings|responsive routes|board task entry|task modal contains|switching login|project and board task titles|task without a project|editing an unassigned|nested edit'
  ```

  Result: **70 passed, 2 failed** in 2.0 minutes across all six browser/viewport
  projects. Log: `/tmp/taskflow-features-regressions.log`; retained artifacts:
  `/tmp/taskflow-features-initial-test-results`. Firefox mobile timed out closing
  the overview task drawer; its trace shows external Google font TLS handshakes
  of 30.069–30.077 seconds. WebKit desktop timed out loading `/tasks`; its local
  document returned in 1.435 milliseconds while both external Google Fonts CSS
  requests remained pending. These match the external waits recorded for earlier
  tickets; no font, test, timeout or application workaround was introduced.
- Scoped self-review found no actionable issue: both route switches, keyed auth,
  search/filter/form lifetimes, selected-task fallback, overlay ordering,
  `inert`, focus hook integration and explicit operations remain unchanged.
  `git diff --check` passed. Final integration full repository check and
  independent two-axis review remain pending checkpoints.

### Session-resumed verification — 2026-10-22

The Ticket 04 evidence above is the prior implementer's recorded evidence. Its
one-off audit scripts, logs and trace artifacts under `/tmp` are no longer
available after session resumption; those audits and trace diagnoses were not
repeated or independently reverified in this resumed session. The persisted
`test-results/.last-run.json` initially reported `passed` with no failed test IDs,
but did not identify the scenarios or duration, so it is not used as a focused
recheck result.

Fresh checks in the same feature worktree, with
`PATH=/Users/hossein/.nvm/versions/node/v24.22.0/bin:$PATH`:

- `pnpm typecheck`: passed for API and web, exit 0.
- `pnpm test:frontend tests/frontend/workflows.spec.ts
  --project=firefox-mobile --project=webkit-desktop
  --grep 'overview, settings|task CRUD'`: **4 passed in 32.7 seconds**, exit 0.
  This includes both combinations that previously timed out. This targeted pass
  is not a clean 72-case run or a full-suite pass.
- `git diff --check`: passed. No test, font, timing, dependency or application
  behavior workaround was added.

Final integration `pnpm check` and independent two-axis review remain pending.
Human evaluation remains **Pending**.

### First concrete action

Using Node v24.22.0, run `pnpm dev:web` and open its printed URL in a disposable
browser profile. Open **Tasks**, choose **New task**, create `Architecture review`,
wait for **All changes saved locally**, and reload. The task must remain and open
in the same task drawer.

### Reproducible feature checks

| Feature | Actions | Expected result |
| --- | --- | --- |
| Task list and drawer | Perform the first action; edit the drawer's status, priority, date, project and assignee. Open Edit task, cancel, then save an edit. Toggle completion from the list. | Existing fields and labels behave identically; changes save/reload; cancel preserves the drawer and current selection. |
| Search and filters | Search for a task, combine status/priority/project filters and change priority/due sorting. Navigate to Settings and back to Tasks. | Matching rows/order and existing search-versus-filter reset behavior remain unchanged. |
| Projects and board | Create and edit a project, navigate between two boards, then create a task on each. Use board status controls. Delete a project after first choosing Keep it. | Correct board defaults and explicit task assignment, same movement controls; Keep it cancels; deletion removes the project/tasks and navigates to Projects. |
| Overview and navigation | Open overview project summaries/upcoming/recent tasks, use desktop sidebar and mobile bottom/menu links, then open an unknown URL and a missing project URL. | Same destinations, drawer contents, fallback screens and responsive navigation. |
| Profile, appearance and auth | Save a profile in Settings; toggle appearance using each existing entry point. Visit /login, switch to /signup, submit a new demo profile and reload. | Signup starts empty, profile/theme persist, existing tasks/projects remain, and submission returns to Overview. |
| Nested overlays and keyboard | Open a task with the keyboard, open Edit task and Escape, then Delete and Keep it. Cycle Tab/Shift+Tab in each dialog and close the drawer. | Focus stays in the active layer, returns to the prior control, and only the top layer closes; the page underneath remains inactive. |
| Responsive presentation | Repeat primary routes and forms at phone portrait/landscape and desktop sizes. | Existing layout, controls, labels and visual styling remain unchanged with no horizontal overflow. |
| Local data safety | Repeat Ticket 02's recovery, export, failure, stale-tab and unload checks. | Identical saved schema/bytes, recovery/export, warning and refusal to overwrite newer work. |

Record Ticket 04, browser/viewport, actions and expected/actual observations.
Human acceptance remains **Pending** for this and every preceding ticket.
