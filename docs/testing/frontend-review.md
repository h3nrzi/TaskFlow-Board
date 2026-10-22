# Frontend stability code review

Baseline: clean starting commit `2af2532cda6094cdb0eb13843c01b0b96fe94358`.
Compared the working diff and new files against the approved spec and tickets in
`.scratch/frontend-stability/`. Two independent read-only reviewers evaluated the
standards and specification axes. Final execution evidence is in the evaluation guide.

## Standards

Initial finding: one P2 unload-guard defect. Returning to the initial theme after
successfully saving a different theme could incorrectly bypass the unsaved-work
warning. A regression reproduced it. The guard now compares against the latest
acknowledged saved bytes; the initial-demo exemption ends after a successful save.
The reviewer reinspected the fix and found it resolved. No documented-standard
violations or worthwhile optional smell findings were reported.

## Spec

Initial findings: one P1 unsafe fallback when Web Locks was unavailable, and one
P2 gap in storage-recovery test coverage. The fallback now refuses unsafe writes
and exposes unsaved-workspace export. Regression coverage includes unavailable
locking, exact malformed-byte exports, exported unsaved work, and failed reads
that preserve the underlying stored workspace. The reviewer reinspected these
changes and found both findings resolved, with no remaining actionable spec issue.

Standards: 1 initial finding, 0 remaining. Spec: 2 initial findings, 0 remaining.

Human evaluation was pending at the initial review; these reviews do not
establish acceptance. The subsequent user-directed outcomes are recorded in the
evaluation guide.


## Ticket 03 human-evaluation follow-up

Compared the follow-up working diff with `2239f26`. Independent standards and spec
reviewers found no actionable findings. Both confirmed that using the board's
route matcher is a minimal fix for the separately reproduced trailing-slash bug.
Coverage now includes persisted assignment/reload, SPA navigation, creation entry
points, cancellation, explicit project selection, and development versus preview.

The exact human failure was an old loaded canonical document with failed Vite
updates, resolved by reloading from the verified current server. The slash bug
must not be presented as the cause of that canonical report. Review and automated
results left human acceptance pending retest at that handoff. The user has since
marked Tickets 02 and 03 Human-accepted, reported the first Ticket 04 dialog check
Passed, and marked all remaining manual checks Not Evaluated. No review findings
or automated results changed as part of that closeout.
