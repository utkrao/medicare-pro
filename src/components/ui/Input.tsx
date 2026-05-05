import { useId, type InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = ({ label, error, helperText, className = '', id, ...props }: InputProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input__label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`input ${error ? 'input--error' : ''}`}
        {...props}
      />
      {error && <span className="input__error">{error}</span>}
      {helperText && !error && <span className="input__helper">{helperText}</span>}
    </div>
  );
};
