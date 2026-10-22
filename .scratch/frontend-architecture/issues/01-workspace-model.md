# 01: Extract the pure workspace model

Status: ready-for-agent
Type: task
Implementation: pending
Human evaluation: Pending
Blocked by: None (can start immediately)

## What to build

Users can continue task, project, filtering, and overview workflows while domain rules move behind React-independent interfaces.

## Acceptance criteria

- [ ] Types, demo fixtures, validation, state transitions, and nonpresentation selectors are owned by pure domain modules.
- [ ] UI uses extracted rules without changing dates, IDs, ordering, validation, or cascades.
- [ ] No browser or React imports enter the domain; no visual or workflow changes.
- [ ] Relevant existing regressions and type checking pass, with actual evidence recorded.
- [ ] Ticket code review and reproducible hands-on evaluation guide prepared; human acceptance remains pending.

## Comments

2026-10-22: Approved four-step scope and sequential breakdown carried forward from the implementation chat. Parent: ../spec.md.
