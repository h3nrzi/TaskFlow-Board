# 02: Audit obsolete infrastructure and removal dependencies

**What to build:** A reference-backed removal inventory that makes obsolete generated infrastructure safe to remove while retaining everything required by the preserved frontend and repository development workflows.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] Produce a file-by-file removal/retention inventory for the old health-only server, empty database scaffold, generated API client/Zod/OpenAPI pipeline, empty mockup sandbox, placeholder script package, and Replit runtime/tooling configuration and dependencies.
- [ ] Audit source imports, assets, workspace membership, manifests, catalogs, lockfile importers, build/typecheck references, scripts, installation hooks, generated artifacts, and runtime configuration. Record evidence supporting each removal and references that must change together.
- [ ] Identify native-dependency exclusions that prevent macOS/Linux installation and explain the required infrastructure changes without broad frontend dependency upgrades.
- [ ] Explicitly retain protected frontend files and referenced assets, repository agent skills and guidance, Google Fonts requests, and incidental Replit attribution/comments inside protected files.
- [ ] Distinguish operational Replit reliance from harmless textual mentions. Identify any unresolved reference or preservation conflict before deletion work begins.
- [ ] This ticket produces the audit without deleting application infrastructure. Its handoff includes reproducible audit checks, actual evidence, and the first concrete review action; human acceptance remains pending.
