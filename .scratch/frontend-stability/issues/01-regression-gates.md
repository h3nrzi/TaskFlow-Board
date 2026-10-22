# Restore runnable frontend checks

Status: ready-for-agent
Type: task
Priority: P1
Implementation: complete
Human evaluation: pending

## Reproduction

Run `pnpm check`, then `pnpm verify:dependencies` on the original checkout. Both fail with ENOENT for migration evidence.

## Diagnosis and change

The migration evidence is absent; a byte-for-byte source gate also conflicts with approved bug fixes.

Six Playwright projects exercise real workflows; dependency baseline comes from the pre-change committed lockfile, not invented migration provenance.

## Checks and handoff

2026-10-22: final `pnpm check` exited 0. Browser matrix: 117 passed, 3 mobile unload-prompt cases intentionally skipped. Independent standards/spec review findings resolved. Human evaluation remains pending.

See [evaluation guide](../../../docs/testing/frontend-evaluation.md) for per-ticket coverage and preflight evidence. Regression tests live in `tests/frontend/`.

## Comments

2026-10-22: scoped under the approved frontend stability specification; no backend integration or library modernization.
