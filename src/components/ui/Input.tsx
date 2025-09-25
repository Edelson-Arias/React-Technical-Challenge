/**
 * Reusable Input component
 */

import React from 'react';
import type { InputProps } from '../../types';

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onBlur,
  error,
  label,
  required = false,
  disabled = false,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  const inputClasses = [
    'input',
    error && 'input--error',
    disabled && 'input--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="input-field">
      {label && (
        <label className="input-field__label">
          {label}
          {required && <span className="input-field__required">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputClasses}
        aria-describedby={error ? `error-${label}` : undefined}
        aria-invalid={!!error}
      />
      {error && (
        <span
          id={`error-${label}`}
          className="input-field__error"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
