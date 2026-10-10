import type { CalendarEvent } from '../types/calendar';

export const isCalendarEvent = (value: unknown): value is CalendarEvent => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const event = value as Record<string, unknown>;

  return (
    typeof event.id === 'string' &&
    typeof event.title === 'string' &&
    typeof event.date === 'string'
  );
};

export const isCalendarEventArray = (
  value: unknown,
): value is CalendarEvent[] => {
  return Array.isArray(value) && value.every(isCalendarEvent);
};
