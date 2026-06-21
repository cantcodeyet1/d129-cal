import { useNavigate } from 'react-router-dom';
import { events } from '../../data/events';
import Badge from '../ui/Badge';

const TYPE_COLORS = {
  District: '#722F37',
  Division: '#1a3a6b',
  Area: '#8B0000',
  Club: '#b8860b',
  Other: '#4a5568',
};

export default function UpcomingEvents({ accessLevel, baseUrl }) {
  const navigate = useNavigate();
  const upcoming = events
    .filter(e => e.accessLevel.includes(accessLevel))
    .slice(0, 5);

  return (
    <div className="upcoming-panel">
      <div className="upcoming-header">
        <h3>Upcoming Events</h3>
        <button className="view-all-btn">View all</button>
      </div>
      <div className="upcoming-list">
        {upcoming.map(ev => {
          const d = new Date(ev.date);
          const month = d.toLocaleString('default', { month: 'short' }).toUpperCase();
          const day = d.getDate();
          return (
            <button
              key={ev.id}
              className="upcoming-item"
              onClick={() => navigate(`${baseUrl}/event/${ev.id}`)}
            >
              <div className="upcoming-date-badge" style={{ backgroundColor: TYPE_COLORS[ev.type] }}>
                <span className="upcoming-month">{month}</span>
                <span className="upcoming-day">{day}</span>
              </div>
              <div className="upcoming-info">
                <div className="upcoming-title">{ev.title}</div>
                <div className="upcoming-meta">{ev.startTime} · {ev.format}</div>
                <div className="upcoming-meta">{ev.location}</div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="sync-panel">
        <div className="sync-title">Sync Calendar</div>
        <div className="sync-desc">Sync events to your personal calendar</div>
        <div className="sync-btns">
          <button className="sync-btn" title="Google Calendar">G</button>
          <button className="sync-btn" title="Outlook">O</button>
          <button className="sync-btn" title="Apple Calendar">🍎</button>
        </div>
      </div>
    </div>
  );
}
