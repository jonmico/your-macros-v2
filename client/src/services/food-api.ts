import { Food } from '../types/food';

export async function apiCreateFood(food: Food, userId: string) {
  const response = await fetch('/api/food/create', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ food, userId }),
  });

  if (!response.ok) {
    return {
      errorMessage: `There was an error: ${response.status} - ${response.statusText}`,
    };
  }

  const data = await response.json();

  return data;
}
