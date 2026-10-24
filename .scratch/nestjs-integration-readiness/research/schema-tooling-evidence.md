# Shared-schema and OpenAPI tooling evidence

Research date: 2026-10-24. Repository baseline: `bcd576bb0af0e4eff262795fecbe461eda0d21c8`.
Research branch: `research/schema-tooling-evidence`; research only, never merge this branch.
Question: [Research shared-schema and OpenAPI tooling compatibility](../issues/09-schema-tooling-evidence.md).

This report establishes options and constraints. It does not select tooling or approve assignee, endpoint, or domain models. The user's shared Schema-First contracts, private-account MVP, calendar due-date and server-controlled creation/update-instant decisions are inputs, not open questions.

## Repository evidence

Read directly, without dependency installation or application changes:

- Root `package.json`: TypeScript `5.9.3`, pnpm `10.11.0`, Node engine `24.22.0`.
- `pnpm-workspace.yaml`: workspace discovery is currently only `apps/*`; catalog Zod `^3.25.76`. Adding `packages/contracts` will require declaring `packages/*` (or that package explicitly). `autoInstallPeers: false` means adapter peers must be handled deliberately.
- `pnpm-lock.yaml`: web resolves Zod `3.25.76`. `apps/web/package.json` is ESM; web uses bundler module resolution and Vite. Its base configuration enables strict null checking and several individual strict flags, but explicitly disables `strictFunctionTypes`; it does not set umbrella `strict: true`.
- `apps/api/tsconfig.json`: CommonJS emission, ES2022, `strict: true`, decorator metadata. `apps/api/package.json`: Nest common/core/platform-express `11.2.7`, RxJS `7.8.2`; no Zod, Swagger, schema adapter or validator declared there. Shared schemas must execute in both browser and compiled API, not merely typecheck through an alias.

## Two viable lanes

| Concern | Zod schemas + Nest adapter | TypeBox JSON schemas + validator |
| --- | --- | --- |
| Canonical artifact | Zod runtime schema; inferred request/response types | TypeBox runtime JSON-schema object; inferred static types |
| Existing-toolchain fit | Zod v4 API plus `nestjs-zod` 5.x has compatible published peer ranges and CJS/ESM exports | `@sinclair/typebox` 0.34 LTS has CJS/ESM exports and documented TS5 support |
| Nest boundary integration | Adapter supplies schema-derived DTO class wrappers, input pipe and response interceptor | Project-owned pipe/interceptor wiring around the shared validator; raw-schema Swagger integration or standalone OpenAPI assembly |
| OpenAPI projection | Zod4 built-in JSON Schema conversion; adapter can compose controller metadata and clean the document | Schema already JSON Schema; choose compatible dialect and compose HTTP operations around it |
| Principal cost (inference) | Adapter/converter upgrades and conversion-subset discipline | More Nest integration ownership; explicit validator/dialect/format choices |

These are architectural lanes, not two separately maintained API contracts. A schema-derived Nest wrapper is an adapter to the same contract, not an independent handwritten DTO definition.

## Zod lane: compatibility and limits

Zod supports inferred types, browser/Node use, and requires strict mode; it is officially tested with TS5.5+. Its package has separate `import` and `require` exports. Current TS5.9 meets the documented compiler floor; frontend strict settings need an explicit compatibility check. [Zod requirements](https://zod.dev/), [published Zod4.6.7 metadata](https://registry.npmjs.org/zod/4.6.7).

Zod3.25 introduced the stable `zod/v4` subpath; installing Zod4 changes the root `zod` import to v4, while `zod/v3` remains available. Zod3 and Zod4 schema classes/types are not interchangeable. Therefore using v4 contracts does **not** inherently require migrating every existing v3 form schema in the same step; it does require explicit import/version policy and a review of consumers such as form resolvers. No resolver compatibility was tested here. [Zod versioning](https://zod.dev/v4/versioning).

Published `nestjs-zod`5.5.0 declares Nest common `^10 || ^11`, RxJS `^7`, Zod `^3.25 || ^4`, and optional Swagger `^7.4.2 || ^8 || ^11`, with CJS/ESM entrypoints. These ranges cover the repository's Nest/RxJS/Zod versions; that is metadata compatibility, not an integration-test pass. [Published adapter metadata](https://registry.npmjs.org/nestjs-zod/5.5.0).

The adapter provides `createZodDto`, request validation, response serialization/validation and Swagger integration. DTO classes can remain Nest-side while plain runtime schemas and inferred types live in the browser-safe shared package. [Adapter documentation](https://github.com/BenLorantfy/nestjs-zod).

Zod4's `toJSONSchema` targets Draft2020-12 by default and can target Draft7 or OpenAPI3.0. Input/output projections differ for coercion, defaults and pipelines; output is the default, while request generation needs deliberate input projection. `Date`, transforms, maps, sets and custom types are among unrepresentable constructs. Conversion normally fails; an `unrepresentable: 'any'` escape hatch weakens the generated contract. A handwritten override must be reviewed for equivalence, not assumed correct. [Zod JSON Schema conversion](https://zod.dev/json-schema).

`nestjs-zod`5 replaced Swagger monkey-patching with `cleanupOpenApiDoc`; its Zod4 generation uses Zod's converter. DTOs default to input documentation; `.Output` or `ZodResponse` provides output documentation. The migration guide recommends string date/date-time schemas rather than `z.date()` for JSON representation. This can express the approved calendar due dates and server-controlled creation/update instants as strings; exact accepted formats and timezone precision still need specification. [Adapter migration guide](https://github.com/BenLorantfy/nestjs-zod/blob/main/MIGRATION.md).

Cleanup can convert null/const constructs for OpenAPI3.0, but drops unsupported constructs such as `propertyNames`; duplicate component names and recursive parameter schemas can cause errors. OpenAPI3.0 cleanup is not a guarantee that every runtime constraint survives conversion. [Cleanup implementation/API](https://github.com/BenLorantfy/nestjs-zod/blob/main/_autodocs/api-reference/openapi.md).

## TypeBox lane: compatibility and limits

TypeBox creates JSON-schema fragments with inferred TypeScript types. The maintainer distinguishes latest `typebox`1.x (ESM-only, documented TS6–7+) from `@sinclair/typebox`0.x LTS (TS5–6, ESM/CJS). The latest line is not a drop-in choice for the repository's documented TS5.9 toolchain. Node24's ESM interoperability does not remove the TypeScript compatibility question; no claim is made that every ESM import necessarily fails at runtime. [Maintainer version policy](https://github.com/sinclairzx81/typebox#versions), [published latest-line1.4.3 metadata](https://registry.npmjs.org/typebox/1.4.3), [published LTS0.34.52 metadata](https://registry.npmjs.org/@sinclair/typebox/0.34.52).

The LTS line targets JSON Schema Draft7 for its JSON types, supports inference via `Static`, and documents Ajv and its own TypeCompiler/Value validation APIs. JavaScript extended types are not all JSON-schema-compatible. Transform codecs execute through Encode/Decode and have distinct static encoded/decoded types; a normal JSON-schema validator does not execute those callbacks. Avoid presenting the decoded application type as the wire type. [LTS usage, types, transforms and validators](https://github.com/sinclairzx81/sinclair-typebox).

Ajv supplies Draft7 validation by default; Draft2020-12 needs its corresponding Ajv class and cannot be mixed with older drafts in the same instance. Standard string formats need `ajv-formats`; a format annotation alone does not establish identical browser/backend enforcement. [Ajv schema versions](https://ajv.js.org/json-schema.html), [format validation](https://ajv.js.org/guide/formats.html).

Ajv can generate standalone validators at build time in CJS or ESM, avoiding browser runtime `Function` compilation and potentially shrinking bundles. Custom formats/keywords need suitable standalone support; many generated validators can outweigh the library. This is an optional generation strategy, not a demonstrated bundle-size win here. [Ajv standalone generation](https://ajv.js.org/standalone.html).

## OpenAPI and source authority

OpenAPI3.1 uses the JSON Schema2020-12 vocabulary; OpenAPI3.0 uses a restricted, extended schema subset with different null handling. A Draft7 schema object cannot simply be stamped with a newer OpenAPI version without checking keywords, references and semantics. Choosing the document dialect and generator must be one explicit tooling decision. [OpenAPI3.1.1 Schema Object](https://spec.openapis.org/oas/v3.1.1.html#schema-object), [OpenAPI3.0.4 Schema Object](https://spec.openapis.org/oas/v3.0.4.html#schema-object).

Latest Swagger12.0.3 requires Nest12, whereas published Swagger11.4.7 supports Nest `^11.0.1` and falls inside the adapter's peer range. Do not install an unqualified latest Swagger into this Nest11 application. [Swagger11 metadata](https://registry.npmjs.org/@nestjs/swagger/11.4.7), [Swagger12 metadata](https://registry.npmjs.org/@nestjs/swagger/12.0.3).

Current Nest documentation describes built-in StandardSchema pipes/interceptors. Version11.2.7's pipe/serializer exports do not include them. The current documentation must not be treated as an installed-version capability. A custom schema pipe/response interceptor or compatible adapter remains a viable Nest11 path. [Version11.2.7 pipe exports](https://github.com/nestjs/nest/blob/v11.2.7/packages/common/pipes/index.ts), [serializer exports](https://github.com/nestjs/nest/blob/v11.2.7/packages/common/serializer/index.ts).

**Design inference:** payload schemas alone cannot supply paths, methods, status codes, security requirements or operation descriptions. Readiness requires the concrete OpenAPI surface before domain controllers exist. Choose an operation-metadata authority usable at design time (for example a shared descriptor manifest or a generator that registers operations against shared schemas), then generate the OpenAPI artifact from it. Controller-derived documentation alone would defer part of the approved deliverable until implementation. Later controller registration must be checked against this authority rather than inventing another handwritten contract. Nest permits raw schema definitions in Swagger declarations; references to shared/generated schemas can preserve authority. [Nest raw schemas](https://docs.nestjs.com/openapi/types-and-parameters#raw-definitions).

**Design inference:** neither lane encodes arbitrary cross-field/domain refinements, authorization, resource existence or project-deletion cascades automatically into portable OpenAPI. Record those rules once in the domain specification and tie them to semantic tests; do not mistake a valid request shape for a valid domain operation. Keep database/service business logic out of `packages/contracts`, as already approved.

## Decisions still requiring the human

1. Zod-oriented lane or TypeBox/JSON-schema lane; exact versions, adapter/validator and permitted schema subset.
2. Input/output typing, transformations/coercion/defaults and reject-versus-strip policy for unknown fields, including how potentially different deployed versions interact.
3. OpenAPI dialect, design-time operation metadata and deterministic generation ownership; whether validation code is shipped or generated.
4. Shared package compilation/exports for current CommonJS API and ESM browser, strictness policy, direct dependencies/peers and workspace registration. Dual outputs are one possibility, not yet a requirement or selection.
5. Exact wire format/precision for the approved calendar due dates and server-controlled instants, assignee model, error envelopes and domain rules. Private-account scope and approved null/omission semantics remain binding; no library defaults override them.

## Preflight and handoff

Evidence gathered: repository manifests/configurations and lockfile inspected; Context7 resolution then focused documentation queries for Zod, NestJS Zod, TypeBox, NestJS and Ajv; official sources/specifications and versioned registry metadata checked to distinguish latest documentation from installed compatibility.

No dependencies installed; no application code, builds, tests or prototype executed. Compatibility is documentary and must be proved by the later approved integration checks (compiled API execution, browser bundle, request/response parity, null/omission and malformed values, schema/OpenAPI drift, and deployed-version compatibility). Research completion is not human acceptance of tooling.

First review action: read the two-lane comparison and the explicit human decisions above with [Choose shared-schema and OpenAPI tooling](../issues/10-contract-tooling.md). Do not implement either lane until the tooling decision is approved.
