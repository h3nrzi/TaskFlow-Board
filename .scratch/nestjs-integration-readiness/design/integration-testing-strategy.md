# Integration and contract-testing strategy

Decision owner: [Choose evidence that proves local independence and each integration increment](../issues/07-testability.md).

Status: approved on 2026-10-25. The user explicitly confirmed the complete specification, all Q1–Q9 decisions/clarifications, T1–T14, checkpoint/runtime-rule traceability and human-evaluation worksheet, with no material discrepancies or further architectural revisions required. The owning ticket is resolved on that final confirmation. This document records requirements and intended evaluation, not implemented tests, generated artifacts, executed verification, integration readiness, capability activation or human implementation acceptance.

## 1. Authority, scope and retained behavior

Apply the approved [frontend-facing contract](frontend-facing-contract.md), [async policy](async-operation-policy.md), [validation policy](validation-policy.md), [Blueprint](api-architecture-blueprint.md), [email scope](account-email-scope.md), [tooling design](shared-schema-tooling.md), [Endpoint Catalog](endpoint-catalog.md), [shared-schema specification](shared-schema-contracts.md), [OpenAPI specification](openapi-specification.md) and [example companion](openapi-examples.md). These remain the authorities for behavior, fields, security and protocol details. This strategy assigns evidence and evaluation responsibilities; it does not introduce a competing catalog or change approved contracts.

Preserve the independently operational browser-local MVP, its immediate in-memory operations, separate persistence feedback, storage validation/isolation, recovery and export safeguards. Disposable development data creates no migration, transfer, import/export expansion or offline-sync work. Theme stays local. Connected operations use validated server-confirmed completion, deliberate uncertain-outcome recovery and approved account/draft isolation, never availability-based fallback.

No production code, test implementation, dependency/configuration changes, universal fixture framework, preliminary suite refactor, deployment order or implementation backlog is selected. Tool/framework versions, persistence technology, clock/injection mechanisms, client tooling implementation and executable commands belong to later implementation planning. The first-real-module client-tooling review and actual browser/compiled-API import proof remain mandatory.

## 2. Configuration and authority matrix — approved Q1/Q4

Every run names its configured capability authorities before execution. Configuration is explicit developer-controlled activation, not inferred from availability. An API outage never changes authority.

| Configuration | Required evidence |
| --- | --- |
| Local-only | Exercise local task/project/profile/demo workflows and theme with NestJS stopped/unreachable; retain all applicable storage/save/recovery/export/isolation safeguards. Historical passes are context only |
| Authentication connected, Workspace local | Prove real account/session lifecycle and account core; Tasks/Projects/assignment/cascade remain local. Editable connected Profile UI may follow later. Test local safeguards and connected failures independently; no demo or local-profile overwrite of account authority |
| Authentication and editable Profile connected, Workspace local | Add authoritative display-name-only Profile behavior, immutable account/email and independent revision; preserve local Workspace and theme and failure isolation |
| Connected Workspace | Require real active-account Authentication and one shared authority for Tasks, Projects, assignment, coherent reads and cascade. Prove the complete coupled boundary; no independent local/remote split across its guarantees |

These are allowed configurations, not a prescribed build sequence. Apply only relevant tests to each increment; do not block one capability on unrelated future-module behavior. Local/connected fixtures may differ while portable UI assertions are reused. Connected fixtures must not seed browser-local task/profile snapshots or demo sessions as a substitute for authoritative setup. Existing local tests may continue to seed local snapshots where that is their purpose.

## 3. Evidence layers and their limits — approved Q2/Q4

| Layer | What it can establish | What it cannot establish |
| --- | --- | --- |
| Documentary review | Requirement/source ownership, complete inventories, scenario/operation/runtime-rule traceability and design consistency | Executable schema validity, generated-document validity, actual enforcement or acceptance |
| Controlled frontend simulation | Pending/frozen editor/duplicate suppression; rejection and uncertainty drafts; navigation/dismissal; malformed/lost/delayed/reordered responses; conflicts, stale results/account isolation and deliberate recovery | Real server authorization, transactionality, persistence, durable idempotency, revocation or browser enforcement of actual cookies |
| Executable contract and build checks | Actual raw/canonical/output/reader/metadata schemas, parity fixtures, package imports, guarded generation, exact bindings, reference validity, deterministic bytes and independent drift checks | Domain commits, authority, live credential/session lifecycle, transactional/durable guarantees or completed browser workflows |
| Actual API and persistence integration | Real request pipeline, authorization/privacy, authoritative consistency/revisions, concurrency, durable history/recovery, session/proof/enrollment/abuse enforcement and failure behavior at actual persistence boundary | Browser cookie/Origin behavior or full UI correctness by itself |
| Browser integration against actual API | Supported browser behavior, actual credential/context transport, connected workflow completion, UI/authority interaction and local/mixed isolation | Exhaustive server race proof from one UI path or human acceptance |
| Configured outbound-email integration | Observed behavior of the configured delivery adapter/transport and isolated receiving system, failure handling and necessary operational evidence | A generic API acknowledgement cannot establish transport acceptance; transport acceptance cannot establish mailbox receipt; controlled-sink success cannot establish configured-provider behavior |
| Human evaluation | The user's recorded observations for the named feature/revision/configuration | Unobserved features, other combinations, or an automatic inference from passing automation |

Never promote an example, simulated success, health endpoint, type check or design approval into stronger evidence. Each result records its layer, boundary and limitations. Historical frontend test totals are not current integration-readiness proof.

## 4. Reuse and minimum seams — approved Q1–Q3

Retain useful existing transitions/selectors/local validation and user-facing workflow assertions. Reuse does not require copying browser snapshot rules into shared API schemas. Current local-save messages and storage representation assertions remain local-specific. Connected operations need source-appropriate authoritative setup, validated completion and observable server state.

Use small justified capability-specific helpers for synthetic accounts, enrollment state, resources and browser contexts. Keep fixture preparation distinguishable from the operation being proved: seeding a resource does not prove that its creation endpoint or UI works. Use actual shared schemas at executable boundaries; do not duplicate their payload definitions in helpers.

Expose only the minimum controllable boundaries needed to observe frontend operation completion and authoritative server transitions. Do not prescribe a repository, global clock interface, universal adapter or new state architecture. Use controllable frontend operation/transport results for simulations and actual API/persistence execution for server claims.

## 5. Shared contracts, both consumers and OpenAPI — inherited approved obligations

Preserve all 22 explicit operations, five HEAD counterparts, 27 operationIds and 115 planned export identities/roles. For each applicable operation, cover allowed success/status/error/code/selected-metadata bindings and prohibited variants. Use exact per-operation restrictions; an error valid for another endpoint does not satisfy the binding.

Execute raw structure → approved explicit normalization → canonical validation → authoritative domain/access checks → strict server output → tolerant validated frontend reader at the appropriate boundaries. Include required/omitted/null/PATCH semantics, canonical no-op and stale revisions, whole-read failure, unknown request fields, nested response projection, safe bounded field diagnostics and malformed mutation uncertainty. Do not normalize, coerce or repair received payloads.

Prove browser and compiled API consumers use the actual public package exports and approved Unicode 17.0.0 baseline. Cover code-point length/trim stages, ordinary Unicode versus icon rules, dates/UTC milliseconds, email/password distinctions and other declared runtime predicates in the controlling specifications. Type-check-only success is insufficient for runtime imports or semantic parity.

For generated OpenAPI, prove the fail-closed feature guard, loss classification, catalog-derived transport/security/bindings, complete reference graph, valid dialect/document, positive and negative fixture classification, deterministic exact serialization and independent read-only semantic/byte drift verification. Verification must not repair or overwrite the reviewed artifact. Runtime-rule declarations carry enforcement owners and parity fixtures; unsupported expressible constraints are fatal rather than relabeled runtime-only.

Use the example companion as intended fixture design, not already validated evidence. Materialize explanatory placeholders, validate positives against actual appropriate schemas/bindings, and demonstrate negatives fail at their intended boundary with required earlier authority/integrity preconditions. Cover isolated failures and combined-failure precedence, including the approved enrollment-read context distinctions, recovery description validation and prohibited-content/media distinctions.

## 6. Frontend async and local/mixed evidence — approved Q1/Q2/Q4

Carry all ten async scenarios and nine validation scenarios. Controlled results must exercise:

- Pending create/edit/reassign/delete/profile/sign-out, frozen submitted editors and duplicate suppression across entry points; no committed success/closure/navigation before validated confirmation.
- Definite rejection with preserved editable input and safe field/operation feedback; malformed errors cannot prove noncommit.
- Pending project/task conflict scopes in both directions, moves involving source and destination, and usable unrelated work.
- Intentional navigation/dismissal with warning, return to account-scoped draft/status, and late success without forced navigation/reopening.
- Obsolete reads and prior-account responses that cannot overwrite current state; ignored responses do not imply rollback.
- Lost/invalid mutation responses, preserved original payload/submission identity, deliberate same-submission recovery and no automatic mutation replay, new-key recreation or stale historical snapshot installation.
- Update/delete uncertainty with authoritative refresh plus informed recovery; refresh, missing resources or discarded drafts alone do not prove the original outcome.
- Confirmed session expiry, same-account reconciliation, different-account isolation, explicit discard/sign-out lifetimes and browser-permitted unload warnings without promising cross-reload recovery.
- Whole-read failure and tolerant permitted extras, separate local in-memory/save states, local theme and explicit connected outages without fallback.

The actual API/browser layers must separately prove applicable real recovery/security/consistency behavior; simulation coverage alone cannot authorize an authoritative claim.

## 7. Authoritative runtime evidence — approved Q2/Q3 and inherited contracts

Use actual API requests that bypass frontend validation, with actual selected persistence and security processing. Cover:

- Two active accounts and foreign/missing resources: private coherent Workspace reads, concealment, commit-time ownership, standalone tasks and no client-established authority.
- Matching/stale/no-op ordinary and deletion revisions; Profile revision independence; atomic cascade and task create/edit/delete/moves into/out of Projects under both serial orderings.
- Concurrent same-account/operation/key creation; account/operation separation; original supplied-value equivalence; durable reservation/outcome; completed historical result after edit/delete; retained consumed markers; seven-day cutoff and unreliable lookup. A missing/expired record never permits recreation; only proven running work yields its declared in-progress result.
- Raw ingress/parser/media/body-size/original duplicate evidence, methods/routing and five GET/HEAD pairs; exact body suppression, status/error/header rules, integrity and failure precedence.
- All applicable authentication/anonymous/enrollment combinations, invalid/duplicate credentials, failed authoritative lookups and no downgrade; exact cookie/CSRF/Origin issue/rotation/clear/restriction behavior.
- Generic registration/resend acknowledgements, canonical identity uniqueness, proof cap/expiry/sibling races, scanner-safe links, pre-registration takeover resistance, owner enrollment atomicity and restricted recovery/active-account exclusion.
- Session inactivity/absolute deadlines, foreground activity/coalescing versus background/passive traffic, scoped sign-out/copied credential revocation and admitted-work semantics.
- Every applicable rolling abuse budget, concurrent exhaustion, trusted address derivation, response metadata and fail-safe dependency failures. Password/blocklist/security diagnostics follow their approved boundaries without exposing submitted credentials.

Use isolated synthetic active/pending identities, browser contexts, owned/foreign/standalone resources and known revisions. Credential literals from documentation are not live authority. Record server/persistence observations independently of the returned HTTP response when proving commit/durability.

Control authoritative clocks and observe immediately before, exactly at and after deadlines/cutoffs. Coordinate concurrent callers at meaningful validation/reservation/commit/outcome/revocation/delivery points and test both orderings. Inject faults before and after possible commit. No arbitrary sleeps, timing luck, production credentials or personal accounts. Test controls stay outside ordinary production API routes and create no deployed bypass. Concrete technology remains unselected.

## 8. Supported version combinations — approved Q5

Each increment records intended supported frontend and API contract/build combinations and the combinations actually exercised. Do not assume simultaneous upgrades or claim untested compatibility. Mark unsupported and untested combinations explicitly.

For supported combinations, verify recursively permitted additional response fields are stripped, declared fields remain validated, missing/type/enum/public-code changes fail safely, and operation/status/error/selected-metadata bindings remain correct. Unsupported/malformed mutation responses preserve uncertainty and deliberate recovery. Never relax cookie/context/CSRF/authority/revision guarantees for an older client.

Incompatible changes require explicit compatibility review and coordinated consumers. Do not invent API version routes, automatic migration, relaxed schemas or a deployment topology. Actual runtime/browser checks must support compatibility claims beyond schema comparisons.

## 9. Evidence and activation record — approved Q4

For every proposed connected capability, prepare a record containing:

1. Capability, authoritative module, local/connected/mixed configuration and coupled dependencies; source revision, contract revision, consumer builds and relevant runtime/environment/configuration.
2. Applicable endpoint/schema/OpenAPI/runtime-rule requirements and earlier scenario references; a row for each requirement with required evidence layers, case identities and result locations.
3. Reproducible isolated setup, actual commands, versions, controlled clock/concurrency/fault conditions and expected outcomes. Future commands remain to be selected; no unexecuted command is reported as a pass.
4. Actual observed frontend/server/persistence/browser/outbound-email results as applicable, including safe proof of relevant persisted effects. Mark passed, failed, skipped, blocked, not run and non-applicable distinctly, with reasons. Non-applicability is scoped to this capability, not retirement of a future requirement.
5. Tested/unsupported/untested consumer combinations, remaining risks, limitations and unresolved uncertainty.
6. Feature-by-feature human evaluation steps and the user's actual observations, if performed. Keep unperformed human checks pending; automation and guide readiness do not establish acceptance.

All applicable requirements need appropriate evidence before activation. A failed/skipped/blocked/unrun applicable case does not satisfy its requirement. Unrelated future-module cases do not block the increment. Assess Workspace Tasks/Projects/assignment/cascade as the approved common authority. Record technical evidence and human acceptance separately; this design introduces no automatic acceptance or additional human implementation gate.

## 10. Checkpoint coverage and per-capability allocation

This allocation is an index to controlling scenarios, not a replacement specification. Retain every checkpoint in the eventual evidence ledger, including future applicability. Shared contract/HTTP requirements apply to each capability's own routes; an interval below identifies primary ownership rather than excluding cross-cutting cases.

| Capability/concern | Controlling checkpoints | Required evidence |
| --- | --- | --- |
| Local independence and mixed authority | E33; S16; O12/O16; Blueprint 15; async 10; existing local audit U/L/F distinctions | Local browser safeguards, configured outage observations and relevant mixed connected/browser results |
| Shared fields/stages/readers/errors | E1–E3/E9/E31/E34; S1–S10/S14–S16; O2–O6/O12/O15/O16; validation 1–9 | Documentary trace, executable shared fixtures, actual request/output/reader behavior and both consumers |
| Workspace consistency and recovery | E4–E15/E33; S2/S3/S10/S11/S15; O8/O9/O12; Blueprint 1–6; async 1–8/10 | API/persistence concurrency/failure proof, controlled UI behavior and actual connected browser workflows |
| Authentication/enrollment/session/security | E16–E32/E33; S7–S9/S12–S15; O3/O6/O7/O10–O12; Blueprint 7–14; async 8–10 | Actual security/persistence/HTTP enforcement, browser credential/link/context behavior and controlled frontend uncertainty |
| Editable connected Profile and email scope | Applicable E1–E3/E5/E9/E16/E25–E34; S1–S4/S7–S10/S12–S16; O4–O8/O11/O12/O16; email 1–6; async 9 | Real account/profile revision/access/strict-field evidence, browser presentation/edit/reload and local Workspace isolation |
| Generator and derived document | E34; S16; O1–O16 at applicable document/runtime boundaries; tooling 1–5 | Complete 27-operation/115-export trace, actual guarded generation/fixture validation, read-only drift verification, runtime enforcement separately |
| Deployed compatibility | E9/E34; S10/S15/S16; O6/O12/O16; tooling consumer/import/client review | Explicit consumer combination matrix, actual executable/runtime/browser outcomes and safe incompatible-response behavior |

Complete parent coverage remains mandatory: E1–E34, S1–S16, O1–O16, ten async scenarios, nine validation scenarios, fifteen Blueprint scenarios, six email scenarios and all relevant contract/security/tooling requirements. Security research supplies facts and source context; the approved design specifies enforceable outcomes. Research probes do not establish production tooling acceptance.

## 11. Browser, outage, durability and email requirements — approved Q6–Q9

### 11.1 Browser coverage

Retain all six existing browser/viewport configurations for applicable browser-local MVP workflows and representative real connected workflows. Observe actual security-context behavior across supported engines: cookie handling, same-origin requests, CSRF bootstrap, explicit authentication, restricted enrollment, sign-out, session observation and relevant verification-link handling.

Keep exhaustive schema/operation/status/error/header permutations primarily at contract/API boundaries. Deterministic concurrency, server authority, durability and security enforcement require authoritative integration evidence. Do not multiply every backend case across viewports without justified browser-specific risk. Record browser-specific differences, justified exclusions and remaining gaps in the capability record. A browser skip does not waive an applicable requirement; identify appropriate alternative evidence or keep the gap open. Historical local passes prove no new connected behavior.

### 11.2 Observable local independence and outages

With API unavailable, explicitly record product API network activity while exercising local task/project/profile/demo-auth workflows. Demonstrate continued designated local operation without requiring or attempting remote domain/auth operations, including persistence/reload/recovery/export/isolation safeguards. Rendering the UI alone is insufficient.

For mixed mode, record each capability's authority, product requests, relevant local stored data and visible state before/after connected outages. Local capabilities retain local authority; connected capabilities use their designated server authority with visible errors and no demo authentication, snapshot or alternative-write fallback. Preserve unrelated local operation under approved lifecycle rules. Test fully connected outages separately, including loss after possible commit: no successful-persistence claim, false rejection or automatic replay.

Classify cosmetic, development-tool and static-asset traffic separately. Classifications must not obscure unintended product API requests. Record reproducible setup/actions, request method/route/outcome with secret-free metadata and relevant state observations rather than sensitive raw headers/cookies/bodies.

### 11.3 Interruption, restart and independent executors

Before accepting a capability whose guarantees depend on durable state, require interruption/restart evidence against the actual persistence implementation. Exercise applicable creation-key reservation, domain transaction commit, immutable creation-outcome recording, evidence retention/consumed-key lifecycle, session/proof revocation, enrollment activation and HTTP response delivery after possible commit. Include interrupted cascade work wherever its atomicity/durability is at issue.

Use a fresh execution context after restart to inspect persisted authoritative state or invoke the approved deliberate recovery operation. One uninterrupted-process pass cannot prove durability. Where supported execution uses multiple server executors/processes, verify relevant concurrency/recovery across independent executors sharing authoritative persistence. Do not impose a deployment topology solely for a test framework.

Prove no duplicate creation, unsafe takeover/recreation, partial cascade, cross-account effects or lost committed revocation, and no false noncommit inference. Preserve uncertain outcomes when evidence is insufficient; interruption is not permission to replay or clear consumed-key protection. Use controlled server time, barriers and targeted faults before/after meaningful transitions; isolate test controls from ordinary deployed production endpoints. Concrete persistence/fault tooling remains implementation planning.

### 11.4 Controlled email lifecycle and configured delivery

Use an isolated controlled mail sink for deterministic registration, verification, resend, pending-enrollment recovery and email-security tests. Exercise actual generated test credentials and the approved browser flow, not placeholder authority. Cover:

- Generic registration/resend acknowledgement without account enumeration, delivery failures, repeated requests and suppressed sends.
- Proof issuance, independent expiry, maximum concurrent proofs, one-time consumption and the seven-day pending-account issuance cutoff.
- Same-account enrollment replacement and conflicting-context rejection.
- Fragment-based verification with explicit protected confirmation; GET/HEAD/scanners/prefetch/hydration must not redeem proofs.
- Credential secrecy, safe links, origin/context behavior, explicit enrollment completion and subsequent separate sign-in.

Record three separate observations: (1) approved API acknowledgement; (2) outbound transport acceptance; (3) receipt by the intended mailbox or controlled receiving system. None proves the next. Queued delivery alone is also not transport acceptance or receipt.

Before activating a capability dependent on outbound email, separately verify the configured delivery integration, failure handling and necessary operational evidence in an appropriately isolated environment. Keep controlled-sink lifecycle proof separate from configured-provider results and disclose remaining limits. Do not require personal inboxes or production credentials; do not expose reusable verification secrets in logs/evidence artifacts. Captured credentials may be used within isolated execution without publishing them as evidence.

## 12. Reproducible review and later hands-on guide

All runtime steps below are future evaluation, unexecuted here. Implementation planning must replace abstract setup with actual commands and record observed results per increment.

| Checkpoint | Reproduce | Expected observation / current status |
| --- | --- | --- |
| T1 — Scope/authority | Select local, Authentication-connected/Workspace-local, Profile-connected/Workspace-local or connected Workspace; list authority for each capability | Approved ownership and no automatic activation/fallback; documentary review now, runtime pending |
| T2 — Contract and package | Trace actual schema roles/exports and each applicable operation/binding, run positive/negative/parity fixtures and browser/compiled API imports | Exact approved semantics and safe failures; implementation pending |
| T3 — Generated document | Apply guard, generate, resolve/validate document, validate fixtures, compare repeat bytes; deliberately alter one binding/byte and verify without changing the reviewed file | Complete catalog-derived coverage, visible loss/drift failure, unchanged reviewed artifact; implementation pending |
| T4 — Pending/rejection | Delay a create/edit/delete/profile submission, repeat from another entry point, then reject; inspect committed UI and drafts | Confirmed-completion policy, bounded conflict coordination, retained input and safe errors; simulated and actual-browser evidence pending |
| T5 — Navigation/isolation | Dismiss/navigate pending work; return; reorder reads; switch accounts before late success; expire and reauthenticate | No obsolete overwrite/forced view, origin-account isolation and deliberate reconciliation; evidence pending |
| T6 — Uncertainty/recovery | Lose response after possible commit; recover same creation submission; vary original payload; edit/delete resource then recover; use expired/unreliable history | No duplicate/new-key retry/resurrection/stale installation or invented certainty; API/persistence and browser evidence pending |
| T7 — Atomic Workspace | Two accounts/contexts race cascade with task create/moves/edits; race stale/no-op revisions and coherent reads | Valid serial outcomes, privacy and approved revision semantics under one authority; API/persistence evidence pending |
| T8 — Lifecycle/security | Exercise active/pending/anonymous contexts, proof/enrollment races, scanner opening, cookie/Origin/CSRF and copied revoked credentials | Exact approved restrictions/precedence, intentional activation/sign-in, no bypass/leak; real API and browser evidence pending |
| T9 — Clock/budget/failure | Advance before/at/after expiry/retention/rate thresholds, coordinate actors and interrupt/restart at applicable reservation/commit/outcome/retention/revocation/activation/delivery boundaries; inspect/recover from fresh execution context | Server-authoritative boundaries, atomic durable effects and safe uncertainty; independent-executor checks where supported; API/persistence evidence pending |
| T10 — Profile/email | Display email, edit display name, attempt email/identity submission and stale revision; retain local Workspace/theme in mixed mode | Read-only email/identity, authoritative Profile revision and no scope expansion; API/browser evidence pending |
| T11 — Local/outage | Exercise local task/project/profile/demo-auth, reload/recovery/export/isolation with API stopped; record classified network and state observations; inject outages separately in mixed/connected configurations | No local-only remote domain/auth attempts/dependence, local safeguards preserved, connected errors/uncertainty with no fallback/replay; runtime pending |
| T12 — Compatibility | Run each claimed frontend/API combination; add permitted nested fields then missing/type/enum/code/status/header faults | Projection versus safe complete rejection; mutation uncertainty and security retained; evidence pending |
| T13 — Human evaluation | Follow the increment's feature guide, record revision/configuration and actual expected/observed results | User observations only; all future integration human acceptance pending |
| T14 — Email lifecycle and delivery | Capture test proof in controlled sink, open fragment link, attempt GET/HEAD/scanner and explicit confirmation; test expiry/cap/cutoff/replacement/revocation/faults; complete enrollment then separately sign in. Separately exercise configured delivery and receiving system | Generic acknowledgement/transport acceptance/receipt separately observed; protected lifecycle, no secret leakage and applicable outbound operational evidence; all runtime/email evidence pending |

Completed final review: the user reviewed Section 11 and Sections 14–17 against Q1–Q9 and the authoritative requirements, found no material discrepancies and explicitly approved the complete consolidation and T1–T14. Preserve this guide for future separately authorized implementation evaluation. Its first concrete human action must be supplied per implemented capability using Section 16; no runtime evaluation starts here and no next decision is started.

## 13. Actual documentary preflight and approval ledger

On 2026-10-25, read the map, owning ticket, local tracker/domain guidance, grilling/domain-modeling skills and relevant approved requirements/scenario guides. Prior read-only inspection established web-only browser startup, local snapshot fixture/save dependence, reusable UI workflows and pure transition/selector seams, and API health-only evidence. See [frontend architecture](../../../docs/architecture/frontend.md), [E2E audit](../../../docs/testing/e2e-coverage-hardening-audit.md) and [historical evaluation](../../../docs/testing/e2e-coverage-hardening-evaluation.md). Before creating the working strategy, Git status showed only the existing owning-ticket claim/comment edit. At the start of final consolidation, it showed that ticket edit and the untracked working strategy.

Q1–Q9 with all user clarifications and the complete consolidation: explicitly approved, recorded in the owning ticket's Answer. Generated artifacts, executable fixtures, application tests/builds, actual API/persistence/browser/security/outbound-email evidence and human implementation acceptance: not established by this session.

The resolution authorization covers this approved design, its owning decision, the map and a reference-only update in the existing downstream decision. No application changes, test execution, dependency installation, commit/push or other ticket claim/start is authorized. Earlier preflight observations below describe the then-current working draft and lifecycle, not the final resolved status.

Earlier working-draft checks passed for 29 relative links, whitespace/final newlines, claimed/unresolved lifecycle and required reference presence. The final-consolidation checks are recorded below after execution. Documentary checks cannot establish runtime behavior or human acceptance.

Final-consolidation preflight at source HEAD `64fd781d4b275452765f3bc6e4a5f77892bb98bc`: compared the approved Q1–Q9 clarifications with Sections 1–17 and the controlling evaluation guides. Documentary checks passed for all 66 ordered E/S/O rows against source checkpoint identities/titles, the 13 runtime-rule identities, Q1–Q9 approval-ledger entries, 41 relative file links and 13 explicit section anchors, whitespace/final newlines, and the claimed/unresolved lifecycle with no Answer. The documentary checker scopes catalog E1 separately from runtime rule E1. `git diff --check` passed. The map and next ticket match HEAD byte-for-byte; Git status shows only the owning-ticket edit and new strategy. These observations establish documentary integrity and traceability only, not exhaustive executable case coverage, artifact generation, runtime enforcement, activated capabilities or human implementation acceptance.

## 14. Capability-specific activation criteria and exceptions

Each capability needs the Section 9 record and all of its applicable approved requirements, including cross-cutting contracts/security/compatibility. These criteria scope evidence, not a release sequence or permission to activate now.

| Capability/configuration | Applicable evidence required before activation |
| --- | --- |
| Independent local baseline | Retain existing local UI/storage/recovery/export/isolation coverage across applicable six configurations; T11 network/state evidence with API unavailable. This is preservation evidence, not activation of a remote capability |
| Connected Authentication/account core, Workspace local | Executable contracts/imports/document checks for its surface; real API/persistence lifecycle/context/security/abuse enforcement; T8/T9/T14 proof/enrollment/session/revocation and restart evidence; configured outbound integration before email-dependent activation; cross-engine cookie/same-origin/CSRF/auth/enrollment/sign-out/session observations; T4–T6 applicable auth uncertainty/drafts; T11 local Workspace/theme/no fallback; supported consumer combinations |
| Connected editable Profile | Real active-account dependency; strict display-name-only updates, immutable ID/read-only email, independent revision, normalized output/errors and no unauthorized fields; T4/T5/T10 async/account isolation; actual browser read/edit/reload and API authorization; mixed local Workspace/theme isolation and compatibility. Retain dependency Authentication security evidence at the tested compatible revision |
| Connected Workspace | Real active-account dependency and shared Task/Project/assignment/cascade authority; complete applicable request/read/error/revision/cascade/idempotency/history/privacy/abuse evidence including authoritative races and restart; T4–T7/T9 UI coordination/recovery plus cross-surface task/project/Dashboard consistency; actual browser CRUD/reassign/standalone/cascade workflows and supported compatibility; retain independent local configuration separately |
| Changed shared contracts/catalog/generator/consumer build | Applicable full export/role/operation/binding/runtime-rule/fixture/guard/drift checks, both real consumer imports and first-module client-tooling review. Reevaluate affected capability evidence and supported combinations; unchanged unrelated modules need no speculative new behavior tests |

Earlier evidence may be referenced with its exact revision/configuration and an explicit applicability/impact explanation; do not silently relabel stale results as current evidence. The record must show whether a change affects authority, contracts, runtime behavior, browser behavior, delivery or durable state.

Use one requirement row per capability with: controlling source/checkpoint, operation or rule, required layers, reproducible case/setup, expected outcome, actual outcome, evidence pointer, status and reason. For an exclusion/non-applicable case, state why the requirement does not apply to this capability/configuration, its future owner if relevant and any alternative observation. For a skip/block/failure, state the missing observation and unresolved limitation. A reason alone does not satisfy an applicable requirement or waive approved security/durability. No exception silently weakens the catalog or closes a future checkpoint.

The compatibility record has these columns: frontend source/build/contract revision; API source/build/contract revision; relevant configuration and supported engines; intended support (supported/unsupported/not yet decided); actual cases/evidence; result (passed/failed/blocked/not run); limitations and compatibility-review reference. Concrete revision combinations are **not selected or tested in this planning decision**. Later records must enumerate them before claiming support, including intended staggered combinations where applicable, rather than inventing a simultaneous-upgrade assumption. Unsupported and untested are distinct classifications.

## 15. Detailed checkpoint traceability

Each row retains the controlling scenario's full reproduction/expected outcomes by reference. The mapping identifies principal evidence layers and T-checkpoints; it does not replace operation-specific cases or authorize sampling exhaustive binding coverage. Applicable requirements retain all needed layers even where one row names a primary layer. Current status of every runtime row: **not executed**. Documentary comparison only has been performed here.

Layer key: D documentary; F controlled frontend simulation; C executable contracts/build/generation; A actual API; P actual persistence including deterministic race/restart when applicable; B actual browser; M configured outbound email; H human observations. D applies to every row. Controlled sink lifecycle observations belong with A/P/B; M is separately required for configured outbound delivery. Human checks use Section 16 and never substitute for exhaustive authoritative proof.

### Endpoint Catalog — [E1–E34](endpoint-catalog.md#13-reproducible-design-review-and-future-evaluation)

| Checkpoint | Principal layers | Reproduction guide |
| --- | --- | --- |
| E1 — Complete resource inputs | C/A | T2/T7/T10 |
| E2 — Canonical boundaries | C/A/B | T2/T4/T10 |
| E3 — Calendar/metadata | C/A/B | T2/T7/T10 |
| E4 — Coherent complete read | A/P/B | T7 |
| E5 — Revision/no-op | A/P/B | T7/T10 |
| E6 — Deletion privacy/syntax | C/A/P | T2/T7 |
| E7 — Project deletion scope | A/P | T7 |
| E8 — Cascade races | A/P | T7/T9 |
| E9 — Response boundaries | C/F/A/B | T2/T4/T5/T6/T12 |
| E10 — Same-key concurrency | A/P | T6/T9 |
| E11 — Original-input equivalence | C/A/P | T2/T6 |
| E12 — Historical recovery | A/P/F/B | T6/T9 |
| E13 — Retention edge | A/P | T6/T9 |
| E14 — Unavailable evidence | A/P/F/B | T6/T9 |
| E15 — Reservation safety | A/P | T6/T9 |
| E16 — Email identity | C/A/P | T2/T8/T14 |
| E17 — Generic acceptance | A/P/B/M | T8/T14 |
| E18 — Proof cap/expiry/races | A/P | T8/T9/T14 |
| E19 — Link safety | A/B | T8/T14 |
| E20 — Pre-registration takeover | A/P/B | T8/T14 |
| E21 — Enrollment atomicity | A/P/B | T8/T9/T14 |
| E22 — Seven-day edge | A/P | T8/T9/T14 |
| E23 — Fresh proof/exit | A/P/B | T8/T14 |
| E24 — Lost transitions | A/P/F/B | T5/T6/T8/T14 |
| E25 — Password boundaries | C/A/B | T2/T8 |
| E26 — Context matrix | C/A/B | T2/T8 |
| E27 — Integrity/precedence | C/A/B | T2/T8 |
| E28 — Session cookies/revocation | A/P/B | T8/T9 |
| E29 — Activity/deadlines | A/P/F/B | T5/T8/T9 |
| E30 — Abuse controls | C/A/P | T2/T8/T9/T14 |
| E31 — Raw HTTP | C/A | T2/T8 |
| E32 — Metadata/methods | C/A/B | T2/T3/T8 |
| E33 — Frontend/local independence | F/A/P/B/H | T1/T4–T6/T10/T11/T13 |
| E34 — Schema/OpenAPI compatibility | C/A/B | T2/T3/T12 |

### Shared Schema — [S1–S16](shared-schema-contracts.md#11-feature-by-feature-design-review-and-future-hands-on-evaluation)

| Checkpoint | Principal layers | Reproduction guide |
| --- | --- | --- |
| S1 — Roles/authority | C/A/B | T2 |
| S2 — Resource identity/fields | C/A/B | T2/T7/T10 |
| S3 — Completeness/null/PATCH | C/A/P | T2/T7/T10 |
| S4 — Unicode/limits | C/A/B | T2/T4 |
| S5 — Color/icon | C/A/B | T2/T7 |
| S6 — Dates/instants | C/A/B | T2/T7 |
| S7 — Requests/headers/cookies | C/A/B | T2/T8 |
| S8 — Error mappings/safety | C/F/A/B | T2/T4/T12 |
| S9 — Diagnostic bounds/order | C/A/F/B | T2/T4/T12 |
| S10 — Response/read integrity | C/F/A/B | T2/T5/T12 |
| S11 — Creation/recovery | A/P/F/B | T6/T9 |
| S12 — Authentication | C/A/P/B | T2/T8/T9/T14 |
| S13 — Context/session | C/A/P/B | T5/T8/T9 |
| S14 — HEAD/HTTP | C/A/B | T2/T3/T8 |
| S15 — Compatibility/uncertainty | C/F/A/P/B | T5/T6/T12 |
| S16 — Generation/build/local independence | C/A/B/H | T1/T2/T3/T11/T13 |

### OpenAPI — [O1–O16](openapi-specification.md#12-reproducible-feature-by-feature-evaluation)

| Checkpoint | Principal layers | Reproduction guide |
| --- | --- | --- |
| O1 — Identity and URL inventory | C/A | T2/T3 |
| O2 — Export graph and roles | C | T2/T3 |
| O3 — HTTP/body/metadata | C/A/B | T2/T3/T8 |
| O4 — Completeness/PATCH/stages | C/A/P | T2/T7/T10 |
| O5 — Semantic parity | C/A/B | T2/T3 |
| O6 — Error applicability/safety | C/F/A/B | T2/T4/T6/T12 |
| O7 — Security contexts/precedence | C/A/B | T2/T8 |
| O8 — Domain/revisions/privacy | A/P | T7/T9/T10 |
| O9 — Creation/recovery | C/A/P/F/B | T2/T6/T9 |
| O10 — Routing and HEAD | C/A | T2/T3/T8 |
| O11 — Lifecycle/abuse | C/A/P/B | T8/T9/T14 |
| O12 — Consumer/local independence | C/F/A/P/B | T1/T2/T4–T6/T11/T12 |
| O13 — Generation guard | C | T3 |
| O14 — Determinism and drift | C | T3 |
| O15 — Example classification | C/A | T2/T3/T8 |
| O16 — Imports and human observations | C/B/H | T2/T12/T13 |

### Earlier approved requirements

| Controlling guide | Coverage carried forward | Evidence allocation |
| --- | --- | --- |
| [Frontend-facing contract](frontend-facing-contract.md#review-and-evaluation-guide) | Scenarios 1–10: completeness, PATCH, text, domain, dates, deletion, reads, account/auth, evolution and ownership | T1/T2/T4/T6–T8/T10–T13; C/A/P/B, documentary ownership review |
| [Async policy](async-operation-policy.md#review-and-future-evaluation-guide) | Scenarios 1–10: create/navigation, edit/reassign, cascade conflicts, leave/return, stale data, uncertain creation, uncertain update/delete, expiry/account isolation, profile/sign-out, reload/local | T4–T6/T8/T10/T11/T13; F plus applicable A/P/B; simulations cannot establish durability/security |
| [Validation policy](validation-policy.md#reproducible-review-and-future-evaluation) | Scenarios 1–9: bypass, limits, preserved values, relationships, output/readers, whole collection, errors/uncertainty, profile identity, local independence | T2/T4–T7/T10–T12; C/F/A/P/B |
| [Blueprint](api-architecture-blueprint.md#reproducible-design-review-and-future-evaluation) | All fifteen scenarios, including revised foreground-activity policy | 1: T1/T11; 2: T2/T4; 3–5: T7/T10; 6: T6/T9; 7–11: T8/T9/T14; 12–14: T8/T9; 15: T11; applicable C/F/A/P/B/M |
| [MVP email scope](account-email-scope.md#reproducible-evaluation-guide) | All six scenarios: presentation, display-name edit, forbidden identity/email fields, no extra routes, lifecycle isolation, deferred scope | T2/T8/T10/T14; C/A/P/B plus documentary inventory/scope review |
| [Tooling design](shared-schema-tooling.md#evidence-and-reproducible-review) | All five review scenarios, six mandatory generation safeguards, actual browser/compiled-API imports and first-module client-tooling review | T2/T3/T12/T13; D/C/B/H where applicable; research probes remain limited facts |
| [Authentication evidence](authentication-security-evidence.md) and [password/cookie evidence](password-cookie-security-evidence.md) | Source context and limitations, including registration takeover/scanner/resend, password/blocklist, cookie/CSRF/restricted credentials and uncertain recovery; approved enforceable choices remain in Blueprint/catalog/schema/OpenAPI | T2/T6/T8/T9/T14; C/A/P/B/M as applicable, without treating research recommendations as new policy |

### Runtime-rule enforcement trace

Preserve the exact [OpenAPI runtime-rule inventory](openapi-specification.md#8-runtime-rule-inventory-representation-and-enforcement-ownership), its operation/schema applicability and enforcement owners. In this table `rule E1` is the email rule, distinct from catalog checkpoint E1. Every rule also needs C evidence of faithful expressible constraints, declarations and resolved references; rule presence alone proves no runtime enforcement.

| Rule | Runtime enforcement evidence | Reproduction guide |
| --- | --- | --- |
| U1 — Scalar Unicode/code-point stages | Shared validators and actual browser/API parity, canonical-stage boundaries | T2/T4 |
| U2 — Unicode 17 icon admission | Shared validators and browser/API classification parity, no uppercase/truncation | T2/T7 |
| U3 — Explicit canonicalization | Actual operations/shared validators/readers, original-input recovery distinctions | T2/T4/T6/T10 |
| D1 — Calendar/instant semantics | Shared validators and browser/API semantic/date-display observations | T2/T7 |
| T1 — Credential encoding/binding | Shared syntax/parity plus real server randomness/purpose/expiry/revocation and browser contexts | T2/T8/T9/T14 |
| E1 — Email identity | Shared/browser/API parser parity and atomic canonical identity uniqueness | T2/T8/T9/T14 |
| P1 — PATCH presence/revisions | Shared constraints plus atomic actual-persistence expectedRevision/no-op enforcement | T2/T7/T10 |
| X1 — Bounded safe diagnostics | Real server construction, reader validation and safe visible operation/field feedback | T2/T4/T12 |
| H1 — Original HTTP/metadata/security | Actual ingress/HTTP processing and accessible browser metadata/context behavior | T2/T8/T12 |
| B1 — Domain authority/consistency | Actual API/persistence isolation, coherent reads, revisions/cascade/assignment races and restart | T7/T9/T10 |
| I1 — Durable creation/recovery | Actual API/persistence reservation/outcome/history/marker races and restart; deliberate frontend reconciliation | T6/T9 |
| A1 — Auth/lifecycle/abuse | Actual API/persistence clocks/concurrency/revocation/limits, browser link/context/session and separate configured email evidence | T8/T9/T14 |
| C1 — Consumer integrity/uncertainty | Controlled frontend cases plus actual consumer/browser/API recovery/local/network observations | T1/T2/T4–T6/T11/T12 |

## 16. Usable human-evaluation worksheet

For each implemented increment, the handoff must provide actual start/setup/reset commands, named configuration/authority, tested revision/contract/browser combinations, isolated fixture identities and the first concrete UI action. Those commands/fixtures do not exist as implementation deliverables here; populate them before asking the user to evaluate. No personal accounts or reusable secrets belong in a handoff.

Each applicable row below becomes a feature check with fields **setup; exact actions; expected outcome; actual observation; evidence reference; user-reported result**. Initially actual observation is **not evaluated**. Record pass/fail/blocked/not evaluated from the user's report; do not infer whole-ticket acceptance or convert automated success into their observation. Explain non-applicable rows for the selected increment and retain future coverage.

| Feature | Concrete action sequence for the later handoff | Expected observation |
| --- | --- | --- |
| Local independence | Select local-only setup, make API unavailable, create/edit/reassign a task, create/delete a Project, edit demo profile/use demo auth, reload; run supplied storage-failure/recovery/export/isolation setup | Local operations/save notices and safeguards work; captured product traffic shows no remote domain/auth attempts |
| Mixed authority | Select Authentication/Profile-connected with Workspace-local, create local task, change connected display name, interrupt API, attempt connected action and unrelated local task action | Correct authority/save semantics; local operation retained, connected error visible, no demo/snapshot/alternative-write fallback |
| Confirmed completion | Use supplied delay control, submit create/edit/delete, try duplicate/conflicting control and unrelated work, then release success or definite rejection | Pending/frozen submission, bounded conflicts, no premature committed change; rejection preserves input and success uses validated authority |
| Navigation/drafts | Submit delayed operation, dismiss/navigate after warning, return, then release response; repeat with account switch/expiry using supplied isolated contexts | Origin-account draft/status retained under approved lifetime; no forced navigation/reopen or cross-account/stale overwrite |
| Uncertain creation/recovery | Use supplied response-loss setup, create once, invoke deliberate same-submission recovery, then inspect current Workspace | Explicit uncertainty, no automatic/new-key retry/duplicate; original historical result does not overwrite newer state |
| Workspace/cascade | Create two Projects plus assigned/standalone tasks; move a task, inspect list/board/Dashboard counts, delete one Project with confirmation and reload | Coherent cross-surface state, correct cascade and unrelated/standalone survivors; race/atomicity proof comes separately from A/P evidence |
| Profile/email | Read registered email, edit display name, use supplied competing-context stale edit, inspect account identity/email after reload | Email read-only, ID immutable, canonical display name and explicit conflict; no hidden identity/email update |
| Verification/enrollment | Use isolated sink receipt, open generated fragment link, observe pre-confirmation state, explicitly confirm, complete enrollment, then separately sign in | Safe link/no early redemption; restricted enrollment, explicit activation and separate sign-in; record no reusable proof value |
| Session/sign-out | Use two isolated sessions; sign out one, observe other; use supplied expiry/activity setup, then reauthenticate same account | Confirmed scoped sign-out, authoritative expiry, no passive renewal/demo fallback; drafts/recovery follow approved isolation |
| Delivery evidence | Review isolated configured-delivery record and receiving-system observation alongside controlled-sink lifecycle record | Acknowledgement, transport acceptance and receipt separately evidenced with limits; no automatic inference or exposed secrets |
| Compatibility/browser differences | Use supplied supported build pairs and engine setup; exercise a representative workflow and controlled invalid/extra response case | Permitted extra projection, safe declared-field rejection/uncertainty; record engine differences and tested combinations only |

The guide is preparation, not evidence that a human performed it. Technical activation evidence and user implementation acceptance remain separate records; no new unrequested approval gate is created by the worksheet.

## 17. Approval traceability and explicit final confirmation

| Approved question | Incorporated requirements |
| --- | --- |
| Q1 — Test boundaries | Sections 1–4/6/14; local, connected and mixed authority; justified reuse/helpers; historical limits |
| Q2 — Simulated versus authoritative | Sections 3/5–7/15; explicit evidence limits and authoritative enforcement |
| Q3 — Reproducible races/deadlines | Sections 4/7/11.3/12; isolated identities/time/barriers/faults and implementation-choice deferrals |
| Q4 — Per-increment evidence | Sections 2/9/10/12/14–16; applicable requirements, common Workspace authority, activation records and pending human observations |
| Q5 — Deployed compatibility | Sections 5/8/14–16; explicit supported/unsupported/untested combinations and no weakened security/uncertainty |
| Q6 — Browser coverage | Sections 11.1/14–16; six configurations, actual cross-engine security and justified allocation/exclusions |
| Q7 — Observable independence | Sections 2/6/11.2/12/14–16; classified network/state evidence in separate local/mixed/connected modes |
| Q8 — Durable state after interruption | Sections 7/11.3/12/14–16; actual persistence, fresh context/restart, independent executors where supported and invariant proof |
| Q9 — Email boundary | Sections 3/7/11.4/12/14–16; controlled-sink lifecycle versus configured delivery and three distinct observations |

The user explicitly approved this complete document, all Q1–Q9 clarifications, T1–T14, complete E1–E34/S1–S16/O1–O16 traceability, all 13 runtime-rule identifiers and the evaluation worksheet on 2026-10-25. Their final review found no material discrepancies and required no further architectural revisions. The owning decision is resolved; its Answer records the confirmation and scope.

This completes the testing design strategy only. All future simulated/executable-contract/API/persistence/browser/outbound-email verification and actual human implementation observations remain pending. This confirmation establishes neither integration readiness nor activated capabilities. Implementation, test execution, dependency/configuration work, production integration, other ticket claims/starts, commits and pushes remain outside authorization. Resolution work stops after required documentation updates/checks and reporting.

Resolution documentary checks on 2026-10-25 passed across the strategy, owning ticket, map and reference-only downstream update: 90 relative links, 36 section anchors, 66 source-matched E/S/O checkpoint identities/titles, 13 runtime rules, Q1–Q9 and T1–T14; valid acyclic dependencies across 18 decision tickets and resolved prerequisites. Only the owning ticket's lifecycle changed. Whitespace/final newlines and tracked/staged diff checks passed. Before/after hashes confirmed exactly four authorized document changes, 369 other non-ignored tracked/untracked files unchanged and the existing index preserved. These are documentation checks only; no runtime evidence or human implementation acceptance is established.
