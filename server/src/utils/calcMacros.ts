import { Macros } from '../types/macros';
import { Meal } from '../types/meal';

export function calcMacros(meals: Meal[]): {
  logTotals: { calories: number; macros: Macros };
} {
  const calories = meals.reduce(
    (prev, curr) => prev + curr.mealTotals.calories,
    0
  );

  const fat = meals.reduce(
    (prev, curr) => prev + curr.mealTotals.macros.fat,
    0
  );

  const carbs = meals.reduce(
    (prev, curr) => prev + curr.mealTotals.macros.carbs,
    0
  );

  const protein = meals.reduce(
    (prev, curr) => prev + curr.mealTotals.macros.protein,
    0
  );

  return { logTotals: { calories, macros: { fat, carbs, protein } } };
}
