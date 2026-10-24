# Choose shared-schema and OpenAPI tooling

Status: resolved
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: Codex (current wayfinder session)
Blocked by: 09, 15

## Question

Given the tooling evidence, which schema/type-inference/OpenAPI approach should the shared contracts package use, and what compatibility constraints follow? Decide the package boundary, supported schema features, input/output treatment and how OpenAPI remains consistent with the canonical runtime schemas without duplicate authority. Decide whether client generation is needed rather than assuming it. Choose tooling only through explicit user approval. Record a specification and any later package/build work; do not change dependencies or workspace configuration.

## Resolution requirements

Human-in-the-loop decision. Consult grilling and domain-modeling. Explicit user approval is required before resolution. Link detailed design assets from this ticket; the map indexes only the answer gist. Planning-only: no application, dependency or production package changes.

## Prerequisites

- [Research shared-schema and OpenAPI tooling compatibility](09-schema-tooling-evidence.md)
- [Verify catalog-driven OpenAPI generator compatibility](15-openapi-generator-evidence.md)

## Comments

### User decisions — 2026-10-24, tooling and client-generation direction

- Q1 explicitly approved: Zod 4 is the shared runtime-schema source of truth. Adopt nestjs-zod for NestJS request/response validation and OpenAPI integration. Shared schemas remain framework-agnostic and browser-safe; Nest-specific DTO wrappers and decorators belong in apps/api. Verify compatible package versions during implementation planning; no exact dependency versions are selected here.
- Q2 explicitly approved with qualification: defer API client generation now, and explicitly revisit typed client generation or contract-driven client tooling when integrating the first real NestJS module. Shared DTO types alone do not guarantee end-to-end type-safe API calls. Avoid duplicate request/response contracts, whether calls are handwritten or generated.

These are partial approvals, not a resolved Answer. Schema feature restrictions, input/output treatment, compatibility/package constraints and OpenAPI generation ownership remain to be discussed. No dependency, application or workspace configuration change is made.

### User decisions — 2026-10-24, wire schemas and OpenAPI authority

- Q3 explicitly approved: shared Zod 4 wire schemas faithfully represent JSON payloads without implicit transformations, coercion or runtime defaults. Preserve approved calendar-date and UTC timestamp string formats. UI-specific normalization belongs outside shared wire schemas. Define distinct request/response schemas wherever fields or constraints differ. Unsupported or lossy OpenAPI conversion must fail visibly, never silently weaken the contract.
- Q4 explicitly approved: incoming API requests reject unknown fields, including nested request objects where applicable. Frontend response parsers tolerate and strip additional unknown fields while rejecting missing or invalid declared fields. The server validates outgoing responses against their declared schemas. Extra-field tolerance never weakens required-field or type validation.
- Q5 explicitly approved: target OpenAPI 3.1. One design-time operation catalog owns methods, paths, parameters, status codes, authentication requirements and references to shared Zod schemas. Generate OpenAPI from this catalog and shared schemas before controllers exist. Later verify NestJS routes and response behavior against the catalog; controller decorators are not a competing authority. OpenAPI is generated output, not a separately maintained specification. Select a generator based on verified support for these requirements, including correct OpenAPI 3.1 output and visible failure for unsupported constructs.

These approvals supersede the corresponding open items in the preceding entry. Package/consumer compatibility constraints and generator verification/selection remain unresolved. The ticket remains claimed with no Answer; no implementation changes or acceptance are inferred.

### User decisions — 2026-10-24, package compatibility and generator evidence

- Q6 explicitly approved: packages/contracts exposes explicit public exports and works in Vite/browser builds and the compiled NestJS runtime. Every package importing Zod declares it directly. Avoid fragile source-path aliases, undeclared transitive dependencies and typecheck-only compatibility. Verify exports, module compatibility, compiler settings, versions and runtime imports during implementation planning. Preserve existing frontend form schemas unless migration is independently justified.
- Q7 explicitly approved: require focused compatibility evidence before selecting an OpenAPI generator, covering controller-independent catalog generation, OpenAPI 3.1 correctness, request/response differences, nested unknown-field policies, optional versus nullable properties, deterministic output, visible rejection of unsupported/lossy conversion and no duplicate contract definitions. Distinguish OpenAPI limits from generator limits; enforce behavior outside OpenAPI expressiveness through shared schemas and contract tests without misrepresenting it in the specification. Use a minimal throwaway compatibility prototype if documentation cannot establish a critical capability. Generator selection remains pending until evidence is sufficient.

The precise evidence prerequisite is now [Verify catalog-driven OpenAPI generator compatibility](15-openapi-generator-evidence.md). This ticket remains claimed; Q1–Q7 are explicit partial approvals, not final shared-understanding confirmation or an approved generator.

### Evidence review checkpoint — 2026-10-24

The focused research prerequisite is resolved with its source-linked report and reproducible throwaway probe. Reviewed the comparison and captured output; requested and verified a rerun using exact UTC millisecond precision, rather than generic datetime precision. Nine check groups passed, including complete OpenAPI document validation for both tested approaches. Neither converter alone fulfills every approved restriction; the proposed generation guard has not been implemented or verified. No production build or integration acceptance is inferred.

First action: compare the report's timestamp-pattern and silent-refinement-loss findings, then approve or revise the proposed native-conversion/catalog-assembly approach and its required safeguards in chat. The research ticket holds the full evidence; this decision remains claimed pending the user's choice and final shared-understanding confirmation.

### User decision — 2026-10-24, generation approach

Q8 explicitly approved: select Zod 4 native JSON Schema conversion plus a small catalog-driven OpenAPI 3.1 assembler. The user made all six safeguards mandatory acceptance requirements: fail-closed schema-feature guard with restricted supported building patterns preferred over brittle internals; preservation of every expressible constraint including UTC-only millisecond timestamps, calendar dates, null/omission and nested strictness; explicit runtime-only rule declarations backed by shared validation and contract tests; exclusive catalog/schema ownership of generated HTTP metadata and references; deterministic valid output, correct references, unique identities and visible rejection of loss; and a small assembler without duplicate payload contracts or parallel authority.

The user explicitly distinguishes approval of the generation design approach from acceptance of the unimplemented guard or production generator. Acceptance requires demonstrating the safeguards during implementation. Q8 supplies the final generator design choice after Q1–Q7; it does not approve production code or broader readiness completion.

## Answer

Resolved on 2026-10-24 from explicit Q1–Q8 user approvals. [Shared-schema tooling and OpenAPI generation design](../design/shared-schema-tooling.md) records the complete selected tooling design, mandatory safeguards, consumer obligations, deferred checkpoints and feature-by-feature review guide.

Approved choice: shared browser-safe Zod 4 wire schemas and inferred types in packages/contracts; nestjs-zod and Nest wrappers in apps/api; one design-time operation catalog; native Zod JSON Schema conversion plus a small OpenAPI 3.1 assembler. Enforce the approved wire, unknown-field and fail-visible policies. No exact package versions or build output format are selected.

Retained behavior/minimum preparation: this is documentation and contract design only, with no production application, dependency, configuration, storage or form-schema changes. Earlier progressive integration and local-independence decisions remain in force.

Deferred work/triggers: implementation planning verifies package exports, browser/compiled-API runtime compatibility, compiler settings and versions; implementation demonstrates all six safeguards before acceptance. First real NestJS module integration explicitly revisits typed client generation/contract-driven tooling. Concrete schema and OpenAPI artifacts retain their named downstream owners.

Verification/evaluation: the linked research supplies bounded documentary and isolated execution evidence, not guard completeness or production acceptance. Planning checks cover links, ticket lifecycles/dependencies, graph acyclicity and whitespace; the design includes a reproducible review guide. First concrete action is to compare its six acceptance requirements with Q8, then inspect the generator report's limitations. Human implementation evaluation remains pending user observations. This closes only the tooling decision; the map and other decision tickets remain open.
