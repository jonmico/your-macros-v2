import styled from 'styled-components';

import FoodSearch from '../food-search/food-search';
import FoodData from '../food-data/food-data';

const StyledMealBuilder = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  position: relative;
`;

export default function MealBuilder() {
  return (
    <StyledMealBuilder>
      <h1>Meal Builder</h1>
      <h1>Column</h1>
      <FoodSearch />
      <FoodData />
    </StyledMealBuilder>
  );
}
