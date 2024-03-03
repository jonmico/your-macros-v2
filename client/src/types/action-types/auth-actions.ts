import { UserData } from '../user-data';

type Loading = {
  type: 'auth/loading';
};

type Register = {
  type: 'auth/register';
};

type AuthError = {
  type: 'auth/error';
  payload: string;
};

type Login = {
  type: 'auth/login';
  payload: {
    isLoggedIn: boolean;
    userData: UserData;
  };
};

export type AuthAction = Loading | AuthError | Register | Login;
