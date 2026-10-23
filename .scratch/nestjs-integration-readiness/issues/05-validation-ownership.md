# Assign validation ownership across forms, domain rules and external data

Status: open
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow NestJS Integration Readiness — decision map](../map.md)
Assignee: unassigned
Blocked by: 03

## Question

Which layer owns each kind of validation, and what needs to be agreed now for future API input/output while local behavior stays intact?

Separate user-facing form feedback, domain invariants, stored-data validation, transport validation and authoritative server rejection. Use whitespace-only names, nonexistent project assignment, optional-field clearing, malformed dates and a server rejecting a form-valid request as scenarios.

Include the boundary between a local demo profile and a real account/profile when authentication is enabled; transport/account enforcement details belong to later backend work.

Decide where duplicate checks are intentional, how field and operation errors reach callers, and whether sharing types or executable schemas is justified. Identify existing checks that can remain unchanged, any minimum ownership clarification or preparation, and server enforcement deferred to backend work. A trusted TypeScript type alone does not settle how external data is checked.

## Existing evidence

Full-workspace validation is in validation.ts; shell/auth/settings perform form checks. Transitions normalize some text but do not independently enforce all invariants. Existing stored-data validation protects local recovery behavior and is not already an API response contract.

Source paths: `apps/web/src/workspace/`, `apps/web/src/app/workspace-shell.tsx`, `apps/api/src/app.module.ts`, `docs/architecture/frontend.md`, and `docs/testing/e2e-coverage-hardening-audit.md`. These are inspected facts, not approved architectural answers.

## Resolution requirements

Human-in-the-loop decision. Use grilling and domain-modeling; ask the live user, do not substitute their answers. Record alternatives, trade-offs, retained behavior, preparation if needed, deferrals and verification implications. Explicit user approval is required before resolution. Keep implementation tickets and application changes outside this map.

## Prerequisites

- [Define the frontend-facing contract needed for incremental API integration](03-api-contract.md)
