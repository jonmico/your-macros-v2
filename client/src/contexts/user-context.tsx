import { createContext, useEffect, useReducer } from 'react';
import { UserState, userReducer } from '../reducers/user-reducer';
import { UserAction } from '../types/action-types/user-actions';
import { useAuth } from '../hooks/useAuth';
import { apiGetUserData, apiUpdateMacros } from '../services/user-api';
import { Macros } from '../types/macros';

type UserContextType = {
  userState: UserState | null;
  dispatch: React.Dispatch<UserAction>;
  updateMacros: (
    userId: string,
    calories: number,
    macros: Macros
  ) => Promise<{ updateSuccess: boolean } | undefined>;
};

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: React.ReactNode;
}

const initialState: UserState = {
  isLoading: true,
  isDBLoading: false,
  error: '',
  userData: null,
};
export function UserProvider({ children }: UserProviderProps) {
  const { authState } = useAuth();
  const [userState, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    async function getUserData() {
      if (authState.userId === null) return;

      dispatch({ type: 'user/loading' });
      const data = await apiGetUserData(authState.userId);

      if (data.errorMessage) {
        dispatch({ type: 'user/error', payload: data.errorMessage });
      }

      if (data.userData) {
        dispatch({ type: 'user/setUser', payload: data.userData });
      }
    }
    getUserData();
  }, [authState.isLoading, authState.userId]);

  async function updateMacros(
    userId: string,
    calories: number,
    macros: Macros
  ): Promise<{ updateSuccess: boolean } | undefined> {
    dispatch({ type: 'user/DBLoading' });
    const data = await apiUpdateMacros(userId, calories, macros);

    if (data.errorMessage) {
      dispatch({ type: 'user/error', payload: data.errorMessage });
      return { updateSuccess: false };
    }

    if (data.userData) {
      dispatch({
        type: 'user/updateMacros',
        payload: {
          calories: data.userData.calories,
          macros: data.userData.macros,
        },
      });
      return { updateSuccess: true };
    }
  }

  const value = { userState, dispatch, updateMacros };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
