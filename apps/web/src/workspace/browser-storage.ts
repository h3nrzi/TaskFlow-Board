import { demoStore } from './fixtures';
import { isStore } from './validation';
import type { Store } from './types';

export const STORE_KEY = 'taskflow-store-v1';

export type LoadedWorkspace = {
  store: Store;
  raw: string | null;
  problem: 'invalid' | 'read' | null;
};

export function readWorkspace(): LoadedWorkspace {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORE_KEY);
    if (raw !== null) {
      const value: unknown = JSON.parse(raw);
      if (!isStore(value)) return { store: demoStore(), raw, problem: 'invalid' };
      return { store: { ...value, theme: value.theme || 'light' }, raw, problem: null };
    }
  } catch {
    return { store: demoStore(), raw, problem: raw === null ? 'read' : 'invalid' };
  }
  return { store: demoStore(), raw, problem: null };
}

export function downloadWorkspace(raw: string) {
  const url = URL.createObjectURL(new Blob([raw], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'taskflow-workspace.json';
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
