import { useState } from 'react';
import { MoodGrid, UserSelector } from './components';
import { useMoodData } from './hooks/useMoodData';
import { useUsers } from './hooks/useUsers';
import './App.css';

function App() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const { users, currentUserId, setCurrentUserId, addUser } = useUsers();
  const { data, setMood, setCustomEmoji, setComment, clearMood } = useMoodData(currentUserId);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Mood Tracker</h1>
        <div className="app__controls">
          <UserSelector
            users={users}
            currentUserId={currentUserId}
            onSelectUser={setCurrentUserId}
            onAddUser={addUser}
          />
        </div>
        <div className="app__year-selector">
          <button
            className="app__year-btn"
            onClick={() => setYear((y) => y - 1)}
          >
            &larr;
          </button>
          <span className="app__year">{year}</span>
          <button
            className="app__year-btn"
            onClick={() => setYear((y) => y + 1)}
            disabled={year >= currentYear}
          >
            &rarr;
          </button>
        </div>
      </header>

      <MoodGrid
        year={year}
        data={data}
        onSetMood={setMood}
        onSetCustomEmoji={setCustomEmoji}
        onSetComment={setComment}
        onClearMood={clearMood}
      />
    </div>
  );
}

export default App;
