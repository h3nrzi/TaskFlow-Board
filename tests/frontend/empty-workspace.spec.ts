import { test, expect } from './test';
import { seedWorkspace, waitForSaved, navigate } from './workspace';

test('empty Dashboard captures standalone work and first project leads to board capture', async ({ page }) => {
  await seedWorkspace(page, { projects: [] });
  await page.goto('/');
  await expect(page.getByText('Nothing on the board yet', { exact: true })).toBeVisible();
  await expect(page.getByText('Start with a project', { exact: true })).toBeVisible();
  await page.locator('section').filter({ has: page.getByText('Nothing on the board yet', { exact: true }) }).getByRole('button', { name: 'Add a task', exact: true }).click();
  await expect(page.getByTestId('input-task-project')).toHaveValue('');
  await page.getByTestId('input-task-title').fill('Empty workspace capture');
  await page.getByTestId('button-save-task').click();
  await waitForSaved(page);
  await page.reload();
  await expect(page.getByTestId(/^task-row-/)).toContainText('Empty workspace capture');
  await expect(page.getByTestId(/^task-row-/)).toContainText('No project');
  await page.getByRole('main').getByRole('button', { name: 'Create project', exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await page.getByRole('button', { name: 'Create your first project', exact: true }).click();
  await page.getByTestId('input-project-name').fill('First project');
  await page.getByTestId('button-save-project').click();
  await expect(page.getByTestId('column-todo')).toContainText('Drop a task here');
  await page.getByTestId('button-add-task-column').click();
  await expect(page.getByTestId('input-task-project').locator('option:checked')).toHaveText('First project');
  await page.getByTestId('input-task-title').fill('First board capture');
  await page.getByTestId('button-save-task').click();
  await expect(page.getByTestId('column-todo')).toContainText('First board capture');
  await waitForSaved(page);
  await page.reload();
  await expect(page.getByTestId(/^board-task-/)).toContainText('First board capture');
  await navigate(page, 'tasks');
  await expect(page.getByTestId(/^task-row-/)).toHaveCount(2);
  await expect(page.getByTestId(/^task-row-/).filter({ hasText: 'Empty workspace capture' })).toContainText('No project');
});

test('empty Tasks action creates usable standalone work without a project', async ({ page }) => {
  await seedWorkspace(page, { projects: [] });
  await page.goto('/tasks');
  await expect(page.getByText('Your task list is a blank page', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Create a task', exact: true }).click();
  await expect(page.getByTestId('input-task-project')).toHaveValue('');
  await page.getByTestId('input-task-title').fill('First list capture');
  await page.getByTestId('button-save-task').click();
  await waitForSaved(page);
  await page.reload();
  await expect(page.getByTestId(/^task-row-/)).toHaveCount(1);
  await page.getByText('First list capture', { exact: true }).click();
  await expect(page.getByTestId('select-drawer-task-project')).toHaveValue('');
});
