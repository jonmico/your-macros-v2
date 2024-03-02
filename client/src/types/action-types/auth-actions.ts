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

export type AuthAction = Loading | Register | AuthError;
