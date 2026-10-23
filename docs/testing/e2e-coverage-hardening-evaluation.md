# E2E hardening evaluation

Human observations for all six tickets: **Pending**. Automated checks do not establish acceptance. Use a disposable browser profile; deletion examples intentionally remove test work. Run `pnpm preview` after `pnpm --filter @taskflow/web build`, then open http://127.0.0.1:22017 (set `WEB_PORT=22017` for preview). Browser emulation does not certify physical devices or touch scrolling.

## Environment and preflight — ticket 01

2026-10-23, starting branch `main`, HEAD `61c872d9ddf195caaede740847d58738cef1049a`. Eight staged planning Markdown files were present and preserved. No initial test/application/configuration changes. Node v24.22.0, pnpm 10.11.0. Chromium 1243, Firefox 1543 and WebKit 2359 caches present (older Firefox/WebKit caches also present). Port 22017 had no listener. `TASKFLOW_TEST_SERVER=b`, which is not `development`; production build/preview selected. Configuration: six desktop/mobile browser combinations, Tehran timezone, three workers, zero retries, cosmetic Google font isolation. Glossary/ADRs absent. Read architecture, all existing frontend tests and source contracts. Historical 222-pass results were not counted as current evidence.

Baseline command: `pnpm test:frontend`, before any test/configuration changes. Complete output: `.scratch/e2e-coverage-hardening/evidence/baseline.log`. Result: **222 passed, 6 skipped, 1.8m**, exit 0. The six skips are mobile beforeunload (three) and desktop-wheel characterization on mobile (three).

First action: choose T01 in [the matrix](e2e-coverage-hardening-audit.md), open `workflows.spec.ts` and compare the pre-edit post-reload assertion with the fields the scenario entered. Follow the baseline log to its terminal result. Expected: the baseline protects title/project but lacks complete field retention proof. Inspect each matrix family against its cited test; classifications must distinguish UI assertions, raw-storage guarantees and fixture-only setup.

Review/checkpoint: pending required two-axis review. No product blocker inferred from inspection alone.

## Evaluation checkpoints

Implementation checkpoints, executed checks, review results and feature-by-feature actions will be appended per ticket. User observations remain pending until reported.
