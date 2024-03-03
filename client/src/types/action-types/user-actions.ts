import { UserData } from '../user-data';

type Loading = {
  type: 'user/loading';
};

type CreateUser = {
  type: 'user/create';
  payload: UserData;
};

export type UserAction = Loading | CreateUser;
