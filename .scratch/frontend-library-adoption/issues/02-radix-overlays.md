# 02: Adopt Radix Dialog across all four overlay types

Status: ready-for-agent
Implementation: complete
Human evaluation: Pending
Blocked by: 01

## What to build

Migrate task form, project form, task drawer and confirmation to approved Dialog primitives in small verifiable steps within this ticket, preserving current behavior and visual contracts.

## Acceptance criteria

- [x] All four overlay types use supported primitive composition without competing focus traps.
- [x] Existing component contracts, presentation, initial/restored focus, outside mouse-down, Escape, nested layers and confirmation cancellation preserved.
- [x] Unresolvable compatibility conflicts stop affected work for a user decision (none remain after the supported Escape compatibility fix).
- [x] Obsolete custom focus machinery removed only after callers migrate.
- [x] Local persistence, routes and all deferred areas unchanged.
- [x] Focused per-step regressions, final required checks and actual bundle differences recorded with truthful failure classification.
- [x] Standards and specification reviews completed; actionable findings resolved.
- [x] Per-feature evaluation guide, actual preflight evidence and first concrete action provided; human acceptance remains pending.

## Comments

2026-10-23: User approved this ticket and its dependency on 01. Parent: ../spec.md. Zod and all other migrations remain deferred.

Final pnpm check passed: frontend 156 passed / 6 intentional skips (3.4m), 297-snapshot audit, web/API typechecks/builds, API test 1 passed, tooling tests 3 passed. Standards and Spec reviews: 0 actionable implementation findings. JS +8,185 raw / +3,095 gzip bytes; CSS unchanged. Desktop native scrolling retained. Seven of eight initial Chromium image pairs matched byte-for-byte; the mobile drawer pair and one WebKit geometry variation were investigated with controlled original/migrated settled-font checks, both producing identical geometry and screenshot bytes. Temporary diagnostic test and logging removed; application source matches reviewed implementation. Human acceptance remains Pending. See docs/testing/frontend-library-adoption-evaluation.md and evidence/ for actual results and per-feature guidance.
