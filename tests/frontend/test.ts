import { test as base } from '@playwright/test';

export { expect, type Page } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    // Cosmetic font downloads must not hold navigation or layout checks open.
    await page.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//, route => route.abort());
    await use(page);
  },
});
