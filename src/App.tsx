import React, { useState } from 'react';
import type { User, ViewType } from './types';
import { UserList, UserDetails, UserForm, PostForm } from './components';
import { validateEnvironment } from './config/environment';
import './App.css';

// Validate environment on app start
try {
  validateEnvironment();
} catch (error) {
  console.error('Environment validation failed:', error);
}

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('users');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setCurrentView('user-details');
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setCurrentView('create-user');
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setCurrentView('edit-user');
  };

  const handleBackToUsers = () => {
    setSelectedUser(null);
    setCurrentView('users');
  };

  const handleUserFormSuccess = (user: User) => {
    setSelectedUser(user);
    setCurrentView('user-details');
  };

  const handleUserFormCancel = () => {
    if (selectedUser) {
      setCurrentView('user-details');
    } else {
      setCurrentView('users');
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'users':
        return (
          <UserList
            onUserSelect={handleUserSelect}
            onCreateUser={handleCreateUser}
          />
        );

      case 'user-details':
        if (!selectedUser) {
          setCurrentView('users');
          return null;
        }
        return (
          <UserDetails
            user={selectedUser}
            onBack={handleBackToUsers}
            onEditUser={handleEditUser}
          />
        );

      case 'create-user':
        return (
          <UserForm
            onSuccess={handleUserFormSuccess}
            onCancel={handleUserFormCancel}
          />
        );

      case 'edit-user':
        if (!selectedUser) {
          setCurrentView('users');
          return null;
        }
        return (
          <UserForm
            user={selectedUser}
            onSuccess={handleUserFormSuccess}
            onCancel={handleUserFormCancel}
          />
        );

      default:
        return (
          <UserList
            onUserSelect={handleUserSelect}
            onCreateUser={handleCreateUser}
          />
        );
    }
  };

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__container">
          <h1 className="app__title">React Technical Challenge</h1>
          <p className="app__subtitle">User Management System</p>
        </div>
      </header>

      <main className="app__main">
        <div className="app__container">
          {renderCurrentView()}
        </div>
      </main>

      <footer className="app__footer">
        <div className="app__container">
          <p>&copy; 2024 React Technical Challenge. Built with React + TypeScript.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
