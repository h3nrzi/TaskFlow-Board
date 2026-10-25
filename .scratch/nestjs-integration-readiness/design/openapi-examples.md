# OpenAPI example and counterexample design

Companion to the [OpenAPI design specification](openapi-specification.md), owned by [Specify the OpenAPI document and its contract consistency rules](../issues/14-openapi-specification.md). **Approved in full by Q14 on 2026-10-25**, together with the complete main design and O1–O16 guide, with no material discrepancies. This is design approval only; executable fixture/schema validation and human implementation acceptance remain pending.

## Classification and authority

These are synthetic illustrative values, not DTO/schema definitions, a hand-maintained OpenAPI document, live credentials or evidence of schema/runtime acceptance. Approved payload definitions remain in the [shared-schema specification](shared-schema-contracts.md) and operation policies in the [Endpoint Catalog](endpoint-catalog.md), refined by the owning ticket's Q11–Q13 approvals.

- **P — Intended positive:** literal JSON suitable for later executable schema validation at the named boundary; presently unverified against actual shared schemas because none are implemented. No placeholder strings or missing expanded payloads are used in P bodies below.
- **N — Intentionally invalid:** expected failure at a specified boundary; never attach it as a positive OpenAPI example. Some N cases are materialization recipes rather than literal executable fixtures, explicitly marked below.
- **E — Explanatory:** metadata/context/clock/setup instructions or recipes that cannot be executed until materialized with an implementation. They do not count as validated positive examples.

Identifiers are visibly synthetic; example.com and taskflow.example are reserved illustrative domains, not personal data or deployment hostnames. Fixed proof/CSRF values encode mock32-byte patterns, have no live server binding and grant no authority. Never publish live/reusable credentials/proofs/CSRF tokens/cookies, user data or real account IDs. No cookie values or Set-Cookie credential payload examples appear here. Tests of credential descriptors must create isolated in-memory test values and redact output. The mock password illustrates Unicode/raw/canonical shape only; domain blocklist acceptance must be checked separately in an isolated implementation, never assumed from a string example.

## P — Concrete request and success fixtures

Implementation must validate each literal against the exact named shared schema, then the applicable operation/status binding in the main design. Request values with trim margins illustrate raw input; they are not canonical fixtures. Matching canonical output is separate. Do not send unbound mock proof/CSRF values to a live service and call that an authorized positive test. Authorized HTTP positives need proper isolated contexts, clocks and binding setup.

### TaskCreateRequest

P / `TaskCreateRequestSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "title": "  Example task  ",
  "description": "Synthetic description.\nPreserve this newline.",
  "status": "todo",
  "priority": "medium",
  "projectId": "project_example",
  "dueDate": "2028-02-29",
  "assignee": null
}
```

### ProjectCreateRequest

P / `ProjectCreateRequestSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "name": "  Example project  ",
  "description": "Synthetic example only.",
  "color": "#558b73",
  "icon": "😀"
}
```

### TaskPatchRequest

P / `TaskPatchRequestSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "expectedRevision": "task-r1",
  "title": "  Revised example task  ",
  "dueDate": null
}
```

### ProjectPatchRequest

P / `ProjectPatchRequestSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "expectedRevision": "project-r1",
  "name": "Revised example project"
}
```

### ProfilePatchRequest

P / `ProfilePatchRequestSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "expectedRevision": "profile-r1",
  "displayName": "  Example Person  "
}
```

### RegistrationRequest

P / `RegistrationRequestSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "email": " Example.Person@EXAMPLE.COM "
}
```

### VerificationResendRequest

P / `VerificationResendRequestSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "email": " Example.Person@EXAMPLE.COM "
}
```

### VerificationConfirmRequest

P / `VerificationConfirmRequestSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "token": "AQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE"
}
```

### EnrollmentCompleteRequest

P / `EnrollmentCompleteRequestSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "displayName": "  Example Person  ",
  "password": "Mock phrase for testing 47!"
}
```

### SignInRequest

P / `SignInRequestSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "email": " Example.Person@EXAMPLE.COM ",
  "password": "Mock phrase for testing 47!"
}
```

### EmptyObjectRequest

P / `EmptyObjectRequestSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{}
```

### TaskResponse

P / `TaskResponseSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "id": "task_example",
  "title": "Example task",
  "description": "Synthetic description.\nPreserve this newline.",
  "status": "todo",
  "priority": "medium",
  "projectId": "project_example",
  "dueDate": "2028-02-29",
  "assignee": null,
  "createdAt": "2026-10-25T10:00:00.000Z",
  "updatedAt": "2026-10-25T10:00:00.000Z",
  "revision": "task-r1"
}
```

### ProjectResponse

P / `ProjectResponseSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "id": "project_example",
  "name": "Example project",
  "description": "Synthetic example only.",
  "color": "#558b73",
  "icon": "😀",
  "createdAt": "2026-10-25T10:00:00.000Z",
  "revision": "project-r1",
  "deletionRevision": "project-delete-r1"
}
```

### ProfileResponse

P / `ProfileResponseSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "accountId": "account_example",
  "email": "Example.Person@example.com",
  "displayName": "Example Person",
  "revision": "profile-r1"
}
```

### WorkspaceResponse

P / `WorkspaceResponseSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "projects": [
    {
      "id": "project_example",
      "name": "Example project",
      "description": "Synthetic example only.",
      "color": "#558b73",
      "icon": "😀",
      "createdAt": "2026-10-25T10:00:00.000Z",
      "revision": "project-r1",
      "deletionRevision": "project-delete-r1"
    }
  ],
  "tasks": [
    {
      "id": "task_example",
      "title": "Example task",
      "description": "Synthetic description.\nPreserve this newline.",
      "status": "todo",
      "priority": "medium",
      "projectId": "project_example",
      "dueDate": "2028-02-29",
      "assignee": null,
      "createdAt": "2026-10-25T10:00:00.000Z",
      "updatedAt": "2026-10-25T10:00:00.000Z",
      "revision": "task-r1"
    },
    {
      "id": "task_standalone_example",
      "title": "Example task",
      "description": "Synthetic description.\nPreserve this newline.",
      "status": "todo",
      "priority": "medium",
      "projectId": null,
      "dueDate": "2028-02-29",
      "assignee": null,
      "createdAt": "2026-10-25T10:00:00.000Z",
      "updatedAt": "2026-10-25T10:00:00.000Z",
      "revision": "task-r1"
    }
  ]
}
```

### EmptyWorkspaceResponse

P / `WorkspaceResponseSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "projects": [],
  "tasks": []
}
```

### AcceptedResponse

P / `AcceptedResponseSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "state": "accepted",
  "message": "If this request is eligible, check your email."
}
```

### EnrollmentResponse

P / `EnrollmentResponseSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "state": "enrollment-required",
  "email": "Example.Person@example.com",
  "enrollmentExpiresAt": "2026-10-25T10:15:00.000Z"
}
```

### EnrollmentActivatedResponse

P / `EnrollmentActivatedResponseSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "state": "activated",
  "next": "sign-in"
}
```

### AuthenticatedResponse

P / `AuthenticatedResponseSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "state": "authenticated",
  "account": {
    "accountId": "account_example",
    "email": "Example.Person@example.com",
    "displayName": "Example Person",
    "revision": "profile-r1"
  },
  "session": {
    "inactivityExpiresAt": "2026-10-25T10:30:00.000Z",
    "absoluteExpiresAt": "2026-10-26T10:00:00.000Z"
  }
}
```

### UnauthenticatedResponse

P / `UnauthenticatedResponseSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "state": "unauthenticated"
}
```

### SessionAuthenticatedResponse

P / `SessionResponseSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "state": "authenticated",
  "account": {
    "accountId": "account_example",
    "email": "Example.Person@example.com",
    "displayName": "Example Person",
    "revision": "profile-r1"
  },
  "session": {
    "inactivityExpiresAt": "2026-10-25T10:30:00.000Z",
    "absoluteExpiresAt": "2026-10-26T10:00:00.000Z"
  }
}
```

### SessionUnauthenticatedResponse

P / `SessionResponseSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "state": "unauthenticated"
}
```

### CsrfAnonymousResponse

P / `CsrfBootstrapResponseSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "context": "anonymous",
  "csrfToken": "AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI"
}
```

### CsrfEnrollmentResponse

P / `CsrfBootstrapResponseSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "context": "enrollment",
  "csrfToken": "AwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM"
}
```

### CsrfAuthenticatedResponse

P / `CsrfBootstrapResponseSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "context": "authenticated",
  "csrfToken": "BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ"
}
```

### CreationPendingResponse

P / `CreationPendingResponseSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "state": "in-progress"
}
```

### TaskCreationCompletedResponse

P / `TaskCreationCompletedResponseSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "state": "completed",
  "evidence": "original-creation",
  "resource": {
    "id": "task_example",
    "title": "Example task",
    "description": "Synthetic description.\nPreserve this newline.",
    "status": "todo",
    "priority": "medium",
    "projectId": "project_example",
    "dueDate": "2028-02-29",
    "assignee": null,
    "createdAt": "2026-10-25T10:00:00.000Z",
    "updatedAt": "2026-10-25T10:00:00.000Z",
    "revision": "task-r1"
  },
  "completedAt": "2026-10-25T10:00:00.000Z",
  "retainedUntil": "2026-11-01T10:00:00.000Z"
}
```

### ProjectCreationCompletedResponse

P / `ProjectCreationCompletedResponseSchema` — intended positive at this named schema boundary; executable validation pending.

```json
{
  "state": "completed",
  "evidence": "original-creation",
  "resource": {
    "id": "project_example",
    "name": "Example project",
    "description": "Synthetic example only.",
    "color": "#558b73",
    "icon": "😀",
    "createdAt": "2026-10-25T10:00:00.000Z",
    "revision": "project-r1",
    "deletionRevision": "project-delete-r1"
  },
  "completedAt": "2026-10-25T10:00:00.000Z",
  "retainedUntil": "2026-11-01T10:00:00.000Z"
}
```

## E — Operation/status/example binding ledger

The main design Section 3 inventory is authoritative for binding. Apply every row, not just one example per schema:

| Operation(s) | Intended positive body fixture and status |
| --- | --- |
| getWorkspace | 200 WorkspaceResponse or EmptyWorkspaceResponse |
| createTask | 201 TaskCreationCompletedResponse;200 same original completed outcome on matching replay;202 CreationPendingResponse |
| recoverTaskCreation | 200 TaskCreationCompletedResponse;202 CreationPendingResponse; never201 |
| updateTask | 200 TaskResponse after appropriate fixture mutation/revision setup; unchanged valid no-op may retain original resource |
| deleteTask / deleteProject | 204 no body and no Content-Type; no JSON fixture |
| createProject | 201 ProjectCreationCompletedResponse;200 original completed outcome on matching replay;202 CreationPendingResponse |
| recoverProjectCreation | 200 ProjectCreationCompletedResponse;202 CreationPendingResponse; never201 |
| updateProject | 200 ProjectResponse after appropriate fixture mutation/revision setup |
| getProfile / updateProfile | 200 ProfileResponse with matching authoritative profile/revision |
| getCsrfContext | 200 CsrfAnonymousResponse/CsrfEnrollmentResponse/CsrfAuthenticatedResponse, according to actual validated selected context |
| registerAccount / resendVerification | 202 AcceptedResponse, identical across eligible/ineligible/suppressed cases; no delivery/existence claim |
| confirmVerification / getEnrollment | 200 EnrollmentResponse with context/time established; confirmation is intentional redemption, observation does not issue E |
| completeEnrollment | 200 EnrollmentActivatedResponse; activation never authenticates |
| leaveEnrollment / signOut | 204 no body and no Content-Type; no JSON fixture |
| signIn / recordSessionActivity | 200 AuthenticatedResponse with authoritative current deadlines/account |
| getSession | 200 SessionAuthenticatedResponse or reliably established SessionUnauthenticatedResponse |
| All five HEAD counterparts | Corresponding GET status/applicable metadata; no success/error body or token header, no activity/lifecycle renewal |

These binding rows require real operation fixtures, not merely a payload passing shape validation. Historical completed fixtures remain immutable after subsequent domain updates/deletion; fetch fresh Workspace state rather than install the historical resource snapshot. Normal202 in-progress grants no polling/retry/new-key permission. Session/Enrollment times assume the named fixture clock; stale fixtures must not be interpreted as valid live authority.

## P/E — Selected transport metadata examples

The following literal JSON objects illustrate the **selected metadata representation**, not API JSON bodies or a complete HTTP exchange. Values are intended schema-positive; Origin/context binding, duplicates/framing and cookie authority require additional E setup. All implementation validation remains pending.

### Selected RequestIntegrityHeadersRequestSchema

```json
{
  "Origin": "https://taskflow.example",
  "X-CSRF-Token": "BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ"
}
```

### Selected CreationHeadersRequestSchema

```json
{
  "Origin": "https://taskflow.example",
  "X-CSRF-Token": "BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ",
  "Content-Type": "application/json; charset=utf-8",
  "Idempotency-Key": "0123456789abcdef0123456789abcdef"
}
```

### Selected TaskDeleteHeadersRequestSchema

```json
{
  "Origin": "https://taskflow.example",
  "X-CSRF-Token": "BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ",
  "X-Expected-Revision": "task-r1"
}
```

### Selected ProjectDeleteHeadersRequestSchema

```json
{
  "Origin": "https://taskflow.example",
  "X-CSRF-Token": "BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ",
  "X-Expected-Revision": "project-r1",
  "X-Expected-Deletion-Revision": "project-delete-r1"
}
```

### Selected JsonHeadersResponseSchema

```json
{
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8"
}
```

### Selected AuthenticationRequiredHeadersResponseSchema

```json
{
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
  "WWW-Authenticate": "TaskFlow realm=\"TaskFlow\""
}
```

### Selected RateLimitedHeadersResponseSchema

```json
{
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
  "Retry-After": "60"
}
```

### Selected MethodNotAllowedHeadersResponseSchema

```json
{
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
  "Allow": "GET, HEAD, PATCH"
}
```

### Selected NoContentHeadersResponseSchema

```json
{
  "Cache-Control": "no-store"
}
```

The Allow sample applies to unsupported methods on `/api/profile`, not arbitrary paths. HEAD may retain corresponding GET Content-Type with no body;204 must forbid it independently of selected projection. Required/prohibited actual headers and original ambiguity checks are never waived by these selected objects. Accepted JSON request media also includes the approved case-insensitive spelling and optional single quoted UTF-8 charset, subject to exact parser rules. No Location, cookie credential or token response header is invented.

## P/E — Complete error fixtures and per-binding coverage

Every fixture below has schema-intended positive envelope shape under ApiErrorResponseSchema; this does not make it an allowed outcome for every operation. Apply only the main design Section 5 allowed operation/status/code combinations and routing-only cases. In particular, signIn includes eligible canonical email 422 VALIDATION_FAILED/TOO_LONG while retaining generic 401 for otherwise eligible unsuccessful password candidates; enrollment-only password eligibility is never disclosed. Shared field-code enums remain separate. Add required 401/429/405 metadata; suppress all bodies for HEAD. Safe messages are mock fixed server text and do not claim noncommit or resource existence.

### Error MALFORMED_REQUEST

P envelope / HTTP 400; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "MALFORMED_REQUEST",
    "message": "Example request could not be completed."
  }
}
```

### Error REQUEST_VALIDATION_FAILED

P envelope / HTTP 400; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "REQUEST_VALIDATION_FAILED",
    "message": "Example request could not be completed."
  }
}
```

### Error VERIFICATION_PROOF_INVALID

P envelope / HTTP 400; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "VERIFICATION_PROOF_INVALID",
    "message": "Example request could not be completed."
  }
}
```

### Error AUTHENTICATION_REQUIRED

P envelope / HTTP 401; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "AUTHENTICATION_REQUIRED",
    "message": "Example request could not be completed."
  }
}
```

### Error ENROLLMENT_REQUIRED

P envelope / HTTP 401; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "ENROLLMENT_REQUIRED",
    "message": "Example request could not be completed."
  }
}
```

### Error INVALID_CREDENTIALS

P envelope / HTTP 401; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Example request could not be completed."
  }
}
```

### Error REQUEST_INTEGRITY_FAILED

P envelope / HTTP 403; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "REQUEST_INTEGRITY_FAILED",
    "message": "Example request could not be completed."
  }
}
```

### Error RESOURCE_NOT_FOUND

P envelope / HTTP 404; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Example request could not be completed."
  }
}
```

### Error ENDPOINT_NOT_FOUND

P envelope / HTTP 404; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "ENDPOINT_NOT_FOUND",
    "message": "Example request could not be completed."
  }
}
```

### Error METHOD_NOT_ALLOWED

P envelope / HTTP 405; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "METHOD_NOT_ALLOWED",
    "message": "Example request could not be completed."
  }
}
```

### Error STALE_REVISION

P envelope / HTTP 409; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "STALE_REVISION",
    "message": "Example request could not be completed."
  }
}
```

### Error STALE_PRECONDITION

P envelope / HTTP 409; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "STALE_PRECONDITION",
    "message": "Example request could not be completed."
  }
}
```

### Error AUTH_CONTEXT_CONFLICT

P envelope / HTTP 409; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "AUTH_CONTEXT_CONFLICT",
    "message": "Example request could not be completed."
  }
}
```

### Error IDEMPOTENCY_PAYLOAD_MISMATCH

P envelope / HTTP 409; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "IDEMPOTENCY_PAYLOAD_MISMATCH",
    "message": "Example request could not be completed."
  }
}
```

### Error CREATION_OUTCOME_UNAVAILABLE

P envelope / HTTP 409; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "CREATION_OUTCOME_UNAVAILABLE",
    "message": "Example request could not be completed."
  }
}
```

### Error REQUEST_TOO_LARGE

P envelope / HTTP 413; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "REQUEST_TOO_LARGE",
    "message": "Example request could not be completed."
  }
}
```

### Error UNSUPPORTED_MEDIA_TYPE

P envelope / HTTP 415; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "UNSUPPORTED_MEDIA_TYPE",
    "message": "Example request could not be completed."
  }
}
```

### Error VALIDATION_FAILED

P envelope / HTTP 422; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Example request could not be completed."
  }
}
```

### Error PROJECT_UNAVAILABLE

P envelope / HTTP 422; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "PROJECT_UNAVAILABLE",
    "message": "Example request could not be completed."
  }
}
```

### Error RATE_LIMITED

P envelope / HTTP 429; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Example request could not be completed."
  }
}
```

### Error INTERNAL_ERROR

P envelope / HTTP 500; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Example request could not be completed."
  }
}
```

### Error SERVICE_UNAVAILABLE

P envelope / HTTP 503; E operation applicability and precedence from main design Section 5.

```json
{
  "error": {
    "code": "SERVICE_UNAVAILABLE",
    "message": "Example request could not be completed."
  }
}
```

### Field diagnostic fixtures

P/E: materialize each row as `error.code`/HTTP plus one complete fieldErrors entry `{ path, code, message: "Example field requires attention." }`; this notation is an explanatory recipe, not a literal executable body. Check it against ApiErrorResponseSchema/FieldErrorResponseSchema and the named operation/stage before use. No reflected value is inserted into the fixed message.

| Field code | Path | Top-level status/code and eligible example |
| --- | --- | --- |
| REQUIRED | ["body","title"] | 400 REQUEST_VALIDATION_FAILED; Task create missing title |
| INVALID_TYPE | ["body","description"] | 400 REQUEST_VALIDATION_FAILED; null description |
| UNKNOWN_FIELD | ["body","accountId"] | 400 REQUEST_VALIDATION_FAILED; forbidden Profile identity input |
| INVALID_FORMAT | ["body","dueDate"] | 400 REQUEST_VALIDATION_FAILED; impossible Task date |
| INVALID_VALUE | ["body","title"] | 422 VALIDATION_FAILED; canonical blank title |
| TOO_SHORT | ["body","password"] | 422 VALIDATION_FAILED; enrollment password below minimum after NFC |
| TOO_LONG | ["body","description"] | 422 VALIDATION_FAILED;10001-code-point description, including recovery Q12 |
| NO_CHANGES | ["body"] | 400 REQUEST_VALIDATION_FAILED; Task/Project revision-only PATCH |
| PASSWORD_NOT_ALLOWED | ["body","password"] | 422 VALIDATION_FAILED; eligible enrollment blocklist rejection, never sign-in disclosure |
| PROJECT_UNAVAILABLE | ["body","projectId"] | 422 PROJECT_UNAVAILABLE; both missing and inaccessible Task Project assignment |

## N/E — Invalid counterexamples and runtime scenarios

Literal short values below are intentionally invalid at the specified boundary. Rows using repeat/remove/add/change/race/inject are **non-executable materialization recipes (E) for negative/runtime fixtures**, not prevalidated executable examples. Materialize exact bytes/context/clock before recording expected rejection. For isolated payload failures establish valid required authority/integrity first; otherwise earlier catalog precedence may correctly produce a different response.

| Case / materialization | Boundary and required result |
| --- | --- |
| Remove each of the seven TaskCreate fields, then each of four ProjectCreate fields, in separate fixtures | Raw400 REQUEST_VALIDATION_FAILED/REQUIRED; explicit null is structurally allowed only for the three approved Task nullable fields |
| TaskPatch omits dueDate vs supplies null; description empty string vs null | Omission preserves/null clears date; empty description valid, null description400 INVALID_TYPE |
| Task/Project expectedRevision alone; Profile expectedRevision without displayName | Raw400 NO_CHANGES for Task/Project; Profile missing displayName REQUIRED |
| Add email/accountId/id to ProfilePatch; unknown nested/request/query fields | Strict raw400; known safe field path or containing-object fallback, never arbitrary reflected secrets |
| Padded200-code-point title vs201 after approved trim; supplementary characters | First eligible, latter422 TOO_LONG; no UTF-16 or premature raw-length decision |
| Description10000 vs10001 code points, including creation and recovery; malformed surrogate `"\ud800"` | Preserved limit422 TOO_LONG before evidence; malformed Unicode400 INVALID_FORMAT first; description spaces/newlines preserved |
| Icon A/ن/😀 vs combining mark, invisible, private-use/unassigned, joined emoji, variation-selector sequence | Accepted visible single scalar; canonical category rejection422 or raw multi-scalar/malformed rejection400 per approved stages; Unicode 17.0.0 shared/browser parity |
| Color `#558B73`, `#abc`, named red, alpha variant | Raw400 INVALID_FORMAT; no lowercasing/repair; arbitrary correct lowercase RGB remains eligible |
| Due date2027-02-29/0000-01-01/2026-04-31; compare valid2028-02-29 | Invalid400 INVALID_FORMAT/no rollover; valid leap day retained as calendar date across zones |
| Output instant offset, missing/variable fraction,24:00,leap second | Strict output/reader rejection, not a client-request rejection or silent normalization; invalid output after commit remains uncertain |
| Email margin U+0020 vs tab/CRLF, local case/dots/plus, domain case,254/255 canonical length | Exact approved lexical/raw400 versus canonical422; preserve identity policy, no provider merge or MX repair |
| Enrollment password14/15/128/129 code points after NFC; Cc/unpaired surrogate; short valid sign-in candidate | Enrollment canonical eligibility only, malformed raw400; unsuccessful valid sign-in 401 INVALID_CREDENTIALS without length/blocklist disclosure |
| Key uppercase/31/33 hex; proof/CSRF padding,43-char invalid trailing bits; purpose substitution | Raw applicable encoding rejection, or earlier integrity403/proof-authority400; syntactic validity never grants authority |
| Valid profile/Workspace payload plus unknown nested object field vs unknown enum/invalid declared member | Server strict output rejects extras; frontend reader strips permitted extras; invalid declared data rejects whole read, no partial salvage |
| Unknown error code,33 fieldErrors,empty fieldErrors,unsafe path/message,duplicate diagnostic candidates | Whole invalid received error rejected; server constructs bounded sanitized deterministic first32/omits absent diagnostics; generic safe feedback only |
| Same-key reordered JSON members vs changed whitespace/canonical-equivalent title | Equivalent original values recover; changed original values409 IDEMPOTENCY_PAYLOAD_MISMATCH only with available equivalence evidence |
| Create then modify/delete Task/Project; recover retained original outcome | Same immutable200 original evidence; no current-domain recheck, resurrection or current Workspace overwrite |
| Unknown recovery key/expired full evidence; minimal consumed marker; unreliable lookup |409 CREATION_OUTCOME_UNAVAILABLE versus safe503; never fabricated mismatch or permission to recreate |
| Concurrent create same key, paused prior executor/expired reservation, lost response | At most one committed resource/outcome; no unsafe takeover, release, automatic retry or new-key creation |
| Stale owned PATCH/DELETE vs matching no-op; missing/foreign DELETE after valid preconditions |409 STALE_REVISION/STALE_PRECONDITION; matching no-op retains revisions/times; concealed absent DELETE204, no foreign disclosure |
| Generic registration/resend across new/pending/active/suppressed/expired emails | Identical202 Accepted/no delivery claim/hidden Retry-After; genuine acceptance service failure remains explicit |
| Invalid/expired/revoked/used proof; concurrent redemption/completion; fresh same/different pending-account proof |400 proof-invalid or409 conflict as applicable; atomic single consumption/activation/replacement; no implicit sign-in |
| Enrollment GET/HEAD with A only, A+E, E only, neither, unreliable lookup | Q11 exact409/409/200/401/service failure; HEAD no bodies; no Origin/CSRF on reads or E credential creation |
| Missing A/E plus CSRF, then valid A/E plus wrong/missing Origin/token; valid selected proof plus context conflict | Required401 precedes403 without conflicting higher context; valid authority bad proof403 precedes409; no lower-context permission bypass |
| Cookie/header duplicates, ambiguous framing, duplicate nested JSON keys, malformed UTF-8 | Reject original ambiguity before parsed projections erase it; no first/last-wins safety inference |
| GET/HEAD/DELETE zero body plus Content-Type; small nonempty body;262145-byte actual body | Q13 no media error solely for header;400 prohibited content subject to precedence;413 oversized; HEAD error still bodyless |
| Required JSON POST/PATCH unsupported media/charset/extra parameter, omitted body or non-object; designated exact {} |415 media violation, raw400 body/shape failure where applicable, valid{} only designated operations |
| Any success/error missing no-store;401 missing challenge;429 malformed Retry-After;405 wrong Allow | Metadata contract rejection; selected projection cannot hide a missing/forbidden header |
|204 with JSON/content type; HEAD with any body/token header; creation Location | Reject contract violation; HEAD may retain corresponding GET JSON Content-Type without body; no implied new GET route |
| Replay revoked A after sign-out; expiry at inactivity/absolute deadline; passive/background calls; repeated activity within60s | Server authority fails safely, no renewal/revival; only approved foreground activity flow/coalescing, no domain revision changes |
| Exhaust each budget, compare address existence, fake forwarding headers/fail limiter | Cumulative exact catalog budgets, hidden email suppression202, observable429+Retry-After, trusted IP and safe protection failure |
| Wrong-path/unsupported-method/reserved creation-recovery string | Routing404 ENDPOINT_NOT_FOUND/405 METHOD_NOT_ALLOWED with exact Allow; no accidental resource lookup or extra supported method |
| Alter component/operationId/status/security/runtime reference or drop expressible PATCH/timestamp restriction | Generation/verification fails with safe source-linked expected/observed diagnostic; no weaker placeholder or silent repair |
| Verify artifact after one-byte/format change while watching its hash | Semantic/byte drift detected independently; verification does not regenerate, normalize or modify reviewed artifact |
| Possible committed mutation with invalid/lost response; failed observation; prior-account late result | Unconfirmed outcome, account-scoped drafts/result isolation and deliberate recovery, no inferred rollback/logout or automatic replay |

No runtime outcome in this table has been observed. Main design O1–O16 and controlling E1–E34/S1–S16 specify future owners/checkpoints. Human implementation acceptance remains pending actual user observations.
