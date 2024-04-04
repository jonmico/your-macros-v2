import { useFindFoodLog } from '../../hooks/useFindFoodLog';

export default function FoodLogEdit() {
  const { foodLog } = useFindFoodLog();

  if (foodLog === undefined) return null;

  return (
    <div>
      <h2>This is the FoodLogEdit component.</h2>
      <div>{foodLog.name}</div>
    </div>
  );
}
