import { useOutletContext } from 'react-router-dom';
import Header from '../components/layout/Header';
import CalendarGrid from '../components/calendar/CalendarGrid';
import UpcomingEvents from '../components/calendar/UpcomingEvents';

export default function CalendarPage() {
  const { accessLevel, baseUrl, title } = useOutletContext();
  return (
    <div className="page">
      <Header title={title} accessLevel={accessLevel} />
      <div className="calendar-layout">
        <CalendarGrid accessLevel={accessLevel} baseUrl={baseUrl} />
        <UpcomingEvents accessLevel={accessLevel} baseUrl={baseUrl} />
      </div>
    </div>
  );
}
