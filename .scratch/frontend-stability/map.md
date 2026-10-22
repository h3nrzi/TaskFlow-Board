# Frontend stability map

## Notes

Bounded audit of existing local React workflows. See [spec](spec.md),
[implementation tickets](issues/), and [evaluation guide](../../docs/testing/frontend-evaluation.md).

## Decisions-so-far

Q1–Q3 approved as recommended. Q5–Q8 approved as recommended. Q4 approved with
Chromium/Firefox/WebKit automation at desktop/mobile viewports, relevant touch,
keyboard and responsive checks; physical-device coverage optional and pending.

Implementation completed across eight tickets, with storage integrity prioritized. Final `pnpm check` passed (117 browser cases passed, 3 mobile unload cases intentionally skipped; all remaining checks passed). Human acceptance remains pending.
Frontend source freezing was replaced by browser regression checks. The retained
dependency graph is checked against the starting commit's lockfile.

## Fog

Human observations and physical-device behavior remain pending. Automated viewports
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

The first human attempt failed; acceptance remains pending retest. The canonical
Chrome document was stale (missing current UI markers, failed Vite updates), while
the dev server served current source; reload restored correct preselection.
Separately, a fresh trailing-slash route reproduced a default-project bug. The
follow-up uses the same route matcher as the board and expands dev/preview tests.
See [Ticket 03](issues/03-project-context.md) for exact evidence and retest steps.

Follow-up validation: 18 focused development cases passed; full `pnpm check`
passed with 129 preview browser cases and 3 documented mobile unload skips, plus
all dependency/type/build/API/tooling checks. Review findings: none. Human status:
pending retest after the recorded failed attempt.
