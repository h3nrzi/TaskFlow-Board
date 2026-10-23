# 05: Harden browser-local safeguards and interaction reliability

**What to build:** Preserved, clearly classified local-saving safeguards and dependable browser interactions whose failures expose meaningful regressions rather than avoidable test uncertainty.

**Blocked by:** 01 — Establish the journey audit matrix and execution baseline.

**Status:** ready-for-agent

- [ ] Audit and preserve useful browser-local validation, invalid-data recovery, exact export, storage-failure, locking, unload, and cross-tab write-safety expectations. Record coverage gaps and strengthen/add only justified missing checks.
- [ ] Classify mixed UI/storage assertions and fixture setup dependencies without requiring file moves or rewriting useful tests. Retain portable reload-retention checks alongside identifiable local-specific guarantees.
- [ ] Investigate conditional checks, timing assumptions, swallowed navigation failures, immediate layout predicates, drag/geometry interactions, and long-test failure isolation using observed evidence. Distinguish confirmed flakes, deterministic regressions, environment failures, and static risks.
- [ ] Make proportionate improvements to test helpers, fixtures, locators, synchronization, boundaries, or configuration where findings justify them. Do not use arbitrary waits, increased timeouts, retries, or reduced concurrency as substitutes for causal investigation and meaningful assertions.
- [ ] Preserve meaningful nested-overlay focus/containment/restoration, cancellation, keyboard, responsive navigation/form, and supported pointer/drag behavior. Do not replace interaction assertions with superficial visibility checks or silently discard established expectations.
- [ ] Retain all six browser/viewport configurations, local timezone, production build/preview default, cosmetic-font isolation, normal three-worker concurrency, and zero retries. Preserve explicit justified mobile beforeunload and desktop-wheel skip reasons; make no physical-device or touch-scrolling certification claim.
- [ ] Coordinate overlapping interaction findings with tickets 02–04 and record ownership in the matrix. No mutual ticket dependency is implied by shared files.
- [ ] Run focused verification and typechecking, update matrix and causal evidence, complete required review, and prepare reproducible per-feature evaluation steps with actual preflight evidence and a concrete first action.
- [ ] Preserve correct expectations for discovered product defects and explicitly record affected journeys as blocked. Do not modify product code or silently skip/relax coverage to pass.

## Completion boundary

This ticket addresses local safeguard and interaction findings. Phase-wide consecutive full-suite evidence belongs to ticket 06; a serial or failed-test rerun here is diagnostic evidence only.
