import React, { useEffect, useRef } from 'react';

export interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDangerous?: boolean;
}

export function ConfirmationDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isDangerous = false
}: ConfirmationDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Focus the cancel button by default for safety
      cancelBtnRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div 
      className="confirmation-dialog__overlay" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="dialog-title"
      aria-describedby="dialog-desc"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <div 
        ref={dialogRef}
        className="confirmation-dialog__content"
        style={{
          background: 'var(--bg-card, #fff)',
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '400px',
          width: '90%',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
        }}
      >
        <h2 id="dialog-title" style={{ margin: '0 0 16px', fontSize: '1.25rem', color: 'var(--text-primary, #1e293b)' }}>
          {title}
        </h2>
        <p id="dialog-desc" style={{ margin: '0 0 24px', color: 'var(--text-secondary, #64748b)', lineHeight: 1.5 }}>
          {message}
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            ref={cancelBtnRef}
            type="button"
            onClick={onCancel}
            style={{
              padding: '8px 16px',
              border: '1px solid var(--border-color, #e2e8f0)',
              background: 'transparent',
              color: 'var(--text-primary, #1e293b)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              padding: '8px 16px',
              border: 'none',
              background: isDangerous ? '#ef4444' : 'var(--accent-color, #3b82f6)',
              color: '#fff',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
