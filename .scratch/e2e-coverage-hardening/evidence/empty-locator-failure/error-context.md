# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: empty-workspace.spec.ts >> empty Dashboard captures standalone work and first project leads to board capture
- Location: tests/frontend/empty-workspace.spec.ts:4:5

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Add a task', exact: true }) resolved to 2 elements:
    1) <button class="button button-primary" data-testid="button-add-task-dashboard">…</button> aka getByTestId('button-add-task-dashboard')
    2) <button class="button">Add a task</button> aka locator('button').filter({ hasText: /^Add a task$/ })

Call log:
  - waiting for getByRole('button', { name: 'Add a task', exact: true })

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
      - generic [ref=e39]:
        - generic [ref=e40]: A little progress
        - generic [ref=e41]: adds up every day.
      - generic [ref=e42]:
        - generic [ref=e43]: AU
        - generic [ref=e44]:
          - generic [ref=e45]: Audit User
          - generic [ref=e46]: audit@example.com
        - button "Toggle theme" [ref=e47] [cursor=pointer]
    - main [ref=e50]:
      - status [ref=e51]: All changes saved locally
      - generic [ref=e52]:
        - generic [ref=e53]: Your workspace
        - generic [ref=e55]:
          - button "New task" [ref=e56] [cursor=pointer]
          - button "Switch to dark theme" [ref=e58] [cursor=pointer]
          - link "Open profile settings" [ref=e61] [cursor=pointer]:
            - /url: /settings
            - text: AU
      - generic [ref=e62]:
        - generic [ref=e63]:
          - generic [ref=e64]:
            - generic [ref=e65]: A good day to make progress
            - heading "Welcome back, Audit." [level=1] [ref=e66]
            - paragraph [ref=e67]: Here’s the shape of your work right now.
          - button "Add a task" [ref=e68] [cursor=pointer]
        - generic [ref=e70]:
          - generic [ref=e71]:
            - generic [ref=e72]: Open tasks
            - generic [ref=e78]: "0"
            - generic [ref=e79]: across your projects
          - generic [ref=e80]:
            - generic [ref=e81]: In progress
            - generic [ref=e86]: "0"
            - generic [ref=e87]: moving forward today
          - generic [ref=e88]:
            - generic [ref=e89]: Completed
            - generic [ref=e95]: "0"
            - generic [ref=e96]: tasks finished
          - generic [ref=e97]:
            - generic [ref=e98]: Overall progress
            - generic [ref=e103]: 0%
        - generic [ref=e105]:
          - generic [ref=e106]:
            - generic [ref=e107]:
              - generic [ref=e108]:
                - generic [ref=e109]: Your projects
                - generic [ref=e110]: A quick pulse on what’s moving
              - link "All projects" [ref=e111] [cursor=pointer]:
                - /url: /projects
            - generic [ref=e114]:
              - generic [ref=e119]: Start with a project
              - paragraph [ref=e120]: Give your work a home, then add the first task.
              - button "Create project" [ref=e121] [cursor=pointer]
          - generic [ref=e122]:
            - generic [ref=e124]:
              - generic [ref=e125]: Coming up
              - generic [ref=e126]: Deadlines on your horizon
            - generic [ref=e129]:
              - generic [ref=e134]: Clear skies ahead
              - paragraph [ref=e135]: No upcoming deadlines. Add dates to keep the important work in view.
        - generic [ref=e136]:
          - generic [ref=e137]:
            - generic [ref=e138]:
              - generic [ref=e139]: Recently touched
              - generic [ref=e140]: The work you’ve been moving
            - link "View all tasks" [ref=e141] [cursor=pointer]:
              - /url: /tasks
          - generic [ref=e144]:
            - generic [ref=e149]: Nothing on the board yet
            - paragraph [ref=e150]: Create a task and make the first move.
            - button "Add a task" [ref=e151] [cursor=pointer]
  - region "Notifications (F8)":
    - list
```

# Test source

```ts
  1  | import { test, expect } from './test';
  2  | import { seedWorkspace, waitForSaved, navigate } from './workspace';
  3  | 
  4  | test('empty Dashboard captures standalone work and first project leads to board capture', async ({ page }) => {
  5  |   await seedWorkspace(page, { projects: [] });
  6  |   await page.goto('/');
  7  |   await expect(page.getByText('Nothing on the board yet', { exact: true })).toBeVisible();
  8  |   await expect(page.getByText('Start with a project', { exact: true })).toBeVisible();
> 9  |   await page.getByRole('button', { name: 'Add a task', exact: true }).click();
     |                                                                       ^ Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Add a task', exact: true }) resolved to 2 elements:
  10 |   await expect(page.getByTestId('input-task-project')).toHaveValue('');
  11 |   await page.getByTestId('input-task-title').fill('Empty workspace capture');
  12 |   await page.getByTestId('button-save-task').click();
  13 |   await waitForSaved(page);
  14 |   await page.reload();
  15 |   await expect(page.getByTestId(/^task-row-/)).toContainText('Empty workspace capture');
  16 |   await expect(page.getByTestId(/^task-row-/)).toContainText('No project');
  17 |   await page.getByRole('button', { name: 'Create project', exact: true }).click();
  18 |   await expect(page).toHaveURL(/\/projects$/);
  19 |   await page.getByRole('button', { name: 'Create your first project', exact: true }).click();
  20 |   await page.getByTestId('input-project-name').fill('First project');
  21 |   await page.getByTestId('button-save-project').click();
  22 |   await expect(page.getByTestId('column-todo')).toContainText('Drop a task here');
  23 |   await page.getByTestId('button-add-task-column').click();
  24 |   await expect(page.getByTestId('input-task-project').locator('option:checked')).toHaveText('First project');
  25 |   await page.getByTestId('input-task-title').fill('First board capture');
  26 |   await page.getByTestId('button-save-task').click();
  27 |   await expect(page.getByTestId('column-todo')).toContainText('First board capture');
  28 |   await waitForSaved(page);
  29 |   await page.reload();
  30 |   await expect(page.getByTestId(/^board-task-/)).toContainText('First board capture');
  31 |   await navigate(page, 'tasks');
  32 |   await expect(page.getByTestId(/^task-row-/)).toHaveCount(2);
  33 |   await expect(page.getByTestId(/^task-row-/).filter({ hasText: 'Empty workspace capture' })).toContainText('No project');
  34 | });
  35 | 
  36 | test('empty Tasks action creates usable standalone work without a project', async ({ page }) => {
  37 |   await seedWorkspace(page, { projects: [] });
  38 |   await page.goto('/tasks');
  39 |   await expect(page.getByText('Your task list is a blank page', { exact: true })).toBeVisible();
  40 |   await page.getByRole('button', { name: 'Create a task', exact: true }).click();
  41 |   await expect(page.getByTestId('input-task-project')).toHaveValue('');
  42 |   await page.getByTestId('input-task-title').fill('First list capture');
  43 |   await page.getByTestId('button-save-task').click();
  44 |   await waitForSaved(page);
  45 |   await page.reload();
  46 |   await expect(page.getByTestId(/^task-row-/)).toHaveCount(1);
  47 |   await page.getByText('First list capture', { exact: true }).click();
  48 |   await expect(page.getByTestId('select-drawer-task-project')).toHaveValue('');
  49 | });
  50 | 
```