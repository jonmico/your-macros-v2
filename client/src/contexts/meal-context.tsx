import { createContext, useState } from 'react';
import { Meal } from '../types/meal';
import { Food } from '../types/food';

type MealContextType = {
  foods: {
    food: Food;
    servings: number;
  }[];
  addFood: (food: { food: Food; servings: number }) => void;
};

export const MealContext = createContext<MealContextType | null>(null);

interface MealProviderProps {
  children: React.ReactNode;
  meal?: Meal;
}

export function MealProvider({ children, meal: editMeal }: MealProviderProps) {
  const [foods, setFoods] = useState<{ food: Food; servings: number }[]>(() =>
    editMeal ? [...editMeal.foods] : []
  );

  function addFood(food: { food: Food; servings: number }) {
    setFoods((prevState) => [...prevState, food]);
  }

  const value = { foods, addFood };
  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
}
