# 03: Expose explicit workspace operations

Status: ready-for-agent
Type: task
Implementation: pending
Human evaluation: Pending
Blocked by: 02

## What to build

Users retain task, project, profile, and theme workflows while pages update workspaces through explicit operations.

## Acceptance criteria

- [ ] One hook owns persistent workspace state and exposes named operations instead of a raw setter.
- [ ] Transient shell state, notices, navigation, modal closure, and current reset lifetimes remain intact.
- [ ] Settings cannot replace arbitrary workspace fields; mutations use pure domain transitions.
- [ ] Relevant existing regressions and type checking pass, with actual evidence recorded.
- [ ] Ticket code review and reproducible hands-on evaluation guide prepared; human acceptance remains pending.

## Comments

2026-10-22: Approved four-step scope and sequential breakdown carried forward from the implementation chat. Parent: ../spec.md.
