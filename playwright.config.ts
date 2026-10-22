import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/frontend',
  fullyParallel: true,
  workers: 3,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:22017',
    timezoneId: 'Asia/Tehran',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: ['chromium', 'firefox', 'webkit'].flatMap(browserName => [
    { name: `${browserName}-desktop`, use: { browserName: browserName as 'chromium' | 'firefox' | 'webkit', viewport: { width: 1440, height: 900 } } },
    { name: `${browserName}-mobile`, use: { browserName: browserName as 'chromium' | 'firefox' | 'webkit', viewport: { width: 390, height: 844 }, hasTouch: true, ...(browserName !== 'firefox' ? { isMobile: true } : {}) } },
  ]),
  webServer: {
    command: 'pnpm --filter @taskflow/web build && pnpm --filter @taskflow/web preview',
    env: { WEB_PORT: '22017' },
    url: 'http://127.0.0.1:22017',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
