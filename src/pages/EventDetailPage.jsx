import { useOutletContext, useParams } from 'react-router-dom';
import EventDetail from '../components/events/EventDetail';
import { getEventById } from '../data/events';

export default function EventDetailPage() {
  const { id } = useParams();
  const { baseUrl } = useOutletContext();
  const event = getEventById(id);
  return <EventDetail event={event} baseUrl={baseUrl} />;
}
