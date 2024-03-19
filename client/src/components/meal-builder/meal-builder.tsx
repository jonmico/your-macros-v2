import { MealProvider } from '../../contexts/meal-context';
import { useFood } from '../../hooks/useFood';
import FoodData from '../food-data/food-data';
import FoodSearch from '../food-search/food-search';
import Meal from '../meal/meal';
import styled from 'styled-components';

interface StyledMealBuilderProps {
  $isSearchedFoods: boolean;
}

const StyledMealBuilder = styled.div<StyledMealBuilderProps>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$isSearchedFoods ? '1fr 1fr' : '1fr 0fr'};
  gap: 1rem;
  transition: grid-template-columns 500ms;
`;

export default function MealBuilder() {
  const { searchedFoods } = useFood();

  const isSearchedFoods = !!searchedFoods.length;

  return (
    <StyledMealBuilder $isSearchedFoods={isSearchedFoods}>
      <MealProvider>
        <Meal />
        <FoodSearch />
        <FoodData />
      </MealProvider>
    </StyledMealBuilder>
  );
}
