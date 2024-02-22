import mongoose, { Schema } from 'mongoose';
import { Meal } from '../types/meal';
import { foodSchema } from './food';
import { FoodLog } from '../types/foodLog';

const mealSchema = new Schema<Meal>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    foods: [
      {
        food: { type: foodSchema, required: true },
        servings: { type: Number, required: true },
      },
    ],
    mealTotals: {
      calories: { type: Number, required: true },
      macros: {
        carbs: { type: Number, required: true },
        fat: { type: Number, required: true },
        protein: { type: Number, required: true },
      },
    },
  },
  { timestamps: true }
);

const foodLogSchema = new Schema<FoodLog>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    meals: [mealSchema],
    logTotals: {
      calories: Number,
      macros: {
        carbs: Number,
        fat: Number,
        protein: Number,
      },
    },
  },
  { timestamps: true }
);

const FoodLog = mongoose.model('FoodLog', foodLogSchema);

export default FoodLog;
