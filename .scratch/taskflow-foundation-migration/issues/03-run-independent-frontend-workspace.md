# 03: Run the preserved frontend in an independent workspace

**What to build:** The original frontend runs from its agreed location in an independently usable pnpm workspace, retaining its source and behavior while obsolete infrastructure and platform assumptions are removed.

**Blocked by:** 01 — Capture the original frontend baseline; 02 — Audit obsolete infrastructure and removal dependencies.

**Status:** ready-for-agent

- [x] Relocate the frontend to the agreed web application location with its own manifest and configuration. Keep one root lockfile and discoverable root development, build, and check commands, without another orchestrator or speculative shared packages.
- [x] Pin compatible Node 24 and pnpm versions. Frozen-lockfile installation, frontend typechecking, and builds work independently of Replit; correct native-dependency restrictions for macOS/Linux and audit installation hooks/artifacts.
- [x] Verify every protected file byte-for-byte against the original revision using a complete original-to-new path mapping. Do not format, rewrite imports, delete components, or fix protected-source defects.
- [x] Preserve locked direct/transitive frontend resolutions wherever compatible; review the dependency graph and lockfile and explain every unavoidable change. Defer general upgrades and aggressive unused-dependency pruning.
- [x] Remove the audited obsolete infrastructure and its workspace, build, script, configuration, and dependency references while preserving repository agent tooling and guidance.
- [x] Development and built preview work without environment files or Replit-injected settings, bind locally, default to http://localhost:21998/ with base /, support documented port overrides, and fail clearly when the requested port is occupied. Preview may reuse the development port when development is stopped.
- [ ] Verify asset loading, styling, direct route navigation, refresh, unknown frontend routes, and existing browser-local persistence at the same origin, without introducing cross-origin data transfer.
- [x] Record actual command and browser evidence and any baseline defects or unresolved preservation conflicts. Complete a reproducible feature-by-feature evaluation handoff with a first concrete action; human acceptance remains pending.

## Implementation evidence

Workspace delivered; preservation and command/build checks pass. Full browser visuals and persistence remain unverified.

See [evaluation guide](../../../../docs/migration-evaluation.md) for this ticket’s reproducible checkpoint and first action. Human evaluation remains pending until observations are reported.
