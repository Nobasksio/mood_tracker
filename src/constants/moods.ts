import type { MoodOption } from '../types';

export const MOOD_OPTIONS: MoodOption[] = [
  { level: 1, emoji: '😢', label: 'Very Sad' },
  { level: 2, emoji: '😕', label: 'Sad' },
  { level: 3, emoji: '😐', label: 'Neutral' },
  { level: 4, emoji: '🙂', label: 'Happy' },
  { level: 5, emoji: '😄', label: 'Very Happy' },
];

export const getMoodEmoji = (level: number): string => {
  const mood = MOOD_OPTIONS.find((m) => m.level === level);
  return mood?.emoji ?? '';
};
