# 07: Handle foreground activity and session expiry

**What to build:** Foreground interaction follows the approved renewal policy, expiry stops protected work and same-account reauthentication permits safe reconciliation.

**Blocked by:** [06: Sign in, restore session state and sign out](06-account-sessions.md).

Status: ready-for-agent

- [ ] Implement approved foreground-activity signalling/coalescing and authoritative deadline responses; passive reads, polling and background traffic never silently renew inactivity.
- [ ] At exact inactivity/absolute boundaries stop new protected mutations and require authentication; preserve admitted-work semantics and uncertainty of earlier dispatched operations.
- [ ] Retain only permitted originating-account in-memory drafts/status and reconcile after same-account sign-in without automatic replay; different accounts never receive prior drafts/results.
- [ ] Confirmed sign-out/discard follows approved draft lifetime while unresolved-operation tracking remains safe; browser unload warnings promise neither cancellation nor cross-reload recovery.
- [ ] Prove time edges, concurrent activity/revocation, reordered responses and expiry during pending UI work with controlled time plus actual API/browser evidence.
- [ ] Implement this as a complete vertical slice through applicable shared contracts, catalog/OpenAPI bindings, authoritative API/persistence, UI and observable tests. Carry all exact requirements from the controlling sources; summaries and story mappings are not exhaustive waivers.
- [ ] Run required repository checks and code review appropriate to the change. Record actual preflight revision/configuration, commands, outcomes, evidence and limitations; simulations do not prove authoritative security or durability.
- [ ] Before handoff in the implementation chat, supply reproducible setup/reset commands, isolated fixtures, feature-by-feature actions/expected outcomes and the first concrete action below. Leave human observations not evaluated until reported; automated passes do not establish acceptance.

## Scope and evaluation

Primary spec stories: 18, 40–43, 48.

First concrete evaluation action: Use supplied time controls to expire a session during pending work, reauthenticate the same account, then repeat with a different account and inspect isolation.

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
