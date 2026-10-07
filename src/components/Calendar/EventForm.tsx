import type { CalendarEvent } from './types/calendar.ts';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type EventFormProps = {
  date: Date;
  event?: CalendarEvent;
  onSubmit: (title: string) => void;
  onCancel: () => void;
  onDelete: (eventId: string) => void;
};

type EventFormTitle = {
  title: string;
};

const EventForm = ({
  date,
  event,
  onSubmit,
  onCancel,
  onDelete,
}: EventFormProps) => {
  const { register, handleSubmit, formState } = useForm<EventFormTitle>({
    defaultValues: {
      title: event?.title ?? '',
    },
  });

  const handleFormSubmit = ({ title }: EventFormTitle) => {
    onSubmit(title.trim());
  };

  return (
    <div className="event-modal" role="dialog" aria-modal="true">
      <form
        className="event-form"
        onSubmit={handleSubmit(handleFormSubmit)}
        aria-label={event ? 'Supprimer un événement' : 'Ajouter un événement'}
      >
        <p className="event-form-date">
          {format(date, 'd MMMM yyyy', { locale: fr })}
        </p>

        <label className="event-form-label" htmlFor="event-title">
          Titre de l’événement
          <input
            id="event-title"
            type="text"
            placeholder="Ex. Réunion équipe"
            autoFocus
            {...register('title', {
              required: 'Le titre est obligatoire',
            })}
          />
        </label>

        {formState.errors.title && (
          <p className="event-form-error" role="alert">
            {formState.errors.title.message}
          </p>
        )}

        <div className="event-form-actions">
          <button type="button" onClick={onCancel}>
            Annuler
          </button>

          {!event && <button type="submit">Ajouter</button>}

          {event && (
            <button type="button" onClick={() => onDelete(event.id)}>
              Supprimer
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EventForm;
