import { useState, useMemo } from 'react';
import type { MoodData, MoodLevel } from '../types';
import { MoodCircle } from './MoodCircle';
import { MoodSelector } from './MoodSelector';
import { getYearDays, getMonthName } from '../utils/dates';
import './MoodGrid.css';

interface MoodGridProps {
  year: number;
  data: MoodData;
  onSetMood: (date: string, mood: MoodLevel) => void;
  onSetCustomEmoji: (date: string, emoji: string) => void;
  onSetComment: (date: string, comment: string) => void;
  onClearMood: (date: string) => void;
}

interface MonthGroup {
  month: number;
  name: string;
  days: string[];
}

export const MoodGrid = ({
  year,
  data,
  onSetMood,
  onSetCustomEmoji,
  onSetComment,
  onClearMood,
}: MoodGridProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const monthGroups = useMemo(() => {
    const days = getYearDays(year);
    const groups: MonthGroup[] = [];

    days.forEach((day) => {
      const date = new Date(day);
      const month = date.getMonth();

      if (!groups[month]) {
        groups[month] = {
          month,
          name: getMonthName(month),
          days: [],
        };
      }
      groups[month].days.push(day);
    });

    return groups;
  }, [year]);

  const handleCircleClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleClose = () => {
    setSelectedDate(null);
  };

  const handleSelectMood = (mood: MoodLevel) => {
    if (selectedDate) {
      onSetMood(selectedDate, mood);
    }
  };

  const handleSetCustomEmoji = (emoji: string) => {
    if (selectedDate) {
      onSetCustomEmoji(selectedDate, emoji);
    }
  };

  const handleUpdateComment = (comment: string) => {
    if (selectedDate) {
      onSetComment(selectedDate, comment);
    }
  };

  const handleClearMood = () => {
    if (selectedDate) {
      onClearMood(selectedDate);
    }
  };

  return (
    <div className="mood-grid">
      {monthGroups.map((group) => (
        <div key={group.month} className="mood-grid__month">
          <h3 className="mood-grid__month-name">{group.name}</h3>
          <div className="mood-grid__days">
            {group.days.map((day) => (
              <MoodCircle
                key={day}
                date={day}
                mood={data[day]?.mood}
                customEmoji={data[day]?.customEmoji}
                onClick={() => handleCircleClick(day)}
              />
            ))}
          </div>
        </div>
      ))}

      {selectedDate && (
        <MoodSelector
          date={selectedDate}
          entry={data[selectedDate]}
          onSelectMood={handleSelectMood}
          onSetCustomEmoji={handleSetCustomEmoji}
          onUpdateComment={handleUpdateComment}
          onClearMood={handleClearMood}
          onClose={handleClose}
        />
      )}
    </div>
  );
};
