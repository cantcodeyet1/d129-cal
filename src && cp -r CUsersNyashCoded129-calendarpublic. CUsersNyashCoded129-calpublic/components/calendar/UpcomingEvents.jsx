import { TYPE_COLORS, classifyEvent } from './CalendarGrid';
import Icon from '../ui/Icon';

export default function UpcomingEvents({ accessLevel, viewDate, selectedDay, onEventClick, events = [] }) {
  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const filtered = events
    .filter(e => e.accessLevel.includes(accessLevel))
    .filter(e => {
      const d = new Date(e.date);
      if (selectedDay) return e.date === selectedDay;
      return d.getFullYear() === year && d.getMonth() === month;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="upcoming-panel">
      <div className="upcoming-panel-header">
        <h3 className="upcoming-panel-title">Events</h3>
      </div>

      <div className="upcoming-list">
        {filtered.length === 0 && (
          <p className="upcoming-empty">No events this month.</p>
        )}
        {filtered.map(ev => {
          const d = new Date(ev.date);
          const mon = d.toLocaleString('default', { month: 'short' }).toUpperCase();
          const day = d.getDate();
          const weekday = d.toLocaleString('default', { weekday: 'short' });
          return (
            <button
              key={ev.id}
              className="upcoming-item"
              onClick={() => onEventClick(ev.id)}
            >
              <div className="upcoming-date-badge" style={{ backgroundColor: TYPE_COLORS[classifyEvent(ev)] }}>
                <span className="upcoming-month">{mon}</span>
                <span className="upcoming-day">{day}</span>
                <span className="upcoming-weekday">{weekday}</span>
              </div>
              <div className="upcoming-info">
                <div className="upcoming-title">{ev.title}</div>
                <div className="upcoming-meta">{ev.startTime} – {ev.endTime}</div>
                <div className="upcoming-meta upcoming-meta-loc">
                  <Icon name="pin_filled" size={12} color="#772432" />
                  {ev.format}
                  <span className="upcoming-access-pill">
                    {ev.audience === 'Open to All' || !ev.audience ? 'Open' : ev.audience}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
