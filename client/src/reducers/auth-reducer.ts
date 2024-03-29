import { AuthAction } from '../types/action-types/auth-actions';
import { UserData } from '../types/user-data';

export type AuthState = {
  isLoading: boolean;
  isLoggedIn: boolean;
  userData: UserData | null;
  error: string;
};

export function authReducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case 'auth/loading':
      return {
        ...state,
        isLoading: true,
      };
    case 'auth/error':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'auth/setUser':
      return {
        ...state,
        error: '',
        userData: action.payload.userData,
        isLoggedIn: action.payload.isLoggedIn,
        isLoading: false,
      };
    case 'auth/logout':
      return {
        ...state,
        error: '',
        userData: null,
        isLoggedIn: false,
      };
    default:
      throw new TypeError("We don't recognize that type.");
  }
}
