import { Food } from '../food';

type AddBuildMealFood = {
  type: 'meal/addBuildMealFood';
  payload: { food: { food: Food; servings: number } };
};

type RemoveBuildMealFood = {
  type: 'meal/removeBuildMealFood';
  payload: { foodId: string };
};

type ClearBuildMealFoods = {
  type: 'meal/clearBuildMealFoods';
};

type ChangeFoodServings = {
  type: 'meal/changeFoodServings';
  payload: {
    foodId: string;
    servings: number;
  };
};

type SetEditFoods = {
  type: 'meal/setEditFoods';
  payload: {
    foods: { food: Food; servings: number }[];
    mealName: string;
  };
};

type ChangeMealName = {
  type: 'meal/changeMealName';
  payload: {
    mealName: string;
  };
};

export type MealAction =
  | AddBuildMealFood
  | RemoveBuildMealFood
  | ClearBuildMealFoods
  | ChangeFoodServings
  | SetEditFoods
  | ChangeMealName;
