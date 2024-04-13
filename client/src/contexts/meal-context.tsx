import React, { createContext, useReducer } from 'react';
import { MealState, mealReducer } from '../reducers/meal-reducer';
import { MealAction } from '../types/action-types/meal-actions';
import { Meal } from '../types/meal';

/*
TODO: Maintain a "saved" meal in UserContext for building a meal.
Wrap MealContext closer to MealBuilder to make state clear when
changing between tabs, but allow MealContext to pull from UserContext
to see if a "saved" meal currently exists. Initialize the state in
MealContext to the "saved" meal.
*/

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
  foods: [],
  mealName: '',
  buildMeal: emptyMeal,
  editMeal: null,
};

export function MealProvider({ children }: MealProviderProps) {
  // FIXME: Figure out this error.
  const [mealState, dispatch] = useReducer(mealReducer, initialState);

  const value = { mealState, dispatch };
  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
}
