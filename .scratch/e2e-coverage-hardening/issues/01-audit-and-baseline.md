# 01: Establish the journey audit matrix and execution baseline

**What to build:** A traceable account of which completed MVP journeys are protected, which need hardening, and what the unchanged suite actually does in the fresh implementation environment.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [x] Read the approved specification and handoff. Reinspect checkout, runtime, browser availability, configuration, and existing evaluation evidence without overwriting user changes.
- [x] Before test/configuration edits, run and record a fresh full frontend baseline with all six configurations, normal three-worker concurrency, zero retries, and the production build/preview default. Record revision, environment, command, results, failures, and skip reasons; distinguish prerequisites that prevent a run from test failures.
- [x] Audit every existing MVP journey against actual application behavior and established documentation, including all coverage areas in the approved specification. Existing evidence is not sufficient merely because a test title names the journey.
- [x] Publish a durable journey-to-test matrix with stable journey identifiers, behavioral contracts, existing test references, assertion quality, gaps/risks, priority, disposition, classification, verification evidence or blocker, and ownership across tickets 02–06.
- [x] Distinguish user-facing contracts, browser-local storage safeguards, and fixture setup dependencies, including mixed cases. Use preserve, strengthen, add, or defer with a reason; do not silently defer required coverage.
- [x] Assess missing coverage, weak assertions, conditional omissions, excessive coupling, multi-step gaps, duplication, and suspected reliability risks. Prioritize lost work and incorrect state before navigation, accessibility, and presentation risks.
- [x] Preserve useful existing coverage. Treat source inspection and historical failures as distinct from current execution evidence; do not label a suspected risk a confirmed flake.
- [x] Record any exposed product defect separately with the correct expectation, reproduction/evidence, affected journey, and explicit blocker. Do not change product code or weaken/skip expectations.
- [x] Complete the required review and prepare this ticket's evaluation guidance, actual preflight evidence, and concrete first action. Leave human observations pending.

## Completion boundary

This ticket establishes the inventory and baseline evidence; it does not certify hardening complete. A baseline with failures may be recorded truthfully and triaged without pretending it passed. Product blockers remain attached to affected journeys and cannot be erased by completing the audit document.

## Implementation checkpoint

Audit and unchanged production baseline recorded in `docs/testing/e2e-coverage-hardening-{audit,evaluation}.md`. Baseline: 222 passed, six intentional mobile skips, 1.8m. Typecheck passed. Two-axis review: Standards 0; Spec 1 documentation finding fixed. Human evaluation pending.
