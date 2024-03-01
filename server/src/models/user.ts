import mongoose, { Schema } from 'mongoose';
import { User } from '../types/user';

type WeightLog = {
  weight: number;
};

const weightLogSchema = new Schema<WeightLog>(
  {
    weight: { type: Number, required: true },
  },
  { timestamps: true }
);

const userSchema = new Schema<User>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdFoods: [{ type: Schema.Types.ObjectId, ref: 'Food', default: [] }],
    foodLogs: [{ type: Schema.Types.ObjectId, ref: 'Log', default: [] }],
    dailyIntake: {
      calories: { type: Number, default: 0 },
      macros: {
        carbs: { type: Number, default: 0 },
        fat: { type: Number, default: 0 },
        protein: { type: Number, default: 0 },
      },
    },
    weightLogs: [{ type: weightLogSchema, default: [] }],
    weight: { type: Number, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
