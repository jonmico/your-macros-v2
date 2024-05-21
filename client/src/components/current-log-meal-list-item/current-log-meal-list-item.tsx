import styled from 'styled-components';
import { Meal } from '../../types/meal';
import { Link } from 'react-router-dom';
import { Macros } from '../../types/macros';

const StyledCurrentLogMealListItem = styled.li`
  border: 1px solid var(--color-indigo-300);
  border-radius: 4px;
  padding: 0.75rem;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  transition: background-color 200ms ease-in-out;
  height: min-content;

  &:hover {
    background-color: var(--color-blue-100);
    cursor: pointer;
  }
`;

interface CurrentLogMealListItemProps {
  meal: Meal;
  logId: string | undefined;
}

export default function CurrentLogMealListItem({
  meal,
  logId,
}: CurrentLogMealListItemProps) {
  const { name } = meal;

  return (
    <StyledCurrentLogMealListItem>
      <MealListItemHeader name={name} logId={logId} />
      <MealData
        calories={meal.mealTotals.calories}
        macros={meal.mealTotals.macros}
      />
    </StyledCurrentLogMealListItem>
  );
}

const StyledMealListItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const StyledH3 = styled.h3`
  color: var(--color-gray-700);
`;

const StyledLink = styled(Link)`
  padding: 0.5rem;
  border-radius: 20px;
  background-color: var(--color-indigo-500);
  color: var(--color-slate-100);
  text-align: center;
`;

interface MealListItemHeaderProps {
  name: string;
  logId: string | undefined;
}

function MealListItemHeader({ name, logId }: MealListItemHeaderProps) {
  return (
    <StyledMealListItemHeader>
      <StyledH3>{name}</StyledH3>
      <StyledLink to={`/app/food-logs/${logId}`}>View meal</StyledLink>
    </StyledMealListItemHeader>
  );
}

const StyledMealData = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

interface MealDataProps {
  calories: number;
  macros: Macros;
}

function MealData({
  calories,
  macros: { carbs, fat, protein },
}: MealDataProps) {
  return (
    <StyledMealData>
      <div>{calories}cals</div>
      <div>|</div>
      <div>{fat}f</div>
      <div>{carbs}c</div>
      <div>{protein}p</div>
    </StyledMealData>
  );
}
