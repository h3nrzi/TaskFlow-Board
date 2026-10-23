# Choose the minimum persistence boundary for local and future remote operation

Status: open
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow NestJS Integration Readiness — decision map](../map.md)
Assignee: unassigned
Blocked by: 01

## Question

Given the approved integration unit, where should state ownership, domain operations and persistence meet, and does the existing separation already provide enough of a seam?

Compare retaining current responsibilities, a narrow capability seam, and a broader abstraction only where a concrete need justifies it. Establish the meanings of in-memory application, durable local save and confirmed remote operation without equating them. Decide whether anything must be prepared before a remote adapter exists, and what remains local-only.

Account for load/empty/demo-data behavior, workspace snapshots versus resource operations, cross-tab conflicts, failed writes, recovery export and unsaved-work protection. State which browser-local safeguards remain unchanged and which remote questions require a distinct contract. Identify any need for an interface without assuming an adapter, repository or cache implementation.

## Existing evidence

use-workspace.ts owns React state and explicit operations. Pure transitions are separate from browser code. use-workspace-persistence.ts writes the whole workspace after state changes, with byte comparison, cross-tab locking, failure reporting and unload protection. browser-storage.ts validates reads and preserves recovery data.

Source paths: `apps/web/src/workspace/`, `apps/web/src/app/workspace-shell.tsx`, `apps/api/src/app.module.ts`, `docs/architecture/frontend.md`, and `docs/testing/e2e-coverage-hardening-audit.md`. These are inspected facts, not approved architectural answers.

## Resolution requirements

Human-in-the-loop decision. Use grilling and domain-modeling; ask the live user, do not substitute their answers. Record alternatives, trade-offs, retained behavior, preparation if needed, deferrals and verification implications. Explicit user approval is required before resolution. Keep implementation tickets and application changes outside this map.

## Prerequisites

- [Choose the unit and ownership rules for progressive integration](01-progressive-integration-boundary.md)
