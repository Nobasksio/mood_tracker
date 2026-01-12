import { useState } from 'react';
import { MoodGrid } from './components';
import { useMoodData } from './hooks/useMoodData';
import './App.css';

function App() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const { data, setMood, setCustomEmoji, setComment, clearMood } = useMoodData();

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Mood Tracker</h1>
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
