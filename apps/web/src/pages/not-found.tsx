import { AlertCircle } from 'lucide-react';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <section className="panel w-full max-w-md mx-4 p-6">
        <AlertCircle size={30} className="subtle" aria-hidden="true" />
        <h1 className="display" style={{ fontSize: 26, margin: '16px 0' }}>
          404 — Page not found
        </h1>
        <p className="subtle" style={{ lineHeight: 1.7, marginBottom: 22 }}>
          We couldn’t find this page. It may have moved, or the address may be
          incorrect.
        </p>
        <Link href="/" className="button button-primary">
          Back to Dashboard
        </Link>
      </section>
    </main>
  );
}
