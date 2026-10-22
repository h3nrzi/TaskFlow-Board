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
keyboard, touch and responsive checks. Real devices optional; final manual status Not Evaluated per the closeout below.
Protect saved data against malformed/unavailable storage and stale-tab overwrites.
Keep auth local/demo and project deletion cascading, with clear consequences.
Add frontend regression tests and replace obsolete source-freezing checks; retain
applicable tooling/build/dependency checks.

## Exit criteria

Audit coverage documented; confirmed defects reproduced and prioritized; identified
data-loss and core-workflow blockers resolved; lower priorities fixed or explicitly
deferred with reasons. Each implemented ticket has checks, review and hands-on guide.
Human acceptance is recorded from explicit user reports; automated results alone
do not establish it.

## User-directed evaluation closeout — 2026-10-22

The user is satisfied with current automated coverage and the manual checks so far.
Tickets 02 and 03 are Human-accepted. The first Ticket 04 keyboard-dialog check is
Passed; all other manual checks are Not Evaluated. Detailed manual evaluation ends
at this stage without a requirement to complete the remaining reference procedures.
Automated evidence is unchanged. No additional implementation is needed unless a
confirmed defect remains; none is open in the recorded bounded audit.
