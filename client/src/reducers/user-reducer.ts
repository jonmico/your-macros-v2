import { UserAction } from '../types/action-types/user-actions';
import { Macros } from '../types/macros';

type UserState = {
  isLoading: boolean;
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

    default:
      throw new TypeError("We don't know that type.");
  }
}
