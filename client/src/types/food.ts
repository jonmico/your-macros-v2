import { Macros } from './macros';

export type Food = {
  _id?: string;
  name: string;
  brand: string;
  servingSize: string;
  macros: Macros;
  calories: number;
  author?: string;
};
