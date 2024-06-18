import { UserAction } from '../types/action-types/user-actions';
import { UserData } from '../types/user-data';

export type UserState = {
  isLoading: boolean;
  error: string;
  userData: UserData | null;
  isDBLoading: boolean;
};

export function userReducer(state: UserState, action: UserAction) {
  switch (action.type) {
    case 'user/loading':
      return {
        ...state,
        isLoading: true,
      };
    case 'user/error':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isDBLoading: false,
      };
    case 'user/setUser':
      return {
        ...state,
        isLoading: false,
        error: '',
        userData: {
          ...state.userData,
          calories: action.payload.calories,
          macros: action.payload.macros,
          createdFoods: action.payload.createdFoods,
          isInitialized: action.payload.isInitialized,
        },
      };
    case 'user/setCreatedFoods':
      if (state.userData === null) return { ...state };

      return {
        ...state,
        userData: {
          ...state.userData,
          createdFoods: [...state.userData.createdFoods, action.payload.foodId],
        },
      };
    case 'user/updateMacros': {
      if (state.userData === null) return { ...state };

      return {
        ...state,
        userData: {
          ...state.userData,
          calories: action.payload.calories,
          macros: action.payload.macros,
          isInitialized: action.payload.isInitialized,
        },
        isDBLoading: false,
      };
    }
    case 'user/DBLoading': {
      return { ...state, isDBLoading: true };
    }
    case 'user/clearUser': {
      return {
        ...state,
        isLoading: true,
        isDBLoading: false,
        error: '',
        userData: null,
      };
    }
    default:
      throw new TypeError("We don't know that type.");
  }
}
