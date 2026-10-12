import type { CalendarEvent } from '../types/calendar.ts';
import { isCalendarEventArray } from './calendarEventValidator.ts';

const STORAGE_KEY = 'calendar-events';

export const loadEvents = (): CalendarEvent[] => {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);

    if (!rawData) return [];

    const data: unknown = JSON.parse(rawData);

    return isCalendarEventArray(data) ? data : [];
  } catch {
    return [];
  }
};

export const saveEvents = (events: CalendarEvent[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    console.error('Failed to save calendar events:', error);
  }
};
