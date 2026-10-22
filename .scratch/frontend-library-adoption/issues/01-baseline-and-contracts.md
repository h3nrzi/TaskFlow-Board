# 01: Establish the baseline and overlay contract coverage

Status: ready-for-agent
Implementation: complete
Human evaluation: smoke checkpoint Passed; all other manual checks Not Evaluated
Blocked by: None

## What to build

Establish recorded regression, bundle, and visual evidence on the unchanged application. Extend existing browser coverage for important uncovered overlay contracts before adoption.

## Acceptance criteria

- [x] Existing full frontend baseline executed before application changes, with revision, runtime, commands, counts and failure evidence recorded.
- [x] Failures classified from evidence; incomplete checks never reported passing.
- [x] Meaningful uncovered focus, dismissal, nesting, cancellation and presentation contracts covered at the approved browser seam.
- [x] Production bundle and reproducible visual/scroll baselines recorded.
- [x] Type checks, focused browser checks and review recorded.
- [x] Reproducible evaluation guidance and first action provided; human acceptance pending.

## Comments

2026-10-23: User approved the two-ticket breakdown and sequential implementation. Parent: ../spec.md. No application behavior changes belong in this ticket.

Original regressions: 129 passed / 3 intentional skips, 3.3m. New characterization: clean 24 passed, 36.0s after documented test-development corrections and one evidenced external-font navigation timeout. Web/API typechecks passed. Review pending. See docs/testing/frontend-library-adoption-evaluation.md for evidence and per-feature guidance. User confirmed review comparison point 6ba23cd057d6517c0009c0f9f9145a94f910bac3. Human acceptance remains Pending.

Follow-up through 59447bd: actual desktop scrolling baseline 3 passed / 3 explicit mobile wheel skips. Standards review: 0 findings. Spec review: initial 2 findings resolved (scroll evidence and pointer-focus guide); follow-up 0 findings. Ticket complete; human acceptance Pending.


### Human smoke-test checkpoint — 2026-10-23

The user directly reported **Passed** for the Phase 3 manual smoke test: the task form opens and closes correctly, focus behaves as expected, and Escape works. Browser, viewport, and exact opening/dismissal methods were not supplied. Do not infer backdrop, nested-layer, full keyboard-cycle, CRUD, persistence, project-form, drawer, confirmation, dark-theme, or touch-scrolling acceptance from this report.

All other unperformed manual checks remain **Not Evaluated**. This is a passed smoke checkpoint, not whole-ticket human acceptance. Implementation is complete; documented automated results, intentional skips, earlier failures, infrastructure timeouts, and limitations remain unchanged. Earlier Pending/Not Evaluated statements describe prior checkpoints and are superseded only for the smoke behaviors explicitly reported here.
