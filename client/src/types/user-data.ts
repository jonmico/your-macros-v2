import { Macros } from './macros';

export type UserData = {
  calories: number;
  macros: Macros;
  createdFoods: string[];
  isInitialized: boolean;
};
