import { classifyEvent } from '../calendar/CalendarGrid';
import Icon from '../ui/Icon';

export default function EventDetail({ event, onClose }) {
  if (!event) return <div className="event-detail-empty">Event not found.</div>;

  const d = new Date(event.date);
  const dateStr = d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="ed-modal">

      {/* Hero */}
      <div className="ed-hero" style={{ background: 'linear-gradient(135deg, #004165 0%, #006094 100%)' }}>
        <button className="ed-close" onClick={onClose}>✕</button>

        <span className="ed-category-badge">
          {event.audience || event.location}
        </span>

        <h1 className="ed-title">{event.title}</h1>
        <p className="ed-subtitle">{event.area || event.division || 'District 129'} · {event.format} Event</p>

        <div className="ed-hero-stats">
          <div className="ed-hero-stat">
            <Icon name="calendar" size={20} color="rgba(255,255,255,0.7)" />
            <div>
              <div className="ed-stat-label">Date</div>
              <div className="ed-stat-value">{dateStr}</div>
            </div>
          </div>
          <div className="ed-hero-stat">
            <Icon name="clock" size={20} color="rgba(255,255,255,0.7)" />
            <div>
              <div className="ed-stat-label">Time</div>
              <div className="ed-stat-value">{event.startTime} – {event.endTime}</div>
            </div>
          </div>
          <div className="ed-hero-stat">
            <Icon name="pin" size={20} color="rgba(255,255,255,0.7)" />
            <div>
              <div className="ed-stat-label">Location</div>
              <div className="ed-stat-value">{event.area || event.division || (event.location !== event.audience && event.location !== 'Open to All') ? `${event.location} · ` : ''}{event.format}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="ed-body">
        <div className="ed-section">
          <h3 className="ed-section-title">About this event</h3>
          <p className="ed-description">{event.description}</p>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="ed-footer">
        <button className="ed-register-btn" style={{ background: 'var(--red)' }}>
          Register Now →
        </button>
      </div>

    </div>
  );
}
