import type { MoodLevel } from '../types';
import { getMoodEmoji } from '../constants/moods';
import { isToday, isFuture } from '../utils/dates';
import './MoodCircle.css';

interface MoodCircleProps {
  date: string;
  mood?: MoodLevel;
  customEmoji?: string;
  onClick: () => void;
}

export const MoodCircle = ({ date, mood, customEmoji, onClick }: MoodCircleProps) => {
  const today = isToday(date);
  const future = isFuture(date);
  const dayNumber = new Date(date).getDate();

  const displayEmoji = customEmoji || (mood ? getMoodEmoji(mood) : null);
  const hasEmoji = Boolean(displayEmoji);

  const classNames = [
    'mood-circle',
    hasEmoji ? 'mood-circle--filled' : 'mood-circle--empty',
    today ? 'mood-circle--today' : '',
    future ? 'mood-circle--future' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={future}
      title={date}
      aria-label={`${date}${displayEmoji ? `, mood: ${displayEmoji}` : ''}`}
    >
      {displayEmoji ? (
        <span className="mood-circle__emoji">{displayEmoji}</span>
      ) : (
        <span className="mood-circle__day">{dayNumber}</span>
      )}
    </button>
  );
};
