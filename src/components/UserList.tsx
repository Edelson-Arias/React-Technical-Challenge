/**
 * UserList component - Display users with search and loading states
 */

import React, { useState } from 'react';
import { useApi, useDebounce } from '../hooks';
import { apiService } from '../services';
import type { User } from '../types';
import { LoadingSpinner, ErrorMessage, Button, Input } from './ui';

interface UserListProps {
  onUserSelect: (user: User) => void;
  onCreateUser: () => void;
}

const UserList: React.FC<UserListProps> = ({ onUserSelect, onCreateUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const {
    data: users,
    loading,
    error,
    execute: refetchUsers,
  } = useApi(() => apiService.getUsers(), { immediate: true });

  // Filter users based on search term
  const filteredUsers = React.useMemo(() => {
    if (!users || !debouncedSearchTerm) return users;
    
    const searchLower = debouncedSearchTerm.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.username.toLowerCase().includes(searchLower)
    );
  }, [users, debouncedSearchTerm]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  if (loading) {
    return (
      <div className="user-list">
        <div className="user-list__loading">
          <LoadingSpinner size="large" />
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list">
        <ErrorMessage message={error} onRetry={refetchUsers} />
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="user-list">
        <div className="user-list__empty">
          <h2>No Users Found</h2>
          <p>There are no users available at the moment.</p>
          <Button onClick={onCreateUser} variant="primary">
            Create First User
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-list">
      <div className="user-list__header">
        <h1>Users Directory</h1>
        <Button onClick={onCreateUser} variant="primary">
          Create New User
        </Button>
      </div>

      <div className="user-list__search">
        <Input
          type="text"
          placeholder="Search users by name, email, or username..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="user-list__search-input"
        />
      </div>

      <div className="user-list__count">
        {filteredUsers && (
          <p>
            Showing {filteredUsers.length} of {users.length} users
            {debouncedSearchTerm && ` for "${debouncedSearchTerm}"`}
          </p>
        )}
      </div>

      {filteredUsers && filteredUsers.length === 0 ? (
        <div className="user-list__no-results">
          <p>No users match your search criteria.</p>
          <Button
            onClick={() => setSearchTerm('')}
            variant="outline"
          >
            Clear Search
          </Button>
        </div>
      ) : (
        <div className="user-list__grid">
          {filteredUsers?.map(user => (
            <div key={user.id} className="user-card">
              <div className="user-card__header">
                <h3 className="user-card__name">{user.name}</h3>
                <span className="user-card__username">@{user.username}</span>
              </div>
              
              <div className="user-card__info">
                <p className="user-card__email">{user.email}</p>
                <p className="user-card__phone">{user.phone}</p>
                <p className="user-card__company">{user.company.name}</p>
                <p className="user-card__address">
                  {user.address.city}, {user.address.zipcode}
                </p>
              </div>

              <div className="user-card__actions">
                <Button
                  onClick={() => onUserSelect(user)}
                  variant="primary"
                  size="small"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
