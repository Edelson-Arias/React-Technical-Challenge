/**
 * Custom hook for form management with validation
 */

import { useState, useCallback } from 'react';
import type { FormValidation } from '../types';

export interface UseFormOptions<T> {
  initialValues: T;
  validationRules?: FormValidation;
  onSubmit?: (values: T) => void | Promise<void>;
}

export interface UseFormResult<T> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
  setValue: (field: keyof T, value: string) => void;
  setTouched: (field: keyof T) => void;
  handleSubmit: (e: React.FormEvent) => void;
  reset: () => void;
  validateField: (field: keyof T) => string | null;
}

export function useForm<T extends Record<string, string>>(
  options: UseFormOptions<T>
): UseFormResult<T> {
  const { initialValues, validationRules = {}, onSubmit } = options;

  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);
  const [touched, setTouchedState] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate a single field
  const validateField = useCallback((field: keyof T): string | null => {
    const value = values[field];
    const rules = validationRules[field as string];

    if (!rules) return null;

    // Required validation
    if (rules.required && (!value || value.trim() === '')) {
      return `${String(field)} is required`;
    }

    // Skip other validations if field is empty and not required
    if (!value || value.trim() === '') {
      return null;
    }

    // Min length validation
    if (rules.minLength && value.length < rules.minLength) {
      return `${String(field)} must be at least ${rules.minLength} characters`;
    }

    // Max length validation
    if (rules.maxLength && value.length > rules.maxLength) {
      return `${String(field)} must be no more than ${rules.maxLength} characters`;
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      return `${String(field)} format is invalid`;
    }

    // Custom validation
    if (rules.custom) {
      return rules.custom(value);
    }

    return null;
  }, [values, validationRules]);

  // Set field value and validate
  const setValue = useCallback((field: keyof T, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  // Mark field as touched
  const setTouched = useCallback((field: keyof T) => {
    setTouchedState(prev => ({ ...prev, [field]: true }));
    
    // Validate field when it loses focus
    const error = validateField(field);
    setErrors(prev => ({ ...prev, [field]: error || '' }));
  }, [validateField]);

  // Validate all fields
  const validateAll = useCallback((): boolean => {
    const newErrors: Record<keyof T, string> = {} as Record<keyof T, string>;
    let isFormValid = true;

    Object.keys(values).forEach(field => {
      const error = validateField(field as keyof T);
      newErrors[field as keyof T] = error || '';
      if (error) {
        isFormValid = false;
      }
    });

    setErrors(newErrors);
    return isFormValid;
  }, [values, validateField]);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!onSubmit) return;

    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, field) => {
      acc[field as keyof T] = true;
      return acc;
    }, {} as Record<keyof T, boolean>);
    setTouchedState(allTouched);

    // Validate all fields
    const isFormValid = validateAll();
    
    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, onSubmit, validateAll]);

  // Reset form to initial state
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({} as Record<keyof T, string>);
    setTouchedState({} as Record<keyof T, boolean>);
    setIsSubmitting(false);
  }, [initialValues]);

  // Check if form is valid
  const isValid = useCallback(() => {
    return Object.values(errors).every(error => !error);
  }, [errors]);

  return {
    values,
    errors,
    touched,
    isValid: isValid(),
    isSubmitting,
    setValue,
    setTouched,
    handleSubmit,
    reset,
    validateField,
  };
}
