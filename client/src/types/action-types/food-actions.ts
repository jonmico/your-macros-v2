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
  payload: {
    createdFood: Food
  }
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

type ChangeFoodServings = {
  type: 'food/changeServings';
  payload: { servings: string };
};

type SearchFoodsByTextError = {
  type: 'food/searchFoodsByTextError';
  payload: { errorMessage: string };
};

type ClearSelectedSearchedFoods = {
  type: 'food/clearSelectedSearchedFoods';
};

type SetCreatedFoods = {
  type: 'food/setCreatedFoods';
  payload: {
    createdFoods: Food[];
  };
};

type Fetching = {
  type: 'food/fetching';
};

type DeleteCreatedFood = {
  type: 'food/deleteCreatedFood';
  payload: { foodId: string };
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
  | ClearSelectedFood
  | ChangeFoodServings
  | SearchFoodsByTextError
  | ClearSelectedSearchedFoods
  | SetCreatedFoods
  | Fetching
  | DeleteCreatedFood;
