import { FoodLogAction } from '../types/action-types/food-log-actions';
import { FoodLog } from '../types/food-log';

export type FoodLogState = {
  foodLogs: FoodLog[];
  isLoading: boolean;
  error: string;
};

export function foodLogReducer(state: FoodLogState, action: FoodLogAction) {
  switch (action.type) {
    case 'foodLog/loading':
      return {
        ...state,
        isLoading: true,
      };
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
    default:
      throw new TypeError('We do not recognize that type.');
  }
}
