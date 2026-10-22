import { test, expect } from '@playwright/test';

const overlays = [
  { name: 'task form', path: '/tasks', opener: 'button-create-task', role: 'dialog', label: 'New task', initial: 'input-task-title', first: 'button-close-task-form', last: 'button-save-task' },
  { name: 'project form', path: '/projects', opener: 'button-create-project', role: 'dialog', label: 'New project', initial: 'input-project-name', first: 'button-close-project-form', last: 'button-save-project' },
  { name: 'task drawer', path: '/tasks', opener: 'button-open-task-task-1', role: 'dialog', label: 'Task details', initial: 'button-close-task-drawer', first: 'button-close-task-drawer', last: 'button-delete-task' },
  { name: 'confirmation', path: '/tasks', opener: 'button-delete-task', role: 'alertdialog', label: 'Delete this task?', initial: 'button-cancel-delete', first: 'button-cancel-delete', last: 'button-confirm-delete' },
] as const;

for (const overlay of overlays) {
  test(`${overlay.name} preserves focus, inside interaction and backdrop cancellation`, async ({ page }, info) => {
    await page.goto(overlay.path);
    if (overlay.name === 'confirmation') {
      const task = page.getByTestId('button-open-task-task-1');
      await task.focus();
      await task.press('Enter');
    }
    const opener = page.getByTestId(overlay.opener);
    await opener.focus();
    await opener.press('Enter');
    const dialog = page.getByRole(overlay.role, { name: overlay.label, exact: true });
    await expect(dialog).toBeVisible();
    await expect(page.getByTestId(overlay.initial)).toBeFocused();
    await page.getByTestId(overlay.last).focus();
    await page.keyboard.press('Tab');
    await expect(page.getByTestId(overlay.first)).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(page.getByTestId(overlay.last)).toBeFocused();
    await opener.focus();
    expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);

    // Capture presentation without coupling assertions to a library's DOM structure.
    await dialog.evaluate(el => Promise.all(el.getAnimations().map(animation => animation.finished)));
    await info.attach('presentation', { body: JSON.stringify(await dialog.evaluate(el => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return { x: rect.x, y: rect.y, width: rect.width, height: rect.height,
        background: style.backgroundColor, border: style.border, radius: style.borderRadius,
        padding: style.padding, shadow: style.boxShadow, overflow: style.overflow,
        animation: style.animation, bodyOverflow: getComputedStyle(document.body).overflow };
    }), null, 2), contentType: 'application/json' });
    if (info.project.name.startsWith('chromium-')) {
      await info.attach('overlay', { body: await page.screenshot({ animations: 'disabled', timeout: 5000 }), contentType: 'image/png' });
    }

    const heading = await dialog.getByRole('heading').first().boundingBox();
    if (!heading) throw new Error('Overlay heading is not visible');
    // Releasing outside after pressing inside must not cancel a draft.
    await page.mouse.move(heading.x + heading.width / 2, heading.y + heading.height / 2);
    await page.mouse.down();
    await page.mouse.move(2, 2);
    await page.mouse.up();
    await expect(dialog).toBeVisible();

    // A full-width mobile drawer has no exposed backdrop to press.
    const bounds = await dialog.boundingBox();
    const viewport = page.viewportSize();
    const hasBackdrop = bounds && viewport && (bounds.x > 2 || bounds.y > 2);
    if (hasBackdrop) {
      for (const button of ['left', 'right'] as const) {
        // Cancellation happens on mouse-down, before mouse-up.
        await page.mouse.move(2, 2);
        await page.mouse.down({ button });
        await expect(dialog).toBeHidden();
        await page.mouse.up({ button });
        // Native pointer defaults can subsequently move focus. Check keyboard
        // restoration separately, without imposing a new backdrop contract.
        await opener.focus();
        await opener.press('Enter');
        await expect(dialog).toBeVisible();
      }
    }
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(opener).toBeFocused();
    if (overlay.name === 'confirmation') {
      await expect(page.getByTestId('drawer-task-details')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByTestId('drawer-task-details')).toBeHidden();
      await expect(page.getByTestId('button-open-task-task-1')).toBeFocused();
    }
  });
}
