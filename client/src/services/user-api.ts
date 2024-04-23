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
