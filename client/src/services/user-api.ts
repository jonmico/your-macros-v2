import { Macros } from '../types/macros';

const API_URL = import.meta.env.PROD
  ? 'https://your-macros-v2-backend.onrender.com'
  : '';

export async function apiGetUserData(userId: string): Promise<{
  errorMessage?: string;
  userData?: {
    calories: number;
    macros: Macros;
    createdFoods: string[];
    isInitialized: boolean;
  };
}> {
  try {
    const res = await fetch(`${API_URL}/api/user/${userId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
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

export async function apiUpdateMacros(
  userId: string,
  calories: number,
  macros: Macros
): Promise<{
  userData?: { calories: number; macros: Macros; isInitialized: boolean };
  errorMessage?: string;
}> {
  try {
    const res = await fetch(`${API_URL}/api/user/update-macros`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ userId, calories, macros }),
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
