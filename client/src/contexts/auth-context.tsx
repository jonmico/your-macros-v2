import { createContext, useReducer } from 'react';
import { AuthState, authReducer } from '../reducers/auth-reducer';
import { apiLogin, apiRegisterUser } from '../services/auth-api';
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

type AuthContextType = {
  isLoading: boolean;
  isLoggedIn: boolean;
  userData: UserData | null;
  error: string;
  register: (user: UserType) => Promise<boolean | undefined>;
  login: (email: string, password: string) => Promise<boolean | undefined>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

const initialState: AuthState = {
  isLoading: false,
  isLoggedIn: false,
  userData: null,
  error: '',
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  async function register(user: UserType) {
    dispatch({ type: 'auth/loading' });

    const data = await apiRegisterUser(user);

    if (data.errorMessage) {
      dispatch({ type: 'auth/error', payload: data.errorMessage });
    }

    if (data.isLoggedIn && data.userData) {
      dispatch({
        type: 'auth/register',
        payload: { isLoggedIn: data.isLoggedIn, userData: data.userData },
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
        type: 'auth/login',
        payload: { isLoggedIn: data.isLoggedIn, userData: data.userData },
      });
      return data.isLoggedIn;
    }
  }

  const value = { ...authState, register, login };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
