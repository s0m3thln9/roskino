'use client';

import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { cn } from '@/shared/lib';
import { Icon } from '../icon';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  closeLabel: string;
  labelledBy?: string;
  children: ReactNode;
  className?: string;
};

export function Modal({ open, onClose, closeLabel, labelledBy, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
    }
    if (!open && dialog.open) dialog.close();

    return () => {
      document.documentElement.style.overflow = '';
    };
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
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-black/50 p-0 backdrop:bg-transparent"
    >
      <div
        className="flex min-h-full items-start justify-center px-4 py-20 md:px-8 lg:pt-107"
        onClick={handleBackdropClick}
      >
        <div
          className={cn(
            'relative w-full max-w-content rounded-lg bg-white/75 p-5 text-black backdrop-blur-panel md:p-10',
            className,
          )}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="absolute top-5 right-5 z-10 inline-flex hover:opacity-60 md:top-10 md:right-10"
          >
            <Icon name="close" className="size-6 md:size-8" />
          </button>
          {children}
        </div>
      </div>
    </dialog>
  );
}
