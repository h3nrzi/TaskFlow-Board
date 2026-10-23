# 06: Verify phase-wide reliability and finalize evaluation evidence

**What to build:** A trustworthy final account of protected MVP journeys, unresolved blockers, and repeatable suite reliability at the final reviewed revision.

**Blocked by:** 02 — Harden task lifecycle and cross-surface consistency; 03 — Harden project lifecycle, cascade boundaries, and empty-workspace journeys; 04 — Harden discovery, navigation, and local profile workflows; 05 — Harden browser-local safeguards and interaction reliability.

**Status:** ready-for-agent

- [ ] Reconcile every required journey in the audit matrix with current test references, classification, disposition, and executed verification or an explicit blocker. Explain deferrals; do not use them to conceal required missing coverage.
- [ ] Preserve useful existing assertions and justified skips, and confirm that no product code, application architecture, dependency/framework, or backend integration entered the change.
- [ ] At the same final application/test/configuration revision and equivalent environment, record three consecutive passing full frontend runs across all six configurations at normal three-worker concurrency and zero retries. Supply one run through the final full repository check and two through full frontend runs; execute browser invocations sequentially.
- [ ] Record each command, revision, environment, result, duration, failure, and skip reason. A failure breaks the consecutive sequence. Material application/test/configuration changes require a new sequence; documentation-only evidence updates do not change the tested implementation.
- [ ] Investigate intermittent failures; failed-test or serial-worker reruns do not count as the required evidence. Do not weaken assertions, add silent skips, or change expected product behavior to obtain passes.
- [ ] Complete the existing full repository check, including dependency audit, typechecks, builds, and existing API/tooling regressions. This authorizes no backend implementation. Repeat checks only when failures or subsequent changes justify doing so.
- [ ] Complete required review and resolve actionable in-scope findings. If resulting edits affect the tested implementation, establish final verification on that updated revision.
- [ ] Consolidate ticket-specific evaluation guidance without erasing earlier checkpoints. Include reproducible feature-by-feature steps, actual preflight evidence, a concrete first action, and pending user-observation fields. Automated passes and guide readiness do not establish human acceptance.
- [ ] Report known limitations, coverage decisions, and product-defect blockers truthfully. Preserve correct failed expectations and explicitly blocked journeys; unresolved blockers prevent a clean passing completion claim.
- [ ] State the actual phase completion status without inferring NestJS integration readiness or beginning backend work.
