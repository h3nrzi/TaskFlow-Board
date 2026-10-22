# Keep dialogs and project boards operable by keyboard

Status: ready-for-agent
Type: task
Priority: P1
Implementation: complete
Human evaluation: pending

## Reproduction

Open New task by keyboard. Tab after Create task moves into the background; Escape does not close. Board task articles have only click handlers.

## Diagnosis and change

Overlays lack keyboard containment, Escape handling and focus restoration. Click-only cards lack an interactive title.

Trap focus in the top overlay, restore the opener and handle Escape; expose native title links/buttons for cards.

## Checks and handoff

2026-10-22: final `pnpm check` exited 0. Browser matrix: 117 passed, 3 mobile unload-prompt cases intentionally skipped. Independent standards/spec review findings resolved. Human evaluation remains pending.

See [evaluation guide](../../../docs/testing/frontend-evaluation.md) for per-ticket coverage and preflight evidence. Regression tests live in `tests/frontend/`.

## Comments

2026-10-22: scoped under the approved frontend stability specification; no backend integration or library modernization.
