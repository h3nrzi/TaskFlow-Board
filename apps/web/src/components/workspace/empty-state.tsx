import { Sparkles } from 'lucide-react';

export function EmptyState({
  title,
  detail,
  action,
  onClick,
}: {
  title: string;
  detail: string;
  action?: string;
  onClick?: () => void;
}) {
  return (
    <div style={{ padding: '30px 22px', textAlign: 'center' }}>
      <div
        style={{
          margin: '0 auto 11px',
          width: 37,
          height: 37,
          borderRadius: 11,
          display: 'grid',
          placeItems: 'center',
          background: 'hsl(var(--accent))',
          color: 'hsl(var(--primary))',
        }}
      >
        <Sparkles size={18} />
      </div>
      <div style={{ fontWeight: 700 }}>{title}</div>
      <p
        className="subtle"
        style={{ fontSize: 12, margin: '6px auto 12px', maxWidth: 270 }}
      >
        {detail}
      </p>
      {action && onClick && (
        <button className="button" onClick={onClick}>
          {action}
        </button>
      )}
    </div>
  );
}
