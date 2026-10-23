# E2E coverage audit and hardening

Audit revision: `61c872d9ddf195caaede740847d58738cef1049a`, 2026-10-23. Ticket 01 pre-edit inventory. Runtime evidence is recorded separately in the evaluation guide. Source inspection is not execution evidence.

Classification: **U** portable user-facing E2E contract; **L** browser-local safeguard; **F** storage-dependent fixture setup (not an assertion contract). Mixed tests retain both useful kinds of assertions. P1 protects work/state, P2 navigation/accessibility, P3 presentation. References below are test titles or distinctive title prefixes in `tests/frontend/`; ownership is the ticket number. No required coverage is deferred.

| ID | Contract and existing assertion evidence | Class | Risk / disposition from baseline | Priority / owner |
| --- | --- | --- | --- | --- |
| T01 | `workflows: task CRUD` creates title/description/priority/project/date, drawer edits status/assignee/title; reload only checks title/project | U | Strengthen: all field values after reload and untouched fields through edits | P1 / 02 |
| T02 | `stability: task modal contains keyboard focus`, `overlays: task form` cancel/escape; `standalone: unassignment preserves` cancels assignment edit | U+L | Strengthen: dirty creation/edit cancellation and persisted original content | P1 / 02 |
| T03 | `workflows: task CRUD` completes, cancels deletion, confirms deletion and verifies absence after reload; `overdue: completion, reopening` toggles both ways | U | Strengthen cross-surface status and reload of reopened state | P1 / 02 |
| T04 | `standalone: standalone creation` explicitly overrides general/board defaults; `stability: task without a project` captures with zero projects | U+F | Preserve; strengthen empty-state action capture under P04 | P1 / 02,03 |
| T05 | `standalone: unassignment preserves` both editors retain exact identity/content except date; optional-values test protects absent assignee/empty date | U+L+F | Strengthen UI field evidence alongside local representation checks | P1 / 02 |
| T06 | `stability: new task on a project board` both slash forms checks default, stored assignment and UI reload; entry-point test conditionally omits controls | U+L | Strengthen: require available controls and destination/source membership | P1 / 03 |
| T07 | No complete reassignment/source/destination/No project workflow | U+F | Add representative stable-ID reassignment, unassignment, drawer and reload checks | P1 / 02 |
| T08 | Dashboard starter task opening in `workflows`; overdue recent/upcoming evidence; no transition metrics/progress proof | U+F | Add controlled small workspace with Dashboard, boards, project summaries/counts | P1 / 02 |
| P01 | `workflows: project CRUD` create/rename heading, board task status menu and desktop drag | U | Strengthen description/icon/color retention using edit form after navigation/reload | P1 / 03 |
| P02 | `workflows: project CRUD` confirms deletion, checks raw absence only | U+L | Strengthen cancellation, UI cascade/reload plus unrelated and standalone survivors | P1 / 03 |
| P03 | `stability: board task entry points` defaults across two projects and explicit assignment | U+L | Strengthen required controls, viewport policy, portable destination proof | P1 / 03 |
| P04 | Empty project/task/Dashboard views lack capture via empty-state actions | U+F | Add empty workspace through standalone capture and first project/board capture | P1 / 03 |
| D01 | `workflows: search, combined filters` counts search, identity on combined filters; `standalone: No project combines` mixed filters | U+F | Strengthen exact memberships, title/description/project case-insensitive search | P1 / 04 |
| D02 | Sort tests assert first item only | U+F | Add controlled full ordering for priority/due/updated, ties and undated placement; no invented same-day recency | P1 / 04 |
| D03 | Existing no-matches text checks | U | Strengthen clear query/filters to recover known membership | P2 / 04 |
| N01 | Responsive route navigation visits pages; no shell search/page filter lifetime proof | U | Add in-app navigation, retained query and reset page filters/sort on remount | P2 / 04 |
| N02 | `recovery: unknown-page recovery` light/dark, keyboard link, exact bytes and created task survives | U+L | Preserve; missing-project Browse projects action needs execution | P2 / 04 |
| A01 | `workflows: overview, settings` name/theme reload, signup redirects; `welcome` personalized time-neutral heading | U | Strengthen email/light persistence and signup resulting local profile | P1 / 04 |
| A02 | `stability: switching login to signup` empty signup fields | U | Add login submission, native email/required validation, whitespace signup name validation, profile retention and draft resets | P1 / 04 |
| O01 | `overdue: overdue uses local dates` light/dark, past todo/progress vs done/today/future/absent/empty across list/drawer/board/Dashboard; Tehran vs UTC | U+F | Preserve | P1 / 02 |
| O02 | `overdue: completion, reopening` date/status edits, no stored badge, reload; `render and reload after local midnight` | U+L+F | Preserve; no idle timer required | P1 / 02 |
| L01 | `stability: invalid saved data` exact malformed-byte export; `valid JSON with invalid workspace shape` preserves raw data | U+L+F | Preserve | P1 / 05 |
| L02 | `stability: storage write failure` usable task capture, warning, current-workspace export | U+L | Preserve; inspect export content quality | P1 / 05 |
| L03 | `stability: stale tab` first tab save survives second tab change and warning | U+L | Strengthen rejected write absence, UI recovery and first-tab work after reload | P1 / 05 |
| L04 | `stability: missing cross-tab locking` warns and never writes; `unavailable reads` preserves original bytes and usable unsaved session | U+L+F | Preserve | P1 / 05 |
| L05 | `stability: unsaved return to initial theme` desktop prompt and dismissed reload, catches every reload error | U+L | Strengthen error specificity; preserve mobile intentional skip | P1 / 05 |
| I01 | `overlays` four overlay kinds: focus wrap/containment, inside press/outside release, exposed backdrop left/right cancellation, Escape restoration; `stability: nested edit and delete` | U | Preserve; geometry branches represent real backdrop availability, not omitted required controls | P2 / 05 |
| I02 | `stability: project and board task titles` keyboard activation; task modal focus checks | U | Preserve | P2 / 05 |
| I03 | `overlays: overflowing task form` desktop wheel and background scroll with observed positions | U | Preserve desktop-only skips; touch scroll remains manual | P2 / 05 |
| I04 | `workflows: responsive routes` long route/width loop, immediate layout predicates, mobile form and tap navigation | U | Strengthen retryable layout checks; assess failure isolation using baseline | P3 / 05 |
| I05 | `workflows: project CRUD` desktop native drag and status menu; mobile uses status menu | U | Preserve actual interaction; no physical-device certification | P2 / 03,05 |

## Coupling decisions

- Stable task/project IDs select a known entity and detect duplication/recreation. Keep them. Exact storage shape/optional absence/export bytes protect current local contracts, independently of portable UI assertions.
- Starter inventory is useful for seeded UI smoke, but new aggregate and ordering checks must use small controlled inputs. Existing starter smoke is preserved.
- Fixtures in overdue/standalone/stability are browser-local setup, not UI creation evidence. Guard new fixtures against overwriting saved changes on reload.
- Metric classes and form overflow geometry are presentation-specific because there are no accessible metric values/overflow signals; keep coupling narrow and assert visible labels/values.
- Conditional required controls can hide regressions; distinguish them from legitimate mobile quick-add absence and no-backdrop full-width drawers.
- Immediate geometry, broad reload error swallowing, and long responsive scenarios are static reliability risks until fresh runs show otherwise. No flake has been inferred from historical results.

## Execution and reconciliation

Baseline and final results, review findings, per-ticket verification and human evaluation are tracked in [the evaluation guide](e2e-coverage-hardening-evaluation.md). This initial matrix records planned dispositions; ticket checkpoints will record actual changes and any blockers.
