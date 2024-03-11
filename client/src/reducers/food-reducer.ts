import { FoodActions } from '../types/action-types/food-actions';
import { Food } from '../types/food';

type FoodState = {
  searchedFoods: Food[];
  selectedFood: Food | null;
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
    case 'food/create':
      return {
        ...state,
        isLoading: false,
        error: '',
      };
    case 'food/setSelectedFoods':
      return {
        ...state,
        isLoading: false,
        error: '',
        searchedFoods: action.payload,
      };
    default:
      throw new TypeError("We don't know that type.");
  }
}
