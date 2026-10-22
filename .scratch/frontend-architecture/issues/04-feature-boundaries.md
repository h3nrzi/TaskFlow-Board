# 04: Extract feature modules and simplify shell composition

Status: ready-for-agent
Type: task
Implementation: pending
Human evaluation: Pending
Blocked by: 03

## What to build

Users retain all routes, overlays, forms, and responsive workflows while features are independently understandable.

## Acceptance criteria

- [ ] Feature pages, forms, overlays, and presentation helpers have cohesive boundaries with readable formatting.
- [ ] Shell composes routing and coordinates overlays; domain and persistence do not import feature presentation.
- [ ] No dependency cycles, duplicate domain rules, changed markup, changed providers, or changed route lifetimes.
- [ ] Final full repository checks and two-axis review complete; findings resolved.
- [ ] Relevant existing regressions and type checking pass, with actual evidence recorded.
- [ ] Ticket code review and reproducible hands-on evaluation guide prepared; human acceptance remains pending.

## Comments

2026-10-22: Approved four-step scope and sequential breakdown carried forward from the implementation chat. Parent: ../spec.md.
