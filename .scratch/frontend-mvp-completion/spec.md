# Phase 4 — Frontend MVP Feature Completion

Status: ready-for-agent

Planning checkpoint: The consolidated Shared Understanding and browser-level testing seam are explicitly approved. This specification is published for separate user approval; publication and triage status do not authorize implementation. Ticket breakdown approval and publication remain pending. This session is planning-only; implementation must start in a fresh Codex session.

## Problem Statement

TaskFlow's single-person, browser-local task/project workflows are implemented, but users cannot consistently choose to keep tasks outside projects or find those tasks using a dedicated project-filter choice. A supported empty project assignment can become impossible to restore through the UI after assigning a project. Users also lack a visible indication that an incomplete task's due date has passed. The Dashboard always greets users with “Good morning,” and an unknown route displays developer-oriented copy without a clear recovery action.

The original MVP feature definition is not present in repository documentation. Phase 4 therefore uses documented preservation commitments plus the explicitly approved discovery decisions as its scope authority, rather than treating every unfinished control or potential enhancement as a requirement.

## Solution

Complete standalone-task workflows using the existing local model, add a minimal derived Overdue badge to existing task surfaces, replace the fixed morning greeting with a personalized time-neutral welcome, and provide a user-facing 404 with a clear Dashboard link. Preserve the established architecture, visual conventions, local persistence contracts, existing workflows, and regression coverage. Document the current date-only recency limitation without changing it.

## User Stories

1. As a TaskFlow user, I want to create a task with No project even when projects exist, so that standalone work does not require an artificial project.
2. As a TaskFlow user, I want to create tasks when no projects exist, so that project setup does not block capturing work.
3. As a TaskFlow user, I want general task creation to retain its first-project default when projects exist, so that my established workflow stays familiar.
4. As a TaskFlow user, I want creation from a project board to default to that project, so that new work starts in the context I selected.
5. As a TaskFlow user, I want to explicitly choose No project instead of either creation default, so that defaults do not constrain my intent.
6. As a TaskFlow user, I want to remove a task's project assignment in its edit form, so that I can move existing work out of a project.
7. As a TaskFlow user, I want to remove a task's project assignment in its details drawer, so that I can update its organization directly.
8. As a TaskFlow user, I want removing an assignment to retain the task's identity and other fields, so that reorganizing work does not lose information.
9. As a TaskFlow user, I want to assign a standalone task to a project and later remove that assignment again, so that organization remains reversible.
10. As a TaskFlow user, I want assignment changes to survive reload, so that standalone work behaves like other locally saved tasks.
11. As a TaskFlow user, I want a No project choice in the Tasks project filter, so that I can isolate standalone work.
12. As a TaskFlow user, I want All projects to continue including assigned and standalone tasks, so that the existing inclusive view remains available.
13. As a TaskFlow user, I want the No project filter to combine with search, status, priority, and sorting, so that I can narrow standalone work using familiar controls.
14. As a TaskFlow user, I want project deletion to retain its existing confirmation and task-cascade behavior, so that this phase does not silently change deletion semantics.
15. As a TaskFlow user, I want an incomplete task with a past due date to display Overdue, so that missed deadlines are visible.
16. As a TaskFlow user, I want tasks due today or in the future to avoid an Overdue badge, so that deadlines are classified accurately.
17. As a TaskFlow user, I want undated tasks to avoid an Overdue badge, so that missing dates do not imply lateness.
18. As a TaskFlow user, I want completed tasks to avoid an Overdue badge, so that finished work is not presented as outstanding.
19. As a TaskFlow user, I want completing a past-due task to remove its badge and reopening it to restore the badge, so that presentation follows its current status.
20. As a TaskFlow user, I want changing or clearing a due date to update the badge, so that it reflects the current task data.
21. As a TaskFlow user, I want overdue classification to use my browser's local calendar date, so that a UTC boundary does not shift my deadline.
22. As a TaskFlow user, I want the badge in Tasks rows, project-board cards, Dashboard Recently touched rows, and the details drawer, so that existing task views communicate the same condition.
23. As a TaskFlow user, I want badge presentation to remain readable on narrow screens and in both themes, so that the indicator does not obstruct existing task controls.
24. As a TaskFlow user, I want a reload or relevant render after local midnight to use the new date, so that classification can refresh without a background service.
25. As a TaskFlow user, I want a time-neutral personalized Dashboard welcome, so that the greeting is appropriate throughout the day.
26. As a TaskFlow user, I want an unknown route to explain that the page cannot be found and offer a Dashboard link, so that I can resume work without developer knowledge.
27. As a TaskFlow user, I want 404 recovery to preserve my workspace, so that navigation does not discard saved work.
28. As a TaskFlow user, I want existing local saving, recovery, conflict protection, keyboard access, and task/project operations to remain reliable, so that these additions do not undermine established workflows.

## Implementation Decisions

- Target the existing single-person, browser-local frontend. Demo authentication and free-text assignees remain intentional local semantics.
- Update existing task creation/editing and drawer project choices to always permit No project. Preserve empty-string project assignment; do not invent a placeholder project, new stored field, or migration.
- Preserve general creation defaults: the first available project when one exists, otherwise No project. Preserve project-board creation's active-project default. An explicit user selection overrides the default.
- Removing an assignment preserves task identity and all other task fields, apart from update metadata already maintained by existing operations. Do not delete or recreate the task. Preserve existing draft cancellation behavior.
- Extend the existing Tasks project filter with No project, distinct from All projects. Keep page-local filter lifetimes, combined search/filter behavior, sorting, and empty-result behavior.
- Preserve project deletion's task cascade, confirmation, and navigation behavior. Unassigning a task does not alter deletion rules for tasks still assigned to the deleted project.
- Derive overdue status from a present due date strictly earlier than the browser's current local calendar date and a status other than done. Both todo and in-progress qualify. Due today, future, absent, and empty dates do not qualify.
- Show a consistent text badge labeled Overdue in Tasks list rows, project-board cards, Dashboard Recently touched rows, and the details drawer. Follow existing badge styling and accessibility conventions; do not rely on color alone or disrupt existing controls.
- Keep the task creation/edit form and Dashboard Coming up selection unchanged. Add no overdue filter, section, reminder, or persisted status.
- Evaluate the current local date during rendering. Task status/date changes refresh the relevant presentation. Reload or a relevant render after midnight uses the new date; an idle page may retain its previous state until that occurs. Do not add timers, polling, or a requirement that every unrelated render refresh every surface.
- Keep domain rules in the existing pure workspace boundary and task presentation in the existing task feature boundary. Reuse presentation where appropriate without broad refactoring or creating reverse dependencies.
- Replace the fixed morning greeting with a time-neutral welcome, retaining existing personalization. Exact wording follows existing product tone and is an implementation choice within this requirement.
- Make the existing 404 page user-facing and provide a clear Dashboard link using existing routing conventions. Preserve unknown-route handling, the separate missing-project fallback, and configured base-path behavior. Follow established styling and keyboard access.
- Preserve the local storage key, validated date-only values, workspace shape, storage safeguards, route/state lifetimes, overlay focus/layer behavior, visual conventions, and all other established workflows. Add no dependencies or backend integration.
- Precise same-day recency stays deferred: update metadata contains dates without times; equal-day edits cannot be ordered chronologically and may retain existing array order, including the Dashboard's limited recent list. Document this limitation without changing sort semantics or introducing timestamp migrations.
- No prefactoring ticket or architectural change is currently justified by this scope.

## Testing Decisions

- The user explicitly approved one primary testing seam: browser-level workflows through the existing frontend Playwright suite. Test externally observable behavior and persistence contracts, rather than component internals, hook calls, or markup snapshots that merely mirror the implementation.
- Prefer existing UI interactions and workspace-fixture patterns. Inspect persisted workspace data only where needed to establish identity, field preservation, assignment, and schema contracts. Account for existing update metadata rather than requiring byte-identical tasks after legitimate edits.
- Exercise standalone creation with and without projects; both assignment-removal paths; reassignment; cancellation; reload; creation defaults and explicit overrides; All projects versus No project; combinations with search/status/priority/sorting; and empty results. Reuse existing project-cascade coverage.
- Exercise overdue presence and absence using controlled browser dates and fixtures, covering past/today/future/absent dates and all statuses. Verify completion/reopening, due-date edits/clearing, all four surfaces, and correct results following reload.
- Include a local-calendar boundary where the local and UTC dates differ. Exercise crossing local midnight and refreshing by reload or a relevant render. Automatic refresh of an idle page is not an acceptance requirement; asserting permanent staleness is also not required.
- Verify personalized time-neutral greeting, user-facing 404 and working Dashboard recovery, workspace retention, and unchanged missing-project behavior.
- Use the existing Chromium/Firefox/WebKit desktop/mobile matrix. Check narrow layouts and both themes for the new badge and recovery UI, retaining existing keyboard, focus, overlay, routing, saving, conflict/recovery, CRUD, and cascade coverage. Desktop/mobile browser configurations do not certify physical-device behavior.
- Prior art: existing task CRUD and combined-filter workflows; board/default-project and unassigned-task stability scenarios; route-fallback and responsive scenarios; nested-overlay regression tests.
- In the future implementation session, use TDD where practical at this approved seam, run focused test files regularly and typechecking regularly, and run the full repository check at final integration. Preserve existing meaningful assertions and intentional skip explanations. Do not weaken checks to obtain a passing run.
- Review each ticket through the established code-review workflow. Resolve actionable findings and rerun checks justified by resulting changes.
- Prepare a reproducible feature-by-feature evaluation guide for each ticket after implementation, required checks, and review. Record actual preflight evidence and give the user a concrete first action. Automated passes and guide readiness do not establish human acceptance; leave it pending until the user reports observations.

## Out of Scope

- Precise same-day recency, timestamp/schema changes, migration, or recency redesign.
- Overdue filtering, Dashboard sections, changed Coming up membership, notifications, reminders, automatic midnight refresh, or background polling.
- The undefined Tasks navigation badge behavior.
- Comments, subtasks/checklists, recurring tasks, tags, duplication, bulk actions, attachments, calendar views, custom statuses, board ordering, pagination, saved filters, project search, archive/undo, import/restore, new routine export controls, onboarding/reset, and extra touch/keyboard dragging.
- Real authentication/password management/account isolation, team membership/invitations, actual user relationships for assignees, permissions, cloud/cross-device saving, collaboration/reconciliation, server notifications/email, centralized audit history, and remote attachment storage.
- Backend integration, broad refactoring, additional libraries, or changes to unrelated product behavior.

## Further Notes

- Discovery questions Q1–Q9 and the consolidated Shared Understanding are approved. The browser-level testing seam and coverage were approved separately. Those approvals do not substitute for separate approval of this specification or the ticket breakdown.
- Next gate: present this published specification for approval. Only then advance to ticket breakdown. Publish one file per ticket only after the user approves the proposed granularity and genuine blocking edges.
- Tickets will execute sequentially in approved order in a fresh Codex session, even where no technical blocking edge exists. Do not invent dependencies merely to express the required execution order.
- This session may create planning artifacts only. Do not begin application edits, test implementation, or the implement skill. Prepare a self-contained repository handoff after approved ticket publication, including paths, commands, evidence, constraints, order, and unresolved decisions.
- Discovery found implemented workflows and existing regression coverage, not fresh behavioral certification. No Phase 4 test/build/browser run has occurred. Historical Phase 3 test results and limited user smoke observations must not be represented as Phase 4 verification or broader human acceptance.
- Human evaluation of Phase 4 has not started. Exact badge placement within each approved surface and final friendly copy are bounded implementation choices, not unresolved scope decisions.
