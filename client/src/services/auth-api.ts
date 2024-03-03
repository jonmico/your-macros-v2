import { Macros } from '../types/macros';
import { UserData } from '../types/user-data';

type UserType = {
  email: string;
  password: string;
  dailyIntake?: {
    calories: number;
    macros: Macros;
  };
};

export async function apiRegisterUser(
  user: UserType
): Promise<{ errorMessage?: string }> {
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

interface ILoginData {
  isLoggedIn?: boolean;
  userData?: UserData;
  errorMessage?: string;
}

export async function apiLogin(
  email: string,
  password: string
): Promise<ILoginData> {
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
