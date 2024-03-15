import { Food } from '../food';

type Loading = {
  type: 'food/loading';
};

type Loaded = {
  type: 'food/loaded';
};

type FoodError = {
  type: 'food/error';
  payload: string;
};

type CreateFood = {
  type: 'food/create';
};

type SetSearchedFoods = {
  type: 'food/setSearchedFoods';
  payload: Food[];
};

type ClearError = {
  type: 'food/clearError';
};

type ClearSearchedFoods = {
  type: 'food/clearSearchedFoods';
};

type SetSelectedFood = {
  type: 'food/setSelectedFood';
  payload: Food;
};

type ClearSelectedFood = {
  type: 'food/clearSelectedFood';
};

export type FoodActions =
  | Loading
  | Loaded
  | FoodError
  | CreateFood
  | SetSearchedFoods
  | ClearError
  | ClearSearchedFoods
  | SetSelectedFood
  | ClearSelectedFood;
