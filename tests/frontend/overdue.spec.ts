import { test, expect, type Page } from '@playwright/test';

const key = 'taskflow-store-v1';
async function seed(page: Page, theme = 'light') {
  await page.addInitScript(({ key, theme }) => {
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, JSON.stringify({
      projects: [{ id: 'p', name: 'Deadline project', description: '', color: '#558b73', icon: 'D', createdAt: '2026-10-20' }],
      tasks: [
        ['past-todo', 'Past todo', 'todo', '2026-10-22'],
        ['past-progress', 'Past progress', 'in-progress', '2026-10-21'],
        ['past-done', 'Past done', 'done', '2026-10-20'],
        ['today', 'Due today', 'todo', '2026-10-23'],
        ['future', 'Future', 'in-progress', '2026-10-24'],
        ['absent', 'Undated', 'todo', undefined],
        ['empty', 'Empty date', 'in-progress', ''],
      ].map(([id, title, status, dueDate]) => ({ id, title, status, dueDate, projectId: 'p', description: '', priority: 'medium', createdAt: '2026-10-20', updatedAt: '2026-10-22' })),
      profile: { name: 'Tester', email: 'test@example.com', avatar: 'T' }, theme,
    }));
  }, { key, theme });
}

for (const theme of ['light', 'dark']) {
  test(`overdue uses local dates across task surfaces in ${theme} theme`, async ({ page }, info) => {
    // Tehran is Oct 23 while UTC is still Oct 22.
    await page.clock.install({ time: new Date('2026-10-22T21:30:00Z') });
    await seed(page, theme);
    await page.goto('/tasks');
    for (const id of ['past-todo', 'past-progress']) {
      await expect(page.getByTestId(`task-row-${id}`).getByText('Overdue', { exact: true })).toBeVisible();
    }
    for (const id of ['past-done', 'today', 'future', 'absent', 'empty']) {
      await expect(page.getByTestId(`task-row-${id}`).getByText('Overdue', { exact: true })).toHaveCount(0);
    }
    await page.getByTestId('button-open-task-past-todo').click();
    await expect(page.getByTestId('drawer-task-details').getByText('Overdue', { exact: true })).toBeVisible();
    await page.getByTestId('button-close-task-drawer').click();
    await page.goto('/projects/p');
    await expect(page.getByTestId('board-task-past-todo').getByText('Overdue', { exact: true })).toBeVisible();
    await expect(page.getByTestId('board-task-past-progress').getByText('Overdue', { exact: true })).toBeVisible();
    await expect(page.getByText('Overdue', { exact: true })).toHaveCount(2);
    await info.attach(`overdue-board-${theme}`, { body: await page.screenshot(), contentType: 'image/png' });
    await page.goto('/');
    await expect(page.getByTestId('task-row-past-todo').getByText('Overdue', { exact: true })).toBeVisible();
    await expect(page.getByTestId('task-row-past-progress').getByText('Overdue', { exact: true })).toBeVisible();
    await expect(page.getByTestId('upcoming-task-past-todo')).toHaveCount(0);
    await expect(page.getByTestId('upcoming-task-today')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('completion, reopening and date edits update overdue without storing a badge', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-10-22T21:30:00Z'));
  await seed(page);
  await page.goto('/tasks');
  const row = page.getByTestId('task-row-past-todo');
  await row.getByRole('button', { name: 'Mark task done', exact: true }).click();
  await expect(row.getByText('Overdue', { exact: true })).toHaveCount(0);
  await row.getByRole('button', { name: 'Mark task not done', exact: true }).click();
  await expect(row.getByText('Overdue', { exact: true })).toBeVisible();
  await page.getByTestId('button-open-task-past-todo').click();
  const drawer = page.getByTestId('drawer-task-details');
  await page.getByTestId('select-drawer-task-status').selectOption('done');
  await expect(drawer.getByText('Overdue', { exact: true })).toHaveCount(0);
  await page.getByTestId('select-drawer-task-status').selectOption('in-progress');
  await expect(drawer.getByText('Overdue', { exact: true })).toBeVisible();
  await page.getByTestId('input-drawer-task-date').fill('2026-10-23');
  await expect(drawer.getByText('Overdue', { exact: true })).toHaveCount(0);
  await page.getByTestId('input-drawer-task-date').fill('2026-10-21');
  await expect(drawer.getByText('Overdue', { exact: true })).toBeVisible();
  await page.getByTestId('input-drawer-task-date').fill('');
  await expect(drawer.getByText('Overdue', { exact: true })).toHaveCount(0);
  await page.getByTestId('button-edit-task').click();
  await expect(page.getByTestId('form-task').getByText('Overdue', { exact: true })).toHaveCount(0);
  await page.getByTestId('input-task-due-date').fill('2026-10-20');
  await page.getByTestId('button-save-task').click();
  await expect(drawer.getByText('Overdue', { exact: true })).toBeVisible();
  await page.getByTestId('button-close-task-drawer').click();
  await expect(page.getByTestId('workspace-save-state')).toHaveText('All changes saved locally');
  const saved = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!).tasks.find(t => t.id === 'past-todo'), key);
  expect(Object.keys(saved).sort()).toEqual(['createdAt', 'description', 'dueDate', 'id', 'priority', 'projectId', 'status', 'title', 'updatedAt']);
  await page.reload();
  await expect(row.getByText('Overdue', { exact: true })).toBeVisible();
});

test('render and reload after local midnight refresh overdue classification', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-10-22T20:29:00Z'));
  await seed(page);
  await page.goto('/tasks');
  const row = page.getByTestId('task-row-past-todo');
  await expect(row.getByText('Overdue', { exact: true })).toHaveCount(0);
  await page.clock.setFixedTime(new Date('2026-10-22T20:31:00Z'));
  await page.getByTestId('button-open-task-past-todo').click();
  await expect(page.getByTestId('drawer-task-details').getByText('Overdue', { exact: true })).toBeVisible();
  await page.getByTestId('button-close-task-drawer').click();
  await page.reload();
  await expect(row.getByText('Overdue', { exact: true })).toBeVisible();
});
