# Phase 3: Adopt Radix Dialog for existing overlays

Status: ready-for-agent
Implementation: complete
Ticket breakdown: approved; published as tickets 01 and 02
Regression baseline: executed; original suite 129 passed / 3 intentional skips
Human evaluation: smoke checkpoint Passed; all other manual checks Not Evaluated

## Problem Statement

TaskFlow maintains browser interaction infrastructure for four overlay types: task forms, project forms, task details, and deletion confirmations. Custom focus trapping, document listeners, layer detection, background isolation, and focus restoration impose ongoing accessibility and maintenance work. Discovery established this maintenance burden, not a current failing overlay workflow. Replacing it is justified only if observable behavior is preserved.

## Solution

Adopt the already-installed Radix Dialog primitives behind a narrow compatibility boundary for those four overlay types. Keep TaskFlow's existing appearance, interactions, component contracts, and data behavior. Existing observable behavior takes priority over library defaults. If supported primitive composition cannot preserve a behavior reliably, stop the affected migration and present the conflict for a user decision rather than changing the experience or widening scope.

## User Stories

1. As a user, I want task creation to retain its fields, defaults, validation, submission, and cancellation behavior.
2. As a user, I want task editing to retain its existing draft and save behavior.
3. As a user, I want project creation and editing to retain their fields, colors, defaults, and submission behavior.
4. As a user, I want task details to retain their layout, controls, and immediate updates.
5. As a keyboard user, I want each overlay to receive the same initial focus as before.
6. As a keyboard user, I want Tab and Shift+Tab to remain contained in the active overlay.
7. As a user, I want inactive overlay layers and background controls to retain their existing interaction restrictions.
8. As a keyboard user, I want Escape to close only the current top overlay.
9. As a user, I want backdrop mouse-down to dismiss overlays according to the current behavior.
10. As a user, I want interaction inside an overlay to retain its existing dismissal behavior.
11. As a keyboard user, I want closing an overlay to restore focus to the original connected opener.
12. As a user editing from task details, I want cancelling the form to reveal the existing drawer without losing task context.
13. As a user deleting from task details, I want cancelling confirmation to retain the drawer and task.
14. As a keyboard user, I want nested edit and confirmation closure to restore focus to the corresponding drawer control.
15. As a user, I want confirmation to start on Keep it and retain its existing cancellation and deletion actions.
16. As an assistive-technology user, I want dialogs and confirmations to retain their roles and accessible names, with appropriate descriptions.
17. As a desktop or mobile user, I want the same overlay dimensions, layering, positioning, animations, scrolling, and responsive presentation.
18. As a user, I want creating, editing, and deleting through overlays to preserve local persistence and reload behavior.
19. As a maintainer, I want existing overlay props, callbacks, test identifiers, and feature boundaries preserved.
20. As a maintainer, I want complex focus and overlay mechanics owned by maintained primitives rather than duplicated document-event machinery.
21. As a maintainer, I want measured production bundle differences rather than assumptions based on installed dependencies.
22. As a maintainer, I want a fresh pre-implementation regression baseline so existing failures are distinguishable from migration regressions.
23. As a reviewer, I want incomplete checks and infrastructure timeouts reported accurately rather than counted as passes.
24. As an evaluator, I want per-ticket reproducible checks and actual preflight evidence, with human acceptance recorded separately.

## Implementation Decisions

- Limit adoption to task form, project form, task drawer, and shared deletion confirmation. Use the already-installed individual Radix Dialog package; no major-version or unrelated dependency upgrades are authorized.
- Keep existing React ownership, overlay selections, form mounting/draft lifetimes, feature callbacks, routes, and persistence responsibilities.
- Compose primitives through the smallest necessary compatibility boundary. Generic styled wrappers must not introduce their default classes, controls, or presentation.
- Preserve outside mouse-down behavior, including relevant event sequencing and inside-to-outside interaction cases, instead of substituting Radix pointer-event defaults without evidence.
- Preserve nested-layer ordering, initial focus, Escape handling, cancellation, connected-opener restoration, background isolation, and visible/scroll behavior. Library defaults for portals, focus, pointer isolation, and scroll locking require compatibility verification.
- Characterization clarified restoration timing: native pointer defaults may move focus after backdrop mouse-down cleanup. Preserve that baseline sequencing; do not impose a stronger backdrop-focus guarantee. Keyboard-opened overlays must restore focus on Escape as before. A full-width mobile drawer has no exposed backdrop.
- Confirmation currently permits backdrop cancellation. Do not directly substitute AlertDialog defaults that prevent outside dismissal. Use supported Dialog composition retaining alertdialog semantics, current cancellation behavior, and initial focus on Keep it.
- Do not maintain competing custom and primitive focus traps on the same migrated overlay. Remove obsolete custom infrastructure only once all callers have migrated and compatibility is verified.
- Keep existing component interfaces, DOM test identifiers, roles, accessible names, and CSS presentation contracts. Any structural adaptation must preserve observable effects.
- Preserve storage keys, accepted saved shapes, serialized content behavior, cross-tab locking/conflict checks, recovery/export behavior, and unload safeguards.
- Permit lockfile and dependency-audit baseline edits only if actually required by this adoption; document their exact reason. No blanket audit regeneration or dependency cleanup.
- A compatibility conflict is a decision checkpoint: record the expected behavior, observed primitive behavior, attempted supported composition, and options; stop affected implementation until the user decides. Do not silently narrow the four-overlay scope or relax preservation requirements.

## Testing Decisions

- Approved primary seam: existing Playwright browser workflows. Assert user-visible behavior and results; do not assert Radix internals, private attributes, portal implementation, or hook structure.
- Before implementation changes to application behavior, run and record the existing full frontend regression baseline on the unchanged application. Record revision, environment/runtime, exact command, browser/viewport projects, result counts, skips, durations, and diagnostic artifacts for failures. Existing historical results are context, not the new baseline.
- Preserve the initial baseline results when rerunning failures. Investigate timeouts with logs/traces and targeted reruns as justified. Distinguish demonstrated pre-existing failures, evidenced infrastructure-related failures, actual behavioral regressions, and unresolved failures. A timeout alone does not establish infrastructure causation.
- Do not call unexecuted, interrupted, incomplete, or failing checks passing. Passing targeted reruns or coverage pooled across runs does not establish a clean full-suite pass.
- Extend the existing seam for meaningful uncovered contracts before migrating: all four overlay types; initial and restored focus; Tab/Shift+Tab containment; top-layer Escape; backdrop mouse-down and inside interactions; nested edit/delete; cancellation preserving data; and accessible roles/names.
- Keep current CRUD, reload, storage safety/recovery, routing, and responsive workflows as regression protection across Chromium, Firefox, and WebKit desktop/mobile projects. Retain intentional skips with reasons.
- Capture reproducible before/after visual and scrolling evidence using equivalent fixtures, viewport, theme, and settled animation state. Check dimensions, styles, layering, animations, and responsive presentation without introducing a new visual-test platform.
- Run focused regressions and type checks during each ticket; run required repository checks and full browser coverage at completion. Diagnose failures without weakening assertions, masking timeouts, or introducing unrelated application changes.
- Compare production JavaScript/CSS raw and gzip sizes and actual loading behavior against the pre-change build. Standalone discovery package probes are estimates, not application deltas. Do not add lazy-loading architecture solely to improve these figures.
- Review completed work against repository standards and this specification; resolve actionable findings within scope.
- Before each ticket handoff, prepare a feature-by-feature evaluation guide in the same chat, record actual preflight evidence, and provide the user's first concrete action. Preserve checkpoints per ticket. Guide readiness and automated results do not establish human acceptance; leave evaluation pending until observations are reported.

## Out of Scope

Zod/schema migration; form, state, drag/drop, toast, date, routing, search, theme, or persistence library migrations; new touch/keyboard drag interactions; new features; backend integration; broad architecture changes; UI redesign; unrelated accessibility repairs; dependency removal, modernization, or upgrades; altered storage contracts; unrelated fixes to baseline or infrastructure failures.

## Further Notes

The user explicitly approved Phase 3 Shared Understanding and the overlay-only batch, then approved the Playwright seam and added mandatory fresh-baseline and truthful-result reporting. Existing observable behavior takes priority over Radix defaults.

Workflow order is mandatory: finalize this specification, propose and obtain separate approval for the ticket breakdown, publish approved tickets, then implement sequentially. The user explicitly approved the two-ticket breakdown and authorized sequential implementation on 2026-10-23. Ticket 02 remains blocked by completion of ticket 01. Human acceptance is separate and remains pending.

Discovery recorded a successful temporary-output production build, a passing 297-snapshot dependency audit, and a clean working tree. Discovery did not rerun the frontend regression suite. The measured discovery application assets were 383,321 bytes JavaScript (119,336 gzip) and 96,167 bytes CSS (17,066 gzip). A standalone Dialog probe excluding React/ReactDOM measured 38,073 bytes (12,948 gzip); it is not an incremental application measurement. Re-establish build evidence at implementation baseline.

Earlier architecture work documented full-suite timeout limitations. Those records inform investigation but do not pre-classify new failures or establish current passing status. Human evaluation for this phase remains Not Evaluated.

## Implementation outcome

Both approved tickets are complete. All four overlays use supported Radix Dialog composition while preserving existing backdrop mouse-down, native scrolling, synchronous restoration timing, focused-layer Escape handling, presentation and component interfaces. Zod and all other migrations remain deferred. Final full repository check passed, including 156 frontend passes / 6 intentional skips; independent Standards and Spec reviews found no remaining actionable implementation issues. Earlier test-development failures, an introduced and fixed Escape regression, and evidenced external-font timeouts remain separately recorded. Production JavaScript increased by 3,095 gzip bytes; CSS is unchanged. Controlled visual checks resolved font-timing capture differences without application changes. Per-ticket evidence and evaluation guidance are in docs/testing/frontend-library-adoption-evaluation.md. Human acceptance remains Pending; no user observations for this phase have been reported.


### Human smoke-test checkpoint — 2026-10-23

The user directly reported **Passed** for the Phase 3 manual smoke test: the task form opens and closes correctly, focus behaves as expected, and Escape works. Browser, viewport, and exact opening/dismissal methods were not supplied. Do not infer backdrop, nested-layer, full keyboard-cycle, CRUD, persistence, project-form, drawer, confirmation, dark-theme, or touch-scrolling acceptance from this report.

All other unperformed manual checks remain **Not Evaluated**. This is a passed smoke checkpoint, not whole-ticket human acceptance. Implementation is complete; documented automated results, intentional skips, earlier failures, infrastructure timeouts, and limitations remain unchanged. Earlier Pending/Not Evaluated statements describe prior checkpoints and are superseded only for the smoke behaviors explicitly reported here.
