import { useWorkspace } from '@/workspace/use-workspace';
import { useState, useEffect } from 'react';
import {
  type Task,
  type Project,
  type TaskInput,
  type ProjectInput,
} from '@/workspace/types';
import { useLocation, useRoute, Link, Switch, Route } from 'wouter';
import { hasTaskTitle, hasProjectName } from '@/workspace/validation';
import {
  Command,
  Plus,
  Sparkles,
  Menu,
  Moon,
  Sun,
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  Settings2,
} from 'lucide-react';
import { initials } from '@/workspace/transitions';
import { projectTasks } from '@/workspace/selectors';
import NotFound from '@/pages/not-found';
import { AuthScreen } from '@/features/auth/auth-screen';
import { Navigation, ProfileFooter, MobileLink } from '@/app/navigation';
import { Dashboard } from '@/features/overview/dashboard';
import { ProjectsPage } from '@/features/projects/projects-page';
import { ProjectBoard } from '@/features/projects/project-board';
import { TasksPage } from '@/features/tasks/tasks-page';
import { SettingsPage } from '@/features/settings/settings-page';
import { TaskDrawer } from '@/features/tasks/task-drawer';
import { TaskForm } from '@/features/tasks/task-form';
import { ProjectForm } from '@/features/projects/project-form';
import { ConfirmDialog } from '@/components/workspace/confirm-dialog';

export function WorkspaceShell() {
  const {
    store,
    createTask,
    updateTask: patchTask,
    deleteTask,
    createProject,
    updateProject,
    deleteProject,
    updateProfile,
    toggleTheme,
    storageProblem,
    saving,
    downloadCurrentWorkspace,
    downloadSavedData,
  } = useWorkspace();
  const [notice, setNotice] = useState('');
  const [taskModal, setTaskModal] = useState<Task | 'new' | null>(null);
  const [projectModal, setProjectModal] = useState<Project | 'new' | null>(
    null,
  );
  const [drawerTask, setDrawerTask] = useState<Task | null>(null);
  const [confirm, setConfirm] = useState<{
    kind: 'task' | 'project';
    id: string;
  } | null>(null);
  const [search, setSearch] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [location, setLocation] = useLocation();
  const [, projectRoute] = useRoute('/projects/:id');

  useEffect(() => {
    if (!notice) return;
    const t = window.setTimeout(() => setNotice(''), 2800);
    return () => window.clearTimeout(t);
  }, [notice]);

  const saveTask = (data: TaskInput, existing?: Task) => {
    if (!hasTaskTitle(data.title)) {
      setNotice('Add a task title to continue.');
      return;
    }
    if (existing) {
      patchTask(existing.id, { ...data, title: data.title.trim() });
      setNotice('Task updated');
    } else {
      createTask(data);
      setNotice('Task added to your workspace');
    }
    setTaskModal(null);
  };
  const saveProject = (data: ProjectInput, existing?: Project) => {
    if (!hasProjectName(data.name)) {
      setNotice('Add a project name to continue.');
      return;
    }
    if (existing) {
      updateProject(existing.id, data);
      setNotice('Project updated');
    } else {
      const id = createProject(data);
      setNotice('Project created');
      setLocation(`/projects/${id}`);
    }
    setProjectModal(null);
  };
  const deleteConfirmed = () => {
    if (!confirm) return;
    if (confirm.kind === 'task') {
      deleteTask(confirm.id);
      setDrawerTask(null);
      setNotice('Task deleted');
    } else {
      deleteProject(confirm.id);
      if (location === `/projects/${confirm.id}`) setLocation('/projects');
      setNotice('Project and its tasks deleted');
    }
    setConfirm(null);
  };
  const openTask = (task: Task) => {
    setDrawerTask(task);
  };
  const authRoute = location === '/login' || location === '/signup';

  const storageWarning = storageProblem && (
    <div className="storage-warning" role="alert">
      <strong>
        {storageProblem === 'conflict'
          ? 'Your workspace changed in another tab. Changes here are not saved.'
          : 'Your changes are not saved. This browser could not safely save your workspace.'}
      </strong>
      <p>
        Keep this tab open to retain your current work. Download a copy before
        reloading.
      </p>
      <button className="button" onClick={downloadCurrentWorkspace}>
        Download current workspace
      </button>
    </div>
  );
  if (storageProblem === 'invalid')
    return (
      <main className="content">
        <section className="panel" style={{ padding: 24 }} role="alert">
          <h1 className="page-title display">
            Your saved workspace could not be read
          </h1>
          <p>
            Your saved data has been kept unchanged. Download a copy for
            recovery before making any changes to browser storage.
          </p>
          <button className="button" onClick={downloadSavedData}>
            Download saved data
          </button>
          <button className="button" onClick={() => window.location.reload()}>
            Try again
          </button>
        </section>
      </main>
    );
  if (authRoute)
    return (
      <>
        {storageWarning}
        <AuthScreen
          key={location}
          mode={location === '/signup' ? 'signup' : 'login'}
          profile={store.profile}
          onSave={(profile) => {
            updateProfile(profile);
            setNotice('Your demo workspace is ready');
            setLocation('/');
          }}
        />
      </>
    );

  const pageTitle =
    location === '/'
      ? 'Your workspace'
      : location === '/projects'
        ? 'Projects'
        : location === '/tasks'
          ? 'All tasks'
          : location === '/settings'
            ? 'Settings'
            : 'Project workspace';
  return (
    <div className="app-shell">
      <aside
        className="sidebar"
        inert={!!(drawerTask || taskModal || projectModal || confirm)}
      >
        <Link href="/" className="brand-mark" data-testid="link-brand">
          <span className="brand-glyph">
            <Command size={17} strokeWidth={2.7} />
          </span>
          <span>taskflow</span>
        </Link>
        <div className="nav-label">Workspace</div>
        <Navigation location={location} projects={store.projects} />
        <div
          className="nav-label"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          Your projects{' '}
          <button
            className="icon-button"
            aria-label="Create project"
            data-testid="button-create-project-nav"
            onClick={() => setProjectModal('new')}
          >
            <Plus size={15} />
          </button>
        </div>
        <div>
          {store.projects.map((p) => (
            <Link
              href={`/projects/${p.id}`}
              className="project-nav"
              key={p.id}
              data-testid={`link-project-${p.id}`}
            >
              <span className="project-dot" style={{ background: p.color }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {p.name}
              </span>
            </Link>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div
          className="panel"
          style={{
            padding: 12,
            margin: '14px 3px 15px',
            background: 'hsl(var(--accent) / .5)',
          }}
        >
          <div style={{ display: 'flex', gap: 9, alignItems: 'center' }}>
            <span
              className="brand-glyph"
              style={{
                width: 25,
                height: 25,
                background: 'hsl(var(--card))',
                color: 'hsl(var(--primary))',
              }}
            >
              <Sparkles size={13} />
            </span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700 }}>
                A little progress
              </div>
              <div className="subtle" style={{ fontSize: 10 }}>
                adds up every day.
              </div>
            </div>
          </div>
        </div>
        <ProfileFooter
          profile={store.profile}
          theme={store.theme}
          toggleTheme={toggleTheme}
        />
      </aside>
      <main
        className="main-area"
        inert={!!(drawerTask || taskModal || projectModal || confirm)}
      >
        {storageWarning}
        <div
          className="save-state"
          role="status"
          data-testid="workspace-save-state"
        >
          {storageProblem
            ? 'Changes not saved'
            : saving
              ? 'Saving changes…'
              : 'All changes saved locally'}
        </div>
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <button
              className="icon-button menu-mobile"
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Toggle navigation"
              data-testid="button-mobile-menu"
            >
              <Menu size={20} />
            </button>
            <div className="eyebrow">{pageTitle}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              className="button button-quiet desktop-only"
              onClick={() => setTaskModal('new')}
              data-testid="button-quick-add"
            >
              <Plus size={15} /> New task
            </button>
            <button
              className="icon-button"
              aria-label={
                store.theme === 'light'
                  ? 'Switch to dark theme'
                  : 'Switch to light theme'
              }
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {store.theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            <Link
              href="/settings"
              className="avatar"
              aria-label="Open profile settings"
              data-testid="link-profile-avatar"
            >
              {store.profile.avatar || initials(store.profile.name)}
            </Link>
          </div>
        </header>
        {mobileMenu && (
          <div className="mobile-menu-panel">
            <Navigation
              location={location}
              projects={store.projects}
              onNavigate={() => setMobileMenu(false)}
            />
          </div>
        )}
        <Switch>
          <Route path="/">
            <Dashboard
              store={store}
              onOpenTask={openTask}
              onToggleTask={(id) =>
                patchTask(id, {
                  status:
                    store.tasks.find((t) => t.id === id)?.status === 'done'
                      ? 'todo'
                      : 'done',
                })
              }
              onCreateTask={() => setTaskModal('new')}
              onNavigate={setLocation}
            />
          </Route>
          <Route path="/projects">
            <ProjectsPage
              store={store}
              onCreate={() => setProjectModal('new')}
              onEdit={(p) => setProjectModal(p)}
              onDelete={(id) => setConfirm({ kind: 'project', id })}
              onNavigate={setLocation}
            />
          </Route>
          <Route path="/projects/:id">
            {(params) => (
              <ProjectBoard
                project={store.projects.find((p) => p.id === params.id)}
                tasks={projectTasks(store.tasks, params.id)}
                allProjects={store.projects}
                onMove={patchTask}
                onOpenTask={openTask}
                onCreateTask={() => setTaskModal('new')}
                onEditProject={(p) => setProjectModal(p)}
                onDeleteProject={(id) => setConfirm({ kind: 'project', id })}
                onNavigate={setLocation}
              />
            )}
          </Route>
          <Route path="/tasks">
            <TasksPage
              store={store}
              query={search}
              setQuery={setSearch}
              onOpenTask={openTask}
              onToggleTask={(id) =>
                patchTask(id, {
                  status:
                    store.tasks.find((t) => t.id === id)?.status === 'done'
                      ? 'todo'
                      : 'done',
                })
              }
              onCreateTask={() => setTaskModal('new')}
            />
          </Route>
          <Route path="/settings">
            <SettingsPage
              store={store}
              onUpdateProfile={updateProfile}
              toggleTheme={toggleTheme}
              storageProblem={!!storageProblem}
              saving={saving}
              onNotify={setNotice}
            />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
      <nav
        className="mobile-nav"
        inert={!!(drawerTask || taskModal || projectModal || confirm)}
      >
        <MobileLink
          href="/"
          active={location === '/'}
          icon={<LayoutDashboard />}
          label="Home"
        />
        <MobileLink
          href="/projects"
          active={location.startsWith('/projects')}
          icon={<FolderKanban />}
          label="Projects"
        />
        <MobileLink
          href="/tasks"
          active={location === '/tasks'}
          icon={<ListTodo />}
          label="Tasks"
        />
        <MobileLink
          href="/settings"
          active={location === '/settings'}
          icon={<Settings2 />}
          label="Settings"
        />
      </nav>
      {drawerTask && (
        <TaskDrawer
          task={store.tasks.find((t) => t.id === drawerTask.id) || drawerTask}
          projects={store.projects}
          inactive={!!(taskModal || confirm)}
          onClose={() => setDrawerTask(null)}
          onEdit={(t) => setTaskModal(t)}
          onDelete={(id) => setConfirm({ kind: 'task', id })}
          onUpdate={patchTask}
        />
      )}
      {taskModal && (
        <TaskForm
          task={taskModal === 'new' ? undefined : taskModal}
          projects={store.projects}
          defaultProjectId={
            store.projects.find((p) => p.id === projectRoute?.id)?.id
          }
          onClose={() => setTaskModal(null)}
          onSave={saveTask}
        />
      )}
      {projectModal && (
        <ProjectForm
          project={projectModal === 'new' ? undefined : projectModal}
          onClose={() => setProjectModal(null)}
          onSave={saveProject}
        />
      )}
      {confirm && (
        <ConfirmDialog
          title={
            confirm.kind === 'task'
              ? 'Delete this task?'
              : 'Delete this project?'
          }
          description={
            confirm.kind === 'task'
              ? 'This task will be permanently removed from your workspace.'
              : 'This will also remove every task inside the project.'
          }
          onCancel={() => setConfirm(null)}
          onConfirm={deleteConfirmed}
        />
      )}
      {notice && (
        <div className="toast-stack">
          <div className="toast-item" role="status" data-testid="status-toast">
            {notice}
          </div>
        </div>
      )}
    </div>
  );
}
