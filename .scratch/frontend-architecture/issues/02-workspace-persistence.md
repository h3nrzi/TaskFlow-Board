# 02: Isolate workspace persistence and recovery

Status: ready-for-agent
Type: task
Implementation: complete
Human evaluation: Pending
Blocked by: 01

## What to build

Users retain safe saved workspaces, recovery downloads, conflict warnings, and unsaved-work protection through a dedicated persistence interface.

## Acceptance criteria

- [x] Storage reading, locking, comparison, writing, recovery/export, status, and unload protection have clear dedicated ownership.
- [x] Theme application is separated from storage safety without changing effect behavior.
- [x] Storage format, raw-data preservation, conflicts, unavailable locks, failures, and export behavior remain identical.
- [x] Relevant existing regressions and type checking pass, with actual evidence recorded.
- [x] Ticket code review and reproducible hands-on evaluation guide prepared; human acceptance remains pending.

## Comments

2026-10-22: Integration review compared read/recovery/export and both persistence
effects against their previous App bodies. Storage key/schema/default theme,
saved-raw comparison inside the cross-tab lock, latest-state ref semantics,
cancelled status updates, write-error behavior and unload guard are preserved.
Theme application remains before persistence at the same mounted lifetime and
dependency cadence. Domain modules do not import this browser/React boundary;
no cycle or unrelated behavior change found. Integrated in merge commit
`dc61de7e3e1168ed675e2508a7c592940200b829`; required Node 24.22.0
`pnpm typecheck` passed in the integration checkout. Implementer storage/theme
matrix evidence is 45 passed / 3 existing skips / 0 failed. Human evaluation
remains Pending.

2026-10-22: Approved four-step scope and sequential breakdown carried forward from the implementation chat. Parent: ../spec.md.

2026-10-22: Extracted browser storage reading/recovery/export and a dedicated
React persistence hook owning locking, compare/write, save status and unload
protection. Theme remains a separate presentation effect with the original
lifetime. Existing store ownership remains in App for Ticket 03; no raw setter
is exposed by the persistence interface. Required Node24 frozen install and
final typechecks passed. Existing relevant six-project browser matrix:45 passed,
3 existing mobile unload skips,0 failed. An initial missing dialog useRef import
was caught by typecheck and restored before browser validation. Focused
self-review found no actionable issue; static JSX audit523 intrinsic elements,
zero static attribute/style changes; diff --check passed. Exact preflight,
reproduction command and feature-by-feature evaluation guide are in
`docs/testing/frontend-architecture-evaluation.md`, Ticket02. Human evaluation
remains Pending; final integration check and two-axis review remain required.
