import { NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useNotificationStore } from '@/store/notificationStore';
import {
  AnalyticsIcon,
  BellIcon,
  CloseIcon,
  DashboardIcon,
  HospitalIcon,
  LogoutIcon,
  PatientsIcon,
} from '@/components/ui/Icons';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { logout, user } = useAuth();
  const unreadCount = useNotificationStore((state) =>
    state.notifications.filter((notification) => !notification.read).length,
  );

  const navItems = [
    { to: '/', label: 'Dashboard', icon: <DashboardIcon /> },
    { to: '/analytics', label: 'Analytics', icon: <AnalyticsIcon /> },
    { to: '/patients', label: 'Patients', icon: <PatientsIcon /> },
    {
      to: '/notifications',
      label: 'Notifications',
      icon: <BellIcon />,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar__brand">
        <span className="sidebar__logo">
          <HospitalIcon />
        </span>
        <div>
          <h1 className="sidebar__title">MediCare Pro</h1>
          <p className="sidebar__subtitle">Clinical command center</p>
        </div>
        <button className="sidebar__close" type="button" onClick={onClose} aria-label="Close navigation">
          <CloseIcon />
        </button>
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
            end={item.to === '/'}
            onClick={onClose}
          >
            <span className="sidebar__icon">{item.icon}</span>
            <span className="sidebar__label">{item.label}</span>
            {item.badge && <span className="sidebar__badge">{item.badge}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__footer-card">
          <span className="sidebar__footer-label">System status</span>
          <strong className="sidebar__footer-value">All services healthy</strong>
        </div>
        <div className="sidebar__user">
          <img
            src={user?.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.email || 'U'}`}
            alt=""
            className="sidebar__avatar"
          />
          <div className="sidebar__user-info">
            <p className="sidebar__user-name">{user?.displayName || 'Doctor'}</p>
            <p className="sidebar__user-email">{user?.email}</p>
          </div>
        </div>
        <button
          className="sidebar__logout"
          type="button"
          onClick={() => {
            onClose();
            void logout();
          }}
        >
          <LogoutIcon />
          Sign Out
        </button>
      </div>
    </aside>
  );
};
