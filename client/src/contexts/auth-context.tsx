import { createContext, useReducer } from 'react';
import { AuthState, authReducer } from '../reducers/auth-reducer';
import { apiRegisterUser } from '../services/auth-api';
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
  isLoading: boolean;
  isAuthenticated: boolean;
  userId: string;
  error: string;
  register: (user: UserType) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  userId: '',
  error: '',
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  async function register(user: UserType) {
    dispatch({ type: 'auth/loading' });
    const newUser = await apiRegisterUser(user);
    console.log(newUser);
    dispatch({ type: 'auth/register' });
  }

  const value = { ...authState, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
