# Hosted Foundation workflow evidence

Checked 2026-10-22 (Asia/Tehran). Executable revision: `4a0c61101e37cd28900908ac464924d0c8f5eaf3`, branch `codex/foundation-validation`. The branch was pushed to execute the previously unrun workflow. Application source, tooling, manifests, lockfile and workflow have not changed since that revision; subsequent local work records evidence only.

Run: [Foundation 39647858579](https://github.com/h3nrzi/TaskFlow-Board/actions/runs/39647858579). Current recorded job/step snapshot: [hosted-actions.json](hosted-actions.json). First attempt: [hosted-attempt-1.json](hosted-attempt-1.json).

| Platform | Actual result | Evidence |
| --- | --- | --- |
| Hosted Ubuntu x64 | **Pass** on Ubuntu 24.04.5 LTS, image ubuntu-24.04 / 20261012.334.1, Node 24.22.0, pnpm 10.11.0. Fresh shallow checkout, frozen install, 66 protected files, 228 dependency snapshots, both typechecks/builds, actual HTTP health smoke and all three workflow tests pass. | [First job](https://github.com/h3nrzi/TaskFlow-Board/actions/runs/39647858579/job/119388080219), [complete normalized log](hosted-linux.log). Ubuntu also reports success in the retry snapshot. |
| Hosted macOS | **Not passed.** First job was cancelled without executing workflow steps. One retry was requested; it was also cancelled with zero workflow steps. The run is complete with an overall failure conclusion; Ubuntu passed. The available evidence does not establish the cancellation cause or runner availability. | First attempt JSON and current snapshot. Do not substitute the separate local macOS pass. |
| Local fresh macOS arm64 | Previously passed with pinned versions, recorded separately. | [Final validation](final-validation.md), fresh-macos.log. |
| Fresh Linux arm64 container | Previously passed on Debian bookworm, recorded separately from hosted Ubuntu/x64. | [Final validation](final-validation.md), fresh-linux.log. |

The first hosted Ubuntu install used no cache and downloaded the locked packages. The source/dependency checks work with checkout depth 1 and no local baseline state. Existing tooltip sourcemap output remains a non-failing build warning. GitHub also reports that the existing v4 actions' Node 20 action runtimes are forced onto Node 24; application commands use the explicitly pinned Node 24.22.0 and pass. No unrelated workflow or dependency upgrade was introduced.

Reproduce through the Foundation workflow on the published branch, or inspect the linked run. On a fresh local clone with Node 24.22.0/pnpm 10.11.0, run:

```sh
pnpm install --frozen-lockfile
pnpm verify:frontend
pnpm verify:dependencies
pnpm typecheck
pnpm build
pnpm test
```

First concrete action for ticket 06: open the linked run and inspect the cancelled macOS jobs and obtain a new hosted execution; save its versions, installation/check output and conclusion separately. Ticket 06's grouped execution criterion stays unchecked until hosted macOS execution is evidenced. Human acceptance remains pending.
