/**
 * UserDetails component - Display user information, posts, and comments
 */

import React, { useState } from 'react';
import { useApi } from '../hooks';
import { apiService } from '../services';
import type { User, Post, Comment } from '../types';
import { LoadingSpinner, ErrorMessage, Button, Modal } from './ui';

interface UserDetailsProps {
  user: User;
  onBack: () => void;
  onEditUser: (user: User) => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, onBack, onEditUser }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
    execute: refetchPosts,
  } = useApi(() => apiService.getUserPosts(user.id), { immediate: true });

  const {
    data: comments,
    loading: commentsLoading,
    error: commentsError,
    execute: refetchComments,
  } = useApi(
    () => selectedPost ? apiService.getPostComments(selectedPost.id) : Promise.resolve([]),
    { immediate: false }
  );

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    refetchComments();
  };

  const handleDeleteUser = async () => {
    setIsDeleting(true);
    try {
      await apiService.deleteUser(user.id);
      setShowDeleteModal(false);
      onBack(); // Navigate back after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="user-details">
      {/* Header */}
      <div className="user-details__header">
        <Button onClick={onBack} variant="outline" size="small">
          ← Back to Users
        </Button>
        <div className="user-details__actions">
          <Button onClick={() => onEditUser(user)} variant="secondary">
            Edit User
          </Button>
          <Button 
            onClick={() => setShowDeleteModal(true)} 
            variant="danger"
          >
            Delete User
          </Button>
        </div>
      </div>

      {/* User Information */}
      <div className="user-details__profile">
        <div className="user-profile">
          <div className="user-profile__header">
            <h1 className="user-profile__name">{user.name}</h1>
            <span className="user-profile__username">@{user.username}</span>
          </div>

          <div className="user-profile__grid">
            <div className="user-profile__section">
              <h3>Contact Information</h3>
              <div className="user-profile__item">
                <strong>Email:</strong>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </div>
              <div className="user-profile__item">
                <strong>Phone:</strong>
                <a href={`tel:${user.phone}`}>{user.phone}</a>
              </div>
              <div className="user-profile__item">
                <strong>Website:</strong>
                <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                  {user.website}
                </a>
              </div>
            </div>

            <div className="user-profile__section">
              <h3>Address</h3>
              <div className="user-profile__address">
                <p>{user.address.street}, {user.address.suite}</p>
                <p>{user.address.city}, {user.address.zipcode}</p>
                <small>
                  Coordinates: {user.address.geo.lat}, {user.address.geo.lng}
                </small>
              </div>
            </div>

            <div className="user-profile__section">
              <h3>Company</h3>
              <div className="user-profile__item">
                <strong>Name:</strong> {user.company.name}
              </div>
              <div className="user-profile__item">
                <strong>Catchphrase:</strong> "{user.company.catchPhrase}"
              </div>
              <div className="user-profile__item">
                <strong>Business:</strong> {user.company.bs}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="user-details__posts">
        <h2>Posts ({posts?.length || 0})</h2>
        
        {postsLoading && (
          <div className="user-details__loading">
            <LoadingSpinner />
            <p>Loading posts...</p>
          </div>
        )}

        {postsError && (
          <ErrorMessage message={postsError} onRetry={refetchPosts} />
        )}

        {posts && posts.length === 0 && (
          <div className="user-details__empty">
            <p>This user hasn't written any posts yet.</p>
          </div>
        )}

        {posts && posts.length > 0 && (
          <div className="posts-grid">
            {posts.map(post => (
              <div 
                key={post.id} 
                className={`post-card ${selectedPost?.id === post.id ? 'post-card--selected' : ''}`}
                onClick={() => handlePostClick(post)}
              >
                <h3 className="post-card__title">{post.title}</h3>
                <p className="post-card__excerpt">
                  {post.body.length > 100 ? `${post.body.substring(0, 100)}...` : post.body}
                </p>
                <div className="post-card__footer">
                  <span className="post-card__id">Post #{post.id}</span>
                  <Button size="small" variant="outline">
                    View Comments
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comments Section */}
      {selectedPost && (
        <div className="user-details__comments">
          <h3>Comments for "{selectedPost.title}"</h3>
          
          {commentsLoading && (
            <div className="user-details__loading">
              <LoadingSpinner size="small" />
              <p>Loading comments...</p>
            </div>
          )}

          {commentsError && (
            <ErrorMessage message={commentsError} onRetry={refetchComments} />
          )}

          {comments && comments.length === 0 && (
            <p>No comments on this post yet.</p>
          )}

          {comments && comments.length > 0 && (
            <div className="comments-list">
              {comments.map(comment => (
                <div key={comment.id} className="comment-card">
                  <div className="comment-card__header">
                    <strong className="comment-card__name">{comment.name}</strong>
                    <span className="comment-card__email">{comment.email}</span>
                  </div>
                  <p className="comment-card__body">{comment.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
        size="small"
      >
        <div className="delete-confirmation">
          <p>
            Are you sure you want to delete <strong>{user.name}</strong>?
          </p>
          <p className="delete-confirmation__warning">
            This action cannot be undone and will remove all associated posts and comments.
          </p>
          <div className="delete-confirmation__actions">
            <Button
              onClick={() => setShowDeleteModal(false)}
              variant="outline"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteUser}
              variant="danger"
              loading={isDeleting}
            >
              Delete User
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserDetails;
