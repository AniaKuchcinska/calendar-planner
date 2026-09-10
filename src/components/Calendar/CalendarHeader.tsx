import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { CalendarDateProps } from './types.ts';

type CalendarHeaderProps = CalendarDateProps & {
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
      <button type="button" aria-label="Mois précédent" onClick={onPrevMonth}>
        <ChevronLeft />
      </button>
      <h2 className="calendar-title">
        {format(currentDate, 'MMMM yyyy', { locale: fr })}
      </h2>
      <button type="button" aria-label="Mois suivant" onClick={onNextMonth}>
        <ChevronRight />
      </button>
    </header>
  );
};

export default CalendarHeader;
