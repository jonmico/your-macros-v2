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

export type UserAction = Loading | Error | SetUser;
