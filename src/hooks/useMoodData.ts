import { useState, useEffect, useCallback } from 'react';
import type { MoodData, MoodLevel, DayEntry } from '../types';

const getStorageKey = (userId: string) => `mood-tracker-data-${userId}`;

const loadFromStorage = (userId: string): MoodData => {
  try {
    const stored = localStorage.getItem(getStorageKey(userId));
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const saveToStorage = (userId: string, data: MoodData): void => {
  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(data));
  } catch {
    console.error('Failed to save mood data to localStorage');
  }
};

export const useMoodData = (userId: string) => {
  const [data, setData] = useState<MoodData>(() => loadFromStorage(userId));

  useEffect(() => {
    setData(loadFromStorage(userId));
  }, [userId]);

  useEffect(() => {
    saveToStorage(userId, data);
  }, [userId, data]);

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
