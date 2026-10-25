# 03: Confirm mailbox ownership and enter restricted enrollment

**What to build:** The mailbox owner opens a safe verification link, explicitly confirms it and sees restricted enrollment state without being signed in.

**Blocked by:** [02: Register a pending account and deliver verification mail](02-pending-account-registration.md).

Status: ready-for-agent

- [ ] GET/HEAD, scanners, hydration and prefetch do not consume proof; fragment handling and explicit protected confirmation follow the approved link and secrecy requirements.
- [ ] Confirmation atomically validates account binding, purpose, expiry and single use, consumes the proof, invalidates siblings and issues the approved restricted enrollment authority.
- [ ] Enrollment read and its HEAD counterpart report only allowed metadata and enforce the exact anonymous/enrollment/authenticated context distinctions; restricted authority cannot access Profile or Workspace.
- [ ] Browser states cover pending, rejected and lost confirmation responses with authoritative state observation and safe uncertainty; never infer failed consumption or replay automatically.
- [ ] Prove expiry edges, sibling/parallel redemption and interruption/restart with actual persistence, plus real browser cookie/context enforcement.
- [ ] Implement this as a complete vertical slice through applicable shared contracts, catalog/OpenAPI bindings, authoritative API/persistence, UI and observable tests. Carry all exact requirements from the controlling sources; summaries and story mappings are not exhaustive waivers.
- [ ] Run required repository checks and code review appropriate to the change. Record actual preflight revision/configuration, commands, outcomes, evidence and limitations; simulations do not prove authoritative security or durability.
- [ ] Before handoff in the implementation chat, supply reproducible setup/reset commands, isolated fixtures, feature-by-feature actions/expected outcomes and the first concrete action below. Leave human observations not evaluated until reported; automated passes do not establish acceptance.

## Scope and evaluation

Primary spec stories: 10–13, 17, 55.

First concrete evaluation action: Open an isolated verification link, confirm that opening alone changes no authority, explicitly confirm, and inspect restricted enrollment status.

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
