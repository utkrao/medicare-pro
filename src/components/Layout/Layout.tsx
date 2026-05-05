import { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import './Layout.css';

export const Layout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="layout__loading">
        <div className="spinner" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="layout">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {isSidebarOpen && (
        <button
          className="layout__overlay"
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close navigation"
        />
      )}
      <div className="layout__content">
        <Header onMenuToggle={() => setIsSidebarOpen((current) => !current)} />
        <main className="layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
