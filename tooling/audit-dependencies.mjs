import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';

const baseline = JSON.parse(await readFile('docs/testing/frontend-dependencies.json', 'utf8'));
const lock = parse(await readFile('pnpm-lock.yaml', 'utf8'));
const direct = lock.importers['apps/web'].devDependencies;
for (const [name, entry] of Object.entries(baseline.direct)) {
  if (name.startsWith('@replit/') || name.startsWith('@workspace/')) continue;
  assert.equal(direct[name]?.version, entry.version, `${name}: direct resolution drift`);
}
for (const [key, snapshot] of Object.entries(baseline.graph)) {
  assert.ok(lock.snapshots[key], `${key}: transitive resolution missing`);
  assert.deepEqual(lock.snapshots[key].dependencies, snapshot.dependencies, `${key}: dependency edges drifted`);
  // Restored native optional dependencies are the only intentional additions.
  for (const [name, version] of Object.entries(snapshot.optionalDependencies ?? {})) {
    assert.equal(lock.snapshots[key].optionalDependencies?.[name], version, `${key}: optional dependency drift`);
  }
}
console.log(`${Object.keys(baseline.graph).length} retained frontend snapshots and direct resolutions preserved`);
