import styled from 'styled-components';

const StyledMeal = styled.div`
  background-color: var(--color-blue-100);
  padding: 1rem;
  border: 1px solid var(--color-blue-400);
  border-radius: var(--sm-radius);
  grid-column: 1 / -1;
`;

interface MealProps {
  children: React.ReactNode;
}

export default function Meal({ children }: MealProps) {
  return <StyledMeal>{children}</StyledMeal>;
}
