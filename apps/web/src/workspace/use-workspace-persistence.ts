import { useEffect, useRef, useState } from 'react';
import type { Store } from './types';
import { downloadWorkspace, STORE_KEY, type LoadedWorkspace } from './browser-storage';

// The initial snapshot and saved bytes belong to this mounted workspace session.
export function useWorkspacePersistence(store: Store, loaded: LoadedWorkspace) {
  const savedRaw = useRef(loaded.raw);
  const latestStore = useRef(store);
  latestStore.current = store;
  const [persistedRaw, setPersistedRaw] = useState(loaded.raw);
  const [storageProblem, setStorageProblem] = useState<'invalid' | 'read' | 'write' | 'conflict' | null>(loaded.problem);

  useEffect(() => {
    if (loaded.problem) return;
    let cancelled = false;
    const persist = () => {
      try {
        // Compare inside a cross-tab lock so a stale workspace never replaces newer data.
        if (localStorage.getItem(STORE_KEY) !== savedRaw.current) {
          if (!cancelled) setStorageProblem('conflict');
          return;
        }
        const raw = JSON.stringify(latestStore.current);
        if (raw !== savedRaw.current) localStorage.setItem(STORE_KEY, raw);
        savedRaw.current = raw;
        if (!cancelled) {
          setPersistedRaw(raw);
          setStorageProblem(null);
        }
      } catch {
        if (!cancelled) setStorageProblem('write');
      }
    };
    if (navigator.locks) {
      void navigator.locks.request(STORE_KEY, persist).catch(() => {
        if (!cancelled) setStorageProblem('write');
      });
    } else {
      setStorageProblem('write');
    }
    return () => { cancelled = true; };
  }, [store, loaded]);

  useEffect(() => {
    const guardUnsavedWork = (event: BeforeUnloadEvent) => {
      const raw = JSON.stringify(latestStore.current);
      if (loaded.problem !== 'invalid' && raw !== savedRaw.current && (savedRaw.current !== null || raw !== JSON.stringify(loaded.store))) {
        event.preventDefault();
        event.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', guardUnsavedWork);
    return () => window.removeEventListener('beforeunload', guardUnsavedWork);
  }, [loaded]);

  const saving = !storageProblem && JSON.stringify(store) !== persistedRaw;
  return {
    storageProblem,
    saving,
    downloadCurrentWorkspace: () => downloadWorkspace(JSON.stringify(store)),
    downloadSavedData: () => downloadWorkspace(loaded.raw!),
  };
}
