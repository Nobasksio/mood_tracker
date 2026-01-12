import { useState, useEffect, useCallback } from 'react';
import type { MoodData, MoodLevel, DayEntry } from '../types';

const STORAGE_KEY = 'mood-tracker-data';

const loadFromStorage = (): MoodData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const saveToStorage = (data: MoodData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    console.error('Failed to save mood data to localStorage');
  }
};

export const useMoodData = () => {
  const [data, setData] = useState<MoodData>(() => loadFromStorage());

  useEffect(() => {
    saveToStorage(data);
  }, [data]);

  const setMood = useCallback((date: string, mood: MoodLevel) => {
    setData((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        date,
        mood,
        customEmoji: undefined, // Clear custom emoji when selecting predefined mood
      },
    }));
  }, []);

  const setCustomEmoji = useCallback((date: string, emoji: string) => {
    setData((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        date,
        mood: undefined, // Clear predefined mood when setting custom emoji
        customEmoji: emoji,
      },
    }));
  }, []);

  const setComment = useCallback((date: string, comment: string) => {
    setData((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        date,
        comment,
      },
    }));
  }, []);

  const getEntry = useCallback(
    (date: string): DayEntry | undefined => {
      return data[date];
    },
    [data]
  );

  const clearMood = useCallback((date: string) => {
    setData((prev) => {
      const newData = { ...prev };
      if (newData[date]) {
        delete newData[date].mood;
        delete newData[date].customEmoji;
        if (!newData[date].comment) {
          delete newData[date];
        }
      }
      return newData;
    });
  }, []);

  return {
    data,
    setMood,
    setCustomEmoji,
    setComment,
    getEntry,
    clearMood,
  };
};
