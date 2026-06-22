import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';
import Icon from '../ui/Icon';

export default function AgendaItem({ event, baseUrl }) {
  const navigate = useNavigate();
  const d = new Date(event.date);
  const month = d.toLocaleString('default', { month: 'short' }).toUpperCase();
  const day = d.getDate();
  const weekday = d.toLocaleString('default', { weekday: 'short' }).toUpperCase();

  const TYPE_COLORS = {
    District: '#004165',
    Division: '#2a6496',
    Area: '#772432',
    Club: '#b8860b',
    Other: '#4a5568',
  };

  return (
    <button className="agenda-item" onClick={() => navigate(`${baseUrl}/event/${event.id}`)}>
      <div className="agenda-date-col">
        <div className="agenda-date-badge" style={{ backgroundColor: TYPE_COLORS[event.type] }}>
          <span className="agenda-month">{month}</span>
          <span className="agenda-day">{day}</span>
          <span className="agenda-weekday">{weekday}</span>
        </div>
      </div>
      <div className="agenda-info">
        <div className="agenda-title">{event.title}</div>
        <div className="agenda-meta-row">
          <span className="agenda-meta-item"><Icon name="clock" size={13} /> {event.startTime} – {event.endTime}</span>
          <span className="agenda-meta-item"><Icon name="monitor" size={13} /> {event.format}</span>
          <span className="agenda-meta-item"><Icon name="pin" size={13} /> {event.location}</span>
        </div>
      </div>
      <Badge type={event.type} />
      <span className="agenda-chevron">›</span>
    </button>
  );
}
