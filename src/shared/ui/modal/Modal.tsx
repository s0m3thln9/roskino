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
    wrapper: 'items-start pt-25 md:px-8 md:py-20 lg:pt-107',
    panel:
      'min-h-[calc(100dvh-6.25rem)] max-w-content rounded-t-pill bg-white/75 px-10 pt-10 pb-15 text-black backdrop-blur-panel md:min-h-0 md:rounded-lg md:p-10',
    close: 'top-10 right-10',
  },
  dark: {
    dialog: 'bg-black/60 md:bg-transparent',
    wrapper: 'items-start px-2 pt-25 pb-10 md:items-center md:px-4 md:py-10',
    panel: 'max-w-150 rounded-lg bg-dark-grey/75 p-10 text-white backdrop-blur-modal',
    close: 'top-10 right-10',
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
  overlayClassName?: string;
};

export function Modal({
  open,
  variant = 'light',
  onClose,
  closeLabel,
  labelledBy,
  children,
  className,
  overlayClassName,
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
        overlayClassName,
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
            className={cn('group absolute z-10 inline-flex', styles.close)}
          >
            <Icon name="close" className="size-8 group-hover:hidden group-active:hidden" />
            <Icon
              name="close-hover"
              className="hidden size-8 scale-[1.026] group-hover:inline-block group-active:inline-block"
            />
          </button>
          {children}
        </div>
      </div>
    </dialog>
  );
}
