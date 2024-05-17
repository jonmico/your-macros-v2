import styled from 'styled-components';
import { Meal } from '../../types/meal';

const StyledCurrentLogMealListItem = styled.li`
  border: 1px solid var(--color-indigo-300);
  border-radius: 4px;
  padding: 0.75rem;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
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
