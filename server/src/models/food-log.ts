import mongoose, { Schema } from 'mongoose';
import { Meal } from '../types/meal';
import { foodSchema } from './food';
import { FoodLog } from '../types/food-log';

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
      calories: { type: Number, default: 0 },
      macros: {
        carbs: { type: Number, default: 0 },
        fat: { type: Number, default: 0 },
        protein: { type: Number, default: 0 },
      },
    },
  },
  { timestamps: true }
);

const FoodLog = mongoose.model('FoodLog', foodLogSchema);

export default FoodLog;
