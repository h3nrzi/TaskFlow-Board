import {
  type Task,
  type Project,
  type Status,
  type Priority,
  priorities,
} from '@/workspace/types';
import { OverlayDialog } from '@/components/workspace/overlay-dialog';
import { X, Pencil, Trash2 } from 'lucide-react';
import {
  StatusBadge,
  PriorityBadge,
  statuses,
} from '@/features/tasks/presentation';
import { dayString } from '@/components/workspace/date-format';

export function TaskDrawer({
  task,
  projects,
  inactive,
  onClose,
  onEdit,
  onDelete,
  onUpdate,
}: {
  task: Task;
  projects: Project[];
  inactive: boolean;
  onClose: () => void;
  onEdit: (t: Task) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, changes: Partial<Task>) => void;
}) {
  const project = projects.find((p) => p.id === task.projectId);
  return (
    <OverlayDialog className="overlay" onClose={onClose}>
      <aside
        inert={inactive}
        data-dialog-layer
        tabIndex={-1}
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Task details"
        data-testid="drawer-task-details"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 22px',
            borderBottom: '1px solid hsl(var(--border))',
          }}
        >
          <span className="eyebrow">Task details</span>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close task details"
            data-testid="button-close-task-drawer"
          >
            <X size={18} />
          </button>
        </div>
        <div style={{ padding: '27px 26px' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
          </div>
          <h2
            className="display"
            style={{ fontSize: 30, lineHeight: 1.17, margin: '0 0 14px' }}
            data-testid={`text-task-title-${task.id}`}
          >
            {task.title}
          </h2>
          <p
            className="subtle"
            style={{
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
              marginBottom: 26,
            }}
          >
            {task.description || 'No description yet.'}
          </p>
          <label className="label">Status</label>
          <select
            className="field"
            value={task.status}
            onChange={(e) =>
              onUpdate(task.id, { status: e.target.value as Status })
            }
            data-testid="select-drawer-task-status"
          >
            {statuses.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 14,
              marginTop: 20,
            }}
          >
            <div>
              <label className="label">Priority</label>
              <select
                className="field"
                value={task.priority}
                onChange={(e) =>
                  onUpdate(task.id, { priority: e.target.value as Priority })
                }
                data-testid="select-drawer-task-priority"
              >
                {priorities.map((p) => (
                  <option key={p} value={p}>
                    {p[0].toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Due date</label>
              <input
                className="field"
                type="date"
                value={task.dueDate || ''}
                onChange={(e) =>
                  onUpdate(task.id, { dueDate: e.target.value || undefined })
                }
                data-testid="input-drawer-task-date"
              />
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <label className="label">Project</label>
            <select
              className="field"
              value={task.projectId}
              onChange={(e) => onUpdate(task.id, { projectId: e.target.value })}
              data-testid="select-drawer-task-project"
            >
              {task.projectId === '' && <option value="">No project</option>}
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginTop: 20 }}>
            <label className="label">Assignee</label>
            <input
              className="field"
              value={task.assignee || ''}
              placeholder="Unassigned"
              onChange={(e) => onUpdate(task.id, { assignee: e.target.value })}
              data-testid="input-drawer-assignee"
            />
          </div>
          <div
            className="panel"
            style={{
              padding: 13,
              marginTop: 25,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span className="subtle" style={{ fontSize: 11 }}>
              Created {dayString(task.createdAt)}
            </span>
            <span className="subtle" style={{ fontSize: 11 }}>
              Updated {dayString(task.updatedAt)}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
            <button
              className="button button-primary"
              onClick={() => onEdit(task)}
              data-testid="button-edit-task"
            >
              <Pencil size={14} /> Edit task
            </button>
            <button
              className="button button-danger"
              onClick={() => onDelete(task.id)}
              data-testid="button-delete-task"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      </aside>
    </OverlayDialog>
  );
}
