import { Macros } from '../macros';

type Loading = {
  type: 'user/loading';
};

type CreateUser = {
  type: 'user/create';
  payload: {
    calories: number;
    macros: Macros;
    createdFoods: string[];
    foodLogs: string[];
    weightLog: number[];
    weight: number;
  };
};

export type UserAction = Loading | CreateUser;
