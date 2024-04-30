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

export async function apiSearchFoodsByText(
  searchText: string
): Promise<{ searchedFoods?: Food[]; errorMessage?: string }> {
  try {
    const res = await fetch(`/api/food/search/${searchText}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
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

export async function apiGetCreatedFoods(
  userId: string
): Promise<{ createdFoods?: Food[]; errorMessage?: string }> {
  try {
    const res = await fetch(`/api/food/created-foods/${userId}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
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

export async function apiGetFood(
  foodId: string
): Promise<{ food: Food } | { errorMessage: string }> {
  try {
    const res = await fetch(`/api/food/${foodId}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
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

export async function apiDeleteFood(
  foodId: string
): Promise<{ errorMessage?: string; deleteSuccess: boolean }> {
  try {
    const res = await fetch('/api/food/', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ foodId }),
    });

    if (!res.ok) {
      const errorData: { errorMessage: string } = await res.json();

      if (errorData) {
        return {
          errorMessage: errorData.errorMessage,
          deleteSuccess: false,
        };
      }
    }

    return await res.json();
  } catch (err) {
    return {
      deleteSuccess: false,
      errorMessage: 'The server is most likely down.',
    };
  }
}
