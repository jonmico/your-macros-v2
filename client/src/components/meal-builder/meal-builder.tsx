import { useFoodLog } from '../../hooks/useFoodLog';

import styled from 'styled-components';
import FoodData from '../food-data/food-data';
import FoodSearch from '../food-search/food-search';
import Meal from '../meal/meal';
import { CenterSpinnerContainer, Spinner } from '../spinner/spinner';

const StyledMealBuilder = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  position: relative;
`;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 1rem;
  background-color: var(--color-slate-200);
  border-radius: var(--md-radius);
  border: 1px solid var(--color-slate-700);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  z-index: 2;
`;

// FIXME: isFoodLogLoading is showing 'Adding meal to log...' on page refresh.

export default function MealBuilder() {
  const { isLoadingDB: isFoodLogLoading } = useFoodLog();
  return (
    <StyledMealBuilder>
      {isFoodLogLoading && (
        <CenterSpinnerContainer>
          <Loading>
            <Spinner />
            <div>Adding meal to log...</div>
          </Loading>
        </CenterSpinnerContainer>
      )}
      <Meal />
      <FoodSearch />
      <FoodData />
    </StyledMealBuilder>
  );
}
