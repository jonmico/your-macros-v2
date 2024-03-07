import { UserData } from '../user-data';

type Loading = {
  type: 'auth/loading';
};

type AuthError = {
  type: 'auth/error';
  payload: string;
};

type Register = {
  type: 'auth/register';
  payload: {
    isLoggedIn: boolean;
    userData: UserData;
  };
};

type Login = {
  type: 'auth/login';
  payload: {
    isLoggedIn: boolean;
    userData: UserData;
  };
};

type SetUser = {
  type: 'auth/setUser';
  payload: {
    isLoggedIn: boolean;
    userData: UserData;
  };
};

export type AuthAction = Loading | AuthError | Register | Login | SetUser;
