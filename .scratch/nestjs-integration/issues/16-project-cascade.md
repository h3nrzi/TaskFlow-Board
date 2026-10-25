# 16: Delete Projects with atomic task cascade

**What to build:** An owner deletes a Project and its Tasks as one consistent operation while concurrent moves and unrelated resources remain safe.

**Blocked by:** [13: Edit Projects with revision protection](13-project-editing.md), [14: Edit and reassign Tasks](14-task-editing-reassignment.md), [15: Delete Tasks safely](15-task-deletion.md).

Status: ready-for-agent

- [ ] Apply both exact project deletion headers and catalog preconditions, concealed absence and account-scoped cascade; no foreign mutation, partial cascade or orphan relationship.
- [ ] Race deletion with task creation, edits, deletes and moves in/out under both serial orderings; prove surviving moved-out Tasks, cascaded moved-in Tasks and safe post-deletion assignment rejection.
- [ ] Coordinate frontend conflicts in both directions across project/task dependencies while unrelated Projects and standalone Tasks remain usable.
- [ ] Confirm UI removal only after validated success; rejected/stale/uncertain outcomes preserve the approved context and deliberate refresh/recovery policy.
- [ ] Prove coherent reads during races and interruption/restart at meaningful commit points against actual persistence, plus browser cross-surface behavior.
- [ ] Implement this as a complete vertical slice through applicable shared contracts, catalog/OpenAPI bindings, authoritative API/persistence, UI and observable tests. Carry all exact requirements from the controlling sources; summaries and story mappings are not exhaustive waivers.
- [ ] Run required repository checks and code review appropriate to the change. Record actual preflight revision/configuration, commands, outcomes, evidence and limitations; simulations do not prove authoritative security or durability.
- [ ] Before handoff in the implementation chat, supply reproducible setup/reset commands, isolated fixtures, feature-by-feature actions/expected outcomes and the first concrete action below. Leave human observations not evaluated until reported; automated passes do not establish acceptance.

## Scope and evaluation

Primary spec stories: 28, 34–43, 47, 55.

First concrete evaluation action: Delete one of two Projects containing Tasks, verify cascade and unrelated survivors, then run the supplied deterministic move-versus-delete scenarios.

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
