# 04: Extract feature modules and simplify shell composition

Status: ready-for-agent
Type: task
Implementation: complete (final integration checks pending)
Human evaluation: Pending
Blocked by: 03

## What to build

Users retain all routes, overlays, forms, and responsive workflows while features are independently understandable.

## Acceptance criteria

- [x] Feature pages, forms, overlays, and presentation helpers have cohesive boundaries with readable formatting.
- [x] Shell composes routing and coordinates overlays; domain and persistence do not import feature presentation.
- [x] No dependency cycles, duplicate domain rules, changed markup, changed providers, or changed route lifetimes.
- [ ] Final full repository checks and two-axis review complete; findings resolved.
- [x] Relevant existing regressions and type checking pass, with actual evidence recorded.
- [x] Ticket code review and reproducible hands-on evaluation guide prepared; human acceptance remains pending.

## Comments

2026-10-22: Approved four-step scope and sequential breakdown carried forward from the implementation chat. Parent: ../spec.md.

2026-10-22: Mechanically extracted cohesive feature presentation and shell modules;
App retains provider/router composition. Typecheck, executable declaration and
static JSX preservation audits passed; import audit found zero cycles. Scoped
self-review and per-ticket evaluation guide prepared; final integration full
check/two-axis review pending. Existing targeted regressions: 70 passed, 2 external
font timeouts; focused recheck recorded in the linked guide. See [Ticket 04
evaluation evidence and guide](../../../docs/testing/frontend-architecture-evaluation.md#ticket-04--feature-modules-and-shell-composition).
Human evaluation remains Pending.

2026-10-22 resumed verification: pinned Node v24.22.0 `pnpm typecheck` passed;
focused overview/settings and task CRUD regressions across Firefox mobile and
WebKit desktop passed all 4 combinations in 32.7 seconds. Prior `/tmp` evidence
is unavailable and explicitly distinguished from fresh evidence in the guide.
No application/test/font/timing changes were made to address external waits.
Full integration checks and independent two-axis review remain pending;
human evaluation remains Pending.
