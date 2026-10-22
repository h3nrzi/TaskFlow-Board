import { type Store, type Task, priorities } from '@/workspace/types';
import { useState, useMemo } from 'react';
import { filterTasks } from '@/workspace/selectors';
import { Plus, Search } from 'lucide-react';
import { statuses, TaskListRow } from '@/features/tasks/presentation';
import { EmptyState } from '@/components/workspace/empty-state';

export function TasksPage({
  store,
  query,
  setQuery,
  onOpenTask,
  onToggleTask,
  onCreateTask,
}: {
  store: Store;
  query: string;
  setQuery: (v: string) => void;
  onOpenTask: (t: Task) => void;
  onToggleTask: (id: string) => void;
  onCreateTask: () => void;
}) {
  const [status, setStatus] = useState('all'),
    [priority, setPriority] = useState('all'),
    [project, setProject] = useState('all');
  const [sort, setSort] = useState('updated');
  const filtered = useMemo(
    () => filterTasks(store, { query, status, priority, project, sort }),
    [store, query, status, priority, project, sort],
  );
  return (
    <div className="content">
      <div
        style={{
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'space-between',
          gap: 15,
          marginBottom: 26,
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>
            Keep the next thing visible
          </div>
          <h1 className="page-title display">All tasks</h1>
          <p className="subtle" style={{ marginTop: 8 }}>
            {store.tasks.length} pieces of work across {store.projects.length}{' '}
            projects.
          </p>
        </div>
        <button
          className="button button-primary"
          onClick={onCreateTask}
          data-testid="button-create-task"
        >
          <Plus size={15} /> New task
        </button>
      </div>
      <div
        className="panel"
        style={{
          padding: 12,
          marginBottom: 14,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <div style={{ position: 'relative', flex: '1 1 210px' }}>
          <Search
            size={16}
            className="subtle"
            style={{ position: 'absolute', left: 11, top: 11 }}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="field"
            style={{ paddingLeft: 36 }}
            placeholder="Search tasks or projects"
            aria-label="Search tasks"
            data-testid="input-task-search"
          />
        </div>
        <select
          className="field"
          style={{ width: 'auto', minWidth: 130 }}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Filter by status"
          data-testid="filter-task-status"
        >
          <option value="all">All statuses</option>
          {statuses.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <select
          className="field"
          style={{ width: 'auto', minWidth: 130 }}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          aria-label="Filter by priority"
          data-testid="filter-task-priority"
        >
          <option value="all">All priorities</option>
          {priorities.map((p) => (
            <option key={p} value={p}>
              {p[0].toUpperCase() + p.slice(1)}
            </option>
          ))}
        </select>
        <select
          className="field"
          style={{ width: 'auto', minWidth: 145 }}
          value={project}
          onChange={(e) => setProject(e.target.value)}
          aria-label="Filter by project"
          data-testid="filter-task-project"
        >
          <option value="all">All projects</option>
          {store.projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <select
          className="field"
          style={{ width: 'auto', minWidth: 130 }}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort tasks"
          data-testid="sort-tasks"
        >
          <option value="updated">Recently updated</option>
          <option value="due">Due date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className="panel">
        <div
          style={{
            padding: '13px 16px',
            borderBottom: '1px solid hsl(var(--border))',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span className="eyebrow">Tasks</span>
          <span className="eyebrow">{filtered.length} results</span>
        </div>
        {filtered.length ? (
          filtered.map((task) => (
            <TaskListRow
              key={task.id}
              task={task}
              project={store.projects.find((p) => p.id === task.projectId)}
              onOpen={() => onOpenTask(task)}
              onToggle={() => onToggleTask(task.id)}
            />
          ))
        ) : (
          <EmptyState
            title={
              store.tasks.length
                ? 'No tasks match those filters'
                : 'Your task list is a blank page'
            }
            detail={
              store.tasks.length
                ? 'Try a different search or loosen one of the filters.'
                : 'Add a task to turn an idea into a next step.'
            }
            action="Create a task"
            onClick={onCreateTask}
          />
        )}
      </div>
    </div>
  );
}
