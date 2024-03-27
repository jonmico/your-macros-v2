import { FoodActions } from '../types/action-types/food-actions';
import { Food } from '../types/food';

export type FoodState = {
  searchedFoods: Food[];
  selectedFood: Food | null;
  foodServings: string;
  isLoading: boolean;
  error: string;
};

export function foodReducer(state: FoodState, action: FoodActions) {
  switch (action.type) {
    case 'food/loading': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'food/loaded': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'food/error': {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case 'food/create': {
      return {
        ...state,
        isLoading: false,
        error: '',
      };
    }
    case 'food/setSearchedFoods': {
      return {
        ...state,
        isLoading: false,
        error: '',
        searchedFoods: action.payload,
      };
    }
    case 'food/clearError': {
      return {
        ...state,
        error: '',
      };
    }
    case 'food/clearSearchedFoods': {
      return {
        ...state,
        searchedFoods: [],
      };
    }
    case 'food/setSelectedFood': {
      return {
        ...state,
        selectedFood: action.payload,
      };
    }
    case 'food/clearSelectedFood': {
      return {
        ...state,
        selectedFood: null,
      };
    }
    case 'food/changeServings': {
      return {
        ...state,
        foodServings: action.payload.servings,
      };
    }
    case 'food/searchFoodsByTextError': {
      return {
        ...state,
        error: action.payload.errorMessage,
        searchedFoods: [],
        selectedFood: null,
      };
    }
    default:
      throw new TypeError("We don't know that type.");
  }
}
