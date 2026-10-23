# Frontend MVP completion evaluation

Human evaluation is **pending** for every ticket. Automated checks and this guide do not establish acceptance. Use a disposable browser profile/workspace for deletion checks. Run `pnpm dev:web` from the repository root and open http://localhost:21998/.

## Environment and checkpoints

Preflight on 2026-10-23: branch `main`, starting revision `4f7d925a474bd2a3a7173c72947f6ecc47ad0ed3`, Node `v24.22.0`, pnpm `10.11.0`. Planning artifacts already belong to that revision. Browser matrix: Chromium, Firefox, WebKit, each desktop and mobile viewport, Asia/Tehran timezone. These configurations do not certify physical devices or mobile touch scrolling.

## Ticket 01 — Complete standalone-task workflows

Review base: `4f7d925`. First action: open Tasks, click New task, select **No project**, enter a unique title, and save.

1. With existing projects, first verify New task defaults to the first project. Select No project and save; find the task in All projects and reload. Open its drawer: No project remains selected.
2. From a project board, open each task creation entry point: the active project defaults correctly. Explicitly select No project and save; it appears in Tasks, outside that board.
3. Open an assigned task and note its title, description, status, priority, due date, and assignee. Edit its project to No project, cancel, and confirm the original assignment remains. Repeat and save: all other values remain intact.
4. In the drawer assign that task to a project, then select No project again. Reload and verify the assignment and other fields. Both editing paths preserve the same task rather than creating another.
5. In Tasks choose No project: only standalone tasks appear. Combine search, status and priority; switch due-date and priority sorting. Enter an unmatched search: the existing empty-result message appears. All projects again includes assigned and standalone work.
6. In a disposable workspace with no projects, create and edit a task; No project is available. In a workspace with projects, cancel project deletion once, then confirm: its assigned tasks cascade, while standalone tasks remain.

Evidence: new creation/unassignment workflows failed before the options were added (2 Chromium desktop failures); the filter workflow failed before the filter option was added (1 failure). Creation/unassignment then passed (2 Chromium desktop tests). `pnpm typecheck` passed. Matrix regression result and two-axis review recorded below after completion.

User observations: **Pending**. Record browser/device, step, actual outcome, and any mismatch.

### Ticket 01 review

Standards: no findings. Spec: one optional-field preservation finding resolved. The form now retains unchanged absent assignees and empty-string due dates; the added browser test reproduced the failure before the fix. Both reviewers rechecked `git diff 4f7d925...c38c75e` and reported no remaining findings. Total remaining: Standards 0, Spec 0.

Verification incident: concurrent browser invocations shared Playwright's artifact directory, causing six missing-trace-file failures; that run also had three navigation/reload timeouts (138 passed, 3 intentional mobile beforeunload skips). The concurrent development run had 23 passes and one Firefox timeout. These runs are not counted as a passing checkpoint. Subsequent browser invocations are sequential.

Ticket 01 final preflight: `pnpm exec playwright test tests/frontend/standalone.spec.ts tests/frontend/stability.spec.ts tests/frontend/workflows.spec.ts` on the reviewed implementation: 147 passed, 3 intentional mobile beforeunload skips, 6 intermittent timeouts. `pnpm exec playwright test --last-failed --workers=1`: all 6 passed. No assertion was weakened. Repeated `pnpm typecheck`: passed. Application/test checkpoint: `c38c75e` (documentation finalized in the amended ticket commit).
