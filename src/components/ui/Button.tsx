import type { ButtonHTMLAttributes } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) => {
  const variantClass = 'btn--' + variant;
  const sizeClass = 'btn--' + size;

  return (
    <button
      className={'btn ' + variantClass + ' ' + sizeClass + ' ' + (isLoading ? 'btn--loading ' : '') + className}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <span className="btn__spinner" /> : children}
    </button>
  );
};

