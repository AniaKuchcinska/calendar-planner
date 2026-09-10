import CalendarHeader from './CalendarHeader.tsx';
import WeekDays from './WeekDays.tsx';
import CalendarGrid from './CalendarGrid.tsx';
import { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';

type CalendarProps = {
  initialDate?: Date;
};

const Calendar = ({ initialDate = new Date() }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  return (
    <div>
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <WeekDays />
      <CalendarGrid currentDate={currentDate} />
    </div>
  );
};

export default Calendar;
