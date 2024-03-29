import { Macros } from './macros';
import { Meal } from './meal';

export type FoodLog = {
  _id?: string;
  author: string;
  name: string;
  meals: Meal[];
  logTotals: {
    calories: number;
    macros: Macros;
  };
  createdAt: string;
};
