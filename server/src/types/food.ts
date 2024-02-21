import mongoose from 'mongoose';

export type Food = {
  _id?: string;
  name: string;
  brand: string;
  servingSize: string;
  macros: {
    carbs: number;
    fat: number;
    protein: number;
  };
  calories: number;
  author: mongoose.Schema.Types.ObjectId;
};
