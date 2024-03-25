import { useFoodLog } from '../../hooks/useFoodLog';

import styled from 'styled-components';
import FoodData from '../food-data/food-data';
import FoodSearch from '../food-search/food-search';
import Meal from '../meal/meal';

const StyledMealBuilder = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export default function MealBuilder() {
  const { isLoading: isFoodLogLoading } = useFoodLog();
  return (
    <StyledMealBuilder>
      {isFoodLogLoading && <div>LOADING...</div>}
      <Meal />
      <FoodSearch />
      <FoodData />
    </StyledMealBuilder>
  );
}
