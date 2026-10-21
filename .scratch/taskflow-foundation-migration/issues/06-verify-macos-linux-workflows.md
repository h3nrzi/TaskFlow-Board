# 06: Verify fresh-checkout workflows on macOS and Linux

**What to build:** Maintainers can reproduce the documented foundation checks from fresh checkouts on both supported operating systems, with separate execution evidence and GitHub Actions coverage.

**Blocked by:** 04 — Run the NestJS health application independently.

**Status:** ready-for-agent

- [ ] Add GitHub Actions coverage for macOS and Linux using the pinned Node and pnpm versions, fresh-checkout frozen-lockfile installation, typechecking, builds, protected-file verification, and the actual backend HTTP smoke test.
- [ ] Make the preservation reference and relocation mapping available to the check in a fresh checkout; do not rely on untracked local baseline files or unavailable Git history.
- [ ] Run the documented workflow from fresh checkouts on macOS and Linux and record commands, versions, results, and GitHub Actions evidence separately. One platform's pass does not establish the other's.
- [ ] If CI execution or a platform is unavailable, record the exact limitation and leave its execution result pending; workflow creation alone is not passing evidence.
- [ ] Verify the checks require no Replit credentials, injected settings, database, or frontend process for the backend smoke test. Do not introduce lint/format requirements that force protected-source changes.
- [ ] Provide reproducible platform evaluation steps, actual preflight/check evidence, outstanding failures, and the first concrete action; human acceptance remains pending.
