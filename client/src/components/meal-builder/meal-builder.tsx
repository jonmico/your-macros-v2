import { MealProvider } from '../../contexts/meal-context';

import FoodData from '../food-data/food-data';
import FoodSearch from '../food-search/food-search';
import Meal from '../meal/meal';
import styled from 'styled-components';

const StyledMealBuilder = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export default function MealBuilder() {
  return (
    <StyledMealBuilder>
      <Meal />
      <FoodSearch />
      <FoodData />
    </StyledMealBuilder>
  );
}
