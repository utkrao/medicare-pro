import type { ReactNode } from 'react';
import './Toggle.css';

interface ToggleProps {
  options: { value: string; label: ReactNode; icon?: ReactNode }[];
  value: string;
  onChange: (value: string) => void;
}

export const Toggle = ({ options, value, onChange }: ToggleProps) => {
  return (
    <div className="toggle">
      {options.map((option) => (
        <button
          key={option.value}
          className={`toggle__btn ${value === option.value ? 'toggle__btn--active' : ''}`}
          onClick={() => onChange(option.value)}
          type="button"
          aria-pressed={value === option.value}
        >
          {option.icon && <span className="toggle__icon">{option.icon}</span>}
          {option.label}
        </button>
      ))}
    </div>
  );
};
