import { useNavigate } from 'react-router-dom';
import { ACCESS_CONFIG, ROUTES } from '../data/accessConfig';

const LEVEL_INFO = {
  public: { desc: 'Open events visible to all members', icon: '🌐' },
  district: { desc: 'District-wide leadership and all events', icon: '🏔️' },
  division: { desc: 'Division-level view for Division Directors', icon: '⛰️' },
  area: { desc: 'Area-level view for Area Directors', icon: '🗻' },
  club: { desc: 'Club officer view for your club', icon: '🏕️' },
};

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <div className="landing-logo">
        <div className="landing-tm-badge">TM</div>
        <div>
          <div className="landing-org">TOASTMASTERS INTERNATIONAL</div>
          <div className="landing-district">DISTRICT 129</div>
        </div>
      </div>
      <h1 className="landing-title">District 129 Event Hub</h1>
      <p className="landing-subtitle">Select your access level to get started</p>
      <div className="landing-cards">
        {Object.entries(ACCESS_CONFIG).map(([level, cfg]) => (
          <button
            key={level}
            className="landing-card"
            onClick={() => navigate(ROUTES[level] + '/calendar')}
          >
            <span className="landing-card-icon">{LEVEL_INFO[level].icon}</span>
            <div className="landing-card-info">
              <div className="landing-card-label">{cfg.label}</div>
              <div className="landing-card-desc">{LEVEL_INFO[level].desc}</div>
            </div>
            <span className="landing-card-arrow">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}
