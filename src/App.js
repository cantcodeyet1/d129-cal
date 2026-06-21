import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import LandingPage from './pages/LandingPage';
import CalendarPage from './pages/CalendarPage';
import AgendaPage from './pages/AgendaPage';
import DeadlinesPage from './pages/DeadlinesPage';
import MyEventsPage from './pages/MyEventsPage';
import RSVPsPage from './pages/RSVPsPage';
import ResourcesPage from './pages/ResourcesPage';
import EventDetailPage from './pages/EventDetailPage';
import './App.css';

function LevelRoutes({ accessLevel, baseUrl }) {
  return (
    <Routes>
      <Route element={<AppLayout accessLevel={accessLevel} baseUrl={baseUrl} />}>
        <Route index element={<Navigate to="calendar" replace />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="agenda" element={<AgendaPage />} />
        <Route path="deadlines" element={<DeadlinesPage />} />
        <Route path="my-events" element={<MyEventsPage />} />
        <Route path="rsvps" element={<RSVPsPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="event/:id" element={<EventDetailPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/d129/crest/*" element={<LevelRoutes accessLevel="district" baseUrl="/d129/crest" />} />
        <Route path="/d129/ridge/:division/*" element={<LevelRoutes accessLevel="division" baseUrl="/d129/ridge/div-e" />} />
        <Route path="/d129/summit/:area/*" element={<LevelRoutes accessLevel="area" baseUrl="/d129/summit/area-42" />} />
        <Route path="/d129/base/:club/*" element={<LevelRoutes accessLevel="club" baseUrl="/d129/base/club-1234" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
