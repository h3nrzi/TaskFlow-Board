import { priorities, type Priority, type Profile, type Project, type Status, type Store, type Task, type TaskInput, type ProjectInput } from '@/workspace/types';
import { dateOffset } from '@/workspace/dates';
import { demoStore } from '@/workspace/fixtures';
import { hasProjectName, hasSignupName, hasTaskTitle, hasValidEmail, hasValidProfile, isStore } from '@/workspace/validation';
import { addProject, addTask, deleteProject, deleteTask, initials, replaceProfile, toggleWorkspaceTheme, updateProject, updateTask } from '@/workspace/transitions';
import { dashboardTasks, filterTasks, projectTasks, taskCounts, tasksByStatus } from '@/workspace/selectors';

import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDialogFocus } from '@/components/use-dialog-focus';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, useRoute, Link, Router as WouterRouter } from 'wouter';
import {
  Activity, ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Bell, CalendarDays, Check, CheckCheck,
  CheckCircle2, ChevronDown, Circle, CircleHelp, CirclePlus, Clock3, Command, Filter, FolderKanban,
  GripVertical, LayoutDashboard, ListTodo, LogOut, Menu, Moon, MoreHorizontal, Pencil, Plus, Search,
  Settings2, SlidersHorizontal, Sparkles, Sun, Trash2, UserRound, X, Zap
} from 'lucide-react';

const PROJECT_COLORS = ['#558b73', '#c47d5d', '#6d83a9', '#bc9b4a', '#927cab', '#cf6d70'];
const statuses: { id: Status; name: string; icon: typeof Circle; className: string }[] = [
  { id: 'todo', name: 'To do', icon: Circle, className: 'status-todo' },
  { id: 'in-progress', name: 'In progress', icon: Activity, className: 'status-progress' },
  { id: 'done', name: 'Done', icon: CheckCircle2, className: 'status-done' },
];
const STORE_KEY = 'taskflow-store-v1';
const readStore = (): { store: Store; raw: string | null; problem: 'invalid' | 'read' | null } => {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORE_KEY);
    if (raw !== null) {
      const value: unknown = JSON.parse(raw);
      if (!isStore(value)) return { store: demoStore(), raw, problem: 'invalid' };
      return { store: { ...value, theme: value.theme || 'light' }, raw, problem: null };
    }
  } catch { return { store: demoStore(), raw, problem: raw === null ? 'read' : 'invalid' }; }
  return { store: demoStore(), raw, problem: null };
};
function downloadWorkspace(raw: string) {
  const url = URL.createObjectURL(new Blob([raw], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url; link.download = 'taskflow-workspace.json'; link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const dayString = (value?: string) => value ? new Date(`${value}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date';

function App() {
  const [loaded] = useState(readStore);
  const [store, setStore] = useState<Store>(loaded.store);
  const savedRaw = useRef(loaded.raw);
  const latestStore = useRef(store);
  latestStore.current = store;
  const [persistedRaw, setPersistedRaw] = useState(loaded.raw);
  const [storageProblem, setStorageProblem] = useState<'invalid' | 'read' | 'write' | 'conflict' | null>(loaded.problem);
  const [notice, setNotice] = useState('');
  const [taskModal, setTaskModal] = useState<Task | 'new' | null>(null);
  const [projectModal, setProjectModal] = useState<Project | 'new' | null>(null);
  const [drawerTask, setDrawerTask] = useState<Task | null>(null);
  const [confirm, setConfirm] = useState<{ kind: 'task' | 'project'; id: string } | null>(null);
  const [search, setSearch] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [location, setLocation] = useLocation();
  const [, projectRoute] = useRoute('/projects/:id');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', store.theme === 'dark');
    if (loaded.problem) return;
    let cancelled = false;
    const persist = () => {
      try {
        // Compare inside a cross-tab lock so a stale workspace never replaces newer data.
        if (localStorage.getItem(STORE_KEY) !== savedRaw.current) { if (!cancelled) setStorageProblem('conflict'); return; }
        const raw = JSON.stringify(latestStore.current);
        if (raw !== savedRaw.current) localStorage.setItem(STORE_KEY, raw);
        savedRaw.current = raw;
        if (!cancelled) { setPersistedRaw(raw); setStorageProblem(null); }
      } catch { if (!cancelled) setStorageProblem('write'); }
    };
    if (navigator.locks) {
      void navigator.locks.request(STORE_KEY, persist).catch(() => { if (!cancelled) setStorageProblem('write'); });
    } else setStorageProblem('write');
    return () => { cancelled = true; };
  }, [store, loaded]);
  useEffect(() => {
    const guardUnsavedWork = (event: BeforeUnloadEvent) => {
      const raw = JSON.stringify(latestStore.current);
      if (loaded.problem !== 'invalid' && raw !== savedRaw.current && (savedRaw.current !== null || raw !== JSON.stringify(loaded.store))) { event.preventDefault(); event.returnValue = ''; }
    };
    window.addEventListener('beforeunload', guardUnsavedWork);
    return () => window.removeEventListener('beforeunload', guardUnsavedWork);
  }, [loaded]);
  const saving = !storageProblem && JSON.stringify(store) !== persistedRaw;
  useEffect(() => { if (!notice) return; const t = window.setTimeout(() => setNotice(''), 2800); return () => window.clearTimeout(t); }, [notice]);

  const patchTask = (id: string, updates: Partial<Task>) => setStore(s => updateTask(s, id, updates, dateOffset(0)));
  const saveTask = (data: TaskInput, existing?: Task) => {
    if (!hasTaskTitle(data.title)) { setNotice('Add a task title to continue.'); return; }
    if (existing) { setStore(s => updateTask(s, existing.id, { ...data, title: data.title.trim() }, dateOffset(0))); setNotice('Task updated'); }
    else { const now = dateOffset(0); setStore(s => addTask(s, data, `task-${Date.now()}`, now)); setNotice('Task added to your workspace'); }
    setTaskModal(null);
  };
  const saveProject = (data: ProjectInput, existing?: Project) => {
    if (!hasProjectName(data.name)) { setNotice('Add a project name to continue.'); return; }
    if (existing) { setStore(s => updateProject(s, existing.id, data)); setNotice('Project updated'); }
    else { const id = `project-${Date.now()}`; setStore(s => addProject(s, data, id, dateOffset(0))); setNotice('Project created'); setLocation(`/projects/${id}`); }
    setProjectModal(null);
  };
  const deleteConfirmed = () => {
    if (!confirm) return;
    if (confirm.kind === 'task') { setStore(s => deleteTask(s, confirm.id)); setDrawerTask(null); setNotice('Task deleted'); }
    else { setStore(s => deleteProject(s, confirm.id)); if (location === `/projects/${confirm.id}`) setLocation('/projects'); setNotice('Project and its tasks deleted'); }
    setConfirm(null);
  };
  const openTask = (task: Task) => { setDrawerTask(task); };
  const toggleTheme = () => setStore(toggleWorkspaceTheme);
  const authRoute = location === '/login' || location === '/signup';

  const storageWarning = storageProblem && <div className="storage-warning" role="alert">
    <strong>{storageProblem === 'conflict' ? 'Your workspace changed in another tab. Changes here are not saved.' : 'Your changes are not saved. This browser could not safely save your workspace.'}</strong>
    <p>Keep this tab open to retain your current work. Download a copy before reloading.</p>
    <button className="button" onClick={() => downloadWorkspace(JSON.stringify(store))}>Download current workspace</button>
  </div>;
  if (storageProblem === 'invalid') return <main className="content"><section className="panel" style={{ padding: 24 }} role="alert">
    <h1 className="page-title display">Your saved workspace could not be read</h1>
    <p>Your saved data has been kept unchanged. Download a copy for recovery before making any changes to browser storage.</p>
    <button className="button" onClick={() => downloadWorkspace(loaded.raw!)}>Download saved data</button>
    <button className="button" onClick={() => window.location.reload()}>Try again</button>
  </section></main>;
  if (authRoute) return <>{storageWarning}<AuthScreen key={location} mode={location === '/signup' ? 'signup' : 'login'} profile={store.profile} onSave={profile => { setStore(s => replaceProfile(s, profile)); setNotice('Your demo workspace is ready'); setLocation('/'); }} /></>;

  const pageTitle = location === '/' ? 'Your workspace' : location === '/projects' ? 'Projects' : location === '/tasks' ? 'All tasks' : location === '/settings' ? 'Settings' : 'Project workspace';
  return (
    <div className="app-shell">
      <aside className="sidebar" inert={!!(drawerTask || taskModal || projectModal || confirm)}>
        <Link href="/" className="brand-mark" data-testid="link-brand"><span className="brand-glyph"><Command size={17} strokeWidth={2.7} /></span><span>taskflow</span></Link>
        <div className="nav-label">Workspace</div>
        <Navigation location={location} projects={store.projects} />
        <div className="nav-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Your projects <button className="icon-button" aria-label="Create project" data-testid="button-create-project-nav" onClick={() => setProjectModal('new')}><Plus size={15} /></button></div>
        <div>{store.projects.map(p => <Link href={`/projects/${p.id}`} className="project-nav" key={p.id} data-testid={`link-project-${p.id}`}><span className="project-dot" style={{ background: p.color }} /><span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</span></Link>)}</div>
        <div style={{ flex: 1 }} />
        <div className="panel" style={{ padding: 12, margin: '14px 3px 15px', background: 'hsl(var(--accent) / .5)' }}>
          <div style={{ display: 'flex', gap: 9, alignItems: 'center' }}><span className="brand-glyph" style={{ width: 25, height: 25, background: 'hsl(var(--card))', color: 'hsl(var(--primary))' }}><Sparkles size={13} /></span><div><div style={{ fontSize: 11, fontWeight: 700 }}>A little progress</div><div className="subtle" style={{ fontSize: 10 }}>adds up every day.</div></div></div>
        </div>
        <ProfileFooter profile={store.profile} theme={store.theme} toggleTheme={toggleTheme} />
      </aside>
      <main className="main-area" inert={!!(drawerTask || taskModal || projectModal || confirm)}>{storageWarning}<div className="save-state" role="status" data-testid="workspace-save-state">{storageProblem ? 'Changes not saved' : saving ? 'Saving changes…' : 'All changes saved locally'}</div>
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <button className="icon-button menu-mobile" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle navigation" data-testid="button-mobile-menu"><Menu size={20} /></button>
            <div className="eyebrow">{pageTitle}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button className="button button-quiet desktop-only" onClick={() => setTaskModal('new')} data-testid="button-quick-add"><Plus size={15} /> New task</button>
            <button className="icon-button" aria-label={store.theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'} onClick={toggleTheme} data-testid="button-theme-toggle">{store.theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}</button>
            <Link href="/settings" className="avatar" aria-label="Open profile settings" data-testid="link-profile-avatar">{store.profile.avatar || initials(store.profile.name)}</Link>
          </div>
        </header>
        {mobileMenu && <div className="mobile-menu-panel"><Navigation location={location} projects={store.projects} onNavigate={() => setMobileMenu(false)} /></div>}
        <Switch>
          <Route path="/"><Dashboard store={store} onOpenTask={openTask} onToggleTask={id => patchTask(id, { status: store.tasks.find(t => t.id === id)?.status === 'done' ? 'todo' : 'done' })} onCreateTask={() => setTaskModal('new')} onNavigate={setLocation} /></Route>
          <Route path="/projects"><ProjectsPage store={store} onCreate={() => setProjectModal('new')} onEdit={p => setProjectModal(p)} onDelete={id => setConfirm({ kind: 'project', id })} onNavigate={setLocation} /></Route>
          <Route path="/projects/:id">{params => <ProjectBoard project={store.projects.find(p => p.id === params.id)} tasks={projectTasks(store.tasks, params.id)} allProjects={store.projects} onMove={patchTask} onOpenTask={openTask} onCreateTask={() => setTaskModal('new')} onEditProject={p => setProjectModal(p)} onDeleteProject={id => setConfirm({ kind: 'project', id })} onNavigate={setLocation} />}</Route>
          <Route path="/tasks"><TasksPage store={store} query={search} setQuery={setSearch} onOpenTask={openTask} onToggleTask={id => patchTask(id, { status: store.tasks.find(t => t.id === id)?.status === 'done' ? 'todo' : 'done' })} onCreateTask={() => setTaskModal('new')} /></Route>
          <Route path="/settings"><SettingsPage store={store} setStore={setStore} toggleTheme={toggleTheme} storageProblem={!!storageProblem} saving={saving} onNotify={setNotice} /></Route>
          <Route component={NotFound} />
        </Switch>
      </main>
      <nav className="mobile-nav" inert={!!(drawerTask || taskModal || projectModal || confirm)}>
        <MobileLink href="/" active={location === '/'} icon={<LayoutDashboard />} label="Home" />
        <MobileLink href="/projects" active={location.startsWith('/projects')} icon={<FolderKanban />} label="Projects" />
        <MobileLink href="/tasks" active={location === '/tasks'} icon={<ListTodo />} label="Tasks" />
        <MobileLink href="/settings" active={location === '/settings'} icon={<Settings2 />} label="Settings" />
      </nav>
      {drawerTask && <TaskDrawer task={store.tasks.find(t => t.id === drawerTask.id) || drawerTask} projects={store.projects} inactive={!!(taskModal || confirm)} onClose={() => setDrawerTask(null)} onEdit={t => setTaskModal(t)} onDelete={id => setConfirm({ kind: 'task', id })} onUpdate={patchTask} />}
      {taskModal && <TaskForm task={taskModal === 'new' ? undefined : taskModal} projects={store.projects} defaultProjectId={store.projects.find(p => p.id === projectRoute?.id)?.id} onClose={() => setTaskModal(null)} onSave={saveTask} />}
      {projectModal && <ProjectForm project={projectModal === 'new' ? undefined : projectModal} onClose={() => setProjectModal(null)} onSave={saveProject} />}
      {confirm && <ConfirmDialog title={confirm.kind === 'task' ? 'Delete this task?' : 'Delete this project?'} description={confirm.kind === 'task' ? 'This task will be permanently removed from your workspace.' : 'This will also remove every task inside the project.'} onCancel={() => setConfirm(null)} onConfirm={deleteConfirmed} />}
      {notice && <div className="toast-stack"><div className="toast-item" role="status" data-testid="status-toast">{notice}</div></div>}
    </div>
  );
}

function Navigation({ location, projects, onNavigate }: { location: string; projects: Project[]; onNavigate?: () => void }) {
  const entries = [{ href: '/', label: 'Overview', icon: LayoutDashboard }, { href: '/projects', label: 'Projects', icon: FolderKanban }, { href: '/tasks', label: 'Tasks', icon: ListTodo }, { href: '/settings', label: 'Settings', icon: Settings2 }];
  return <div>{entries.map(e => { const active = e.href === '/' ? location === '/' : location === e.href || (e.href === '/projects' && location.startsWith('/projects/')); const Icon = e.icon; return <Link key={e.href} href={e.href} onClick={onNavigate} className={`nav-link ${active ? 'active' : ''}`} data-testid={`nav-${e.label.toLowerCase()}`}><Icon size={17} strokeWidth={1.9} />{e.label}{e.href === '/tasks' && <span style={{ marginLeft: 'auto', font: '11px var(--app-font-mono)', opacity: .75 }}>{projects.length ? '' : ''}</span>}</Link>; })}</div>;
}
function MobileLink({ href, active, icon, label }: { href: string; active: boolean; icon: ReactNode; label: string }) { return <Link href={href} className={`nav-link ${active ? 'active' : ''}`} data-testid={`mobile-nav-${label.toLowerCase()}`}>{icon}{label}</Link>; }
function ProfileFooter({ profile, theme, toggleTheme }: { profile: Profile; theme: string; toggleTheme: () => void }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '10px 7px 2px', borderTop: '1px solid hsl(var(--border))' }}><span className="avatar">{profile.avatar || initials(profile.name)}</span><div style={{ minWidth: 0, flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700 }}>{profile.name}</div><div className="subtle" style={{ fontSize: 10, overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.email}</div></div><button className="icon-button" onClick={toggleTheme} aria-label="Toggle theme" data-testid="button-sidebar-theme">{theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}</button></div>;
}

function Dashboard({ store, onOpenTask, onToggleTask, onCreateTask, onNavigate }: { store: Store; onOpenTask: (t: Task) => void; onToggleTask: (id: string) => void; onCreateTask: () => void; onNavigate: (path: string) => void }) {
  const tasks = store.tasks;
  const { done, active, open, completedPct } = taskCounts(tasks);
  const { upcoming, recent } = dashboardTasks(tasks);
  return <div className="content">
    <section style={{ display: 'flex', justifyContent: 'space-between', gap: 18, alignItems: 'end', marginBottom: 27 }}>
      <div><div className="eyebrow" style={{ marginBottom: 10 }}>A good day to make progress</div><h1 className="page-title display">Good morning, {store.profile.name.split(' ')[0]}.</h1><p className="subtle" style={{ margin: '10px 0 0' }}>Here’s the shape of your work right now.</p></div>
      <button className="button button-primary" onClick={onCreateTask} data-testid="button-add-task-dashboard"><Plus size={16} /> Add a task</button>
    </section>
    <section className="metric-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12, marginBottom: 22 }}>
      <Metric label="Open tasks" value={open} detail="across your projects" icon={<ListTodo size={17} />} />
      <Metric label="In progress" value={active} detail="moving forward today" icon={<Activity size={17} />} />
      <Metric label="Completed" value={done} detail="tasks finished" icon={<CheckCheck size={17} />} />
      <div className="panel metric-card"><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span className="eyebrow">Overall progress</span><span style={{ color: 'hsl(var(--primary))' }}><Zap size={17} /></span></div><div className="metric-value">{completedPct}<span style={{ fontSize: 15, letterSpacing: 0 }}>%</span></div><div className="progress-track" style={{ marginTop: 9 }}><div className="progress-fill" style={{ width: `${completedPct}%` }} /></div></div>
    </section>
     <section className="dashboard-panels" style={{ marginBottom: 22 }}>
      <div className="panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '17px 18px', borderBottom: '1px solid hsl(var(--border))' }}><div><div style={{ fontWeight: 700 }}>Your projects</div><div className="subtle" style={{ fontSize: 12, marginTop: 3 }}>A quick pulse on what’s moving</div></div><Link className="button button-quiet" href="/projects" data-testid="link-all-projects">All projects <ArrowRight size={14} /></Link></div>
        {store.projects.length ? <div style={{ padding: '2px 18px 8px' }}>{store.projects.slice(0, 4).map(project => {
          const pt = projectTasks(tasks, project.id), { completedPct: pct } = taskCounts(pt);
           return <button key={project.id} onClick={() => onNavigate(`/projects/${project.id}`)} data-testid={`project-summary-${project.id}`} className="project-summary-row">
             <span className="project-summary-icon" style={{ color: project.color, background: `${project.color}18` }}>{project.icon || project.name[0]}</span><span style={{ minWidth: 0 }}><span style={{ display: 'block', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.name}</span><span className="subtle" style={{ fontSize: 11 }}>{pt.length} tasks</span></span><span className="project-summary-progress"><span className="progress-track" style={{ display: 'block' }}><span className="progress-fill" style={{ width: `${pct}%`, display: 'block' }} /></span><span className="subtle" style={{ fontSize: 10, marginTop: 5, display: 'block' }}>{pct}% complete</span></span><ArrowUpRight size={15} className="subtle" /></button>;
        })}</div> : <EmptyState title="Start with a project" detail="Give your work a home, then add the first task." action="Create project" onClick={() => onNavigate('/projects')} />}
      </div>
      <div className="panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '17px 18px', borderBottom: '1px solid hsl(var(--border))' }}><div><div style={{ fontWeight: 700 }}>Coming up</div><div className="subtle" style={{ fontSize: 12, marginTop: 3 }}>Deadlines on your horizon</div></div><CalendarDays size={17} className="subtle" /></div>
        {upcoming.length ? upcoming.map(task => <button key={task.id} onClick={() => onOpenTask(task)} className="task-row" style={{ width: '100%', background: 'transparent', border: 0, color: 'inherit', textAlign: 'left' }} data-testid={`upcoming-task-${task.id}`}><span className="eyebrow" style={{ width: 42, textAlign: 'center', fontSize: 10 }}>{dayString(task.dueDate)}</span><span style={{ minWidth: 0, flex: 1 }}><span style={{ display: 'block', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{task.title}</span><span className="subtle" style={{ fontSize: 11 }}>{store.projects.find(p => p.id === task.projectId)?.name || 'No project'}</span></span><PriorityBadge priority={task.priority} /></button>) : <EmptyState title="Clear skies ahead" detail="No upcoming deadlines. Add dates to keep the important work in view." />}
      </div>
    </section>
    <section className="panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '17px 18px', borderBottom: '1px solid hsl(var(--border))' }}><div><div style={{ fontWeight: 700 }}>Recently touched</div><div className="subtle" style={{ fontSize: 12, marginTop: 3 }}>The work you’ve been moving</div></div><Link href="/tasks" className="button button-quiet" data-testid="link-view-all-tasks">View all tasks <ArrowRight size={14} /></Link></div>
      {recent.length ? recent.map(task => <TaskListRow key={task.id} task={task} project={store.projects.find(p => p.id === task.projectId)} onOpen={() => onOpenTask(task)} onToggle={() => onToggleTask(task.id)} />) : <EmptyState title="Nothing on the board yet" detail="Create a task and make the first move." action="Add a task" onClick={onCreateTask} />}
    </section>
  </div>;
}
function Metric({ label, value, detail, icon }: { label: string; value: number; detail: string; icon: ReactNode }) { return <div className="panel metric-card"><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span className="eyebrow">{label}</span><span className="subtle">{icon}</span></div><div className="metric-value">{value}</div><div className="subtle" style={{ fontSize: 11, marginTop: 2 }}>{detail}</div></div>; }
function EmptyState({ title, detail, action, onClick }: { title: string; detail: string; action?: string; onClick?: () => void }) { return <div style={{ padding: '30px 22px', textAlign: 'center' }}><div style={{ margin: '0 auto 11px', width: 37, height: 37, borderRadius: 11, display: 'grid', placeItems: 'center', background: 'hsl(var(--accent))', color: 'hsl(var(--primary))' }}><Sparkles size={18} /></div><div style={{ fontWeight: 700 }}>{title}</div><p className="subtle" style={{ fontSize: 12, margin: '6px auto 12px', maxWidth: 270 }}>{detail}</p>{action && onClick && <button className="button" onClick={onClick}>{action}</button>}</div>; }
function PriorityBadge({ priority }: { priority: Priority }) { return <span className={`badge priority-${priority}`} data-testid={`priority-${priority}`}>{priority[0].toUpperCase() + priority.slice(1)}</span>; }
function StatusBadge({ status }: { status: Status }) { const item = statuses.find(s => s.id === status)!; const Icon = item.icon; return <span className={`badge ${item.className}`}><Icon size={11} />{item.name}</span>; }
function TaskListRow({ task, project, onOpen, onToggle }: { task: Task; project?: Project; onOpen: () => void; onToggle: () => void }) {
  return <div className="task-row" data-testid={`task-row-${task.id}`}><button className={`task-check ${task.status === 'done' ? 'checked' : ''}`} aria-label={task.status === 'done' ? 'Mark task not done' : 'Mark task done'} onClick={onToggle} data-testid={`button-toggle-task-${task.id}`}>{task.status === 'done' && <Check size={12} />}</button><button onClick={onOpen} style={{ flex: 1, minWidth: 0, textAlign: 'left', background: 'transparent', border: 0, padding: 0, color: 'inherit' }} data-testid={`button-open-task-${task.id}`}><span style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}><span style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textDecoration: task.status === 'done' ? 'line-through' : 'none', opacity: task.status === 'done' ? .65 : 1 }}>{task.title}</span></span><span className="subtle" style={{ display: 'block', fontSize: 11, marginTop: 4 }}>{project?.name || 'No project'}{task.dueDate ? ` · Due ${dayString(task.dueDate)}` : ''}</span></button><StatusBadge status={task.status} /><PriorityBadge priority={task.priority} /></div>;
}

function ProjectsPage({ store, onCreate, onEdit, onDelete, onNavigate }: { store: Store; onCreate: () => void; onEdit: (p: Project) => void; onDelete: (id: string) => void; onNavigate: (path: string) => void }) {
  return <div className="content"><div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 16, marginBottom: 28 }}><div><div className="eyebrow" style={{ marginBottom: 10 }}>Where the work lives</div><h1 className="page-title display">Projects</h1><p className="subtle" style={{ marginTop: 8 }}>Small containers for the things you want to move forward.</p></div><button className="button button-primary" onClick={onCreate} data-testid="button-create-project"><Plus size={16} /> New project</button></div>
    {store.projects.length ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: 14 }}>{store.projects.map(p => { const tasks = projectTasks(store.tasks, p.id), { completedPct: pct } = taskCounts(tasks); return <article key={p.id} className="panel" data-testid={`card-project-${p.id}`} style={{ padding: 19, cursor: 'pointer' }} onClick={() => onNavigate(`/projects/${p.id}`)}><div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}><div style={{ width: 42, height: 42, borderRadius: 12, background: `${p.color}1c`, color: p.color, display: 'grid', placeItems: 'center', font: '800 17px var(--app-font-display)' }}>{p.icon || p.name[0]}</div><div style={{ display: 'flex', gap: 2 }}><button className="icon-button" onClick={e => { e.stopPropagation(); onEdit(p); }} aria-label={`Edit ${p.name}`} data-testid={`button-edit-project-${p.id}`}><Pencil size={15} /></button><button className="icon-button" onClick={e => { e.stopPropagation(); onDelete(p.id); }} aria-label={`Delete ${p.name}`} data-testid={`button-delete-project-${p.id}`}><Trash2 size={15} /></button></div></div><h2 className="display" style={{ fontSize: 20, margin: '17px 0 5px' }}><Link href={`/projects/${p.id}`} onClick={e => e.stopPropagation()} className="card-title-action">{p.name}</Link></h2><p className="subtle" style={{ margin: 0, minHeight: 38, lineHeight: 1.5 }}>{p.description || 'A place to gather related work and keep it moving.'}</p><div style={{ display: 'flex', justifyContent: 'space-between', margin: '22px 0 8px', fontSize: 11 }}><span className="subtle">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</span><span style={{ fontWeight: 700 }}>{pct}%</span></div><div className="progress-track"><div className="progress-fill" style={{ width: `${pct}%` }} /></div><div style={{ display: 'flex', gap: 6, marginTop: 15 }}>{statuses.map(s => <span key={s.id} className={`badge ${s.className}`}>{tasksByStatus(tasks, s.id).length} {s.name}</span>)}</div></article>; })}</div> : <div className="panel"><EmptyState title="A project gives your work a home" detail="Start with something you’re making, planning, or figuring out." action="Create your first project" onClick={onCreate} /></div>}
  </div>;
}

function ProjectBoard({ project, tasks, allProjects, onMove, onOpenTask, onCreateTask, onEditProject, onDeleteProject, onNavigate }: { project?: Project; tasks: Task[]; allProjects: Project[]; onMove: (id: string, changes: Partial<Task>) => void; onOpenTask: (t: Task) => void; onCreateTask: () => void; onEditProject: (p: Project) => void; onDeleteProject: (id: string) => void; onNavigate: (path: string) => void }) {
  const [dragging, setDragging] = useState<string | null>(null);
  if (!project) return <div className="content"><div className="panel"><EmptyState title="This project has moved" detail="It may have been deleted, or the link may be out of date." action="Browse projects" onClick={() => onNavigate('/projects')} /></div></div>;
  const { done: completed } = taskCounts(tasks);
  return <div className="content"><div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 7 }}><span style={{ width: 38, height: 38, display: 'grid', placeItems: 'center', borderRadius: 11, color: project.color, background: `${project.color}1c`, fontWeight: 800 }}>{project.icon}</span><span className="eyebrow">{project.name}</span><div style={{ marginLeft: 'auto', display: 'flex', gap: 7 }}><button className="button" onClick={onCreateTask} data-testid="button-add-task-project"><Plus size={15} /> Add task</button><button className="icon-button" aria-label="Edit project" onClick={() => onEditProject(project)} data-testid="button-edit-current-project"><MoreHorizontal size={18} /></button><button className="icon-button" aria-label="Delete project" onClick={() => onDeleteProject(project.id)} data-testid="button-delete-current-project"><Trash2 size={16} /></button></div></div>
    <h1 className="page-title display">{project.name}</h1><p className="subtle" style={{ marginTop: 7 }}>{project.description || 'Keep related work in one thoughtful place.'}</p>
    <div style={{ display: 'flex', gap: 18, alignItems: 'center', margin: '22px 0 25px', flexWrap: 'wrap' }}><span className="subtle" style={{ fontSize: 12 }}>{tasks.length} tasks</span><span className="subtle" style={{ fontSize: 12 }}>{completed} completed</span><div className="progress-track" style={{ width: 130 }}><div className="progress-fill" style={{ width: `${tasks.length ? completed / tasks.length * 100 : 0}%` }} /></div><span className="eyebrow">{tasks.length ? Math.round(completed / tasks.length * 100) : 0}% complete</span></div>
    <div className="board" data-testid="board-project"><div style={{ display: 'contents' }}>{statuses.map(status => { const items = tasksByStatus(tasks, status.id); const Icon = status.icon; return <section key={status.id} className="board-column" onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); const id = e.dataTransfer.getData('text/plain') || dragging; if (id) onMove(id, { status: status.id }); setDragging(null); }} data-testid={`column-${status.id}`}><div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 2px 7px' }}><span style={{ color: 'hsl(var(--muted-foreground))' }}><Icon size={15} /></span><span style={{ fontWeight: 700, fontSize: 12 }}>{status.name}</span><span className="subtle" style={{ font: '11px var(--app-font-mono)', marginLeft: 1 }}>{items.length}</span>{status.id === 'todo' && <button className="icon-button" style={{ marginLeft: 'auto', width: 26, height: 26 }} onClick={onCreateTask} aria-label="Add task" data-testid="button-add-task-column"><Plus size={15} /></button>}</div>
      {items.map(task => <article className="task-card" draggable onDragStart={e => { setDragging(task.id); e.dataTransfer.setData('text/plain', task.id); }} onDragEnd={() => setDragging(null)} key={task.id} onClick={() => onOpenTask(task)} data-testid={`board-task-${task.id}`}><div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><button className="card-title-action" style={{ fontWeight: 600, lineHeight: 1.45, textAlign: 'left' }} onClick={e => { e.stopPropagation(); onOpenTask(task); }}>{task.title}</button><GripVertical size={15} className="subtle" style={{ flex: 'none' }} /></div>{task.description && <p className="subtle" style={{ fontSize: 11, lineHeight: 1.45, margin: '8px 0 10px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{task.description}</p>}<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6, marginTop: 11 }}><PriorityBadge priority={task.priority} />{task.dueDate && <span className="subtle" style={{ fontSize: 10, display: 'inline-flex', gap: 4, alignItems: 'center' }}><CalendarDays size={12} />{dayString(task.dueDate)}</span>}</div><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 11 }}><span className="subtle" style={{ fontSize: 10 }}>{task.assignee || 'Unassigned'}</span><select aria-label={`Change status for ${task.title}`} data-testid={`select-task-status-${task.id}`} className="field" value={task.status} onClick={e => e.stopPropagation()} onChange={e => onMove(task.id, { status: e.target.value as Status })} style={{ width: 100, padding: '4px 5px', fontSize: 10 }}>{statuses.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div></article>)}
      {!items.length && <div style={{ textAlign: 'center', padding: '23px 6px', color: 'hsl(var(--muted-foreground))', fontSize: 11, border: '1px dashed hsl(var(--border))', borderRadius: 8, marginTop: 10 }}>Drop a task here</div>}
    </section>; })}</div></div>
    <p className="subtle" style={{ marginTop: 16, fontSize: 11 }}><GripVertical size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />Drag tasks between columns, or use the status menu on each card.</p>
  </div>;
}

function TasksPage({ store, query, setQuery, onOpenTask, onToggleTask, onCreateTask }: { store: Store; query: string; setQuery: (v: string) => void; onOpenTask: (t: Task) => void; onToggleTask: (id: string) => void; onCreateTask: () => void }) {
  const [status, setStatus] = useState('all'), [priority, setPriority] = useState('all'), [project, setProject] = useState('all');
  const [sort, setSort] = useState('updated');
  const filtered = useMemo(() => filterTasks(store, { query, status, priority, project, sort }), [store, query, status, priority, project, sort]);
  return <div className="content"><div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 15, marginBottom: 26 }}><div><div className="eyebrow" style={{ marginBottom: 10 }}>Keep the next thing visible</div><h1 className="page-title display">All tasks</h1><p className="subtle" style={{ marginTop: 8 }}>{store.tasks.length} pieces of work across {store.projects.length} projects.</p></div><button className="button button-primary" onClick={onCreateTask} data-testid="button-create-task"><Plus size={15} /> New task</button></div>
    <div className="panel" style={{ padding: 12, marginBottom: 14, display: 'flex', flexWrap: 'wrap', gap: 8 }}><div style={{ position: 'relative', flex: '1 1 210px' }}><Search size={16} className="subtle" style={{ position: 'absolute', left: 11, top: 11 }} /><input value={query} onChange={e => setQuery(e.target.value)} className="field" style={{ paddingLeft: 36 }} placeholder="Search tasks or projects" aria-label="Search tasks" data-testid="input-task-search" /></div><select className="field" style={{ width: 'auto', minWidth: 130 }} value={status} onChange={e => setStatus(e.target.value)} aria-label="Filter by status" data-testid="filter-task-status"><option value="all">All statuses</option>{statuses.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select><select className="field" style={{ width: 'auto', minWidth: 130 }} value={priority} onChange={e => setPriority(e.target.value)} aria-label="Filter by priority" data-testid="filter-task-priority"><option value="all">All priorities</option>{priorities.map(p => <option key={p} value={p}>{p[0].toUpperCase() + p.slice(1)}</option>)}</select><select className="field" style={{ width: 'auto', minWidth: 145 }} value={project} onChange={e => setProject(e.target.value)} aria-label="Filter by project" data-testid="filter-task-project"><option value="all">All projects</option>{store.projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select><select className="field" style={{ width: 'auto', minWidth: 130 }} value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort tasks" data-testid="sort-tasks"><option value="updated">Recently updated</option><option value="due">Due date</option><option value="priority">Priority</option></select></div>
    <div className="panel"><div style={{ padding: '13px 16px', borderBottom: '1px solid hsl(var(--border))', display: 'flex', justifyContent: 'space-between' }}><span className="eyebrow">Tasks</span><span className="eyebrow">{filtered.length} results</span></div>{filtered.length ? filtered.map(task => <TaskListRow key={task.id} task={task} project={store.projects.find(p => p.id === task.projectId)} onOpen={() => onOpenTask(task)} onToggle={() => onToggleTask(task.id)} />) : <EmptyState title={store.tasks.length ? 'No tasks match those filters' : 'Your task list is a blank page'} detail={store.tasks.length ? 'Try a different search or loosen one of the filters.' : 'Add a task to turn an idea into a next step.'} action="Create a task" onClick={onCreateTask} />}</div>
  </div>;
}

function TaskDrawer({ task, projects, inactive, onClose, onEdit, onDelete, onUpdate }: { task: Task; projects: Project[]; inactive: boolean; onClose: () => void; onEdit: (t: Task) => void; onDelete: (id: string) => void; onUpdate: (id: string, changes: Partial<Task>) => void }) {
  const dialogRef = useRef<HTMLElement>(null);
  useDialogFocus(dialogRef, onClose);
  const project = projects.find(p => p.id === task.projectId);
  return <div className="overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}><aside inert={inactive} ref={dialogRef} data-dialog-layer tabIndex={-1} className="drawer" role="dialog" aria-modal="true" aria-label="Task details" data-testid="drawer-task-details"><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', borderBottom: '1px solid hsl(var(--border))' }}><span className="eyebrow">Task details</span><button className="icon-button" onClick={onClose} aria-label="Close task details" data-testid="button-close-task-drawer"><X size={18} /></button></div><div style={{ padding: '27px 26px' }}><div style={{ display: 'flex', gap: 8, marginBottom: 18 }}><StatusBadge status={task.status} /><PriorityBadge priority={task.priority} /></div><h2 className="display" style={{ fontSize: 30, lineHeight: 1.17, margin: '0 0 14px' }} data-testid={`text-task-title-${task.id}`}>{task.title}</h2><p className="subtle" style={{ lineHeight: 1.7, whiteSpace: 'pre-wrap', marginBottom: 26 }}>{task.description || 'No description yet.'}</p>
      <label className="label">Status</label><select className="field" value={task.status} onChange={e => onUpdate(task.id, { status: e.target.value as Status })} data-testid="select-drawer-task-status">{statuses.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 20 }}><div><label className="label">Priority</label><select className="field" value={task.priority} onChange={e => onUpdate(task.id, { priority: e.target.value as Priority })} data-testid="select-drawer-task-priority">{priorities.map(p => <option key={p} value={p}>{p[0].toUpperCase() + p.slice(1)}</option>)}</select></div><div><label className="label">Due date</label><input className="field" type="date" value={task.dueDate || ''} onChange={e => onUpdate(task.id, { dueDate: e.target.value || undefined })} data-testid="input-drawer-task-date" /></div></div>
      <div style={{ marginTop: 20 }}><label className="label">Project</label><select className="field" value={task.projectId} onChange={e => onUpdate(task.id, { projectId: e.target.value })} data-testid="select-drawer-task-project">{task.projectId === '' && <option value="">No project</option>}{projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
      <div style={{ marginTop: 20 }}><label className="label">Assignee</label><input className="field" value={task.assignee || ''} placeholder="Unassigned" onChange={e => onUpdate(task.id, { assignee: e.target.value })} data-testid="input-drawer-assignee" /></div>
      <div className="panel" style={{ padding: 13, marginTop: 25, display: 'flex', justifyContent: 'space-between' }}><span className="subtle" style={{ fontSize: 11 }}>Created {dayString(task.createdAt)}</span><span className="subtle" style={{ fontSize: 11 }}>Updated {dayString(task.updatedAt)}</span></div>
      <div style={{ display: 'flex', gap: 8, marginTop: 24 }}><button className="button button-primary" onClick={() => onEdit(task)} data-testid="button-edit-task"><Pencil size={14} /> Edit task</button><button className="button button-danger" onClick={() => onDelete(task.id)} data-testid="button-delete-task"><Trash2 size={14} /> Delete</button></div>
    </div></aside></div>;
}

function TaskForm({ task, projects, defaultProjectId, onClose, onSave }: { task?: Task; projects: Project[]; defaultProjectId?: string; onClose: () => void; onSave: (data: TaskInput, existing?: Task) => void }) {
  const [title, setTitle] = useState(task?.title || ''), [description, setDescription] = useState(task?.description || ''), [status, setStatus] = useState<Status>(task?.status || 'todo'), [priority, setPriority] = useState<Priority>(task?.priority || 'medium'), [dueDate, setDueDate] = useState(task?.dueDate || ''), [projectId, setProjectId] = useState(task?.projectId ?? defaultProjectId ?? projects[0]?.id ?? ''), [assignee, setAssignee] = useState(task?.assignee || '');
  const dialogRef = useRef<HTMLFormElement>(null);
  useDialogFocus(dialogRef, onClose);
  const submit = (e: React.FormEvent) => { e.preventDefault(); onSave({ title, description, status, priority, dueDate: dueDate || undefined, projectId, assignee }, task); };
  return <div className="modal-wrap" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}><form ref={dialogRef} data-dialog-layer tabIndex={-1} role="dialog" aria-modal="true" aria-label={task ? 'Edit task' : 'New task'} className="modal" onSubmit={submit} data-testid="form-task"><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 22 }}><div><div className="eyebrow">{task ? 'Refine the details' : 'Make a next step'}</div><h2 className="display" style={{ margin: '7px 0 0', fontSize: 25 }}>{task ? 'Edit task' : 'New task'}</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label="Close" data-testid="button-close-task-form"><X size={18} /></button></div>
    <label className="label" htmlFor="task-title">Title <span style={{ color: 'hsl(var(--destructive))' }}>*</span></label><input id="task-title" className="field" value={title} onChange={e => setTitle(e.target.value)} required autoFocus placeholder="What needs to happen?" data-testid="input-task-title" />
    <label className="label" htmlFor="task-description" style={{ marginTop: 16 }}>Description</label><textarea id="task-description" className="field" rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="Add a little context…" data-testid="input-task-description" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 15 }}><div><label className="label">Status</label><select className="field" value={status} onChange={e => setStatus(e.target.value as Status)} data-testid="input-task-status">{statuses.map(s => <option value={s.id} key={s.id}>{s.name}</option>)}</select></div><div><label className="label">Priority</label><select className="field" value={priority} onChange={e => setPriority(e.target.value as Priority)} data-testid="input-task-priority">{priorities.map(p => <option value={p} key={p}>{p[0].toUpperCase() + p.slice(1)}</option>)}</select></div></div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 15 }}><div><label className="label">Project</label><select className="field" value={projectId} onChange={e => setProjectId(e.target.value)} data-testid="input-task-project">{task?.projectId === '' && projects.length > 0 && <option value="">No project</option>}{projects.length ? projects.map(p => <option value={p.id} key={p.id}>{p.name}</option>) : <option value="">No project</option>}</select></div><div><label className="label">Due date</label><input type="date" className="field" value={dueDate} onChange={e => setDueDate(e.target.value)} data-testid="input-task-due-date" /></div></div>
    <label className="label" htmlFor="task-assignee" style={{ marginTop: 15 }}>Assignee</label><input id="task-assignee" className="field" value={assignee} onChange={e => setAssignee(e.target.value)} placeholder="Your name" data-testid="input-task-assignee" />
    <div style={{ display: 'flex', justifyContent: 'end', gap: 8, marginTop: 23 }}><button type="button" className="button" onClick={onClose} data-testid="button-cancel-task">Cancel</button><button type="submit" className="button button-primary" data-testid="button-save-task">{task ? 'Save changes' : 'Create task'}</button></div>
  </form></div>;
}

function ProjectForm({ project, onClose, onSave }: { project?: Project; onClose: () => void; onSave: (data: ProjectInput, existing?: Project) => void }) {
  const [name, setName] = useState(project?.name || ''), [description, setDescription] = useState(project?.description || ''), [color, setColor] = useState(project?.color || PROJECT_COLORS[0]), [icon, setIcon] = useState(project?.icon || 'N');
  const dialogRef = useRef<HTMLFormElement>(null);
  useDialogFocus(dialogRef, onClose);
  const submit = (e: React.FormEvent) => { e.preventDefault(); onSave({ name, description, color, icon: icon.toUpperCase().slice(0, 1) || name[0]?.toUpperCase() || 'P' }, project); };
  return <div className="modal-wrap" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}><form ref={dialogRef} data-dialog-layer tabIndex={-1} role="dialog" aria-modal="true" aria-label={project ? 'Edit project' : 'New project'} className="modal" onSubmit={submit} data-testid="form-project"><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 22 }}><div><div className="eyebrow">Give the work a home</div><h2 className="display" style={{ margin: '7px 0 0', fontSize: 25 }}>{project ? 'Edit project' : 'New project'}</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label="Close" data-testid="button-close-project-form"><X size={18} /></button></div>
    <label className="label">Project name <span style={{ color: 'hsl(var(--destructive))' }}>*</span></label><input className="field" required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. A new idea" autoFocus data-testid="input-project-name" /><label className="label" style={{ marginTop: 15 }}>Description</label><textarea className="field" rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="What are you working toward?" data-testid="input-project-description" />
    <label className="label" style={{ marginTop: 16 }}>Mark and color</label><div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><input maxLength={1} className="field" value={icon} onChange={e => setIcon(e.target.value)} style={{ width: 57, textAlign: 'center', fontWeight: 800, color }} aria-label="Project initial" data-testid="input-project-icon" /><div style={{ display: 'flex', gap: 8 }}>{PROJECT_COLORS.map(c => <button type="button" key={c} onClick={() => setColor(c)} aria-label={`Choose ${c} project color`} data-testid={`button-color-${c.slice(1)}`} style={{ width: 25, height: 25, background: c, border: color === c ? '3px solid hsl(var(--foreground))' : '2px solid transparent', borderRadius: 8, boxShadow: '0 0 0 1px hsl(var(--border))' }} />)}</div></div>
    <div style={{ display: 'flex', justifyContent: 'end', gap: 8, marginTop: 24 }}><button type="button" className="button" onClick={onClose} data-testid="button-cancel-project">Cancel</button><button className="button button-primary" type="submit" data-testid="button-save-project">{project ? 'Save changes' : 'Create project'}</button></div>
  </form></div>;
}
function ConfirmDialog({ title, description, onCancel, onConfirm }: { title: string; description: string; onCancel: () => void; onConfirm: () => void }) { const dialogRef = useRef<HTMLDivElement>(null); useDialogFocus(dialogRef, onCancel); return <div className="modal-wrap" onMouseDown={e => { if (e.target === e.currentTarget) onCancel(); }}><div ref={dialogRef} data-dialog-layer tabIndex={-1} className="modal" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" style={{ width: 'min(420px,100%)' }}><div style={{ width: 39, height: 39, borderRadius: 11, background: 'hsl(var(--destructive) / .12)', color: 'hsl(var(--destructive))', display: 'grid', placeItems: 'center' }}><Trash2 size={18} /></div><h2 id="confirm-title" className="display" style={{ fontSize: 23, margin: '17px 0 7px' }}>{title}</h2><p className="subtle" style={{ lineHeight: 1.55 }}>{description}</p><div style={{ display: 'flex', justifyContent: 'end', gap: 8, marginTop: 24 }}><button className="button" onClick={onCancel} data-testid="button-cancel-delete">Keep it</button><button className="button" style={{ background: 'hsl(var(--destructive))', color: 'white', borderColor: 'hsl(var(--destructive))' }} onClick={onConfirm} data-testid="button-confirm-delete">Delete</button></div></div></div>; }

function SettingsPage({ store, setStore, toggleTheme, storageProblem, saving, onNotify }: { store: Store; setStore: React.Dispatch<React.SetStateAction<Store>>; toggleTheme: () => void; storageProblem: boolean; saving: boolean; onNotify: (s: string) => void }) {
  const [name, setName] = useState(store.profile.name), [email, setEmail] = useState(store.profile.email);
  const save = (e: React.FormEvent) => { e.preventDefault(); if (!hasValidProfile(name, email)) { onNotify('Enter a name and a valid email address.'); return; } setStore(s => replaceProfile(s, { name: name.trim(), email: email.trim(), avatar: initials(name) })); onNotify('Profile preferences saved'); };
  return <div className="content" style={{ maxWidth: 900 }}><div style={{ marginBottom: 27 }}><div className="eyebrow" style={{ marginBottom: 10 }}>Make it yours</div><h1 className="page-title display">Settings</h1><p className="subtle" style={{ marginTop: 8 }}>A few details to make your workspace feel like home.</p></div>
    <form className="panel" onSubmit={save} style={{ padding: 22, marginBottom: 15 }}><div style={{ marginBottom: 20 }}><div style={{ fontWeight: 700 }}>Profile</div><div className="subtle" style={{ fontSize: 12, marginTop: 4 }}>Your details stay on this device.</div></div><div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 19 }}><span className="avatar" style={{ width: 48, height: 48, fontSize: 14 }}>{initials(name)}</span><div><div style={{ fontWeight: 700 }}>{name || 'Your name'}</div><div className="subtle" style={{ fontSize: 12 }}>{email}</div></div></div><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13 }}><div><label className="label">Name</label><input className="field" value={name} onChange={e => setName(e.target.value)} required data-testid="input-profile-name" /></div><div><label className="label">Email</label><input className="field" type="email" value={email} onChange={e => setEmail(e.target.value)} required data-testid="input-profile-email" /></div></div><div style={{ display: 'flex', justifyContent: 'end', marginTop: 17 }}><button className="button button-primary" type="submit" data-testid="button-save-profile">Save profile</button></div></form>
    <section className="panel appearance-settings" style={{ padding: 22, marginBottom: 15 }}><div style={{ display: 'flex', justifyContent: 'space-between', gap: 15, alignItems: 'center' }}><div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><span className="brand-glyph" style={{ width: 36, height: 36, background: 'hsl(var(--accent))', color: 'hsl(var(--primary))' }}>{store.theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}</span><div><div style={{ fontWeight: 700 }}>Appearance</div><div className="subtle" style={{ fontSize: 12, marginTop: 4 }}>Choose the mood for your workspace.</div></div></div><div style={{ display: 'flex', gap: 6 }}><button className={`button ${store.theme === 'light' ? 'button-primary' : ''}`} onClick={() => { if (store.theme === 'dark') toggleTheme(); }} data-testid="button-theme-light"><Sun size={15} /> Light</button><button className={`button ${store.theme === 'dark' ? 'button-primary' : ''}`} onClick={() => { if (store.theme === 'light') toggleTheme(); }} data-testid="button-theme-dark"><Moon size={15} /> Dark</button></div></div></section>
    <section className="panel" style={{ padding: 22 }}><div style={{ display: 'flex', justifyContent: 'space-between', gap: 15, alignItems: 'center' }}><div><div style={{ fontWeight: 700 }}>Local demo workspace</div><div className="subtle" style={{ fontSize: 12, marginTop: 4 }}>Your projects and tasks are saved in this browser only.</div></div><span className="badge status-done"><CheckCircle2 size={12} /> {storageProblem ? 'Not saved' : saving ? 'Saving…' : 'Saved locally'}</span></div></section>
  </div>;
}

function AuthScreen({ mode, profile, onSave }: { mode: 'login' | 'signup'; profile: Profile; onSave: (p: Profile) => void }) {
  const [name, setName] = useState(mode === 'signup' ? '' : profile.name), [email, setEmail] = useState(mode === 'signup' ? '' : profile.email), [error, setError] = useState('');
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (!hasValidEmail(email)) { setError('Enter a valid email address to continue.'); return; } if (mode === 'signup' && !hasSignupName(name)) { setError('Add your name to get started.'); return; } onSave({ name: name.trim() || profile.name, email: email.trim(), avatar: initials(name.trim() || profile.name) }); };
  return <main className="auth-screen"><aside className="auth-art"><Link href="/" className="brand-mark" style={{ color: '#f3f0e8' }}><span className="brand-glyph" style={{ background: '#d7c887', color: '#244b3d' }}><Command size={17} strokeWidth={2.7} /></span><span>taskflow</span></Link><div className="auth-quote">Make room for the work that matters.</div><div style={{ zIndex: 1, color: 'rgba(243,240,232,.67)', fontSize: 12 }}>A calmer way to keep good work moving.</div></aside><section className="auth-form-side"><form className="auth-form" onSubmit={submit}><div className="eyebrow" style={{ marginBottom: 11 }}>Your focused workspace</div><h1 className="display" style={{ fontSize: 34, margin: '0 0 8px' }}>{mode === 'signup' ? 'Start with a small step.' : 'Welcome back.'}</h1><p className="subtle" style={{ margin: '0 0 29px', lineHeight: 1.6 }}>{mode === 'signup' ? 'Create a local demo profile. Your workspace stays on this device.' : 'Pick up right where you left off.'}</p>{mode === 'signup' && <div style={{ marginBottom: 16 }}><label className="label">Your name</label><input autoFocus className="field" required value={name} onChange={e => setName(e.target.value)} placeholder="Maya Chen" data-testid="input-signup-name" /></div>}<div style={{ marginBottom: 16 }}><label className="label">Email address</label><input autoFocus={mode === 'login'} className="field" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" data-testid={`input-${mode}-email`} /></div>{error && <div role="alert" style={{ color: 'hsl(var(--destructive))', fontSize: 12, margin: '0 0 13px' }}>{error}</div>}<button type="submit" className="button button-primary" style={{ width: '100%', padding: 12 }} data-testid={`button-${mode}-submit`}>{mode === 'signup' ? 'Create demo workspace' : 'Continue to demo'} <ArrowRight size={15} /></button><div className="subtle" style={{ textAlign: 'center', fontSize: 11, lineHeight: 1.6, marginTop: 16 }}>No password or server required. This demo lives in your browser.</div><div style={{ borderTop: '1px solid hsl(var(--border))', marginTop: 24, paddingTop: 20, textAlign: 'center', fontSize: 12 }}>{mode === 'signup' ? 'Already have a workspace?' : 'New to TaskFlow?'} <Link href={mode === 'signup' ? '/login' : '/signup'} style={{ color: 'hsl(var(--primary))', fontWeight: 700 }} data-testid={`link-auth-${mode === 'signup' ? 'login' : 'signup'}`}>{mode === 'signup' ? 'Sign in' : 'Create a demo profile'}</Link></div></form></section></main>;
}

const queryClient = new QueryClient();
function RoutedErrorBoundary({ children }: { children: ReactNode }) { const [location] = useLocation(); return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>; }
function Router() { return <RoutedErrorBoundary><Switch><Route path="/"><App /></Route><Route path="/projects"><App /></Route><Route path="/projects/:id"><App /></Route><Route path="/tasks"><App /></Route><Route path="/settings"><App /></Route><Route path="/login"><App /></Route><Route path="/signup"><App /></Route><Route component={NotFound} /></Switch></RoutedErrorBoundary>; }
function Root() { return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>; }
export default Root;
