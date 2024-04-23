import { createContext, useEffect, useReducer } from 'react';
import { UserState, userReducer } from '../reducers/user-reducer';
import { UserAction } from '../types/action-types/user-actions';
import { useAuth } from '../hooks/useAuth';
import { apiGetUserData } from '../services/user-api';

type UserContextType = {
  userState: UserState | null;
  dispatch: React.Dispatch<UserAction>;
};

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: React.ReactNode;
  userId: string | null;
}

const initialState: UserState = {
  isLoading: true,
  error: '',
  userData: null,
};
export function UserProvider({ children }: UserProviderProps) {
  const { authState } = useAuth();
  const [userState, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    async function getUserData() {
      if (!authState.userId) return null;

      dispatch({ type: 'user/loading' });
      const data = await apiGetUserData(authState.userId);
      console.log(data);

      if (data.errorMessage) {
        dispatch({ type: 'user/error', payload: data.errorMessage });
      }

      if (data.userData) {
        dispatch({ type: 'user/setUser', payload: data.userData });
      }
    }
    getUserData();
  }, [authState.userId]);

  const value = { userState, dispatch };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
