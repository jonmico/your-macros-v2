import { Food } from '../types/food';

export function calcMacros(foods: { food: Food; servings: number }[]): {
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
} {
  const calories = foods.reduce(
    (prev, curr) => prev + curr.food.calories * curr.servings,
    0
  );

  const fat = foods.reduce(
    (prev, curr) => prev + curr.food.macros.fat * curr.servings,
    0
  );

  const carbs = foods.reduce(
    (prev, curr) => prev + curr.food.macros.carbs * curr.servings,
    0
  );

  const protein = foods.reduce(
    (prev, curr) => prev + curr.food.macros.protein * curr.servings,
    0
  );

  return { calories, fat, carbs, protein };
}
