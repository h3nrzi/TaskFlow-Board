# Frontend stability phase

Approved 2026-10-22 in the implementation chat.

## Scope and decisions

Audit existing overview, project/task CRUD, project boards, drawer edits, completion,
search/filter/sort, settings/theme, demo login/signup, navigation and route fallbacks.
A bug causes data loss, failure, inconsistency, or prevents an existing workflow's
apparent purpose. Record ambiguous improvements separately. No architecture rewrite,
library modernization, new features or backend integration.

Prioritize data integrity, then blocked core workflows, incorrect behavior, then
smaller usability/visual defects. Mobile severity equals desktop severity.
Perform a bounded audit, then small fix batches with regressions. Interrupt for data loss.

Automate Chromium, Firefox and WebKit at desktop and mobile viewports, with relevant
keyboard, touch and responsive checks. Real devices optional, pending when unavailable.
Protect saved data against malformed/unavailable storage and stale-tab overwrites.
Keep auth local/demo and project deletion cascading, with clear consequences.
Add frontend regression tests and replace obsolete source-freezing checks; retain
applicable tooling/build/dependency checks.

## Exit criteria

Audit coverage documented; confirmed defects reproduced and prioritized; identified
data-loss and core-workflow blockers resolved; lower priorities fixed or explicitly
deferred with reasons. Each implemented ticket has checks, review and hands-on guide.
Human acceptance remains pending until user observations are reported.
