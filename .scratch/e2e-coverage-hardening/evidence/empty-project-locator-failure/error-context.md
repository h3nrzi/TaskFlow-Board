# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: empty-workspace.spec.ts >> empty Dashboard captures standalone work and first project leads to board capture
- Location: tests/frontend/empty-workspace.spec.ts:4:5

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Create project', exact: true }) resolved to 2 elements:
    1) <button class="icon-button" aria-label="Create project" data-testid="button-create-project-nav">…</button> aka getByTestId('button-create-project-nav')
    2) <button class="button">Create project</button> aka getByText('Create project')

Call log:
  - waiting for getByRole('button', { name: 'Create project', exact: true })

```

# Page snapshot

```yaml
- generic [ref=f1e2]:
  - generic [ref=f1e3]:
    - complementary [ref=f1e4]:
      - link "taskflow" [ref=f1e5] [cursor=pointer]:
        - /url: /
      - generic [ref=f1e10]: Workspace
      - generic [ref=f1e11]:
        - link "Overview" [ref=f1e12] [cursor=pointer]:
          - /url: /
        - link "Projects" [ref=f1e18] [cursor=pointer]:
          - /url: /projects
        - link "Tasks" [ref=f1e21] [cursor=pointer]:
          - /url: /tasks
        - link "Settings" [ref=f1e25] [cursor=pointer]:
          - /url: /settings
      - generic [ref=f1e29]:
        - text: Your projects
        - button "Create project" [ref=f1e30] [cursor=pointer]
      - generic [ref=f1e39]:
        - generic [ref=f1e40]: A little progress
        - generic [ref=f1e41]: adds up every day.
      - generic [ref=f1e42]:
        - generic [ref=f1e43]: AU
        - generic [ref=f1e44]:
          - generic [ref=f1e45]: Audit User
          - generic [ref=f1e46]: audit@example.com
        - button "Toggle theme" [ref=f1e47] [cursor=pointer]
    - main [ref=f1e50]:
      - status [ref=f1e51]: All changes saved locally
      - generic [ref=f1e52]:
        - generic [ref=f1e53]: Your workspace
        - generic [ref=f1e55]:
          - button "New task" [ref=f1e56] [cursor=pointer]
          - button "Switch to dark theme" [ref=f1e58] [cursor=pointer]
          - link "Open profile settings" [ref=f1e61] [cursor=pointer]:
            - /url: /settings
            - text: AU
      - generic [ref=f1e62]:
        - generic [ref=f1e63]:
          - generic [ref=f1e64]:
            - generic [ref=f1e65]: A good day to make progress
            - heading "Welcome back, Audit." [level=1] [ref=f1e66]
            - paragraph [ref=f1e67]: Here’s the shape of your work right now.
          - button "Add a task" [ref=f1e68] [cursor=pointer]
        - generic [ref=f1e70]:
          - generic [ref=f1e71]:
            - generic [ref=f1e72]: Open tasks
            - generic [ref=f1e78]: "1"
            - generic [ref=f1e79]: across your projects
          - generic [ref=f1e80]:
            - generic [ref=f1e81]: In progress
            - generic [ref=f1e86]: "0"
            - generic [ref=f1e87]: moving forward today
          - generic [ref=f1e88]:
            - generic [ref=f1e89]: Completed
            - generic [ref=f1e95]: "0"
            - generic [ref=f1e96]: tasks finished
          - generic [ref=f1e97]:
            - generic [ref=f1e98]: Overall progress
            - generic [ref=f1e103]: 0%
        - generic [ref=f1e105]:
          - generic [ref=f1e106]:
            - generic [ref=f1e107]:
              - generic [ref=f1e108]:
                - generic [ref=f1e109]: Your projects
                - generic [ref=f1e110]: A quick pulse on what’s moving
              - link "All projects" [ref=f1e111] [cursor=pointer]:
                - /url: /projects
            - generic [ref=f1e114]:
              - generic [ref=f1e119]: Start with a project
              - paragraph [ref=f1e120]: Give your work a home, then add the first task.
              - button "Create project" [ref=f1e121] [cursor=pointer]
          - generic [ref=f1e122]:
            - generic [ref=f1e124]:
              - generic [ref=f1e125]: Coming up
              - generic [ref=f1e126]: Deadlines on your horizon
            - generic [ref=f1e129]:
              - generic [ref=f1e134]: Clear skies ahead
              - paragraph [ref=f1e135]: No upcoming deadlines. Add dates to keep the important work in view.
        - generic [ref=f1e136]:
          - generic [ref=f1e137]:
            - generic [ref=f1e138]:
              - generic [ref=f1e139]: Recently touched
              - generic [ref=f1e140]: The work you’ve been moving
            - link "View all tasks" [ref=f1e141] [cursor=pointer]:
              - /url: /tasks
          - generic [ref=f1e144]:
            - button "Mark task done" [ref=f1e145] [cursor=pointer]
            - button "Empty workspace capture No project" [ref=f1e146] [cursor=pointer]:
              - generic [ref=f1e147]: Empty workspace capture
              - generic [ref=f1e149]: No project
            - generic [ref=f1e150]: To do
            - generic [ref=f1e153]: Medium
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
  9  |   await page.locator('section').filter({ has: page.getByText('Nothing on the board yet', { exact: true }) }).getByRole('button', { name: 'Add a task', exact: true }).click();
  10 |   await expect(page.getByTestId('input-task-project')).toHaveValue('');
  11 |   await page.getByTestId('input-task-title').fill('Empty workspace capture');
  12 |   await page.getByTestId('button-save-task').click();
  13 |   await waitForSaved(page);
  14 |   await page.reload();
  15 |   await expect(page.getByTestId(/^task-row-/)).toContainText('Empty workspace capture');
  16 |   await expect(page.getByTestId(/^task-row-/)).toContainText('No project');
> 17 |   await page.getByRole('button', { name: 'Create project', exact: true }).click();
     |                                                                           ^ Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Create project', exact: true }) resolved to 2 elements:
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