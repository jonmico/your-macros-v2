import { FoodLog } from '../types/food-log';

export async function apiCreateLog(
  userId: string,
  name: string
): Promise<{ foodLog?: FoodLog; errorMessage?: string }> {
  try {
    const res = await fetch('/api/food-log/create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ userId, name }),
    });

    if (!res.ok) {
      const errorData: { errorMessage: string } = await res.json();

      if (errorData) {
        return { errorMessage: errorData.errorMessage };
      }
    }

    return await res.json();
  } catch (err) {
    return {
      errorMessage: 'The server is most likely down.',
    };
  }
}

export async function apiFetchLogs(
  userId: string
): Promise<{ foodLogs?: FoodLog[]; errorMessage?: string }> {
  try {
    const res = await fetch(`/api/food-log/${userId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData: { errorMessage: string } = await res.json();

      if (errorData) {
        return {
          errorMessage: errorData.errorMessage,
        };
      }
    }

    return await res.json();
  } catch (err) {
    return {
      errorMessage: 'The server is most likely down.',
    };
  }
}
