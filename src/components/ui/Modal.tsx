/**
 * Reusable Modal component
 */

import React, { useEffect } from 'react';
import type { ModalProps } from '../../types';
import Button from './Button';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  className = '',
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const sizeClasses = {
    small: 'modal--small',
    medium: 'modal--medium',
    large: 'modal--large',
  };

  const modalClasses = [
    'modal',
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={modalClasses} role="dialog" aria-modal="true">
        <div className="modal__header">
          {title && <h2 className="modal__title">{title}</h2>}
          <Button
            variant="outline"
            size="small"
            onClick={onClose}
            className="modal__close"
            aria-label="Close modal"
          >
            ×
          </Button>
        </div>
        <div className="modal__content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
