import { Macros } from '../types/macros';

type UserType = {
  email: string;
  password: string;
  dailyIntake?: {
    calories: number;
    macros: Macros;
  };
};

export async function apiRegisterUser(user: UserType): Promise<{
  isLoggedIn?: boolean;
  userId?: string;
  errorMessage?: string;
}> {
  try {
    const response = await fetch('/api/user/create', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ user }),
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

export async function apiLogin(
  email: string,
  password: string
): Promise<{
  isLoggedIn?: boolean;
  userId?: string;
  errorMessage?: string;
}> {
  try {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
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

export async function apiCheckUserSession(): Promise<{
  isLoggedIn?: boolean;
  userId?: string;
  errorMessage?: string;
}> {
  try {
    const res = await fetch('/api/user', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
        'credentials': 'include',
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
    return {
      errorMessage: 'There is a very strong possibility the server is down.',
    };
  }
}

export async function apiChangePassword(
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string
): Promise<{ updatedPassword: boolean } | { errorMessage: string }> {
  try {
    const res = await fetch(`/api/user/change-password`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
        'credentials': 'include',
      },
      body: JSON.stringify({ oldPassword, newPassword, confirmNewPassword }),
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

export async function apiDeleteUser(): Promise<
  { successfulDelete: boolean } | { errorMessage: string }
> {
  try {
    const res = await fetch('/api/user/', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'credentials': 'include',
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
