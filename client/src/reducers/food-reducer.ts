import { FoodActions } from '../types/action-types/food-actions';

type FoodState = {
  isLoading: boolean;
  error: string;
};

export function foodReducer(state: FoodState, action: FoodActions) {
  switch (action.type) {
    case 'food/loading':
      return {
        ...state,
        isLoading: true,
      };
    case 'food/loaded':
      return {
        ...state,
        isLoading: false,
      };
    case 'food/error':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new TypeError("We don't know that type.");
  }
}
