# 02: Register a pending account and deliver verification mail

**What to build:** A prospective owner submits an email, receives the approved generic acknowledgement and can receive a verification message without gaining private-workspace authority.

**Blocked by:** [01: Establish browser security context](01-browser-security-context.md).

Status: ready-for-agent

- [ ] Registration validates and canonicalizes email under the exact shared rules and atomically maintains canonical account identity; new/pending/active eligibility is not disclosed by acknowledgements.
- [ ] Persist pending-account and issued-proof state with the approved issuance cap, expiry, retirement rules, credential secrecy and rolling abuse limits. Demonstrate concurrent requests and restart against actual persistence.
- [ ] The form handles pending, definite rejection and uncertain outcomes without claiming delivery or automatically replaying submissions; no session or account activation is granted.
- [ ] Exercise actual generated links and isolated controlled-sink receipt, suppressed issuance and delivery failures. Separately demonstrate configured transport acceptance and receiving-system receipt, recording limitations without reusable secrets.
- [ ] Record the justified persistence/transaction and outbound-provider choices required by this slice; no production credentials or personal mailbox is required for isolated evidence.
- [ ] Implement this as a complete vertical slice through applicable shared contracts, catalog/OpenAPI bindings, authoritative API/persistence, UI and observable tests. Carry all exact requirements from the controlling sources; summaries and story mappings are not exhaustive waivers.
- [ ] Run required repository checks and code review appropriate to the change. Record actual preflight revision/configuration, commands, outcomes, evidence and limitations; simulations do not prove authoritative security or durability.
- [ ] Before handoff in the implementation chat, supply reproducible setup/reset commands, isolated fixtures, feature-by-feature actions/expected outcomes and the first concrete action below. Leave human observations not evaluated until reported; automated passes do not establish acceptance.

## Scope and evaluation

Primary spec stories: 9, 11, 55–56.

First concrete evaluation action: Submit an isolated registration, inspect the generic response and separately recorded transport/receipt evidence, then repeat an ineligible request without an existence disclosure.

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
