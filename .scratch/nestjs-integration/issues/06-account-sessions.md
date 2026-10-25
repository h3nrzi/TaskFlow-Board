# 06: Sign in, restore session state and sign out

**What to build:** An active owner signs in, sees authoritative account/session state after reload and signs out only the initiating session while Workspace remains local.

**Blocked by:** [04: Complete owner-controlled enrollment](04-owner-enrollment.md).

Status: ready-for-agent

- [ ] Sign-in accepts only eligible active accounts through the exact password and anonymous Origin/CSRF context; session establishment/rotation and cookie handling use the approved contracts.
- [ ] Session GET/HEAD distinguish reliably unauthenticated state from dependency failure, malformed output and restricted/conflicting credentials; no lower-context fallback.
- [ ] Confirmed sign-out durably revokes the initiating session, including copied credentials; independent sessions remain valid. Lost or rejected results remain explicit.
- [ ] The shell derives account identity from server context, isolates late responses by account and prevents local profile/snapshot saves from overwriting connected identity. Local Workspace and theme retain their own authority.
- [ ] Enforce session validity and absolute/inactivity deadlines on every applicable request from the outset; prove actual cookie, concurrency, abuse and restart behavior. Ticket 07 adds foreground renewal and complete expiry UX.
- [ ] Implement this as a complete vertical slice through applicable shared contracts, catalog/OpenAPI bindings, authoritative API/persistence, UI and observable tests. Carry all exact requirements from the controlling sources; summaries and story mappings are not exhaustive waivers.
- [ ] Run required repository checks and code review appropriate to the change. Record actual preflight revision/configuration, commands, outcomes, evidence and limitations; simulations do not prove authoritative security or durability.
- [ ] Before handoff in the implementation chat, supply reproducible setup/reset commands, isolated fixtures, feature-by-feature actions/expected outcomes and the first concrete action below. Leave human observations not evaluated until reported; automated passes do not establish acceptance.

## Scope and evaluation

Primary spec stories: 6–8, 15–17, 19–20, 42–43.

First concrete evaluation action: Sign in using an activated fixture, reload, sign out one of two sessions and confirm the other remains valid; interrupt session inspection and observe explicit failure.

Implementation evidence: not run. Human implementation evaluation: not evaluated.

The approved breakdown separates development integration from supported capability activation. Before the relevant activation ticket, incomplete capabilities remain confined to explicit development/test configurations; unimplemented mutations are unavailable and never fall back to local authority. Implement applicable security and durability with each operation, not as a later hardening phase.

## Controlling sources

- [Consolidated approved spec](../../nestjs-integration-readiness/spec.md)
- [Readiness disposition](../../nestjs-integration-readiness/design/readiness-disposition.md)
- [Architecture Blueprint](../../nestjs-integration-readiness/design/api-architecture-blueprint.md)
- [Endpoint Catalog](../../nestjs-integration-readiness/design/endpoint-catalog.md)
- [Shared Schema-First contracts](../../nestjs-integration-readiness/design/shared-schema-contracts.md)
- [Schema tooling and safeguards](../../nestjs-integration-readiness/design/shared-schema-tooling.md)
- [OpenAPI specification](../../nestjs-integration-readiness/design/openapi-specification.md)
- [OpenAPI examples/counterexamples](../../nestjs-integration-readiness/design/openapi-examples.md)
- [Domain requirements](../../nestjs-integration-readiness/design/frontend-facing-contract.md)
- [Async operation policy](../../nestjs-integration-readiness/design/async-operation-policy.md)
- [Validation policy](../../nestjs-integration-readiness/design/validation-policy.md)
- [Account email scope](../../nestjs-integration-readiness/design/account-email-scope.md)
- [Testing strategy and evaluation worksheet](../../nestjs-integration-readiness/design/integration-testing-strategy.md)

Later explicit approvals control over historical deferrals. Follow the testing strategy’s per-capability applicability and full checkpoint/runtime-rule mappings. Choose only justified concrete implementation details when needed, verify current library documentation as required by project instructions, and preserve all approved protocol and product guarantees.

## Comments

2026-10-25: The user approved the eighteen-ticket breakdown, granularity and blocking edges in the originating chat. Published as implementation planning; no implementation started and the parent spec/readiness decisions remain unchanged.
