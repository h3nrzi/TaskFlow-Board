import { priorities, type Priority, type Store } from './types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object' && !Array.isArray(value);
const hasStrings = (value: Record<string, unknown>, fields: string[]) =>
  fields.every((field) => typeof value[field] === 'string');
const validDate = (value: unknown) =>
  typeof value === 'string' &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  new Date(`${value}T12:00:00Z`).toISOString().slice(0, 10) === value;
export function isStore(value: unknown): value is Store {
  if (
    !isRecord(value) ||
    !Array.isArray(value.projects) ||
    !Array.isArray(value.tasks) ||
    !isRecord(value.profile)
  )
    return false;
  if (
    !hasStrings(value.profile, ['name', 'email', 'avatar']) ||
    !['light', 'dark', undefined].includes(value.theme as string | undefined)
  )
    return false;
  if (
    !value.projects.every(
      (p) =>
        isRecord(p) &&
        hasStrings(p, ['id', 'name', 'description', 'color', 'icon']) &&
        p.id &&
        validDate(p.createdAt),
    )
  )
    return false;
  const ids = new Set(value.projects.map((p) => p.id));
  if (ids.size !== value.projects.length) return false;
  if (
    !value.tasks.every(
      (t) =>
        isRecord(t) &&
        hasStrings(t, ['id', 'title', 'description', 'projectId']) &&
        t.id &&
        (t.projectId === '' || ids.has(t.projectId)) &&
        ['todo', 'in-progress', 'done'].includes(t.status as string) &&
        priorities.includes(t.priority as Priority) &&
        validDate(t.createdAt) &&
        validDate(t.updatedAt) &&
        (t.dueDate === undefined || t.dueDate === '' || validDate(t.dueDate)) &&
        (t.assignee === undefined || typeof t.assignee === 'string'),
    )
  )
    return false;
  return new Set(value.tasks.map((t) => t.id)).size === value.tasks.length;
}

export const hasTaskTitle = (title: string) => !!title.trim();
export const hasProjectName = (name: string) => !!name.trim();
export const hasValidEmail = (email: string) => email.includes('@');
export const hasSignupName = (name: string) => name.trim().length >= 2;
export const hasValidProfile = (name: string, email: string) =>
  !!name.trim() && hasValidEmail(email);
