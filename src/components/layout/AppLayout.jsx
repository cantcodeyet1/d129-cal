import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const PAGE_TITLES = {
  calendar: 'Calendar',
  agenda: 'Agenda',
  deadlines: 'Deadlines',
  'my-events': 'My Events',
  rsvps: 'RSVPs',
  resources: 'Resources',
};

export default function AppLayout({ accessLevel, baseUrl }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const segment = location.pathname.split('/').pop();
  const title = PAGE_TITLES[segment] || 'Calendar';

  return (
    <div className={`app-layout${sidebarOpen ? ' sidebar-mobile-open' : ''}`}>
      <button className="hamburger" onClick={() => setSidebarOpen(o => !o)} aria-label="Menu">
        ☰
      </button>
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <Sidebar accessLevel={accessLevel} baseUrl={baseUrl} />
      <main className="main-content">
        <Outlet context={{ accessLevel, baseUrl, title }} />
      </main>
    </div>
  );
}
