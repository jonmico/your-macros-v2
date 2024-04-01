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
  gap: 1rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const MealListHeader = styled.h3`
  color: var(--color-blue-600);
  font-size: 1.25rem;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

interface MealListProps {
  meals: Meal[];
}

function MealList({ meals }: MealListProps) {
  const mealList = meals.map((m) => <MealListItem key={m._id} meal={m} />);

  return (
    <StyledMealList>
      <MealListHeader>Meals in this log:</MealListHeader>
      <StyledList>{mealList}</StyledList>
    </StyledMealList>
  );
}

const StyledMealListItem = styled.li`
  border: 1px solid var(--color-indigo-400);
  border-radius: var(--md-radius);
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

const MealName = styled.h4`
  color: var(--color-slate-600);
`;

interface MealListItemProps {
  meal: Meal;
}

function MealListItem({ meal }: MealListItemProps) {
  const {
    calories,
    macros: { fat, carbs, protein },
  } = meal.mealTotals;

  return (
    <StyledMealListItem>
      <TotalsDisplay
        totalsText={'Meal Totals:'}
        fontSize={'1rem'}
        backgroundColor={'var(--color-indigo-200)'}
        calories={calories}
        fat={fat}
        carbs={carbs}
        protein={protein}
      />
      <MealName>{meal.name}</MealName>
    </StyledMealListItem>
  );
}
