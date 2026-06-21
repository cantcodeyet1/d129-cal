import { useNavigate } from 'react-router-dom';

const TYPE_COLORS = {
  District: '#722F37',
  Division: '#1a3a6b',
  Area: '#8B0000',
  Club: '#b8860b',
  Other: '#4a5568',
};

export default function EventDetail({ event, baseUrl }) {
  const navigate = useNavigate();
  if (!event) return <div className="event-detail-empty">Event not found.</div>;

  const color = TYPE_COLORS[event.type] || '#4a5568';
  const d = new Date(event.date);
  const dateStr = d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="event-detail">
      <div className="event-detail-inner">
        <button className="detail-back" onClick={() => navigate(-1)}>✕</button>

        <div className="detail-type-banner" style={{ backgroundColor: color }}>
          <span className="detail-type-dot" />
          <span className="detail-type-label">{event.type}</span>
        </div>

        <div className="detail-body">
          <div className="detail-left">
            <h2 className="detail-title">{event.title}</h2>
            <div className="detail-meta-list">
              <div className="detail-meta-row">📅 {dateStr}</div>
              <div className="detail-meta-row">🕐 {event.startTime} – {event.endTime} (IST)</div>
              <div className="detail-meta-row">💻 {event.format} Event</div>
              <div className="detail-meta-row">📍 {event.location}</div>
            </div>

            {event.host && (
              <div className="detail-host">
                <div className="avatar">{event.host.initials}</div>
                <div>
                  <div className="detail-host-name">Hosted by {event.host.name}</div>
                  <div className="detail-host-title">{event.host.title}</div>
                </div>
              </div>
            )}

            <div className="detail-rsvp-section">
              <div className="detail-rsvp-label">RSVP</div>
              <div className="detail-rsvp-btns">
                <button className="rsvp-btn going">I'm Going</button>
                <button className="rsvp-btn maybe">Maybe</button>
                <button className="rsvp-btn cantgo">Can't Go</button>
              </div>
            </div>
          </div>

          <div className="detail-right">
            <div className="detail-section">
              <h4>About this event</h4>
              <p>{event.description}</p>
            </div>

            {event.agenda && event.agenda.length > 0 && (
              <div className="detail-section">
                <h4>Agenda</h4>
                <ul className="detail-agenda">
                  {event.agenda.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            )}

            {event.attachments && event.attachments.length > 0 && (
              <div className="detail-section">
                <h4>Attachments</h4>
                <div className="detail-attachments">
                  {event.attachments.map((att, i) => (
                    <div key={i} className="detail-attachment">
                      <span className="att-icon">📄</span>
                      <div className="att-info">
                        <div className="att-name">{att.name}</div>
                        <div className="att-size">{att.size}</div>
                      </div>
                      <button className="att-download">⬇</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
