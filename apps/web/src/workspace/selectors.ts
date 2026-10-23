import { dateOffset } from './dates';
import { priorities, type Status, type Store, type Task } from './types';

export function projectTasks(tasks: Task[], projectId: string): Task[] {
  return tasks.filter((task) => task.projectId === projectId);
}

export function tasksByStatus(tasks: Task[], status: Status): Task[] {
  return tasks.filter((task) => task.status === status);
}

export function taskCounts(tasks: Task[]) {
  const done = tasksByStatus(tasks, 'done').length;
  return {
    done,
    active: tasksByStatus(tasks, 'in-progress').length,
    open: tasks.filter((task) => task.status !== 'done').length,
    completedPct: tasks.length ? Math.round((done / tasks.length) * 100) : 0,
  };
}

export function dashboardTasks(tasks: Task[]) {
  const upcoming = [...tasks]
    .filter(
      (task) =>
        task.dueDate && task.status !== 'done' && task.dueDate >= dateOffset(0),
    )
    .sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''))
    .slice(0, 4);
  const recent = [...tasks]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 5);
  return { upcoming, recent };
}

type TaskFilters = {
  query: string;
  status: string;
  priority: string;
  project: string;
  sort: string;
};

export function filterTasks(
  store: Store,
  { query, status, priority, project, sort }: TaskFilters,
): Task[] {
  return store.tasks
    .filter((task) => {
      const text =
        `${task.title} ${task.description} ${store.projects.find((p) => p.id === task.projectId)?.name || ''}`.toLowerCase();
      return (
        (!query || text.includes(query.toLowerCase())) &&
        (status === 'all' || task.status === status) &&
        (priority === 'all' || task.priority === priority) &&
        (project === 'all' || task.projectId === project)
      );
    })
    .sort((a, b) =>
      sort === 'due'
        ? (a.dueDate || '9999').localeCompare(b.dueDate || '9999')
        : sort === 'priority'
          ? priorities.indexOf(b.priority) - priorities.indexOf(a.priority)
          : b.updatedAt.localeCompare(a.updatedAt),
    );
}

export function isTaskOverdue(task: Task, today: string): boolean {
  return Boolean(task.dueDate && task.dueDate < today && task.status !== 'done');
}
