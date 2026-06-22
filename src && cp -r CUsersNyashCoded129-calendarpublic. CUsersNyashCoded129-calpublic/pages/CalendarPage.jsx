import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import CalendarGrid from '../components/calendar/CalendarGrid';
import UpcomingEvents from '../components/calendar/UpcomingEvents';
import EventDetail from '../components/events/EventDetail';
import useEvents from '../hooks/useEvents';

const EVENT_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'cot', label: 'Club Officer Training' },
  { key: 'deadlines', label: 'Deadlines' },
  { key: 'signature', label: 'Signature Events' },
  { key: 'workshops', label: 'Workshops' },
];

export default function CalendarPage() {
  const { accessLevel, baseUrl } = useOutletContext();
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [openEventId, setOpenEventId] = useState(null);

  const { events, loading } = useEvents();
  const openEvent = events.find(e => e.id === openEventId);

  if (loading) {
    return (
      <div className="calendar-loading">
        <div className="calendar-loading-spinner" />
        <p>Loading events…</p>
      </div>
    );
  }

  return (
    <div className="calendar-page">
      <div className={`calendar-layout${openEventId ? ' blurred' : ''}`}>
        <CalendarGrid
          accessLevel={accessLevel}
          baseUrl={baseUrl}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          filters={EVENT_FILTERS}
          viewDate={viewDate}
          setViewDate={(d) => { setViewDate(d); setSelectedDay(null); }}
          selectedDay={selectedDay}
          onDaySelect={(day) => setSelectedDay(prev => prev === day ? null : day)}
          onEventClick={(id) => setOpenEventId(id)}
          events={events}
        />
        <UpcomingEvents
          accessLevel={accessLevel}
          baseUrl={baseUrl}
          viewDate={viewDate}
          selectedDay={selectedDay}
          onEventClick={(id) => setOpenEventId(id)}
          events={events}
        />
      </div>

      {openEventId && (
        <div className="event-modal-backdrop" onClick={() => setOpenEventId(null)}>
          <div className="event-modal-wrap" onClick={e => e.stopPropagation()}>
            <EventDetail event={openEvent} onClose={() => setOpenEventId(null)} />
          </div>
        </div>
      )}
    </div>
  );
}
