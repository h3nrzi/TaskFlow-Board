# Reset fields when switching demo auth modes

Status: ready-for-agent
Type: task
Priority: P2
Implementation: complete
Human evaluation: pending

## Reproduction

Open login, then Create a demo profile. Signup inherits the previous profile name/email.

## Diagnosis and change

The same AuthScreen instance retains useState initial values across mode changes.

Key the form by auth route; preserve local demo behavior.

## Checks and handoff

2026-10-22: final `pnpm check` exited 0. Browser matrix: 117 passed, 3 mobile unload-prompt cases intentionally skipped. Independent standards/spec review findings resolved. Human evaluation remains pending.

See [evaluation guide](../../../docs/testing/frontend-evaluation.md) for per-ticket coverage and preflight evidence. Regression tests live in `tests/frontend/`.

## Comments

2026-10-22: scoped under the approved frontend stability specification; no backend integration or library modernization.
