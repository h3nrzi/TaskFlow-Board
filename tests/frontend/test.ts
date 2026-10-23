import { test as base } from '@playwright/test';

export { expect, type Page } from '@playwright/test';

export const test = base.extend({
  context: async ({ context }, use) => {
    // Cover every tab, including the second page in cross-tab write-safety tests.
    // Cosmetic font downloads must not hold navigation or layout checks open.
    await context.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//, route => route.abort());
    await use(context);
  },
});
