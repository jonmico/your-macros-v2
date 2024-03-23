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

export type MealAction = AddFood | RemoveFood | ClearFoods;
