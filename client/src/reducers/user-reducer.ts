import { UserAction } from '../types/action-types/user-actions';
import { Macros } from '../types/macros';

type UserState = {
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

export function userReducer(state: UserState, action: UserAction) {
  switch (action.type) {
    case 'user/loading':
      return {
        ...state,
        isLoading: true,
      };
    case 'user/error':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'user/setUser':
      return {
        ...state,
        isLoading: false,
        userId: action.payload.userId,
        calories: action.payload.calories,
        macros: action.payload.macros,
        createdFoods: action.payload.createdFoods,
        foodLogs: action.payload.foodLogs,
        weightLog: action.payload.weightLog,
        weight: action.payload.weight,
      };
    case 'user/setCreatedFoods':
      return {
        ...state,
        createdFoods: [...state.createdFoods, action.payload],
      };
    default:
      throw new TypeError("We don't know that type.");
  }
}
