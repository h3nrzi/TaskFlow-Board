# MVP account email scope

Decision owner: [Define account email-change scope and security requirements](../issues/16-account-email-change.md).

Status: approved on 2026-10-24. Q2 explicitly confirmed the complete specification against Q1 and all six evaluation scenarios, found no material discrepancies and authorized resolution. Design approval only; runtime verification and human implementation acceptance remain pending.

## Approved scope

An authenticated MVP account exposes its registered email address as read-only. Canonical account ID remains immutable. Ordinary profile updates support display-name editing only, retaining approved raw/canonical validation, account ownership checks and independent profile optimistic concurrency. Neither ordinary profile requests nor client-supplied account data may modify the registered email address. Attempts to submit email/identity fields through ordinary profile updates must fail the approved strict request validation rather than silently modify or ignore them.

Exclude email-change endpoints, pending email-change workflows and email-change-specific verification or recovery processes from the MVP API Architecture Blueprint, Endpoint Catalog, shared schemas and OpenAPI specification. Account responses still expose the registered email; registration/enrollment contracts retain the email inputs required by their approved lifecycle. Exact request/response and rejection encoding remain with the catalog/schema owners.

Preserve all approved registration, email ownership verification, owner-controlled enrollment, account activation, sign-in, session security and account isolation guarantees. In particular, pending-account verification/enrollment recovery cannot reopen an active account, replace its established authentication credentials or become an alternate email-modification path. Deferral adds no password recovery, account recovery or other email-modification capability. Existing restricted pending-account enrollment recovery remains in scope under the approved Blueprint.

## Deferred capability and trigger

Secure email changes are an explicitly deferred account-settings capability. Revisit when account settings are expanded. Before designing or implementing its endpoints, establish authorization, reauthentication, new-mailbox proof, conflict handling, session effects and recovery requirements. None of those policies, mechanisms or endpoints is selected here.

## Preparation and downstream obligations

Documentation/contract scope only: no application, dependency, storage, configuration or test changes, and no preliminary refactor required by this decision. Current browser-local behavior remains unchanged; connected profile behavior must follow the approved restrictions when integrated.

The resolved decision is indexed in the map; email changes are explicitly out of scope for this MVP. The Blueprint and Endpoint Catalog, shared-schema and OpenAPI decisions link this specification as a binding scope requirement. Their owners must preserve read-only account email without introducing an alternate mutation route. Registration email identity/comparison and exact transport/schema design remain their existing owners' decisions; this deferral does not decide those policies.

## Reproducible evaluation guide

These are design-review checkpoints and future implementation checks, not executed runtime evidence:

1. **Account presentation:** review an authenticated account response: registered email is exposed, immutable account ID is retained and email has no edit action in the planned connected profile workflow.
2. **Display-name update:** review a valid display-name update using the current profile revision: canonical validation, account ownership and revision checks remain required; success returns authoritative profile data and its revision. Email and account ID remain unchanged. Stale revisions still conflict.
3. **Unauthorized field changes:** submit an ordinary profile payload containing an email or account-ID field, including alongside a valid display name. Strict request validation rejects the unsupported fields; no identity/email mutation is permitted. Client-supplied account data never establishes authority.
4. **API surface:** inspect the Blueprint, Endpoint Catalog, shared-schema inventory and OpenAPI operations for email-change endpoints, pending-change state and email-change verification/recovery contracts. All are absent; registered-email response fields and approved registration/enrollment inputs remain present where required.
5. **Lifecycle isolation:** trace registration, mailbox proof, restricted enrollment/recovery, activation, explicit sign-in and session handling against the approved Blueprint. Deferral weakens none of their guarantees, and pending recovery cannot modify an active account's email or credentials.
6. **Scope boundary:** confirm that password/account recovery and alternate email modification have not been added. Record the account-settings expansion trigger and the required security decisions before future endpoint work.

## Preflight and acceptance

On 2026-10-24, inspected the owning ticket, the approved frontend-facing contract and Blueprint, the map's dependencies, and the Endpoint Catalog/shared-schema/OpenAPI ticket requirements. Existing documents leave email-change inclusion with this decision and exclude email from ordinary profile updates; no conflicting approval was found. The catalog remains blocked until this ticket resolves. Git status before consolidation showed only the owning ticket's claim change. No application tests, builds or runtime/security checks were run for this documentation-only scope decision.

Q2 confirmed the complete specification and all six scenarios with no material discrepancies. Documentation whitespace, local-link, lifecycle and dependency checks passed after propagation. No runtime evidence is claimed. First concrete planning action: resume the map with [Design the MVP Endpoint Catalog](../issues/12-endpoint-catalog.md), the next frontier decision. Preserve all six scenarios for future implementation evaluation; runtime verification and human implementation acceptance remain pending actual evidence and observations.
