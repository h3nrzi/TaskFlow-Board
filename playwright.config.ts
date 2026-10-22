import { defineConfig } from '@playwright/test';

const development = process.env.TASKFLOW_TEST_SERVER === 'development';
const port = development ? '22016' : '22017';

export default defineConfig({
  testDir: './tests/frontend',
  fullyParallel: true,
  workers: 3,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    timezoneId: 'Asia/Tehran',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: ['chromium', 'firefox', 'webkit'].flatMap(browserName => [
    { name: `${browserName}-desktop`, use: { browserName: browserName as 'chromium' | 'firefox' | 'webkit', viewport: { width: 1440, height: 900 } } },
    { name: `${browserName}-mobile`, use: { browserName: browserName as 'chromium' | 'firefox' | 'webkit', viewport: { width: 390, height: 844 }, hasTouch: true, ...(browserName !== 'firefox' ? { isMobile: true } : {}) } },
  ]),
  webServer: {
    command: development ? 'pnpm dev:web' : 'pnpm --filter @taskflow/web build && pnpm --filter @taskflow/web preview',
    env: { WEB_PORT: port },
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
