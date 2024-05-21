import { FoodLog } from '../food-log';

type Loading = {
  type: 'foodLog/loading';
};

type LoadingDB = {
  type: 'foodLog/loadingDB';
};

type Error = {
  type: 'foodLog/error';
  payload: string;
};

type SetLogs = {
  type: 'foodLog/setLogs';
  payload: FoodLog[];
};

type CreateLog = {
  type: 'foodLog/createLog';
  payload: FoodLog;
};

type SetCurrentLog = {
  type: 'foodLog/setCurrentLog';
  payload: FoodLog | null;
};

type AddMealToLog = {
  type: 'foodLog/addMealToLog';
  payload: FoodLog;
};

type DeleteMealFromLog = {
  type: 'foodLog/deleteMealFromLog';
  payload: {
    updatedLog: FoodLog;
  };
};

type EditMealInLog = {
  type: 'foodLog/editMealInLog';
  payload: {
    foodLog: FoodLog;
  };
};

type DeleteLog = {
  type: 'foodLog/deleteLog';
  payload: {
    logId: string;
  };
};

export type FoodLogAction =
  | Loading
  | Error
  | SetLogs
  | CreateLog
  | SetCurrentLog
  | AddMealToLog
  | DeleteMealFromLog
  | LoadingDB
  | EditMealInLog
  | DeleteLog;
