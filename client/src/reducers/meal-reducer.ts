import { MealAction } from '../types/action-types/meal-actions';
import { Food } from '../types/food';
import { Meal } from '../types/meal';

export type MealState = {
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
              return { ...f, servings: action.payload.servings };
            } else {
              return f;
            }
          }),
        },
      };
    }
    case 'meal/setEditMeal': {
      return {
        ...state,
        editMeal: { ...action.payload.editMeal },
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
    case 'meal/addEditMealFood': {
      if (!state.editMeal) return { ...state };

      return {
        ...state,
        editMeal: {
          ...state.editMeal,
          foods: [...state.editMeal.foods, action.payload.food],
        },
      };
    }
    case 'meal/changeEditMealName': {
      if (!state.editMeal) return { ...state };

      return {
        ...state,
        editMeal: {
          ...state.editMeal,
          name: action.payload.mealName,
        },
      };
    }
    case 'meal/changeEditMealServings': {
      if (!state.editMeal) return { ...state };

      return {
        ...state,
        editMeal: {
          ...state.editMeal,
          foods: state.editMeal.foods.map((food) => {
            if (food.food._id === action.payload.foodId) {
              return { ...food, servings: action.payload.servings };
            } else {
              return food;
            }
          }),
        },
      };
    }
    case 'meal/clearEditMealFoods': {
      if (state.editMeal === null) return { ...state };

      return {
        ...state,
        editMeal: {
          ...state.editMeal,
          foods: [] as { food: Food; servings: number }[],
        },
      };
    }
    case 'meal/removeEditMealFood': {
      if (!state.editMeal) return { ...state };
      return {
        ...state,
        editMeal: {
          ...state.editMeal,
          foods: state.editMeal.foods.filter(
            (f) => f.food._id !== action.payload.foodId
          ),
        },
      };
    }
    case 'meal/clearEditMeal': {
      return {
        ...state,
        editMeal: null,
      };
    }
    default: {
      throw new TypeError('We do not recognize that type!');
    }
  }
}
