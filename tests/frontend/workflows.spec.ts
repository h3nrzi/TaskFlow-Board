import { test, expect } from './test';

const key = 'taskflow-store-v1';
test('task CRUD, drawer edits, completion and reload', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/tasks');
  await page.getByTestId('button-create-task').click();
  await page.getByTestId('input-task-title').fill('Cancelled capture');
  await page.getByTestId('button-cancel-task').click();
  await page.reload();
  await expect(page.getByText('Cancelled capture', { exact: true })).toHaveCount(0);
  await page.getByTestId('button-create-task').click();
  await page.getByTestId('input-task-title').fill('Audit task');
  await page.getByTestId('input-task-description').fill('Audit description');
  await page.getByTestId('input-task-priority').selectOption('urgent');
  await page.getByTestId('input-task-project').selectOption('field-notes');
  await page.getByTestId('input-task-due-date').fill('2026-12-20');
  await page.getByTestId('button-save-task').click();
  await page.getByText('Audit task', { exact: true }).click();
  await page.getByTestId('select-drawer-task-status').selectOption('in-progress');
  await page.getByTestId('input-drawer-assignee').fill('Tester');
  await page.getByTestId('button-edit-task').click();
  await page.getByTestId('input-task-title').fill('Discarded edit');
  await page.getByTestId('input-task-description').fill('Discarded description');
  await page.getByTestId('button-cancel-task').click();
  await expect(page.getByTestId('drawer-task-details')).toContainText('Audit task');
  await expect(page.getByTestId('drawer-task-details')).toContainText('Audit description');
  await page.getByTestId('button-edit-task').click();
  await page.getByTestId('input-task-title').fill('Edited audit task');
  await page.getByTestId('button-save-task').click();
  await expect(page.getByTestId('drawer-task-details')).toContainText('Edited audit task');
  await page.getByTestId('button-close-task-drawer').click();
  await expect(page.getByTestId('workspace-save-state')).toHaveText('All changes saved locally');
  await page.reload();
  const row = page.getByTestId(/^task-row-/).filter({ hasText: 'Edited audit task' });
  await expect(row).toContainText('Field Notes');
  await row.getByText('Edited audit task', { exact: true }).click();
  await expect(page.getByTestId('drawer-task-details')).toContainText('Audit description');
  await expect(page.getByTestId('select-drawer-task-status')).toHaveValue('in-progress');
  await expect(page.getByTestId('select-drawer-task-priority')).toHaveValue('urgent');
  await expect(page.getByTestId('select-drawer-task-project')).toHaveValue('field-notes');
  await expect(page.getByTestId('input-drawer-task-date')).toHaveValue('2026-12-20');
  await expect(page.getByTestId('input-drawer-assignee')).toHaveValue('Tester');
  await page.getByTestId('button-close-task-drawer').click();
  await row.getByRole('button', { name: 'Mark task done', exact: true }).click();
  await expect(row.getByRole('button', { name: 'Mark task not done', exact: true })).toBeVisible();
  await row.getByText('Edited audit task', { exact: true }).click();
  await page.getByTestId('button-delete-task').click();
  await page.getByTestId('button-cancel-delete').click();
  await expect(page.getByTestId('drawer-task-details')).toBeVisible();
  await page.getByTestId('button-delete-task').click();
  await page.getByTestId('button-confirm-delete').click();
  await expect(page.getByText('Edited audit task', { exact: true })).toHaveCount(0);
  await expect(page.getByTestId('workspace-save-state')).toHaveText('All changes saved locally');
  await page.reload();
  await expect(page.getByText('Edited audit task', { exact: true })).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('project CRUD, board status controls and cascade deletion', async ({ page, isMobile }) => {
  await page.goto('/projects');
  await page.getByTestId('button-create-project').click();
  await page.getByTestId('input-project-name').fill('Audit project');
  await page.getByTestId('button-save-project').click();
  await expect(page.getByRole('heading', { name: 'Audit project', exact: true })).toBeVisible();
  await page.getByTestId('button-edit-current-project').click();
  await page.getByTestId('input-project-name').fill('Renamed project');
  await page.getByTestId('button-save-project').click();
  await expect(page.getByRole('heading', { name: 'Renamed project', exact: true })).toBeVisible();
  await page.getByTestId('button-add-task-project').click();
  await page.getByTestId('input-task-title').fill('Cascade task');
  // Explicitly choose the project to isolate CRUD from the board-context regression.
  await page.getByTestId('input-task-project').selectOption({ label: 'Renamed project' });
  await page.getByTestId('button-save-task').click();
  const card = page.getByTestId(/^board-task-/).filter({ hasText: 'Cascade task' });
  await card.getByRole('combobox').selectOption('in-progress');
  await expect(page.getByTestId('column-in-progress')).toContainText('Cascade task');
  if (!isMobile && !test.info().project.name.endsWith('mobile')) {
    await card.dragTo(page.getByTestId('column-done'));
    await expect(page.getByTestId('column-done')).toContainText('Cascade task');
  }
  await page.getByTestId('button-delete-current-project').click();
  await expect(page.getByRole('alertdialog')).toContainText('every task');
  await page.getByTestId('button-confirm-delete').click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByTestId('workspace-save-state')).toHaveText('All changes saved locally');
  const saved = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), key);
  expect(saved.projects.some(p => p.name === 'Renamed project')).toBe(false);
  expect(saved.tasks.some(t => t.title === 'Cascade task')).toBe(false);
});

test('search, combined filters and priority/due sorting', async ({ page }) => {
  await page.goto('/tasks');
  await page.getByTestId('input-task-search').fill('landing');
  await expect(page.getByTestId(/^task-row-/)).toHaveCount(1);
  await page.getByTestId('input-task-search').fill('');
  await page.getByTestId('filter-task-status').selectOption('todo');
  await page.getByTestId('filter-task-priority').selectOption('urgent');
  await page.getByTestId('filter-task-project').selectOption('field-notes');
  await expect(page.getByTestId(/^task-row-/)).toHaveCount(1);
  await expect(page.getByTestId(/^task-row-/)).toContainText('Map the onboarding journey');
  for (const id of ['filter-task-status', 'filter-task-priority', 'filter-task-project']) await page.getByTestId(id).selectOption('all');
  await page.getByTestId('sort-tasks').selectOption('priority');
  await expect(page.getByTestId(/^task-row-/).first()).toContainText('Map the onboarding journey');
  await page.getByTestId('sort-tasks').selectOption('due');
  await expect(page.getByTestId(/^task-row-/).first()).toContainText('Audit image library');
  await page.getByTestId('input-task-search').fill('no matching task');
  await expect(page.getByText('No tasks match those filters')).toBeVisible();
});

test('overview, settings, theme, demo profile and route fallbacks', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('link-view-all-tasks')).toBeVisible();
  await page.getByTestId('upcoming-task-task-1').click();
  await expect(page.getByTestId('drawer-task-details')).toContainText('Sketch the new landing page');
  await page.getByTestId('button-close-task-drawer').click();
  await page.goto('/settings');
  await page.getByTestId('input-profile-name').fill('Audit User');
  await page.getByTestId('input-profile-email').fill('audit@example.com');
  await page.getByTestId('button-save-profile').click();
  await page.getByTestId('button-theme-dark').click();
  await expect(page.getByTestId('workspace-save-state')).toHaveText('All changes saved locally');
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.getByTestId('input-profile-name')).toHaveValue('Audit User');
  await page.getByTestId('button-theme-light').click();
  await expect(page.getByTestId('workspace-save-state')).toHaveText('All changes saved locally');
  await page.goto('/signup');
  await page.getByTestId('input-signup-name').fill('Demo User');
  await page.getByTestId('input-signup-email').fill('demo@example.com');
  await page.getByTestId('button-signup-submit').click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByTestId('workspace-save-state')).toHaveText('All changes saved locally');
  await page.goto('/projects/does-not-exist');
  await expect(page.getByText('This project has moved')).toBeVisible();
  await page.goto('/not-a-route');
  await expect(page.getByText(/404/)).toBeVisible();
});

test('responsive routes fit portrait and landscape, with touch navigation', async ({ page }, info) => {
  const mobile = info.project.name.endsWith('mobile');
  for (const width of mobile ? [320, 390, 844] : [768, 1024, 1440]) {
    await page.setViewportSize({ width, height: mobile && width === 844 ? 390 : 900 });
    for (const route of ['/', '/tasks', '/projects', '/projects/field-notes', '/settings', '/login', '/signup']) {
      await page.goto(route);
      const overflow = await page.evaluate(() => ({ viewport: innerWidth, width: document.documentElement.scrollWidth,
        elements: Array.from(document.querySelectorAll('main *')).filter(el => el.getBoundingClientRect().right > innerWidth + 1).slice(0, 6).map(el => ({ tag: el.tagName, class: el.className, right: el.getBoundingClientRect().right })) }));
      expect(overflow.width, `${route} at ${width}px: ${JSON.stringify(overflow.elements)}`).toBeLessThanOrEqual(overflow.viewport);
      if (mobile && width === 320 && (route === '/' || route === '/settings')) {
        await info.attach(route === '/' ? 'overview-320px' : 'settings-320px', { body: await page.screenshot(), contentType: 'image/png' });
      }
    }
  }
  if (mobile) {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto('/tasks');
    await page.getByTestId('button-create-task').click();
    expect(await page.getByTestId('form-task').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    await page.getByTestId('button-cancel-task').click();
    await page.goto('/projects');
    await page.getByTestId('button-create-project').click();
    expect(await page.getByTestId('form-project').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    await page.getByTestId('button-cancel-project').click();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.getByTestId('mobile-nav-tasks').tap();
    await expect(page).toHaveURL(/\/tasks$/);
    await page.getByTestId('button-mobile-menu').tap();
    await page.locator('.mobile-menu-panel').getByTestId('nav-projects').tap();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(page.locator('.mobile-menu-panel')).toHaveCount(0);
  }
});
