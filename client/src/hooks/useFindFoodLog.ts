import { useParams } from 'react-router-dom';
import { useFoodLog } from './useFoodLog';

export function useFindFoodLog() {
  const { foodLogId } = useParams();
  const { foodLogs } = useFoodLog();

  // Check for whether or not foodLogId exists
  if (!foodLogId) {
    throw new Error('No foodLogId.');
  }

  const foodLog = foodLogs.find((log) => log._id === foodLogId);

  return { foodLog };
}
