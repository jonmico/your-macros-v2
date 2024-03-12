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

type SetSelectedFoods = {
  type: 'food/setSelectedFoods';
  payload: Food[];
};

type ClearError = {
  type: 'food/clearError';
};

type ClearSearchedFoods = {
  type: 'food/clearSearchedFoods';
};

export type FoodActions =
  | Loading
  | Loaded
  | FoodError
  | CreateFood
  | SetSelectedFoods
  | ClearError
  | ClearSearchedFoods;
