import { test, expect, type Page } from './test';
import { type Task } from '../../apps/web/src/workspace/types';
import { seedWorkspace, navigate } from './workspace';

const task = (id: string, title: string, changes: Partial<Task>): Task => ({
  id, title, description: '', projectId: '', status: 'todo', priority: 'medium',
  createdAt: '2026-10-20', updatedAt: '2026-10-20', ...changes,
});
async function seedDiscovery(page: Page) {
  await seedWorkspace(page, { tasks: [
    task('alpha', 'Alpha capture', { projectId: 'source', description: 'Needle in context', priority: 'high', dueDate: '2026-10-21' }),
    task('beta', 'Beta capture', { projectId: 'source', priority: 'urgent', dueDate: '2026-10-25', updatedAt: '2026-10-23' }),
    task('gamma', 'Gamma review', { projectId: 'destination', status: 'in-progress', dueDate: '2026-10-25', updatedAt: '2026-10-22' }),
    task('delta', 'Delta standalone', { priority: 'low', updatedAt: '2026-10-21' }),
    task('epsilon', 'Epsilon done', { status: 'done', priority: 'urgent', dueDate: '', updatedAt: '2026-10-23' }),
  ] });
}


function taskIds(page: Page) {
  return page.getByTestId(/^task-row-/).evaluateAll(rows => rows.map(row => row.getAttribute('data-testid')!.slice('task-row-'.length)));
}
async function expectOrder(page: Page, ids: string[]) {
  await expect.poll(() => taskIds(page)).toEqual(ids);
}


// Groups follow distinct sort values; identities inside a tie may appear in any order.
async function expectGroups(page: Page, groups: string[][]) {
  await expect.poll(async () => {
    const remaining = await taskIds(page);
    const actual = groups.map(group => remaining.splice(0, group.length).sort());
    return { groups: actual, extra: remaining };
  }).toEqual({ groups: groups.map(group => [...group].sort()), extra: [] });
}

test('search identifies title, description and project matches with combined filters and recovery', async ({ page }) => {
  await seedDiscovery(page);
  await page.goto('/tasks');
  const titles = page.getByTestId(/^button-open-task-/);
  await page.getByTestId('input-task-search').fill('ALPHA');
  await expectOrder(page, ['alpha']);
  await page.getByTestId('input-task-search').fill('needle');
  await expectOrder(page, ['alpha']);
  await page.getByTestId('input-task-search').fill('SOURCE PROJECT');
  await expectOrder(page, ['beta', 'alpha']);
  await page.getByTestId('filter-task-status').selectOption('todo');
  await page.getByTestId('filter-task-priority').selectOption('urgent');
  await page.getByTestId('filter-task-project').selectOption('source');
  await expectOrder(page, ['beta']);
  await page.getByTestId('filter-task-project').selectOption('');
  await expect(titles).toHaveCount(0);
  await expect(page.getByText('No tasks match those filters', { exact: true })).toBeVisible();
  await page.getByTestId('input-task-search').fill('');
  await page.getByTestId('filter-task-status').selectOption('all');
  await page.getByTestId('filter-task-priority').selectOption('all');
  await expectOrder(page, ['epsilon', 'delta']);
  await page.getByTestId('filter-task-project').selectOption('all');
  await expect.poll(async () => (await taskIds(page)).sort()).toEqual(['alpha', 'beta', 'delta', 'epsilon', 'gamma']);
  await expect(page.getByTestId('task-row-alpha')).toContainText('Source project');
  await expect(page.getByTestId('task-row-gamma')).toContainText('Destination project');
});

test('sorts order every result, keep undated work last and respect meaningful recency groups', async ({ page }) => {
  await seedDiscovery(page);
  await page.goto('/tasks');
  const titles = page.getByTestId(/^button-open-task-/);
  await page.getByTestId('sort-tasks').selectOption('priority');
  await expectGroups(page, [['beta', 'epsilon'], ['alpha'], ['gamma'], ['delta']]);
  await page.getByTestId('sort-tasks').selectOption('due');
  await expectGroups(page, [['alpha'], ['beta', 'gamma'], ['delta', 'epsilon']]);
  await page.getByTestId('sort-tasks').selectOption('updated');
  // Date-only recency cannot order edits within the same day. Check the tied group as a set.
  await expect(titles).toHaveCount(5);
  await expectGroups(page, [['beta', 'epsilon'], ['gamma'], ['delta'], ['alpha']]);
});

test('in-app navigation retains shell search and resets page filters and sorting on remount', async ({ page }) => {
  await seedDiscovery(page);
  await page.goto('/tasks');
  await page.getByTestId('input-task-search').fill('capture');
  await page.getByTestId('filter-task-status').selectOption('todo');
  await page.getByTestId('filter-task-priority').selectOption('urgent');
  await page.getByTestId('filter-task-project').selectOption('source');
  await page.getByTestId('sort-tasks').selectOption('due');
  await expectOrder(page, ['beta']);
  await navigate(page, 'projects');
  await navigate(page, 'tasks');
  await expect(page.getByTestId('input-task-search')).toHaveValue('capture');
  for (const id of ['filter-task-status', 'filter-task-priority', 'filter-task-project']) await expect(page.getByTestId(id)).toHaveValue('all');
  await expect(page.getByTestId('sort-tasks')).toHaveValue('updated');
  await expectOrder(page, ['beta', 'alpha']);
  await page.reload();
  await expect(page.getByTestId('input-task-search')).toHaveValue('');
  await expect(page.getByTestId(/^task-row-/)).toHaveCount(5);
});
