# 04: Run the NestJS health application independently

**What to build:** A minimal independently configured NestJS backend can be started and checked through HTTP, alongside the preserved frontend and through discoverable root commands.

**Blocked by:** 03 — Run the preserved frontend in an independent workspace.

**Status:** ready-for-agent

- [ ] Check current runtime and scaffold-generator requirements before selecting and pinning a stable NestJS version compatible with the pinned Node 24/pnpm toolchain. Use a standard independently configured application at the agreed backend location rather than Nest CLI monorepo mode.
- [ ] Expose only GET /api/healthz, returning HTTP 200 with JSON containing exactly one property, status, whose value is ok. Add no business endpoints, database, authentication, API clients, generated contracts, or frontend data integration.
- [ ] Start without environment files, bind locally, default to http://localhost:8080, support a documented port override, and fail clearly on occupied ports.
- [ ] Add a smoke test that boots the actual application, performs an HTTP health request, asserts the exact status and JSON contract, and closes cleanly, including cleanup after failure. It requires neither a frontend process nor a database.
- [ ] Provide root development, build, and check commands covering both applications and commands for independent startup. Confirm frontend use does not require the backend and backend health does not require the frontend.
- [ ] Review new dependency and lockfile changes for unintended frontend resolution drift and rerun protected-file verification.
- [ ] Record actual startup, port, build, typecheck, and smoke-test evidence. Provide reproducible evaluation steps and the first concrete action; human acceptance remains pending.
