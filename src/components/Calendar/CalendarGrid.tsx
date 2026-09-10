import { eachDayOfInterval, endOfMonth, startOfMonth, getDay } from 'date-fns';
import CalendarDay from './CalendarDay.tsx';
import './styles.css';
import type { CalendarEvent } from './types/calendar.ts';

type CalendarGridProps = {
  currentDate: Date;
  events: CalendarEvent[];
  onDayClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
};

const CalendarGrid = ({
  currentDate,
  events,
  onDayClick,
  onEventClick,
}: CalendarGridProps) => {
  const firstDayOfMonth = startOfMonth(currentDate);
  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });
  const dayOfWeek = getDay(firstDayOfMonth);
  const emptyDaysBeforeFirst = (dayOfWeek + 6) % 7;
  const emptyDaysArray = Array.from({ length: emptyDaysBeforeFirst });
  return (
    <div className="calendar-grid-layout" aria-label="Calendrier">
      {emptyDaysArray.map((_, index) => (
        <div key={`empty-${index}`}></div>
      ))}
      {days.map((day) => (
        <CalendarDay
          key={day.toISOString()}
          date={day}
          onClick={onDayClick}
          onEventClick={onEventClick}
          events={events}
        />
      ))}
    </div>
  );
};

export default CalendarGrid;
