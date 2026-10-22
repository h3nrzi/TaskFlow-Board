import { type Store, type Profile } from '@/workspace/types';
import { useState } from 'react';
import { hasValidProfile } from '@/workspace/validation';
import { initials } from '@/workspace/transitions';
import { Sun, Moon, CheckCircle2 } from 'lucide-react';

export function SettingsPage({
  store,
  onUpdateProfile,
  toggleTheme,
  storageProblem,
  saving,
  onNotify,
}: {
  store: Store;
  onUpdateProfile: (profile: Profile) => void;
  toggleTheme: () => void;
  storageProblem: boolean;
  saving: boolean;
  onNotify: (s: string) => void;
}) {
  const [name, setName] = useState(store.profile.name),
    [email, setEmail] = useState(store.profile.email);
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasValidProfile(name, email)) {
      onNotify('Enter a name and a valid email address.');
      return;
    }
    onUpdateProfile({
      name: name.trim(),
      email: email.trim(),
      avatar: initials(name),
    });
    onNotify('Profile preferences saved');
  };
  return (
    <div className="content" style={{ maxWidth: 900 }}>
      <div style={{ marginBottom: 27 }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>
          Make it yours
        </div>
        <h1 className="page-title display">Settings</h1>
        <p className="subtle" style={{ marginTop: 8 }}>
          A few details to make your workspace feel like home.
        </p>
      </div>
      <form
        className="panel"
        onSubmit={save}
        style={{ padding: 22, marginBottom: 15 }}
      >
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 700 }}>Profile</div>
          <div className="subtle" style={{ fontSize: 12, marginTop: 4 }}>
            Your details stay on this device.
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 14,
            alignItems: 'center',
            marginBottom: 19,
          }}
        >
          <span
            className="avatar"
            style={{ width: 48, height: 48, fontSize: 14 }}
          >
            {initials(name)}
          </span>
          <div>
            <div style={{ fontWeight: 700 }}>{name || 'Your name'}</div>
            <div className="subtle" style={{ fontSize: 12 }}>
              {email}
            </div>
          </div>
        </div>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13 }}
        >
          <div>
            <label className="label">Name</label>
            <input
              className="field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              data-testid="input-profile-name"
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input
              className="field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-testid="input-profile-email"
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'end', marginTop: 17 }}>
          <button
            className="button button-primary"
            type="submit"
            data-testid="button-save-profile"
          >
            Save profile
          </button>
        </div>
      </form>
      <section
        className="panel appearance-settings"
        style={{ padding: 22, marginBottom: 15 }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 15,
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span
              className="brand-glyph"
              style={{
                width: 36,
                height: 36,
                background: 'hsl(var(--accent))',
                color: 'hsl(var(--primary))',
              }}
            >
              {store.theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
            </span>
            <div>
              <div style={{ fontWeight: 700 }}>Appearance</div>
              <div className="subtle" style={{ fontSize: 12, marginTop: 4 }}>
                Choose the mood for your workspace.
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              className={`button ${store.theme === 'light' ? 'button-primary' : ''}`}
              onClick={() => {
                if (store.theme === 'dark') toggleTheme();
              }}
              data-testid="button-theme-light"
            >
              <Sun size={15} /> Light
            </button>
            <button
              className={`button ${store.theme === 'dark' ? 'button-primary' : ''}`}
              onClick={() => {
                if (store.theme === 'light') toggleTheme();
              }}
              data-testid="button-theme-dark"
            >
              <Moon size={15} /> Dark
            </button>
          </div>
        </div>
      </section>
      <section className="panel" style={{ padding: 22 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 15,
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontWeight: 700 }}>Local demo workspace</div>
            <div className="subtle" style={{ fontSize: 12, marginTop: 4 }}>
              Your projects and tasks are saved in this browser only.
            </div>
          </div>
          <span className="badge status-done">
            <CheckCircle2 size={12} />{' '}
            {storageProblem
              ? 'Not saved'
              : saving
                ? 'Saving…'
                : 'Saved locally'}
          </span>
        </div>
      </section>
    </div>
  );
}
