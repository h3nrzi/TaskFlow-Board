# 02: Harden task lifecycle and cross-surface consistency

**What to build:** Reliable behavioral coverage that a task retains its content and identity through normal work and appears consistently wherever users view or organize it.

**Blocked by:** 01 — Establish the journey audit matrix and execution baseline.

**Status:** ready-for-agent

- [x] Use the audit matrix to preserve useful tests and strengthen/add only the required missing evidence for task lifecycle and cross-surface consistency.
- [x] Exercise creation and edits through the UI; verify changed fields and unchanged-field preservation, not just title existence. Verify saved fields through the UI after reload, including representative optional values.
- [x] Cover cancelled creation/editing, completion/reopening, deletion cancellation, confirmed deletion, and retention of the resulting state after reload.
- [x] Preserve and assess standalone creation with/without projects, general versus board defaults, explicit choices, both assignment-removal paths, cancellation, reassignment, and identity/content preservation. Coordinate creation-entry coverage with ticket 03 without duplicating assertions unnecessarily.
- [x] Exercise representative multi-step assignment/unassignment/reassignment and status workflows. Assert source-board absence, destination-board presence, Tasks/filter membership, current drawer values, and relevant Dashboard/project summaries as appropriate, including reload.
- [x] Make cross-surface expectations independent of date-only recency ties or starter inventory that is irrelevant to the contract. Use controlled fixtures when needed to ensure a task legitimately appears in a limited Dashboard list.
- [x] Preserve and strengthen existing overdue evidence as needed: past/today/future/undated and status conditions, status/date changes, relevant surfaces, local/UTC boundary, and local-midnight render/reload. Do not require automatic idle-page refresh or redesign recency.
- [x] Keep schema/identity assertions useful to local persistence explicitly classified; they do not replace observable journey assertions.
- [x] Run focused verification and typechecking, update matrix references and evidence, complete required review, and prepare reproducible per-feature evaluation steps with actual preflight evidence and a concrete first action.
- [x] Preserve correct expectations for discovered product defects and explicitly record affected journeys as blocked. Do not modify product code or silently skip/relax coverage to pass.

## Implementation checkpoint

Focused verification and both review axes completed; see `docs/testing/e2e-coverage-hardening-evaluation.md` for commands/results, resolved findings and feature evaluation actions. Human observations pending. No product defects exposed. Phase reliability is ticket 06.
