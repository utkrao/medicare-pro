import { MenuIcon } from '@/components/ui/Icons';
import { useLocation } from 'react-router-dom';
import './Header.css';

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  '/': {
    title: 'Operations Dashboard',
    subtitle: 'Live inpatient volume, risk, and department throughput at a glance.',
  },
  '/analytics': {
    title: 'Analytics Overview',
    subtitle: 'Population trends, visit patterns, and department-level performance.',
  },
  '/patients': {
    title: 'Patient Management',
    subtitle: 'Search, triage, and inspect patient records without leaving the workspace.',
  },
  '/notifications': {
    title: 'Notifications Center',
    subtitle: 'Critical alerts, permission status, and system communication controls.',
  },
  '/login': {
    title: 'Sign In',
    subtitle: 'Secure access for clinicians, coordinators, and operations teams.',
  },
};

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  const location = useLocation();
  const meta = pageMeta[location.pathname] || {
    title: 'MediCare Pro',
    subtitle: 'Connected care operations for modern hospital teams.',
  };

  return (
    <header className="header">
      <div className="header__main">
        <button className="header__menu" type="button" onClick={onMenuToggle} aria-label="Open navigation">
          <MenuIcon />
        </button>
        <div>
          <span className="header__eyebrow">Healthcare SaaS Workspace</span>
          <h2 className="header__title">{meta.title}</h2>
          <p className="header__subtitle">{meta.subtitle}</p>
        </div>
      </div>
      <div className="header__meta">
        <span className="header__pill">Live Ops</span>
        <span className="header__date">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>
    </header>
  );
};
