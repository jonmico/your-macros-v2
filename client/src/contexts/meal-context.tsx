import React, { createContext, useReducer } from 'react';
import { MealState, mealReducer } from '../reducers/meal-reducer';
import { MealAction } from '../types/action-types/meal-actions';
import { Food } from '../types/food';

type MealContextType = {
  foods: {
    food: Food;
    servings: number;
  }[];
  dispatch: React.Dispatch<MealAction>;
};

export const MealContext = createContext<MealContextType | null>(null);

interface MealProviderProps {
  children: React.ReactNode;
}

const initialState: MealState = {
  foods: [],
};

export function MealProvider({ children }: MealProviderProps) {
  const [mealState, dispatch] = useReducer(mealReducer, initialState);

  const value = { ...mealState, dispatch };
  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
}
