import { createContext, useEffect, useReducer } from 'react';
import { AuthState, authReducer } from '../reducers/auth-reducer';
import {
  apiCheckUserSession,
  apiLogin,
  apiRegisterUser,
} from '../services/auth-api';
import { Macros } from '../types/macros';

type UserType = {
  email: string;
  password: string;
  dailyIntake?: {
    calories: number;
    macros: Macros;
  };
};

type AuthContextType = {
  authState: AuthState;
  register: (user: UserType) => Promise<boolean | undefined>;
  login: (email: string, password: string) => Promise<boolean | undefined>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

const initialState: AuthState = {
  isLoading: true,
  isLoggedIn: false,
  userId: null,
  error: '',
};

// TODO: Fix duplicated state between different providers.
export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    async function checkUserSession() {
      dispatch({ type: 'auth/loading' });
      const data = await apiCheckUserSession();

      if (data.errorMessage) {
        dispatch({ type: 'auth/error', payload: data.errorMessage });
      }

      if (data.isLoggedIn && data.userData) {
        dispatch({
          type: 'auth/setUser',
          payload: {
            isLoggedIn: data.isLoggedIn,
            userId: data.userData.userId,
          },
        });
      }
    }
    checkUserSession();
  }, []);

  async function register(user: UserType) {
    dispatch({ type: 'auth/loading' });

    const data = await apiRegisterUser(user);

    if (data.errorMessage) {
      dispatch({ type: 'auth/error', payload: data.errorMessage });
    }

    if (data.isLoggedIn && data.userData) {
      dispatch({
        type: 'auth/setUser',
        payload: { isLoggedIn: data.isLoggedIn, userId: data.userData.userId },
      });
      return data.isLoggedIn;
    }
  }

  async function login(email: string, password: string) {
    dispatch({ type: 'auth/loading' });

    const data = await apiLogin(email, password);

    if (data.errorMessage) {
      dispatch({ type: 'auth/error', payload: data.errorMessage });
    }

    if (data.isLoggedIn && data.userData) {
      dispatch({
        type: 'auth/setUser',
        payload: { isLoggedIn: data.isLoggedIn, userId: data.userData.userId },
      });
      return data.isLoggedIn;
    }
  }

  function logout() {
    dispatch({ type: 'auth/logout' });
  }

  const value = { authState, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
