/**
 * Application state and component types
 */

import type { User, Post, Comment, LoadingState } from './api';

// Component props types
export interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

// Button component props
export interface ButtonProps extends ComponentProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// Input component props
export interface InputProps extends ComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

// Modal component props
export interface ModalProps extends ComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'small' | 'medium' | 'large';
}

// Loading spinner props
export interface LoadingSpinnerProps extends ComponentProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

// Application state types
export interface AppState {
  users: {
    data: User[];
    loading: LoadingState;
    error: string | null;
  };
  posts: {
    data: Post[];
    loading: LoadingState;
    error: string | null;
  };
  comments: {
    data: Comment[];
    loading: LoadingState;
    error: string | null;
  };
  selectedUser: User | null;
  selectedPost: Post | null;
}

// Hook return types
export interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface UseFormReturn<T> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
  handleChange: (field: keyof T, value: string) => void;
  handleBlur: (field: keyof T) => void;
  handleSubmit: (onSubmit: (values: T) => void) => void;
  reset: () => void;
}

// Navigation types
export type ViewType = 'users' | 'user-details' | 'create-user' | 'edit-user';

export interface NavigationState {
  currentView: ViewType;
  selectedUserId: number | null;
  history: ViewType[];
}
