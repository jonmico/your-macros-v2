import { Food } from '../food';

type AddFood = {
  type: 'meal/addFood';
  payload: { food: Food; servings: number };
};

type RemoveFood = {
  type: 'meal/removeFood';
  payload: string;
};

type ClearFoods = {
  type: 'meal/clearFoods';
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
  | AddFood
  | RemoveFood
  | ClearFoods
  | ChangeFoodServings
  | SetEditFoods
  | ChangeMealName;
