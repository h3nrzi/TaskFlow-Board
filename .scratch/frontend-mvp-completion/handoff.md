# Phase 4 implementation handoff

## Start here

Planning is complete. Implementation has not started. In a **fresh Codex session**, invoke the repository's implement skill with this handoff and ticket 01. Read the approved [specification](spec.md), then the relevant ticket in full and state its title before starting. Execute **01 → 02 → 03 → 04 sequentially**, including tests, review, commits, and per-ticket evaluation handoffs. No additional scope interview or repeat seam approval is needed unless new evidence requires a scope change.

Repository: `/Users/hossein/Downloads/TaskFlow-Board`.

Planning snapshot, 2026-10-23: branch `main`, HEAD `ff457ed3a8b7d3c72f92ab54e34e2a7f49a7a590`. Reinspect the checkout and user changes at startup; this is a snapshot, not permission to reset or overwrite. Planning files were published as local Markdown and were uncommitted at handoff. Preserve them and include them in version control during the next authorized commit so they accompany implementation.

## Approvals and authority

- Q1–Q9 discovery decisions: settled, including the user's explicit inclusion of a minimal Overdue badge.
- Consolidated Shared Understanding: explicitly approved exactly as presented.
- Testing seam and coverage: explicitly approved separately.
- Published specification: explicitly approved before ticket breakdown.
- Four-ticket breakdown, granularity, and absence of technical blockers: explicitly approved before publication.
- This session: planning artifacts only; no application edits, tests, implementation, or implementation-skill execution.
- Fresh session: implement the approved tickets sequentially using `.agents/skills/implement/SKILL.md`, TDD where practical at the approved seam, and `.agents/skills/code-review/SKILL.md`.

The spec's original publication-time checkpoint text records its then-pending approval; this handoff records the subsequent approvals. The parent specification was not edited during ticket publication. `ready-for-agent` is a triage label, not evidence of implementation or human acceptance.

## Approved tickets

| Order | Ticket | Technical blockers | Deliverable |
| --- | --- | --- | --- |
| 01 | [Complete standalone-task workflows](issues/01-standalone-tasks.md) | None | Explicit No project creation/editing/drawer/filter choices, reversible assignment, persistence, preserved defaults. |
| 02 | [Show minimal Overdue badges](issues/02-overdue-badges.md) | None | Derived local-date indicator across four existing task surfaces. |
| 03 | [Use a time-neutral Dashboard welcome](issues/03-dashboard-welcome.md) | None | Personalized welcome without a fixed time of day. |
| 04 | [Provide user-facing 404 recovery](issues/04-not-found-recovery.md) | None | Friendly unknown-page explanation and Dashboard link. |

All tickets are `ready-for-agent` with unchecked acceptance criteria. Sequential order is a user workflow requirement, not a fabricated dependency. No prefactoring ticket is needed.

## Scope and acceptance reference

**Standalone tasks:** Preserve `projectId: ''`. Always permit No project in creation, editing, and the drawer. General creation keeps its first-project default (or No project with none); board creation keeps the active-project default. Explicit choice wins. Unassignment preserves identity and all content fields, with only existing update metadata additionally changing. Assignment/unassignment, cancellation, reload, combined filtering/search/sorting, and empty results must work. All projects remains inclusive. Project deletion still cascades to its assigned tasks after confirmation; it does not become an unassignment operation.

**Overdue:** Present due date strictly before the browser's local today AND status other than done. Both todo and in-progress qualify. Today/future/absent dates and done do not. Show text Overdue in Tasks rows, board cards, Dashboard Recently touched rows, and drawer. Complete/reopen/date edits update it; it is derived rather than stored. The creation/edit form and Coming up membership remain unchanged. On relevant render/reload after local midnight, use the new date. No timer or polling; an idle page can remain stale until render/reload.

**Copy/recovery:** Keep name personalization with time-neutral welcome text. The unknown-route page explains the problem to users and links clearly to Dashboard using existing routing conventions. Preserve local workspace data, configured base handling, and the distinct missing-project fallback. Exact friendly wording and in-surface badge/link placement are implementation choices within existing styling/accessibility conventions.

**Preserve:** Architecture and dependency direction, routes and state lifetimes, existing workflows and regression assertions, visual conventions, light/dark themes, keyboard/focus/layer behavior, storage key `taskflow-store-v1`, validated workspace/date-only contracts, locking/conflict protection, recovery downloads, and unsaved-work safeguards. No broad refactoring, library adoption, migrations, or backend integration.

**Deferred:** Precise same-day recency; overdue filter/section/reminders/automatic refresh; undefined Tasks nav badge; comments/subtasks/tags/recurrence/bulk actions/calendar/custom statuses/extra dragging/import and other unapproved enhancements. Real auth/account isolation, teams/permissions/user relationships, cloud sync/collaboration, server notifications, audit history, and remote attachments await backend work. Local demo auth and free-text assignees remain intentional.

## Repository map and discovery evidence

Paths below are relative to the repository root and are navigation hints; recheck source before editing. No original MVP specification, root glossary, or ADR directory was found during discovery. Read `AGENTS.md` and `docs/agents/domain.md` first; read any glossary/ADRs added since this snapshot. Tracker/status rules: `docs/agents/issue-tracker.md`, `docs/agents/triage-labels.md`. Architecture: `docs/architecture/frontend.md`.

| Work | Relevant files and inspected evidence |
| --- | --- |
| Assignment controls/defaults | `apps/web/src/features/tasks/task-form.tsx`: defaults use existing task, board default, first project, then empty string; No project options are conditional. `task-drawer.tsx` in the same directory exposes No project only for an already-unassigned task. |
| Task filtering | `apps/web/src/features/tasks/tasks-page.tsx`: no No project filter choice. `apps/web/src/workspace/selectors.ts`: existing equality filter already accepts empty-string project IDs and separates All projects. |
| Badge surfaces | `apps/web/src/features/tasks/presentation.tsx` shared TaskListRow; `apps/web/src/features/projects/project-board.tsx`; `apps/web/src/features/tasks/task-drawer.tsx`; `apps/web/src/features/overview/dashboard.tsx` reuses TaskListRow for Recently touched. |
| Dates and recency | `apps/web/src/workspace/dates.ts`: local calendar helper. `use-workspace.ts`: date-only update metadata. `selectors.ts`: date-only recent ordering, five recent tasks, upcoming excludes past dates. `validation.ts`, `types.ts`: persistence constraints. |
| Welcome/recovery | `apps/web/src/features/overview/dashboard.tsx`: fixed Good morning. `apps/web/src/pages/not-found.tsx`: developer-oriented text without recovery. `apps/web/src/App.tsx`: route fallback/base configuration. `apps/web/src/app/workspace-shell.tsx`: shell routes and separate missing-project handling. |
| Operations/persistence | `apps/web/src/workspace/transitions.ts`, `use-workspace.ts`, `browser-storage.ts`, `use-workspace-persistence.ts`; do not bypass existing operations or alter safety protocols. |
| UI conventions | `apps/web/src/components/workspace/overlay-dialog.tsx`, `confirm-dialog.tsx`, `date-format.ts`, existing badge classes and `apps/web/src/index.css`. |

Existing implementation and tests cover task/project CRUD, completion/reopening, board status changes, search/filter/sort, Dashboard entry points, settings/theme, demo auth, navigation, storage recovery/conflicts, and overlay keyboard behavior. This is inspection evidence, not a fresh behavioral pass. Gaps in approved scope are assignment choices/filtering, overdue indication, greeting copy, and 404 recovery.

## Required testing and review workflow

One approved seam: **browser-level frontend Playwright workflows**. No new component-testing framework or production test interfaces. Use UI interactions and controlled fixtures/dates; inspect persisted data only for storage/identity/field-preservation contracts. Do not test hook internals or duplicate implementation logic in assertions.

Prior art:

- `tests/frontend/workflows.spec.ts`: task CRUD/reload, project cascade, combined search/filter/sort, Dashboard/settings/routes, responsive layouts.
- `tests/frontend/stability.spec.ts`: board-context defaults/explicit choices, preservation of unassigned tasks, local-midnight dates, storage safety, nested editing and keyboard focus.
- `tests/frontend/overlays.spec.ts`: focus containment/restoration, backdrop cancellation, nested overlays and scrolling.
- `playwright.config.ts`: six projects (Chromium/Firefox/WebKit × desktop/mobile), Asia/Tehran timezone, production build/preview default. Use a date case where local and UTC dates differ; UTC-only checks are insufficient.

Commands from repository root (declared Node `24.22.0`, pnpm `10.11.0`; verify installed runtime first):

```sh
pnpm typecheck
pnpm exec playwright test tests/frontend/workflows.spec.ts
pnpm exec playwright test tests/frontend/stability.spec.ts
pnpm exec playwright test tests/frontend/overlays.spec.ts
pnpm check
```

Run relevant individual files/focused cases during each ticket, not all commands after every small change. Use TDD at the approved seam where practical, one behavior at a time. Run typechecking regularly. At final integration run `pnpm check` once; it includes the full frontend suite, dependency audit, typechecks, builds, API test, and tooling/workflow tests. A failure or subsequent fix can justify additional runs. API checks are existing regressions, not backend feature work. Never claim planned commands as executed evidence.

Use the code-review skill for Standards and Spec axes per ticket, following its fixed-point checkpoint and parallel review instructions. At each ticket start, record a candidate pre-ticket HEAD; confirm the comparison point required by that skill before review rather than assuming planning approval selected a review base. Record findings, fixes, and verification. Commit completed work to the current branch as required by implement; do not push/merge as part of this handoff.

If library-specific syntax or APIs need verification, follow AGENTS.md's Context7 instructions. Library documentation lookup is not permission to adopt dependencies or widen scope.

## Evidence, limitations, and evaluation reporting

- Actual planning preflight: read documentation/source/test/configuration, checked branch/HEAD and working-tree state. Before planning artifacts the tree was clean; afterward only this feature's planning directory was untracked. No Phase 4 typecheck, build, test, browser run, or human evaluation was performed.
- Historical evidence only: `docs/testing/frontend-library-adoption-evaluation.md` records Phase 3 `pnpm check` with 156 frontend passes and six intentional skips, plus other checks. It is not a Phase 4 baseline. Skips cover mobile beforeunload and desktop-wheel-only cases; preserve truthful skip reasons.
- Prior human smoke acceptance covered only Phase 3 task-form opening/closing, focus, and Escape. It does not accept Phase 4 or certify all earlier workflows.
- Known retained limitation: date-only updatedAt cannot order edits within a day; ties retain existing order and Recently touched may omit a task edited that day. Do not fix this by changing stored timestamps or sort behavior.
- Known retained limitation: idle tabs spanning local midnight may show stale overdue classification until relevant render/reload. Physical-device behavior and mobile touch scrolling are not certified by desktop/mobile browser configurations.

For each ticket after implementation, required checks, and review, prepare an evaluation section under a durable guide such as `docs/testing/frontend-mvp-completion-evaluation.md`. Include actual revision/environment/commands/results/skips, feature-specific reproducible steps with expected outcomes, a first concrete action, and separate pending user-observation fields. Preserve earlier ticket checkpoints. Suitable first actions: create a No project task (01); inspect a past-due incomplete task and complete/reopen it (02); view the personalized Dashboard welcome (03); visit an unknown route and return to Dashboard (04). Use disposable fixtures/workspaces for destructive checks. Guide readiness and automated passes do not imply human acceptance, and pending human evaluation is not an unrequested implementation approval gate.

## Unresolved decisions and completion state

No unresolved product-scope or testing-seam decisions remain. Runtime prerequisites and fresh verification are not yet established. Exact copy/placement are bounded implementation choices; a review fixed point must be handled under the review skill's checkpoint.

Planning completion: specification and four tickets published; this handoff contains approved scope, constraints, acceptance reference, order/dependencies, file map, required checks, evidence, and limitations. Application code and tests are unchanged. Stop this planning session here. Start future work with ticket **01: Complete standalone-task workflows**.
