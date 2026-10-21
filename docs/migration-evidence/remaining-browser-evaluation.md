# Remaining migration evaluation — 2026-10-21

This follow-up starts at `4a0c61101e37cd28900908ac464924d0c8f5eaf3` with a clean worktree. Application source, manifests, lockfile, and tooling are unchanged. Human acceptance and the complete controlled browser comparison remain pending.

## Actual preflight

- Created a separate signed-out Chrome profile through Profiles → Add Profile → Stay signed out, named **TaskFlow evaluation 2026-10-21**. `chrome://version` identifies Chrome **156.0.8078.48 arm64**, macOS **26.1 (25B78)**, and its separate profile directory, `Profile 27`. Personal profile storage was not read, cleared, or imported.
- DevTools responsive mode: **1440×900 CSS**, measured `innerWidth`/`innerHeight`, **devicePixelRatio 2**, **Asia/Tehran**, `document.fonts.status === "loaded"`. Original measurement: `2026-10-21T17:45:45.588Z`. The clock was not frozen. Mobile comparison is still pending.
- Original checkout: `/tmp/taskflow-baseline-remaining`, detached at `ae51b1750a6a8c8ef795d6495c2f94f27d79d0be`. Its exact diff still equals [the recorded configuration accommodation](baseline-accommodation.patch).
- The initial original install selected an unsuitable global runtime; later attempts selected pnpm 11 through a different global wrapper and hit the original pnpm-only preinstall hook. These are evaluator setup failures, not migration regressions. The final explicitly pinned invocation passed; see [final install output](remaining-baseline-install-final.log):

  ```sh
  cd /tmp/taskflow-baseline-remaining
  CI=true PATH=/Users/hossein/.nvm/versions/node/v24.22.0/bin:/opt/homebrew/bin:$PATH /opt/homebrew/bin/pnpm install --frozen-lockfile
  PATH=/Users/hossein/.nvm/versions/node/v24.22.0/bin:/opt/homebrew/bin:$PATH PORT=21998 BASE_PATH=/ /opt/homebrew/bin/pnpm --filter @workspace/taskflow dev
  ```

- Original startup succeeded: [development log](remaining-baseline-dev.log). Migrated startup was stopped first. The first browser seed export preceded the final pinned restart; the same seed remained after that restart, before any functional mutations below.
- Exported the original `taskflow-store-v1` through the disposable profile's DevTools as [browser-fixture.json](browser-fixture.json), **3,014 bytes**, SHA-256 `bf7670d7fcec2f772f0c79f833438a1b9e95fd3df4f319df92fb4887a655e5f8`. It contains synthetic seed data only: 3 projects, 8 tasks, Maya Chen, light theme.
- Retained a copy in that tab's session storage as `taskflow-evaluation-fixture` before mutation. Export is verified; restoration has **not yet been exercised**. This is evaluator state, with no application code changes or transfer between origins.
- Saved [original desktop dashboard](original-dashboard-desktop.png) via DevTools Capture screenshot. It shows the expected seed counts and styling. No full screenshot matrix or HAR has yet been exported.
- Current migrated `pnpm check` passed: [complete output](remaining-tasks-check.log), including preservation/dependency verification, both typechecks/builds, actual HTTP health smoke, and all three workflow tests.

## Original functional observations

All actions below ran in the disposable profile at `http://localhost:21998/`, with the final pinned original server, desktop viewport and loaded fonts. Migrated repetition is pending.

| Feature | Reproducible action and actual original result |
| --- | --- |
| Overview | Maya Chen; 6 open, 3 in progress, 2 completed, 25%; Studio website, Field Notes, Spring launch. |
| Project validation/create | Submit an empty New project: native “Please fill out this field.” Create `Migration evaluation`, description `Controlled migration comparison`, initial `E`: new empty board; toast `Project created`. Generated URL in this run: `/projects/project-1792604821545`. |
| Project edit | Save description `Edited project description`, initial `M`, second color `#c47d5d`: board text/initial updated; toast `Project updated`. |
| Project deletion cancellation | Delete project: cascade warning; click `Keep it`: project and task remain. Keyboard Tab/Enter instead reached the underlying Add task button and opened another form behind the confirmation; that incidental form was closed without submission. This baseline keyboard/focus behavior is deferred, not fixed. |
| Task validation/create | Blank New task: native required-field prompt. Create `Migration probe`, `Controlled task description`, Urgent, explicitly select Migration evaluation, due `2026-10-28`, assignee `Migration Evaluator`: task visible in To do, count 1; toast `Task added to your workspace`. The project form initially selects Studio website even when opened from the new project board, matching the previously recorded baseline quirk. |
| Board status | Use card status select: To do → In progress → Done; column counts update and completion becomes 100%. Two native drag attempts did not move the task; drag behavior is unverified, not classified as a source defect. |
| Task detail/edit | Drawer shows date, project, assignee, Done/Urgent and description. Edit title to `Migration probe edited` and description to `Edited description`: card and drawer update; toast `Task updated`. |
| Search/no match | Tasks shows 9 tasks across 4 projects. Search `Migration`: 1 result. Search `zz-no-match`: 0, `No tasks match those filters`. Clear: 9 results. |
| Status filter | Select Done: 3 results. |
| Priority filter | With Done selected, choose Urgent: 1 result. |
| Project filter | Add Migration evaluation filter: 1 result. Sort control was not successfully exercised before concurrent browser activity. |

## Interruption and remaining work

Concurrent native Chrome activity changed the active window repeatedly, eventually exposing the personal Chrome window in a screenshot instead of the evaluation window. No actions were taken on that personal page after observing the mismatch. Native evaluation paused and an asynchronous availability question was sent in this chat. The personal-page screenshot is not retained in repository evidence.

The profile and fixture export now exist, but **no new browser criterion is checked complete**: fixture restoration, full original coverage/network capture, and migrated repetition are not established. Remaining original coverage includes task deletion, cascade/unrelated-data checks, sort, profile/themes, demo entry, mobile, fresh direct-route/preview observations and refresh/restart persistence. Earlier original observations remain available in [the prior follow-up](baseline-browser-followup.md), but they are not substituted for the controlled comparison.

First concrete action once Chrome is free: select the **TaskFlow evaluation 2026-10-21** window, inspect its current URL and DevTools state, then restore the exported fixture at the same origin. In the existing evaluation tab, the retained copy can be restored through DevTools:

```js
localStorage.setItem("taskflow-store-v1", sessionStorage.getItem("taskflow-evaluation-fixture"));
location.href = "/";
```

Use this only after verifying the session copy is non-null and exactly equals the supplied JSON fixture. If the tab was closed, paste the JSON file's exact contents into the `taskflow-store-v1` value in DevTools Application → Local Storage. Reload and verify all seed counts before proceeding. Save the restored value again and compare its hash with the fixture. Complete the original matrix, then stop only the evaluation server and start migrated `pnpm dev:web` at the same origin, restore the same fixture, and repeat the guide's feature checkpoints. Never restore into a personal profile or a different origin.

Human evaluation remains pending until observations are reported.

## Subsequent work

The user made Chrome available and evaluation resumed. Native controls continued failing intermittently; a fresh tab recovered a blank rendering state, and original profile/theme/project/task refresh and server-restart persistence were observed. A later resumption found the temporary checkout and native evaluation window gone. See [2026-10-22 comparison](browser-comparison-22.md) for the new retained checkout, actual subsequent original/migrated observations, completed persistence/routing criteria and remaining gaps. The fixture restoration and broad native network/screenshot criteria are still not complete.
