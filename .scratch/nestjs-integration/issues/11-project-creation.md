# 11: Create Projects with durable recovery

**What to build:** An owner creates a Project and deliberately recovers a lost result without duplicate creation or loss of subsequent state.

**Blocked by:** [10: Read a coherent private Workspace](10-coherent-workspace-read.md).

Status: ready-for-agent

- [ ] Require all approved Project fields with exact color/icon/Unicode and canonicalization rules, duplicate-name support and authoritative metadata.
- [ ] Atomically commit creation with durable account/operation/key reservation and outcome; enforce original-input equivalence, different-payload conflict and exact in-progress/error bindings.
- [ ] The dedicated recovery operation never creates; historical success never overwrites current state. Enforce retention, consumed markers and unavailable-evidence safety.
- [ ] Freeze submitted fields, suppress duplicates, preserve payload/key/drafts and allow warned navigation; only validated confirmation commits UI or navigates an active editor.
- [ ] Prove concurrent same-key submissions, interruption/restart and response loss. Use authoritative fixtures to test later-edited/deleted historical outcomes until those UI slices exist.
- [ ] Implement this as a complete vertical slice through applicable shared contracts, catalog/OpenAPI bindings, authoritative API/persistence, UI and observable tests. Carry all exact requirements from the controlling sources; summaries and story mappings are not exhaustive waivers.
- [ ] Run required repository checks and code review appropriate to the change. Record actual preflight revision/configuration, commands, outcomes, evidence and limitations; simulations do not prove authoritative security or durability.
- [ ] Before handoff in the implementation chat, supply reproducible setup/reset commands, isolated fixtures, feature-by-feature actions/expected outcomes and the first concrete action below. Leave human observations not evaluated until reported; automated passes do not establish acceptance.

## Scope and evaluation

Primary spec stories: 26–27, 31–32, 37–46, 50.

First concrete evaluation action: Create a Project with delayed success, then lose a second creation response and deliberately recover the same submission; inspect that exactly one resource exists.

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
