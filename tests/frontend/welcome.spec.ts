import { test, expect } from './test';

test('Dashboard welcomes the current profile by name and still opens Tasks', async ({ page }) => {
  await page.goto('/settings');
  await page.getByTestId('input-profile-name').fill('Evening Visitor');
  await page.getByTestId('button-save-profile').click();
  await expect(page.getByTestId('workspace-save-state')).toHaveText('All changes saved locally');
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Welcome back, Evening.', exact: true })).toBeVisible();
  await page.getByTestId('link-view-all-tasks').click();
  await expect(page).toHaveURL(/\/tasks$/);
  await expect(page.getByTestId(/^task-row-/).first()).toBeVisible();
});
