import { FoodActions } from '../types/action-types/food-actions';
import { Food } from '../types/food';

export type FoodState = {
  searchedFoods: Food[];
  selectedFood: Food | null;
  foodServings: string;
  isLoading: boolean;
  error: string;
  createdFoods: Food[];
  isFetching: boolean;
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
        createdFoods: [...state.createdFoods, action.payload.createdFood],
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
        isLoading: false,
      };
    }
    case 'food/clearSelectedSearchedFoods': {
      return {
        ...state,
        searchedFoods: [],
        selectedFood: null,
      };
    }
    case 'food/setCreatedFoods': {
      return {
        ...state,
        createdFoods: action.payload.createdFoods,
        isFetching: false,
        error: '',
      };
    }
    case 'food/fetching': {
      return {
        ...state,
        isFetching: true,
      };
    }
    case 'food/deleteCreatedFood': {
      return {
        ...state,
        createdFoods: state.createdFoods.filter(
          (food) => food._id !== action.payload.foodId
        ),
        isLoading: false,
      };
    }

    default:
      throw new TypeError("We don't know that type.");
  }
}
