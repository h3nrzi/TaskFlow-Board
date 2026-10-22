import { type Project, type Profile } from '@/workspace/types';
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  Settings2,
  Moon,
  Sun,
} from 'lucide-react';
import { Link } from 'wouter';
import { type ReactNode } from 'react';
import { initials } from '@/workspace/transitions';

export function Navigation({
  location,
  projects,
  onNavigate,
}: {
  location: string;
  projects: Project[];
  onNavigate?: () => void;
}) {
  const entries = [
    { href: '/', label: 'Overview', icon: LayoutDashboard },
    { href: '/projects', label: 'Projects', icon: FolderKanban },
    { href: '/tasks', label: 'Tasks', icon: ListTodo },
    { href: '/settings', label: 'Settings', icon: Settings2 },
  ];
  return (
    <div>
      {entries.map((e) => {
        const active =
          e.href === '/'
            ? location === '/'
            : location === e.href ||
              (e.href === '/projects' && location.startsWith('/projects/'));
        const Icon = e.icon;
        return (
          <Link
            key={e.href}
            href={e.href}
            onClick={onNavigate}
            className={`nav-link ${active ? 'active' : ''}`}
            data-testid={`nav-${e.label.toLowerCase()}`}
          >
            <Icon size={17} strokeWidth={1.9} />
            {e.label}
            {e.href === '/tasks' && (
              <span
                style={{
                  marginLeft: 'auto',
                  font: '11px var(--app-font-mono)',
                  opacity: 0.75,
                }}
              >
                {projects.length ? '' : ''}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}

export function MobileLink({
  href,
  active,
  icon,
  label,
}: {
  href: string;
  active: boolean;
  icon: ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`nav-link ${active ? 'active' : ''}`}
      data-testid={`mobile-nav-${label.toLowerCase()}`}
    >
      {icon}
      {label}
    </Link>
  );
}

export function ProfileFooter({
  profile,
  theme,
  toggleTheme,
}: {
  profile: Profile;
  theme: string;
  toggleTheme: () => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        padding: '10px 7px 2px',
        borderTop: '1px solid hsl(var(--border))',
      }}
    >
      <span className="avatar">{profile.avatar || initials(profile.name)}</span>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 700 }}>{profile.name}</div>
        <div
          className="subtle"
          style={{ fontSize: 10, overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {profile.email}
        </div>
      </div>
      <button
        className="icon-button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        data-testid="button-sidebar-theme"
      >
        {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
      </button>
    </div>
  );
}
