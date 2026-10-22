# Frontend architecture evaluation

Human evaluation: **Pending** for every ticket until the user reports observations.
Automated regression passes and this guide establish readiness, not acceptance.

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
