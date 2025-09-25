/**
 * PostForm component - Create or edit post
 */

import React from 'react';
import { useForm } from '../hooks';
import { apiService } from '../services';
import type { Post, FormValidation } from '../types';
import { Button, Input, ErrorMessage } from './ui';

interface PostFormProps {
  post?: Post; // If provided, it's edit mode
  userId: number;
  onSuccess: (post: Post) => void;
  onCancel: () => void;
}

interface PostFormData {
  title: string;
  body: string;
  [key: string]: string; // Index signature for form compatibility
}

const PostForm: React.FC<PostFormProps> = ({ post, userId, onSuccess, onCancel }) => {
  const isEditMode = !!post;

  const initialValues: PostFormData = {
    title: post?.title || '',
    body: post?.body || '',
  };

  const validationRules: FormValidation = {
    title: {
      required: true,
      minLength: 5,
      maxLength: 100,
    },
    body: {
      required: true,
      minLength: 10,
      maxLength: 1000,
    },
  };

  const handleSubmit = async (values: PostFormData) => {
    try {
      let result: Post;

      if (isEditMode && post) {
        result = await apiService.updatePost(post.id, {
          id: post.id,
          userId,
          ...values,
        });
      } else {
        result = await apiService.createPost({
          userId,
          ...values,
        });
      }

      onSuccess(result);
    } catch (error) {
      console.error('Error submitting post:', error);
      throw error;
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

  const handleFieldChange = (field: keyof PostFormData, value: string) => {
    setValue(field, value);
  };

  const handleFieldBlur = (field: keyof PostFormData) => {
    setTouched(field);
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const remainingTitleChars = 100 - values.title.length;
  const remainingBodyChars = 1000 - values.body.length;

  return (
    <div className="post-form">
      <div className="post-form__header">
        <h2>{isEditMode ? 'Edit Post' : 'Create New Post'}</h2>
        <p className="post-form__subtitle">
          {isEditMode 
            ? 'Update your post content below.' 
            : 'Share your thoughts with the community.'
          }
        </p>
      </div>

      <form onSubmit={onSubmit} className="post-form__form" noValidate>
        <div className="post-form__fields">
          <div className="post-form__field">
            <Input
              label="Post Title"
              type="text"
              value={values.title}
              onChange={(value) => handleFieldChange('title', value)}
              onBlur={() => handleFieldBlur('title')}
              error={touched.title ? errors.title : undefined}
              placeholder="Enter a compelling title for your post"
              required
            />
            <div className="post-form__char-count">
              <span className={remainingTitleChars < 0 ? 'post-form__char-count--over' : ''}>
                {remainingTitleChars} characters remaining
              </span>
            </div>
          </div>

          <div className="post-form__field">
            <div className="textarea-field">
              <label className="textarea-field__label">
                Post Content
                <span className="textarea-field__required">*</span>
              </label>
              <textarea
                value={values.body}
                onChange={(e) => handleFieldChange('body', e.target.value)}
                onBlur={() => handleFieldBlur('body')}
                placeholder="Write your post content here..."
                className={`textarea ${errors.body && touched.body ? 'textarea--error' : ''}`}
                rows={8}
                required
              />
              {touched.body && errors.body && (
                <span className="textarea-field__error" role="alert">
                  {errors.body}
                </span>
              )}
            </div>
            <div className="post-form__char-count">
              <span className={remainingBodyChars < 0 ? 'post-form__char-count--over' : ''}>
                {remainingBodyChars} characters remaining
              </span>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="post-form__preview">
          <h3>Preview</h3>
          <div className="post-preview">
            <h4 className="post-preview__title">
              {values.title || 'Your post title will appear here'}
            </h4>
            <p className="post-preview__body">
              {values.body || 'Your post content will appear here...'}
            </p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="post-form__actions">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
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
            Reset
          </Button>
          
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={!isValid}
          >
            {isEditMode ? 'Update Post' : 'Publish Post'}
          </Button>
        </div>

        {/* Validation Summary */}
        {(errors.title || errors.body) && (touched.title || touched.body) && (
          <div className="post-form__validation-summary">
            <ErrorMessage 
              message="Please fix the form errors above before submitting." 
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default PostForm;
