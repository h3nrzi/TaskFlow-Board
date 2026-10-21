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

Fresh-checkout-safe checks and macOS/Linux Actions workflow delivered. macOS fresh-clone result is recorded in final-validation.md; Linux and Actions execution pending.

See [evaluation guide](../../../../docs/migration-evaluation.md) for this ticket’s reproducible checkpoint and first action. Human evaluation remains pending until observations are reported.
