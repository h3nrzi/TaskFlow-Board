# Create board tasks in the current project

Status: ready-for-agent
Type: task
Priority: P1
Implementation: complete (follow-up automatically verified)
Human evaluation: Human-accepted

## Expected behavior

On an existing project board, every new-task entry point defaults to that project.
Explicitly selecting a different project is respected. Cancelling a form must not
leak its selection into a later form or another board. Both canonical and accepted
trailing-slash URLs must behave consistently.

## Human evaluation failure

2026-10-22: user reported that Add task on `/projects/field-notes` did not preselect
Field Notes, despite the earlier automated pass. That human attempt is recorded
as **failed** in the history. The user subsequently marked this ticket
**Human-accepted** on 2026-10-22; acceptance comes from that explicit direction,
not from automated results.

## Exact workflow and served-version investigation

- Starting checkout: clean `2239f26` (`fix: stabilize frontend workflows and protect saved workspace data`).
- Port 21998 was served by Vite development process PID 36213, with working directory
  `/Users/hossein/Downloads/TaskFlow-Board/apps/web`. The HTML included `/@vite/client`
  and `/src/main.tsx`; this was development serving, not an obsolete preview build.
- GET `/src/App.tsx` contained the committed project-default fix and the newer UI
  markers. The server was serving this checkout's current source.
- The actual Chrome tab was at `http://127.0.0.1:21998/projects/field-notes`, with no
  trailing slash. Its empty New task form selected **Studio website**. Cancel and
  Add task reproduced that selection a second time in the same document.
- That document had no `workspace-save-state` element and no dialog role on the task
  form, although both exist in `2239f26`. Its Vite log reported a failed WebSocket
  connection. The exact historical bundle SHA was not exposed; these observable
  markers show it was an older loaded document, not the currently served module.
- After confirming the task form had no draft title, description, assignee or due
  date, reloading the same tab restored the current markers and a connected Vite
  WebSocket. Add task then selected **Field Notes**. No user task was created,
  edited or deleted during this browser verification.

The exact human/automation discrepancy was a stale loaded browser document. The
previous test always built and loaded a fresh preview in an isolated browser, so
it did not represent the user's already-open document or verify its version.
The failed development update connection explains why that document had not
received the current frontend. Reloading restored it; no browser storage reset
or HMR/network configuration change was needed.

## Independent source defect and smallest fix

A fresh browser against the same server selected Field Notes at the canonical URL,
but selected Studio website at `/projects/field-notes/`. The board's router accepts
that URL; the form default used exact pathname equality, which rejected it.
This independently confirmed defect was absent from the prior canonical-only test.
**It did not cause the observed no-slash human failure.**

The two-line source fix derives the project ID with the existing Wouter
`useRoute('/projects/:id')` matcher and checks it against existing projects. This
uses the same matching rules as the board and preserves explicit project choices.
No library upgrade or architectural refactor was introduced.

## Regression evidence

Before the follow-up source fix:

```sh
TASKFLOW_TEST_SERVER=development pnpm exec playwright test --project=chromium-desktop -g 'new task on a project board' --reporter=list
```

Result: **1 passed, 1 failed**. Canonical URL passed; trailing-slash URL failed
with expected `field-notes`, received `studio-site`.

After the fix:

```sh
TASKFLOW_TEST_SERVER=development pnpm exec playwright test -g 'new task on a project board|board task entry points' --reporter=list
```

Result: **18 passed**, 0 failed across Chromium, Firefox and WebKit at desktop/mobile
viewports. Coverage includes canonical and trailing-slash creation, actual saved
project ID and reload, SPA navigation between Field Notes and Spring launch, board
header/column/topbar entry points where visible, cancellation, and explicit project
overrides. CI now runs this development-mode group as well as the full preview matrix.

Direct post-fix fresh-browser verification of the existing server at port 21998:
canonical and trailing-slash URLs both selected `field-notes` / **Field Notes**,
with current save-state and dialog-role markers.

Final `pnpm check` follow-up result: **exit 0**. Full production-preview matrix:
**129 passed, 3 intentionally skipped** mobile unload-prompt cases, 0 failed.
All 297 retained frontend dependency snapshots, both application typechecks/builds,
one API health test and three tooling workflow tests passed. `git diff --check`
passed. The new development-mode CI step also parsed correctly. These are actual
local preflight results; remote CI has not been run for this uncommitted follow-up.
Independent standards/spec reviews of the follow-up: no actionable findings.

## Retest procedure (reference; no further evaluation requested)

1. Stay on the same origin used for the failure: `http://127.0.0.1:21998`.
   `localhost` is a different browser storage origin.
2. Reload `/projects/field-notes` after closing or saving any draft. Verify
   **All changes saved locally** appears before opening a form.
3. Click the board header's **Add task**. Expect **Field Notes** to be selected.
4. In a disposable workspace, create an evaluation task. Wait for saved status,
   reload, and confirm it remains on Field Notes.
5. Repeat at `/projects/field-notes/`, then with the column plus and the desktop
   topbar New task. Explicitly select another project once and confirm that choice
   is respected.

This procedure remains as a reproducible reference. The user has now marked
the ticket Human-accepted and ended detailed manual evaluation at this stage.
No additional retest is requested. Individual subcheck or device observations
were not supplied and are not inferred from ticket-level acceptance.

## Checks and handoff

See the [evaluation guide](../../../docs/testing/frontend-evaluation.md) and
[follow-up review](../../../docs/testing/frontend-review.md). The earlier
117-pass/3-skip checkpoint is historical evidence, not a passing human evaluation.

## Comments

- 2026-10-22, initial implementation: defaulted board task forms from pathname;
  fresh preview matrix passed (117/3 skipped); human evaluation was pending.
- 2026-10-22, human evaluation: failed canonical Add task preselection.
- 2026-10-22, follow-up: reproduced the stale-document failure in the actual tab,
  verified the currently served source, confirmed reload resolved the canonical
  workflow, reproduced and fixed the separate trailing-slash defect, strengthened
  development/preview regression coverage. At that handoff, human acceptance was pending retest.

### Human evaluation closeout — 2026-10-22

Human-accepted at the user’s explicit direction. This is ticket-level acceptance; no additional per-subcheck, browser or physical-device results are inferred.

Source: user's explicit instruction in the implementation chat. All other manual
checks are Not Evaluated; no further manual evaluation is requested now. Existing
automated evidence is unchanged.
