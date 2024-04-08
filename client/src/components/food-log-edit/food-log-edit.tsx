import { useEffect } from 'react';
import { useFindFoodLog } from '../../hooks/useFindFoodLog';
import { useMeal } from '../../hooks/useMeal';
import MealBuilder from '../meal-builder/meal-builder';

export default function FoodLogEdit() {
  const { foodLog, meal } = useFindFoodLog();
  const { dispatch: mealDispatch } = useMeal();

  useEffect(() => {
    if (!meal) return;

    mealDispatch({
      type: 'meal/setEditFoods',
      payload: { foods: [...meal.foods], mealName: meal.name },
    });
  }, [meal, mealDispatch]);

  if (foodLog === undefined) return null;

  return (
    <div>
      <h2>This is the FoodLogEdit component.</h2>
      <MealBuilder />
      <div>This is under construction.</div>
    </div>
  );
}
