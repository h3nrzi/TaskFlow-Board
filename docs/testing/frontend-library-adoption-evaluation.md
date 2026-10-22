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
- Production assets from the baseline build: JS 383,321 bytes / 119,794 gzip; CSS 96,167 bytes / 17,075 gzip, measured with shell Node v24.22.0 zlib defaults. Use the same runtime/compression for the final comparison; earlier discovery compression numbers differ and must not be mixed with these.

Do not pool passing cases across runs into a full-suite pass. Preserve original failure evidence before reruns. Classify only with evidence: pre-existing, infrastructure-related, behavioral regression, or unresolved. Earlier external-font timeouts are historical context, not a diagnosis of new failures.

First concrete action: run `pnpm dev:web`, open `http://127.0.0.1:21998/tasks`, and choose **New task**.

Reproducible checks (use a disposable browser profile/workspace):

1. Task form: title initially focused; Tab from the final save control wraps to Close; Shift+Tab wraps back. Press inside then release on the backdrop: form stays open. Press directly on the backdrop: it cancels (native pointer defaults can subsequently move focus). Reopen by keyboard and press Escape: focus returns to New task.
2. Project form: open Projects → New project. Repeat focus, inside interaction, backdrop and Escape checks. Cancelled drafts must not create projects.
3. Task drawer: open a task by keyboard. Close control receives focus; Tab/Shift+Tab remain contained. Backdrop/Escape close it and return focus to the task opener.
4. Confirmation: from the drawer choose Delete. Keep it initially receives focus. Cancel using Keep it, backdrop, and Escape in separate openings. Each must retain the task/drawer and restore focus to Delete. Closing the drawer afterwards restores the task opener.
5. Nested editing: open Edit from a drawer, dismiss only the form, and check focus returns to Edit while the drawer remains. Save a disposable edit and reload to verify persistence.
6. Presentation: compare desktop and mobile, light and dark themes; overlay geometry, colors, borders, shadows, animation, background interaction and scroll behavior must match the original application. Check a tall task form on a short viewport and a scrolled task page.

Record observations separately for each item, with browser/viewport and expected versus observed behavior. Until the user reports observations, every item remains **Not Evaluated**.

## Ticket 02 — Radix adoption

Implementation and automated checks: **Not started**.

First action after implementation: repeat the task-form check above, then nested Edit/Delete from the same task drawer. Follow the complete feature list above for acceptance; also create/edit/delete a disposable task and project, reload, and confirm local persistence and cascade deletion.

Actual per-step checks, final regression results, bundle differences, code-review findings, and compatibility decisions will be appended during implementation. Unexecuted or incomplete checks are not passing checks.
