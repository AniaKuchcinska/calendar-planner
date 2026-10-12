import { useEffect, useState } from 'react';
import type { CalendarEvent } from '../types/calendar.ts';
import { loadEvents, saveEvents } from '../utils/calendarEventStorage.ts';

const usePersistentEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(loadEvents);

  useEffect(() => {
    saveEvents(events);
  }, [events]);

  return { events, setEvents };
};

export default usePersistentEvents;
