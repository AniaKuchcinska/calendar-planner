import { eachDayOfInterval, endOfMonth, startOfMonth, getDay } from 'date-fns';
import CalendarDay from './CalendarDay.tsx';
import './styles.css';
import type { CalendarDateProps } from './types.ts';

const CalendarGrid = ({ currentDate }: CalendarDateProps) => {
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
        <CalendarDay key={day.toISOString()} date={day} />
      ))}
    </div>
  );
};

export default CalendarGrid;
