# 14: Edit and reassign Tasks

**What to build:** An owner changes task fields/status and moves a Task between accessible Projects or back to standalone state with consistent views and safe conflicts.

**Blocked by:** [11: Create Projects with durable recovery](11-project-creation.md), [12: Create standalone Tasks with durable recovery](12-standalone-task-creation.md).

Status: ready-for-agent

- [ ] Support approved Task PATCH semantics, all status transitions, nullable clearing, raw/canonical rules and expected-revision/no-op behavior; extend creation UI to accessible Project assignment.
- [ ] Enforce project existence/ownership and relationship consistency at commit time; foreign/missing references fail safely without existence disclosure.
- [ ] Coordinate conflicts across the Task and source/destination Projects, retain rejected or stale drafts and allow unrelated work. Future cascade integration must preserve these dependencies.
- [ ] List/board/Dashboard views agree after confirmed changes, including movement to standalone; stale responses and account changes cannot overwrite current state.
- [ ] Prove concurrent moves/edits, invalid assignment, expiry/navigation and uncertain update recovery through API/persistence and browser seams.
- [ ] Implement this as a complete vertical slice through applicable shared contracts, catalog/OpenAPI bindings, authoritative API/persistence, UI and observable tests. Carry all exact requirements from the controlling sources; summaries and story mappings are not exhaustive waivers.
- [ ] Run required repository checks and code review appropriate to the change. Record actual preflight revision/configuration, commands, outcomes, evidence and limitations; simulations do not prove authoritative security or durability.
- [ ] Before handoff in the implementation chat, supply reproducible setup/reset commands, isolated fixtures, feature-by-feature actions/expected outcomes and the first concrete action below. Leave human observations not evaluated until reported; automated passes do not establish acceptance.

## Scope and evaluation

Primary spec stories: 25, 27–34, 36–43, 47, 50.

First concrete evaluation action: Move a Task from one Project to another and then to standalone, compare all views, and repeat with a competing revision and response loss.

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
