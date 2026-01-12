import { useState, useEffect } from 'react';
import type { MoodLevel, DayEntry } from '../types';
import { MOOD_OPTIONS } from '../constants/moods';
import { formatDisplayDate } from '../utils/dates';
import { EmojiPicker } from './EmojiPicker';
import './MoodSelector.css';

interface MoodSelectorProps {
  date: string;
  entry?: DayEntry;
  onSelectMood: (mood: MoodLevel) => void;
  onSetCustomEmoji: (emoji: string) => void;
  onUpdateComment: (comment: string) => void;
  onClearMood: () => void;
  onClose: () => void;
}

export const MoodSelector = ({
  date,
  entry,
  onSelectMood,
  onSetCustomEmoji,
  onUpdateComment,
  onClearMood,
  onClose,
}: MoodSelectorProps) => {
  const [comment, setComment] = useState(entry?.comment ?? '');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    setComment(entry?.comment ?? '');
  }, [entry?.comment]);

  const handleCommentBlur = () => {
    onUpdateComment(comment);
  };

  const handleEmojiSelect = (emoji: string) => {
    onSetCustomEmoji(emoji);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const hasEmoji = entry?.mood || entry?.customEmoji;

  return (
    <div
      className="mood-selector-backdrop"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mood-selector-title"
    >
      <div className="mood-selector">
        <header className="mood-selector__header">
          <h2 id="mood-selector-title" className="mood-selector__title">
            {formatDisplayDate(date)}
          </h2>
          <button
            className="mood-selector__close"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </header>

        <div className="mood-selector__section-label">Quick moods</div>
        <div className="mood-selector__moods">
          {MOOD_OPTIONS.map((option) => (
            <button
              key={option.level}
              className={`mood-selector__mood ${
                entry?.mood === option.level ? 'mood-selector__mood--selected' : ''
              }`}
              onClick={() => onSelectMood(option.level)}
              title={option.label}
              aria-label={option.label}
              aria-pressed={entry?.mood === option.level}
            >
              <span className="mood-selector__emoji">{option.emoji}</span>
              <span className="mood-selector__label">{option.label}</span>
            </button>
          ))}
        </div>

        <div className="mood-selector__custom">
          <button
            className="mood-selector__toggle"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            aria-expanded={showEmojiPicker}
          >
            <span>
              {entry?.customEmoji ? (
                <>
                  Custom: <span className="mood-selector__current-emoji">{entry.customEmoji}</span>
                </>
              ) : (
                'Choose custom emoji'
              )}
            </span>
            <span className={`mood-selector__toggle-icon ${showEmojiPicker ? 'mood-selector__toggle-icon--open' : ''}`}>
              ▼
            </span>
          </button>

          {showEmojiPicker && (
            <div className="mood-selector__picker-wrapper">
              <EmojiPicker
                selectedEmoji={entry?.customEmoji}
                onSelect={handleEmojiSelect}
              />
            </div>
          )}
        </div>

        <div className="mood-selector__comment">
          <label htmlFor="mood-comment" className="mood-selector__comment-label">
            Notes
          </label>
          <textarea
            id="mood-comment"
            className="mood-selector__textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onBlur={handleCommentBlur}
            placeholder="How was your day?"
            rows={3}
          />
        </div>

        {hasEmoji && (
          <button className="mood-selector__clear" onClick={onClearMood}>
            Clear mood
          </button>
        )}
      </div>
    </div>
  );
};
