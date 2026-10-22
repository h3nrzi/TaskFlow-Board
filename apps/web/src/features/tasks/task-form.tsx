import {
  type Task,
  type Project,
  type TaskInput,
  type Status,
  type Priority,
  priorities,
} from '@/workspace/types';
import { useState } from 'react';
import { OverlayDialog } from '@/components/workspace/overlay-dialog';
import { X } from 'lucide-react';
import { statuses } from '@/features/tasks/presentation';

export function TaskForm({
  task,
  projects,
  defaultProjectId,
  onClose,
  onSave,
}: {
  task?: Task;
  projects: Project[];
  defaultProjectId?: string;
  onClose: () => void;
  onSave: (data: TaskInput, existing?: Task) => void;
}) {
  const [title, setTitle] = useState(task?.title || ''),
    [description, setDescription] = useState(task?.description || ''),
    [status, setStatus] = useState<Status>(task?.status || 'todo'),
    [priority, setPriority] = useState<Priority>(task?.priority || 'medium'),
    [dueDate, setDueDate] = useState(task?.dueDate || ''),
    [projectId, setProjectId] = useState(
      task?.projectId ?? defaultProjectId ?? projects[0]?.id ?? '',
    ),
    [assignee, setAssignee] = useState(task?.assignee || '');
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(
      {
        title,
        description,
        status,
        priority,
        dueDate: dueDate || undefined,
        projectId,
        assignee,
      },
      task,
    );
  };
  return (
    <OverlayDialog className="modal-wrap" onClose={onClose}>
      <form
        data-dialog-layer
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={task ? 'Edit task' : 'New task'}
        className="modal"
        onSubmit={submit}
        data-testid="form-task"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
            marginBottom: 22,
          }}
        >
          <div>
            <div className="eyebrow">
              {task ? 'Refine the details' : 'Make a next step'}
            </div>
            <h2 className="display" style={{ margin: '7px 0 0', fontSize: 25 }}>
              {task ? 'Edit task' : 'New task'}
            </h2>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close"
            data-testid="button-close-task-form"
          >
            <X size={18} />
          </button>
        </div>
        <label className="label" htmlFor="task-title">
          Title <span style={{ color: 'hsl(var(--destructive))' }}>*</span>
        </label>
        <input
          id="task-title"
          className="field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoFocus
          placeholder="What needs to happen?"
          data-testid="input-task-title"
        />
        <label
          className="label"
          htmlFor="task-description"
          style={{ marginTop: 16 }}
        >
          Description
        </label>
        <textarea
          id="task-description"
          className="field"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a little context…"
          data-testid="input-task-description"
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            marginTop: 15,
          }}
        >
          <div>
            <label className="label">Status</label>
            <select
              className="field"
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              data-testid="input-task-status"
            >
              {statuses.map((s) => (
                <option value={s.id} key={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Priority</label>
            <select
              className="field"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              data-testid="input-task-priority"
            >
              {priorities.map((p) => (
                <option value={p} key={p}>
                  {p[0].toUpperCase() + p.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            marginTop: 15,
          }}
        >
          <div>
            <label className="label">Project</label>
            <select
              className="field"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              data-testid="input-task-project"
            >
              {task?.projectId === '' && projects.length > 0 && (
                <option value="">No project</option>
              )}
              {projects.length ? (
                projects.map((p) => (
                  <option value={p.id} key={p.id}>
                    {p.name}
                  </option>
                ))
              ) : (
                <option value="">No project</option>
              )}
            </select>
          </div>
          <div>
            <label className="label">Due date</label>
            <input
              type="date"
              className="field"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              data-testid="input-task-due-date"
            />
          </div>
        </div>
        <label
          className="label"
          htmlFor="task-assignee"
          style={{ marginTop: 15 }}
        >
          Assignee
        </label>
        <input
          id="task-assignee"
          className="field"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          placeholder="Your name"
          data-testid="input-task-assignee"
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            gap: 8,
            marginTop: 23,
          }}
        >
          <button
            type="button"
            className="button"
            onClick={onClose}
            data-testid="button-cancel-task"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="button button-primary"
            data-testid="button-save-task"
          >
            {task ? 'Save changes' : 'Create task'}
          </button>
        </div>
      </form>
    </OverlayDialog>
  );
}
