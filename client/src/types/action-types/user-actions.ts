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
  payload: string;
};

export type UserAction = Loading | Error | SetUser | SetCreatedFoods;
