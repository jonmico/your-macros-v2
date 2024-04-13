import { Food } from '../food';
import { Meal } from '../meal';

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

type ChangeBuildMealServings = {
  type: 'meal/changeBuildMealServings';
  payload: {
    foodId: string;
    servings: number;
  };
};

type ChangeBuildMealName = {
  type: 'meal/changeBuildMealName';
  payload: {
    mealName: string;
  };
};

type ClearBuildMeal = {
  type: 'meal/clearBuildMeal';
};

type SetEditMeal = {
  type: 'meal/setEditMeal';
  payload: {
    editMeal: Meal;
  };
};

type AddEditMealFood = {
  type: 'meal/addEditMealFood';
  payload: { food: { food: Food; servings: number } };
};

type RemoveEditMealFood = {
  type: 'meal/removeEditMealFood';
  payload: { foodId: string };
};

type ClearEditMealFoods = {
  type: 'meal/clearEditMealFoods';
};

type ChangeEditMealServings = {
  type: 'meal/changeEditMealServings';
  payload: {
    foodId: string;
    servings: number;
  };
};

type ChangeEditMealName = {
  type: 'meal/changeEditMealName';
  payload: {
    mealName: string;
  };
};

type ClearEditMeal = {
  type: 'meal/clearEditMeal';
};

export type MealAction =
  | AddBuildMealFood
  | RemoveBuildMealFood
  | ClearBuildMealFoods
  | ChangeBuildMealServings
  | SetEditMeal
  | ChangeBuildMealName
  | ClearBuildMeal
  | AddEditMealFood
  | RemoveEditMealFood
  | ClearEditMealFoods
  | ChangeEditMealServings
  | ChangeEditMealName
  | ClearEditMeal;
