import { createContext, useEffect, useReducer } from 'react';
import { AuthState, authReducer } from '../reducers/auth-reducer';
import {
  apiChangePassword,
  apiCheckUserSession,
  apiLogin,
  apiRegisterUser,
} from '../services/auth-api';
import { Macros } from '../types/macros';
import { useCookies } from 'react-cookie';

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
  changePassword: (
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) => Promise<boolean>;
};

const cookieOptions = {
  path: '/',
  sameSite: true,
  partitioned: true,
  maxAge: 43_200_200,
  secure: true,
  httpOnly: false,
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

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const [, setCookie, removeCookie] = useCookies(['token']);

  useEffect(() => {
    async function checkUserSession() {
      dispatch({ type: 'auth/loading' });
      const data = await apiCheckUserSession();

      if ('errorMessage' in data) {
        dispatch({ type: 'auth/error', payload: data.errorMessage });
      } else {
        dispatch({
          type: 'auth/setUser',
          payload: {
            isLoggedIn: data.isLoggedIn,
            userId: data.userId,
          },
        });
        setCookie('token', data.token, cookieOptions);
      }
    }
    checkUserSession();
  }, [setCookie]);

  async function register(user: UserType) {
    dispatch({ type: 'auth/loading' });

    const data = await apiRegisterUser(user);

    if ('errorMessage' in data) {
      dispatch({ type: 'auth/error', payload: data.errorMessage });
    } else {
      dispatch({
        type: 'auth/setUser',
        payload: { isLoggedIn: data.isLoggedIn, userId: data.userId },
      });
      setCookie('token', data.token, cookieOptions);

      return data.isLoggedIn;
    }
  }

  async function login(email: string, password: string) {
    dispatch({ type: 'auth/loading' });

    const data = await apiLogin(email, password);

    if ('errorMessage' in data) {
      dispatch({ type: 'auth/error', payload: data.errorMessage });
    } else {
      dispatch({
        type: 'auth/setUser',
        payload: { isLoggedIn: data.isLoggedIn, userId: data.userId },
      });
      setCookie('token', data.token, cookieOptions);

      return data.isLoggedIn;
    }
  }

  // FIXME: This doesn't actually clear out all the state in other contexts.
  function logout() {
    dispatch({ type: 'auth/logout' });
    removeCookie('token', { path: '/', secure: true });
  }

  async function changePassword(
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ): Promise<boolean> {
    const data = await apiChangePassword(
      oldPassword,
      newPassword,
      confirmNewPassword
    );

    if ('errorMessage' in data) {
      dispatch({ type: 'auth/error', payload: data.errorMessage });
      return false;
    } else {
      dispatch({ type: 'auth/changePassword' });
      return data.updatedPassword;
    }
  }

  const value = { authState, register, login, logout, changePassword };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
