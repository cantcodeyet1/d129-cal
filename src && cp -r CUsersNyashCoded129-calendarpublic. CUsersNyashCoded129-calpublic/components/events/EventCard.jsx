import { useNavigate } from 'react-router-dom';
import Icon from '../ui/Icon';

const TYPE_COLORS = {
  District: '#004165',
  Division: '#2a6496',
  Area: '#772432',
  Club: '#b8860b',
  Other: '#4a5568',
};

export default function EventCard({ event, baseUrl, showRsvp = true }) {
  const navigate = useNavigate();
  const d = new Date(event.date);
  const month = d.toLocaleString('default', { month: 'short' }).toUpperCase();
  const day = d.getDate();
  const weekday = d.toLocaleString('default', { weekday: 'short' });

  return (
    <button className="event-card" onClick={() => navigate(`${baseUrl}/event/${event.id}`)}>
      <div className="event-card-date" style={{ backgroundColor: TYPE_COLORS[event.type] }}>
        <span className="event-card-month">{month}</span>
        <span className="event-card-day">{day}</span>
        <span className="event-card-weekday">{weekday}</span>
      </div>
      <div className="event-card-info">
        <div className="event-card-title">{event.title}</div>
        <div className="event-card-meta">
          <span className="event-card-meta-item"><Icon name="clock" size={13} /> {event.startTime} – {event.endTime}</span>
          <span className="event-card-meta-item"><Icon name="monitor" size={13} /> {event.format}</span>
          <span className="event-card-meta-item"><Icon name="pin" size={13} /> {event.location}</span>
        </div>
      </div>
      {showRsvp && event.rsvp && (
        <span className={`rsvp-tag ${event.rsvp.toLowerCase().replace(' ', '-')}`}>
          {event.rsvp === 'Attended' ? '✓ Attended' : `✓ ${event.rsvp}`}
        </span>
      )}
      <button className="event-card-more" onClick={e => e.stopPropagation()}>···</button>
    </button>
  );
}
