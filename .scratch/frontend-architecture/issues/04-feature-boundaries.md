# 04: Extract feature modules and simplify shell composition

Status: ready-for-agent
Type: task
Implementation: complete
Automated validation: limited — no clean final full-matrix run
Human evaluation: shared smoke checkpoint Passed; all other manual checks Not Evaluated
Blocked by: 03

## What to build

Users retain all routes, overlays, forms, and responsive workflows while features are independently understandable.

## Acceptance criteria

- [x] Feature pages, forms, overlays, and presentation helpers have cohesive boundaries with readable formatting.
- [x] Shell composes routing and coordinates overlays; domain and persistence do not import feature presentation.
- [x] No dependency cycles, duplicate domain rules, changed markup, changed providers, or changed route lifetimes.
- [x] Final full repository checks and two-axis review complete; findings resolved (execution completed with the documented browser-network limitation).
- [ ] Relevant existing regressions and type checking pass, with actual evidence recorded. Focused regressions and type checking passed; a clean full-matrix pass remains unestablished because of the documented timeout limitations.
- [x] Ticket code review and reproducible hands-on evaluation guide prepared; human outcomes are recorded separately.

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

2026-10-22 integration review: merged exact feature revision
`04dcbed36c374c6c634071a6ef9e2967a9a9d51b` with merge commit
`071c4603d795589b2dce5b05d2fd5c234e61d84f`. Focused review found no actionable
behavior or scope finding. Compared every original component declaration using
TypeScript AST normalization of export modifiers, App/WorkspaceShell naming,
parentheses and JSX formatting whitespace; all 22 declarations matched.
Shell state/hook order, route composition, providers, selected-record fallback,
overlay ordering and focus integration remain intact. Alias import graph across
87 source files has no cycles; domain/persistence changes are absent from this
extraction. Pinned Node v24.22.0 `pnpm typecheck` passed in integration (API and
web). This focused review does not replace final full repository checks or the
independent two-axis review, which remain pending. Human evaluation is Pending.

### Final shared integration checkpoint — 2026-10-22

Implementation is complete; independent Standards/Spec reviews report 0 findings. Web/API type checks and builds, 297-snapshot dependency audit, API test (1), workflow/tooling tests (3), and development board matrix (18) passed. Default and serialized full browser runs each ended with 126 passed, 3 timeout failures, 3 existing skips; failed configurations differed and passed in the alternate run. A clean full-matrix pass remains unestablished, so passing coverage across runs does not close that validation limitation. Full command results, retained trace evidence, running-server first action and per-feature evaluation steps are in [the evaluation guide](../../../docs/testing/frontend-architecture-evaluation.md). Human evaluation remains **Pending**.

### Human evaluation checkpoint — 2026-10-22

The user reported **Passed** for one shared smoke checkpoint: created a task,
confirmed it persisted after reload, and successfully opened its details.
All other manual checks are **Not Evaluated** by explicit user instruction.
This does not establish full-ticket human acceptance or a clean automated
full-matrix pass. Browser and viewport were not supplied. Implementation remains
complete; the documented full-suite timeout limitations and actual automated
results are unchanged. Source: the user's direct report in the implementation
chat. Earlier pending statements in this comment history describe prior
checkpoints and are superseded by this outcome.
