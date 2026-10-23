# 01: Complete standalone-task workflows

**What to build:** Users can explicitly create, edit, unassign, reassign, and find standalone tasks without losing task data or changing existing creation defaults and project-deletion semantics.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] No project is explicitly selectable in task creation, task editing, and the details drawer, including when projects exist. Creation still works when no projects exist.
- [ ] General creation defaults to the first available project, or No project when none exist. Project-board creation defaults to the active project. Explicit selections override defaults, including No project.
- [ ] Removing a project assignment through either editing or the drawer preserves the task ID, creation date, title, description, status, priority, due date, and assignee; only existing update-metadata behavior may additionally change. No task is deleted or recreated.
- [ ] Standalone tasks can be assigned and subsequently unassigned again. Saved changes survive reload. Canceling an edit does not save its draft.
- [ ] The Tasks project filter offers No project separately from All projects. All projects remains inclusive; No project returns only standalone tasks. Search, status, priority, sorting, and empty-result behavior continue to work in combination.
- [ ] Preserve the existing empty-string project contract, storage key/schema, page-local filter lifetime, storage safeguards, and project deletion's confirmation, cascade, and navigation behavior.
- [ ] Browser-level coverage exercises creation with/without projects, both assignment-removal paths, field/identity preservation, reassigning, cancellation, defaults/overrides, filtering combinations, and reload. Retain board-context, cascade, persistence, keyboard, and overlay regressions.
- [ ] Run focused browser checks and regular typechecking; complete Standards and Spec review and resolve actionable findings. Record actual results and skips without claiming unrun checks passed.
- [ ] Prepare this ticket's reproducible evaluation guide with actual preflight evidence and a concrete first user action; leave human evaluation pending until observations are reported. Commit the ticket's completed work to the current branch under the implement workflow.

## Comments

- User approved this ticket's scope, granularity, and lack of technical blockers on 2026-10-23. Execute first, sequentially, in a fresh implementation session. No prefactoring or backend work is authorized.
