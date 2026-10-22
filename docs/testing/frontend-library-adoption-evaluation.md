# Phase 3 overlay adoption: evidence and hands-on evaluation

Human acceptance: **Pending** for both tickets. No human result is inferred from tests or this guide.

## Ticket 01 — baseline and contract coverage

Application baseline: `6ba23cd057d6517c0009c0f9f9145a94f910bac3`.
No application changes precede the baseline. Node reports v24.22.0 at the shell; pnpm 10.11.0. The repository config runs Chromium, Firefox and WebKit at desktop 1440×900 and mobile 390×844, timezone Asia/Tehran, three workers, zero retries.

Commands and current evidence:

- `pnpm test:frontend`: **129 passed, 3 intentional mobile beforeunload skips, 0 failures**, 3.3 minutes. Durable console log: `.scratch/frontend-library-adoption/evidence/original-baseline/console.log`. Local HTML report: `/tmp/taskflow-phase3-original-report/index.html`.
- `pnpm typecheck`: passed for web and API.
- New overlay characterization checks: initial run 24 failed due to incorrect test assumptions (backdrop focus restoration and exposed mobile drawer backdrop). Interim run 21 passed / 3 failed while test corrections were being developed; it is not evidence for the final test revision. A subsequent run recorded 23 passed / 1 failed due to detecting backdrop geometry before a drawer animation finished. Final test revision waits for animation completion and opens the parent drawer by keyboard for restoration checks. These were test-expectation/timing defects on unchanged application code, not application regressions.
- Final-revision characterization run: 23 passed / 1 Firefox desktop task-form navigation timeout, 48.2 seconds. The trace showed both Google Fonts stylesheet requests pending (status/time -1) at the navigation timeout before assertions. Classified infrastructure-related from that evidence; not a passing check. Trace directory: `/tmp/taskflow-phase3-contract-navigation-timeout`. A fresh full characterization run is pending. Initial/interim logs remain in `/tmp/taskflow-phase3-contracts.log`, `/tmp/taskflow-phase3-contracts-corrected.log`, and `/tmp/taskflow-phase3-contracts-before-animation-fix.log`.
- Fresh full characterization run, unchanged final test revision: **24 passed, 0 failed**, 36.0 seconds. This clean run does not erase the preceding timeout. Durable log: `.scratch/frontend-library-adoption/evidence/contracts-baseline.log`; all-project computed presentation baseline: `.scratch/frontend-library-adoption/evidence/presentation-baseline.json`; screenshots and report: `/tmp/taskflow-phase3-verified-contract-baseline/index.html`. Chromium desktop task-form screenshot visually inspected; other captures retained for before/after comparison.
- Review follow-up: actual scrolling baseline at a 420px-high viewport passed in all three desktop browsers: **3 passed, 3 explicit mobile skips**, 24.0 seconds. New wheel-based checks cannot exercise mobile WebKit; touch scrolling remains manual and Not Evaluated. Form scroll reached 160px; background stayed around 150px during inside scrolling and advanced to 310–312px when wheeling over the backdrop; Escape restoration returned it to 0–2px. Numeric evidence: `.scratch/frontend-library-adoption/evidence/scroll-baseline.json`; command log: `evidence/scroll-baseline.log`. These positions characterize the current native behavior, including allowed background scrolling.
- Initial scrolling-check development run: 3 passed / 3 failed. Mobile WebKit rejected mouse-wheel input; Firefox mobile did not establish the requested wheel scroll; Firefox desktop timed out in navigation. These failures are retained at `/tmp/taskflow-phase3-initial-scroll-results` and `/tmp/taskflow-phase3-initial-scroll.log`; no application changes were made to address them. The final desktop-only check passed without changing navigation timeouts. Final web/API typechecks also passed.
- Production assets from the baseline build: JS 383,321 bytes / 119,794 gzip; CSS 96,167 bytes / 17,075 gzip, measured with shell Node v24.22.0 zlib defaults. Use the same runtime/compression for the final comparison; earlier discovery compression numbers differ and must not be mixed with these.

Do not pool passing cases across runs into a full-suite pass. Preserve original failure evidence before reruns. Classify only with evidence: pre-existing, infrastructure-related, behavioral regression, or unresolved. Earlier external-font timeouts are historical context, not a diagnosis of new failures.

First concrete action: run `pnpm dev:web`, open `http://127.0.0.1:21998/tasks`, and choose **New task**.

Reproducible checks (use a disposable browser profile/workspace):

1. Task form: title initially focused; Tab from the final save control wraps to Close; Shift+Tab wraps back. Press inside then release on the backdrop: form stays open. Press directly on the backdrop: it cancels (native pointer defaults can subsequently move focus). Reopen by keyboard and press Escape: focus returns to New task.
2. Project form: open Projects → New project. Repeat focus, inside interaction, backdrop and Escape checks. Cancelled drafts must not create projects.
3. Task drawer: open a task by keyboard. Close control receives focus; Tab/Shift+Tab remain contained. Escape closes it and returns focus to the task opener. Where a backdrop is exposed, mouse-down cancels it; native pointer defaults can subsequently move focus. The full-width mobile drawer has no exposed backdrop.
4. Confirmation: from the keyboard-opened drawer choose Delete by keyboard. Keep it initially receives focus. Cancel using Keep it, backdrop, and Escape in separate openings; each must retain the task/drawer. Escape restores focus to Delete; backdrop cancellation retains native pointer-focus sequencing rather than guaranteeing final opener focus. Closing the drawer by Escape afterwards restores the task opener.
5. Nested editing: open Edit from a drawer, dismiss only the form, and check focus returns to Edit while the drawer remains. Save a disposable edit and reload to verify persistence.
6. Presentation: compare desktop and mobile, light and dark themes; overlay geometry, colors, borders, shadows, animation, background interaction and scroll behavior must match the original application. At a 420px-high desktop viewport, focus New task, scroll the page, then press Enter. Scrolling inside the overflowing form moves its content; wheeling on the exposed backdrop still moves the background page. Escape closes the form and restoring opener focus can scroll the page back to the opener. Evaluate mobile touch scrolling manually; it is not covered by the desktop wheel checks.

Record observations separately for each item, with browser/viewport and expected versus observed behavior. Until the user reports observations, every item remains **Not Evaluated**.

## Ticket 02 — Radix adoption

Implementation: **In progress**. Ticket 01 follow-up Standards and Spec reviews found no remaining actionable issues (the initial two Spec findings were resolved before migration).

Task-form migration step: web/API typechecks passed; focused task form, nested edit/delete, existing task-modal focus and desktop scrolling checks recorded **21 passed / 3 explicit mobile wheel skips**, 40.1 seconds. Command: `pnpm exec playwright test tests/frontend/overlays.spec.ts tests/frontend/stability.spec.ts --grep 'task form|task modal contains|nested edit'`. Durable log: `.scratch/frontend-library-adoption/evidence/task-step.log`.

Project-form migration step: web/API typechecks passed; project-form contracts and project CRUD/board/cascade workflows recorded **12 passed**, 24.6 seconds across all six projects. Command: `pnpm exec playwright test tests/frontend/overlays.spec.ts tests/frontend/workflows.spec.ts --grep 'project form|project CRUD'`. Log: `evidence/project-step.log`.

Drawer/confirmation first step: typechecks passed but browser checks recorded **15 passed / 3 behavioral failures**, 37.0 seconds. Escape could close the underlying drawer while leaving the top overlay open. This was an introduced regression, not an infrastructure failure. The existing nested workflow reproduced it in **3 of 5 attempts** on Chromium mobile; traces recorded the drawer's Escape handler receiving a key while an edit/confirmation overlay was focused. Diagnostic evidence: `/tmp/taskflow-phase3-escape-diagnosis-results`; logs: `evidence/nested-regression.log`, `evidence/escape-diagnosis.log`.

Supported compatibility fix: prevent Radix's document-level Escape dismissal and close the content receiving the key via its capture handler. Preserve the existing synchronous restoration cleanup and custom mouse-down backdrop; use primitive focus/layer machinery without introducing scroll locking. No private primitive APIs or altered assertions. Temporary debug logging removed. The identical five-attempt workflow passed **5/5**, 21.7 seconds (`evidence/escape-fixed.log`). Full nested follow-up and final integration checks remain pending.

Broader nested follow-up: **17 passed / 1 infrastructure-related navigation timeout**, 1.0m. WebKit desktop confirmation timed out in `page.goto` before assertions; both external Google Fonts stylesheets were pending (status/time -1). No behavioral failure in that run; the timed-out configuration was not verified by it. Trace: `/tmp/taskflow-phase3-nested-font-timeout-results`; log: `evidence/nested-fixed.log`. Fixed web/API typechecks passed. All four overlays migrated; unused custom focus hook removed. Final full repository check and two-axis review are in progress.

First action after implementation: repeat the task-form check above, then nested Edit/Delete from the same task drawer. Follow the complete feature list above for acceptance; also create/edit/delete a disposable task and project, reload, and confirm local persistence and cascade deletion.

Actual per-step checks, final regression results, bundle differences, code-review findings, and compatibility decisions will be appended during implementation. Unexecuted or incomplete checks are not passing checks.
