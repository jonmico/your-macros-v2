import { useFetchFood } from '../../hooks/useFetchFood';
import { Food as FoodType } from '../../types/food';
import styled from 'styled-components';
import { Spinner } from '../spinner/spinner';

export default function CreatedFood() {
  const { food, isLoading: isFetchFoodLoading } = useFetchFood();

  return (
    <div>
      {isFetchFoodLoading ? (
        <CreatedFoodSpinner />
      ) : (
        <Food isFetchFoodLoading={isFetchFoodLoading} food={food} />
      )}
    </div>
  );
}

interface FoodProps {
  food: FoodType | null;
  isFetchFoodLoading: boolean;
}

function Food({ food, isFetchFoodLoading }: FoodProps) {
  if (food === null || isFetchFoodLoading) return null;

  return (
    <div>
      <h2>{food.name}</h2>
      <h3>{food.brand}</h3>
    </div>
  );
}

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

function CreatedFoodSpinner() {
  return (
    <SpinnerContainer>
      <Spinner></Spinner>
    </SpinnerContainer>
  );
}
