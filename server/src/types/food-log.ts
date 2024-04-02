import mongoose from 'mongoose';
import { Macros } from './macros';
import { Meal } from './meal';

export type FoodLog = {
  _id?: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  name: string;
  meals: mongoose.Types.DocumentArray<Meal>;
  logTotals: {
    calories: number;
    macros: Macros;
  };
};
