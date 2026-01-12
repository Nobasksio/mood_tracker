import { useState } from 'react';
import { EMOJI_CATEGORIES } from '../constants/emojis';
import './EmojiPicker.css';

interface EmojiPickerProps {
  selectedEmoji?: string;
  onSelect: (emoji: string) => void;
}

export const EmojiPicker = ({ selectedEmoji, onSelect }: EmojiPickerProps) => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="emoji-picker">
      <div className="emoji-picker__categories">
        {EMOJI_CATEGORIES.map((category, index) => (
          <button
            key={category.name}
            className={`emoji-picker__category-btn ${
              activeCategory === index ? 'emoji-picker__category-btn--active' : ''
            }`}
            onClick={() => setActiveCategory(index)}
            title={category.name}
            aria-label={category.name}
          >
            {category.icon}
          </button>
        ))}
      </div>

      <div className="emoji-picker__content">
        <div className="emoji-picker__category-name">
          {EMOJI_CATEGORIES[activeCategory].name}
        </div>
        <div className="emoji-picker__grid">
          {EMOJI_CATEGORIES[activeCategory].emojis.map((emoji, index) => (
            <button
              key={`${emoji}-${index}`}
              className={`emoji-picker__emoji ${
                selectedEmoji === emoji ? 'emoji-picker__emoji--selected' : ''
              }`}
              onClick={() => onSelect(emoji)}
              aria-label={emoji}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
