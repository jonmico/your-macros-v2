import { useContext } from 'react';
import { FoodContext } from '../contexts/food-context';

export function useFood() {
  const value = useContext(FoodContext);

  if (!value) {
    throw new Error('Tried to use FoodContext outside of FoodProvider.');
  }

  return value;
}
