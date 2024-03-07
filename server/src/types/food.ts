import mongoose from 'mongoose';
import { Macros } from './macros';

export type Food = {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  brand: string;
  servingSize: string;
  macros: Macros;
  calories: number;
  author: mongoose.Schema.Types.ObjectId;
};
