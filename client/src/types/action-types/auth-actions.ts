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
    userId: string;
  };
};

type Logout = {
  type: 'auth/logout';
};

type ChangePassword = {
  type: 'auth/changePassword';
};

export type AuthAction =
  | Loading
  | AuthError
  | SetUser
  | Logout
  | ChangePassword;
