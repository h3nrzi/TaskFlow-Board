# TaskFlow migration evaluation

Implementation is committed locally on the current branch. Human acceptance is **pending**. Controlled browser equivalence and hosted macOS CI remain **unverified**; hosted Ubuntu, fresh local macOS and Linux-container command checks pass; do not infer them from source checks or build output.

## First action and setup

Use Node **24.22.0** and pnpm **10.11.0**. From the repository root:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:21998/ in a dedicated evaluation profile. First checkpoint: Overview shows Maya Chen, Studio website / Field Notes / Spring launch, 6 open tasks, 3 in progress, 2 completed and 25% progress in a fresh profile. Navigate to Projects, Tasks, Settings and back using the brand link. Do not clear a personal profile's storage.

For a controlled comparison use Chrome 156.0.8078.48, 1440×900 desktop and 390×844 mobile CSS viewports, device scale 2, Asia/Tehran timezone and the same date. These are reproduction targets; the original native run did not measure all of them. Wait for `document.fonts.ready` in DevTools before screenshots. Save the dedicated profile's `taskflow-store-v1` value through DevTools Application → Local Storage before changing data, and restore it before each comparable run. The native original fixture is now exported as [browser-fixture.json](migration-evidence/browser-fixture.json); restoration and a complete paired visual/network rerun remain unverified. See the [latest comparison](migration-evidence/browser-comparison-22.md) for actual conditions and outcomes.

To reproduce the original baseline, use a separate checkout at `ae51b1750a6a8c8ef795d6495c2f94f27d79d0be`, apply `docs/migration-evidence/baseline-accommodation.patch` from the migrated checkout, run `pnpm install --frozen-lockfile`, then `PORT=21998 BASE_PATH=/ pnpm --filter @workspace/taskflow dev`. Stop the migrated server first. The patch changes configuration and lock metadata only. Use the same dedicated profile at the same origin and restore its fixture before each run. Preserve personal browser data.

## Actual preflight evidence

| Check | Actual result | Evidence |
| --- | --- | --- |
| Starting worktree | Clean, main; HEAD f2ace8ba95606cd7dd580a76c598233caf0d01fb | Baseline audit |
| Preservation reference | ae51b1750a6a8c8ef795d6495c2f94f27d79d0be; 66 files initially identical | protected-files.json |
| Host/toolchain | macOS arm64 26.1; Node 24.22.0; pnpm 10.11.0 | Command execution in this chat |
| Original frozen install | Pass; esbuild fallback downloads excluded native binary | taskflow-original-install.log |
| Original typecheck | Pass | taskflow-baseline-typecheck.log |
| Original build / startup | Fail: excluded Rollup darwin-arm64 binary | taskflow-baseline-build.log |
| Accommodated baseline | Install/build/start pass; PORT and BASE_PATH supplied | baseline-accommodation.patch; taskflow-baseline-accommodated-build.log |
| Baseline browser | Dashboard, project form, Settings observed; broad coverage interrupted | baseline-browser.md; screenshot in this chat |
| Final preservation | 66/66 files and complete relocation inventory pass | `pnpm verify:frontend` |
| Final dependency preservation | All retained direct versions and 228 snapshots/edges pass | frontend-dependencies.json; `pnpm verify:dependencies` |
| Final builds | Both pass; same baseline CSS/JS content-hashed filenames and sizes | taskflow-migrated-build.log |
| HTTP health | Red before implementation; green after; exact JSON and cleanup | taskflow-health-red.log; health-green.log |
| Proxy development / preview | Red SPA fallback before rule; green after; alternate target, 404, stopped backend, SPA and occupied web ports | taskflow-proxy-red.log; taskflow-proxy-green.log; taskflow-preview-green.log |
| Default commands | `pnpm dev`, built API + preview: direct/proxied health pass without injected settings | default-workflows.log |
| Final complete suite / fresh checkout | Pass on macOS arm64 and Linux arm64 container at 7a332e5: frozen install, all checks and 4 tests | final-validation.md; fresh-macos.log; fresh-linux.log |
| Linux | Pass in fresh Linux arm64 Debian bookworm container after fixing localhost address mismatch; hosted Ubuntu/x64 now passes separately | fresh-linux-initial.log; linux-loopback-diagnosis.md; fresh-linux.log; hosted-validation.md |
| GitHub Actions macOS/Linux | Published Foundation branch: hosted Ubuntu passes; first macOS job cancelled, retry queued | hosted-validation.md; hosted-actions.json |

Evidence paths above are relative to [migration-evidence](migration-evidence/). The original frontend graph has no version upgrades. Removed direct dependencies are only the three Replit Vite plugins and unused workspace API client. Restored native optional packages are required by the same locked esbuild, Rollup, Lightning CSS and Tailwind Oxide versions. The esbuild 0.28.2 override and original tsx 4.23.13 are retained. Backend additions do not change frontend resolutions.

Nest selection: registry metadata confirms stable Nest **11.2.7**, runtime Node >=20; CLI **11.0.24** declares Node >=20.11. Current generator documentation additionally requires Node 22.22.3+/24.15+/26+; pinned 24.22.0 satisfies it. Standard standalone module/controller/bootstrap and decorator-enabled TypeScript configuration are authored directly, with no CLI runtime dependency or monorepo mode. Sources checked via Context7: [Nest CLI requirements](https://docs.nestjs.com/cli/overview), [Nest migration requirements](https://docs.nestjs.com/migration-guide), [Vite 7 server proxy](https://v7.vite.dev/config/server-options#server-proxy), [Vite preview proxy](https://v7.vite.dev/config/preview-options#preview-proxy).

## Ticket checkpoints

| Ticket | Delivered checks / evidence | First evaluation action / pending work |
| --- | --- | --- |
| 01 Baseline | Existing source/dependency evidence plus isolated original functional observations and dev/preview route/refresh matrix | Read [latest comparison](migration-evidence/browser-comparison-22.md); dedicated native profile/fixture now exist; restore round trip, remaining coverage and network capture pending |
| 02 Audit | removal-audit.md and removal-files.json contain every audited file and references | Review removal-files.json against original checkout |
| 03 Frontend workspace | Independent defaults, preservation, typecheck/build, routing/occupied-port command checks | `pnpm dev:web`; begin dashboard/navigation; existing-data continuity and persistence observed; controlled visuals pending |
| 04 Nest health | Independent boot, exact HTTP smoke and cleanup, port handling | `pnpm dev:api`; curl http://localhost:8080/api/healthz |
| 05 Proxy | Dev/preview defaults and alternate target, unknown API, stopped backend | Run curl checks below; ordinary browser network trace still pending |
| 06 Platforms | Committed fresh-checkout-safe checks and macOS/Linux CI matrix | `pnpm check` in a clean clone; local macOS/Linux container and hosted Ubuntu pass; hosted macOS pending |
| 07 Comparison | Same protected files/dependencies and content-hashed production assets; HTTP routes checked | Run every row below on original and migrated builds; browser comparison remains incomplete |
| 08 Review/handoff | Scope/dependency/preservation review, exact commands, evidence and limitations | Follow first action above; report observations; human acceptance pending |

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

Each feature row remains pending human evaluation. Original browser coverage is recorded in baseline-browser.md and [the ticket 01 follow-up](migration-evidence/baseline-browser-followup.md); neither establishes migrated equivalence. Record baseline/migrated outcomes, screenshot paths, console/network findings and classify each difference as baseline defect, migration regression, environmental difference or unverified. Confirm no browser-initiated application API requests during normal use.

## Infrastructure evaluation

`pnpm check` verifies bytes and inventory completeness, original dependency edges, typechecks, both builds and actual HTTP tests. Root checks are also the fresh-checkout workflow on both platforms. GitHub Actions runs macOS and Linux separately after the commit reaches GitHub. No Replit credentials, environment files or database are needed. The health smoke requires neither frontend nor database. The workflow tests start and stop both applications on temporary local ports.

Independent commands, port overrides and preview are in [README](../README.md). Stop dev before preview. With both apps running:

```sh
curl -i http://localhost:8080/api/healthz
curl -i http://localhost:21998/api/healthz
curl -i http://localhost:21998/api/missing
```

Health responses: HTTP 200 and exactly `{"status":"ok"}`; unknown API: backend 404 JSON, never SPA HTML. Stop backend and repeat: proxied request returns HTTP 500 with Vite ECONNREFUSED in terminal, while `/tasks` remains usable. Repeat with `pnpm build`, `pnpm preview`, and independent backend. Test alternate target in both modes:

```sh
API_PORT=8081 pnpm dev:api
API_PROXY_TARGET=http://127.0.0.1:8081 pnpm dev:web
# Stop development before:
API_PROXY_TARGET=http://127.0.0.1:8081 pnpm preview
```

`WEB_PORT=22000` overrides frontend dev/preview port. Start a second instance on the same requested port: expect an explicit already-in-use failure; API reports EADDRINUSE. `pnpm dev:api` watches for file changes, so a failed child remains watched; built `pnpm --filter @taskflow/api start` exits nonzero on conflict. Source and browser storage key/origin are unchanged; actual refresh/restart persistence and original-to-migrated continuity are recorded in the latest comparison. Production routing is a future deployment decision.

## Known limitations and acceptance

Existing tooltip.tsx sourcemap warning occurs in both production builds; no protected-source fix was attempted. The original-browser follow-up records an Add task project-selection quirk; fixes are deferred. Local macOS, Linux-container and hosted Ubuntu/x64 execution pass; hosted macOS remains unverified. The original native fixture is exported, and same-origin persistence plus expanded functional observations are recorded. Fixture restoration, a complete paired screenshot/network matrix, date editing and full mobile replay remain outstanding. In-app engine/timezone are not certified; screenshots do not establish pixel equivalence.

Automated results and guide readiness do not establish human acceptance. Start with the dashboard/navigation checkpoint above and report your observations in this chat.

## Ticket 01 follow-up checkpoint

See [original-browser follow-up](migration-evidence/baseline-browser-followup.md) for actual 2026-10-21 observations, reproduction actions, preflight artifacts and exact gaps. The original dev/preview routing criterion is now supported; the controlled-profile/fixture and complete functional-evidence criteria remain unchecked. Actual in-app measurements were scale **1**, not the scale-2 target above. No migrated browser comparison was performed in that earlier follow-up. Subsequent native profile/fixture export and in-app original/migrated observations are recorded below; the next controlled action is to verify restoration of the supplied fixture. Human evaluation remains pending.

## 2026-10-22 evidence and evaluation checkpoint

The [latest browser comparison](migration-evidence/browser-comparison-22.md) supersedes earlier “persistence unobserved” notes: original browser-local project/task/profile/theme state loaded after switching to migrated development at the same origin, and migrated changes survived refresh and restart. Development and built-preview direct-route/refresh matrices were exercised on both builds. Task/project deletion and cancellation, cascade preservation of all eight unrelated seed tasks, all filter controls/options, three identical sort orders, demo entry, themes and mobile drawers are recorded feature by feature. These observations do not establish complete controlled equivalence: native fixture restoration, paired screenshot/network capture, date-field editing and full mobile replay remain pending.

[Hosted-platform evidence](migration-evidence/hosted-validation.md) now establishes Ubuntu/x64 success. Hosted macOS was cancelled before execution; a retry remains queued in the recorded snapshot. Local macOS and Linux-container passes remain separately recorded.

| Ticket | Latest checkpoint | Next action / remaining boundary |
| --- | --- | --- |
| 01 | Dedicated native profile and exported 3,014-byte original fixture; additional original functional observations | Restore/export fixture round trip; complete original screenshot/network matrix. Two criteria remain unchecked. |
| 02 | Existing removal inventory; corrected ticket evidence links | Review original inventory against retained original checkout. No new removal work. |
| 03 | Remaining existing-data/routing criterion completed | `pnpm dev:web`; inspect Overview and seed project routes. Controlled visual comparison belongs to the remaining browser work. |
| 04 | Existing actual HTTP smoke/independent startup evidence unchanged | `pnpm dev:api`, then curl localhost:8080/api/healthz. |
| 05 | Existing dev/preview HTTP matrix and preservation audits unchanged | Capture ordinary user-flow network traffic in DevTools; no application API calls expected. |
| 06 | Hosted Ubuntu/x64 pass; macOS cancellation/retry queued | Inspect the linked Foundation job when a hosted macOS runner executes it. No hosted macOS pass claimed. |
| 07 | Persistence criterion completed; expanded functional comparison | Finish controlled fixture, screenshots/network, date editing and mobile replay before completing remaining grouped criteria. |
| 08 | Evidence/handoff reconciled with current observations | First action below; report observations. Human acceptance pending. |

All evaluation servers were stopped. First action from the migrated repository: `pnpm dev`, then open http://localhost:21998/ in **TaskFlow evaluation 2026-10-21**. Restore the supplied native fixture through DevTools and verify the Overview checkpoint (Maya Chen, 6 open, 3 in progress, 2 completed, 25%) before further edits. Export the restored storage value and compare its SHA-256 with `bf7670d7fcec2f772f0c79f833438a1b9e95fd3df4f319df92fb4887a655e5f8`. This is a remaining evaluation action, not an additional approval gate for implementation.
