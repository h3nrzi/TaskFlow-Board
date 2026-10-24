# Choose the unit and ownership rules for progressive integration

Status: resolved
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: Codex (current wayfinder session)
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

## Comments

### User-approved constraints — 2026-10-23

- One logical workspace: retain the current localStorage-based workspace during progressive NestJS development/testing, then switch the existing frontend workspace when backend persistence is ready. No separate Local/Connected Workspaces or workspace switcher.
- Browser storage is authoritative before transition; NestJS is authoritative for workspace reads and writes afterward. No independent mixed local/remote authorities.
- Connected operation failures must surface errors and preserve user input for retry; no silent localStorage fallback.
- Existing browser workspace data is disposable development/test data. No migration, import/export, offline synchronization or preservation mechanism is required for this transition. This does not request removal of existing local MVP export/recovery behavior.

The ticket remains claimed while transition readiness, activation and profile/theme/demo authentication ownership are clarified. These constraints are approved answers, not approval of recommendations from the next discussion round.


## Answer

### Approved choice — explicit user approval on 2026-10-23

The user's final approval supersedes the earlier whole-workspace transition interpretation in Comments and the proposed separate local/connected workspaces. The integration unit is a backend module's corresponding frontend functionality, constrained by dependencies and consistent ownership of tightly coupled data domains.

- Keep one logical workspace; introduce no Local/Connected workspaces or workspace switcher.
- Develop and test NestJS modules incrementally. Integrate and verify each ready module's frontend functionality before proceeding where dependencies permit. Do not wait for the entire backend. Real authentication may replace demo authentication while tasks/projects remain browser-local.
- Each tightly coupled data domain has one authoritative source for reads and writes: browser storage before its integration, NestJS afterward. Never split project deletion and its task cascade across independent authorities. This does not require unrelated domains to transition together.
- Associate profile data with the future real user account in NestJS. The current demo profile is not an authenticated identity. Replace demo login/signup when the real authentication module is ready; keep theme a browser-local preference for now.
- Activate each integration intentionally through developer-controlled configuration or a release change. No automatic availability detection, silent localStorage fallback, or silent return to demo behavior. Connected failures surface errors and preserve user input for retry.
- Existing browser data is disposable development/test data. This transition requires no migration, import/export, preservation mechanism or offline synchronization.

### Alternatives and trade-offs

Separate local/connected workspaces and a workspace switcher were rejected. A whole-backend completion gate was rejected in favor of module-by-module frontend verification. Independent local/remote ownership within a coupled workflow and silent fallback were rejected because they obscure authoritative state. Module-level activation permits mixed readiness across distinct domains, with dependency and ownership checks required before each increment.

### Retained behavior

Keep the current browser-local MVP operational independently of NestJS in its local development configuration. Preserve task/project semantics, including standalone tasks and project deletion cascade, plus existing field/date behavior and state lifetimes. Existing local export/recovery behavior is not removed by the absence of a transition transfer requirement. Demo flows remain until deliberately replaced by their ready backend module; connected configurations do not promise backend-independent authentication.

### Minimum preparation and documentation-only outcome

This ticket defines ownership, activation and verification constraints only; it requires no application change now. The minimum persistence seam, frontend-facing contracts, validation and asynchronous operation preparation remain decisions in their existing dependent tickets. No adapter, repository, shared schema package, cache or optimistic update policy is selected.

### Deferred work and triggers

Choose exact activation/configuration mechanics and development order during separate implementation planning. Design real account/authentication and persistence systems during their backend integration work. Determine the frontend-facing account/profile and authentication failure contracts in the existing contract/validation/async decisions. Theme stays local for now; revisiting that ownership requires a future requirement. No concrete first backend module is required to resolve this boundary decision.

### Verification implications

Before expanding an increment, verify the ready module and its corresponding frontend workflow together, its dependencies, and one authority for every coupled operation. Exercise the explicitly permitted real-authentication/local-task-and-project combination when that increment is implemented. Confirm connected failures show errors, preserve input and never invoke local/demo fallback. Confirm local development configuration remains usable with NestJS stopped. Detailed evidence and completion policy remain with the existing async and testability decisions; historical E2E passes do not prove these integrations.

### Consistency review and handoff

Reviewed the map and all eight child tickets. Updated downstream framing for per-domain authority, account/profile ownership, explicit module activation and disposable development data. Retired the transfer-policy ticket as out of scope; its resolved status is a scope closure, not a second decision worked in this session. Remaining precise frontend contract/behavior questions fit existing tickets; no new child is needed.

Preflight: read all map/child Markdown files; the only pre-existing tracked change reported by git status was this claimed ticket. This session changes planning Markdown only. No application tests, builds or runtime checks were run or claimed. Verification passed: git diff --check; all local Markdown link targets exist; all dependency references exist; this ticket and the scope-retired transfer ticket are resolved; the transfer blocker was removed from the testability decision. The unclaimed frontier is the persistence-boundary decision followed by the frontend-facing contract decision.

Review guide (documentation, not implemented feature acceptance):

1. Read Approved choice and confirm one logical workspace with incremental module integration; no whole-backend gate.
2. Trace the authentication-ready/tasks-local example against profile and theme ownership.
3. Trace project deletion and task cascade: both must use one authority; no silent fallback on failure.
4. Follow the map to the remaining persistence and contract decisions; verify transfer work is excluded.

First concrete action: review this Answer, then resume Wayfinder with the map to work **Choose the minimum persistence boundary for local and future remote operation**, the next frontier ticket. The architectural choices above are explicitly approved; evaluation of any future implemented integration remains pending user observations.
