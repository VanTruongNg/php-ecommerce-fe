import { useQuery } from '@tanstack/react-query';
import { carService } from '@/lib/api/services/car-service';

export const NEWEST_CARS_QUERY_KEY = ['cars', 'newest'] as const;

export const useNewestCars = () => {
  return useQuery({
    queryKey: NEWEST_CARS_QUERY_KEY,
    queryFn: () => carService.getNewestCars(),
  });
}; 