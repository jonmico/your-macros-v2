import React, { createContext, useReducer } from 'react';
import { MealState, mealReducer } from '../reducers/meal-reducer';
import { MealAction } from '../types/action-types/meal-actions';
import { Food } from '../types/food';

/*
TODO: Maintain a "saved" meal in UserContext for building a meal.
Wrap MealContext closer to MealBuilder to make state clear when
changing between tabs, but allow MealContext to pull from UserContext
to see if a "saved" meal currently exists. Initialize the state in
MealContext to the "saved" meal.
*/

type MealContextType = {
  mealName: string;
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
  mealName: '',
};

export function MealProvider({ children }: MealProviderProps) {
  const [mealState, dispatch] = useReducer(mealReducer, initialState);

  const value = { ...mealState, dispatch };
  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
}
