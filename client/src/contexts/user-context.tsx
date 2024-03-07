import { createContext, useReducer } from 'react';
import { Macros } from '../types/macros';
import { userReducer } from '../reducers/user-reducer';
import { UserData } from '../types/user-data';

type UserContextType = {
  isLoading: boolean;
  userId: string;
  calories: number;
  macros: Macros;
  createdFoods: string[];
  foodLogs: string[];
  weightLog: number[];
  weight: number;
  error: string;
};

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: React.ReactNode;
  userData: UserData;
}

export function UserProvider({ children, userData }: UserProviderProps) {
  const [userState, dispatch] = useReducer(userReducer, {
    isLoading: false,
    error: '',
    ...userData,
  });

  const value = { ...userState };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
