import { type Page, expect } from './test';
import { type Store } from '../../apps/web/src/workspace/types';

// Storage is only the starting fixture. Never replace UI-created changes on reload.
export async function seedWorkspace(page: Page, changes: Partial<Store> = {}) {
  const store: Store = {
    projects: [
      { id: 'source', name: 'Source project', description: 'Source work', color: '#558b73', icon: 'S', createdAt: '2026-10-20' },
      { id: 'destination', name: 'Destination project', description: 'Destination work', color: '#6d83a9', icon: 'D', createdAt: '2026-10-20' },
    ],
    tasks: [],
    profile: { name: 'Audit User', email: 'audit@example.com', avatar: 'AU' },
    theme: 'light',
    ...changes,
  };
  await page.addInitScript(store => {
    if (!localStorage.getItem('taskflow-store-v1')) localStorage.setItem('taskflow-store-v1', JSON.stringify(store));
  }, store);
}

export async function waitForSaved(page: Page) {
  await expect(page.getByTestId('workspace-save-state')).toHaveText('All changes saved locally');
}

export async function navigate(page: Page, section: 'overview' | 'projects' | 'tasks' | 'settings') {
  if (page.viewportSize()!.width <= 680) {
    await page.getByTestId('button-mobile-menu').click();
    await page.locator('.mobile-menu-panel').getByTestId(`nav-${section}`).click();
  } else {
    await page.getByTestId(`nav-${section}`).click();
  }
}
