# Shared-schema tooling and OpenAPI generation design

Approved design decisions: Q1–Q8 in [Choose shared-schema and OpenAPI tooling](../issues/10-contract-tooling.md#comments), culminating in explicit Q8 approval on 2026-10-24. This document specifies the selected approach; it does not establish acceptance of a production implementation.

## Authority and boundaries

- `packages/contracts` owns framework-agnostic, browser-safe Zod 4 API wire schemas and inferred TypeScript types. Its scope includes API DTOs, common enums, requests/responses, errors and account/profile contracts. UI state, browser snapshots and business logic remain outside.
- Nest-specific DTO wrappers, decorators and `nestjs-zod` request/response validation integration belong in `apps/api`.
- One design-time operation catalog owns HTTP paths, methods, parameters, status codes, authentication/security metadata and references to the shared schemas.
- Zod 4 native JSON Schema conversion and an intentionally small catalog-driven assembler produce OpenAPI 3.1 before controllers exist. Generated OpenAPI is a derived artifact, never a separately maintained payload or operation authority.
- Nest routes, decorators and response behavior must conform to the catalog. `nestjs-zod` integration must not introduce competing controller-derived contract authority.

Exact package versions, exports layout, build format, compiler settings and generator placement are implementation-planning details subject to the requirements below. No new production package exists as a result of this design.

## Wire-schema policy

Schemas faithfully describe JSON payloads. Prohibit implicit transformations, coercion, runtime defaults and normalization. Keep UI normalization outside the wire schemas. Define distinct request/response schemas wherever their fields or constraints differ; infer their types rather than hand-maintaining parallel interfaces.

Preserve the approved representations: calendar due dates use YYYY-MM-DD without timezone conversion; server-controlled timestamp instants use UTC ISO 8601 with exactly three fractional digits. Preserve required, optional and nullable distinctions. Omitted update fields remain unchanged; explicit null clears supported fields. Actual per-operation fields and domain rules remain with the contract and schema specification decisions.

Incoming API requests reject unknown fields at root and nested object boundaries where applicable. Server output validates against declared response schemas and preserves the approved nested strictness. Frontend response readers tolerate and strip unknown fields at applicable nested boundaries, while still rejecting missing or invalid declared fields. Derive different object policies from common field definitions; do not duplicate payload definitions.

Runtime stripping is a projection, not JSON Schema validation behavior. Document the server's declared output accurately; do not falsely describe the tolerant reader's accepted inputs as closed objects.

## Mandatory generation acceptance requirements

1. Use a fail-closed schema-feature guard before generation. Reject prohibited, unsupported and unrecognized constructs, including transforms, coercion, defaults, implicit normalization and undeclared custom refinements. Prefer a restricted set of supported schema-building patterns over brittle dependence on Zod internals. Converter success or an unsupported-type throwing option alone is insufficient.
2. Preserve all expressible constraints: in particular UTC-only timestamps with exactly three fractional digits, calendar-date formats, required/optional/null semantics and nested strictness. Reject unsupported or lossy conversion visibly instead of weakening the contract.
3. Explicitly declare unavoidable runtime-only rules and verify them through shared runtime validation and contract tests. Distinguish OpenAPI expressiveness limits from generator limitations. Never imply that a weaker generated constraint is equivalent to its runtime rule.
4. Generate paths, methods, parameters, status codes, security metadata and schema references exclusively from the authoritative catalog and shared schemas.
5. Verify deterministic output, valid OpenAPI 3.1, correct component references, unique operation/schema identities and rejection of lossy conversion.
6. Keep the assembler small. Do not introduce a second handwritten payload contract or a parallel source of truth.

The guard and production assembler are unimplemented and unverified. These are mandatory acceptance requirements, not capabilities established by design approval or research.

## Package and consumer compatibility

Expose explicit public exports that work in both Vite/browser builds and the compiled NestJS runtime. Each package importing Zod declares it directly. Avoid fragile source-path aliases, reliance on undeclared transitive dependencies and configurations that work only during type checking.

Implementation planning must verify exports, module compatibility, compiler settings, dependency versions and actual runtime imports. Research-version compatibility is evidence, not a dependency pin or proof of the eventual build matrix. Preserve existing frontend form schemas unless migration has an independent justification.

API client generation is deferred. Explicitly revisit typed client generation or contract-driven client tooling when integrating the first real NestJS module. Shared DTO types alone do not guarantee end-to-end type-safe API calls. Handwritten or generated clients must avoid duplicate request/response contracts.

## Retained behavior, preparation and deferred work

This is a documentation/contract-design outcome. Current browser-local behavior, storage and form schemas remain unchanged; no minimum application edit is required in this planning effort. Module-by-module integration, local independence and explicit domain authority remain binding earlier decisions.

Later implementation planning owns production package/build/dependency work and compatibility verification. The shared-schema and OpenAPI decision children own concrete contract inventories, schema details, operation identifiers, examples and design artifacts. The testing-strategy child owns the broader verification strategy. Those decisions must apply this tooling design rather than silently reopen it.

No database, authentication mechanism, repository abstraction, cache, optimistic-update policy, synchronization mechanism or deployment topology is selected here.

## Evidence and reproducible review

Read [shared-schema tooling evidence](../issues/09-schema-tooling-evidence.md#answer) and [catalog-driven generator evidence](../issues/15-openapi-generator-evidence.md#answer) for immutable reports, versions, limitations and the complete reproducible probe. The latter executed nine check groups in isolation, including validation of two complete OpenAPI 3.1 documents. Neither raw converter meets every project restriction; the selected native approach requires the safeguards above. No production build, guard-completeness proof or human implementation acceptance is established.

Review this design feature by feature:

1. Trace schema, HTTP-metadata and generated-document authority; confirm there is no second payload definition or competing decorator authority.
2. Check examples against the wire policy: omitted update versus explicit null; UTC milliseconds versus a timezone offset or variable precision; nested request unknown fields versus tolerant frontend response projection.
3. Follow the generator report's reproduction instructions. Inspect timestamp patterns, null/omission, nested strictness, missing/invalid values, repeated bytes and silent refinement loss. Document validation success does not establish constraint parity.
4. Check each mandatory acceptance requirement above is retained for implementation, including the currently unverified guard and assembler.
5. Confirm the first-real-module integration checkpoint revisits client tooling and proves browser/compiled-API package compatibility.

Actual planning preflight: reviewed Q1–Q8 against the recorded user approvals, research report and downstream decision ownership; checked Markdown links, ticket lifecycle/dependencies, acyclic graph and documentation whitespace. No production application tests/builds or live API checks were run for this documentation decision. Human evaluation of the eventual implementation remains pending until the user reports observations.

First concrete review action: compare the mandatory acceptance requirements above with the user's six Q8 safeguards, then follow the generator evidence report for the limitations that implementation must address.
