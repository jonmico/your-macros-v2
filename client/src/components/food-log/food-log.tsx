import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useFoodLog } from '../../hooks/useFoodLog';
import TotalsDisplay from '../totals-display/totals-display';
import { Meal } from '../../types/meal';

const StyledFoodLog = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledH2 = styled.h2`
  font-size: 1.75rem;
  color: var(--color-indigo-700);
`;

export default function FoodLog() {
  const { foodLogs } = useFoodLog();
  const { foodLogId } = useParams();

  const foodLog = foodLogs.find((log) => log._id === foodLogId);

  if (!foodLog) return null;

  const {
    calories,
    macros: { fat, carbs, protein },
  } = foodLog.logTotals;

  return (
    <StyledFoodLog>
      <StyledH2>{foodLog.name}</StyledH2>
      <TotalsDisplay
        backgroundColor={'var(--color-blue-100)'}
        border={'1px solid var(--color-blue-300)'}
        totalsText={'Log Totals:'}
        calories={calories}
        fat={fat}
        carbs={carbs}
        protein={protein}
      />
      <MealList meals={foodLog.meals} />
    </StyledFoodLog>
  );
}

const StyledMealList = styled.div`
  border: 1px solid var(--color-blue-300);
  border-radius: var(--sm-radius);
  background-color: var(--color-blue-100);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MealListHeader = styled.h3`
  color: var(--color-blue-600);
`;

interface MealListProps {
  meals: Meal[];
}

function MealList({ meals }: MealListProps) {
  const mealList = meals.map((m) => <MealListItem key={m._id} meal={m} />);

  return (
    <StyledMealList>
      <MealListHeader>Meals in this log:</MealListHeader>
      <ul>{mealList}</ul>
    </StyledMealList>
  );
}

interface MealListItemProps {
  meal: Meal;
}

function MealListItem({ meal }: MealListItemProps) {
  return <li>{meal.name}</li>;
}
