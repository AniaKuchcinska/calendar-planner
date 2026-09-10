import './styles.css';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type CalendarDayProps = {
  date: Date;
};

const CalendarDay = ({ date }: CalendarDayProps) => {
  return (
    <div
      aria-label={format(date, 'd MMMM yyyy', { locale: fr })}
      className="calendar-day"
    >
      {date.getDate()}
    </div>
  );
};

export default CalendarDay;
