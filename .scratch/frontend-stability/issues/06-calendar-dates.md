# Use the current local calendar date

Status: ready-for-agent
Type: task
Priority: P2
Implementation: complete
Human evaluation: pending

## Reproduction

At 2026-10-22T21:30Z in Asia/Tehran, create a task. Before fix createdAt is October 22; local date is October 23.

## Diagnosis and change

Dates are truncated UTC timestamps and the offset helper captures module-load time.

Compute local year/month/day at the time of each mutation and comparison.

## Checks and handoff

2026-10-22: final `pnpm check` exited 0. Browser matrix: 117 passed, 3 mobile unload-prompt cases intentionally skipped. Independent standards/spec review findings resolved. Human evaluation remains pending.

See [evaluation guide](../../../docs/testing/frontend-evaluation.md) for per-ticket coverage and preflight evidence. Regression tests live in `tests/frontend/`.

## Comments

2026-10-22: scoped under the approved frontend stability specification; no backend integration or library modernization.
