# 12: Create standalone Tasks with durable recovery

**What to build:** An owner creates a standalone Task with all approved fields and deliberately recovers uncertain creation without duplicates.

**Blocked by:** [10: Read a coherent private Workspace](10-coherent-workspace-read.md).

Status: ready-for-agent

- [ ] Require all seven task fields, explicit supported nulls, enums, free-text assignee, preserved description, calendar due date and approved Unicode limits; no server defaults for omitted create fields.
- [ ] Standalone creation uses projectId null and server metadata; valid assigned-request rules remain enforced at the API even though assigned UI workflows arrive in ticket 14.
- [ ] Provide atomic durable submission reservation/outcome and dedicated noncreating recovery with exact equivalence, scope, conflict, in-progress, history, retention and consumed-marker behavior.
- [ ] Pending confirmation, duplicate suppression, rejected drafts, navigation/account isolation and deliberate uncertain recovery work through the real form and views.
- [ ] Prove concurrent requests, loss after commit, restart, historical edit/deletion and unavailable recovery evidence with authoritative fixtures as needed; do not depend on Project creation UI.
- [ ] Implement this as a complete vertical slice through applicable shared contracts, catalog/OpenAPI bindings, authoritative API/persistence, UI and observable tests. Carry all exact requirements from the controlling sources; summaries and story mappings are not exhaustive waivers.
- [ ] Run required repository checks and code review appropriate to the change. Record actual preflight revision/configuration, commands, outcomes, evidence and limitations; simulations do not prove authoritative security or durability.
- [ ] Before handoff in the implementation chat, supply reproducible setup/reset commands, isolated fixtures, feature-by-feature actions/expected outcomes and the first concrete action below. Leave human observations not evaluated until reported; automated passes do not establish acceptance.

## Scope and evaluation

Primary spec stories: 25, 27–32, 37–46, 50.

First concrete evaluation action: Create a standalone Task with a calendar due date and assignee, then recover a controlled lost response using the original submission.

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
