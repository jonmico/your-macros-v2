import { useParams } from 'react-router-dom';
import { useFoodLog } from './useFoodLog';

export function useFindFoodLog() {
  const { foodLogId, mealId } = useParams();
  const { foodLogs } = useFoodLog();

  const foodLog = foodLogs.find((log) => log._id === foodLogId);

  if (mealId && foodLog) {
    const meal = foodLog.meals.find((m) => m._id === mealId);

    return { foodLog, meal };
  }

  return { foodLog };
}
