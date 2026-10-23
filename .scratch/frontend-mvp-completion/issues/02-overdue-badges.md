# 02: Show minimal Overdue badges

**What to build:** Users see a consistent Overdue text badge for incomplete tasks whose due date precedes their current local calendar date, across the existing task views.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] A task is overdue only when its due date is present and strictly earlier than the browser's current local date and its status is not done. Both todo and in-progress qualify; today, future, absent/empty dates, and completed tasks do not.
- [ ] Display the badge in Tasks rows, project-board cards, Dashboard Recently touched rows, and the details drawer, with existing styling conventions and a text label rather than color alone.
- [ ] Completing a past-due task removes the badge; reopening it restores it. Changing or clearing the due date updates the displayed result on the resulting render.
- [ ] A relevant render or reload after local midnight uses the new date. An idle page may retain its previous state until then; no automatic midnight refresh, polling, or timer is required or added.
- [ ] Preserve existing task controls, readable narrow layouts, both themes, keyboard access, and overlay behavior.
- [ ] Derive the condition without new stored fields, schema/date-contract changes, migrations, or dependencies. Preserve the existing pure-domain and task-presentation boundaries.
- [ ] Do not add badges to the task creation/edit form, an overdue filter, a Dashboard section, notifications, or changed Coming up selection.
- [ ] Browser coverage uses controlled dates/fixtures for past/today/future/absent dates, all statuses, completion/reopening, date changes/clearing, all four surfaces, reload, local/UTC date differences, and midnight refresh. Check narrow layouts and both themes across the established browser matrix.
- [ ] Run focused browser checks and regular typechecking; complete Standards and Spec review and resolve actionable findings. Record actual results and skips honestly.
- [ ] Prepare this ticket's reproducible evaluation guide, actual preflight evidence, and first user action; leave human evaluation pending until observations are reported. Commit completed work under the implement workflow.

## Comments

- User approved this ticket on 2026-10-23. It has no technical dependency on standalone-task changes, but must execute second under the approved sequential workflow in a fresh session.
