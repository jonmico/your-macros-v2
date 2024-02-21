import mongoose, { Schema } from 'mongoose';
import { User } from '../types/user';

const userSchema = new Schema<User>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdFoods: [{ type: Schema.Types.ObjectId, ref: 'Food', default: [] }],
    logs: [{ type: Schema.Types.ObjectId, ref: 'Log', default: [] }],
    dailyIntake: {
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

const User = mongoose.model('User', userSchema);

export default User;
