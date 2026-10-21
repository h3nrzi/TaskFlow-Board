# TaskFlow migration evaluation

This is the evaluation procedure for the agreed future migration. The migration is not implemented, commands are not finalized, and all execution results below remain pending. Do not interpret this guide as evidence that the application works.

## Preflight evidence

- Inspected commit: `ae51b1750a6a8c8ef795d6495c2f94f27d79d0be`.
- Initial worktree: clean before planning documents were created.
- Existing frontend: `artifacts/taskflow`, with 63 tracked files under `src/`, plus its HTML entry and public assets.
- Existing frontend origin supplied by Replit metadata: `http://localhost:21998/`; backend port: 8080.
- Existing persistence key: `taskflow-store-v1`.
- Repository inspection found no installed dependencies or existing CI workflows. Installation, typechecking, builds, HTTP checks, and browser evaluation have not been run.

Before implementation handoff, replace pending execution entries with actual commands, versions, results, and evidence paths. Record macOS and Linux separately; one platform's pass does not establish the other's.

## Baseline preparation

Use a dedicated browser profile for evaluation so existing personal browser data is preserved. Record browser version, operating system, timezone, date, viewport, and device scale. Use the same conditions before and after migration; recommended comparison viewports are 1440 × 900 and 390 × 844.

Start the original frontend at the documented origin with base `/`. Record any configuration-only accommodation needed to install or run it, particularly native-dependency exclusions. Do not change protected frontend files. Save the protected-file inventory, frontend dependency versions, screenshots, browser console/network observations, and any existing defects. If baseline execution is blocked, record that explicitly and leave behavioral equivalence unverified.

For reproducible comparisons, retain a copy of the evaluation profile's `taskflow-store-v1` value. Restore that same fixture before each comparable run. Keep the clock/date consistent where possible; otherwise record date-dependent differences rather than treating them as layout regressions. Wait for Google Fonts before screenshots.

## Feature-by-feature comparison

Run these steps against the baseline and migrated frontend. Record observed results in both, screenshots where useful, and whether any difference is a baseline defect, migration regression, or explained environmental difference.

| Feature | Reproducible action | Comparison checkpoint |
| --- | --- | --- |
| Navigation and dashboard | Open `/`, then Projects, All tasks, and Settings; return using the brand link. | Same layout, active navigation, counts, summaries, and interactions. |
| Projects | Create `Migration evaluation` with a description, color, and initial; open its board, edit it, then cancel a deletion. | Same form behavior, project appearance, navigation, and cancellation. |
| Tasks | Create `Migration probe` in that project with description, priority, due date, and assignee; open details and edit each field. Attempt a blank title. | Same validation, detail drawer, saved values, and notifications. |
| Board | Move the probe task between To do, In progress, and Done using the existing board controls; open it again. | Same movement behavior, counts, and stored status. |
| Search and filters | Find the probe task by title; exercise each visible task filter; use a search with no match and clear it. | Same matching, empty states, and restored results. |
| Profile and themes | Save a distinctive demo profile in Settings; switch light/dark using settings and navigation controls. | Same displayed profile, theme styling, and notifications. |
| Persistence | Reload `/tasks`, the created project's URL, and `/settings`; stop/restart the frontend at the same origin. | Same saved projects, tasks, profile, and theme. |
| Demo entry screens | Open `/login` and `/signup` in a separate clean evaluation profile; submit valid demo details and exercise links between screens. | Same browser-local demo flow; no new authentication or backend calls. |
| Responsive UI | Repeat navigation, task creation, and drawer opening at the mobile viewport. | Same mobile navigation, menus, spacing, scrolling, and usable controls. |
| Direct routes and fallback | Directly open and refresh each route above plus an unknown route, in development and built preview. | Same page behavior and frontend not-found view; application routes load without server 404s. |
| Deletion | Delete the probe task; create a second task in the evaluation project, then delete the project. | Same confirmation and removal of the project and its tasks; unrelated data remains. |

## Infrastructure checks

Run frozen-lockfile installation, typechecking, builds, and the backend HTTP smoke test from fresh checkouts on macOS and Linux using the pinned toolchain. Record GitHub Actions results. Verify the protected-file byte comparison using the original-to-new path mapping and review frontend dependency graph changes. Review cleanup against remaining runtime and configuration references; protected Replit comments/metadata are expected.

Verify independent app startup, documented port overrides, and clear occupied-port errors. With both applications running, perform these requests in development and then with development stopped and built preview running:

```sh
curl -i http://localhost:8080/api/healthz
curl -i http://localhost:21998/api/healthz
```

Both must return HTTP 200 and `{"status":"ok"}`. Verify the frontend origin in a browser as well. Restart the backend on another port and apply the documented proxy target override; repeat the frontend-origin request. Request an unknown `/api/` path and confirm it reaches the backend rather than returning frontend HTML.

Stop the backend: frontend navigation must remain usable, while an explicitly requested proxied health call must fail visibly. Inspect browser network activity during ordinary frontend use and confirm the migrated application initiates no new API calls. Production hosting and routing are outside this check.

## Handoff and human evaluation

First user action after implementation: follow the finalized startup command in the handoff, open `http://localhost:21998/` in the evaluation browser profile, and begin the Navigation and dashboard row above.

The implementation handoff must include exact commands, actual preflight/check evidence, known baseline defects, unresolved failures, and a feature-by-feature comparison record. Human evaluation remains pending until the user reports observations; automated passes and guide readiness do not establish human acceptance.
