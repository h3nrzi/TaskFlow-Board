# TaskFlow frontend stability evaluation

Human evaluation: **pending**. Automated results establish preflight readiness, not
human acceptance. Real-device testing is optional and remains pending.

## First action

Run `pnpm dev:web`, open http://localhost:21998/projects/field-notes in a disposable
browser profile, and choose **Add task**. Confirm **Field Notes** is selected, create
an “Evaluation task”, and confirm it appears on that board after reloading once
**All changes saved locally** appears. This is ticket 03's first checkpoint.

Use a disposable profile or private window for destructive and storage-failure
scenarios. Tests themselves use isolated browser contexts at `127.0.0.1:22017` and
do not access your normal workspace at `localhost:21998`.

## Reproduce automated preflight

Use Node 24.22.0 and pnpm 10.11.0. The matching browser binaries must be installed
or already cached; a download failure is an environment limitation, not a test pass:

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install --with-deps chromium firefox webkit
pnpm check
```

`pnpm test:frontend` runs only the browser matrix; `pnpm exec playwright test
--project=webkit-mobile` selects one project. `pnpm exec playwright show-report`
opens the latest HTML report. Failure traces and screenshots are in `test-results/`.
The browser suite builds the frontend and serves it at port 22017; keep that port
free. Other application checks also test API health/proxy behavior; frontend
workflows remain independent of the API.

## Coverage and per-ticket checkpoints

| Ticket | Hands-on steps | Expected result / checkpoint |
| --- | --- | --- |
| 01: regression gates | Run the preflight commands. Read six projects in the browser report. | Chromium, Firefox, WebKit each have desktop and mobile projects. Dependency, type, build, API and tooling checks also pass. |
| 02: malformed saved data | In a disposable profile set `taskflow-store-v1` to `{broken workspace` using browser storage tools; reload. Choose **Download saved data**. | Recovery screen replaces normal workflows. Stored bytes and downloaded bytes remain exactly `{broken workspace`; no demo data overwrites them. Restore a valid copy manually and choose **Try again**. |
| 02: invalid shape | Set the key to `{"projects":[],"tasks":[{"id":"important"}],"profile":null}` and reload. | Recovery screen, unchanged original bytes, no component crash. |
| 02: save failure | Follow the injection below, then create a task or change appearance. | App remains usable; persistent **not saved** warning and settings status; current-workspace download contains the change. Do not treat a transient “updated” notice as a successful save. |
| 02: stale tab | Load two tabs before changing either. Add “Tab A task” in A; wait for saved status. Add “Tab B task” in B. | B reports that another tab changed the workspace and does not overwrite A. Download B before reloading; A's task remains persisted. There is no automatic merge/import. |
| 02: unload protection | On desktop save dark appearance, inject write failure, switch back to light, then reload. Choose to stay. | Browser warns about unsaved changes; light stays visible and can be exported. Mobile prompts are not guaranteed; persistent warning/download are the recovery path. |
| 03: board context | Perform the first action above. Also use the column plus and desktop topbar New task from another project. | Each board entry point defaults to that board; an explicitly selected different project is respected. |
| 04: keyboard overlays | Keyboard-focus New task, press Enter, edit, Tab/Shift+Tab through controls, then Escape. Repeat with project editor, task drawer, nested task editor and delete confirmation. | Focus stays inside the top overlay; Escape closes one layer; focus returns to a surviving opener; background controls are inactive. Cancel deletion keeps data. |
| 04: keyboard cards | Tab to a project's title on Projects and press Enter. Tab to a task title on the board and press Enter. | Project opens; task drawer opens. Status dropdown remains independently keyboard accessible. |
| 05: demo forms | From login choose Create a demo profile; enter name/email and submit. Switch signup/login in both directions. | Signup starts empty; login defaults to current demo profile; no previous mode's draft leaks. Existing projects/tasks remain intact. No backend account is created. |
| 06: local dates | Run the near-midnight regression (command below). Manually change a task on either side of local midnight if convenient. | Creation/update dates use the current local calendar day; due dates retain the selected calendar date. |
| 07: no-project tasks | In a disposable empty workspace create a task before any project exists. Open/edit it. Then create a project and edit that task again. | Drawer/form show **No project**; saving does not silently assign the task to the newly created project. |
| 08: responsive layout | At 320px and 390px portrait, 844px landscape, then tablet/desktop widths, visit overview, projects, board, tasks, settings and demo forms. Open task/project forms and drawer. | No unintended document-wide horizontal scroll. Overview header and appearance controls wrap. Tablet board may scroll horizontally inside the board. Mobile bottom navigation/menu work by touch; form controls and action buttons remain reachable. |

For repeatable date evidence:

```sh
pnpm exec playwright test -g 'local calendar dates' --project=chromium-desktop
```

To simulate write failure in a disposable tab's browser console:

```js
Storage.prototype.setItem = () => {
  throw new DOMException('Evaluation quota failure', 'QuotaExceededError');
};
```

Reload restores that injected method, but first download any unsaved work. To
exercise a read failure and exact recovery exports unattended, run the storage
regressions rather than changing your real browser's storage permissions.

## Existing workflow walkthrough

1. Overview: verify metrics, upcoming deadlines, recent tasks, completion toggles,
   and links reflect the same tasks shown elsewhere.
2. Projects: create, rename, recolor, cancel deletion, then confirm deletion of a
   disposable project. Only that project's tasks should disappear.
3. Board: create/edit a task; change status with its menu (touch/keyboard); on
   desktop also drag between columns. Confirm counts/progress and reload.
4. Tasks: create with all fields, edit through drawer and full editor, complete,
   undo completion, cancel deletion, then delete. Verify persistence on reload.
5. Search/filters/sort: search task/project text, combine status+priority+project,
   see empty results, reset filters, sort priority and due date.
6. Settings: save profile, change light/dark, reload after saved status. Demo
   signup/login should change only local profile data.
7. Navigation: exercise mobile bottom navigation/menu, browser back/forward,
   direct project links, deleted-project fallback and unknown-route fallback.

Automated tests cover these workflows across Chromium/Firefox/WebKit at 1440×900
and 390×844. Responsive sweeps include 320, 390, 768, 844, 1024 and 1440px widths.
Firefox mobile uses viewport+touch emulation because its engine does not support
Playwright's `isMobile` option. Browser engines are emulation, not physical devices.

## Actual preflight evidence (2026-10-22)

- Starting commit: `2af2532cda6094cdb0eb13843c01b0b96fe94358`; working tree was clean.
- Runtime observed: Node `v24.22.0`, pnpm `10.11.0`.
- Original `pnpm check`: failed at missing `docs/migration-evidence/protected-files.json`.
- Original `pnpm verify:dependencies`: failed at missing `docs/migration-evidence/frontend-dependencies.json`.
- Initial Chromium audit: eight targeted regression failures; four workflow tests
  passed; one additional audit failure was a test expecting the wrong existing
  missing-project wording and was corrected without changing that behavior.
- Separate keyboard-card and no-project-display regressions failed before fixes.
- First six-project matrix: 83 passed / 7 failed. This exposed asynchronous save
  timing and 320px overflow in Firefox/WebKit; neither was counted as completion.
- Follow-up three-project run: 43 passed / 2 failed, narrowing remaining overflow
  to Settings appearance controls at 320px (about 355px document width).
- Dependency baseline was reconstructed from the starting commit's lockfile:
  297 existing frontend dependency snapshots and all direct resolutions preserved.
  This records the current starting point, not missing historical migration evidence.
- New runner is pinned to Playwright 1.63.0, matching cached engines. An attempted
  latest-runner browser download returned location-based HTTP 403; cached matching
  engines allowed the actual audit to run. CI installs matching browsers normally.
- Review: [separate standards and spec reports](frontend-review.md). One standards
  finding and two spec findings were reproduced/addressed; both reviewers reported
  zero remaining findings after reinspection.
- Final `pnpm install --frozen-lockfile --offline`: passed; lockfile up to date.
- Final `pnpm check`: **exit 0**. Browser matrix: **117 passed, 3 intentionally
  skipped** (mobile native unload prompts), 0 failed. All 20 scenarios execute in
  six projects; the native unload safeguard executes on desktop only.
- Both application typechecks and production builds: passed. Vite retains an
  existing tooltip sourcemap diagnostic while completing the build successfully.
- API health test: **1 passed**. Development/preview proxy, SPA fallback and
  occupied-port workflow tests: **3 passed**.
- `git diff --check`: passed. No tagged debug instrumentation remains.
- Inspected final captured 320px overview and Settings screenshots; no document
  overflow. The browser HTML report retains these screenshot attachments.

| Ticket | Actual automated evidence in the passing final matrix |
| --- | --- |
| 01 | Six browser projects; dependency audit (297 snapshots), typechecks, builds, API/tooling tests. |
| 02 | Malformed/invalid-shape preservation, exact recovery downloads, write/read failures, stale tabs, missing-lock protection; desktop native unload warning. |
| 03 | Board task project default, creation and reload. |
| 04 | Modal focus containment/Escape/restoration; keyboard project/task titles; nested edit/delete focus restoration. |
| 05 | Login-to-signup reset plus existing demo signup/profile workflow. |
| 06 | Pinned near-midnight Asia/Tehran creation-date regression. |
| 07 | Empty-workspace No project display; existing-project unassigned task edit preserves empty project ID. |
| 08 | Route sweeps across narrow/landscape/tablet/desktop widths, narrow modal fit, mobile touch navigation; attached screenshots. |

## Evaluation report

Report each ticket/checkpoint as **pass**, **fail**, or **not evaluated**, with
browser, viewport/device, steps, expected behavior, observed behavior and any
screenshot/console error. All eight ticket checkpoints remain pending until you
report observations. Automated passes do not change that status.
