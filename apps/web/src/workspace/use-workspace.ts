import { useEffect, useState } from 'react';
import { readWorkspace } from './browser-storage';
import { dateOffset } from './dates';
import {
  addProject,
  addTask,
  deleteProject,
  deleteTask,
  replaceProfile,
  toggleWorkspaceTheme,
  updateProject,
  updateTask,
} from './transitions';
import type { Profile, ProjectInput, Store, Task, TaskInput } from './types';
import { useWorkspacePersistence } from './use-workspace-persistence';

// One mounted session owns both the loaded snapshot and all persistent updates.
// Callers coordinate validation feedback, navigation and overlays themselves.
export function useWorkspace() {
  const [loaded] = useState(readWorkspace);
  const [store, setStore] = useState<Store>(loaded.store);

  // Theme application is a presentation effect, separate from persistence.
  // Keep its existing lifetime and ordering before the save effect.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', store.theme === 'dark');
  }, [store, loaded]);
  const persistence = useWorkspacePersistence(store, loaded);

  return {
    store,
    ...persistence,
    createTask: (data: TaskInput) => {
      const now = dateOffset(0);
      // Task identifiers retain their original generation inside the updater.
      setStore((current) => addTask(current, data, `task-${Date.now()}`, now));
    },
    updateTask: (id: string, updates: Partial<Task>) => {
      setStore((current) => updateTask(current, id, updates, dateOffset(0)));
    },
    deleteTask: (id: string) => setStore((current) => deleteTask(current, id)),
    createProject: (data: ProjectInput) => {
      const id = `project-${Date.now()}`;
      setStore((current) => addProject(current, data, id, dateOffset(0)));
      return id;
    },
    updateProject: (id: string, data: ProjectInput) => {
      setStore((current) => updateProject(current, id, data));
    },
    deleteProject: (id: string) => setStore((current) => deleteProject(current, id)),
    updateProfile: (profile: Profile) => setStore((current) => replaceProfile(current, profile)),
    toggleTheme: () => setStore(toggleWorkspaceTheme),
  };
}
