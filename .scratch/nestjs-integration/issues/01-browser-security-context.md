# 01: Establish browser security context

**What to build:** The connected browser obtains and validates its anonymous security context over the approved secure transport while the browser-local MVP remains independently usable.

**Blocked by:** None (can start immediately).

Status: ready-for-agent

- [ ] The browser completes anonymous context bootstrap, including its GET/HEAD behavior, using the approved cookie, CSRF, metadata and context-resolution contracts; unavailable or malformed results produce safe feedback without fallback.
- [ ] Introduce only the shared schemas, catalog bindings, guarded generation and client wiring needed for this slice. Prove actual public imports in both browser and compiled API, and complete the first-real-module client-tooling review without duplicating payload definitions.
- [ ] Document and verify concrete package/build/secure-development choices and the minimum authoritative security-state persistence needed here; preserve the approved architecture without selecting speculative abstractions.
- [ ] Prove exact ingress/context/error precedence, cookie behavior, no silent context downgrade and applicable abuse/failure controls with real HTTP and browser observations.
- [ ] With the API unavailable in local-only configuration, exercise local tasks/projects/demo workflows and persistence safeguards; capture classified traffic showing no remote domain/auth attempts.
- [ ] Implement this as a complete vertical slice through applicable shared contracts, catalog/OpenAPI bindings, authoritative API/persistence, UI and observable tests. Carry all exact requirements from the controlling sources; summaries and story mappings are not exhaustive waivers.
- [ ] Run required repository checks and code review appropriate to the change. Record actual preflight revision/configuration, commands, outcomes, evidence and limitations; simulations do not prove authoritative security or durability.
- [ ] Before handoff in the implementation chat, supply reproducible setup/reset commands, isolated fixtures, feature-by-feature actions/expected outcomes and the first concrete action below. Leave human observations not evaluated until reported; automated passes do not establish acceptance.

## Scope and evaluation

Primary spec stories: 1–8, 17, 50–54, 57–58.

First concrete evaluation action: Bootstrap connected context, interrupt the API and inspect safe feedback; repeat a local create/edit/reload workflow with the API unavailable.

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
