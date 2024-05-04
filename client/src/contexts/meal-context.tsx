import React, { createContext, useReducer } from 'react';
import { MealState, mealReducer } from '../reducers/meal-reducer';
import { MealAction } from '../types/action-types/meal-actions';
import { Meal } from '../types/meal';

type MealContextType = {
  mealState: MealState;
  dispatch: React.Dispatch<MealAction>;
};

export const MealContext = createContext<MealContextType | null>(null);

interface MealProviderProps {
  children: React.ReactNode;
}

const emptyMeal: Meal = {
  name: '',
  foods: [],
  author: '',
  mealTotals: {
    calories: 0,
    macros: {
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  },
};

const initialState: MealState = {
  buildMeal: emptyMeal,
  editMeal: null,
};

export function MealProvider({ children }: MealProviderProps) {
  const [mealState, dispatch] = useReducer(mealReducer, initialState);

  const value = { mealState, dispatch };
  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
}
