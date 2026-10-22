# 02: Isolate workspace persistence and recovery

Status: ready-for-agent
Type: task
Implementation: pending
Human evaluation: Pending
Blocked by: 01

## What to build

Users retain safe saved workspaces, recovery downloads, conflict warnings, and unsaved-work protection through a dedicated persistence interface.

## Acceptance criteria

- [ ] Storage reading, locking, comparison, writing, recovery/export, status, and unload protection have clear dedicated ownership.
- [ ] Theme application is separated from storage safety without changing effect behavior.
- [ ] Storage format, raw-data preservation, conflicts, unavailable locks, failures, and export behavior remain identical.
- [ ] Relevant existing regressions and type checking pass, with actual evidence recorded.
- [ ] Ticket code review and reproducible hands-on evaluation guide prepared; human acceptance remains pending.

## Comments

2026-10-22: Approved four-step scope and sequential breakdown carried forward from the implementation chat. Parent: ../spec.md.
