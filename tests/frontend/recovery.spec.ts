import { test, expect } from './test';

for (const theme of ['light', 'dark']) {
  test(`unknown-page recovery preserves workspace and keyboard access in ${theme}`, async ({ page, browserName }, info) => {
    await page.goto('/tasks');
    await page.getByTestId('button-create-task').click();
    await page.getByTestId('input-task-title').fill('Recovery keeps this task');
    await page.getByTestId('button-save-task').click();
    await expect(page.getByTestId('workspace-save-state')).toHaveText('All changes saved locally');
    const before = await page.evaluate(() => localStorage.getItem('taskflow-store-v1'));
    // Exercise the fallback's theme styles independently of the mounted workspace shell.
    await page.addInitScript(theme => document.addEventListener('DOMContentLoaded', () => document.documentElement.classList.toggle('dark', theme === 'dark')), theme);
    await page.goto('/not-a-route');
    await expect(page.getByRole('heading', { name: /404.*page not found/i })).toBeVisible();
    await expect(page.getByText(/couldn.t find this page/i)).toBeVisible();
    const recovery = page.getByRole('link', { name: 'Back to Dashboard', exact: true });
    await expect(recovery).toHaveAttribute('href', '/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await info.attach(`404-${theme}`, { body: await page.screenshot(), contentType: 'image/png' });
    // macOS WebKit uses Option-Tab to include links in keyboard navigation.
    await page.keyboard.press(browserName === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab');
    await expect(recovery).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('heading', { name: /Welcome back,/ })).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('taskflow-store-v1'))).toBe(before);
    await page.getByTestId('link-view-all-tasks').click();
    await expect(page.getByText('Recovery keeps this task', { exact: true })).toBeVisible();
    await page.goto('/projects/does-not-exist');
    await expect(page.getByText('This project has moved')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Back to Dashboard', exact: true })).toHaveCount(0);
  });
}
