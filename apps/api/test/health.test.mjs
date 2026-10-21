import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createApplication } from '../dist/application.js';

test('an independent application serves the exact HTTP health contract and closes cleanly', async () => {
  const app = await createApplication();
  try {
    await app.listen(0, '127.0.0.1');
    const response = await fetch(`${await app.getUrl()}/api/healthz`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /application\/json/);
    assert.deepEqual(await response.json(), { status: 'ok' });
  } finally {
    await app.close();
  }
});
