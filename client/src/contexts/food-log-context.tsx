import { createContext, useEffect, useReducer } from 'react';
import { FoodLog } from '../types/food-log';
import { FoodLogState, foodLogReducer } from '../reducers/food-log-reducer';
import {
  apiAddMealToLog,
  apiCreateLog,
  apiFetchLogs,
} from '../services/food-logs-api';
import { FoodLogAction } from '../types/action-types/food-log-actions';
import { Meal } from '../types/meal';

type FoodLogContextType = {
  foodLogs: FoodLog[];
  currentLog: FoodLog | null;
  isLoading: boolean;
  error: string;
  createLog: (userId: string, logName: string) => Promise<void>;
  addMealToLog: (logId: string, meal: Meal) => Promise<void>;
  foodLogDispatch: React.Dispatch<FoodLogAction>;
};

export const FoodLogContext = createContext<FoodLogContextType | null>(null);

const initialState: FoodLogState = {
  foodLogs: [],
  currentLog: null,
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
        dispatch({
          type: 'foodLog/setCurrentLog',
          payload: data.foodLogs[0],
        });
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

  async function addMealToLog(logId: string, meal: Meal) {
    const data = await apiAddMealToLog(logId, meal);

    if (data.errorMessage) {
      dispatch({ type: 'foodLog/error', payload: data.errorMessage });
    }

    if (data.updatedLog) {
      dispatch({ type: 'foodLog/addMealToLog', payload: data.updatedLog });
    }

    console.log(data);
  }

  const value = {
    ...foodLogState,
    createLog,
    addMealToLog,
    foodLogDispatch: dispatch,
  };

  return (
    <FoodLogContext.Provider value={value}>{children}</FoodLogContext.Provider>
  );
}
