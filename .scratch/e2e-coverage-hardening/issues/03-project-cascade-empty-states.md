# 03: Harden project lifecycle, cascade boundaries, and empty-workspace journeys

**What to build:** Reliable UI evidence that project changes persist, capture starts in the intended context, and project deletion removes only the work it is meant to remove.

**Blocked by:** 01 — Establish the journey audit matrix and execution baseline.

**Status:** ready-for-agent

- [x] Use the audit matrix to preserve useful project tests and strengthen/add missing project-lifecycle, cascade, and empty-state evidence.
- [x] Exercise project creation/editing through the UI and verify resulting project data through normal navigation and reload.
- [x] Verify expected board creation entry points explicitly, including context after navigating between projects and explicit project-choice overrides. Missing required controls must fail, not conditionally omit checks. Account explicitly for legitimate viewport-dependent availability.
- [x] Verify project-deletion cancellation preserves the project and assigned tasks.
- [x] Verify confirmed deletion and intended task cascade through the UI and after reload. Include assigned tasks, another project's tasks, standalone work, and unrelated projects so survivor boundaries are meaningful.
- [x] Preserve useful stored-representation assertions as browser-local guarantees without relying on them as the sole cascade evidence.
- [x] Exercise existing empty-workspace/project/task entry actions through capture into usable list/board views, including task capture without requiring a project. Use controlled empty fixtures for setup; do not add an onboarding/reset feature.
- [x] Coordinate with ticket 02 for shared assignment/default and summary contracts, recording coverage ownership rather than introducing duplicate tests or artificial dependencies.
- [x] Run focused verification and typechecking, update matrix references and evidence, complete required review, and prepare reproducible per-feature evaluation steps with actual preflight evidence and a concrete first action. Use disposable workspaces for deletion evaluation.
- [x] Preserve correct expectations for discovered product defects and explicitly record affected journeys as blocked. Do not modify product code or silently skip/relax coverage to pass.

## Implementation checkpoint

Focused verification and both review axes completed; see `docs/testing/e2e-coverage-hardening-evaluation.md` for commands/results, resolved findings and feature evaluation actions. Unperformed manual evaluations: Not Evaluated. No product defects exposed. Phase reliability is ticket 06.
