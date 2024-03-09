import { createContext, useEffect, useReducer } from 'react';
import { FoodLog } from '../types/food-log';
import { FoodLogState, foodLogReducer } from '../reducers/food-log-reducer';
import { apiFetchLogs } from '../services/food-logs-api';

type FoodLogContextType = {
  foodLogs: FoodLog[];
  isLoading: boolean;
  error: string;
};

export const FoodLogContext = createContext<FoodLogContextType | null>(null);

const initialState: FoodLogState = {
  foodLogs: [],
  isLoading: true,
  error: '',
};

interface FoodLogProviderProps {
  children: React.ReactNode;
  userId: string;
}

export function FoodLogProvider({ children, userId }: FoodLogProviderProps) {
  const [foodLogState, dispatch] = useReducer(foodLogReducer, initialState);

  useEffect(() => {
    async function fetchLogs() {
      dispatch({ type: 'foodLog/loading' });
      const data = await apiFetchLogs(userId);

      if (data.errorMessage) {
        dispatch({ type: 'foodLog/error', payload: data.errorMessage });
      }

      if (data.foodLogs) {
        dispatch({ type: 'foodLog/setLogs', payload: data.foodLogs });
      }
    }
    fetchLogs();
  }, [userId]);

  const value = { ...foodLogState };

  return (
    <FoodLogContext.Provider value={value}>{children}</FoodLogContext.Provider>
  );
}
