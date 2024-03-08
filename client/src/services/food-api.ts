import { Food } from '../types/food';

export async function apiCreateFood(
  food: Food,
  userId: string
): Promise<{ food?: Food; errorMessage?: string }> {
  try {
    const response = await fetch('/api/food/create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ food, userId }),
    });

    if (!response.ok) {
      const errorData: { errorMessage: string } = await response.json();

      if (errorData) {
        return { errorMessage: errorData.errorMessage };
      }
    }

    return await response.json();
  } catch (err) {
    return {
      errorMessage: 'There is a very strong possibility the server is down.',
    };
  }
}
