import styled from 'styled-components';
import { useMeal } from '../../hooks/useMeal';

const StyledMeal = styled.div`
  background-color: var(--color-blue-100);
  padding: 1rem;
  border: 1px solid var(--color-blue-400);
  border-radius: var(--sm-radius);
  grid-column: 1 / -1;
`;

export default function Meal() {
  const { foods } = useMeal();
  return <StyledMeal>Number of foods in meal: {foods.length}</StyledMeal>;
}
