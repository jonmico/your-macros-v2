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
    default: {
      throw new TypeError('We do not recognize that type!');
    }
  }
}
