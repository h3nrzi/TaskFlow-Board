import { readFile } from 'node:fs/promises';
import { test, expect, type Page } from '@playwright/test';

const key = 'taskflow-store-v1';
async function saved(page: Page) {
  return page.evaluate(key => JSON.parse(localStorage.getItem(key)!), key);
}
async function seed(page: Page, raw: string) {
  await page.addInitScript(({ key, raw }) => localStorage.setItem(key, raw), { key, raw });
}

test('invalid saved data is preserved with a recovery message', async ({ page }) => {
  await seed(page, '{broken workspace');
  await page.goto('/');
  await expect(page.getByRole('alert')).toContainText(/saved workspace|saved data/i);
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe('{broken workspace');
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download saved data', exact: true }).click();
  const download = await downloadEvent;
  expect(await readFile((await download.path())!, 'utf8')).toBe('{broken workspace');
});

test('valid JSON with invalid workspace shape does not crash or overwrite', async ({ page }) => {
  const raw = JSON.stringify({ projects: [], tasks: [{ id: 'important' }], profile: null });
  await seed(page, raw);
  await page.goto('/tasks');
  await expect(page.getByRole('alert')).toContainText(/saved workspace|saved data/i);
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

test('storage write failure leaves the UI usable and reports unsaved changes', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => { throw new DOMException('Quota exceeded', 'QuotaExceededError'); };
  });
  await page.goto('/tasks');
  await expect(page.getByTestId('button-create-task')).toBeVisible();
  await expect(page.getByRole('alert')).toContainText(/not saved|could not save|unable to save/i);
  await page.getByTestId('button-create-task').click();
  await page.getByTestId('input-task-title').fill('Still usable');
  await page.getByTestId('button-save-task').click();
  await expect(page.getByText('Still usable', { exact: true })).toBeVisible();
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download current workspace', exact: true }).click();
  const download = await downloadEvent;
  const exported = JSON.parse(await readFile((await download.path())!, 'utf8'));
  expect(exported.tasks.some(t => t.title === 'Still usable')).toBe(true);
});

test('stale tab cannot overwrite another tab’s saved changes', async ({ page, context }) => {
  await page.goto('/tasks');
  const other = await context.newPage();
  await other.goto('/tasks');
  await page.getByTestId('button-create-task').click();
  await page.getByTestId('input-task-title').fill('Keep first tab task');
  await page.getByTestId('button-save-task').click();
  await expect.poll(async () => (await saved(page)).tasks.some(t => t.title === 'Keep first tab task')).toBe(true);
  await other.getByTestId('button-create-task').click();
  await other.getByTestId('input-task-title').fill('Second tab task');
  await other.getByTestId('button-save-task').click();
  expect((await saved(page)).tasks.some(t => t.title === 'Keep first tab task')).toBe(true);
  await expect(other.getByRole('alert')).toContainText(/another tab|elsewhere/i);
});

for (const suffix of ['', '/']) {
  test(`new task on a project board belongs to that project (path suffix: ${suffix || 'none'})`, async ({ page }) => {
    await page.goto(`/projects/field-notes${suffix}`);
    await page.getByTestId('button-add-task-project').click();
    await expect(page.getByTestId('input-task-project')).toHaveValue('field-notes');
    await page.getByTestId('input-task-title').fill('Board-specific task');
    await page.getByTestId('button-save-task').click();
    await expect(page.getByText('Board-specific task', { exact: true })).toBeVisible();
    await expect(page.getByTestId('workspace-save-state')).toHaveText('All changes saved locally');
    await expect.poll(async () => (await saved(page)).tasks.find(t => t.title === 'Board-specific task')?.projectId).toBe('field-notes');
    await page.reload();
    await expect(page.getByText('Board-specific task', { exact: true })).toBeVisible();
  });
}

test('board task entry points follow navigation and keep explicit project choices', async ({ page }) => {
  await page.goto('/projects');
  for (const [projectId, projectName] of [['field-notes', 'Field Notes'], ['launch-plan', 'Spring launch']]) {
    await page.getByTestId(`card-project-${projectId}`).getByRole('link', { name: projectName, exact: true }).click();
    await expect(page.getByRole('heading', { name: projectName, exact: true })).toBeVisible();
    for (const trigger of ['button-add-task-project', 'button-add-task-column', 'button-quick-add']) {
      if (await page.getByTestId(trigger).isVisible()) {
        await page.getByTestId(trigger).click();
        await expect(page.getByTestId('input-task-project')).toHaveValue(projectId);
        await expect(page.getByTestId('input-task-project').locator('option:checked')).toHaveText(projectName);
        // A cancelled choice must not leak into the next form or board.
        await page.getByTestId('input-task-project').selectOption('studio-site');
        await page.getByTestId('button-cancel-task').click();
      }
    }
    await page.getByTestId('button-add-task-project').click();
    const title = `Explicit assignment from ${projectId}`;
    await page.getByTestId('input-task-title').fill(title);
    await page.getByTestId('input-task-project').selectOption('studio-site');
    await page.getByTestId('button-save-task').click();
    await expect.poll(async () => (await saved(page)).tasks.find(t => t.title === title)?.projectId).toBe('studio-site');
    await page.goBack();
    await expect(page.getByRole('heading', { name: 'Projects', exact: true })).toBeVisible();
  }
});

test('task modal contains keyboard focus, closes with Escape, and restores focus', async ({ page }) => {
  await page.goto('/tasks');
  const trigger = page.getByTestId('button-create-task');
  await trigger.focus();
  await trigger.press('Enter');
  const form = page.getByTestId('form-task');
  await expect(page.getByTestId('input-task-title')).toBeFocused();
  await page.getByTestId('button-save-task').focus();
  await page.keyboard.press('Tab');
  expect(await form.evaluate(el => el.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(form).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('switching login to signup starts an empty signup form', async ({ page }) => {
  await page.goto('/login');
  await page.getByTestId('link-auth-signup').click();
  await expect(page.getByTestId('input-signup-name')).toHaveValue('');
  await expect(page.getByTestId('input-signup-email')).toHaveValue('');
});

test('local calendar dates are used near midnight', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-10-22T21:30:00Z') });
  await page.goto('/tasks');
  await page.getByTestId('button-create-task').click();
  await page.getByTestId('input-task-title').fill('Calendar date task');
  await page.getByTestId('button-save-task').click();
  const localDate = await page.evaluate(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });
  await expect.poll(async () => (await saved(page)).tasks.find(t => t.title === 'Calendar date task')?.createdAt).toBe(localDate);
});


test('project and board task titles can be opened with the keyboard', async ({ page }) => {
  await page.goto('/projects');
  const project = page.getByTestId('card-project-field-notes').getByRole('link', { name: 'Field Notes', exact: true });
  await expect(project).toBeVisible();
  await project.focus();
  await project.press('Enter');
  await expect(page.getByTestId('board-project')).toBeVisible();
  const task = page.getByRole('button', { name: 'Map the onboarding journey', exact: true });
  await task.focus();
  await task.press('Enter');
  await expect(page.getByTestId('drawer-task-details')).toContainText('Map the onboarding journey');
});

test('task without a project stays unassigned when editing', async ({ page }) => {
  await seed(page, JSON.stringify({ projects: [], tasks: [], profile: { name: 'Tester', email: 'test@example.com', avatar: 'T' }, theme: 'light' }));
  await page.goto('/tasks');
  await page.getByTestId('button-create-task').click();
  await page.getByTestId('input-task-title').fill('Unassigned task');
  await page.getByTestId('button-save-task').click();
  await page.getByText('Unassigned task', { exact: true }).click();
  await expect(page.getByTestId('select-drawer-task-project')).toHaveValue('');
  await expect(page.getByTestId('select-drawer-task-project')).toContainText('No project');
});

test('missing cross-tab locking never permits unsafe writes', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'locks', { value: undefined }));
  await page.goto('/tasks');
  await expect(page.getByRole('alert')).toContainText(/not saved/i);
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBeNull();
});

test('unsaved return to the initial theme still warns before reload', async ({ page }, info) => {
  // Mobile engines do not reliably deliver beforeunload prompts; the persistent
  // unsaved warning and export remain the recovery path on those platforms.
  test.skip(info.project.name.endsWith('mobile'), 'beforeunload is a desktop safeguard');
  await page.goto('/settings');
  await page.getByTestId('button-theme-dark').click();
  await expect(page.getByTestId('workspace-save-state')).toHaveText('All changes saved locally');
  await page.evaluate(() => { Storage.prototype.setItem = () => { throw new DOMException('Quota exceeded', 'QuotaExceededError'); }; });
  await page.getByTestId('button-theme-light').click();
  await expect(page.getByRole('alert')).toContainText('not saved');
  const dialog = page.waitForEvent('dialog', { timeout: 5000 });
  const reload = page.reload({ timeout: 2000 }).catch(() => null);
  const prompt = await dialog;
  expect(prompt.type()).toBe('beforeunload');
  await prompt.dismiss();
  await reload;
  await expect(page.locator('html')).not.toHaveClass(/dark/);
});


test('unavailable reads preserve existing storage and allow an unsaved session', async ({ page }) => {
  const raw = JSON.stringify({ projects: [], tasks: [], profile: { name: 'Original', email: 'original@example.com', avatar: 'O' }, theme: 'dark' });
  await page.addInitScript(({ key, raw }) => {
    localStorage.setItem(key, raw);
    const get = Storage.prototype.getItem;
    Object.defineProperty(window, 'readOriginalStore', { value: () => get.call(localStorage, key) });
    Storage.prototype.getItem = () => { throw new DOMException('Denied', 'SecurityError'); };
  }, { key, raw });
  await page.goto('/tasks');
  await expect(page.getByRole('alert')).toContainText('not saved');
  await page.getByTestId('button-create-task').click();
  await page.getByTestId('input-task-title').fill('Read failure work');
  await page.getByTestId('button-save-task').click();
  await expect(page.getByText('Read failure work', { exact: true })).toBeVisible();
  expect(await page.evaluate(() => Reflect.get(window, 'readOriginalStore')())).toBe(raw);
});

test('editing an unassigned task with existing projects keeps it unassigned', async ({ page }) => {
  await seed(page, JSON.stringify({
    projects: [{ id: 'project-one', name: 'Existing project', description: '', color: '#558b73', icon: 'E', createdAt: '2026-10-20' }],
    tasks: [{ id: 'unassigned', title: 'Unassigned existing task', description: '', projectId: '', status: 'todo', priority: 'medium', createdAt: '2026-10-20', updatedAt: '2026-10-20' }],
    profile: { name: 'Tester', email: 'test@example.com', avatar: 'T' }, theme: 'light',
  }));
  await page.goto('/tasks');
  await page.getByText('Unassigned existing task', { exact: true }).click();
  await page.getByTestId('button-edit-task').click();
  await expect(page.getByTestId('input-task-project')).toHaveValue('');
  await page.getByTestId('input-task-title').fill('Still unassigned');
  await page.getByTestId('button-save-task').click();
  await expect(page.getByTestId('workspace-save-state')).toHaveText('All changes saved locally');
  expect((await saved(page)).tasks[0].projectId).toBe('');
});


test('nested edit and delete dialogs close one layer and restore keyboard focus', async ({ page }) => {
  await page.goto('/tasks');
  const opener = page.getByTestId('button-open-task-task-1');
  await opener.focus();
  await opener.press('Enter');
  const edit = page.getByTestId('button-edit-task');
  await edit.focus();
  await edit.press('Enter');
  await expect(page.getByTestId('input-task-title')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('form-task')).toBeHidden();
  await expect(edit).toBeFocused();
  const remove = page.getByTestId('button-delete-task');
  await remove.focus();
  await remove.press('Enter');
  await expect(page.getByTestId('button-cancel-delete')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByTestId('button-confirm-delete')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('alertdialog')).toBeHidden();
  await expect(remove).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('drawer-task-details')).toBeHidden();
  await expect(opener).toBeFocused();
});
