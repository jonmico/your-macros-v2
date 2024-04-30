import { useFetchFood } from '../../hooks/useFetchFood';
import { Food as FoodType } from '../../types/food';
import styled from 'styled-components';
import { Spinner } from '../spinner/spinner';

const StyledCreatedFood = styled.div`
  height: min-content;
  padding: 1rem;
`;

export default function CreatedFood() {
  const { food, isLoading: isFetchFoodLoading } = useFetchFood();

  const output = isFetchFoodLoading ? (
    <CreatedFoodSpinner />
  ) : (
    <Food food={food} />
  );

  return <StyledCreatedFood>{output}</StyledCreatedFood>;
}

const StyledFood = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

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
