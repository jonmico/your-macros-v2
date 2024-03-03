import { Macros } from './macros';

export type UserData = {
  userId: string;
  calories: number;
  macros: Macros;
  createdFoods: string[];
  foodLogs: string[];
  weightLog: number[];
  weight: number;
};
