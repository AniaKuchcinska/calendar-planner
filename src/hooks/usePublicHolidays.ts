import { fetchPublicHolidays } from '../services/holidayService.ts';
import { useQuery } from '@tanstack/react-query';

export const useHolidays = (countryCode: string, year: number) => {
  return useQuery({
    queryKey: ['holidays', countryCode, year],
    queryFn: () => fetchPublicHolidays(countryCode, year),
    staleTime: 1000 * 60 * 60 * 24,
  });
};
