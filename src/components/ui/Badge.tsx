import type { ReactNode } from 'react';
import './Badge.css';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md';
}

export const Badge = ({ children, variant = 'neutral', size = 'sm' }: BadgeProps) => {
  return (
    <span className={`badge badge--${variant} badge--${size}`}>
      {children}
    </span>
  );
};
