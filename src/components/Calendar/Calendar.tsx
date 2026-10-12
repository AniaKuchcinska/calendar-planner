import CalendarHeader from './CalendarHeader.tsx';
import WeekDays from './WeekDays.tsx';
import CalendarGrid from './CalendarGrid.tsx';
import { useState } from 'react';
import { addMonths, format, subMonths } from 'date-fns';
import type { CalendarEvent } from '../../types/calendar.ts';
import EventForm from './EventForm.tsx';
import usePersistentEvents from '../../hooks/usePersistentEvents.ts';
import { useHolidays } from '../../hooks/usePublicHolidays.ts';

type CalendarProps = {
  initialDate?: Date;
};

const Calendar = ({ initialDate = new Date() }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const { events, setEvents } = usePersistentEvents();

  const displayedYear = currentDate.getFullYear();
  const {
    data: publicHolidays = [],
    isLoading,
    error,
  } = useHolidays('FR', displayedYear);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleEventSubmit = (title: string) => {
    if (!selectedDate) return;

    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      date: format(selectedDate, 'yyyy-MM-dd'),
      title,
    };

    setEvents((currentEvents) => [...currentEvents, newEvent]);
    setSelectedDate(null);
  };

  const handleEventDelete = (eventId: string) => {
    setEvents((currentEvents) =>
      currentEvents.filter(({ id }) => id !== eventId),
    );
    setSelectedEvent(null);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setSelectedDate(null);
  };

  return (
    <div className="calendar">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <WeekDays />
      {isLoading && <p>Chargement des jours fériés...</p>}
      {error && <p>Impossible de charger les jours fériés.</p>}
      <CalendarGrid
        currentDate={currentDate}
        onDayClick={handleDayClick}
        onEventClick={handleEventClick}
        events={events}
        publicHolidays={publicHolidays}
      />

      {selectedDate && (
        <EventForm
          date={selectedDate}
          onSubmit={handleEventSubmit}
          onCancel={() => setSelectedDate(null)}
          onDelete={() => {}}
        />
      )}

      {selectedEvent && (
        <EventForm
          date={new Date(selectedEvent.date)}
          event={selectedEvent}
          onSubmit={() => {}}
          onCancel={() => setSelectedEvent(null)}
          onDelete={handleEventDelete}
        />
      )}
    </div>
  );
};

export default Calendar;
