# Frontend architecture implementation map

## Notes

Integration branch: codex/frontend-architecture
Baseline: 4cca4b6a61a1e8c74efc85a72c174cadb7e35c08
Spec: [spec.md](spec.md)
Task graph: 01 → 02 → 03 → 04. Each extraction lands integrated and validated before the next.

## Decisions-so-far

Q1–Q7 approved in chat. Scope, state lifetimes, existing regression seam, and ticket sequence are settled. Full repository-check baseline passed on 2026-10-22 before implementation: pnpm check exited 0; browser suite 129 passed / 3 existing mobile unload-prompt skips; dependency audit 297 retained snapshots; typecheck/build passed; API 1 passed; workflow/tooling 3 passed. Log: /tmp/taskflow-architecture-baseline.log. Implementation and human acceptance are tracked separately.

## Fog

No unresolved design decisions. Discoveries outside architecture scope are recorded, not fixed. Human evaluation remains Pending.
