# Approve the minimum readiness scope before implementation planning

Status: resolved
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: Codex (current wayfinder session)
Blocked by: 07, 11, 14

## Question

Considering the approved decisions, is the expanded API architecture and integration-readiness design complete, explicitly approved and clear enough to begin implementation planning?

For each earlier decision, link its answer and classify the outcome as retain existing design, document/agree a contract, require minimum frontend preparation, or defer with an explicit trigger. Do not restate the answers here as a competing specification. Challenge proposed abstractions or changes that lack a concrete integration requirement.

Identify any remaining architectural blocker, contradictory guarantees or hidden assumption; create new decision children and dependencies if necessary rather than declaring readiness prematurely. Confirm the six planned deliverables are present, traceable and consistent, with dates/assignment and other product changes explicitly approved rather than inherited from the MVP. Confirm retained behavior, local-configuration independence and module-by-module frontend/backend verification requirements, including the permitted authentication-connected/tasks-and-projects-local increment. Seek explicit user approval of the resulting scope; approval opens later implementation planning and authorizes no code changes in this map.

## Existing evidence

The user approved a decision set covering what must change, stay and wait, with progressive integration and a fully operational independent local MVP. No application changes or implementation tickets are authorized by charting.

Source paths: `apps/web/src/workspace/`, `apps/web/src/app/workspace-shell.tsx`, `apps/api/src/app.module.ts`, `docs/architecture/frontend.md`, and `docs/testing/e2e-coverage-hardening-audit.md`. These are inspected facts, not approved architectural answers.

## Resolution requirements

Human-in-the-loop decision. Use grilling and domain-modeling; ask the live user, do not substitute their answers. Record alternatives, trade-offs, retained behavior, preparation if needed, deferrals and verification implications. Explicit user approval is required before resolution. Keep implementation tickets and application changes outside this map.


## Prerequisites

- [Choose evidence that proves local independence and each integration increment](07-testability.md)
- [Define the API Architecture Blueprint for progressive integration](11-api-architecture-blueprint.md)
- [Specify the OpenAPI document and its contract consistency rules](14-openapi-specification.md)


## Approved Endpoint Catalog to carry forward

Apply the complete [MVP Endpoint Catalog](../design/endpoint-catalog.md), explicitly confirmed with no material discrepancies in the final review of [Design the MVP Endpoint Catalog](12-endpoint-catalog.md#answer) on 2026-10-24. Preserve all Q1–Q28/clarifications, 22 explicit operations/five HEAD counterparts, exact success/error/header/authority/validation/retention/abuse contracts, downstream ownership and E1–E34 checkpoints. Explicit catalog choices refine earlier detail/mechanism deferrals; do not independently revise approved policy or add fields. Implementation, runtime/security evidence and human implementation acceptance remain pending. This reference update does not claim, start, resolve or otherwise change the lifecycle/assignee of this decision.


## Approved shared Schema-First specification to carry forward

Apply the complete [Shared Schema-First contract specification](../design/shared-schema-contracts.md), explicitly confirmed in Q17 of [Specify the shared Schema-First contracts](13-shared-schema-contracts.md#answer) on 2026-10-25 with no material discrepancies. Preserve its approved Q1–Q16 clarifications, public inventory/operation coverage, four-role validation boundaries, transport/security/error contracts, exact Unicode 17.0.0 classification baseline, runtime-only declarations, generation safeguards, compatibility obligations and S1–S16 evaluation checkpoints. It refines previously unspecified schema/transport details without creating a competing catalog or payload authority. Generated OpenAPI verification, implementation/runtime/browser parity, security evidence and human implementation acceptance remain pending. Apply these requirements only within this ticket's existing scope when it is separately started; this reference update does not claim, start, resolve or change its status, assignee or dependencies.


## Approved OpenAPI design to carry forward

Apply the complete [OpenAPI design specification](../design/openapi-specification.md) and [example/counterexample companion](../design/openapi-examples.md), explicitly confirmed with no material discrepancies in Q14 of [Specify the OpenAPI document and its contract consistency rules](14-openapi-specification.md#answer) on 2026-10-25. Preserve Q1–Q13, all 22 explicit operations/five HEAD counterparts/27 operationIds, all 115 planned export identities and roles, exact operation-specific success/error/status/header/security mappings, runtime-rule traceability, guarded generation, deterministic serialization/independent drift verification and O1–O16 checkpoints. Include Q11–Q13 enrollment-read409 versus missing-E401/service failure, initial recovery-description422 before eligible historical evidence lookup, and prohibited-content413/400 versus declared JSON415; preserve sign-in canonical-email422 without enrollment-password eligibility disclosure.

The approved readiness deliverable is the design and examples, not an already generated/validated OpenAPI artifact. Actual authoritative catalog/shared schemas/guard/assembler, executable positive/negative fixture validation, package/browser/API/runtime/security evidence and human implementation acceptance remain pending separately authorized work. Apply these requirements only within this decision's existing scope when separately started. This reference update does not claim, start, resolve or alter this decision's status, assignee or dependencies.

## Approved integration-testing strategy to carry forward

Apply the complete [Integration and contract-testing strategy](../design/integration-testing-strategy.md), explicitly confirmed with no material discrepancies on 2026-10-25 in the Answer of [Choose evidence that proves local independence and each integration increment](07-testability.md#answer). Preserve approved Q1–Q9/clarifications, T1–T14, E1–E34/S1–S16/O1–O16 and all 13 runtime-rule identifiers, earlier requirement traceability, local/mixed/connected authority, separate evidence layers, actual network observations, deterministic concurrency/clocks/restart/durability, six browser/viewport coverage, per-capability activation/exception/compatibility records and controlled-sink versus configured-delivery evidence. Human observations remain pending; design approval establishes no executed verification, integration readiness or activated capability. This is only a carry-forward reference under the existing scope. It does not claim, open, start, work, resolve or alter this decision's status, assignee or dependencies, and authorizes no implementation.

## Comments

### Disposition review opened — 2026-10-25

Claimed this sole remaining open frontier decision before work. Consulted Wayfinder, grilling, domain-modeling, tracker/domain guidance and the glossary. Prepared [Readiness scope for implementation planning](../design/readiness-disposition.md) as a proposed linked scope review, not an approved Answer or a replacement specification. It covers all six deliverables, each earlier answer's disposition, minimum preparation/deferred triggers, retained behavior, permitted mixed configuration and a reproducible evaluation guide.

A delegated read-only consistency audit found all six approved deliverables and no material architectural blocker in the reviewed artifacts. It distinguished approved Blueprint/catalog/OpenAPI supersessions from real contradictions and confirmed that infrastructure choices remain later implementation-planning responsibilities. Its initial check covered 32 existing planning files and 285 relative targets, with none missing. This is documentary evidence, not exhaustive runtime or generated-artifact verification.

Actual session preflight: clean checkout at `892a1b6af3cbc2ff35f19a38b5fbb965ca69c6bd` before claim. After preparing the review, checked 33 planning Markdown files, 315 relative file targets, all eighteen lifecycle/dependency records, graph acyclicity and resolved-prerequisite consistency; all passed. `git diff --check` passed. Only this ticket and its new linked review were changed. No application tests, builds, runtime/browser/security/email checks, installs, commits or pushes occurred.

### First live decision round — awaiting user answers

- **Q1 — Planning basis:** approve the linked six-deliverable disposition as sufficient design input for separate implementation planning, preserving its controlling specifications and distinguishing design approval from implemented integration readiness, activation and human acceptance. Recommendation: yes.
- **Q2 — Minimum preparation:** confirm no preliminary universal refactor or all-backend gate; enforce applicable authority isolation, async/validation/security and evidence obligations for each increment, including Authentication connected with Workspace local. Keep concrete infrastructure/build/activation choices in later implementation planning and retain first-module client-tooling review. Recommendation: yes.
- **Q3 — Remaining fog:** confirm no concrete in-scope architectural question remains and retire the map's generic speculative fog upon final resolution. If a precise blocker exists, identify it so it can become a child/dependency instead. Recommendation: yes, subject to user review.

No approval inferred. Keep this ticket claimed, with no Answer and no map completion/index update until live answers and final shared-understanding confirmation. First concrete action: review the six-deliverable table and mixed-configuration scenario in the linked review, then answer Q1–Q3. All future implementation evaluation remains pending user observations.


### Explicit final user confirmation — 2026-10-25

The user explicitly confirmed and approved the complete [Readiness scope for implementation planning](../design/readiness-disposition.md), including Q1–Q3 and all clarifications. They reviewed the complete six-deliverable table and authoritative sources, all earlier-decision dispositions/deferrals, Authentication-connected / Workspace-local configuration, all eight scenarios, minimum preparation/progressive integration, implementation responsibilities, evaluation requirements and speculative-fog assessment. Their final finding was: **“No material architectural discrepancies were found. No additional architecture decision is required before separate implementation planning.”**

The design is approved as sufficient for implementation planning only. The user expressly excluded claims of implemented integration, executable contract/generated OpenAPI success, persistence/transaction/authorization/security acceptance, browser/outbound-email evidence, connected activation and human implementation acceptance. They authorized only recording this confirmation, finalizing this disposition, resolving this ticket, completing the existing map, retiring generic fog, verifying documentation and reporting, then stopping. No implementation planning, implementation tickets/sequence, application/test edits, infrastructure/dependency choices, production artifact generation, reopening earlier decisions, commits or pushes are authorized.

## Answer

Resolved on explicit final user confirmation on 2026-10-25. The complete [approved readiness disposition](../design/readiness-disposition.md) is the linked scope review and deferral classification; its six-deliverable authorities and every controlling Answer retain their requirements and provenance.

- **Approved choice:** the completed architecture and integration-readiness design is a sufficient basis for separate implementation planning. The user confirmed Q1–Q3 and all clarifications, all eight review scenarios, no material discrepancies and no additional prerequisite architecture decision.
- **Retained behavior:** independent local MVP and safeguards, explicit progressive activation, permitted Authentication/account-core connected with Workspace local, local theme, coherent connected Workspace authority, account/profile isolation and no silent fallback. Preserve all approved architectural, contract, security, compatibility and evidence obligations.
- **Minimum preparation and alternatives:** each future increment supplies its applicable authority separation, async/draft handling, validation/security and evidence requirements before activation. No speculative universal refactor, all-backend gate, automatic migration or broader product scope is introduced. Concrete implementation choices await separately authorized planning.
- **Outcome:** documentation-only closure of this decision and the existing map. All eighteen children are resolved, including the previously retired local-data-transition child as an out-of-scope closure rather than an additional route decision. The map's generic speculative fog is retired on the user's explicit finding; real deferrals and out-of-scope boundaries remain intact.
- **Deferred work and triggers:** separately authorized implementation planning retains concrete interfaces, persistence/transaction mechanisms, versions/exports/builds, provider/deployment/activation wiring and executable controls. Actual contracts/catalog/guard/assembler, generated and validated OpenAPI, browser/compiled-API compatibility and first-module client-tooling review remain due at their approved triggers. Preserve per-capability runtime/security/durability/browser/delivery evidence and supported-version records before activation; completion of this map authorizes none automatically.
- **Verification and evaluation:** design review and approval are complete; actual executable verification, implemented integration readiness, connected activation and human implementation acceptance remain pending. Preserve all E1–E34, S1–S16, O1–O16, T1–T14, thirteen runtime rules and earlier-requirement traceability. The linked review provides reproducible feature/scenario review and future hands-on worksheet entry points. No further user action is requested for this closure.
- **Stop boundary:** report documentary results and exact changed files, then stop. No next ticket or implementation planning is started.

### Final closure documentary verification — passed

Checked all 33 planning Markdown files: 322 relative links and 69 section anchors resolve; final newlines and trailing whitespace checks pass. All eighteen children are resolved with Answers, valid types and existing resolved prerequisites; the dependency graph is acyclic and no open/claimed frontier remains. The map indexes all eighteen child Answers across Decisions so far and Out of scope, preserving the retired transition-data child as out of scope. The disposition links all seventeen prior Answers, the six deliverables and their approved source refinements. The approved source documents and earlier tickets were not modified or reopened. Read-only consistency review found no material discrepancy; user final confirmation supplies architectural acceptance, not runtime proof.

`git diff --check` and `git diff --cached --check` pass. Content hashes of 374 tracked/untracked non-ignored repository files confirm exactly three changed documents: this ticket, `design/readiness-disposition.md` and `map.md` within this effort; the other 371 files and the Git index are unchanged. Existing claim/review edits were preserved and finalized. No application/test changes, implementation planning/tickets/sequence, dependencies, infrastructure selection, executable generation, runtime checks, commits or pushes occurred. The disposition's eight review scenarios and future human-evaluation entry points remain available; all implementation observations, connected activation and human implementation acceptance remain pending. Report and stop.
