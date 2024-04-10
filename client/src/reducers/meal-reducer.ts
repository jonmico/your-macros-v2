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
    case 'meal/changeBuildMealServings': {
      return {
        ...state,
        buildMeal: {
          ...state.buildMeal,
          foods: state.buildMeal.foods.map((f) => {
            if (f.food._id === action.payload.foodId) {
              console.log('we here');
              return { ...f, servings: action.payload.servings };
            } else {
              return f;
            }
          }),
        },
      };
    }
    case 'meal/setEditFoods': {
      return {
        ...state,
        mealName: action.payload.mealName,
        foods: [...action.payload.foods],
      };
    }
    case 'meal/changeBuildMealName': {
      return {
        ...state,
        buildMeal: {
          ...state.buildMeal,
          name: action.payload.mealName,
        },
      };
    }
    case 'meal/clearBuildMeal': {
      return {
        ...state,
        buildMeal: {
          foods: [],
          author: '',
          name: '',
          mealTotals: {
            calories: 0,
            macros: {
              fat: 0,
              carbs: 0,
              protein: 0,
            },
          },
        },
      };
    }
    default: {
      throw new TypeError('We do not recognize that type!');
    }
  }
}
