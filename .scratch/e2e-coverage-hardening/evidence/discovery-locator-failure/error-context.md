# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: discovery.spec.ts >> search identifies title, description and project matches with combined filters and recovery
- Location: tests/frontend/discovery.spec.ts:19:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId(/^button-open-task-/)
Timeout: 5000ms
- Expected  - 1
+ Received  + 1

  Array [
-   "Alpha capture",
+   "Alpha captureSource project · Due Oct 21 Overdue",
  ]

Call log:
  - Expect "toHaveText" getByTestId(/^button-open-task-/) with timeout 5000ms
  - waiting for getByTestId(/^button-open-task-/)
    14 × locator resolved to 1 element

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - complementary [ref=e4]:
      - link "taskflow" [ref=e5] [cursor=pointer]:
        - /url: /
      - generic [ref=e10]: Workspace
      - generic [ref=e11]:
        - link "Overview" [ref=e12] [cursor=pointer]:
          - /url: /
        - link "Projects" [ref=e18] [cursor=pointer]:
          - /url: /projects
        - link "Tasks" [ref=e21] [cursor=pointer]:
          - /url: /tasks
        - link "Settings" [ref=e25] [cursor=pointer]:
          - /url: /settings
      - generic [ref=e29]:
        - text: Your projects
        - button "Create project" [ref=e30] [cursor=pointer]
      - generic [ref=e32]:
        - link "Source project" [ref=e33] [cursor=pointer]:
          - /url: /projects/source
        - link "Destination project" [ref=e36] [cursor=pointer]:
          - /url: /projects/destination
      - generic [ref=e46]:
        - generic [ref=e47]: A little progress
        - generic [ref=e48]: adds up every day.
      - generic [ref=e49]:
        - generic [ref=e50]: AU
        - generic [ref=e51]:
          - generic [ref=e52]: Audit User
          - generic [ref=e53]: audit@example.com
        - button "Toggle theme" [ref=e54] [cursor=pointer]
    - main [ref=e57]:
      - status [ref=e58]: All changes saved locally
      - generic [ref=e59]:
        - generic [ref=e60]: All tasks
        - generic [ref=e62]:
          - button "New task" [ref=e63] [cursor=pointer]
          - button "Switch to dark theme" [ref=e65] [cursor=pointer]
          - link "Open profile settings" [ref=e68] [cursor=pointer]:
            - /url: /settings
            - text: AU
      - generic [ref=e69]:
        - generic [ref=e70]:
          - generic [ref=e71]:
            - generic [ref=e72]: Keep the next thing visible
            - heading "All tasks" [level=1] [ref=e73]
            - paragraph [ref=e74]: 5 pieces of work across 2 projects.
          - button "New task" [ref=e75] [cursor=pointer]
        - generic [ref=e77]:
          - textbox "Search tasks" [active] [ref=e82]:
            - /placeholder: Search tasks or projects
            - text: ALPHA
          - combobox "Filter by status" [ref=e83]:
            - option "All statuses" [selected]
            - option "To do"
            - option "In progress"
            - option "Done"
          - combobox "Filter by priority" [ref=e84]:
            - option "All priorities" [selected]
            - option "Low"
            - option "Medium"
            - option "High"
            - option "Urgent"
          - combobox "Filter by project" [ref=e85]:
            - option "All projects" [selected]
            - option "No project"
            - option "Source project"
            - option "Destination project"
          - combobox "Sort tasks" [ref=e86]:
            - option "Recently updated" [selected]
            - option "Due date"
            - option "Priority"
        - generic [ref=e87]:
          - generic [ref=e88]:
            - generic [ref=e89]: Tasks
            - generic [ref=e90]: 1 results
          - generic [ref=e91]:
            - button "Mark task done" [ref=e92] [cursor=pointer]
            - button "Alpha capture Source project · Due Oct 21 Overdue" [ref=e93] [cursor=pointer]:
              - generic [ref=e94]: Alpha capture
              - generic [ref=e96]:
                - text: Source project · Due Oct 21
                - generic [ref=e97]: Overdue
            - generic [ref=e98]: To do
            - generic [ref=e101]: High
  - region "Notifications (F8)":
    - list
```

# Test source

```ts
  1  | import { test, expect } from './test';
  2  | import { type Task } from '../../apps/web/src/workspace/types';
  3  | import { seedWorkspace, navigate } from './workspace';
  4  | 
  5  | const task = (id: string, title: string, changes: Partial<Task>): Task => ({
  6  |   id, title, description: '', projectId: '', status: 'todo', priority: 'medium',
  7  |   createdAt: '2026-10-20', updatedAt: '2026-10-20', ...changes,
  8  | });
  9  | async function seedDiscovery(page: Parameters<typeof seedWorkspace>[0]) {
  10 |   await seedWorkspace(page, { tasks: [
  11 |     task('alpha', 'Alpha capture', { projectId: 'source', description: 'Needle in context', priority: 'high', dueDate: '2026-10-21' }),
  12 |     task('beta', 'Beta capture', { projectId: 'source', priority: 'urgent', dueDate: '2026-10-25', updatedAt: '2026-10-23' }),
  13 |     task('gamma', 'Gamma review', { projectId: 'destination', status: 'in-progress', dueDate: '2026-10-25', updatedAt: '2026-10-22' }),
  14 |     task('delta', 'Delta standalone', { priority: 'low', updatedAt: '2026-10-21' }),
  15 |     task('epsilon', 'Epsilon done', { status: 'done', priority: 'urgent', dueDate: '', updatedAt: '2026-10-23' }),
  16 |   ] });
  17 | }
  18 | 
  19 | test('search identifies title, description and project matches with combined filters and recovery', async ({ page }) => {
  20 |   await seedDiscovery(page);
  21 |   await page.goto('/tasks');
  22 |   const titles = page.getByTestId(/^button-open-task-/);
  23 |   await page.getByTestId('input-task-search').fill('ALPHA');
> 24 |   await expect(titles).toHaveText(['Alpha capture']);
     |                        ^ Error: expect(locator).toHaveText(expected) failed
  25 |   await page.getByTestId('input-task-search').fill('needle');
  26 |   await expect(titles).toHaveText(['Alpha capture']);
  27 |   await page.getByTestId('input-task-search').fill('SOURCE PROJECT');
  28 |   await expect(titles).toHaveText(['Beta capture', 'Alpha capture']);
  29 |   await page.getByTestId('filter-task-status').selectOption('todo');
  30 |   await page.getByTestId('filter-task-priority').selectOption('urgent');
  31 |   await page.getByTestId('filter-task-project').selectOption('source');
  32 |   await expect(titles).toHaveText(['Beta capture']);
  33 |   await page.getByTestId('filter-task-project').selectOption('');
  34 |   await expect(titles).toHaveCount(0);
  35 |   await expect(page.getByText('No tasks match those filters', { exact: true })).toBeVisible();
  36 |   await page.getByTestId('input-task-search').fill('');
  37 |   await page.getByTestId('filter-task-status').selectOption('all');
  38 |   await page.getByTestId('filter-task-priority').selectOption('all');
  39 |   await expect(titles).toHaveText(['Epsilon done', 'Delta standalone']);
  40 |   await page.getByTestId('filter-task-project').selectOption('all');
  41 |   await expect(titles).toHaveCount(5);
  42 |   await expect(page.getByTestId('task-row-alpha')).toContainText('Source project');
  43 |   await expect(page.getByTestId('task-row-gamma')).toContainText('Destination project');
  44 | });
  45 | 
  46 | test('sorts order every result, keep undated work last and respect meaningful recency groups', async ({ page }) => {
  47 |   await seedDiscovery(page);
  48 |   await page.goto('/tasks');
  49 |   const titles = page.getByTestId(/^button-open-task-/);
  50 |   await page.getByTestId('sort-tasks').selectOption('priority');
  51 |   await expect(titles).toHaveText(['Beta capture', 'Epsilon done', 'Alpha capture', 'Gamma review', 'Delta standalone']);
  52 |   await page.getByTestId('sort-tasks').selectOption('due');
  53 |   await expect(titles).toHaveText(['Alpha capture', 'Beta capture', 'Gamma review', 'Delta standalone', 'Epsilon done']);
  54 |   await page.getByTestId('sort-tasks').selectOption('updated');
  55 |   // Date-only recency cannot order edits within the same day. Check the tied group as a set.
  56 |   await expect(titles).toHaveCount(5);
  57 |   expect((await titles.allTextContents()).slice(0, 2).sort()).toEqual(['Beta capture', 'Epsilon done']);
  58 |   await expect(titles.nth(2)).toHaveText('Gamma review');
  59 |   await expect(titles.nth(3)).toHaveText('Delta standalone');
  60 |   await expect(titles.nth(4)).toHaveText('Alpha capture');
  61 | });
  62 | 
  63 | test('in-app navigation retains shell search and resets page filters and sorting on remount', async ({ page }) => {
  64 |   await seedDiscovery(page);
  65 |   await page.goto('/tasks');
  66 |   await page.getByTestId('input-task-search').fill('capture');
  67 |   await page.getByTestId('filter-task-status').selectOption('todo');
  68 |   await page.getByTestId('filter-task-priority').selectOption('urgent');
  69 |   await page.getByTestId('filter-task-project').selectOption('source');
  70 |   await page.getByTestId('sort-tasks').selectOption('due');
  71 |   await expect(page.getByTestId(/^button-open-task-/)).toHaveText(['Beta capture']);
  72 |   await navigate(page, 'projects');
  73 |   await navigate(page, 'tasks');
  74 |   await expect(page.getByTestId('input-task-search')).toHaveValue('capture');
  75 |   for (const id of ['filter-task-status', 'filter-task-priority', 'filter-task-project']) await expect(page.getByTestId(id)).toHaveValue('all');
  76 |   await expect(page.getByTestId('sort-tasks')).toHaveValue('updated');
  77 |   await expect(page.getByTestId(/^button-open-task-/)).toHaveText(['Beta capture', 'Alpha capture']);
  78 |   await page.reload();
  79 |   await expect(page.getByTestId('input-task-search')).toHaveValue('');
  80 |   await expect(page.getByTestId(/^task-row-/)).toHaveCount(5);
  81 | });
  82 | 
```