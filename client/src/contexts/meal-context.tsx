import { createContext, useState } from 'react';
import { Meal } from '../types/meal';
import { Food } from '../types/food';

type MealContextType = {
  foods: {
    food: Food;
    servings: number;
  }[];
  addFood: (food: { food: Food; servings: number }) => void;
  removeFood: (foodId: string | undefined) => void;
  clearFoods: () => void;
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

  function removeFood(foodId: string | undefined) {
    if (!foodId) return;

    setFoods((prevState) => {
      return prevState.filter((food) => food.food._id !== foodId);
    });
  }

  function clearFoods() {
    setFoods([]);
  }

  const value = { foods, addFood, removeFood, clearFoods };
  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
}
