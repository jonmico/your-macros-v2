import { Food } from '../types/food';

export async function apiCreateFood(food: Food, userId: string) {
  const response = await fetch('/api/food/create', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ food, userId }),
  });

  const data = await response.json();

  return data;
}
