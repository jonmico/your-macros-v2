import mongoose from 'mongoose';
import { Macros } from './macros';

export type User = {
  email: string;
  password: string;
  createdFoods: mongoose.Schema.Types.ObjectId[];
  logs: mongoose.Schema.Types.ObjectId[];
  dailyIntake: {
    calories: number;
    macros: Macros;
  };
};
