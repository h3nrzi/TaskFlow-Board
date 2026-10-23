import { test, expect } from './test';

const key = 'taskflow-store-v1';

test('standalone creation overrides general and board defaults and survives reload', async ({ page }) => {
  await page.goto('/tasks');
  await page.getByTestId('button-create-task').click();
  await expect(page.getByTestId('input-task-project')).toHaveValue('studio-site');
  await page.getByTestId('input-task-project').selectOption({ label: 'No project' });
  await page.getByTestId('input-task-title').fill('Standalone capture');
  await page.getByTestId('button-save-task').click();
  await expect(page.getByTestId('workspace-save-state')).toHaveText('All changes saved locally');
  await page.reload();
  await page.getByText('Standalone capture', { exact: true }).click();
  await expect(page.getByTestId('select-drawer-task-project')).toHaveValue('');
  await page.getByTestId('button-close-task-drawer').click();
  await page.goto('/projects/field-notes');
  await page.getByTestId('button-add-task-project').click();
  await expect(page.getByTestId('input-task-project')).toHaveValue('field-notes');
  await page.getByTestId('input-task-project').selectOption({ label: 'No project' });
  await page.getByTestId('input-task-title').fill('Standalone from board');
  await page.getByTestId('button-save-task').click();
  await expect(page.getByTestId('workspace-save-state')).toHaveText('All changes saved locally');
  await expect(page.getByTestId(/^board-task-/).filter({ hasText: 'Standalone from board' })).toHaveCount(0);
  await page.goto('/tasks');
  await page.getByText('Standalone from board', { exact: true }).click();
  await expect(page.getByTestId('select-drawer-task-project')).toHaveValue('');
});

test('unassignment preserves task fields, supports cancellation and is reversible in both editors', async ({ page }) => {
  await page.goto('/tasks');
  await page.getByTestId('button-open-task-task-1').click();
  const original = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!).tasks.find(t => t.id === 'task-1'), key);
  await page.getByTestId('button-edit-task').click();
  await page.getByTestId('input-task-project').selectOption({ label: 'No project' });
  await page.getByTestId('button-cancel-task').click();
  await expect(page.getByTestId('select-drawer-task-project')).toHaveValue(original.projectId);
  await page.getByTestId('button-edit-task').click();
  await page.getByTestId('input-task-project').selectOption({ label: 'No project' });
  await page.getByTestId('button-save-task').click();
  await expect(page.getByTestId('select-drawer-task-project')).toHaveValue('');
  const preserved = async () => {
    await expect(page.getByTestId('workspace-save-state')).toHaveText('All changes saved locally');
    const saved = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!).tasks.find(t => t.id === 'task-1'), key);
    expect(saved).toEqual({ ...original, projectId: '', updatedAt: saved.updatedAt });
  };
  await preserved();
  await page.getByTestId('select-drawer-task-project').selectOption('field-notes');
  await expect(page.getByTestId('select-drawer-task-project')).toHaveValue('field-notes');
  await page.getByTestId('select-drawer-task-project').selectOption({ label: 'No project' });
  await preserved();
  await page.reload();
  await page.getByTestId('button-open-task-task-1').click();
  await expect(page.getByTestId('select-drawer-task-project')).toHaveValue('');
  await preserved();
});

test('No project combines with search, status, priority, sorting and empty results', async ({ page }) => {
  await page.addInitScript(key => localStorage.setItem(key, JSON.stringify({
    projects: [{ id: 'p', name: 'Project', description: '', color: '#558b73', icon: 'P', createdAt: '2026-10-20' }],
    tasks: [
      { id: 'early', title: 'Capture early', description: '', projectId: '', status: 'todo', priority: 'high', dueDate: '2026-10-21', createdAt: '2026-10-20', updatedAt: '2026-10-20' },
      { id: 'late', title: 'Capture late', description: '', projectId: '', status: 'todo', priority: 'urgent', dueDate: '2026-10-25', createdAt: '2026-10-20', updatedAt: '2026-10-22' },
      { id: 'assigned', title: 'Capture assigned', description: '', projectId: 'p', status: 'todo', priority: 'urgent', createdAt: '2026-10-20', updatedAt: '2026-10-20' },
      { id: 'done', title: 'Other work', description: '', projectId: '', status: 'done', priority: 'low', createdAt: '2026-10-20', updatedAt: '2026-10-20' },
    ], profile: { name: 'Tester', email: 'test@example.com', avatar: 'T' }, theme: 'light',
  })), key);
  await page.goto('/tasks');
  const rows = page.getByTestId(/^task-row-/);
  await expect(rows).toHaveCount(4);
  await page.getByTestId('filter-task-project').selectOption({ label: 'No project' });
  await expect(rows).toHaveCount(3);
  await page.getByTestId('input-task-search').fill('Capture');
  await page.getByTestId('filter-task-status').selectOption('todo');
  await expect(rows).toHaveCount(2);
  await page.getByTestId('sort-tasks').selectOption('due');
  await expect(rows.first()).toContainText('Capture early');
  await page.getByTestId('sort-tasks').selectOption('priority');
  await expect(rows.first()).toContainText('Capture late');
  await page.getByTestId('filter-task-priority').selectOption('urgent');
  await expect(rows).toHaveCount(1);
  await expect(rows).toContainText('Capture late');
  await page.getByTestId('input-task-search').fill('absent');
  await expect(page.getByText('No tasks match those filters')).toBeVisible();
});

test('edit-form unassignment preserves absent assignee and empty due date', async ({ page }) => {
  await page.addInitScript(key => localStorage.setItem(key, JSON.stringify({
    projects: [{ id: 'p', name: 'Project', description: '', color: '#558b73', icon: 'P', createdAt: '2026-10-20' }],
    tasks: [{ id: 'optional', title: 'Optional values', description: '', projectId: 'p', status: 'todo', priority: 'medium', dueDate: '', createdAt: '2026-10-20', updatedAt: '2026-10-20' }],
    profile: { name: 'Tester', email: 'test@example.com', avatar: 'T' }, theme: 'light',
  })), key);
  await page.goto('/tasks');
  await page.getByTestId('button-open-task-optional').click();
  await page.getByTestId('button-edit-task').click();
  await page.getByTestId('input-task-project').selectOption('');
  await page.getByTestId('button-save-task').click();
  await expect(page.getByTestId('workspace-save-state')).toHaveText('All changes saved locally');
  const task = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!).tasks[0], key);
  expect(task.dueDate).toBe('');
  expect(task).not.toHaveProperty('assignee');
  await page.reload();
  await page.getByTestId('button-open-task-optional').click();
  await expect(page.getByTestId('drawer-task-details')).toContainText('Optional values');
  await expect(page.getByTestId('drawer-task-details')).toContainText('No description yet.');
  await expect(page.getByTestId('input-drawer-task-date')).toHaveValue('');
  await expect(page.getByTestId('input-drawer-assignee')).toHaveValue('');
  await expect(page.getByTestId('select-drawer-task-project')).toHaveValue('');
});
