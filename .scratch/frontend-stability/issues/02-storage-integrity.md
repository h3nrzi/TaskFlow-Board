# Preserve saved work across storage failures and stale tabs

Status: ready-for-agent
Type: task
Priority: P0
Implementation: complete
Human evaluation: pending

## Reproduction

Seed malformed JSON or an invalid workspace shape; load the app. Override Storage.setItem to throw. Open two tabs, add a task in A, then add one in stale B.

## Diagnosis and change

Read failures silently restore demo data and the effect writes it over the original. Parsed values are unvalidated. Write exceptions escape the effect. Stale tabs overwrite the complete store.

Validate before rendering, retain raw invalid bytes behind recovery UI, catch storage failures, offer downloads, compare persisted bytes under a Web Lock before writing. No automatic merging. Missing locking fails closed. Save status distinguishes pending writes from acknowledged saves; desktop unload protection guards unsaved changes. Read failures and recovery-download contents have browser regressions.

## Checks and handoff

2026-10-22: final `pnpm check` exited 0. Browser matrix: 117 passed, 3 mobile unload-prompt cases intentionally skipped. Independent standards/spec review findings resolved. Human evaluation remains pending.

See [evaluation guide](../../../docs/testing/frontend-evaluation.md) for per-ticket coverage and preflight evidence. Regression tests live in `tests/frontend/`.

## Comments

2026-10-22: scoped under the approved frontend stability specification; no backend integration or library modernization.
