import { UserData } from '../user-data';

type Loading = {
  type: 'auth/loading';
};

type AuthError = {
  type: 'auth/error';
  payload: string;
};

type SetUser = {
  type: 'auth/setUser';
  payload: {
    isLoggedIn: boolean;
    userData: UserData;
  };
};

export type Logout = {
  type: 'auth/logout';
};

export type AuthAction = Loading | AuthError | SetUser | Logout;
