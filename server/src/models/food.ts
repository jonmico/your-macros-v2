import mongoose, { Schema } from 'mongoose';
import { Food } from '../types/food';

const foodSchema = new Schema<Food>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    servingSize: { type: String, required: true },
    macros: {
      carbs: { type: Number, required: true },
      fat: { type: Number, required: true },
      protein: { type: Number, required: true },
    },
    calories: { type: Number, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Food = mongoose.model('Food', foodSchema);

export default Food;
