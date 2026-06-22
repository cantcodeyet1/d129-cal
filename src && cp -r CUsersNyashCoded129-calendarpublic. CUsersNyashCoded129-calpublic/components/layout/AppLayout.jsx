import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';

const PAGE_TITLES = {
  calendar: 'Calendar',
  agenda: 'Agenda',
  deadlines: 'Deadlines',
  'my-events': 'My Events',
  rsvps: 'RSVPs',
  resources: 'Resources',
};

export default function AppLayout({ accessLevel, baseUrl }) {
  const location = useLocation();
  const segment = location.pathname.split('/').pop();
  const title = PAGE_TITLES[segment] || 'Calendar';

  return (
    <div className="app-layout">
      <TopNav accessLevel={accessLevel} baseUrl={baseUrl} />
      <main className="main-content">
        <Outlet context={{ accessLevel, baseUrl, title }} />
      </main>
      <footer className="mobile-footer">
        <span className="mobile-footer-district">District 129</span>
        <span className="mobile-footer-theme">Elevate Together: One Voice, Many Nations</span>
      </footer>
    </div>
  );
}
