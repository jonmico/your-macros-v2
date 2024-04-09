import styled from 'styled-components';

const StyledMealBuilder = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  position: relative;
`;

interface MealBuilderProps {
  children: React.ReactNode;
}

export default function MealBuilder({ children }: MealBuilderProps) {
  return <StyledMealBuilder>{children}</StyledMealBuilder>;
}
