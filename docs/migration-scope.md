# TaskFlow foundation migration

This is the agreed planning record. The completed session covered investigation, architectural decisions, constraints, risks, and acceptance criteria. Migration implementation has not been authorized in this session.

## Confirmed constraints

- Preserve frontend source, stylesheets, public assets, and HTML entry file byte-for-byte, allowing directory relocation. Manifests, TypeScript configuration, Vite configuration, and scripts may change. See [ADR 0001](adr/0001-preserve-generated-frontend-during-migration.md).
- Record baseline defects separately from migration regressions. Defer frontend defect fixes; explicitly surface any conflict between protected source and required checks.
- Support fresh-checkout installation, build, and local execution on macOS and Linux without Replit credentials, services, or injected environment variables. Windows acceptance and production deployment infrastructure are deferred.
- Add a bootable NestJS application with one infrastructure-only endpoint: `GET /api/healthz`, returning HTTP 200 and `{"status":"ok"}`. Its smoke test must boot the application, make an HTTP request, verify the response, and close cleanly. Do not add a database, authentication, business modules, generated API clients, or actual frontend-backend data integration.
- Establish `/api` as the future browser-facing API base. Vite development and local build preview forward `/api/*` to `http://localhost:8080`, preserving the path and supporting a documented target override. Do not enable CORS for this same-origin path. Do not modify protected frontend source or add actual frontend-backend data integration. Production API routing remains a deployment decision.
- Human evaluation remains pending until the user reports observations; prepared guides and automated passes do not establish human acceptance.
- Retain pnpm and use `apps/web` for the existing frontend and `apps/api` for a standard NestJS application, with separate manifests, one root lockfile, and root development/build/check commands. Do not add Nx, Turborepo, Nest CLI monorepo mode, or speculative shared packages. See [ADR 0002](adr/0002-use-pnpm-workspace-with-independent-applications.md).
- Remove the old Express server, empty database scaffold, unused generated API client/Zod/OpenAPI pipeline, mockup sandbox, placeholder script package, and Replit runtime/tooling configuration after checking remaining references. Preserve repository agent skills and guidance and incidental Replit text in protected files.
- Preserve currently locked frontend direct and transitive dependency versions wherever compatible. Limit dependency changes to infrastructure removal, cross-platform installation, and the new backend; review lockfile changes and document unavoidable frontend dependency changes. Defer general upgrades and aggressive pruning of unused frontend dependencies.
- Keep existing Google Fonts requests. Dependency installation and font loading may require internet access; offline operation and font self-hosting are outside scope.
- Retain Node 24 and pin compatible Node and pnpm versions during implementation. Select a stable NestJS version compatible with that toolchain after checking both runtime and scaffold-generation prerequisites. Defer frontend framework and tooling upgrades.
- Default the frontend to `http://localhost:21998/` with base path `/` and the backend to `http://localhost:8080`. Start without environment files, support documented port overrides, bind locally, and fail clearly on occupied ports. Support direct navigation and refresh in frontend development and built-frontend preview. Preview may reuse the frontend port while development is stopped. Automatic browser data transfer between origins is outside scope.

## Agreed acceptance criteria

1. Inventory protected files and compare their bytes against the original commit, accounting for relocation.
2. Capture a pre-migration browser baseline and compare navigation, dashboard, project/task operations, board interactions, search/filtering, settings, demo login/signup, themes, responsive layout, and persistence after refresh. Use consistent browser, viewport, stored data, and date conditions for meaningful visual comparisons.
3. On macOS and Linux, verify fresh-checkout frozen-lockfile installation, typechecking, builds, and the backend HTTP smoke test, backed by GitHub Actions.
4. Verify independent frontend/backend startup, built-frontend preview, direct application-route navigation and refresh, documented port overrides, and clear occupied-port failures. Audit for remaining operational Replit dependencies.
5. Through both the frontend development server and local build preview, verify that `/api/healthz` reaches the backend and returns HTTP 200 with `{"status":"ok"}`. Verify a proxy target override with the backend on another port. API requests must reach the backend rather than SPA fallback. With the backend stopped, the frontend must still run independently and explicitly requested API calls must fail visibly. Document `/api` as the future API base and production routing as deferred. Confirm that protected frontend source is unchanged and that no API client, business endpoint, or new application API calls were added.
6. Supply a reproducible feature-by-feature manual evaluation guide, actual check results, and documented baseline defects. Human acceptance remains pending until the user reports observations.

Do not introduce frontend lint/format rules that require protected-source changes. If the original application cannot run unchanged, document the blocker and any configuration-only baseline accommodation. Do not claim behavioral equivalence without evidence.

## Repository evidence

Read-only inspection baseline: `ae51b1750a6a8c8ef795d6495c2f94f27d79d0be`. The worktree was clean before planning documentation was added. This identifies the inspected revision; runtime baseline capture remains outstanding.

- The repository already uses pnpm workspaces with applications under `artifacts/` and libraries under `lib/`.
- `artifacts/taskflow/src/` contains 63 tracked frontend files. `index.html` contains Replit attribution and Google Fonts references. Protected-source preservation retains this attribution.
- The frontend uses browser-local persistence with key `taskflow-store-v1`; its router reads Vite's `BASE_URL`. No frontend source imports of `@workspace/*` or calls to `fetch` were found. Its manifest and TypeScript configuration still reference the generated API client.
- Existing infrastructure includes a health-only Express backend, an empty database schema, a generated health API client/Zod/OpenAPI pipeline, and a mockup sandbox with an empty generated module map.
- `pnpm-workspace.yaml` excludes native dependencies for macOS, Windows, and other platforms. Root scripts build/typecheck the existing generated workspace. `.replit` specifies Node 24; the root manifest does not pin a package manager or declare engines.
- Frontend Vite configuration requires `PORT` and `BASE_PATH`. Replit artifact metadata currently supplies service settings and a frontend SPA fallback.
- No installed dependencies, CI workflows, test scripts, or lint scripts were found. No installation, build, typecheck, or browser evaluation has been performed.

## Implementation sequence

1. Capture the protected-file inventory, locked frontend dependency graph, baseline checks, and browser observations at the inspected revision. Record any configuration-only accommodation needed to run the original frontend. Keep its exact diff with the baseline evidence.
2. Prepare a file-by-file cleanup inventory and audit runtime, build, workspace, script, and configuration references. Preserve repository agent guidance and tooling.
3. Relocate the preserved frontend to `apps/web`, remove obsolete infrastructure and references, replace Replit configuration with independent defaults, and correct platform-specific dependency exclusions. Verify protected bytes and review lockfile changes.
4. Scaffold `apps/api`, implement only the health contract, and add the local proxy configuration and smoke test. Pin compatible toolchain versions and provide root commands and configuration documentation.
5. Run the agreed checks, add macOS/Linux GitHub Actions coverage, compare frontend behavior to the baseline, and review the final diff against the scope. Record failures and limitations explicitly.
6. Complete the [evaluation guide](migration-evaluation.md) with exact implemented commands, toolchain versions, platform results, baseline defects, and evidence locations. Give the user their first action and leave human acceptance pending until observations arrive.

Exact compatible toolchain patch versions, command names, environment variable names, and deletion paths are implementation details to resolve and document within these constraints. They do not authorize protected-source changes or a broader feature scope.

## Planning status

Q1–Q14 are resolved, including the user's configuration-only extension to Q11. The user confirmed that the consolidated scope accurately reflects the agreement and that the planning session is complete. This confirmation closes planning; it does not authorize migration implementation.

## Known risks

- Directory moves and configuration changes can affect aliases, stylesheet scanning, assets, routing, and build output despite unchanged frontend files.
- A full lockfile refresh can change frontend transitive dependencies and behavior.
- Changing browser origin changes the localStorage namespace; existing data does not automatically follow a port or hostname change.
- Google Fonts remains an external dependency. Replit independence does not establish offline operation.
- Existing generated infrastructure must be removed according to runtime and configuration references, rather than its name alone.

## Documentation references

- [Nest workspace modes](https://docs.nestjs.com/cli/monorepo): Nest CLI workspace mode is distinct from a package-manager workspace; a standard Nest application can retain its own configuration.
- [pnpm workspaces](https://pnpm.io/workspaces): workspace packages are declared in `pnpm-workspace.yaml`.
- [Vite preview proxy](https://v7.vite.dev/config/preview-options#preview-proxy): local preview supports proxy configuration, defaulting to the development proxy rules.

## Evaluation status

Acceptance criteria are agreed above. The implementation must complete the reproducible feature-by-feature evaluation guide with actual results. No migration checks have passed, and no human evaluation has been performed.
