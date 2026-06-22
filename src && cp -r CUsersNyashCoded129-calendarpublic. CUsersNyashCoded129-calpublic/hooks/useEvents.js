import { useState, useEffect } from 'react';
import { fetchEvents } from '../data/fetchEvents';
import { events as fallbackEvents } from '../data/events';

export default function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents()
      .then(data => {
        if (data.length > 0) {
          setEvents(data);
        } else {
          console.warn('Google Sheets returned no events, using local data');
          setEvents(fallbackEvents);
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn('Google Sheets fetch failed, using local data:', err);
        setEvents(fallbackEvents);
        setLoading(false);
        setError(err);
      });
  }, []);

  return { events, loading, error };
}
