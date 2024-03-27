// TODO: I am not 100% sure about this file name.
import { useParams } from 'react-router-dom';
import { useFoodLog } from '../../hooks/useFoodLog';

export default function FoodLog() {
  const { foodLogs } = useFoodLog();
  const { foodLogId } = useParams();

  const foodLog = foodLogs.find((log) => log._id === foodLogId);

  if (!foodLog) return null;

  const foodLogMealList = foodLog.meals.map((meal) => (
    <li key={meal._id}>{meal.name}</li>
  ));

  return (
    <>
      <div>{foodLog.name}</div>
      <ul>{foodLogMealList}</ul>
    </>
  );
}
