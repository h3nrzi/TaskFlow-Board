# Research password and cookie-session contract security

Status: resolved
Type: research
Labels: wayfinder:research
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: Codex research agent (password-cookie evidence)
Blocked by: none

## Question

What current primary-source requirements and trade-offs constrain the approved email/password authentication with opaque server-managed cookie sessions? Gather precise evidence for password length/Unicode/blocklist/storage without choosing libraries; host-only protected cookie attributes and same-origin versus cross-origin contract constraints; effective CSRF protection including login/public lifecycle endpoints and token bootstrap/rotation; restricted verification/enrollment credential transport and leakage controls; and HTTP method/status/header considerations for deletion preconditions and deliberate creation recovery.

Distinguish standard requirements, source recommendations and TaskFlow product choices, especially numeric abuse limits. Preserve the approved authentication lifecycle, explicit sign-in, 30-minute inactivity/24-hour absolute sessions, read-only registered email and no active-account recovery. Do not select infrastructure, libraries, deployment topology or new product scope. Link a single source-backed findings asset and resolve evidence only; catalog choices still require the user.

## Answer

Resolved on 2026-10-24 as external evidence only. [Password and cookie-session contract security evidence](../design/password-cookie-security-evidence.md) distinguishes final NIST password requirements, OWASP recommendations, browser/HTTP semantics, and TaskFlow product choices. It covers Unicode/blocklist/storage capability requirements, protected host-only cookies, login/pre-session CSRF and bootstrap/rotation, restricted enrollment leakage controls, DELETE header/body trade-offs and safe creation recovery.

The HTTP evidence cautions against DELETE request bodies; standard If-Match brings strong ETag/conditional semantics requiring explicit reconciliation with TaskFlow's deletion privacy contract. The current IETF idempotency draft is **-08**, published 2026-10-22: a work in progress whose retry wording differs from expired -07. Exact replay, seven-day full outcomes and permanent minimal consumed-key markers remain explicit TaskFlow product guarantees, not inferred standards. No password library, store, ORM, provider, deployment or catalog choice was selected. **Design the MVP Endpoint Catalog** remains human-owned and unresolved.

Context: isolated [research/password-cookie-security-evidence branch](https://github.com/h3nrzi/TaskFlow-Board/tree/research/password-cookie-security-evidence), committed and pushed at `bd6030eecb6b15b54ff9943e038080b1bd9804fe`; no PR, never merge. [Immutable evidence asset](https://github.com/h3nrzi/TaskFlow-Board/blob/bd6030eecb6b15b54ff9943e038080b1bd9804fe/.scratch/nestjs-integration-readiness/design/password-cookie-security-evidence.md). Local worktree: `/Users/hossein/.codex/worktrees/password-cookie-security-evidence/TaskFlow-Board`.

Preflight: tracker/domain/map and prior research conventions read; ticket claimed before investigation; primary sources retrieved; documentation whitespace check passed; isolated worktree clean after successful push. No production code/dependencies, build, runtime or security tests. The asset includes feature-by-feature documentary review and later verification checkpoints. First review action: compare DELETE precondition transports against the approved concealment behavior before advancing the catalog. Human evaluation remains pending.
