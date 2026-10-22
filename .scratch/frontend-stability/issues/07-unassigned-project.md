# Show unassigned tasks consistently

Status: ready-for-agent
Type: task
Priority: P2
Implementation: complete
Human evaluation: Not Evaluated

## Reproduction

Create a task with an empty project list; inspect its project selector in the drawer. Also edit an existing unassigned task after projects exist.

## Diagnosis and change

Drawer omits the existing No project state; TaskForm uses truthy fallback, silently assigning an unassigned task to the first project.

Preserve an empty project ID with nullish defaults and show No project in relevant selectors.

## Checks and handoff

2026-10-22: final `pnpm check` exited 0. Browser matrix: 117 passed, 3 mobile unload-prompt cases intentionally skipped. Independent standards/spec review findings resolved. At that automated checkpoint, human evaluation was pending.

See [evaluation guide](../../../docs/testing/frontend-evaluation.md) for per-ticket coverage and preflight evidence. Regression tests live in `tests/frontend/`.

## Comments

2026-10-22: scoped under the approved frontend stability specification; no backend integration or library modernization.

### Human evaluation closeout — 2026-10-22

Manual checks: Not Evaluated. The user chose to end detailed manual evaluation at this stage; this is neither a failure nor human acceptance.

Source: user's explicit instruction in the implementation chat. All other manual
checks are Not Evaluated; no further manual evaluation is requested now. Existing
automated evidence is unchanged.
