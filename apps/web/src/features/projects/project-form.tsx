import { type Project, type ProjectInput } from '@/workspace/types';
import { useState } from 'react';
import { OverlayDialog } from '@/components/workspace/overlay-dialog';
import { X } from 'lucide-react';

const PROJECT_COLORS = [
  '#558b73',
  '#c47d5d',
  '#6d83a9',
  '#bc9b4a',
  '#927cab',
  '#cf6d70',
];

export function ProjectForm({
  project,
  onClose,
  onSave,
}: {
  project?: Project;
  onClose: () => void;
  onSave: (data: ProjectInput, existing?: Project) => void;
}) {
  const [name, setName] = useState(project?.name || ''),
    [description, setDescription] = useState(project?.description || ''),
    [color, setColor] = useState(project?.color || PROJECT_COLORS[0]),
    [icon, setIcon] = useState(project?.icon || 'N');
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(
      {
        name,
        description,
        color,
        icon: icon.toUpperCase().slice(0, 1) || name[0]?.toUpperCase() || 'P',
      },
      project,
    );
  };
  return (
    <OverlayDialog className="modal-wrap" onClose={onClose}>
      <form
        data-dialog-layer
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={project ? 'Edit project' : 'New project'}
        className="modal"
        onSubmit={submit}
        data-testid="form-project"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 22,
          }}
        >
          <div>
            <div className="eyebrow">Give the work a home</div>
            <h2 className="display" style={{ margin: '7px 0 0', fontSize: 25 }}>
              {project ? 'Edit project' : 'New project'}
            </h2>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close"
            data-testid="button-close-project-form"
          >
            <X size={18} />
          </button>
        </div>
        <label className="label">
          Project name{' '}
          <span style={{ color: 'hsl(var(--destructive))' }}>*</span>
        </label>
        <input
          className="field"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. A new idea"
          autoFocus
          data-testid="input-project-name"
        />
        <label className="label" style={{ marginTop: 15 }}>
          Description
        </label>
        <textarea
          className="field"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What are you working toward?"
          data-testid="input-project-description"
        />
        <label className="label" style={{ marginTop: 16 }}>
          Mark and color
        </label>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <input
            maxLength={1}
            className="field"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            style={{ width: 57, textAlign: 'center', fontWeight: 800, color }}
            aria-label="Project initial"
            data-testid="input-project-icon"
          />
          <div style={{ display: 'flex', gap: 8 }}>
            {PROJECT_COLORS.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setColor(c)}
                aria-label={`Choose ${c} project color`}
                data-testid={`button-color-${c.slice(1)}`}
                style={{
                  width: 25,
                  height: 25,
                  background: c,
                  border:
                    color === c
                      ? '3px solid hsl(var(--foreground))'
                      : '2px solid transparent',
                  borderRadius: 8,
                  boxShadow: '0 0 0 1px hsl(var(--border))',
                }}
              />
            ))}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            gap: 8,
            marginTop: 24,
          }}
        >
          <button
            type="button"
            className="button"
            onClick={onClose}
            data-testid="button-cancel-project"
          >
            Cancel
          </button>
          <button
            className="button button-primary"
            type="submit"
            data-testid="button-save-project"
          >
            {project ? 'Save changes' : 'Create project'}
          </button>
        </div>
      </form>
    </OverlayDialog>
  );
}
