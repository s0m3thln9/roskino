'use client';

import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { cn, lockDocumentScroll } from '@/shared/lib';
import { Icon } from '../icon';

type ModalVariant = 'light' | 'dark';

const variantClassNames: Record<
  ModalVariant,
  { dialog: string; wrapper: string; panel: string; close: string }
> = {
  light: {
    dialog: 'bg-black/50',
    wrapper: 'items-start px-4 py-20 md:px-8 lg:pt-107',
    panel: 'max-w-content rounded-lg bg-white/75 p-5 text-black backdrop-blur-panel md:p-10',
    close: 'top-5 right-5 md:top-10 md:right-10',
  },
  dark: {
    dialog: 'bg-transparent',
    wrapper: 'items-center px-4 py-10',
    panel: 'max-w-150 rounded-lg bg-black/50 p-6 text-white backdrop-blur-panel md:p-10',
    close: 'top-6 right-6 md:top-10 md:right-10',
  },
};

type ModalProps = {
  open: boolean;
  variant?: ModalVariant;
  onClose: () => void;
  closeLabel: string;
  labelledBy?: string;
  children: ReactNode;
  className?: string;
};

export function Modal({
  open,
  variant = 'light',
  onClose,
  closeLabel,
  labelledBy,
  children,
  className,
}: ModalProps) {
  const styles = variantClassNames[variant];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }

    if (!dialog.open) {
      dialog.showModal();
      panelRef.current?.focus({ preventScroll: true });
    }
    return lockDocumentScroll();
  }, [open]);

  const handleBackdropClick = (event: MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={handleBackdropClick}
      className={cn(
        'fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain p-0 backdrop:bg-transparent',
        styles.dialog,
      )}
    >
      <div
        className={cn('flex min-h-full justify-center', styles.wrapper)}
        onClick={handleBackdropClick}
      >
        <div
          ref={panelRef}
          tabIndex={-1}
          className={cn('relative w-full outline-none', styles.panel, className)}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className={cn('absolute z-10 inline-flex hover:opacity-60', styles.close)}
          >
            <Icon name="close" className="size-6 md:size-8" />
          </button>
          {children}
        </div>
      </div>
    </dialog>
  );
}
