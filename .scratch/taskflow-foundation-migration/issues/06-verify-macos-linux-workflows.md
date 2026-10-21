# 06: Verify fresh-checkout workflows on macOS and Linux

**What to build:** Maintainers can reproduce the documented foundation checks from fresh checkouts on both supported operating systems, with separate execution evidence and GitHub Actions coverage.

**Blocked by:** 04 — Run the NestJS health application independently.

**Status:** ready-for-agent

- [x] Add GitHub Actions coverage for macOS and Linux using the pinned Node and pnpm versions, fresh-checkout frozen-lockfile installation, typechecking, builds, protected-file verification, and the actual backend HTTP smoke test.
- [x] Make the preservation reference and relocation mapping available to the check in a fresh checkout; do not rely on untracked local baseline files or unavailable Git history.
- [ ] Run the documented workflow from fresh checkouts on macOS and Linux and record commands, versions, results, and GitHub Actions evidence separately. One platform's pass does not establish the other's.
- [x] If CI execution or a platform is unavailable, record the exact limitation and leave its execution result pending; workflow creation alone is not passing evidence.
- [x] Verify the checks require no Replit credentials, injected settings, database, or frontend process for the backend smoke test. Do not introduce lint/format requirements that force protected-source changes.
- [x] Provide reproducible platform evaluation steps, actual preflight/check evidence, outstanding failures, and the first concrete action; human acceptance remains pending.

## Implementation evidence

Fresh-checkout-safe checks and macOS/Linux Actions workflow delivered. Fresh native macOS arm64 and Linux arm64 container checks pass at 7a332e5; results are recorded separately in final-validation.md. Hosted Ubuntu 24.04.5 x64 also passes at 4a0c611; both hosted macOS attempts were cancelled before executing any workflow steps. See hosted-validation.md for the separate hosted results.

See [evaluation guide](../../../docs/migration-evaluation.md) for this ticket’s reproducible checkpoint and first action. Human evaluation remains pending until observations are reported.

## Comments

2026-10-22 follow-up: Published codex/foundation-validation at 4a0c611 to run Foundation. Hosted Ubuntu 24.04.5 x64 passed the complete workflow with Node 24.22.0/pnpm 10.11.0. The first hosted macOS job was cancelled without execution; one retry was requested and was also cancelled before executing any workflow steps. Hosted macOS success and the grouped execution criterion remain pending. See hosted-validation.md. See [browser comparison](../../../docs/migration-evidence/browser-comparison-22.md), [hosted validation](../../../docs/migration-evidence/hosted-validation.md), and [evaluation guide](../../../docs/migration-evaluation.md).
