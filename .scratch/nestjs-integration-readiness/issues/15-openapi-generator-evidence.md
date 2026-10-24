# Verify catalog-driven OpenAPI generator compatibility

Status: resolved
Type: research
Labels: wayfinder:research
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: Codex (generator research)
Blocked by: none

## Question

Which generator approach can satisfy the approved Zod 4 and controller-independent operation-catalog design? Compare a small justified set, including Zod's JSON Schema conversion with explicit operation assembly and a purpose-built Zod/OpenAPI generator. Use Context7 and primary sources; verify current version constraints rather than selecting dependencies.

Evaluate OpenAPI 3.1 correctness, catalog-owned methods/paths/parameters/status/security/schema references, request/response differences, nested unknown-field policies, optional versus nullable properties, deterministic output, visible rejection of unsupported or lossy conversion, and avoidance of duplicate contract definitions. Explain how strict server responses and tolerant frontend readers can derive from common declared fields without competing schema authority. Distinguish OpenAPI expressiveness limits from generator defects; identify semantics that require shared runtime validation and contract tests.

## Resolution requirements

Read the research skill in a subagent. Capture findings in one source-linked Markdown report on an isolated research branch, push it without a PR, and link it here. No application, dependency or production workspace changes. If documentation leaves a critical capability unsettled, identify the precise gap and use a minimal isolated throwaway compatibility prototype under the user's explicit Q7 authorization. Record actual executed checks separately from documentary evidence. Do not approve a generator or resolve the human tooling decision.

## Context

- [Choose shared-schema and OpenAPI tooling](10-contract-tooling.md): Q1–Q7 approvals, particularly catalog authority, wire-schema restrictions and verification criteria.
- [Research shared-schema and OpenAPI tooling compatibility](09-schema-tooling-evidence.md): prior evidence and repository constraints.


## Answer

Resolved on 2026-10-24 as compatibility research. Generator selection and human acceptance remain pending in [Choose shared-schema and OpenAPI tooling](10-contract-tooling.md).

[Catalog-driven OpenAPI generator compatibility evidence](https://github.com/h3nrzi/TaskFlow-Board/blob/8a23a7a69646362206701102377074457f67144f/.scratch/nestjs-integration-readiness/research/openapi-generator-evidence.md) compares Zod 4 native JSON Schema conversion plus explicit catalog assembly against `@asteasolutions/zod-to-openapi` 9.1.0. Both generated complete controller-independent OpenAPI 3.1 documents that passed validation, retained catalog methods/paths/parameters/status/security and schema references, preserved nested strictness and null/omission, and reproduced identical bytes for fixed input. The report includes the complete executed throwaway probe and captured output.

Neither raw converter satisfies the fail-visible policy: both silently omit custom predicates and convert coercion/default schemas without enforcing the project's deliberate prohibitions. Native conversion rejects Date/transforms; the purpose-built converter accepts/maps them. The purpose-built converter retained ISO formats but omitted Zod's ISO patterns, including the approved UTC-Z and exact millisecond-precision restriction that OpenAPI can express. These findings apply to the tested versions and constructs, not all generators.

Research recommendation: prefer native conversion plus catalog assembly, conditional on a fail-closed schema-feature guard, explicit declarations and runtime/contract tests for semantics outside OpenAPI expressiveness, reference/determinism checks and the later package/runtime compatibility matrix. The proposed guard is not implemented or verified here; conversion success alone does not prove faithful parity. Strict server responses and tolerant frontend readers derive from common declared fields with explicit policy at every object boundary; stripping is runtime projection, not a closed-schema claim about tolerated input.

Context: isolated [research/openapi-generator-evidence branch](https://github.com/h3nrzi/TaskFlow-Board/tree/research/openapi-generator-evidence), committed and pushed at `8a23a7a69646362206701102377074457f67144f`; no PR, never merge. Local report: `/Users/hossein/.codex/worktrees/openapi-generator-evidence/TaskFlow-Board/.scratch/nestjs-integration-readiness/research/openapi-generator-evidence.md`.

Preflight: Context7 resolution and focused queries; primary documentation/versioned source and package metadata inspected; isolated temporary install of Zod 4.6.7, generator 9.1.0 and swagger-parser 12.1.0; Node 24.22.0 probe exited 0 with nine passed check groups; research worktree clean after push; documentation whitespace check passed. No production files or dependencies changed. First review action: read the report's comparison and visible-failure findings before choosing the generator approach. Human evaluation remains pending.
