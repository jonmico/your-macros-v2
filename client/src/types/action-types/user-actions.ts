import { Macros } from '../macros';
import { UserData } from '../user-data';

type Loading = {
  type: 'user/loading';
};

type Error = {
  type: 'user/error';
  payload: string;
};

type SetUser = {
  type: 'user/setUser';
  payload: UserData;
};

type SetCreatedFoods = {
  type: 'user/setCreatedFoods';
  payload: { foodId: string };
};

type UpdateMacros = {
  type: 'user/updateMacros';
  payload: {
    calories: number;
    macros: Macros;
  };
};

type DBLoading = {
  type: 'user/DBLoading';
};

export type UserAction =
  | Loading
  | Error
  | SetUser
  | SetCreatedFoods
  | UpdateMacros
  | DBLoading;
