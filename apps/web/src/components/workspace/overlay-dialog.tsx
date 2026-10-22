import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useRef, type ReactElement } from 'react';

/** Preserve TaskFlow's mounting, scrolling and mouse-down contracts around Radix focus/layer management. */
export function OverlayDialog({
  children,
  className,
  onClose,
}: {
  children: ReactElement;
  className: 'modal-wrap' | 'overlay';
  onClose: () => void;
}) {
  const opener = useRef(document.activeElement);
  const content = useRef<HTMLDivElement>(null);

  // The existing cleanup restores immediately, before native mouse-down defaults.
  // Radix's deferred unmount autofocus would change backdrop-focus sequencing.
  useEffect(() => () => {
    if (opener.current instanceof HTMLElement && opener.current.isConnected) {
      opener.current.focus();
    }
  }, []);

  return (
    <Dialog.Root open onOpenChange={open => { if (!open) onClose(); }}>
      {/* Keep the existing backdrop instead of Overlay's additional scroll lock. */}
      <div
        className={className}
        style={{ pointerEvents: 'auto' }}
        onMouseDown={event => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <Dialog.Content
          asChild
          ref={content}
          aria-describedby={undefined}
          aria-labelledby={undefined}
          onInteractOutside={event => event.preventDefault()}
          onOpenAutoFocus={event => {
            // Native input autoFocus has already selected the form's first field.
            if (content.current?.contains(document.activeElement)) event.preventDefault();
          }}
          onCloseAutoFocus={event => event.preventDefault()}
          // A newly opened sibling can receive focus before Radix updates its
          // document Escape listener. Close the content receiving the key instead.
          onEscapeKeyDown={event => event.preventDefault()}
          onKeyDownCapture={event => {
            if (event.key === 'Escape') {
              event.preventDefault();
              event.stopPropagation();
              onClose();
            }
          }}
        >
          {children}
        </Dialog.Content>
      </div>
    </Dialog.Root>
  );
}
