import { FoodLog } from '../types/food-log';
import { Meal } from '../types/meal';

const API_URL = import.meta.env.PROD ? 'https://www.your-macros-api.com/' : '';

export async function apiCreateLog(
  userId: string,
  name: string
): Promise<{ foodLog?: FoodLog; errorMessage?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/food-log/create`, {
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
    const res = await fetch(`${API_URL}/api/food-log/${userId}`, {
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

export async function apiAddMealToLog(
  logId: string,
  meal: Meal
): Promise<{ updatedLog?: FoodLog; errorMessage?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/food-log/add-meal`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ logId, meal }),
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

export async function apiDeleteMealFromLog(
  userId: string,
  logId: string,
  mealId: string
): Promise<{ updatedLog?: FoodLog; errorMessage?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/food-log/delete`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ userId, logId, mealId }),
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
    return { errorMessage: 'server down' };
  }
}

export async function apiEditMealInLog(
  logId: string,
  meal: Meal
): Promise<{ foodLog?: FoodLog; errorMessage?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/food-log/edit-meal`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ logId, meal }),
    });

    if (!res.ok) {
      const errorData: { errorMessage: string } = await res.json();

      if (errorData) {
        return { errorMessage: errorData.errorMessage };
      }
    }

    return await res.json();
  } catch (err) {
    return { errorMessage: 'The server is most likely down.' };
  }
}

export async function apiDeleteLog(
  logId: string
): Promise<{ deleteSuccess: boolean } | { errorMessage: string }> {
  try {
    const res = await fetch(`${API_URL}/api/food-log/`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ logId }),
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
    return { errorMessage: 'The server is most likely down.' };
  }
}
