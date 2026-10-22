import { type Store, type Project } from '@/workspace/types';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { projectTasks, taskCounts, tasksByStatus } from '@/workspace/selectors';
import { Link } from 'wouter';
import { statuses } from '@/features/tasks/presentation';
import { EmptyState } from '@/components/workspace/empty-state';

export function ProjectsPage({
  store,
  onCreate,
  onEdit,
  onDelete,
  onNavigate,
}: {
  store: Store;
  onCreate: () => void;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
  onNavigate: (path: string) => void;
}) {
  return (
    <div className="content">
      <div
        style={{
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 28,
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>
            Where the work lives
          </div>
          <h1 className="page-title display">Projects</h1>
          <p className="subtle" style={{ marginTop: 8 }}>
            Small containers for the things you want to move forward.
          </p>
        </div>
        <button
          className="button button-primary"
          onClick={onCreate}
          data-testid="button-create-project"
        >
          <Plus size={16} /> New project
        </button>
      </div>
      {store.projects.length ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))',
            gap: 14,
          }}
        >
          {store.projects.map((p) => {
            const tasks = projectTasks(store.tasks, p.id),
              { completedPct: pct } = taskCounts(tasks);
            return (
              <article
                key={p.id}
                className="panel"
                data-testid={`card-project-${p.id}`}
                style={{ padding: 19, cursor: 'pointer' }}
                onClick={() => onNavigate(`/projects/${p.id}`)}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: `${p.color}1c`,
                      color: p.color,
                      display: 'grid',
                      placeItems: 'center',
                      font: '800 17px var(--app-font-display)',
                    }}
                  >
                    {p.icon || p.name[0]}
                  </div>
                  <div style={{ display: 'flex', gap: 2 }}>
                    <button
                      className="icon-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(p);
                      }}
                      aria-label={`Edit ${p.name}`}
                      data-testid={`button-edit-project-${p.id}`}
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      className="icon-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(p.id);
                      }}
                      aria-label={`Delete ${p.name}`}
                      data-testid={`button-delete-project-${p.id}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
                <h2
                  className="display"
                  style={{ fontSize: 20, margin: '17px 0 5px' }}
                >
                  <Link
                    href={`/projects/${p.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="card-title-action"
                  >
                    {p.name}
                  </Link>
                </h2>
                <p
                  className="subtle"
                  style={{ margin: 0, minHeight: 38, lineHeight: 1.5 }}
                >
                  {p.description ||
                    'A place to gather related work and keep it moving.'}
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '22px 0 8px',
                    fontSize: 11,
                  }}
                >
                  <span className="subtle">
                    {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                  </span>
                  <span style={{ fontWeight: 700 }}>{pct}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${pct}%` }} />
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 15 }}>
                  {statuses.map((s) => (
                    <span key={s.id} className={`badge ${s.className}`}>
                      {tasksByStatus(tasks, s.id).length} {s.name}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="panel">
          <EmptyState
            title="A project gives your work a home"
            detail="Start with something you’re making, planning, or figuring out."
            action="Create your first project"
            onClick={onCreate}
          />
        </div>
      )}
    </div>
  );
}
