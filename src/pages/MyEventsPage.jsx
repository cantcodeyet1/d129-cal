import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Header from '../components/layout/Header';
import EventCard from '../components/events/EventCard';
import { events } from '../data/events';

const TABS = ['Registered', 'Hosting', 'Interested'];

export default function MyEventsPage() {
  const { accessLevel, baseUrl, title } = useOutletContext();
  const [tab, setTab] = useState('Registered');

  const myEvents = events.filter(e =>
    e.accessLevel.includes(accessLevel) && e.rsvp && e.rsvp !== 'Attended'
  );
  const pastEvents = events.filter(e =>
    e.accessLevel.includes(accessLevel) && e.rsvp === 'Attended'
  );

  return (
    <div className="page">
      <Header title={title} accessLevel={accessLevel} />
      <div className="my-events-page">
        <div className="agenda-tabs">
          {TABS.map(t => (
            <button
              key={t}
              className={`agenda-tab${tab === t ? ' active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
          <button className="cal-filter-btn ml-auto">⊟ Filter</button>
        </div>

        {myEvents.length > 0 && (
          <div className="events-section">
            <h3 className="events-section-label">Upcoming Events</h3>
            {myEvents.map(ev => (
              <EventCard key={ev.id} event={ev} baseUrl={baseUrl} />
            ))}
          </div>
        )}

        {pastEvents.length > 0 && (
          <div className="events-section">
            <h3 className="events-section-label">Past Events</h3>
            {pastEvents.map(ev => (
              <EventCard key={ev.id} event={ev} baseUrl={baseUrl} />
            ))}
          </div>
        )}

        <button className="show-more-btn">View All My Events</button>
      </div>
    </div>
  );
}
