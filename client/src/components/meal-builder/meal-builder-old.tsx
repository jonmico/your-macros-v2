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

interface MealBuilderProps {
  isEditMeal?: boolean;
}

export default function MealBuilder({ isEditMeal = false }: MealBuilderProps) {
  const { isLoadingDB: isFoodLogLoading } = useFoodLog();

  if (isEditMeal) {
    return (
      <StyledMealBuilder>
        {isFoodLogLoading && (
          <CenterSpinnerContainer>
            <Loading>
              <Spinner />
              <div>Updating log...</div>
            </Loading>
          </CenterSpinnerContainer>
        )}
        <Meal isEditMeal={isEditMeal} />
        <FoodSearch />
        <FoodData />
      </StyledMealBuilder>
    );
  }

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
