import { USER_PROFILES } from '../../data/accessConfig';

export default function Header({ title, accessLevel }) {
  const profile = USER_PROFILES[accessLevel] || USER_PROFILES.public;
  return (
    <header className="page-header">
      <h1 className="page-title">{title}</h1>
      <div className="header-actions">
        <button className="icon-btn" aria-label="Search">🔍</button>
        <button className="icon-btn notif-btn" aria-label="Notifications">
          🔔
          <span className="notif-badge">2</span>
        </button>
        <div className="avatar header-avatar">{profile.initials}</div>
      </div>
    </header>
  );
}
