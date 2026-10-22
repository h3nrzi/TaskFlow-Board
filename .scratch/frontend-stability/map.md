# Frontend stability map

## Notes

Bounded audit of existing local React workflows. See [spec](spec.md),
[implementation tickets](issues/), and [evaluation guide](../../docs/testing/frontend-evaluation.md).

## Decisions-so-far

Q1–Q3 approved as recommended. Q5–Q8 approved as recommended. Q4 approved with
Chromium/Firefox/WebKit automation at desktop/mobile viewports, relevant touch,
keyboard and responsive checks; physical-device coverage optional; final manual status Not Evaluated.

Implementation completed across eight tickets, with storage integrity prioritized. Final `pnpm check` passed (117 browser cases passed, 3 mobile unload cases intentionally skipped; all remaining checks passed). Human evaluation was pending at that initial checkpoint; see the closeout below.
Frontend source freezing was replaced by browser regression checks. The retained
dependency graph is checked against the starting commit's lockfile.

## Fog

Detailed manual evaluation is closed at the user’s request. Remaining manual
workflows and physical-device behavior are Not Evaluated. Automated viewports
and engines are not physical-device acceptance. Ambiguous improvements are listed
separately below and were not used to expand the bug-fixing phase.

## Nonblocking observations

- Unknown-route fallback contains developer-oriented copy. Existing fallback renders
  and browser back/navigation works. Improving its wording/recovery affordances is
  deferred as a product-copy decision rather than treating an ambiguous improvement
  as a confirmed workflow blocker.
- The viewport metadata includes maximum-scale=1. Physical-device zoom behavior was
  not evaluated; accessibility/zoom behavior remains a follow-up observation, not a
  claimed reproduced defect.


## Ticket 03 human-evaluation follow-up

The first human attempt failed; acceptance was pending retest at that handoff. The canonical
Chrome document was stale (missing current UI markers, failed Vite updates), while
the dev server served current source; reload restored correct preselection.
Separately, a fresh trailing-slash route reproduced a default-project bug. The
follow-up uses the same route matcher as the board and expands dev/preview tests.
See [Ticket 03](issues/03-project-context.md) for exact evidence and retest steps.

Follow-up validation: 18 focused development cases passed; full `pnpm check`
passed with 129 preview browser cases and 3 documented mobile unload skips, plus
all dependency/type/build/API/tooling checks. Review findings: none. At that handoff, human status was
pending retest after the recorded failed attempt; the user has since accepted Ticket 03.

## Human evaluation closeout — 2026-10-22

- Tickets 02 and 03: Human-accepted by explicit user direction.
- Ticket 04: first keyboard-dialog check (New task dialog scenario) Passed;
  remaining manual checks Not Evaluated. Ticket 04 is not accepted as a whole.
- Tickets 01, 05, 06, 07 and 08, other manual walkthroughs and physical-device
  checks: Not Evaluated. No further detailed manual evaluation is requested now.
- Automated results remain unchanged: 18 focused development passes; latest full
  check 129 preview passes with 3 documented mobile unload skips; other checks passed.
- No open confirmed defect remains in the recorded audit; no further implementation
  is queued. See the evaluation guide for coverage limits and remaining risks.
