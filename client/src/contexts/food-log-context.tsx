import { createContext, useEffect, useReducer } from 'react';
import { FoodLogState, foodLogReducer } from '../reducers/food-log-reducer';
import {
  apiAddMealToLog,
  apiCreateLog,
  apiDeleteMealFromLog,
  apiEditMealInLog,
  apiFetchLogs,
} from '../services/food-logs-api';
import { FoodLogAction } from '../types/action-types/food-log-actions';
import { FoodLog } from '../types/food-log';
import { Meal } from '../types/meal';
import { useAuth } from '../hooks/useAuth';

type FoodLogContextType = {
  foodLogs: FoodLog[];
  currentLog: FoodLog | null;
  isLoading: boolean;
  isLoadingDB: boolean;
  error: string;
  createLog: (
    userId: string,
    logName: string
  ) => Promise<{ createdLog: boolean } | undefined>;
  addMealToLog: (logId: string, meal: Meal) => Promise<FoodLog | undefined>;
  deleteMealFromLog: (
    userId: string,
    foodLogId: string,
    mealId: string
  ) => Promise<void>;
  editMealInLog: (logId: string, meal: Meal) => Promise<FoodLog | undefined>;
  foodLogDispatch: React.Dispatch<FoodLogAction>;
};

export const FoodLogContext = createContext<FoodLogContextType | null>(null);

const initialState: FoodLogState = {
  foodLogs: [],
  currentLog: null,
  isLoading: true,
  isLoadingDB: false,
  error: '',
};

interface FoodLogProviderProps {
  children: React.ReactNode;
}

export function FoodLogProvider({ children }: FoodLogProviderProps) {
  const { authState } = useAuth();
  const [foodLogState, dispatch] = useReducer(foodLogReducer, initialState);

  useEffect(() => {
    async function fetchLogs() {
      if (authState.userId === null) return;

      dispatch({ type: 'foodLog/loading' });
      const data = await apiFetchLogs(authState.userId);

      if (data.errorMessage) {
        dispatch({ type: 'foodLog/error', payload: data.errorMessage });
      }

      if (data.foodLogs) {
        dispatch({ type: 'foodLog/setLogs', payload: data.foodLogs });
        dispatch({
          type: 'foodLog/setCurrentLog',
          payload: !data.foodLogs.length ? null : data.foodLogs[0],
        });
      }
    }
    fetchLogs();
  }, [authState.userId]);

  async function createLog(userId: string, logName: string) {
    dispatch({ type: 'foodLog/loading' });
    const data = await apiCreateLog(userId, logName);

    if (data.errorMessage) {
      dispatch({ type: 'foodLog/error', payload: data.errorMessage });
      return { createdLog: false };
    }

    if (data.foodLog) {
      dispatch({ type: 'foodLog/createLog', payload: data.foodLog });
      return { createdLog: true };
    }
  }

  async function addMealToLog(logId: string, meal: Meal) {
    dispatch({ type: 'foodLog/loadingDB' });
    const data = await apiAddMealToLog(logId, meal);

    if (data.errorMessage) {
      dispatch({ type: 'foodLog/error', payload: data.errorMessage });
    }

    if (data.updatedLog) {
      dispatch({ type: 'foodLog/addMealToLog', payload: data.updatedLog });
      return data.updatedLog;
    }
  }

  async function deleteMealFromLog(
    userId: string,
    foodLogId: string,
    mealId: string
  ) {
    dispatch({ type: 'foodLog/loadingDB' });
    const data = await apiDeleteMealFromLog(userId, foodLogId, mealId);

    if (data.errorMessage) {
      dispatch({ type: 'foodLog/error', payload: data.errorMessage });
    }

    if (data.updatedLog) {
      dispatch({
        type: 'foodLog/deleteMealFromLog',
        payload: { updatedLog: data.updatedLog },
      });
    }
  }

  async function editMealInLog(logId: string, meal: Meal) {
    dispatch({ type: 'foodLog/loadingDB' });
    const data = await apiEditMealInLog(logId, meal);

    if (data.errorMessage) {
      dispatch({ type: 'foodLog/error', payload: data.errorMessage });
    }

    if (data.foodLog) {
      dispatch({
        type: 'foodLog/editMealInLog',
        payload: { foodLog: data.foodLog },
      });

      return data.foodLog;
    }
  }

  const value = {
    ...foodLogState,
    createLog,
    addMealToLog,
    deleteMealFromLog,
    editMealInLog,
    foodLogDispatch: dispatch,
  };

  return (
    <FoodLogContext.Provider value={value}>{children}</FoodLogContext.Provider>
  );
}
