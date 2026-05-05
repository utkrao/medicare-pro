import type { ReactNode } from 'react';
import './Card.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

export const Card = ({ children, className = '', padding = 'md', hover = false, onClick }: CardProps) => {
  return (
    <div className={`card card--padding-${padding} ${hover ? 'card--hover' : ''} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

