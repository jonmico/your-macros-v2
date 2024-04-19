import { createContext, useReducer } from 'react';
import { UserState, userReducer } from '../reducers/user-reducer';
import { UserAction } from '../types/action-types/user-actions';

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
export function UserProvider({ children, userId }: UserProviderProps) {
  const [userState, dispatch] = useReducer(userReducer, initialState);

  const value = { userState, dispatch };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
