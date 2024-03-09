import { Food } from './food';
import { Macros } from './macros';

export type Meal = {
  _id?: string;
  author: string;
  name: string;
  foods: { food: Food; servings: number }[];
  mealTotals: {
    calories: number;
    macros: Macros;
  };
};
