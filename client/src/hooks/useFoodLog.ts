import { useContext } from 'react';
import { FoodLogContext } from '../contexts/food-log-context';

export function useFoodLog() {
  const value = useContext(FoodLogContext);

  if (!value) {
    throw new Error('Tried to use FoodLogContext outside of FoodLogProvider.');
  }

  return value;
}
