export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export interface DayEntry {
  date: string; // ISO date string YYYY-MM-DD
  mood?: MoodLevel;
  customEmoji?: string; // User-defined emoji
  comment?: string;
}

export interface MoodOption {
  level: MoodLevel;
  emoji: string;
  label: string;
}

export type MoodData = Record<string, DayEntry>;
