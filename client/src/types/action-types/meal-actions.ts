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

export type MealAction = AddFood | RemoveFood | ClearFoods | ChangeFoodServings;
