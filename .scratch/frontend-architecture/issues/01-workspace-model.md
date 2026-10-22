# 01: Extract the pure workspace model

Status: ready-for-agent
Type: task
Implementation: complete
Human evaluation: shared smoke checkpoint Passed; all other manual checks Not Evaluated
Blocked by: None (can start immediately)

## What to build

Users can continue task, project, filtering, and overview workflows while domain rules move behind React-independent interfaces.

## Acceptance criteria

- [x] Types, demo fixtures, validation, state transitions, and nonpresentation selectors are owned by pure domain modules.
- [x] UI uses extracted rules without changing dates, IDs, ordering, validation, or cascades.
- [x] No browser or React imports enter the domain; no visual or workflow changes.
- [x] Relevant existing regressions and type checking pass, with actual evidence recorded.
- [x] Ticket code review and reproducible hands-on evaluation guide prepared; human outcomes are recorded separately.

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

2026-10-22: Integration review compared the App extraction and each domain
module against the approved scope. Validation predicates, optional field
acceptance, transition spread order, ID/date generation placement, fixture
evaluation timing, task sorting and project deletion cascade retain their
existing behavior. Domain imports point only to sibling workspace modules;
no React/browser/presentation dependency or cycle was introduced. No actionable
finding. Integrated with merge commit
`b492710000613bb447909eadfc4ef3992e1ae1c4`; required Node 24.22.0
`pnpm typecheck` passed in the integration checkout. Browser evidence above is
targeted and does not claim a clean broad rerun. Human evaluation stays Pending.

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
