# Choose the unit and ownership rules for progressive integration

Status: open
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow NestJS Integration Readiness — decision map](../map.md)
Assignee: unassigned
Blocked by: none

## Question

What is the smallest coherent unit that can move to NestJS while the browser-local MVP remains independently usable, and how will ownership be made unambiguous at each increment?

Explore capability-level, workspace/session-level and other justified boundaries without assuming per-entity switching. Consider a project deletion that also deletes tasks: if only one capability is connected, what combinations are valid? Are connected reads and writes required to share one authority? What must happen when a capability is unavailable? Distinguish an intentionally local session from a failed connected operation; automatic fallback is an unresolved choice.

Decide the integration boundary and capability selection/activation rules needed now, how an increment is verified before expansion, and which rollout details can wait. A concrete first backend capability need only be chosen if readiness depends on it. Cover tasks/projects together with profile, theme and demo authentication ownership; do not infer real accounts from local profile data.

## Existing evidence

The current Store groups projects, tasks, profile and theme. Project deletion cascades to assigned tasks. The web application currently works without NestJS; the API exposes only health checking.

Source paths: `apps/web/src/workspace/`, `apps/web/src/app/workspace-shell.tsx`, `apps/api/src/app.module.ts`, `docs/architecture/frontend.md`, and `docs/testing/e2e-coverage-hardening-audit.md`. These are inspected facts, not approved architectural answers.

## Resolution requirements

Human-in-the-loop decision. Use grilling and domain-modeling; ask the live user, do not substitute their answers. Record alternatives, trade-offs, retained behavior, preparation if needed, deferrals and verification implications. Explicit user approval is required before resolution. Keep implementation tickets and application changes outside this map.
