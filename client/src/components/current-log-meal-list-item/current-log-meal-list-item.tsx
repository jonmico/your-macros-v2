import styled from 'styled-components';
import { Meal } from '../../types/meal';

const StyledCurrentLogMealListItem = styled.li`
  border: 1px solid var(--color-indigo-400);
  border-radius: 4px;
  padding: 0.75rem;
`;

interface CurrentLogMealListItemProps {
  meal: Meal;
}

export default function CurrentLogMealListItem({
  meal,
}: CurrentLogMealListItemProps) {
  return (
    <StyledCurrentLogMealListItem>{meal.name}</StyledCurrentLogMealListItem>
  );
}
