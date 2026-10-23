import { type Store, type Task } from '@/workspace/types';
import {
  taskCounts,
  dashboardTasks,
  projectTasks,
} from '@/workspace/selectors';
import {
  Plus,
  ListTodo,
  Activity,
  CheckCheck,
  Zap,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
} from 'lucide-react';
import { Link } from 'wouter';
import { type ReactNode } from 'react';
import { EmptyState } from '@/components/workspace/empty-state';
import { dayString } from '@/components/workspace/date-format';
import { PriorityBadge, TaskListRow } from '@/features/tasks/presentation';

export function Dashboard({
  store,
  onOpenTask,
  onToggleTask,
  onCreateTask,
  onNavigate,
}: {
  store: Store;
  onOpenTask: (t: Task) => void;
  onToggleTask: (id: string) => void;
  onCreateTask: () => void;
  onNavigate: (path: string) => void;
}) {
  const tasks = store.tasks;
  const { done, active, open, completedPct } = taskCounts(tasks);
  const { upcoming, recent } = dashboardTasks(tasks);
  return (
    <div className="content">
      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 18,
          alignItems: 'end',
          marginBottom: 27,
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>
            A good day to make progress
          </div>
          <h1 className="page-title display">
            Welcome back, {store.profile.name.split(' ')[0]}.
          </h1>
          <p className="subtle" style={{ margin: '10px 0 0' }}>
            Here’s the shape of your work right now.
          </p>
        </div>
        <button
          className="button button-primary"
          onClick={onCreateTask}
          data-testid="button-add-task-dashboard"
        >
          <Plus size={16} /> Add a task
        </button>
      </section>
      <section
        className="metric-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
          gap: 12,
          marginBottom: 22,
        }}
      >
        <Metric
          label="Open tasks"
          value={open}
          detail="across your projects"
          icon={<ListTodo size={17} />}
        />
        <Metric
          label="In progress"
          value={active}
          detail="moving forward today"
          icon={<Activity size={17} />}
        />
        <Metric
          label="Completed"
          value={done}
          detail="tasks finished"
          icon={<CheckCheck size={17} />}
        />
        <div className="panel metric-card">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span className="eyebrow">Overall progress</span>
            <span style={{ color: 'hsl(var(--primary))' }}>
              <Zap size={17} />
            </span>
          </div>
          <div className="metric-value">
            {completedPct}
            <span style={{ fontSize: 15, letterSpacing: 0 }}>%</span>
          </div>
          <div className="progress-track" style={{ marginTop: 9 }}>
            <div
              className="progress-fill"
              style={{ width: `${completedPct}%` }}
            />
          </div>
        </div>
      </section>
      <section className="dashboard-panels" style={{ marginBottom: 22 }}>
        <div className="panel">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '17px 18px',
              borderBottom: '1px solid hsl(var(--border))',
            }}
          >
            <div>
              <div style={{ fontWeight: 700 }}>Your projects</div>
              <div className="subtle" style={{ fontSize: 12, marginTop: 3 }}>
                A quick pulse on what’s moving
              </div>
            </div>
            <Link
              className="button button-quiet"
              href="/projects"
              data-testid="link-all-projects"
            >
              All projects <ArrowRight size={14} />
            </Link>
          </div>
          {store.projects.length ? (
            <div style={{ padding: '2px 18px 8px' }}>
              {store.projects.slice(0, 4).map((project) => {
                const pt = projectTasks(tasks, project.id),
                  { completedPct: pct } = taskCounts(pt);
                return (
                  <button
                    key={project.id}
                    onClick={() => onNavigate(`/projects/${project.id}`)}
                    data-testid={`project-summary-${project.id}`}
                    className="project-summary-row"
                  >
                    <span
                      className="project-summary-icon"
                      style={{
                        color: project.color,
                        background: `${project.color}18`,
                      }}
                    >
                      {project.icon || project.name[0]}
                    </span>
                    <span style={{ minWidth: 0 }}>
                      <span
                        style={{
                          display: 'block',
                          fontWeight: 700,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {project.name}
                      </span>
                      <span className="subtle" style={{ fontSize: 11 }}>
                        {pt.length} tasks
                      </span>
                    </span>
                    <span className="project-summary-progress">
                      <span
                        className="progress-track"
                        style={{ display: 'block' }}
                      >
                        <span
                          className="progress-fill"
                          style={{ width: `${pct}%`, display: 'block' }}
                        />
                      </span>
                      <span
                        className="subtle"
                        style={{ fontSize: 10, marginTop: 5, display: 'block' }}
                      >
                        {pct}% complete
                      </span>
                    </span>
                    <ArrowUpRight size={15} className="subtle" />
                  </button>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="Start with a project"
              detail="Give your work a home, then add the first task."
              action="Create project"
              onClick={() => onNavigate('/projects')}
            />
          )}
        </div>
        <div className="panel">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '17px 18px',
              borderBottom: '1px solid hsl(var(--border))',
            }}
          >
            <div>
              <div style={{ fontWeight: 700 }}>Coming up</div>
              <div className="subtle" style={{ fontSize: 12, marginTop: 3 }}>
                Deadlines on your horizon
              </div>
            </div>
            <CalendarDays size={17} className="subtle" />
          </div>
          {upcoming.length ? (
            upcoming.map((task) => (
              <button
                key={task.id}
                onClick={() => onOpenTask(task)}
                className="task-row"
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 0,
                  color: 'inherit',
                  textAlign: 'left',
                }}
                data-testid={`upcoming-task-${task.id}`}
              >
                <span
                  className="eyebrow"
                  style={{ width: 42, textAlign: 'center', fontSize: 10 }}
                >
                  {dayString(task.dueDate)}
                </span>
                <span style={{ minWidth: 0, flex: 1 }}>
                  <span
                    style={{
                      display: 'block',
                      fontWeight: 600,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {task.title}
                  </span>
                  <span className="subtle" style={{ fontSize: 11 }}>
                    {store.projects.find((p) => p.id === task.projectId)
                      ?.name || 'No project'}
                  </span>
                </span>
                <PriorityBadge priority={task.priority} />
              </button>
            ))
          ) : (
            <EmptyState
              title="Clear skies ahead"
              detail="No upcoming deadlines. Add dates to keep the important work in view."
            />
          )}
        </div>
      </section>
      <section className="panel">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '17px 18px',
            borderBottom: '1px solid hsl(var(--border))',
          }}
        >
          <div>
            <div style={{ fontWeight: 700 }}>Recently touched</div>
            <div className="subtle" style={{ fontSize: 12, marginTop: 3 }}>
              The work you’ve been moving
            </div>
          </div>
          <Link
            href="/tasks"
            className="button button-quiet"
            data-testid="link-view-all-tasks"
          >
            View all tasks <ArrowRight size={14} />
          </Link>
        </div>
        {recent.length ? (
          recent.map((task) => (
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
            title="Nothing on the board yet"
            detail="Create a task and make the first move."
            action="Add a task"
            onClick={onCreateTask}
          />
        )}
      </section>
    </div>
  );
}

function Metric({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: number;
  detail: string;
  icon: ReactNode;
}) {
  return (
    <div className="panel metric-card">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span className="eyebrow">{label}</span>
        <span className="subtle">{icon}</span>
      </div>
      <div className="metric-value">{value}</div>
      <div className="subtle" style={{ fontSize: 11, marginTop: 2 }}>
        {detail}
      </div>
    </div>
  );
}
