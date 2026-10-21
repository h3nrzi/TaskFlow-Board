# 01: Capture the original frontend baseline

**What to build:** A reproducible record of the original frontend, its protected files, dependency resolutions, and observable behavior so the migration can be evaluated against evidence rather than assumptions.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [x] Record the original revision, starting worktree state, installed toolchain versions, and actual baseline install, typecheck, build, and startup results. Use the spec's inspected revision as the preservation reference and explain any discrepancy.
- [x] Inventory every protected frontend source file, stylesheet, public asset, and HTML entry with byte-level comparison information; include assets referenced outside the frontend directory. Prepare for explicit original-to-relocated path mapping without omissions or deletions.
- [x] Capture locked direct and transitive frontend dependency resolutions for later comparison.
- [x] Run the baseline without protected-source edits. If execution needs configuration-only accommodations, retain their exact diff and the original blocker. If execution remains blocked, leave behavioral equivalence unverified.
- [ ] Use a dedicated evaluation browser profile; record browser version, OS, viewport, device scale, timezone/date, font readiness, and a restorable browser-local data fixture. Preserve the evaluator's personal browser data.
- [ ] Record screenshots, console/network observations, and reproducible outcomes for dashboard/navigation, project and task CRUD, board status movement, search and all visible filters, settings/profile, demo login/signup, themes, desktop/mobile layouts, validation, notifications, empty/no-match states, deletion cancellation/cascade, and persistence after refresh and same-origin restart.
- [ ] Record direct navigation, refresh, unknown-route behavior, and built-preview observations. Identify unsupported or blocked checks explicitly.
- [x] Document existing defects separately and defer fixes. Prepare a feature-by-feature evaluation handoff with actual preflight evidence and a first concrete evaluation action; human acceptance remains pending.

## Implementation evidence

Baseline artifacts delivered; full browser fixture/feature coverage remains incomplete after concurrent native-browser changes. See baseline-browser.md.

See [evaluation guide](../../../../docs/migration-evaluation.md) for this ticket’s reproducible checkpoint and first action. Human evaluation remains pending until observations are reported.
