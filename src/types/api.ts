/**
 * JSONPlaceholder API Types
 * Based on https://jsonplaceholder.typicode.com/
 */

// Common types
export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

// User types
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface CreateUserRequest {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  id: number;
}

// Post types
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CreatePostRequest {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  id: number;
}

// Comment types
export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface CreateCommentRequest {
  postId: number;
  name: string;
  email: string;
  body: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Error types
export interface ApiError {
  message: string;
  status: number;
  details?: string;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Form types
export interface FormField {
  name: string;
  value: string;
  error?: string;
  touched?: boolean;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export interface FormValidation {
  [fieldName: string]: ValidationRule;
}
