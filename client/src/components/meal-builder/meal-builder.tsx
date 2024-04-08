import styled from 'styled-components';
import FoodSearch from '../food-search/food-search';
import FoodData from '../food-data/food-data';

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
  return (
    <StyledMealBuilder>
      {children}
      <FoodSearch />
      <FoodData />
    </StyledMealBuilder>
  );
}
