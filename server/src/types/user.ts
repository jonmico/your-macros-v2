import mongoose from 'mongoose';

export type User = {
  email: string;
  password: string;
  createdFoods: mongoose.Schema.Types.ObjectId[];
  logs: mongoose.Schema.Types.ObjectId[];
  dailyIntake: {
    calories: number;
    macros: {
      carbs: number;
      fat: number;
      protein: number;
    };
  };
};
