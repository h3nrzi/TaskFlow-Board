# Create board tasks in the current project

Status: ready-for-agent
Type: task
Priority: P1
Implementation: complete
Human evaluation: pending

## Reproduction

Open Field Notes, choose Add task. Project defaults to Studio website, so the new task disappears from the current board.

## Diagnosis and change

TaskForm defaults to the first project without consulting board context.

Default all new-task entry points on a board to the current project; retain explicit project selection.

## Checks and handoff

2026-10-22: final `pnpm check` exited 0. Browser matrix: 117 passed, 3 mobile unload-prompt cases intentionally skipped. Independent standards/spec review findings resolved. Human evaluation remains pending.

See [evaluation guide](../../../docs/testing/frontend-evaluation.md) for per-ticket coverage and preflight evidence. Regression tests live in `tests/frontend/`.

## Comments

2026-10-22: scoped under the approved frontend stability specification; no backend integration or library modernization.
