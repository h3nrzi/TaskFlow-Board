import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { createServer } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';
import { test } from 'node:test';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
async function freePort() {
  const server = createServer();
  await new Promise(resolve => server.listen(0, 'localhost', resolve));
  const port = server.address().port;
  await new Promise(resolve => server.close(resolve));
  return port;
}
function run(script, args, cwd, env) {
  const child = spawn(process.execPath, [script, ...args], {
    cwd, env: { ...process.env, ...env }, stdio: ['ignore', 'pipe', 'pipe'],
  });
  let output = '';
  child.stdout.on('data', data => { output += data; });
  child.stderr.on('data', data => { output += data; });
  return {
    child, output: () => output,
    async close() {
      if (child.exitCode !== null || child.signalCode !== null) return;
      const stopped = once(child, 'exit');
      child.kill('SIGTERM');
      const timer = setTimeout(() => child.kill('SIGKILL'), 5000);
      try { await stopped; } finally { clearTimeout(timer); }
    },
  };
}
async function ready(process, url) {
  for (let attempt = 0; attempt < 150; attempt++) {
    if (process.child.exitCode !== null) throw new Error(process.output());
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(500) });
      if (response.ok) return;
    } catch { /* allow the application to finish starting */ }
    await delay(100);
  }
  throw new Error(`Startup timeout: ${url}\n${process.output()}`);
}
async function exited(process) {
  if (process.child.exitCode !== null) return process.child.exitCode;
  const timer = setTimeout(() => process.child.kill('SIGKILL'), 15000);
  try { return (await once(process.child, 'exit'))[0]; }
  finally { clearTimeout(timer); }
}

for (const mode of ['development', 'preview']) {
  test(`${mode}: API proxy, SPA routes, stopped backend and occupied web port`, { timeout: 45000 }, async () => {
    const apiPort = await freePort();
    const webPort = await freePort();
    const api = run('apps/api/dist/main.js', [], root, { API_PORT: String(apiPort) });
    const webCwd = path.join(root, 'apps/web');
    const args = mode === 'preview' ? ['preview'] : [];
    const env = { WEB_PORT: String(webPort), API_PROXY_TARGET: `http://127.0.0.1:${apiPort}` };
    const web = run('node_modules/vite/bin/vite.js', args, webCwd, env);
    try {
      await ready(api, `http://127.0.0.1:${apiPort}/api/healthz`);
      await ready(web, `http://localhost:${webPort}/`);
      const base = `http://localhost:${webPort}`;
      const health = await fetch(`${base}/api/healthz`);
      assert.equal(health.status, 200);
      assert.deepEqual(await health.json(), { status: 'ok' });
      const missing = await fetch(`${base}/api/missing`);
      assert.equal(missing.status, 404);
      assert.match(missing.headers.get('content-type'), /application\/json/);
      for (const route of ['/tasks', '/projects/studio-site', '/settings', '/login', '/signup', '/unknown-route']) {
        const response = await fetch(`${base}${route}`);
        assert.equal(response.status, 200);
        assert.match(await response.text(), /id="root"/);
      }
      const conflict = run('node_modules/vite/bin/vite.js', args, webCwd, env);
      try {
        assert.notEqual(await exited(conflict), 0);
        assert.match(conflict.output(), /already in use/);
      } finally { await conflict.close(); }
      await api.close();
      const stopped = await fetch(`${base}/api/healthz`);
      assert.equal(stopped.status, 500);
      assert.doesNotMatch(await stopped.text(), /id="root"/);
      assert.equal((await fetch(`${base}/tasks`)).status, 200);
    } finally {
      await Promise.all([web.close(), api.close()]);
    }
  });
}

test('backend command fails clearly on an occupied port', { timeout: 30000 }, async () => {
  const port = await freePort();
  const env = { API_PORT: String(port) };
  const first = run('apps/api/dist/main.js', [], root, env);
  let second;
  try {
    await ready(first, `http://127.0.0.1:${port}/api/healthz`);
    second = run('apps/api/dist/main.js', [], root, env);
    assert.notEqual(await exited(second), 0);
    assert.match(second.output(), /EADDRINUSE/);
  } finally {
    await Promise.all([first.close(), second?.close()]);
  }
});
