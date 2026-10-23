# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: standalone.spec.ts >> edit-form unassignment preserves absent assignee and empty due date
- Location: tests/frontend/standalone.spec.ts:87:5

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator:  getByTestId('select-drawer-task-project')
Expected: ""
Received: "p"
Timeout:  5000ms

Call log:
  - Expect "toHaveValue" getByTestId('select-drawer-task-project') with timeout 5000ms
  - waiting for getByTestId('select-drawer-task-project')
    14 × locator resolved to <select class="field" data-testid="select-drawer-task-project">…</select>
       - unexpected value "p"

```

```yaml
- combobox:
  - option "No project"
  - option "Project" [selected]
```

# Test source

```ts
  8   |   await expect(page.getByTestId('input-task-project')).toHaveValue('studio-site');
  9   |   await page.getByTestId('input-task-project').selectOption({ label: 'No project' });
  10  |   await page.getByTestId('input-task-title').fill('Standalone capture');
  11  |   await page.getByTestId('button-save-task').click();
  12  |   await expect(page.getByTestId('workspace-save-state')).toHaveText('All changes saved locally');
  13  |   await page.reload();
  14  |   await page.getByText('Standalone capture', { exact: true }).click();
  15  |   await expect(page.getByTestId('select-drawer-task-project')).toHaveValue('');
  16  |   await page.getByTestId('button-close-task-drawer').click();
  17  |   await page.goto('/projects/field-notes');
  18  |   await page.getByTestId('button-add-task-project').click();
  19  |   await expect(page.getByTestId('input-task-project')).toHaveValue('field-notes');
  20  |   await page.getByTestId('input-task-project').selectOption({ label: 'No project' });
  21  |   await page.getByTestId('input-task-title').fill('Standalone from board');
  22  |   await page.getByTestId('button-save-task').click();
  23  |   await expect(page.getByTestId('workspace-save-state')).toHaveText('All changes saved locally');
  24  |   await expect(page.getByTestId(/^board-task-/).filter({ hasText: 'Standalone from board' })).toHaveCount(0);
  25  |   await page.goto('/tasks');
  26  |   await page.getByText('Standalone from board', { exact: true }).click();
  27  |   await expect(page.getByTestId('select-drawer-task-project')).toHaveValue('');
  28  | });
  29  | 
  30  | test('unassignment preserves task fields, supports cancellation and is reversible in both editors', async ({ page }) => {
  31  |   await page.goto('/tasks');
  32  |   await page.getByTestId('button-open-task-task-1').click();
  33  |   const original = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!).tasks.find(t => t.id === 'task-1'), key);
  34  |   await page.getByTestId('button-edit-task').click();
  35  |   await page.getByTestId('input-task-project').selectOption({ label: 'No project' });
  36  |   await page.getByTestId('button-cancel-task').click();
  37  |   await expect(page.getByTestId('select-drawer-task-project')).toHaveValue(original.projectId);
  38  |   await page.getByTestId('button-edit-task').click();
  39  |   await page.getByTestId('input-task-project').selectOption({ label: 'No project' });
  40  |   await page.getByTestId('button-save-task').click();
  41  |   await expect(page.getByTestId('select-drawer-task-project')).toHaveValue('');
  42  |   const preserved = async () => {
  43  |     await expect(page.getByTestId('workspace-save-state')).toHaveText('All changes saved locally');
  44  |     const saved = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!).tasks.find(t => t.id === 'task-1'), key);
  45  |     expect(saved).toEqual({ ...original, projectId: '', updatedAt: saved.updatedAt });
  46  |   };
  47  |   await preserved();
  48  |   await page.getByTestId('select-drawer-task-project').selectOption('field-notes');
  49  |   await expect(page.getByTestId('select-drawer-task-project')).toHaveValue('field-notes');
  50  |   await page.getByTestId('select-drawer-task-project').selectOption({ label: 'No project' });
  51  |   await preserved();
  52  |   await page.reload();
  53  |   await page.getByTestId('button-open-task-task-1').click();
  54  |   await expect(page.getByTestId('select-drawer-task-project')).toHaveValue('');
  55  |   await preserved();
  56  | });
  57  | 
  58  | test('No project combines with search, status, priority, sorting and empty results', async ({ page }) => {
  59  |   await page.addInitScript(key => localStorage.setItem(key, JSON.stringify({
  60  |     projects: [{ id: 'p', name: 'Project', description: '', color: '#558b73', icon: 'P', createdAt: '2026-10-20' }],
  61  |     tasks: [
  62  |       { id: 'early', title: 'Capture early', description: '', projectId: '', status: 'todo', priority: 'high', dueDate: '2026-10-21', createdAt: '2026-10-20', updatedAt: '2026-10-20' },
  63  |       { id: 'late', title: 'Capture late', description: '', projectId: '', status: 'todo', priority: 'urgent', dueDate: '2026-10-25', createdAt: '2026-10-20', updatedAt: '2026-10-22' },
  64  |       { id: 'assigned', title: 'Capture assigned', description: '', projectId: 'p', status: 'todo', priority: 'urgent', createdAt: '2026-10-20', updatedAt: '2026-10-20' },
  65  |       { id: 'done', title: 'Other work', description: '', projectId: '', status: 'done', priority: 'low', createdAt: '2026-10-20', updatedAt: '2026-10-20' },
  66  |     ], profile: { name: 'Tester', email: 'test@example.com', avatar: 'T' }, theme: 'light',
  67  |   })), key);
  68  |   await page.goto('/tasks');
  69  |   const rows = page.getByTestId(/^task-row-/);
  70  |   await expect(rows).toHaveCount(4);
  71  |   await page.getByTestId('filter-task-project').selectOption({ label: 'No project' });
  72  |   await expect(rows).toHaveCount(3);
  73  |   await page.getByTestId('input-task-search').fill('Capture');
  74  |   await page.getByTestId('filter-task-status').selectOption('todo');
  75  |   await expect(rows).toHaveCount(2);
  76  |   await page.getByTestId('sort-tasks').selectOption('due');
  77  |   await expect(rows.first()).toContainText('Capture early');
  78  |   await page.getByTestId('sort-tasks').selectOption('priority');
  79  |   await expect(rows.first()).toContainText('Capture late');
  80  |   await page.getByTestId('filter-task-priority').selectOption('urgent');
  81  |   await expect(rows).toHaveCount(1);
  82  |   await expect(rows).toContainText('Capture late');
  83  |   await page.getByTestId('input-task-search').fill('absent');
  84  |   await expect(page.getByText('No tasks match those filters')).toBeVisible();
  85  | });
  86  | 
  87  | test('edit-form unassignment preserves absent assignee and empty due date', async ({ page }) => {
  88  |   await page.addInitScript(key => localStorage.setItem(key, JSON.stringify({
  89  |     projects: [{ id: 'p', name: 'Project', description: '', color: '#558b73', icon: 'P', createdAt: '2026-10-20' }],
  90  |     tasks: [{ id: 'optional', title: 'Optional values', description: '', projectId: 'p', status: 'todo', priority: 'medium', dueDate: '', createdAt: '2026-10-20', updatedAt: '2026-10-20' }],
  91  |     profile: { name: 'Tester', email: 'test@example.com', avatar: 'T' }, theme: 'light',
  92  |   })), key);
  93  |   await page.goto('/tasks');
  94  |   await page.getByTestId('button-open-task-optional').click();
  95  |   await page.getByTestId('button-edit-task').click();
  96  |   await page.getByTestId('input-task-project').selectOption('');
  97  |   await page.getByTestId('button-save-task').click();
  98  |   await expect(page.getByTestId('workspace-save-state')).toHaveText('All changes saved locally');
  99  |   const task = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!).tasks[0], key);
  100 |   expect(task.dueDate).toBe('');
  101 |   expect(task).not.toHaveProperty('assignee');
  102 |   await page.reload();
  103 |   await page.getByTestId('button-open-task-optional').click();
  104 |   await expect(page.getByTestId('drawer-task-details')).toContainText('Optional values');
  105 |   await expect(page.getByTestId('drawer-task-details')).toContainText('No description yet.');
  106 |   await expect(page.getByTestId('input-drawer-task-date')).toHaveValue('');
  107 |   await expect(page.getByTestId('input-drawer-assignee')).toHaveValue('');
> 108 |   await expect(page.getByTestId('select-drawer-task-project')).toHaveValue('');
      |                                                                ^ Error: expect(locator).toHaveValue(expected) failed
  109 | });
  110 | 
```