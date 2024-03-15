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
    case 'food/setSearchedFoods':
      return {
        ...state,
        isLoading: false,
        error: '',
        searchedFoods: action.payload,
      };
    case 'food/clearError':
      return {
        ...state,
        error: '',
      };
    case 'food/clearSearchedFoods':
      return {
        ...state,
        searchedFoods: [],
      };
    case 'food/setSelectedFood':
      return {
        ...state,
        selectedFood: action.payload,
      };
    case 'food/clearSelectedFood':
      return {
        ...state,
        selectedFood: null,
      };

    default:
      throw new TypeError("We don't know that type.");
  }
}
