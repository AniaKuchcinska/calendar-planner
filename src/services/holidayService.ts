import type { PublicHoliday } from '../types/publicHoliday.ts';

const API_BASE_URL = import.meta.env.VITE_HOLIDAYS_API_URL;

const holidayTranslations: Record<string, string> = {
  "New Year's Day": 'Jour de l’An',
  'Easter Monday': 'Lundi de Pâques',
  'Labour Day': 'Fête du Travail',
  'Victory in Europe Day': 'Victoire de 1945',
  'Ascension Day': 'Ascension',
  'Whit Monday': 'Lundi de Pentecôte',
  'Bastille Day': 'Fête nationale',
  'Assumption Day': 'Assomption',
  'Assumption of Mary to Heaven': 'Assomption',
  "All Saints' Day": 'Toussaint',
  'Armistice Day': 'Armistice de 1918',
  'Christmas Day': 'Noël',
};

export const fetchPublicHolidays = async (
  countryCode: string,
  year: number,
): Promise<PublicHoliday[]> => {
  const response = await fetch(
    `${API_BASE_URL}/Holidays/${countryCode}/${year}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch public holidays: ${response.status}`);
  }
  const holidays: PublicHoliday[] = await response.json();
  return holidays.map((holiday) => ({
    ...holiday,
    name: holidayTranslations[holiday.name] ?? holiday.name,
  }));
};
