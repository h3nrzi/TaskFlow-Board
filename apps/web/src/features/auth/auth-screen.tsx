import { type Profile } from '@/workspace/types';
import { useState } from 'react';
import { hasValidEmail, hasSignupName } from '@/workspace/validation';
import { initials } from '@/workspace/transitions';
import { Link } from 'wouter';
import { Command, ArrowRight } from 'lucide-react';

export function AuthScreen({
  mode,
  profile,
  onSave,
}: {
  mode: 'login' | 'signup';
  profile: Profile;
  onSave: (p: Profile) => void;
}) {
  const [name, setName] = useState(mode === 'signup' ? '' : profile.name),
    [email, setEmail] = useState(mode === 'signup' ? '' : profile.email),
    [error, setError] = useState('');
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasValidEmail(email)) {
      setError('Enter a valid email address to continue.');
      return;
    }
    if (mode === 'signup' && !hasSignupName(name)) {
      setError('Add your name to get started.');
      return;
    }
    onSave({
      name: name.trim() || profile.name,
      email: email.trim(),
      avatar: initials(name.trim() || profile.name),
    });
  };
  return (
    <main className="auth-screen">
      <aside className="auth-art">
        <Link href="/" className="brand-mark" style={{ color: '#f3f0e8' }}>
          <span
            className="brand-glyph"
            style={{ background: '#d7c887', color: '#244b3d' }}
          >
            <Command size={17} strokeWidth={2.7} />
          </span>
          <span>taskflow</span>
        </Link>
        <div className="auth-quote">Make room for the work that matters.</div>
        <div
          style={{ zIndex: 1, color: 'rgba(243,240,232,.67)', fontSize: 12 }}
        >
          A calmer way to keep good work moving.
        </div>
      </aside>
      <section className="auth-form-side">
        <form className="auth-form" onSubmit={submit}>
          <div className="eyebrow" style={{ marginBottom: 11 }}>
            Your focused workspace
          </div>
          <h1 className="display" style={{ fontSize: 34, margin: '0 0 8px' }}>
            {mode === 'signup' ? 'Start with a small step.' : 'Welcome back.'}
          </h1>
          <p className="subtle" style={{ margin: '0 0 29px', lineHeight: 1.6 }}>
            {mode === 'signup'
              ? 'Create a local demo profile. Your workspace stays on this device.'
              : 'Pick up right where you left off.'}
          </p>
          {mode === 'signup' && (
            <div style={{ marginBottom: 16 }}>
              <label className="label">Your name</label>
              <input
                autoFocus
                className="field"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Maya Chen"
                data-testid="input-signup-name"
              />
            </div>
          )}
          <div style={{ marginBottom: 16 }}>
            <label className="label">Email address</label>
            <input
              autoFocus={mode === 'login'}
              className="field"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              data-testid={`input-${mode}-email`}
            />
          </div>
          {error && (
            <div
              role="alert"
              style={{
                color: 'hsl(var(--destructive))',
                fontSize: 12,
                margin: '0 0 13px',
              }}
            >
              {error}
            </div>
          )}
          <button
            type="submit"
            className="button button-primary"
            style={{ width: '100%', padding: 12 }}
            data-testid={`button-${mode}-submit`}
          >
            {mode === 'signup' ? 'Create demo workspace' : 'Continue to demo'}{' '}
            <ArrowRight size={15} />
          </button>
          <div
            className="subtle"
            style={{
              textAlign: 'center',
              fontSize: 11,
              lineHeight: 1.6,
              marginTop: 16,
            }}
          >
            No password or server required. This demo lives in your browser.
          </div>
          <div
            style={{
              borderTop: '1px solid hsl(var(--border))',
              marginTop: 24,
              paddingTop: 20,
              textAlign: 'center',
              fontSize: 12,
            }}
          >
            {mode === 'signup'
              ? 'Already have a workspace?'
              : 'New to TaskFlow?'}{' '}
            <Link
              href={mode === 'signup' ? '/login' : '/signup'}
              style={{ color: 'hsl(var(--primary))', fontWeight: 700 }}
              data-testid={`link-auth-${mode === 'signup' ? 'login' : 'signup'}`}
            >
              {mode === 'signup' ? 'Sign in' : 'Create a demo profile'}
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
