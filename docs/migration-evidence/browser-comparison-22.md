# Browser comparison follow-up — 2026-10-22

## Result and boundaries

The relocated frontend reads existing original browser-local data at the same origin. Project/task/profile/theme state survives migrated refresh and server restart. Development and built-preview route matrices match. The exercised CRUD, cancellation/cascade, filter, sorting, demo-entry, theme and responsive flows show no observed migration regression.

This is **partial behavioral evidence**, not a completed controlled visual comparison or human acceptance. The native Chrome profile/fixture from [the preceding session](remaining-browser-evaluation.md) was not restored. Native automation repeatedly rejected actions or returned a ScreenCaptureKit error; on resumption only the personal Chrome window remained open. No personal page was modified. The evaluation continued in the host-managed in-app browser, without importing data from native Chrome or another origin.

## Preflight and reproduction

- Implementation remains `4a0c61101e37cd28900908ac464924d0c8f5eaf3`; this follow-up changes documentation/evidence only. All 66 protected files and 228 retained dependency snapshots pass final verification.
- The previous `/tmp` checkout and server processes were no longer available. Recreated the original as a separate clone at `/Users/hossein/Downloads/taskflow-evaluation-original`, detached at `ae51b1750a6a8c8ef795d6495c2f94f27d79d0be`. Its final diff exactly equals `baseline-accommodation.patch`.
- Explicitly pinned Node 24.22.0 and pnpm 10.11.0. [Frozen installation](baseline-22-install.log) and [original build](baseline-22-build.log) passed. Toolchain PATH avoids the unpinned original checkout selecting another global runtime.
- Original development: [first start](baseline-22-dev.log), [later comparison start](baseline-22-comparison.log). Original preview: [log](baseline-22-preview.log). Migrated development: [start](migrated-22-dev.log), [restart](migrated-22-restart.log), [final start](migrated-22-final.log). Migrated preview: [log](migrated-22-preview.log). Each switch stopped the preceding evaluation server before reusing `http://localhost:21998/`. All evaluation servers were stopped at handoff.
- In-app browser ID `2`, temporary tab `2`. It retained previous synthetic evaluation state: 3 seed projects, 8 tasks dated from the earlier session, profile `Signup Evaluator`, dark theme. This is neither a fresh profile nor restoration of the exported native fixture. Personal native Chrome storage was not accessed.
- Measured desktop **1440×900**, mobile **390×844**, scale **1**, fonts **loaded**. Browser engine version/timezone were not exposed or certified. Client date advanced to 2026-10-22 Asia/Tehran; retained seed due dates did not regenerate. Generated project/task timestamps are runtime values and differ across scenarios.
- Captured browser screenshots inline at the migrated board, mobile task drawer and built-preview dashboard. Only the earlier native desktop dashboard has a repository PNG; a durable paired screenshot matrix is still missing. In-app console queries returned no captured warnings/errors. This does not establish a complete network trace: resource timing/network APIs were unavailable in the provided read-only page scope.

Original startup from the new checkout:

```sh
PATH=/Users/hossein/.nvm/versions/node/v24.22.0/bin:/opt/homebrew/bin:$PATH PORT=21998 BASE_PATH=/ /opt/homebrew/bin/pnpm --filter @workspace/taskflow dev
# Stop development before preview:
PATH=/Users/hossein/.nvm/versions/node/v24.22.0/bin:/opt/homebrew/bin:$PATH PORT=21998 BASE_PATH=/ /opt/homebrew/bin/pnpm --filter @workspace/taskflow serve
```

Migrated commands from the main repository are `pnpm dev:web` and, with development stopped, `pnpm preview`. No backend ran during these browser flows.

## Observed feature checkpoints

| Feature and reproducible action | Original observation | Migrated observation / comparison |
| --- | --- | --- |
| Projects / empty board | Create `Origin continuity 22`, description `Preserve this project across migration`, initial O, color #6d83a9. Empty board, zero counts, `Project created`. URL `/projects/project-1792616778033`. Separate blank project attempt reports `validity.valueMissing`. | The existing project loaded unchanged after switching servers. Edit description to `Migrated edited description`, initial M and color #c47d5d: `Project updated`. Separately create and remove `Migrated creation check`; blank name is invalid, successful creation shows empty board and toast. Native original project editing is recorded in the preceding session. |
| Task creation / validation | Add `Continuity task`, `Original task details`, Urgent, explicitly select Origin continuity 22, assignee Continuity Evaluator. To do → In progress using status select. Native original blank-title/date-entry observations are in the preceding session. | Existing task loaded In progress with original description, priority and assignee. Move to Done: 100% and Done count 1. Blank title on a subsequent form reports `valueMissing`. Create `Cascade probe`, description `Migrated task`, Urgent in the evaluation project. |
| Date-field limitation | In-app fill displayed `2026-10-28` in the date input but creation did not retain it. | Same result. A subsequent DOM read confirmed the input's type/date/value before submission; the created task still had no date. Native original keyboard entry previously retained Oct 28. This is an unresolved evaluator/input-event difference; no date-edit equivalence claim or source fix. |
| Task details / editing | Original native run verified drawer fields and title/description edits. Current original mobile drawer showed all seed task details, including stored Oct 22 date. | Drawer showed original saved fields. Edit cascade task to `Cascade probe edited`, description `Edited migrated task`, assignee `Edited Evaluator`: card/drawer updated and `Task updated`. |
| Task deletion | Create `Original deletion probe` in `Original cascade check`. Delete → Keep it retains it. Delete → confirm removes it, closes drawer, board returns to zero, `Task deleted`. | Same cancellation/removal results for Continuity task. Native confirmation attempts were inconclusive; the in-app original run supplies the actual successful original observation. |
| Project cancellation / cascade | Earlier native Keep it retained the project. Current original create `Original cascade task` inside Original cascade check; confirm project deletion removes both; Tasks returns to **8 tasks / 3 projects**. | Keep it retained the evaluation project and edited task. Confirm deletion removed both; Tasks returned to **8 tasks / 3 projects**. All seed titles remained. |
| Search / no match | Original native search Migration: 1; `zz-no-match`: 0 and no-match message; clear: original result set restored. | `zz-no-match`: matching no-match message. Search Cascade: 1. |
| Every task filter | On the eight seed tasks: To do 3, In progress 3, Done 2; Low 2, Medium 3, High 2, Urgent 1; project counts 3/2/3. Reset each control before the next. | With an additional Urgent/To do evaluation task: status 4/3/2; priorities 2/3/2/2; seed project counts unchanged 3/2/3, evaluation project 1. These count differences are explained by that task, not a regression. |
| Sorting | Capture title order for Due date, Priority and Recently updated on the eight seed tasks. | After test-data cleanup, **all three complete title-order arrays matched exactly**. Due date starts Audit image library; Priority starts Map the onboarding journey; Recently updated starts Sketch the new landing page. |
| Profile / light and dark | Save Continuity Evaluator / continuity@example.test; set Light; reload retains both. Native original also saved a separate demo profile, selected Dark, then verified refresh/restart persistence. | Original profile and Light loaded after migration. Dark survives reload; navigation theme toggle returns Light. Brand link returns to Overview. |
| Same-origin existing-data continuity | Project/task/profile/theme created or saved in original browser session, then original server stopped. | Start migrated server at the same origin without touching browser storage: all original values appear. After migrated project/task edits, reload and stop/start migrated development preserve edited title/description/assignee/project/profile/theme. Storage key remains `taskflow-store-v1`; no application transfer code or cross-origin import was added. |
| Mobile | At 390×844, Tasks hamburger exposes Overview/Projects/Tasks/Settings; stored seed task drawer includes status, priority, date, project and assignee. Earlier original mobile creation is recorded in baseline-browser-followup.md. | At 390×844, hamburger Tasks navigation and evaluation-task drawer work; screenshot shows usable fields, scrolling and edit/delete controls. No paired pixel comparison or complete mobile creation replay is claimed. |
| Demo login / signup | Login using login-continuity@example.test → Overview and `Your demo workspace is ready`; signup Migration Signup / signup-migration@example.test → same result. | Same routes, submissions and toast. This changes only the synthetic browser-local demo profile; no server/account/password flow was added. |

## Direct routes and built preview

For each mode, navigate directly, reload, wait for a visible heading, and inspect the resulting page. Development checks included the observed synthetic-project route; both built previews included the seed-project route. The exercised route results were:

| Route | Result |
| --- | --- |
| `/` | Overview with current synthetic profile greeting |
| `/projects` | Projects and three seed project headings after cleanup |
| `/projects/studio-site` | Studio website board in both built previews |
| `/tasks` | All tasks |
| `/settings` | Settings |
| `/login` | Welcome back. |
| `/signup` | Start with a small step. |
| `/migration-unknown-route` | 404 Page Not Found |

The original synthetic project route also loaded directly after reload; the migrated server loaded that same existing project route before test cleanup. Some immediate preview snapshots preceded rendering and contained no heading; waiting for the expected heading resolved them. They are not counted as passing until the heading was observed. Fonts were loaded at desktop checkpoints, styling was visibly present in screenshots, and no captured console warnings/errors were returned. Full asset-request/network capture remains pending.

## Remaining requirements and first next action

Tickets 03's existing-data/routing requirement and 07's refresh/restart persistence requirement are now supported. Broad functional observations have improved, but the other grouped comparison criteria remain unchecked where date editing, complete mobile replay, fixture restoration, paired screenshots or network capture are missing.

First human action: run `pnpm dev` from the migrated repository and open `http://localhost:21998/` in **TaskFlow evaluation 2026-10-21**. Restore [browser-fixture.json](browser-fixture.json) through DevTools Application → Local Storage, reload and export it again to establish a byte-identical restore round trip. Then complete the remaining paired screenshots/date-field/mobile/network checkpoints using [the evaluation guide](../migration-evaluation.md). The synthetic in-app profile ends as Migration Signup, light, three seed projects/eight tasks; the test projects/tasks were removed. Human acceptance remains pending.

## Native-control retry at final reconciliation

Chrome’s Profiles menu successfully reopened **TaskFlow evaluation 2026-10-21**. The original development server started on the established origin, and the retained evaluation profile rendered Settings with the earlier synthetic Migration Evaluator state. DevTools opened on Network; its responsive viewport showed 629×695 rather than the required 1440×900. Attempting to restore the controlled dimensions failed with ScreenCaptureKit error -3812; a subsequent full accessibility observation failed with the same error. No fixture restoration, network export, paired screenshot or date/mobile replay was completed in this retry. The personal profile was not modified. The original evaluation server was stopped. These are environment/control failures, not evidence of a frontend regression.
