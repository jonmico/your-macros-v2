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
    isInitialized: boolean;
  };
};

type DBLoading = {
  type: 'user/DBLoading';
};

type ClearUser = {
  type: 'user/clearUser';
};

export type UserAction =
  | ClearUser
  | Loading
  | Error
  | SetUser
  | SetCreatedFoods
  | UpdateMacros
  | DBLoading;
