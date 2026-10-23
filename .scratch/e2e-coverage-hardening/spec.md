# E2E Coverage Audit & Hardening

Status: ready-for-agent

Planning checkpoint: Discovery decisions Q1–Q7, the consolidated Shared Understanding, and the existing Playwright testing seam are explicitly approved. This specification is published for separate user approval. Publication and triage status do not authorize implementation. Specification approval precedes ticket-breakdown approval and publication. Complete planning and prepare a self-contained handoff in this session; implementation must start in a fresh Codex session.

## Problem Statement

TaskFlow's completed browser-local MVP has useful browser regression coverage, but a passing suite does not yet demonstrate complete, meaningful coverage of its actual user journeys. Some tests assert only a small part of the data they change, some rely on stored representation instead of the resulting UI, and some conditionally omit checks when expected controls are absent. Multi-step workflows and agreement between task surfaces need stronger evidence. Timing, layout, and interaction patterns also warrant a reliability audit.

Before NestJS Integration Readiness, maintainers need to know which user-facing contracts are protected, which guarantees belong specifically to browser-local persistence, and where coverage is weak or blocked. They need useful existing coverage preserved and evidence that hardening is reliable, rather than a larger test count or an unnecessary suite rewrite.

## Solution

Audit the existing Playwright suite against the implemented, documented MVP journeys. Maintain a traceable journey-to-test matrix and use it to preserve, strengthen, add, or explicitly defer coverage according to behavioral risk. Improve tests and proportionate supporting test infrastructure without changing product behavior or application architecture. Establish fresh baseline and final reliability evidence, identify genuine product-defect blockers without weakening correct expectations, and prepare reproducible evaluation guidance.

This is a dedicated phase before NestJS Integration Readiness. Portable behavioral expectations should survive a future persistence replacement; no backend integration or future backend fixture mechanism is designed or implemented here.

## User Stories

1. As a maintainer, I want every existing MVP journey mapped to test evidence, so that I can distinguish protected behavior from assumptions.
2. As a maintainer, I want each gap ranked by behavioral risk, so that lost work and incorrect task/project state receive attention first.
3. As a maintainer, I want existing useful tests preserved, so that hardening does not discard established safeguards.
4. As a maintainer, I want missing controls to fail required checks, so that conditional execution cannot silently remove coverage.
5. As a TaskFlow user, I want task creation checked through the UI, so that saving captures the values I entered.
6. As a TaskFlow user, I want edits to retain unchanged fields, so that updating one value does not lose other task content.
7. As a TaskFlow user, I want saved task fields verified after reload, so that persistence evidence covers more than a surviving title.
8. As a TaskFlow user, I want completion and reopening checked across relevant views, so that status remains consistent throughout my workspace.
9. As a TaskFlow user, I want cancelled task forms and deletion confirmations to preserve existing state, so that abandoning an action does not change my work.
10. As a TaskFlow user, I want confirmed task deletion to remain effective after reload, so that removed work does not reappear.
11. As a TaskFlow user, I want standalone creation checked with and without projects, so that project setup is optional.
12. As a TaskFlow user, I want general and project-board creation defaults preserved, so that capture starts in the expected context.
13. As a TaskFlow user, I want explicit assignment choices to override defaults, so that creation follows my intent.
14. As a TaskFlow user, I want assignment and unassignment to preserve task identity and other fields, so that reorganizing work does not recreate or damage it.
15. As a TaskFlow user, I want reassignment checked on source and destination boards and in filters, so that each view reflects where my task belongs.
16. As a TaskFlow user, I want project creation and editing verified through normal navigation and reload, so that project changes remain usable and saved.
17. As a TaskFlow user, I want project-deletion cancellation checked, so that backing out preserves the project and its tasks.
18. As a TaskFlow user, I want confirmed project deletion to remove only its assigned tasks, so that unrelated and standalone work survives.
19. As a TaskFlow user, I want Dashboard metrics and project counts/progress checked after task changes, so that summaries agree with my work.
20. As a TaskFlow user, I want Tasks, boards, Dashboard, and the drawer to agree during representative multi-step workflows, so that navigation does not expose contradictory state.
21. As a TaskFlow user, I want search assertions to identify the matching work, so that a correct row count cannot hide incorrect results.
22. As a TaskFlow user, I want representative combined search, status, priority, and project filters checked, so that narrowing work remains reliable.
23. As a TaskFlow user, I want All projects and No project membership checked, so that assigned and standalone work remain discoverable.
24. As a TaskFlow user, I want supported sorting checked across meaningful ordered results and relevant edge cases, so that a correct first item cannot hide a broken order.
25. As a TaskFlow user, I want empty-result and empty-workspace actions checked, so that I can recover from no matches and begin capturing work without existing data.
26. As a TaskFlow user, I want overdue conditions and changes protected across existing task surfaces, so that due-date and status changes produce consistent indicators.
27. As a TaskFlow user, I want local-calendar boundaries checked with controlled dates, so that UTC differences do not change the meaning of my deadline.
28. As a TaskFlow user, I want profile, personalized welcome, and appearance changes checked after saving and reload, so that my preferences remain visible.
29. As a TaskFlow user, I want existing demo login/signup submission and validation behavior checked, so that the local profile workflow remains usable without implying real authentication.
30. As a TaskFlow user, I want navigation and documented search/filter state lifetimes checked, so that moving between pages preserves and resets the intended state.
31. As a TaskFlow user, I want unknown-route and missing-project recovery actions checked, so that I can return to usable work without losing it.
32. As a keyboard user, I want meaningful focus, cancellation, and nested-overlay behavior preserved, so that forms and drawers remain operable.
33. As a mobile-viewport user, I want navigation, forms, and relevant task presentation checked, so that narrow layouts remain usable.
34. As a maintainer, I want reload retention distinguished from exact storage-format assertions, so that future persistence replacement does not erase behavioral contracts.
35. As a maintainer, I want browser-local validation, recovery, export, storage-failure, locking, and cross-tab safeguards retained and identified, so that current local saving remains protected.
36. As a maintainer, I want fixture setup dependencies distinguished from assertion coupling, so that controlled setup is not mistaken for a storage-specific behavioral contract.
37. As a maintainer, I want suspected flakes distinguished from reproduced failures, so that reliability claims are supported by execution evidence.
38. As a maintainer, I want product defects exposed by correct expectations reported as explicit blockers, so that the suite is not made green by weakening or silently skipping those expectations.
39. As a maintainer, I want baseline, repeated-run, review, and final-check evidence recorded, so that completion can be assessed against a known revision and environment.
40. As an evaluator, I want reproducible per-ticket guidance and a concrete first action, so that I can report observations without automated passes being mistaken for human acceptance.

## Implementation Decisions

- Keep scope within test quality, coverage, reliability, and supporting documentation for the existing single-person, browser-local MVP. Demo authentication and free-text assignees retain their existing local semantics.
- Audit all existing MVP journeys using implemented behavior and established documentation. Do not turn unfinished controls, potential enhancements, or incidental implementation details into new product requirements.
- Prioritize lost work, incorrect task/project state, and broken multi-step workflows, followed by navigation, accessibility, and presentation regressions. Select representative combinations by risk rather than attempting every permutation.
- Maintain a journey-to-test matrix containing behavioral contract, existing evidence, gap/risk, priority, proposed disposition, classification, and verification or blocker. Dispositions are preserve, strengthen, add, or defer with a reason. Required coverage cannot be silently deferred merely to finish the phase.
- Distinguish user-facing E2E contracts, browser-local storage safeguards, and fixture setup dependencies. Record mixed cases explicitly; classification alone does not require moving or rewriting an otherwise useful test.
- Preserve useful assertions and existing tests wherever practical. Strengthen current tests before adding overlapping ones. Restructure a long test only where justified by clearer behavioral coverage, failure isolation, or reliability.
- Permit proportionate changes to shared test helpers, fixtures, locators, synchronization, test boundaries, and configuration when tied to specific findings. Add no application instrumentation, testing framework, speculative backend fixture abstraction, or broad test rewrite.
- Judge coupling by unnecessary reliance on implementation details. Test IDs are not inherently excessive coupling. Starter inventory, CSS structure, stored keys/schema, exact bytes, and precise interaction details require explicit assessment against the contract they protect.
- Preserve intentional local-storage schema and identity guarantees where useful, separately identified from portable UI expectations. Do not remove them solely because future persistence will differ.
- Preserve established behavior and limitations: date-only recency does not order same-day edits precisely; overdue classification follows the local calendar and refreshes on relevant render/reload rather than requiring an idle-page timer; desktop/mobile configurations do not certify physical-device behavior.
- If a correct regression expectation reveals a product defect, preserve it, document the defect separately, and explicitly mark the affected journey blocked. Do not encode the defect as expected behavior, weaken assertions, silently skip coverage, or fix product code in this phase.
- No application prefactoring, schema change, new dependency, or backend work is justified by the approved scope.

## Testing Decisions

- Use one primary seam: the existing browser-level frontend Playwright suite. Test externally observable behavior through UI actions and assertions rather than hook calls, component internals, or snapshots that mirror implementation.
- Controlled workspace fixtures may establish starting conditions. Actions under test go through the UI; creation and persistence journeys explicitly exercise those actions. Controlled dates should make calendar expectations deterministic.
- User-facing persistence means saved work and fields reappear correctly through the UI after reload. Browser-local tests may inspect stored data or inject failures for schema, identity, validation, exact export, write safety, recovery, and related implementation-specific guarantees.
- Cover task lifecycle and field preservation; standalone/default/explicit assignment; reassignment and cross-surface consistency; project lifecycle/cascade/survivors; Dashboard and project summaries; search/filter/sort; empty states; overdue; profile/theme/demo forms; navigation/recovery; and keyboard/mobile access. Reuse existing meaningful coverage for each area.
- Strengthen assertions to verify changed fields, expected identities and memberships, absence from incorrect surfaces, meaningful ordering, and unaffected survivors where relevant. Avoid replacing these with counts or storage checks alone.
- Existing prior art includes task/project CRUD and reload workflows, combined filters and responsive navigation, standalone assignment and preservation scenarios, controlled overdue dates, welcome/recovery flows, nested-overlay keyboard behavior, and storage fault/conflict/recovery tests.
- Retain Chromium, Firefox, and WebKit across desktop and mobile configurations, with the existing local timezone and production build/preview default. Preserve the existing cosmetic-font network isolation and meaningful intentional skip reasons. Do not claim physical-device certification.
- Inspect and address justified reliability risks such as conditional checks, immediate layout predicates, short timeout assumptions, swallowed navigation failures, drag/geometry interactions, and overlong workflows. Static suspicion is not proof of a current flake; record execution evidence and causal findings.
- In the fresh implementation session, record a pre-edit baseline at the existing normal concurrency with zero retries. Record revision, environment, commands, results, failures, and skips. Run browser invocations sequentially to avoid shared artifact collisions.
- During hardening, run focused files and typechecking regularly. Use test-first reproduction where practical at the approved browser seam; do not introduce product changes to make a new expectation pass.
- After hardening, require three consecutive passing full frontend runs at normal concurrency and zero retries on the same final application/test/configuration revision and equivalent environment. One run is supplied by the final full repository check; use two additional full frontend runs. A failure interrupts the consecutive sequence. Material test/configuration changes require establishing the sequence again.
- Investigate intermittent failures. A passing failed-test rerun or a serial-worker rerun may help diagnosis but does not substitute for the required reliability evidence. Existing justified skips must remain explicit and must not conceal new gaps.
- Run the full repository check at final integration; its existing API/tooling checks are regression checks, not permission for backend integration. A failure or subsequent fix may justify additional runs.
- A blocked correct expectation prevents a clean passing completion claim until resolved. Record the actual failed expectation and its product-defect blocker without presenting the phase as green or weakening the expectation to satisfy the run criterion.
- Review each ticket using the established code-review workflow, resolve actionable findings within scope, and rerun checks justified by changes. Handle product findings through the agreed blocker policy.
- After required checks and review, prepare a reproducible feature-by-feature evaluation guide per ticket in the same implementation chat. Record actual preflight evidence, expected outcomes, and the user's first concrete action. Preserve coverage and checkpoints across tickets. Human evaluation remains pending until observations are reported; it is not an additional implementation approval gate.

## Out of Scope

- Product features or product-defect fixes, including changes discovered while writing correct regression expectations.
- Application architecture changes, refactoring, schema or timestamp migrations, persistence replacement, or application test instrumentation.
- NestJS Integration Readiness work, backend integration, real authentication/authorization, collaboration, remote persistence, and speculative backend test abstractions.
- New testing frameworks, dependencies, wholesale rewrites, arbitrary test-count targets, or exhaustive combination testing without risk justification.
- Changes to documented date-only recency, idle-page midnight refresh behavior, existing cascade semantics, or other preserved product contracts.
- Claims of physical-device certification, complete human acceptance, confirmed flakiness from inspection alone, or backend readiness based on audit completion.

## Further Notes

- All discovery decisions Q1–Q7 and the consolidated Shared Understanding are explicitly approved. The user separately approved the proposed Playwright seam. No discovery or seam approval needs repeating unless new evidence requires a scope change.
- This published specification awaits explicit approval. Only then present the ticket breakdown for approval of granularity and genuine blocking edges. Publish one file per approved ticket and prepare a self-contained handoff in this session. Leave the implementation skill and all application/test changes to a fresh Codex session.
- Planning inspection checkpoint: 2026-10-23, branch main, revision 61c872d9ddf195caaede740847d58738cef1049a. The checkout was clean before this specification was created. Reinspect runtime and checkout state in the fresh session; this snapshot authorizes no reset or overwrite.
- Actual discovery evidence is static inspection of repository guidance, architecture/evaluation documentation, application behavior in source, existing tests, and configuration. No fresh test, build, typecheck, browser evaluation, or reliability run has occurred during this planning session.
- Concrete inspected weaknesses include partial post-reload task-field assertions, cascade checks relying on stored representation without UI survivor verification, conditional board-entry checks, shallow search/sort assertions, and incomplete demo-profile and missing-project recovery checks. Cross-surface reassignment, summary updates, and empty-workspace paths also need coverage assessment.
- Potential timing, drag, geometry, and immediate-layout risks remain hypotheses until exercised. Historical intermittent timeouts must not be reported as current reproduced flakes. Prior evaluation records a final full repository pass with 222 frontend passes and six intentional skips after font-request isolation; that historical checkpoint is not this phase's baseline or reliability proof.
- The audit matrix and defect records should distinguish static evidence, executed evidence, planned checks, explicit deferrals, and blockers. A completed audit document alone does not establish a completed hardening phase or authorize NestJS integration.
- The phase's durable matrix, ticket-specific evaluation evidence, and final handoff will be planned after specification approval. Do not publish implementation tickets or claim planning complete at this specification checkpoint.
