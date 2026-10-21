# 01: Capture the original frontend baseline

**What to build:** A reproducible record of the original frontend, its protected files, dependency resolutions, and observable behavior so the migration can be evaluated against evidence rather than assumptions.

**Blocked by:** None (can start immediately).

**Status:** ready-for-human

**Implementation:** Partial — source/dependency and original development/preview routing captured; controlled profile/fixture and complete functional evidence remain blocked by available browser capabilities.

- [x] Record the original revision, starting worktree state, installed toolchain versions, and actual baseline install, typecheck, build, and startup results. Use the spec's inspected revision as the preservation reference and explain any discrepancy.
- [x] Inventory every protected frontend source file, stylesheet, public asset, and HTML entry with byte-level comparison information; include assets referenced outside the frontend directory. Prepare for explicit original-to-relocated path mapping without omissions or deletions.
- [x] Capture locked direct and transitive frontend dependency resolutions for later comparison.
- [x] Run the baseline without protected-source edits. If execution needs configuration-only accommodations, retain their exact diff and the original blocker. If execution remains blocked, leave behavioral equivalence unverified.
- [ ] Use a dedicated evaluation browser profile; record browser version, OS, viewport, device scale, timezone/date, font readiness, and a restorable browser-local data fixture. Preserve the evaluator's personal browser data.
- [ ] Record screenshots, console/network observations, and reproducible outcomes for dashboard/navigation, project and task CRUD, board status movement, search and all visible filters, settings/profile, demo login/signup, themes, desktop/mobile layouts, validation, notifications, empty/no-match states, deletion cancellation/cascade, and persistence after refresh and same-origin restart.
- [x] Record direct navigation, refresh, unknown-route behavior, and built-preview observations. Identify unsupported or blocked checks explicitly.
- [x] Document existing defects separately and defer fixes. Prepare a feature-by-feature evaluation handoff with actual preflight evidence and a first concrete evaluation action; human acceptance remains pending.

## Implementation evidence

- Preservation reference: `ae51b1750a6a8c8ef795d6495c2f94f27d79d0be`; starting implementation revision: `f2ace8ba95606cd7dd580a76c598233caf0d01fb`. All 66 protected files matched both; [complete hashes and relocation mapping](../../../docs/migration-evidence/protected-files.json).
- Original frozen install and typecheck passed. Original build/startup failed on the excluded macOS Rollup binary. Removing native exclusions and supplying `PORT=21998 BASE_PATH=/` enabled baseline build/startup without protected-source changes; [exact accommodation patch](../../../docs/migration-evidence/baseline-accommodation.patch).
- [Original dependency graph](../../../docs/migration-evidence/frontend-dependencies.json) records direct resolutions and 228 retained frontend dependency snapshots.
- [Browser observations and limitations](../../../docs/migration-evidence/baseline-browser.md) record Chrome/macOS versions, dashboard, project form and Settings observations. Interactive evaluation stopped after concurrent Chrome changes. Successful project creation was not established.
- [Final platform validation](../../../docs/migration-evidence/final-validation.md) passed on native macOS and a Linux container. These later migration checks do not complete the original browser baseline.

See [evaluation guide](../../../docs/migration-evaluation.md) for this ticket’s reproducible checkpoint and first action. Human evaluation remains pending until observations are reported.

## Comments

2026-10-21: Reconciled this ticket with the final evidence. Keep the three browser-related criteria unchecked: no restorable storage fixture was exported; viewport/device scale, browser timezone and font readiness were not verified; feature coverage, console/network capture, browser route refresh and built-preview observations remain incomplete. Human acceptance also remains pending. `ready-for-agent` is the triage role for the remaining specified work, not a claim that this ticket is complete.

Next action: follow the evaluation guide's **First action and setup** instructions for the separate original checkout, apply the recorded accommodation, and start the original frontend at `http://localhost:21998/` with the migrated server stopped. Establish and export a dedicated profile fixture before completing the browser checklist. Record original and migrated observations separately; only check criteria supported by actual observations.

2026-10-21 follow-up: [Observed original-browser results and remaining blockers](../../../docs/migration-evidence/baseline-browser-followup.md). Used detached original `ae51b17` at `/tmp/taskflow-original-browser-01` with the existing accommodation exactly; original and migrated protected files remain 66/66 identical. In-app browser avoided shared Chrome. Measured 1440×900 and 390×844, scale 1, fonts loaded; observed project/task actions, filters, profile/theme, demo entry, mobile actions, deletion/cascade, refresh and same-origin restart. Development and original built-preview route/refresh matrices support completing the routing criterion.

The two remaining criteria stay unchecked: no certified dedicated profile, exact browser version/timezone, restorable exported storage fixture, network trace or durable full screenshot matrix; functional subchecks are explicitly listed as unverified in the follow-up. `ready-for-human` records the need for a dedicated profile with storage/DevTools access, not human acceptance. No source fixes or work on another ticket were performed. First action: create that disposable profile, start the retained original checkout using the follow-up commands, and export/restore `taskflow-store-v1` before further mutation. Human acceptance remains pending.
