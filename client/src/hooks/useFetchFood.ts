import { useEffect, useState } from 'react';
import { Food } from '../types/food';
import { useParams } from 'react-router-dom';
import { apiGetFood } from '../services/food-api';

export function useFetchFood() {
  const { foodId } = useParams();
  const [food, setFood] = useState<Food | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFood() {
      if (!foodId) return;

      const data = await apiGetFood(foodId);

      if (data.errorMessage) {
        setError(data.errorMessage);
      }

      if (data.food) {
        setFood(data.food);
      }

      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);

  return { food, error, isLoading };
}
