# 08: Complete the scope review and evaluation handoff

**What to build:** A reviewer and human evaluator can assess the completed migration using a consolidated preservation/scope review and exact, evidence-backed evaluation instructions.

**Blocked by:** 06 — Verify fresh-checkout workflows on macOS and Linux; 07 — Compare migrated frontend behavior against the baseline.

**Status:** ready-for-agent

- [x] Review the final diff against the spec and architecture decisions; verify protected source, stylesheets, public assets, and HTML entry byte-for-byte using complete relocation mapping, with no omitted or deleted protected files.
- [x] Review final frontend direct/transitive dependency resolutions and the lockfile. Explain unavoidable changes and confirm no unrelated upgrades or aggressive dependency pruning.
- [x] Reconcile the removal inventory against the final repository. Confirm obsolete runtime/build/workspace/script references and operational Replit dependencies are removed while repository agent tooling and protected attribution remain intact.
- [x] Confirm scope contains only the agreed workspace, preserved frontend, health-only backend, proxy, checks, CI, and documentation: no business endpoints, database/authentication, clients, application API calls, CORS, production deployment, or speculative shared packages.
- [x] Consolidate exact toolchain versions, installation/startup/build/check commands, no-environment defaults, port overrides, occupied-port behavior, independent app startup, and development/preview proxy evaluation, including backend-stopped and alternate-target cases.
- [x] Complete the reproducible feature-by-feature evaluation guide with fixture/setup instructions, actual preflight and comparison evidence locations, baseline defects, classified differences, separate macOS/Linux and GitHub Actions results, outstanding failures, and limitations. Preserve each ticket's evaluation coverage and checkpoints.
- [x] If work changed after earlier verification, rerun affected checks so the handoff describes the final state. Do not present pending checks, unavailable platform execution, or blocked baseline comparison as passing.
- [x] Give the user an exact first startup/evaluation action and the initial dashboard/navigation checkpoint in the same-chat handoff. Keep human acceptance explicitly pending until the user reports observations; passing automation and guide readiness do not establish acceptance.

## Implementation evidence

Scope review and evaluation guide delivered with explicit outstanding checks; human acceptance pending.

See [evaluation guide](../../../docs/migration-evaluation.md) for this ticket’s reproducible checkpoint and first action. Human evaluation remains pending until observations are reported.

## Comments

2026-10-22 follow-up: Updated the per-ticket handoff, actual browser and hosted-platform evidence, remaining limitations and exact first action. Application/tooling/configuration/manifests/lockfile are unchanged. Human acceptance remains pending. See [browser comparison](../../../docs/migration-evidence/browser-comparison-22.md), [hosted validation](../../../docs/migration-evidence/hosted-validation.md), and [evaluation guide](../../../docs/migration-evaluation.md).
