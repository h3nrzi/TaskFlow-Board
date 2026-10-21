# 05: Forward API requests through development and preview

**What to build:** Explicit requests to the frontend's future API base reach the backend through both development and local built preview, while ordinary frontend behavior stays independent of the backend.

**Blocked by:** 04 — Run the NestJS health application independently.

**Status:** ready-for-agent

- [x] Configure /api as the future browser-facing API base in both frontend development and local built preview. Forward to the default backend, preserve request paths, and support a documented target override.
- [x] Verify direct and proxied GET /api/healthz responses return HTTP 200 and the exact agreed JSON contract in both modes.
- [x] Repeat proxied checks with an alternate backend port and target override in both modes.
- [x] Verify an unknown API request reaches the backend rather than receiving frontend SPA HTML, while direct frontend navigation and refresh still work.
- [x] With the backend stopped, explicitly requested proxied calls fail visibly in both modes and frontend navigation remains usable.
- [ ] Keep communication preparation configuration-only: protected files remain identical and ordinary frontend browser traffic contains no new application API calls. Add no API client, integration, business endpoint, or CORS configuration.
- [x] Document production API routing as a future deployment decision. Record actual HTTP/browser results, exact configuration and commands, and reproducible evaluation steps with a first concrete action; human acceptance remains pending.

## Implementation evidence

Configuration-only proxy delivered; HTTP matrix passes. Ordinary browser network capture remains pending.

See [evaluation guide](../../../../docs/migration-evaluation.md) for this ticket’s reproducible checkpoint and first action. Human evaluation remains pending until observations are reported.
