import { type Project, type Task, type Status } from '@/workspace/types';
import { useState } from 'react';
import { taskCounts, tasksByStatus } from '@/workspace/selectors';
import {
  Plus,
  MoreHorizontal,
  Trash2,
  GripVertical,
  CalendarDays,
} from 'lucide-react';
import { EmptyState } from '@/components/workspace/empty-state';
import { statuses, PriorityBadge, OverdueBadge } from '@/features/tasks/presentation';
import { dayString } from '@/components/workspace/date-format';

export function ProjectBoard({
  project,
  tasks,
  allProjects,
  onMove,
  onOpenTask,
  onCreateTask,
  onEditProject,
  onDeleteProject,
  onNavigate,
}: {
  project?: Project;
  tasks: Task[];
  allProjects: Project[];
  onMove: (id: string, changes: Partial<Task>) => void;
  onOpenTask: (t: Task) => void;
  onCreateTask: () => void;
  onEditProject: (p: Project) => void;
  onDeleteProject: (id: string) => void;
  onNavigate: (path: string) => void;
}) {
  const [dragging, setDragging] = useState<string | null>(null);
  if (!project)
    return (
      <div className="content">
        <div className="panel">
          <EmptyState
            title="This project has moved"
            detail="It may have been deleted, or the link may be out of date."
            action="Browse projects"
            onClick={() => onNavigate('/projects')}
          />
        </div>
      </div>
    );
  const { done: completed } = taskCounts(tasks);
  return (
    <div className="content">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 13,
          marginBottom: 7,
        }}
      >
        <span
          style={{
            width: 38,
            height: 38,
            display: 'grid',
            placeItems: 'center',
            borderRadius: 11,
            color: project.color,
            background: `${project.color}1c`,
            fontWeight: 800,
          }}
        >
          {project.icon}
        </span>
        <span className="eyebrow">{project.name}</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 7 }}>
          <button
            className="button"
            onClick={onCreateTask}
            data-testid="button-add-task-project"
          >
            <Plus size={15} /> Add task
          </button>
          <button
            className="icon-button"
            aria-label="Edit project"
            onClick={() => onEditProject(project)}
            data-testid="button-edit-current-project"
          >
            <MoreHorizontal size={18} />
          </button>
          <button
            className="icon-button"
            aria-label="Delete project"
            onClick={() => onDeleteProject(project.id)}
            data-testid="button-delete-current-project"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <h1 className="page-title display">{project.name}</h1>
      <p className="subtle" style={{ marginTop: 7 }}>
        {project.description || 'Keep related work in one thoughtful place.'}
      </p>
      <div
        style={{
          display: 'flex',
          gap: 18,
          alignItems: 'center',
          margin: '22px 0 25px',
          flexWrap: 'wrap',
        }}
      >
        <span className="subtle" style={{ fontSize: 12 }}>
          {tasks.length} tasks
        </span>
        <span className="subtle" style={{ fontSize: 12 }}>
          {completed} completed
        </span>
        <div className="progress-track" style={{ width: 130 }}>
          <div
            className="progress-fill"
            style={{
              width: `${tasks.length ? (completed / tasks.length) * 100 : 0}%`,
            }}
          />
        </div>
        <span className="eyebrow">
          {tasks.length ? Math.round((completed / tasks.length) * 100) : 0}%
          complete
        </span>
      </div>
      <div className="board" data-testid="board-project">
        <div style={{ display: 'contents' }}>
          {statuses.map((status) => {
            const items = tasksByStatus(tasks, status.id);
            const Icon = status.icon;
            return (
              <section
                key={status.id}
                className="board-column"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const id = e.dataTransfer.getData('text/plain') || dragging;
                  if (id) onMove(id, { status: status.id });
                  setDragging(null);
                }}
                data-testid={`column-${status.id}`}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '3px 2px 7px',
                  }}
                >
                  <span style={{ color: 'hsl(var(--muted-foreground))' }}>
                    <Icon size={15} />
                  </span>
                  <span style={{ fontWeight: 700, fontSize: 12 }}>
                    {status.name}
                  </span>
                  <span
                    className="subtle"
                    style={{ font: '11px var(--app-font-mono)', marginLeft: 1 }}
                  >
                    {items.length}
                  </span>
                  {status.id === 'todo' && (
                    <button
                      className="icon-button"
                      style={{ marginLeft: 'auto', width: 26, height: 26 }}
                      onClick={onCreateTask}
                      aria-label="Add task"
                      data-testid="button-add-task-column"
                    >
                      <Plus size={15} />
                    </button>
                  )}
                </div>
                {items.map((task) => (
                  <article
                    className="task-card"
                    draggable
                    onDragStart={(e) => {
                      setDragging(task.id);
                      e.dataTransfer.setData('text/plain', task.id);
                    }}
                    onDragEnd={() => setDragging(null)}
                    key={task.id}
                    onClick={() => onOpenTask(task)}
                    data-testid={`board-task-${task.id}`}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 8,
                      }}
                    >
                      <button
                        className="card-title-action"
                        style={{
                          fontWeight: 600,
                          lineHeight: 1.45,
                          textAlign: 'left',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenTask(task);
                        }}
                      >
                        {task.title}
                      </button>
                      <GripVertical
                        size={15}
                        className="subtle"
                        style={{ flex: 'none' }}
                      />
                    </div>
                    {task.description && (
                      <p
                        className="subtle"
                        style={{
                          fontSize: 11,
                          lineHeight: 1.45,
                          margin: '8px 0 10px',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {task.description}
                      </p>
                    )}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 6,
                        flexWrap: 'wrap',
                        marginTop: 11,
                      }}
                    >
                      <PriorityBadge priority={task.priority} />
                      <OverdueBadge task={task} />
                      {task.dueDate && (
                        <span
                          className="subtle"
                          style={{
                            fontSize: 10,
                            display: 'inline-flex',
                            gap: 4,
                            alignItems: 'center',
                          }}
                        >
                          <CalendarDays size={12} />
                          {dayString(task.dueDate)}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 11,
                      }}
                    >
                      <span className="subtle" style={{ fontSize: 10 }}>
                        {task.assignee || 'Unassigned'}
                      </span>
                      <select
                        aria-label={`Change status for ${task.title}`}
                        data-testid={`select-task-status-${task.id}`}
                        className="field"
                        value={task.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                          onMove(task.id, { status: e.target.value as Status })
                        }
                        style={{ width: 100, padding: '4px 5px', fontSize: 10 }}
                      >
                        {statuses.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </article>
                ))}
                {!items.length && (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '23px 6px',
                      color: 'hsl(var(--muted-foreground))',
                      fontSize: 11,
                      border: '1px dashed hsl(var(--border))',
                      borderRadius: 8,
                      marginTop: 10,
                    }}
                  >
                    Drop a task here
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
      <p className="subtle" style={{ marginTop: 16, fontSize: 11 }}>
        <GripVertical
          size={13}
          style={{ verticalAlign: 'middle', marginRight: 4 }}
        />
        Drag tasks between columns, or use the status menu on each card.
      </p>
    </div>
  );
}
