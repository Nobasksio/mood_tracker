import { useState } from 'react';
import type { User } from '../types';
import './UserSelector.css';

interface UserSelectorProps {
  users: User[];
  currentUserId: string;
  onSelectUser: (userId: string) => void;
  onAddUser: (name: string) => void;
}

export const UserSelector = ({
  users,
  currentUserId,
  onSelectUser,
  onAddUser,
}: UserSelectorProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newUserName, setNewUserName] = useState('');

  const handleAddUser = () => {
    if (newUserName.trim()) {
      onAddUser(newUserName.trim());
      setNewUserName('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddUser();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewUserName('');
    }
  };

  return (
    <div className="user-selector">
      <select
        className="user-selector__select"
        value={currentUserId}
        onChange={(e) => onSelectUser(e.target.value)}
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      {isAdding ? (
        <div className="user-selector__add-form">
          <input
            type="text"
            className="user-selector__input"
            placeholder="Имя пользователя"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button
            className="user-selector__btn user-selector__btn--confirm"
            onClick={handleAddUser}
          >
            +
          </button>
          <button
            className="user-selector__btn user-selector__btn--cancel"
            onClick={() => {
              setIsAdding(false);
              setNewUserName('');
            }}
          >
            x
          </button>
        </div>
      ) : (
        <button
          className="user-selector__btn user-selector__btn--add"
          onClick={() => setIsAdding(true)}
          title="Добавить пользователя"
        >
          +
        </button>
      )}
    </div>
  );
};
