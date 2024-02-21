import mongoose from 'mongoose';
import { Food } from './food';
import { Macros } from './macros';

export type Meal = {
  _id?: mongoose.Schema.Types.ObjectId;
  author: mongoose.Schema.Types.ObjectId;
  name: string;
  foods: { food: Food; servings: number }[];
  mealTotals: {
    calories: number;
    macros: Macros;
  };
};
