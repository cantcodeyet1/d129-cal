import { useOutletContext } from 'react-router-dom';
import Header from '../components/layout/Header';
import EventCard from '../components/events/EventCard';
import { events } from '../data/events';

export default function RSVPsPage() {
  const { accessLevel, baseUrl, title } = useOutletContext();
  const rsvpd = events.filter(e => e.accessLevel.includes(accessLevel) && e.rsvp);
  return (
    <div className="page">
      <Header title={title} accessLevel={accessLevel} />
      <div className="my-events-page">
        <div className="events-section">
          <h3 className="events-section-label">Your RSVPs</h3>
          {rsvpd.length === 0 && <p className="empty-state">No RSVPs yet.</p>}
          {rsvpd.map(ev => (
            <EventCard key={ev.id} event={ev} baseUrl={baseUrl} />
          ))}
        </div>
      </div>
    </div>
  );
}
