# Reference audit before deletion

Starting HEAD: f2ace8ba95606cd7dd580a76c598233caf0d01fb (clean). Preservation reference: ae51b1750a6a8c8ef795d6495c2f94f27d79d0be. All 66 protected files match both. Original dependency graph: frontend-dependencies.json (228 retained snapshots).

Inventory scope is every tracked file under the paths below (`git ls-files` at starting HEAD); no partial subtree retention is implied.

| Original paths (all files recursively) | Decision and evidence | References changed together |
| --- | --- | --- |
| artifacts/taskflow/src, public, index.html | Retain bytes, relocate to apps/web. 66 explicit mappings in protected-files.json. No @assets imports or attached assets; retain Google Fonts and protected Replit comments. | Vite aliases, TS config, manifest, workspace importer |
| artifacts/taskflow/components.json | Retain editor configuration. | Relocation only |
| artifacts/api-server | Remove old Express health-only app. routes/health.ts implements only health; workspace DB/Zod dependencies belong solely to generated infrastructure. | workspace, root TS references, manifests/lockfile |
| lib/db | Remove: schema/index.ts exports no tables; DATABASE_URL guard unnecessary. No protected source import. | old server, root TS references/catalog |
| lib/api-client-react, lib/api-zod, lib/api-spec | Remove unused generated health client, schema and OpenAPI/orval pipeline. `rg '@workspace' artifacts/taskflow/src` has no matches. | web manifest stale client and TS reference, workspace, root TS references/catalog |
| artifacts/mockup-sandbox | Remove entire separate sandbox. src/.generated/mockup-components.ts has empty map, no frontend imports. | workspace and recursive checks |
| scripts | Remove placeholder hello package and Replit post-merge install/DB push hook. | .replit postMerge, workspace/root scripts |
| .replit, .replitignore, replit.md, artifacts/taskflow/.replit-artifact | Remove platform runtime/deployment metadata and obsolete generated overview. | Vite plugin imports, environment requirements, root connector dependency |
| pnpm-workspace.yaml native exclusions | Remove all platform suppression overrides; baseline macOS build/start failed on missing Rollup native binary. Keep esbuild 0.28.2 override to preserve resolutions. | lock optional dependencies |
| root preinstall | Remove destructive lockfile deletion hook; packageManager/engines document toolchain. | root manifest |
| .agents, AGENTS.md, skills-lock.json, docs/agents | Retain repository workflow tooling and guidance. | None |

Original install passes but esbuild downloads its excluded binary as a fallback. Original typecheck passes. Original build/start fail on missing @rollup/rollup-darwin-arm64. Removing only native suppression entries enables build/start, without protected source edits. Exact workspace and lock diff: baseline-accommodation.patch. Runtime needs PORT=21998 BASE_PATH=/; these supplied environment values are the other accommodation. No environment file, REPL_ID or credentials used.

Audit commands: `git ls-files artifacts lib scripts .replit .replitignore replit.md`; `rg -n '(@workspace|@assets|attached_assets|fetch\\()' artifacts/taskflow/src`; `rg -n '(workspace:|@workspace|DATABASE|REPL|replit|postinstall|prepare)'` over configuration and source. Historical evidence and workflow skill text may retain obsolete names; operational references must disappear.

First review action: inspect protected-files.json alongside this inventory. Human evaluation pending.
