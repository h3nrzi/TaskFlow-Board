# 08: Enable Authentication with local Workspace

**What to build:** A supported explicitly selected Authentication-connected/Workspace-local configuration completes the full account lifecycle without weakening local operation.

**Blocked by:** [05: Recover or leave pending enrollment](05-pending-enrollment-recovery.md), [07: Handle foreground activity and session expiry](07-session-activity-expiry.md).

Status: ready-for-agent

- [ ] Provide deliberate activation wiring only after all applicable Authentication/account-core requirements have real evidence; prior development slices are not activation proof.
- [ ] Run registration, proof, enrollment/recovery/leave, sign-in/status/activity/sign-out through the real browser and API with applicable six-configuration coverage and supported build pairs.
- [ ] Complete applicable context/Origin/CSRF/HTTP precedence, abuse, privacy, delivery, concurrency, deadline and persistence-restart observations; explain nonapplicable cases without waiving requirements.
- [ ] Prove local tasks/projects, storage safeguards and theme remain independent during connected outages, with classified network/state observations and no demo/profile fallback.
- [ ] Publish capability evidence and reproducible start/reset/fixture instructions. Activation readiness and user-reported acceptance remain separate.
- [ ] Implement this as a complete vertical slice through applicable shared contracts, catalog/OpenAPI bindings, authoritative API/persistence, UI and observable tests. Carry all exact requirements from the controlling sources; summaries and story mappings are not exhaustive waivers.
- [ ] Run required repository checks and code review appropriate to the change. Record actual preflight revision/configuration, commands, outcomes, evidence and limitations; simulations do not prove authoritative security or durability.
- [ ] Before handoff in the implementation chat, supply reproducible setup/reset commands, isolated fixtures, feature-by-feature actions/expected outcomes and the first concrete action below. Leave human observations not evaluated until reported; automated passes do not establish acceptance.

## Scope and evaluation

Primary spec stories: 1–19, 42–43, 48, 55–58.

First concrete evaluation action: Select the documented mixed configuration, sign in, create a local task, interrupt the API and compare connected feedback with continued local work.

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
