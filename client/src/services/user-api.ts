import { Macros } from '../types/macros';

export async function apiGetUserData(userId: string): Promise<{
  errorMessage?: string;
  userData?: { calories: number; macros: Macros; createdFoods: string[] };
}> {
  try {
    const res = await fetch(`/api/user/${userId}`, {
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
  userData?: { calories: number; macros: Macros };
  errorMessage?: string;
}> {
  try {
    const res = await fetch('/api/user/update-macros', {
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
