import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

process.chdir(fileURLToPath(new URL('..', import.meta.url)));
const inventory = JSON.parse(await readFile('docs/migration-evidence/protected-files.json', 'utf8'));
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory()
    ? files(`${directory}/${entry.name}`) : `${directory}/${entry.name}`))).flat();
}
const actual = [...await files('apps/web/src'), ...await files('apps/web/public'), 'apps/web/index.html'].sort();
assert.deepEqual(actual, inventory.files.map(file => file.path).sort(), 'Protected inventory must be complete');
assert.equal(new Set(inventory.files.map(file => file.original)).size, inventory.files.length);
for (const file of inventory.files) {
  const bytes = await readFile(file.path);
  assert.equal(bytes.length, file.bytes, `${file.path}: byte count changed`);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), file.sha256, `${file.path}: source changed`);
}
console.log(`${actual.length} protected files match ${inventory.revision}, including relocation and inventory completeness`);
