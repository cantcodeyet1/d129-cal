import { NavLink, useNavigate } from 'react-router-dom';
import { ACCESS_CONFIG, ROUTES, USER_PROFILES } from '../../data/accessConfig';

const NAV_ITEMS = [
  { key: 'calendar', label: 'Calendar', icon: '📅' },
  { key: 'agenda', label: 'Agenda', icon: '📋' },
  { key: 'deadlines', label: 'Deadlines', icon: '⏰' },
  { key: 'my-events', label: 'My Events', icon: '✏️' },
  { key: 'rsvps', label: 'RSVPs', icon: '✔️' },
  { key: 'resources', label: 'Resources', icon: '📄' },
];

export default function Sidebar({ accessLevel, baseUrl }) {
  const config = ACCESS_CONFIG[accessLevel] || ACCESS_CONFIG.public;
  const profile = USER_PROFILES[accessLevel] || USER_PROFILES.public;
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <span>TM</span>
        </div>
        <div className="sidebar-logo-text">
          <div className="sidebar-logo-name">TOASTMASTERS</div>
          <div className="sidebar-logo-sub">INTERNATIONAL</div>
          <div className="sidebar-logo-district">DISTRICT 129</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.key}
            to={`${baseUrl}/${item.key}`}
            className={({ isActive }) => `sidebar-nav-item${isActive ? ' active' : ''}`}
          >
            <span className="sidebar-nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="avatar">{profile.initials}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{profile.name}</div>
            {config.role && <div className="sidebar-user-role">{config.role}</div>}
          </div>
          <span className="sidebar-user-chevron">⌄</span>
        </div>

        <div className="sidebar-access-links">
          <div className="sidebar-access-label">Switch View</div>
          {Object.entries(ROUTES).map(([level, route]) => (
            <button
              key={level}
              className={`sidebar-access-btn${accessLevel === level ? ' current' : ''}`}
              onClick={() => navigate(route + '/calendar')}
            >
              {ACCESS_CONFIG[level].label}
            </button>
          ))}
        </div>

        <button className="sidebar-help">
          <span>?</span> Need help? Contact Support
        </button>
      </div>
    </aside>
  );
}
