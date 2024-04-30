import { createContext, useReducer } from 'react';
import { Food } from '../types/food';
import { FoodState, foodReducer } from '../reducers/food-reducer';
import {
  apiCreateFood,
  apiDeleteFood,
  apiSearchFoodsByText,
} from '../services/food-api';
import { FoodActions } from '../types/action-types/food-actions';

type FoodContextType = {
  foodState: FoodState;
  createFood: (
    food: Food,
    userId: string
  ) => Promise<{ food?: Food; errorMessage?: string }>;
  searchFoodsByText: (searchText: string) => Promise<void>;
  deleteFood: (foodId: string) => Promise<{ deleteSuccess: boolean }>;
  dispatch: React.Dispatch<FoodActions>;
};

export const FoodContext = createContext<FoodContextType | null>(null);

const initialState: FoodState = {
  searchedFoods: [],
  selectedFood: null,
  foodServings: '1',
  isLoading: false,
  error: '',
};

interface FoodProviderProps {
  children: React.ReactNode;
}

export function FoodProvider({ children }: FoodProviderProps) {
  const [foodState, dispatch] = useReducer(foodReducer, initialState);

  async function createFood(food: Food, userId: string) {
    dispatch({ type: 'food/loading' });
    const data = await apiCreateFood(food, userId);
    dispatch({ type: 'food/create' });

    return data;
  }

  async function searchFoodsByText(searchText: string) {
    dispatch({ type: 'food/loading' });
    const data = await apiSearchFoodsByText(searchText);

    if (data.errorMessage) {
      dispatch({
        type: 'food/searchFoodsByTextError',
        payload: { errorMessage: data.errorMessage },
      });
    }

    if (data.searchedFoods) {
      dispatch({ type: 'food/setSearchedFoods', payload: data.searchedFoods });
    }
  }

  async function deleteFood(foodId: string) {
    const data = await apiDeleteFood(foodId);

    if (data.errorMessage) {
      dispatch({ type: 'food/error', payload: data.errorMessage });

      return { deleteSuccess: false };
    }

    return { deleteSuccess: true };
  }

  const value = {
    foodState,
    createFood,
    deleteFood,
    searchFoodsByText,
    dispatch,
  };

  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
}
