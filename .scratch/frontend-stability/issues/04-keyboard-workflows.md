# Keep dialogs and project boards operable by keyboard

Status: ready-for-agent
Type: task
Priority: P1
Implementation: complete
Human evaluation: Partial — first keyboard-dialog check Passed; remaining manual checks Not Evaluated

## Reproduction

Open New task by keyboard. Tab after Create task moves into the background; Escape does not close. Board task articles have only click handlers.

## Diagnosis and change

Overlays lack keyboard containment, Escape handling and focus restoration. Click-only cards lack an interactive title.

Trap focus in the top overlay, restore the opener and handle Escape; expose native title links/buttons for cards.

## Checks and handoff

2026-10-22: final `pnpm check` exited 0. Browser matrix: 117 passed, 3 mobile unload-prompt cases intentionally skipped. Independent standards/spec review findings resolved. At that automated checkpoint, human evaluation was pending.

See [evaluation guide](../../../docs/testing/frontend-evaluation.md) for per-ticket coverage and preflight evidence. Regression tests live in `tests/frontend/`.

## Manual checkpoint results

| Checkpoint | Human result |
| --- | --- |
| First keyboard-dialog check: New task dialog scenario | Passed (user-reported) |
| Other dialogs, including project editor, task drawer and nested edit/delete dialogs | Not Evaluated |
| Keyboard project/task cards and remaining keyboard workflows | Not Evaluated |

## Comments

2026-10-22: scoped under the approved frontend stability specification; no backend integration or library modernization.

### Human evaluation closeout — 2026-10-22

The user reports the first keyboard-dialog check (the New task dialog scenario) Passed. Other dialogs, nested-dialog checks and keyboard-card checks are Not Evaluated manually. Browser/viewport and individual observations were not specified; this does not mark the whole ticket human-accepted.

Source: user's explicit instruction in the implementation chat. All other manual
checks are Not Evaluated; no further manual evaluation is requested now. Existing
automated evidence is unchanged.
