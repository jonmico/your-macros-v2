import { FoodLog } from '../food-log';

type Loading = {
  type: 'foodLog/loading';
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

export type FoodLogAction = Loading | Error | SetLogs | CreateLog;
