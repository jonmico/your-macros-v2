import mongoose from 'mongoose';
import { Macros } from './macros';
import { Meal } from './meal';

export type FoodLog = {
  _id?: mongoose.Schema.Types.ObjectId;
  author: mongoose.Schema.Types.ObjectId;
  name: string;
  meals: Meal[];
  logTotals: {
    calories: number;
    macros: Macros;
  };
};
