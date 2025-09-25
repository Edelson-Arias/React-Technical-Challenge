/**
 * UserForm component - Create or edit user
 */

import React from 'react';
import { useForm } from '../hooks';
import { apiService } from '../services';
import type { User, CreateUserRequest, FormValidation } from '../types';
import { Button, Input, ErrorMessage } from './ui';

interface UserFormProps {
  user?: User; // If provided, it's edit mode
  onSuccess: (user: User) => void;
  onCancel: () => void;
}

interface UserFormData {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSuccess, onCancel }) => {
  const isEditMode = !!user;

  const initialValues: UserFormData = {
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    website: user?.website || '',
  };

  const validationRules: FormValidation = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    username: {
      required: true,
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9._-]+$/,
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
      required: true,
      pattern: /^[\d\s()+-]+$/,
    },
    website: {
      required: false,
      pattern: /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    },
  };

  const handleSubmit = async (values: UserFormData) => {
    try {
      let result: User;

      if (isEditMode && user) {
        result = await apiService.updateUser(user.id, {
          id: user.id,
          ...values,
        });
      } else {
        result = await apiService.createUser(values);
      }

      onSuccess(result);
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error; // Re-throw so form can handle it
    }
  };

  const {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    setValue,
    setTouched,
    handleSubmit: onSubmit,
    reset,
  } = useForm({
    initialValues,
    validationRules,
    onSubmit: handleSubmit,
  });

  const handleFieldChange = (field: keyof UserFormData, value: string) => {
    setValue(field, value);
  };

  const handleFieldBlur = (field: keyof UserFormData) => {
    setTouched(field);
  };

  const handleReset = () => {
    reset();
    onCancel();
  };

  return (
    <div className="user-form">
      <div className="user-form__header">
        <h2>{isEditMode ? 'Edit User' : 'Create New User'}</h2>
        <p className="user-form__subtitle">
          {isEditMode 
            ? 'Update the user information below.' 
            : 'Fill in the details to create a new user.'
          }
        </p>
      </div>

      <form onSubmit={onSubmit} className="user-form__form" noValidate>
        <div className="user-form__grid">
          <div className="user-form__section">
            <h3>Basic Information</h3>
            
            <Input
              label="Full Name"
              type="text"
              value={values.name}
              onChange={(value) => handleFieldChange('name', value)}
              onBlur={() => handleFieldBlur('name')}
              error={touched.name ? errors.name : undefined}
              placeholder="Enter full name"
              required
            />

            <Input
              label="Username"
              type="text"
              value={values.username}
              onChange={(value) => handleFieldChange('username', value)}
              onBlur={() => handleFieldBlur('username')}
              error={touched.username ? errors.username : undefined}
              placeholder="Enter username (letters, numbers, .-_ only)"
              required
            />

            <Input
              label="Email Address"
              type="email"
              value={values.email}
              onChange={(value) => handleFieldChange('email', value)}
              onBlur={() => handleFieldBlur('email')}
              error={touched.email ? errors.email : undefined}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="user-form__section">
            <h3>Contact Information</h3>
            
            <Input
              label="Phone Number"
              type="tel"
              value={values.phone}
              onChange={(value) => handleFieldChange('phone', value)}
              onBlur={() => handleFieldBlur('phone')}
              error={touched.phone ? errors.phone : undefined}
              placeholder="Enter phone number"
              required
            />

            <Input
              label="Website"
              type="url"
              value={values.website}
              onChange={(value) => handleFieldChange('website', value)}
              onBlur={() => handleFieldBlur('website')}
              error={touched.website ? errors.website : undefined}
              placeholder="Enter website domain (optional)"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="user-form__actions">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          
          <Button
            type="button"
            variant="secondary"
            onClick={reset}
            disabled={isSubmitting}
          >
            Reset Form
          </Button>
          
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={!isValid}
          >
            {isEditMode ? 'Update User' : 'Create User'}
          </Button>
        </div>

        {/* Form Validation Summary */}
        {Object.keys(errors).length > 0 && (
          <div className="user-form__validation-summary">
            <h4>Please fix the following errors:</h4>
            <ul>
              {Object.entries(errors).map(([field, error]) => 
                error && (
                  <li key={field}>
                    {field}: {error}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserForm;
