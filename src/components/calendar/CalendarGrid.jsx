import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEventsForMonth } from '../../data/events';

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const TYPE_COLORS = {
  District: '#722F37',
  Division: '#1a3a6b',
  Area: '#8B0000',
  Club: '#b8860b',
  Other: '#4a5568',
};

export default function CalendarGrid({ accessLevel, baseUrl }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(2025, 4, 1)); // May 2025
  const navigate = useNavigate();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthEvents = getEventsForMonth(year, month);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push({ day: prevMonthDays - firstDay + 1 + i, current: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push({ day: i, current: true });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - firstDay - daysInMonth + 1, current: false });
  }

  const getEventsForDay = (day) => {
    if (!day.current) return [];
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day.day).padStart(2, '0')}`;
    return monthEvents.filter(e => e.date === dateStr);
  };

  const monthName = viewDate.toLocaleString('default', { month: 'long' });

  const prev = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const next = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const isToday = (day) => {
    return day.current &&
      day.day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();
  };

  return (
    <div className="calendar-grid-wrap">
      <div className="calendar-nav">
        <button className="cal-nav-btn" onClick={prev}>‹</button>
        <span className="cal-month-label">{monthName} {year}</span>
        <button className="cal-nav-btn" onClick={next}>›</button>
        <div className="cal-view-btns">
          <button className="cal-view-btn active">Month</button>
          <button className="cal-view-btn">Week</button>
          <button className="cal-view-btn">Day</button>
        </div>
        <button className="cal-view-btn today-btn" onClick={() => setViewDate(new Date())}>Today</button>
        <button className="cal-filter-btn">⊟ Filter</button>
      </div>

      <div className="calendar-grid">
        {DAYS.map(d => (
          <div key={d} className="cal-day-header">{d}</div>
        ))}
        {cells.map((cell, i) => {
          const dayEvents = getEventsForDay(cell);
          return (
            <div key={i} className={`cal-cell${!cell.current ? ' other-month' : ''}${isToday(cell) ? ' today' : ''}`}>
              <span className={`cal-day-num${isToday(cell) ? ' today-circle' : ''}`}>{cell.day}</span>
              <div className="cal-events">
                {dayEvents.slice(0, 2).map(ev => (
                  <button
                    key={ev.id}
                    className="cal-event-pill"
                    style={{ backgroundColor: TYPE_COLORS[ev.type] }}
                    onClick={() => navigate(`${baseUrl}/event/${ev.id}`)}
                  >
                    {ev.title}
                  </button>
                ))}
                {dayEvents.length > 2 && (
                  <span className="cal-more">+{dayEvents.length - 2} more</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="cal-legend">
        {Object.entries(TYPE_COLORS).map(([type, color]) => (
          <span key={type} className="cal-legend-item">
            <span className="cal-legend-dot" style={{ backgroundColor: color }} />
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}
