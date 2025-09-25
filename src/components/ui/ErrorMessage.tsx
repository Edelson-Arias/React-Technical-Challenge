/**
 * Error Message component
 */

import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  className = '',
}) => {
  const classes = ['error-message', className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="alert">
      <div className="error-message__content">
        <h3 className="error-message__title">Oops! Something went wrong</h3>
        <p className="error-message__text">{message}</p>
        {onRetry && (
          <button
            className="error-message__retry btn btn--primary"
            onClick={onRetry}
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
