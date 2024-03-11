import { createContext, useReducer } from 'react';
import { Food } from '../types/food';
import { foodReducer } from '../reducers/food-reducer';
import { apiCreateFood } from '../services/food-api';

type FoodContextType = {
  searchedFoods: Food[];
  selectedFood: Food | null;
  isLoading: boolean;
  error: string;
  createFood: (
    food: Food,
    userId: string
  ) => Promise<{ food?: Food; errorMessage?: string }>;
};

export const FoodContext = createContext<FoodContextType | null>(null);

const initialState = {
  searchedFoods: [],
  selectedFood: null,
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

  const value = { ...foodState, createFood };

  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
}
