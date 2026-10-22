import { OverlayDialog } from '@/components/workspace/overlay-dialog';
import { Trash2 } from 'lucide-react';

export function ConfirmDialog({
  title,
  description,
  onCancel,
  onConfirm,
}: {
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <OverlayDialog className="modal-wrap" onClose={onCancel}>
      <div
        data-dialog-layer
        tabIndex={-1}
        className="modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        style={{ width: 'min(420px,100%)' }}
      >
        <div
          style={{
            width: 39,
            height: 39,
            borderRadius: 11,
            background: 'hsl(var(--destructive) / .12)',
            color: 'hsl(var(--destructive))',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Trash2 size={18} />
        </div>
        <h2
          id="confirm-title"
          className="display"
          style={{ fontSize: 23, margin: '17px 0 7px' }}
        >
          {title}
        </h2>
        <p className="subtle" style={{ lineHeight: 1.55 }}>
          {description}
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            gap: 8,
            marginTop: 24,
          }}
        >
          <button
            className="button"
            onClick={onCancel}
            data-testid="button-cancel-delete"
          >
            Keep it
          </button>
          <button
            className="button"
            style={{
              background: 'hsl(var(--destructive))',
              color: 'white',
              borderColor: 'hsl(var(--destructive))',
            }}
            onClick={onConfirm}
            data-testid="button-confirm-delete"
          >
            Delete
          </button>
        </div>
      </div>
    </OverlayDialog>
  );
}
