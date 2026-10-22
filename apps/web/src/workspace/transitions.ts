import type { Profile, ProjectInput, Store, Task, TaskInput } from './types';

export function updateTask(
  store: Store,
  id: string,
  updates: Partial<Task>,
  updatedAt: string,
): Store {
  return {
    ...store,
    tasks: store.tasks.map((task) =>
      task.id === id ? { ...task, ...updates, updatedAt } : task,
    ),
  };
}

export function addTask(
  store: Store,
  data: TaskInput,
  id: string,
  now: string,
): Store {
  return {
    ...store,
    tasks: [
      { ...data, title: data.title.trim(), id, createdAt: now, updatedAt: now },
      ...store.tasks,
    ],
  };
}

export function updateProject(
  store: Store,
  id: string,
  data: ProjectInput,
): Store {
  return {
    ...store,
    projects: store.projects.map((project) =>
      project.id === id
        ? { ...project, ...data, name: data.name.trim() }
        : project,
    ),
  };
}

export function addProject(
  store: Store,
  data: ProjectInput,
  id: string,
  createdAt: string,
): Store {
  return {
    ...store,
    projects: [
      ...store.projects,
      { ...data, name: data.name.trim(), id, createdAt },
    ],
  };
}

export function deleteTask(store: Store, id: string): Store {
  return { ...store, tasks: store.tasks.filter((task) => task.id !== id) };
}

export function deleteProject(store: Store, id: string): Store {
  return {
    ...store,
    projects: store.projects.filter((project) => project.id !== id),
    tasks: store.tasks.filter((task) => task.projectId !== id),
  };
}

export function replaceProfile(store: Store, profile: Profile): Store {
  return { ...store, profile };
}

export function toggleWorkspaceTheme(store: Store): Store {
  return { ...store, theme: store.theme === 'light' ? 'dark' : 'light' };
}

export const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
