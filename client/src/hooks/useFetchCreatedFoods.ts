import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { apiGetCreatedFoods } from '../services/food-api';
import { Food } from '../types/food';

export function useFetchCreatedFoods() {
  const {
    authState: { userId },
  } = useAuth();
  const [createdFoods, setCreatedFoods] = useState<Food[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCreatedFoods() {
      if (!userId) return;

      const data = await apiGetCreatedFoods(userId);

      if (data.errorMessage) {
        setError(data.errorMessage);
      }

      if (data.createdFoods) {
        setCreatedFoods(data.createdFoods);
      }
      setIsLoading(false);
    }

    fetchCreatedFoods();
  }, [userId]);

  return { error, createdFoods, isLoading };
}
