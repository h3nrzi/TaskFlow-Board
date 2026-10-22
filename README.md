# TaskFlow

React demo in `apps/web`, independent NestJS health application in `apps/api`.

See the [frontend architecture guide](docs/architecture/frontend.md) for module ownership and state lifetimes.

Use **Node 24.22.0** (`.node-version` / `.nvmrc`) and **pnpm 10.11.0** (`packageManager`). With those installed:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:21998/. No environment files, Replit settings, credentials or database are required. Both servers bind locally. Browser data stays at the same origin in `taskflow-store-v1`.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Run both applications; Ctrl-C stops both |
| `pnpm dev:web` | Frontend only; backend may be stopped |
| `pnpm dev:api` | Backend only, default http://localhost:8080 |
| `pnpm build` | Build both applications |
| `pnpm preview` | Serve built frontend at the same port; stop dev first |
| `pnpm --filter @taskflow/api start` | Run built backend |
| `pnpm typecheck` | Check both applications |
| `pnpm test` | Actual HTTP application and workflow tests |
| `pnpm test:frontend` / `pnpm verify:frontend` | Cross-browser frontend workflows and bug regressions |
| `pnpm verify:dependencies` | Check retained frontend resolutions and dependency edges against the stability baseline |
| `pnpm check` | Frontend regressions, dependency audit, typecheck, builds, API/tooling tests |

Override ports explicitly; occupied ports fail rather than silently moving:

```sh
WEB_PORT=22000 pnpm dev:web
API_PORT=8081 pnpm dev:api
API_PROXY_TARGET=http://127.0.0.1:8081 pnpm dev:web
# Or, with development stopped:
API_PROXY_TARGET=http://127.0.0.1:8081 pnpm preview
```

`/api` is the future browser-facing API base. Development and local preview preserve paths and proxy to `http://127.0.0.1:8080` by default. `GET /api/healthz` returns exactly `{"status":"ok"}`. Unknown API routes return backend 404 JSON; a stopped backend causes an explicit proxy failure. SPA navigation continues without the backend. The frontend makes no new API calls. Production API routing remains a future deployment decision; Vite preview is a local evaluation server.

For browser tests, first run `pnpm exec playwright install --with-deps chromium firefox webkit`. See [frontend evaluation instructions and actual evidence](docs/testing/frontend-evaluation.md). Tickets 02 and 03 are human-accepted; Ticket 04’s first keyboard-dialog check passed. Remaining manual checks are Not Evaluated, and detailed manual evaluation is closed for this stage.
