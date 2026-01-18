import { useState, useCallback } from 'react';
import type { User } from '../types';

const USERS_KEY = 'mood-tracker-users';
const CURRENT_USER_KEY = 'mood-tracker-current-user';

const DEFAULT_USER: User = { id: 'default', name: 'Пользователь 1' };

const loadUsers = (): User[] => {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    if (stored) {
      const users = JSON.parse(stored);
      return users.length > 0 ? users : [DEFAULT_USER];
    }
    return [DEFAULT_USER];
  } catch {
    return [DEFAULT_USER];
  }
};

const loadCurrentUserId = (users: User[]): string => {
  try {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    if (stored && users.some((u) => u.id === stored)) {
      return stored;
    }
    return users[0]?.id ?? DEFAULT_USER.id;
  } catch {
    return users[0]?.id ?? DEFAULT_USER.id;
  }
};

const saveUsers = (users: User[]): void => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    console.error('Failed to save users to localStorage');
  }
};

const saveCurrentUserId = (userId: string): void => {
  try {
    localStorage.setItem(CURRENT_USER_KEY, userId);
  } catch {
    console.error('Failed to save current user to localStorage');
  }
};

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>(() => loadUsers());
  const [currentUserId, setCurrentUserIdState] = useState<string>(() =>
    loadCurrentUserId(loadUsers())
  );

  const setCurrentUserId = useCallback((userId: string) => {
    setCurrentUserIdState(userId);
    saveCurrentUserId(userId);
  }, []);

  const addUser = useCallback((name: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
    };
    setUsers((prev) => {
      const updated = [...prev, newUser];
      saveUsers(updated);
      return updated;
    });
    return newUser;
  }, []);

  const renameUser = useCallback((userId: string, newName: string) => {
    setUsers((prev) => {
      const updated = prev.map((u) =>
        u.id === userId ? { ...u, name: newName } : u
      );
      saveUsers(updated);
      return updated;
    });
  }, []);

  const deleteUser = useCallback(
    (userId: string) => {
      if (users.length <= 1) return;
      setUsers((prev) => {
        const updated = prev.filter((u) => u.id !== userId);
        saveUsers(updated);
        if (currentUserId === userId && updated.length > 0) {
          setCurrentUserId(updated[0].id);
        }
        return updated;
      });
    },
    [users.length, currentUserId, setCurrentUserId]
  );

  const currentUser = users.find((u) => u.id === currentUserId) ?? users[0];

  return {
    users,
    currentUser,
    currentUserId,
    setCurrentUserId,
    addUser,
    renameUser,
    deleteUser,
  };
};
