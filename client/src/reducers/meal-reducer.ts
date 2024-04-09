import { MealAction } from '../types/action-types/meal-actions';
import { Food } from '../types/food';
import { Meal } from '../types/meal';

export type MealState = {
  mealName: string;
  foods: {
    food: Food;
    servings: number;
  }[];
  buildMeal: Meal;
  editMeal: Meal | null;
};

export function mealReducer(state: MealState, action: MealAction) {
  switch (action.type) {
    case 'meal/addBuildMealFood': {
      return {
        ...state,
        buildMeal: {
          ...state.buildMeal,
          foods: [...state.buildMeal.foods, action.payload.food],
        },
      };
    }
    case 'meal/removeBuildMealFood': {
      return {
        ...state,
        buildMeal: {
          ...state.buildMeal,
          foods: state.buildMeal.foods.filter(
            (f) => f.food._id !== action.payload.foodId
          ),
        },
      };
    }
    case 'meal/clearBuildMealFoods': {
      return {
        ...state,
        buildMeal: {
          ...state.buildMeal,
          foods: [] as { food: Food; servings: number }[],
        },
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
        mealName: action.payload.mealName,
        foods: [...action.payload.foods],
      };
    }
    case 'meal/changeMealName': {
      return {
        ...state,
        mealName: action.payload.mealName,
      };
    }
    default: {
      throw new TypeError('We do not recognize that type!');
    }
  }
}
