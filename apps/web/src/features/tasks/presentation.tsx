import {
  type Status,
  type Priority,
  type Task,
  type Project,
} from '@/workspace/types';
import { Circle, Activity, CheckCircle2, Check } from 'lucide-react';
import { dayString } from '@/components/workspace/date-format';

export const statuses: {
  id: Status;
  name: string;
  icon: typeof Circle;
  className: string;
}[] = [
  { id: 'todo', name: 'To do', icon: Circle, className: 'status-todo' },
  {
    id: 'in-progress',
    name: 'In progress',
    icon: Activity,
    className: 'status-progress',
  },
  { id: 'done', name: 'Done', icon: CheckCircle2, className: 'status-done' },
];

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={`badge priority-${priority}`}
      data-testid={`priority-${priority}`}
    >
      {priority[0].toUpperCase() + priority.slice(1)}
    </span>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  const item = statuses.find((s) => s.id === status)!;
  const Icon = item.icon;
  return (
    <span className={`badge ${item.className}`}>
      <Icon size={11} />
      {item.name}
    </span>
  );
}

export function TaskListRow({
  task,
  project,
  onOpen,
  onToggle,
}: {
  task: Task;
  project?: Project;
  onOpen: () => void;
  onToggle: () => void;
}) {
  return (
    <div className="task-row" data-testid={`task-row-${task.id}`}>
      <button
        className={`task-check ${task.status === 'done' ? 'checked' : ''}`}
        aria-label={
          task.status === 'done' ? 'Mark task not done' : 'Mark task done'
        }
        onClick={onToggle}
        data-testid={`button-toggle-task-${task.id}`}
      >
        {task.status === 'done' && <Check size={12} />}
      </button>
      <button
        onClick={onOpen}
        style={{
          flex: 1,
          minWidth: 0,
          textAlign: 'left',
          background: 'transparent',
          border: 0,
          padding: 0,
          color: 'inherit',
        }}
        data-testid={`button-open-task-${task.id}`}
      >
        <span
          style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}
        >
          <span
            style={{
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              textDecoration: task.status === 'done' ? 'line-through' : 'none',
              opacity: task.status === 'done' ? 0.65 : 1,
            }}
          >
            {task.title}
          </span>
        </span>
        <span
          className="subtle"
          style={{ display: 'block', fontSize: 11, marginTop: 4 }}
        >
          {project?.name || 'No project'}
          {task.dueDate ? ` · Due ${dayString(task.dueDate)}` : ''}
        </span>
      </button>
      <StatusBadge status={task.status} />
      <PriorityBadge priority={task.priority} />
    </div>
  );
}
