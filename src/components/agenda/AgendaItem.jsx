import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';

export default function AgendaItem({ event, baseUrl }) {
  const navigate = useNavigate();
  const d = new Date(event.date);
  const month = d.toLocaleString('default', { month: 'short' }).toUpperCase();
  const day = d.getDate();
  const weekday = d.toLocaleString('default', { weekday: 'short' }).toUpperCase();

  const TYPE_COLORS = {
    District: '#722F37',
    Division: '#1a3a6b',
    Area: '#8B0000',
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
          <span>🕐 {event.startTime} – {event.endTime}</span>
          <span>💻 {event.format}</span>
          <span>📍 {event.location}</span>
        </div>
      </div>
      <Badge type={event.type} />
      <span className="agenda-chevron">›</span>
    </button>
  );
}
