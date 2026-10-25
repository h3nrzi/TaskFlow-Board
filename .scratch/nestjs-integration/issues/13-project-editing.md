# 13: Edit Projects with revision protection

**What to build:** An owner edits a Project without silently overwriting competing changes or losing a rejected or uncertain draft.

**Blocked by:** [11: Create Projects with durable recovery](11-project-creation.md).

Status: ready-for-agent

- [ ] PATCH honors omitted fields, strict unknown-field rejection, canonical text/presentation constraints and immutable metadata with atomic expected-revision checks.
- [ ] Matching canonical no-ops and stale revisions follow exact catalog outcomes; no silent merge or automatic stale replay.
- [ ] Freeze pending edits, coordinate same-resource conflicts, preserve definite-rejection drafts and map validated errors safely.
- [ ] Warn on navigation/dismissal, retain permitted account-scoped state and ignore obsolete responses without implying rollback. Uncertain updates require authoritative refresh and informed recovery.
- [ ] Prove direct API bypass, competing contexts, malformed success/error responses and cross-view presentation against actual persistence.
- [ ] Implement this as a complete vertical slice through applicable shared contracts, catalog/OpenAPI bindings, authoritative API/persistence, UI and observable tests. Carry all exact requirements from the controlling sources; summaries and story mappings are not exhaustive waivers.
- [ ] Run required repository checks and code review appropriate to the change. Record actual preflight revision/configuration, commands, outcomes, evidence and limitations; simulations do not prove authoritative security or durability.
- [ ] Before handoff in the implementation chat, supply reproducible setup/reset commands, isolated fixtures, feature-by-feature actions/expected outcomes and the first concrete action below. Leave human observations not evaluated until reported; automated passes do not establish acceptance.

## Scope and evaluation

Primary spec stories: 26–27, 32–34, 37–43, 47, 50.

First concrete evaluation action: Edit a Project in two contexts, submit the stale draft, then exercise a lost response and deliberate refresh/review.

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
