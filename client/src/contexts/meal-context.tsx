import React, { createContext, useReducer } from 'react';
import { MealState, mealReducer } from '../reducers/meal-reducer';
import { Food } from '../types/food';
import { Meal } from '../types/meal';
import { MealAction } from '../types/action-types/meal-actions';

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
  meal?: Meal;
}

const initialState: MealState = {
  foods: [],
};

export function MealProvider({ children, meal: editMeal }: MealProviderProps) {
  const [mealState, dispatch] = useReducer(mealReducer, initialState, () => {
    if (editMeal) {
      return { foods: [...editMeal.foods] };
    } else {
      return { foods: [] };
    }
  });

  const value = { ...mealState, dispatch };
  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
}
