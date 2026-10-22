# Frontend architecture refactoring

Status: ready-for-agent
Implementation: complete
Automated validation: limited — final full browser runs contain external-network timeouts
Human evaluation: Pending

## Problem Statement

TaskFlow's frontend concentrates domain rules, persistence, state ownership, routing, pages, forms, and overlays in one compressed component. This makes changes difficult to understand, isolate, and verify, and gives Settings unrestricted access to workspace state.

## Solution

Refactor the existing frontend incrementally around its current responsibilities. Keep every existing workflow, visual design, local data behavior, and external contract intact while making ownership and dependencies explicit.

## User Stories

1. As a maintainer, I want workspace types and rules independent of React and browser APIs so that domain changes can be understood in isolation.
2. As a maintainer, I want task and project transitions expressed explicitly so that UI handlers do not duplicate domain updates.
3. As a maintainer, I want selectors separated from presentation so that calculations have clear ownership.
4. As a maintainer, I want persistence and recovery behind a dedicated interface so that safety rules are localized.
5. As a maintainer, I want one persistent workspace owner so that updates follow a predictable path.
6. As a maintainer, I want pages to receive explicit operations so that they cannot replace unrelated workspace fields.
7. As a maintainer, I want feature pages, forms, and overlays separated from shell composition so that each module has a clear responsibility.
8. As a user, I want task creation, editing, completion, assignment, filtering, sorting, and deletion to behave identically.
9. As a user, I want project creation, editing, board interactions, and cascading deletion to behave identically.
10. As a user, I want overview, profile, theme, demo authentication, and navigation to retain their current behavior.
11. As a user, I want existing saved workspaces and exports to remain compatible.
12. As a user, I want invalid saved data preserved and recoverable without overwriting it.
13. As a user, I want read/write failures, unavailable locks, stale tabs, and unsaved-work protection to retain their existing behavior.
14. As a user, I want keyboard focus, nested overlays, cancellation, and form resets to remain unchanged.
15. As a user, I want desktop and mobile layouts and accessible controls to remain unchanged.
16. As a maintainer, I want each refactoring step protected by existing regression tests and independently reviewable.
17. As an evaluator, I want reproducible feature checks and actual preflight evidence so that I can report observations without automated passes being treated as human acceptance.

## Implementation Decisions

- Four sequential, independently verifiable tickets: pure workspace model; persistence boundary; explicit workspace operations and state ownership; feature and shell extraction.
- Domain modules own types, fixtures, validation, transitions, and selectors without importing React, browser APIs, or presentation modules. Supply dates/identifiers to pure transitions while preserving existing generation semantics and fixture timing.
- Persistence owns storage reading, validation integration, lock/comparison/write protocol, recovery/export, save status, and unload protection. React integration remains dedicated; theme application is a presentation effect.
- Keep existing React state mechanisms, one persistent state owner, and explicit operations. No new global store or context layer without a concrete need.
- UI coordinators retain notices, navigation, and modal closure; transitions do not perform those side effects.
- Preserve search/filter ownership, route mount/reset lifetimes, selected-record fallback behavior, overlay order, and focus hook integration.
- Dependencies flow from shell/features to workspace APIs and domain; domain never imports UI. Avoid cycles and unnecessary barrel indirection.
- Preserve the storage key and schema, enum values, optional and unassigned fields, local-calendar dates, ordering, identifier construction, normalization, export filename, and safety behavior.
- Preserve rendered markup, classes, styles, labels, test IDs, routes, providers, dependencies, and CSS. No schema migrations.
- Existing approved scope and ticket granularity are authoritative; the sequential dependencies reflect each extraction's reliance on the preceding boundary.

## Testing Decisions

- Approved primary seam: the existing browser regression suite, observing workflows through public UI and browser storage/recovery contracts. This covers integrated behavior; it does not alone prove module boundaries.
- Establish a full repository-check baseline before edits; record actual results and unrelated failures separately.
- Run relevant existing browser regressions and type checking after each ticket. Run the full repository check at completion, covering the six browser/viewport projects.
- Keep existing scenarios intact. Add focused regression coverage only for important uncovered contracts exposed by extraction; use the same approved seam and existing harness.
- Do not introduce a new test framework, tests tied to internal file structure, or redundant tests that mirror implementation.
- Review the entire integration diff against both repository standards and this spec. Inspect module dependency direction and cycles.
- Prepare per-ticket reproducible evaluation coverage and actual preflight evidence before handoff. Human evaluation remains Pending until observations are reported.

## Out of Scope

Bug fixes, library modernization or removal, new features, UI redesign, backend integration, routing redesign, storage migrations, speculative abstractions, broad unrelated cleanup, and changes to existing behavior even where it appears imperfect.

## Further Notes

Approved in this chat: Q1–Q7, including evidence-driven boundaries, small green steps, bounded completion, four responsibilities, existing state mechanisms, and regression protection. Baseline commit: 4cca4b6a61a1e8c74efc85a72c174cadb7e35c08. Integration branch: codex/frontend-architecture. No frontend glossary or ADRs existed during investigation. The implementation workflow uses isolated implementer worktrees and integration merges. Automated completion and guide readiness do not constitute human acceptance.

## Implementation outcome

All four scoped extractions are integrated. Independent Standards/Spec reviews found no actionable issue. Type checks, builds, dependency audit, API/tooling tests and all 18 development-mode board checks passed. Neither final full browser run was clean: both recorded 126 passed, 3 timeouts and 3 existing skips, with different failures and stalled external font requests. Every runnable configuration passed in at least one run; that is not a clean full-suite pass. See the durable final checkpoint in `docs/testing/frontend-architecture-evaluation.md`. Human evaluation remains Pending.
