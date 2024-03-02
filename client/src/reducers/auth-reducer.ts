import { AuthAction } from '../types/action-types/auth-actions';

export type AuthState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  userId: string;
  error: string;
};

export function authReducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case 'auth/loading':
      return {
        ...state,
        isLoading: true,
      };
    case 'auth/register':
      return {
        ...state,
        isLoading: false,
      };
    default:
      throw new TypeError("We don't recognize that type.");
  }
}
