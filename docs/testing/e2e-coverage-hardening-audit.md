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

### Ticket 02 checkpoint

T01–T03 strengthened in `workflows: task CRUD`; T05 optional UI retention added in `standalone: edit-form unassignment`; T07–T08 added in `consistency: task assignment and status stay consistent`. T04/O01/O02 useful existing assertions retained. Six-config task field check passed; consistency/standalone/overdue run passed 54. The final optional-field focus exposed a fixture resetting saved assignment on every reload (six deterministic failures, not a product defect or flake). Replaced that fixture setup with guarded `seedWorkspace`; correct UI expectation retained. Final recheck and reviews are recorded in the evaluation guide. Stable IDs here are observed from UI test IDs, not asserted from raw storage.

### Ticket 03 checkpoint

P01/P02 strengthened in `workflows: project CRUD` (all fields, cancelled edit/delete, saved cascade boundaries and UI survivors); P03/T06 strengthened in `stability: board task entry points` (required controls, explicit mobile policy and destination UI). P04 added in `empty-workspace.spec.ts` (Dashboard empty actions, first project/board, Tasks empty capture). T04's zero-project/general/board cases now have complementary empty-state evidence. Existing stored cascade assertions and desktop drag remain. One deterministic locator ambiguity corrected by scoping the empty-state action; no product expectation was removed.

### Ticket 04 checkpoint

D01–D03/N01 added in `discovery.spec.ts`, using UI task identities and controlled inputs rather than starter counts. N02 strengthened in `recovery.spec.ts` through Browse projects and saved UI/byte retention. A01 strengthened in `workflows`; A02 added in `demo-profile.spec.ts`, retaining old draft-reset and welcome checks. First focus exposed title-locator metadata mismatch, fixed without changing matching/ordering expectations. Required profile/recovery checks passed in the initial 42-pass subset; discovery corrected focus passed 18. Exact current verification and review are in the evaluation guide.

### Ticket 05 causal reliability and safeguard decisions

| Finding | Evidence category | Disposition and preserved contract |
| --- | --- | --- |
| Optional-field fixture overwrote saved assignment on reload | Six deterministic failures in ticket 02, preserved trace; guarded fixture then six passes | Correct fixture initialization, retain exact optional schema and UI assignment/field assertions. |
| Empty-state actions shared accessible names with header/sidebar | Six, then three deterministic locator failures in ticket 03 | Scope to the intended empty-state section/main; retain actual button interaction, not direct state injection. |
| Task-open button text includes metadata | 18 deterministic discovery assertion failures in ticket 04 | Select UI row identities for full membership/order; preserve exact tasks without brittle subtitle expectations. |
| Broad cancelled-reload catch and artificial 2s navigation timeout | Static weakness; baseline passed, Chromium/Firefox desktop took 2.4/2.6s vs WebKit 0.484s | Trigger browser reload with `location.reload`, explicitly dismiss native beforeunload and await both promises. Assert unsaved warning/light UI remain; no swallowed errors or impossible load-event wait. Current desktop checks passed in ticket 05. |
| Font isolation only applied to primary page | Static fixture scope gap; second cross-tab page bypassed isolation | Move same cosmetic-only route interception to browser context so all tabs inherit it. No product/network contract is removed. |
| Immediate route/form geometry checks | Static synchronization risk; no reproduced flake in fresh baseline | Poll the original overflow condition with default assertion limits and retained diagnostic elements. No fixed waits, retry setting, larger timeout or reduced workers. |
| Long responsive scenario, drag and backdrop geometry | Baseline and focused execution passed | Preserve boundaries and native interactions. No splitting/rewrite justified by observed evidence; full-width mobile drawer legitimately has no exposed backdrop. |
| Cross-tab write safety UI evidence incomplete | Existing local assertion retained, coverage strengthened | Check rejected task absent from saved data and first tab UI after reload; keep conflict warning and original task. |

L01–L05 classified and preserved; L03/L05 strengthened in `stability.spec.ts`. I01–I03/I05 preserved, I04 synchronization strengthened in `workflows.spec.ts`. The fixture-local and locator failures above are not product defects or evidence of intermittent flakes. No new skips. Physical touch scrolling remains a manual limitation.

## Final journey reconciliation — ticket 06

Final tested implementation: `57f57323521405de23f3e7ab3afa59bb2753c0a2`. Two-axis review through tickets 01–05: Standards 0 remaining, Spec 0 remaining. No product defects exposed; no blocked journeys or required deferrals. The final three-run protocol passed consecutively: 270 passes and six documented skips in each full run, with the third supplied by passing `pnpm check`. Actual logs, metadata, durations and preserved reports are in the evaluation guide. Each row below reconciles the initial disposition with current assertion ownership. Classifications remain those in the original matrix; mixed storage/fixture cases were retained deliberately.

| IDs | Final disposition and current assertion location | Verification scope |
| --- | --- | --- |
| T01 | Strengthened `workflows: task CRUD`: rich creation, dirty edit cancellation, unchanged description and every drawer field after reload | Focused 6 configs; final sequence |
| T02 | Strengthened same test: dirty-create cancel absent after reload; edited original retained; existing overlay cancellation remains | Focused 6 configs; final sequence |
| T03 | Strengthened same test: cancelled deletion survives reload with same row/content/status; confirmed deletion stays absent; `consistency` reopens and persists active state | Focused 6 configs; final sequence |
| T04 | Preserved `standalone: standalone creation` and `stability: task without a project`; added empty Tasks/Dashboard capture without projects | Baseline + focused + final sequence |
| T05 | Preserved both-editor exact identity/fields in `standalone: unassignment preserves`, optional representation in `edit-form unassignment`; added optional UI fields after reload | Focused 6 configs; final sequence |
| T06 | Preserved two slash-form board-default tests; strengthened `stability: board task entry points` with source absence and chosen-board presence | Baseline + focused + final sequence |
| T07 | Added `consistency: task assignment and status stay consistent`: UI-created identity across source/destination/No project filters, status, drawer and reload | Focused 6 configs; final sequence |
| T08 | Added same `consistency`: Dashboard open/active/completed/progress, source/destination summaries and project card/board count/progress | Focused 6 configs; final sequence |
| P01 | Strengthened `workflows: project CRUD`: UI name/description/icon/color, rename, cancelled draft, navigation and reload; existing native desktop drag retained | Focused 6 configs; final sequence |
| P02 | Strengthened same test: cancellation/reload, assigned cascade, unrelated project and assigned/standalone survivors through list/board/reload plus stored absence | Focused 6 configs; final sequence |
| P03 | Strengthened `stability: board task entry points`: required controls, defaults after navigation/cancel, explicit override and destination UI; mobile hidden quick-add explicit | Focused 6 configs; final sequence |
| P04 | Added `empty-workspace`: actual empty Dashboard project/task actions, first-project action, board column capture and empty Tasks action; saved UI reload | Focused 6 configs; final sequence |
| D01 | Strengthened through `discovery: search identifies`: title/description/project names, case, all filters, exact All/No project identities; prior tests preserved | Focused 6 configs; final sequence |
| D02 | Added `discovery: sorts order every result`: all result identities, ordered distinct-value groups, ties as sets, empty/absent dates last, date-only recency | Focused 6 configs; final sequence |
| D03 | Strengthened same search test: clear no-result query/filters and recover known exact memberships | Focused 6 configs; final sequence |
| N01 | Added `discovery: in-app navigation`: real app routes retain query, page filters/sort reset on remount, reload clears search | Focused 6 configs; final sequence |
| N02 | Strengthened `recovery` light/dark: Browse projects to usable board/Tasks after keyboard unknown-route recovery; created task and exact bytes persist | Focused 6 configs; final sequence |
| A01 | Strengthened `workflows: overview, settings`: both fields and light/dark reload, visible signup result; existing personalized time-neutral `welcome` retained | Focused 6 configs; final sequence |
| A02 | Added `demo-profile`: native required/email and signup-name validation, failed-submit profile preservation, mode draft resets, trimmed signup/login results and saved UI | Focused 6 configs; final sequence |
| O01 | Preserved `overdue: overdue uses local dates` both themes, all date/status/surface conditions | Baseline + focused + final sequence |
| O02 | Preserved `overdue: completion, reopening` edits/reload/schema and `render and reload after local midnight` | Baseline + focused + final sequence |
| L01 | Preserved malformed exact bytes/download and invalid-shape nonoverwrite in `stability` | Baseline + focused + final sequence |
| L02 | Preserved warning/usable unsaved capture/current export in `stability: storage write failure` | Baseline + focused + final sequence |
| L03 | Strengthened `stability: stale tab`: rejected write absent, first saved task retained through UI reload | Focused 6 configs; final sequence |
| L04 | Preserved missing-lock no-write and unavailable-read original-byte retention/usable unsaved session | Baseline + focused + final sequence |
| L05 | Strengthened explicit dismissed reload/no swallowed error in `stability: unsaved return`; same three mobile skips | Focused desktop; final sequence |
| I01 | Preserved all four `overlays` focus/pointer/backdrop checks and nested edit/delete keyboard checks | Baseline + focused + final sequence |
| I02 | Preserved keyboard project/task activation and task modal containment/restoration | Baseline + focused + final sequence |
| I03 | Preserved desktop wheel/background scrolling checks, same three mobile skips | Baseline + focused desktop; final sequence |
| I04 | Strengthened original responsive overflow/form conditions with retryable observations; same route/width/tap coverage | Focused 6 configs; final sequence |
| I05 | Preserved native desktop drag and six-config status menu in project CRUD | Baseline + focused + final sequence |

Coverage choices: representative rich and optional tasks, two-project movement plus standalone survivor, explicit empty captures and five-item discovery fixture cover high-risk paths without a Cartesian product. Existing overdue themes/calendar boundaries and local safeguard fault injections remain. No new product requirement, dependency, instrumentation or backend fixture abstraction was introduced. Manual physical touch scrolling and human observations remain outside automated certification; they are not hidden skips or claimed acceptance.

Final phase review at `62235a6`: Standards 0, Spec 0 remaining findings. All six implementation tickets and automated verification complete. Human evaluation remains pending in the evaluation guide; no backend-readiness claim is made.
