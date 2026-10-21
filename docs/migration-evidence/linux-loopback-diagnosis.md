# Linux loopback correction

The first fresh Linux run passed frozen installation, preservation/dependency audits, typechecks, builds, direct health smoke and backend occupied-port check. Development and preview workflow tests failed with startup timeouts despite Vite reporting readiness. Full failing output: fresh-linux-initial.log.

Minimal reproduction on the same official Node image, without Vite or application dependencies:

```js
const server = http.createServer((req, res) => res.end('ok'));
await new Promise(resolve => server.listen(0, 'localhost', resolve));
await fetch(`http://localhost:${server.address().port}`);
```

`dns.lookup('localhost', {all:true})` returned ::1 then 127.0.0.1. The listener bound ::1, but Node fetch connected to 127.0.0.1 and failed ECONNREFUSED. This reproduces the workflow failure independently of API routing and build output.

Correction: bind both Vite development and preview explicitly to 127.0.0.1, matching the backend's loopback address. The browser origin remains http://localhost:21998/ and the HTTP tests continue to use localhost. This neither binds publicly nor alters protected source. Existing development/preview workflow tests are the regression checks.

Checked current primary documentation through Context7: https://v7.vite.dev/config/server-options#server-host documents localhost address mismatch, and https://v7.vite.dev/guide/troubleshooting recommends 127.0.0.1 for containers with IPv6 limitations.
