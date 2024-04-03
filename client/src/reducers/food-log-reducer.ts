import { FoodLogAction } from '../types/action-types/food-log-actions';
import { FoodLog } from '../types/food-log';

export type FoodLogState = {
  foodLogs: FoodLog[];
  currentLog: FoodLog | null;
  isLoading: boolean;
  isLoadingDB: boolean;
  error: string;
};

export function foodLogReducer(state: FoodLogState, action: FoodLogAction) {
  switch (action.type) {
    case 'foodLog/loading': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'foodLog/loadingDB': {
      return {
        ...state,
        isLoadingDB: true,
      };
    }
    case 'foodLog/error':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'foodLog/setLogs':
      return {
        ...state,
        isLoading: false,
        foodLogs: action.payload,
      };
    case 'foodLog/createLog':
      return {
        ...state,
        isLoading: false,
        foodLogs: [action.payload, ...state.foodLogs],
        currentLog: action.payload,
        error: '',
      };
    case 'foodLog/setCurrentLog':
      return {
        ...state,
        currentLog: action.payload,
      };
    case 'foodLog/addMealToLog': {
      return {
        ...state,
        foodLogs: state.foodLogs.map((log) => {
          if (log._id === action.payload._id) {
            return { ...action.payload };
          }
          return log;
        }),
        currentLog: action.payload,
        error: '',
        // isLoading: false,
        isLoadingDB: false,
      };
    }
    case 'foodLog/deleteMealFromLog': {
      return {
        ...state,
        foodLogs: state.foodLogs.map((log) => {
          if (log._id === action.payload.updatedLog._id) {
            return { ...action.payload.updatedLog };
          }
          return log;
        }),
        error: '',
        isLoading: false,
      };
    }
    default:
      throw new TypeError('We do not recognize that type.');
  }
}
