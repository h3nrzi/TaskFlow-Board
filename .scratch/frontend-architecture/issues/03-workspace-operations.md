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

2026-10-22: Integration review verified one mounted `useWorkspace` owner and
private setter; Settings receives only profile/theme operations. Existing
validation notices, navigation, modal closure, search/filter ownership and
selected-task fallback remain in their original coordinators. Task/project
identifier and date generation retain updater placement; transition ordering,
theme-before-save effect order and persistence session lifetime are unchanged.
No actionable behavior/scope/dependency finding. Integrated with merge commit
`e2c868794bc6a6fd640a6bb199e066628018c217`; required Node 24.22.0
`pnpm typecheck` passed in the integration checkout. Targeted browser evidence
and remote-font timeout limitations remain as recorded below; Human evaluation
is Pending.

2026-10-22: Approved four-step scope and sequential breakdown carried forward from the implementation chat. Parent: ../spec.md.

2026-10-22: Implemented one workspace hook with explicit task/project/profile/theme
operations; raw persistent setter stays private. Existing transient state and
feedback/navigation remain in place. Typecheck passed. Browser subset: 65 passed,
4 external-font timeout failures, 3 existing skips; focused recheck including
all failed combinations: 12 passed. See [Ticket 03 evaluation evidence and guide](../../../docs/testing/frontend-architecture-evaluation.md#ticket-03--explicit-workspace-operations).
Focused self-review and root hook review found no actionable issue; integration
wiring review/final two-axis review remain integration checkpoints. Human Pending.

### Final shared integration checkpoint — 2026-10-22

Implementation is complete; independent Standards/Spec reviews report 0 findings. Web/API type checks and builds, 297-snapshot dependency audit, API test (1), workflow/tooling tests (3), and development board matrix (18) passed. Default and serialized full browser runs each ended with 126 passed, 3 timeout failures, 3 existing skips; failed configurations differed and passed in the alternate run. A clean full-matrix pass remains unestablished, so passing coverage across runs does not close that validation limitation. Full command results, retained trace evidence, running-server first action and per-feature evaluation steps are in [the evaluation guide](../../../docs/testing/frontend-architecture-evaluation.md). Human evaluation remains **Pending**.
