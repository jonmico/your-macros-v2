import { createContext, useReducer } from 'react';
import { Macros } from '../types/macros';
import { userReducer } from '../reducers/user-reducer';

type UserContextType = {
  isLoading: boolean;
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
}

const initialState = {
  isLoading: false,
  calories: 0,
  macros: {
    carbs: 0,
    protein: 0,
    fat: 0,
  },
  createdFoods: [],
  foodLogs: [],
  weightLog: [],
  weight: 0,
  error: '',
};

export function UserProvider({ children }: UserProviderProps) {
  const { userState, dispatch } = useReducer(userReducer, initialState);
  const value = {};
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
