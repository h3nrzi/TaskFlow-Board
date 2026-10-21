# Ticket 01: original-browser follow-up, 2026-10-21

Result: routing evidence is complete for the exercised routes. Controlled-profile/fixture and complete functional evidence criteria remain **unchecked**. This run observes the original frontend only; it establishes neither migrated equivalence nor human acceptance.

## Isolation and actual preflight

- Main checkout began clean at `3d78a7e89da84d00845a572da91d203d511a46bd` on `main`. No application source/configuration was changed there.
- Detached original worktree: `/tmp/taskflow-original-browser-01`, revision `ae51b1750a6a8c8ef795d6495c2f94f27d79d0be` (the specification's preservation reference). Earlier evidence used `f2ace8b`; its protected bytes were already verified identical. No migration was rerun.
- Applied the existing `baseline-accommodation.patch` verbatim. Only original `pnpm-lock.yaml` and `pnpm-workspace.yaml` differ from the reference. The final diff exactly equals the recorded patch. All **66 original and 66 relocated protected files still match** their recorded SHA-256 values. See [preflight JSON](baseline-browser-01-preflight.json).
- macOS 26.1 build 25B78; Node 24.22.0; pnpm 10.11.0. The original install was needed to execute this separate checkout; existing install/dependency/typecheck findings remain authoritative. [Install](baseline-browser-01-install.log) succeeded. Build was executed only to produce this checkout's preview: [build](baseline-browser-01-build.log), same CSS/JS filenames as prior evidence, same tooltip sourcemap warning.
- No listener occupied port 21998 before startup. Original commands: `PORT=21998 BASE_PATH=/ pnpm --filter @workspace/taskflow dev`, then the same command after terminating only its identified Vite process, then (with dev stopped) `PORT=21998 BASE_PATH=/ pnpm --filter @workspace/taskflow serve`. Logs: [dev](baseline-browser-01-dev.log), [restart](baseline-browser-01-restart.log), [preview](baseline-browser-01-preview.log). No migrated server was started for browser evaluation. The dev/restart logs end in status 143 because their Vite processes were deliberately terminated with SIGTERM for restart/preview; this is not a startup failure.
- Host-managed **Codex In-app Browser**, browser ID `2`, initially zero tabs; created temporary tab `1`. This avoided controlling the shared native Chrome application. No personal Chrome storage was inspected, imported, cleared, or overwritten. An empty tab inventory is **not proof of a fresh profile**. Initial app UI showed only the documented seed data; subsequent changes used synthetic evaluation values.
- Actual DOM measurements: desktop **1440×900 CSS**, mobile **390×844 CSS**, **devicePixelRatio 1** on both. `document.fonts.status` returned `loaded` at desktop and mobile checkpoints; this does not prove which external font files succeeded. These are not the guide's scale-2 comparison conditions.
- Host/client date 2026-10-21, client timezone Asia/Tehran. Browser timezone, exact engine version, OS as reported by the browser, and a fixed browser clock were **not verified**. Do not substitute the earlier native Chrome version for the in-app engine. A read-only environment probe could not obtain `navigator.userAgent` (`navigator` unavailable in that scope).

## Actual functional observations and reproducible sequence

Actions below occurred in development unless explicitly labelled preview. Reproduce only in a disposable evaluation profile, starting with the seed state. IDs and timestamps are runtime-generated; use the URL produced by project creation.

| Feature / action | Actual observation | Limits / next check |
| --- | --- | --- |
| Overview, Projects, Tasks, Settings navigation | Fresh UI: Maya Chen, 3 projects, 8 total tasks, 6 open / 3 in progress / 2 done, 25%. Sidebar navigation loaded the corresponding screens. | Brand-link return was not separately exercised. |
| Blank project submit | New project form remained open, no project appeared. | Native validation text was not captured. |
| Project create/read | Created `Baseline probe 01`, description `Disposable original baseline evaluation`; navigated to `/projects/project-1792602976148`, empty board with 0 tasks and drop placeholders; toast `Project created`. | This runtime ID is not a portable fixture. |
| Project edit | Saved description `Edited baseline description`, initial `B`, color `#6d83a9`; board reflected the description/initial; toast `Project updated`. | Color button was exercised; persisted color bytes were not exported. |
| Project deletion cancellation | Delete project → `Delete this project?` / cascade warning → `Keep it`; project remained. | Only the synthetic project was targeted. |
| Task validation/create | Blank title submit left form open. Created `Baseline task 01`, description `Original task description`, Urgent, assignee `Baseline Evaluator`, explicitly selected `Baseline probe 01`; board showed 1 To do; toast `Task added to your workspace`. | Due date was not included in creation. |
| Board status | Status select moved task To do → In progress → Done; counts changed 1/0/0 → 0/1/0 → 0/0/1; completion reached 100%. | Drag-and-drop was not exercised. |
| Task detail/edit | Opened details; Edit task saved title `Baseline task edited`, description `Edited task context`, Low, assignee `Evaluation Owner`; drawer and board showed saved values; toast `Task updated`. | Attempted drawer date fill `2026-10-25` did not subsequently appear in task summaries. Successful date persistence is **unverified**; no application defect is inferred from this automation attempt. Moving a task between projects is untested. |
| Search / no match | Exact edited task title returned 1; adding To do status returned 0 and `No tasks match those filters`; restoring Done/Low/evaluation project returned 1. Clearing filters restored 9 results. | A standalone unmatched search string and project-name search were not separately exercised. |
| Every visible filter option | Independently exercised status To do/In progress/Done: 3/3/3; priority Low/Medium/High/Urgent: 3/3/2/1; project Studio/Field Notes/Spring/evaluation: 3/2/3/1. Reset each group before next. | Counts include the one edited Done/Low probe. |
| Sort controls | Recently updated default showed edited probe first. Due date control selected during combined-filter run (one matching row). Priority on all tasks showed Urgent, then High, Medium, Low. | Due-date order across multiple rows remains unverified. |
| Settings/profile/theme | Saved `Baseline Evaluator` / `baseline@example.test`; switched Dark. Reload preserved profile and DOM class `dark`. | Empty/invalid profile validation was not exercised; later signup changed the profile. |
| Demo login/signup | `/login`: `login@example.test` → Continue to demo → `/`, retained Baseline name. `/signup`: `Signup Evaluator` / `signup@example.test` → Create demo workspace → `/`, greeting Signup; toast `Your demo workspace is ready`; existing projects/tasks remained. | Existing browser-local state was used; clean-profile demo behavior, invalid email, and entry-screen cross-links remain unverified. No real authentication was attempted. |
| Mobile | At 390×844 scale 1: dashboard two-column summary cards, bottom Home/Projects/Tasks/Settings navigation, Toggle navigation exposed links; drawer Tasks link opened task list. New task created `Mobile cascade probe` in evaluation project; task detail drawer opened for edited probe. | Mobile board dragging, full scrolling/layout inspection and scale-2 comparison remain pending. |
| Task cancellation/delete | In mobile details: Delete → Keep it retained edited task; repeated Delete confirmation removed only that synthetic task, reducing total 10 → 9. | Seeded tasks were left intact. |
| Refresh persistence | Direct route/reload retained edited project/task, profile, dark theme. | No exported storage fixture or cross-browser-session restore was possible. |
| Same-origin server restart | Terminated original dev PID 99692, restarted, later terminated replacement PID 2073 before preview. After first restart reload, evaluation project/description and `Mobile cascade probe` remained; Signup initials and `dark` remained. | Browser tab/session remained open; closing/reopening a profile was not tested. |
| Project cascade | Deleted synthetic project containing Mobile cascade probe; redirected to Projects with original three cards. Direct `/tasks` showed **8 tasks across 3 projects**, no cascade probe. | Whole-workspace zero-project/zero-task state was not exercised. |

## Routing and built preview

Browser `goto` and `reload` were each observed separately. These observations concern original routing only.

| Route | Development direct + refresh | Built preview direct + refresh |
| --- | --- | --- |
| `/` | Dashboard, persisted profile/task state | Dashboard, `Good morning, Signup.` |
| `/projects` | Project cards including probe | Three seeded project cards after deletion |
| `/tasks` | Nine tasks before cleanup | Eight seeded tasks after cleanup |
| `/settings` | Saved profile and theme | Settings |
| Project detail | Created `/projects/project-1792602976148`: board and edited task | `/projects/studio-site`: Studio website board |
| `/login` | Welcome back; refresh confirmed | Welcome back; refresh confirmed |
| `/signup` | Start with a small step; refresh confirmed | Start with a small step; refresh confirmed |
| `/baseline-unknown-01` | `404 Page Not Found` / `Did you forget to add the page to the router?`, also after refresh | Same fallback, also after refresh |

A separate HTTP probe of all eight preview paths returned **200 text/html** containing the built application entry. Unknown paths have an application-rendered 404, not an HTTP 404. See preflight JSON; this HTTP probe is **not** browser network evidence. No production deployment routing claim is made. Missing/deleted project URLs were not tested.

## Console, network and screenshots

- `tab.dev.logs({levels:['warn','error'],limit:100})` returned `[]` after initial dashboard, at the late development checkpoint and after the preview routing matrix. These are captured-log checkpoints, **not proof of a complete console trace** or an error-free application. Navigation/reload may limit retained logs. The browser tool itself emitted `[Statsig] SDK initialization has not completed ... Loading:Unrecognized`; it did not appear in the tab's returned logs, so its origin is unclassified and it is not attributed to TaskFlow.
- Actual screenshots were emitted in this chat: desktop seeded light dashboard (1440×900), desktop saved dark Settings (1440×900), mobile dark dashboard after signup (390×844). No durable repository image files or full screenshot matrix were exported. Do not treat the text table as a pixel comparison or claim screenshot coverage for every feature.
- Advertised browser capabilities were only `visibility` and `viewport`; tab capabilities only `pageAssets` and `webmcp`. The documented developer API exposes console logs but **no request/response/HAR capture, profile creation/selection, or storage import/export**. `playwright.evaluate` is read-only DOM scope; it cannot serve as an arbitrary browser-state writer. No unsupported automation runtime, browser profile import, source instrumentation, or storage reset was used.
- Consequently, ordinary application API-request absence, font request successes/failures, full browser network evidence, and restorable localStorage fixture remain **blocked by the exposed browser capabilities**. No network results are invented. The in-app session does not certify the required dedicated evaluation profile.

## Existing behavior to defer

Opening `Add task` from the newly created project board initially selected **Studio website** rather than the current project. Reproduction: create a project → its empty board → Add task → inspect Project selection before changing it. This was observed in the original reference, not introduced by migration. Fix deferred. The known tooltip build sourcemap warning is unchanged. The date-fill attempt is an unresolved observation, not an established defect.

## First concrete action and remaining evaluation

**First action:** create a dedicated disposable Chrome evaluation profile with DevTools access (do not reuse or clear a personal profile), then start the retained original worktree:

```sh
cd /tmp/taskflow-original-browser-01
PORT=21998 BASE_PATH=/ pnpm --filter @workspace/taskflow dev
```

The follow-up's server is stopped at handoff; port 21998 is released. If `/tmp` has been cleaned, recreate the original worktree and apply the recorded accommodation as described in the main evaluation guide. Never start migrated dev/preview on the same port concurrently.

Before editing data, open `http://localhost:21998/`, record actual browser version, timezone/date, viewport, device scale and font readiness. Export **the exact raw string** for `taskflow-store-v1` via DevTools Application → Local Storage to a fixture file and record its SHA-256, origin and capture time. Keep a seed fixture and a populated fixture. On a disposable profile only, restore the exact raw value for that key and reload; verify profile, project/task fields, counts and theme against recorded checkpoints. Do not clear all origin storage or synthesize JSON from source and label it an observed export. Record the export and restore observations before completing the first criterion.

Use DevTools Preserve log for Console and Network; capture/export their actual results while repeating the table, including font requests and ordinary activity's API calls (or their absence). Save screenshots as repository artifacts after fonts settle. Complete the expressly unverified table cells: date persistence, multi-row due-date sorting, clean demo/invalid input, auth cross-links, project-name/no-match searches, brand link, task reassignment, zero-data states, drag behavior and mobile coverage. Reuse the observations already established here; repeat only when establishing the controlled-fixture comparison requires it.

The temporary tab was closed and the viewport override reset at handoff. Its last observed browser-local state was the eight seeded tasks/three seeded projects, Signup Evaluator profile, and dark theme; test projects/tasks were removed through the UI. Closing the tab is not evidence that storage was erased, and no fixture restoration is claimed. The detached checkout is retained for evaluation; only its recorded configuration accommodation differs from the reference.

Ticket 01 remains partial and requires browser capabilities/human execution for these gaps. Human evaluation and acceptance remain **pending**; automated checks and this guide do not complete them.

## Verification of this evidence-only change

`pnpm typecheck` and the existing full `pnpm test` suite passed (one API HTTP smoke test and three workflow tests); see [typecheck log](baseline-browser-01-typecheck.log) and [test log](baseline-browser-01-tests.log). These required implementation-skill checks do not add browser acceptance evidence. No new tests or application fixes were authored. Previously verified dependency/platform evidence was reused. `git diff --check` passed before review.

Review against starting revision `3d78a7e89da84d00845a572da91d203d511a46bd`, including the final evidence-link/shutdown amendments: independent **Standards: 0 findings; Spec: 0 findings**. Reviews checked scope and evidence consistency; they did not replay or certify browser acceptance. Ticket evidence links resolve, two acceptance criteria remain unchecked, and no application/tooling/configuration paths changed.
