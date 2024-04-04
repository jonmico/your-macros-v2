import { MealAction } from '../types/action-types/meal-actions';
import { Food } from '../types/food';

export type MealState = {
  foods: {
    food: Food;
    servings: number;
  }[];
};

export function mealReducer(state: MealState, action: MealAction) {
  switch (action.type) {
    case 'meal/addFood': {
      return {
        ...state,
        foods: [...state.foods, action.payload],
      };
    }
    case 'meal/removeFood': {
      return {
        ...state,
        foods: state.foods.filter((f) => f.food._id !== action.payload),
      };
    }
    case 'meal/clearFoods': {
      return {
        ...state,
        foods: [] as { food: Food; servings: number }[],
      };
    }
    case 'meal/changeFoodServings': {
      return {
        ...state,
        foods: state.foods.map((f) => {
          if (f.food._id === action.payload.foodId) {
            return { ...f, servings: action.payload.servings };
          } else {
            return f;
          }
        }),
      };
    }
    case 'meal/setEditFoods': {
      return {
        ...state,
        foods: [...action.payload.foods],
      };
    }
    default: {
      throw new TypeError('We do not recognize that type!');
    }
  }
}
