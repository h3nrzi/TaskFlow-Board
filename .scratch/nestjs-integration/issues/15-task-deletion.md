# 15: Delete Tasks safely

**What to build:** An owner deletes a Task with confirmed feedback while missing/foreign targets preserve privacy and uncertain outcomes require deliberate recovery.

**Blocked by:** [12: Create standalone Tasks with durable recovery](12-standalone-task-creation.md).

Status: ready-for-agent

- [ ] Use the exact deletion header, no-body, syntax, revision and success/error bindings; missing/foreign well-formed targets have indistinguishable confirmed absence without foreign mutation.
- [ ] Delete owned Tasks atomically with the applicable revision behavior; preserve authorization and genuine service failures rather than masking them as absence.
- [ ] Keep committed UI until validated confirmation, suppress conflicting work, allow unrelated operations and handle navigation/account changes safely.
- [ ] After loss or malformed completion, retain explicit uncertainty and require refresh plus informed recovery; present absence is not retroactive proof of the original outcome.
- [ ] Prove direct HTTP, two-account privacy, concurrent/stale deletion, restart and actual browser removal across views; assigned-task cases may use authoritative fixtures.
- [ ] Implement this as a complete vertical slice through applicable shared contracts, catalog/OpenAPI bindings, authoritative API/persistence, UI and observable tests. Carry all exact requirements from the controlling sources; summaries and story mappings are not exhaustive waivers.
- [ ] Run required repository checks and code review appropriate to the change. Record actual preflight revision/configuration, commands, outcomes, evidence and limitations; simulations do not prove authoritative security or durability.
- [ ] Before handoff in the implementation chat, supply reproducible setup/reset commands, isolated fixtures, feature-by-feature actions/expected outcomes and the first concrete action below. Leave human observations not evaluated until reported; automated passes do not establish acceptance.

## Scope and evaluation

Primary spec stories: 36–43, 47, 50.

First concrete evaluation action: Delete a Task with delayed confirmation, compare missing/foreign outcomes using isolated fixtures, and inspect recovery after response loss.

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
