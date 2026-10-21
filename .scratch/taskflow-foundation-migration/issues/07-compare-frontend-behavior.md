# 07: Compare migrated frontend behavior against the baseline

**What to build:** A feature-by-feature comparison establishes what was observed to remain equivalent after migration and clearly identifies regressions, baseline defects, environmental differences, and unverified behavior.

**Blocked by:** 05 — Forward API requests through development and preview.

**Status:** ready-for-agent

- [ ] Restore the baseline fixture in a dedicated evaluation profile and match browser version, viewport, device scale, timezone/date conditions, and font readiness. Record unavoidable environmental differences and preserve personal browser data.
- [ ] Compare dashboard/navigation, project creation/editing/deletion, task creation/detail editing/deletion, board status movement, search and all visible filters, settings/profile, demo login/signup, light/dark themes, and desktop/mobile navigation and layout.
- [ ] Compare validation, notifications, empty/no-match states, deletion cancellation, project deletion cascade, and preservation of unrelated data.
- [x] Verify persistence after refresh and same-origin frontend restart, retaining the original storage key and introducing no browser-origin data transfer.
- [ ] Compare direct navigation, route refresh, unknown frontend routes, and built preview. Inspect assets, styling, console/network observations, and ordinary browser traffic for new application API calls.
- [ ] Retain reproducible actions, baseline/migrated observations, screenshots where useful, and classifications for each difference. If baseline execution was blocked, explicitly leave behavioral equivalence unverified.
- [x] Resolve migration regressions within the allowed infrastructure boundary and rerun affected checks. Defer protected-source defect fixes and surface any conflict instead of editing protected files or weakening checks.
- [x] Update the feature-by-feature evaluation handoff with actual evidence, outstanding failures, and the first concrete user action; human acceptance remains pending until the user reports observations.

## Implementation evidence

Supporting preservation/dependency/build artifact and HTTP evidence delivered. Controlled feature-by-feature browser comparison remains incomplete; no behavioral-equivalence claim.

See [evaluation guide](../../../docs/migration-evaluation.md) for this ticket’s reproducible checkpoint and first action. Human evaluation remains pending until observations are reported.

## Comments

2026-10-22 follow-up: Completed refresh/restart persistence and recorded feature-by-feature original/migrated observations, deletion/cascade outcomes, filter counts, exact matching sort orders, demo entry and mobile drawers. Controlled fixture restoration, complete paired screenshots/network capture, date editing and full mobile replay remain unverified; grouped criteria covering those gaps stay unchecked. See [browser comparison](../../../docs/migration-evidence/browser-comparison-22.md), [hosted validation](../../../docs/migration-evidence/hosted-validation.md), and [evaluation guide](../../../docs/migration-evaluation.md).
