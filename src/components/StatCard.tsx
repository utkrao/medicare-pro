import type { ReactNode } from 'react';
import './StatCard.css';

interface StatCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  trend: string;
  trendUp: boolean;
}

export const StatCard = ({ label, value, icon, trend, trendUp }: StatCardProps) => {
  return (
    <div className="stat-card">
      <div className="stat-card__icon">{icon}</div>
      <div className="stat-card__content">
        <span className="stat-card__label">{label}</span>
        <span className="stat-card__value">{value}</span>
        <span className={`stat-card__trend ${trendUp ? 'stat-card__trend--up' : 'stat-card__trend--down'}`}>
          {trendUp ? '↑' : '↓'} {trend}
        </span>
      </div>
    </div>
  );
};
