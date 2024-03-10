import { createContext, useEffect, useReducer } from 'react';
import { FoodLog } from '../types/food-log';
import { FoodLogState, foodLogReducer } from '../reducers/food-log-reducer';
import { apiCreateLog, apiFetchLogs } from '../services/food-logs-api';

type FoodLogContextType = {
  foodLogs: FoodLog[];
  isLoading: boolean;
  error: string;
  createLog: (userId: string, logName: string) => Promise<void>;
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

  async function createLog(userId: string, logName: string) {
    dispatch({ type: 'foodLog/loading' });
    const data = await apiCreateLog(userId, logName);

    if (data.errorMessage) {
      dispatch({ type: 'foodLog/error', payload: data.errorMessage });
    }

    if (data.foodLog) {
      dispatch({ type: 'foodLog/createLog', payload: data.foodLog });
    }
  }

  const value = { ...foodLogState, createLog };

  return (
    <FoodLogContext.Provider value={value}>{children}</FoodLogContext.Provider>
  );
}
