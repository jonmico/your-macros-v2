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
}

function Food({ food }: FoodProps) {
  if (food === null) return null;

  return (
    <StyledFood>
      <FoodHeader name={food.name} brand={food.brand} />
      <div>another div</div>
    </StyledFood>
  );
}

const StyledFoodHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  font-size: 0.85rem;
  padding: 0.1rem 0.5rem;
  height: min-content;
  border-radius: 4px;
  transition: background-color 200ms ease-in-out;

  &:focus {
    outline: 2px solid var(--color-indigo-600);
  }

  &:hover {
    cursor: pointer;
  }
`;

const EditButton = styled(Button)`
  background-color: var(--color-yellow-400);
  border: 1px solid var(--color-yellow-500);

  &:hover {
    background-color: var(--color-yellow-500);
  }
`;

const DeleteButton = styled(Button)`
  background-color: var(--color-red-400);
  border: 1px solid var(--color-red-600);

  &:hover {
    background-color: var(--color-red-500);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`;

interface FoodHeaderProps {
  name: string;
  brand: string;
}

function FoodHeader({ name, brand }: FoodHeaderProps) {
  return (
    <StyledFoodHeader>
      <div>
        <h2>{name}</h2>
        <h3>{brand}</h3>
      </div>
      <ButtonContainer>
        <EditButton>Edit</EditButton>
        <DeleteButton>Delete</DeleteButton>
      </ButtonContainer>
    </StyledFoodHeader>
  );
}

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10rem;
`;

function CreatedFoodSpinner() {
  return (
    <SpinnerContainer>
      <Spinner></Spinner>
    </SpinnerContainer>
  );
}
