# 02: Adopt Radix Dialog across all four overlay types

Status: ready-for-agent
Implementation: in progress
Human evaluation: Pending
Blocked by: 01

## What to build

Migrate task form, project form, task drawer and confirmation to approved Dialog primitives in small verifiable steps within this ticket, preserving current behavior and visual contracts.

## Acceptance criteria

- [ ] All four overlay types use supported primitive composition without competing focus traps.
- [ ] Existing component contracts, presentation, initial/restored focus, outside mouse-down, Escape, nested layers and confirmation cancellation preserved.
- [ ] Unresolvable compatibility conflicts stop affected work for a user decision.
- [ ] Obsolete custom focus machinery removed only after callers migrate.
- [ ] Local persistence, routes and all deferred areas unchanged.
- [ ] Focused per-step regressions, final required checks and actual bundle differences recorded with truthful failure classification.
- [ ] Standards and specification reviews completed; actionable findings resolved.
- [ ] Per-feature evaluation guide, actual preflight evidence and first concrete action provided; human acceptance remains pending.

## Comments

2026-10-23: User approved this ticket and its dependency on 01. Parent: ../spec.md. Zod and all other migrations remain deferred.
