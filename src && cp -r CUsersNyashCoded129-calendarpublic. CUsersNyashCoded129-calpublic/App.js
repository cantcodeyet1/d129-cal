import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import CalendarPage from './pages/CalendarPage';
import AgendaPage from './pages/AgendaPage';
import DeadlinesPage from './pages/DeadlinesPage';
import MyEventsPage from './pages/MyEventsPage';
import RSVPsPage from './pages/RSVPsPage';
import ResourcesPage from './pages/ResourcesPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout accessLevel="district" baseUrl="" />}>
          <Route index element={<Navigate to="calendar" replace />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="agenda" element={<AgendaPage />} />
          <Route path="deadlines" element={<DeadlinesPage />} />
          <Route path="my-events" element={<MyEventsPage />} />
          <Route path="rsvps" element={<RSVPsPage />} />
          <Route path="resources" element={<ResourcesPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/calendar" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
