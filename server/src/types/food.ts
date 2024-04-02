import mongoose from 'mongoose';
import { Macros } from './macros';

export type Food = {
  _id?: mongoose.Types.ObjectId;
  name: string;
  brand: string;
  servingSize: string;
  macros: Macros;
  calories: number;
  author: mongoose.Types.ObjectId;
};
