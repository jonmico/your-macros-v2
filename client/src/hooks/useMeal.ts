import { useContext } from 'react';
import { MealContext } from '../contexts/meal-context';

export function useMeal() {
  const value = useContext(MealContext);

  if (!value) {
    throw new Error('MealContext used outside of Meal Provider');
  }

  return value;
}
