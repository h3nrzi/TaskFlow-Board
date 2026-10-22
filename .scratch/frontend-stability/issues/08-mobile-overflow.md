# Keep narrow-screen workflows within the viewport

Status: ready-for-agent
Type: task
Priority: P1
Implementation: complete
Human evaluation: Not Evaluated

## Reproduction

Run the responsive workflow in Firefox/WebKit mobile at 320px. Overview scrollWidth
is 353px (Firefox), exceeding the viewport. The project-summary panel extends offscreen.

## Diagnosis and change

Ranked hypotheses: intrinsic grid-column minimum; header flex content minimum;
viewport emulation differences. DOM boundary measurements identify the panel's
intrinsic grid minimum. Use minmax(0, 1fr) and let its header wrap on narrow screens.
A follow-up run reproduced Settings appearance overflow at 320px; those controls now wrap too. Keep intentional board scrolling at tablet widths. Recheck all existing routes at
portrait, landscape and desktop widths.

## Checks and handoff

2026-10-22: final `pnpm check` exited 0. Browser matrix: 117 passed, 3 mobile unload-prompt cases intentionally skipped. Independent standards/spec review findings resolved. At that automated checkpoint, human evaluation was pending.

See [evaluation guide](../../../docs/testing/frontend-evaluation.md).

## Comments

2026-10-22: discovered by the approved cross-engine responsive audit.

### Human evaluation closeout — 2026-10-22

Manual checks: Not Evaluated. The user chose to end detailed manual evaluation at this stage; this is neither a failure nor human acceptance.

Source: user's explicit instruction in the implementation chat. All other manual
checks are Not Evaluated; no further manual evaluation is requested now. Existing
automated evidence is unchanged.
