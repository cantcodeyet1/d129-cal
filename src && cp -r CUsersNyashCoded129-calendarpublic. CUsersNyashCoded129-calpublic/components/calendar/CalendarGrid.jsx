const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const TYPE_COLORS = {
  cot:       '#004165',
  workshops: '#a9b2b1',
  deadlines: '#772432',
  signature: '#f2df74',
};

const LEGEND_LABELS = {
  cot:       'Club Officer Training',
  workshops: 'Workshops',
  deadlines: 'Deadlines',
  signature: 'Signature Events',
};

const COT_KEYWORDS      = ['officer training', 'club officer training'];
const WORKSHOP_KEYWORDS = ['workshop'];
const SIGNATURE_KEYWORDS = ['conference', 'gala', 'annual', 'convention', 'summit', 'banquet'];

const TYPE_MAP = {
  'club officer training': 'cot',
  'cot':                   'cot',
  'workshop':              'workshops',
  'workshops':             'workshops',
  'deadline':              'deadlines',
  'deadlines':             'deadlines',
  'signature':             'signature',
  'signature event':       'signature',
  'signature events':      'signature',
};

export function classifyEvent(ev) {
  // Check the explicit type field first (Google Sheets source)
  if (ev.type) {
    const mapped = TYPE_MAP[ev.type.toLowerCase().trim()];
    if (mapped) return mapped;
  }
  // Fall back to keyword matching on title
  const t = ev.title.toLowerCase();
  if (COT_KEYWORDS.some(k => t.includes(k)))        return 'cot';
  if (WORKSHOP_KEYWORDS.some(k => t.includes(k)))   return 'workshops';
  if (SIGNATURE_KEYWORDS.some(k => t.includes(k)))  return 'signature';
  return 'workshops';
}

function matchesFilter(ev, filter) {
  if (filter === 'all')       return true;
  if (filter === 'deadlines') return false;
  return classifyEvent(ev) === filter;
}

export default function CalendarGrid({ accessLevel, baseUrl, activeFilter = 'all', setActiveFilter, filters = [], viewDate, setViewDate, selectedDay, onDaySelect, onEventClick, events = [] }) {
  const today = new Date();

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthEvents = events
    .filter(e => {
      const d = new Date(e.date);
      return d.getFullYear() === year && d.getMonth() === month;
    })
    .filter(e => e.accessLevel.includes(accessLevel))
    .filter(e => matchesFilter(e, activeFilter));

  // Mon=0 … Sun=6
  const firstDay     = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth  = new Date(year, month + 1, 0).getDate();
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
  const isToday = (day) =>
    day.current && day.day === today.getDate() &&
    month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="calendar-grid-wrap">
      <div className="calendar-nav">
        <div className="cal-nav-left">
          <button className="cal-nav-btn" onClick={prev}>‹</button>
          <span className="cal-month-label">{monthName} {year}</span>
          <button className="cal-nav-btn" onClick={next}>›</button>
          <button
            className={`cal-today-btn${month !== today.getMonth() || year !== today.getFullYear() ? ' active' : ''}`}
            onClick={() => setViewDate(new Date())}
          >Today</button>
        </div>
        <div className="cal-nav-filters">
          {filters.map(f => (
            <button
              key={f.key}
              className={`filter-chip${activeFilter === f.key ? ' active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >{f.label}</button>
          ))}
        </div>
      </div>

      <div className="cal-day-headers">
        {DAYS.map(d => (
          <div key={d} className="cal-day-header">{d}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {cells.map((cell, i) => {
          const dayEvents = getEventsForDay(cell);
          const dateStr = cell.current
            ? `${year}-${String(month + 1).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`
            : null;
          const isSelected = selectedDay === dateStr;
          return (
            <div
              key={i}
              className={`cal-cell${!cell.current ? ' other-month' : ''}${isToday(cell) ? ' today' : ''}${isSelected ? ' selected' : ''}${cell.current && new Date(year, month, cell.day) > today ? ' future' : ''}`}
              onClick={() => cell.current && dayEvents.length > 0 && onDaySelect(isSelected ? null : dateStr)}
              style={{ cursor: cell.current && dayEvents.length > 0 ? 'pointer' : 'default' }}
            >
              <span className={`cal-day-num${isToday(cell) ? ' today-circle' : ''}`}>{cell.day}</span>
              <div className="cal-events">
                {/* Pills: desktop only */}
                <div className="cal-pills">
                  {dayEvents.slice(0, 2).map(ev => (
                    <button
                      key={ev.id}
                      className="cal-event-pill"
                      style={{ backgroundColor: TYPE_COLORS[classifyEvent(ev)] }}
                      onClick={(e) => { e.stopPropagation(); onEventClick(ev.id); }}
                    >
                      {ev.title}
                    </button>
                  ))}
                  {dayEvents.length > 2 && (
                    <span className="cal-more">+{dayEvents.length - 2} more</span>
                  )}
                </div>
                {/* Underlines: mobile only */}
                <div className="cal-underlines">
                  {dayEvents.slice(0, 3).map((ev, di) => (
                    <span
                      key={di}
                      className="cal-underline"
                      style={{ backgroundColor: TYPE_COLORS[classifyEvent(ev)] }}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cal-legend">
        {Object.entries(LEGEND_LABELS).map(([key, label]) => (
          <span key={key} className="cal-legend-item">
            <span className="cal-legend-dot" style={{ backgroundColor: TYPE_COLORS[key] }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
