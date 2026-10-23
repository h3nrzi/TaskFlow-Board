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

## Ticket 02 — Show minimal Overdue badges

Review base: `655dfea`. First action: find an incomplete task dated before your local today, open its drawer, mark it Done, then reopen it. Overdue disappears and returns.

1. Set up tasks with past, today, future, and no due dates. Test To do, In progress, and Done. Only past-due incomplete tasks show **Overdue**.
2. Find a past-due incomplete task in Tasks, its project board, Dashboard Recently touched (ensure it is among the five displayed), and its drawer. The same text badge appears in all four surfaces.
3. Complete/reopen from Tasks and from the drawer. Change its date to today, a past date, and empty. The badge follows each saved change. Edit the date through the form too; the form itself has no badge.
4. Reload: the result remains correct. Coming up still excludes past dates and includes eligible today/future tasks.
5. Repeat in light/dark themes at a narrow width: badge text and controls remain readable and usable. The automated matrix includes both themes and narrow mobile viewports; screenshots of boards are attached to the Playwright report.
6. With a controlled browser clock, view a task due today just before local midnight, advance past midnight, then open its drawer or reload. Overdue now appears. Idle-page automatic refresh is intentionally absent.

Evidence: local-calendar four-surface test failed before implementation (Chromium desktop). After implementation, both light/dark tests passed on Chromium desktop; `pnpm typecheck` passed. The matrix also exercises status/date edits, persistence schema, local/UTC difference, and local-midnight render/reload.

User observations: **Pending**.

Retained limitations: an idle tab may remain stale across midnight until relevant render/reload. Date-only `updatedAt` cannot order same-day edits precisely; Recently touched ties keep existing order and may omit a task edited today. Neither behavior changes in this phase.

Ticket 02 final preflight (application/test checkpoint `a06ec45`): `pnpm exec playwright test tests/frontend/overdue.spec.ts --workers=1`: **24 passed**, no skips (1.7 minutes). Standards: 0 findings. Spec: 0 findings. Reviewed diff `655dfea...a06ec45`. Inspected attached desktop dark and mobile dark board screenshots: badge and existing controls remain readable.

## Ticket 03 — Use a time-neutral Dashboard welcome

Review base: `d29a8a4`. First action: open Dashboard and read **Welcome back, <first name>.**

1. Save a multi-word profile name in Settings, return to Dashboard, and reload. The first name remains personalized and the welcome has no fixed time of day.
2. Follow View all to Tasks and open a task. Existing Dashboard metrics, Recently touched, Coming up, and layout remain unchanged. Check both themes if used.

Evidence: focused Chromium desktop test failed on the welcome assertion before the copy change. Matrix and typecheck results recorded below after completion.

User observations: **Pending**.

Ticket 03 final preflight (application/test checkpoint `3124ea8`): `pnpm exec playwright test tests/frontend/welcome.spec.ts --workers=1`: **6 passed**, no skips. `pnpm typecheck`: passed. Standards: 0 findings. Spec: 0 findings. Reviewed diff `d29a8a4...3124ea8`.

## Ticket 04 — Provide user-facing 404 recovery

Review base: `6983769`. First action: visit http://localhost:21998/not-a-route and activate **Back to Dashboard**.

1. Save a uniquely named task. Visit an unknown route. The page says **404 — Page not found** and explains that the page may have moved or the address may be incorrect.
2. Press Tab (Option-Tab in macOS Safari with its default link-navigation setting) to focus Back to Dashboard, then Enter. Dashboard opens; follow View all and find your saved task. Unknown-page recovery preserves exact stored workspace data.
3. Visit `/projects/does-not-exist`: the distinct **This project has moved** fallback remains.
4. At a narrow width, check the recovery text and link without horizontal scrolling. Both light/dark CSS theme classes are tested independently of the workspace shell, which remains unmounted on the unknown route. A direct unknown-page load does not initialize workspace theme state; Dashboard recovery restores the workspace's saved appearance.
5. For deployments under a configured base path, use the fallback inside that base and verify its Dashboard link stays inside that base.

Evidence: the focused Chromium desktop workflow failed before the friendly-copy change. Matrix, non-root-base smoke, full repository check and review results follow below.

User observations: **Pending**.

Ticket 04 keyboard preflight: initial matrix had 7 passes and 5 failures: two timeouts plus three WebKit focus assertions. macOS WebKit uses Option-Tab for links by default ([Apple reference](https://help.apple.com/safari/mac/8.0/en.lproj/cpsh003.html)). The test now uses that platform shortcut, retaining focus and Enter assertions; no application workaround was added.

Non-root deployment preflight: built with `pnpm --filter @taskflow/web exec vite build --base=/taskflow/ --outDir=/tmp/taskflow-base-preview`, then served using `WEB_PORT=22018 pnpm --filter @taskflow/web exec vite preview --base=/taskflow/ --outDir=/tmp/taskflow-base-preview`. Chromium, Firefox and WebKit all verified that `/taskflow/not-a-route` offers `href="/taskflow/"`, activation reaches that URL, and Dashboard renders. WebKit's first load timed out; retry using DOMContentLoaded plus the same visible UI assertions passed. Its outstanding requests were three `fonts.gstatic.com` font downloads. The temporary preview was stopped after the smoke check.

Integration test stabilization: a shared Playwright fixture aborts only Google Fonts requests (`fonts.googleapis.com` and `fonts.gstatic.com`) so external cosmetic downloads cannot hold navigation or layout checks open. All workflow assertions remain intact and application font loading is unchanged. Automated screenshots use fallback fonts. The initial post-keyboard-fix recovery matrix passed all 12 cases; matrix rerun and full integration check follow with this deterministic resource boundary.

Ticket 04 final preflight (application/test checkpoint `508edce`): `pnpm exec playwright test tests/frontend/recovery.spec.ts --workers=1` with isolated fonts: **12 passed**, no skips (20 seconds). `pnpm typecheck`: passed. Standards: 0 findings. Spec: 0 findings; both reviewers rechecked the keyboard and shared-fixture amendments. Reviewed diff `6983769...508edce`. Inspected a narrow dark recovery screenshot: text and link fit and are readable.

## Final integration checkpoint

On 2026-10-23 at application/test revision `508edce`, **`pnpm check` passed (exit 0)**:

- Frontend: **222 passed, 6 intentional skips**, all six browser/viewport configurations, normal three-worker setting, 1.7 minutes. Skips retain their existing reasons: three mobile beforeunload cases and three mobile configurations of the desktop-wheel-only overlay test.
- Dependency audit: 297 retained frontend snapshots and direct resolutions preserved.
- Both application typechecks and production builds: passed.
- API HTTP application test: 1 passed.
- Development/preview proxy, SPA navigation, stopped-backend and occupied-port tooling tests: 3 passed.

This final run rechecks all earlier ticket checkpoints using the shared cosmetic-resource fixture, with no retries or failed-test reruns required. The existing nonfatal tooltip sourcemap diagnostic remains in Vite build output. No application changes followed this check; the final ticket commit adds completion evidence and ticket checkboxes.

First concrete evaluation action: open the local Tasks page, click **New task**, choose **No project**, enter a unique title, and save. Then follow each ticket's steps above and report observations by ticket/step. All four tickets are implemented and reviewed; **human evaluation remains pending** for each. The final implementation commits are discoverable with `git log -4 --oneline` (evidence-only amendments finalize each ticket checkpoint).
