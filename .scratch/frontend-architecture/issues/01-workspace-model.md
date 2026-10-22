# 01: Extract the pure workspace model

Status: ready-for-agent
Type: task
Implementation: complete
Human evaluation: Pending
Blocked by: None (can start immediately)

## What to build

Users can continue task, project, filtering, and overview workflows while domain rules move behind React-independent interfaces.

## Acceptance criteria

- [x] Types, demo fixtures, validation, state transitions, and nonpresentation selectors are owned by pure domain modules.
- [x] UI uses extracted rules without changing dates, IDs, ordering, validation, or cascades.
- [x] No browser or React imports enter the domain; no visual or workflow changes.
- [x] Relevant existing regressions and type checking pass, with actual evidence recorded.
- [x] Ticket code review and reproducible hands-on evaluation guide prepared; human acceptance remains pending.

## Comments

2026-10-22: Approved four-step scope and sequential breakdown carried forward from the implementation chat. Parent: ../spec.md.

2026-10-22: Implemented pure workspace types, fixtures, local-calendar dates,
validation, transitions, and selectors; wired existing App callers. Required Node
24 typecheck passed. Initial full runs recorded browser/network timeouts (126
passed/3 failed/3 skipped on host Node26; 127 passed/2 failed/3 skipped on Node24).
Trace evidence identifies remote Google Fonts waits of about 30 seconds. No
behavior, font, harness or timeout changes made. Original failed cases rechecked
9/9; second-run cases compared against original frontend 12/12 and extracted
frontend 12/12. These targeted passes do not establish a clean full-suite pass;
final integration check remains pending. Focused self-review and independent
root review found no actionable issue. Static JSX audit: 523 intrinsic elements,
zero changed static-attribute/style groups. Reproducible guide and actual evidence:
`docs/testing/frontend-architecture-evaluation.md`, Ticket 01. Human evaluation
remains Pending; final two-axis integration review still required.
