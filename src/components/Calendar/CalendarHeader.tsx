import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type CalendarHeaderProps = {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

const CalendarHeader = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) => {
  return (
    <header className="calendar-header">
      <button
        type="button"
        className="calendar-navigation-button"
        aria-label="Mois précédent"
        onClick={onPrevMonth}
      >
        <ChevronLeft />
      </button>
      <h2 className="calendar-title">
        {format(currentDate, 'MMMM yyyy', { locale: fr })}
      </h2>
      <button
        type="button"
        className="calendar-navigation-button"
        aria-label="Mois suivant"
        onClick={onNextMonth}
      >
        <ChevronRight />
      </button>
    </header>
  );
};

export default CalendarHeader;
