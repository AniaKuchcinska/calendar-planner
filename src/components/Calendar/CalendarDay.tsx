import './styles.css';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { CalendarEvent } from './types/calendar.ts';
import { CirclePlus } from 'lucide-react';

type CalendarDayProps = {
  date: Date;
  events: CalendarEvent[];
  onClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
};

const CalendarDay = ({
  date,
  events,
  onClick,
  onEventClick,
}: CalendarDayProps) => {
  const dayEvents = events.filter(
    (event) => event.date === format(date, 'yyyy-MM-dd'),
  );

  const formattedDate = format(date, 'd MMMM yyyy', { locale: fr });

  return (
    <div className="calendar-day">
      <button
        type="button"
        className="calendar-day-button"
        aria-label={`Ajouter un événement le ${formattedDate}`}
        onClick={() => onClick(date)}
      >
        <span className="calendar-day-number">{date.getDate()}</span>
        <CirclePlus className="calendar-day-add-icon" aria-hidden="true" />
      </button>

      <div className="calendar-day-events">
        {dayEvents.map((event) => (
          <button
            type="button"
            key={event.id}
            className="calendar-event"
            title={event.title}
            aria-label={`Modifier l'événement ${event.title}`}
            onClick={() => onEventClick(event)}
          >
            {event.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalendarDay;
