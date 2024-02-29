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

export type FoodActions = Loading | Loaded | FoodError;
