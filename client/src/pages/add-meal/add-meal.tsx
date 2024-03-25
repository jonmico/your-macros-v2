import MealBuilder from '../../components/meal-builder/meal-builder';
import { MealProvider } from '../../contexts/meal-context';

export default function AddMeal() {
  return (
    <div>
      <MealProvider>
        <MealBuilder />
      </MealProvider>
    </div>
  );
}
