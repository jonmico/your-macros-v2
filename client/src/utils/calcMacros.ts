import { Food } from '../types/food';

export function calcMacros(foods: { food: Food; servings: number }[]): {
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
} {
  const calories = foods.reduce((prev, curr) => prev + curr.food.calories, 0);

  const fat = foods.reduce((prev, curr) => prev + curr.food.macros.fat, 0);

  const carbs = foods.reduce((prev, curr) => prev + curr.food.macros.carbs, 0);

  const protein = foods.reduce(
    (prev, curr) => prev + curr.food.macros.protein,
    0
  );

  return { calories, fat, carbs, protein };
}
