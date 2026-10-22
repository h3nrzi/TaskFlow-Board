# 03: Expose explicit workspace operations

Status: ready-for-agent
Type: task
Implementation: complete
Human evaluation: Pending
Blocked by: 02

## What to build

Users retain task, project, profile, and theme workflows while pages update workspaces through explicit operations.

## Acceptance criteria

- [x] One hook owns persistent workspace state and exposes named operations instead of a raw setter.
- [x] Transient shell state, notices, navigation, modal closure, and current reset lifetimes remain intact.
- [x] Settings cannot replace arbitrary workspace fields; mutations use pure domain transitions.
- [x] Relevant existing regressions and type checking pass, with actual evidence recorded.
- [x] Ticket code review and reproducible hands-on evaluation guide prepared; human acceptance remains pending.

## Comments

2026-10-22: Approved four-step scope and sequential breakdown carried forward from the implementation chat. Parent: ../spec.md.

2026-10-22: Implemented one workspace hook with explicit task/project/profile/theme
operations; raw persistent setter stays private. Existing transient state and
feedback/navigation remain in place. Typecheck passed. Browser subset: 65 passed,
4 external-font timeout failures, 3 existing skips; focused recheck including
all failed combinations: 12 passed. See [Ticket 03 evaluation evidence and guide](../../../docs/testing/frontend-architecture-evaluation.md#ticket-03--explicit-workspace-operations).
Focused self-review and root hook review found no actionable issue; integration
wiring review/final two-axis review remain integration checkpoints. Human Pending.
