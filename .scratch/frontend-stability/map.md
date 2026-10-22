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
