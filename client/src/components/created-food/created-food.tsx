import styled from 'styled-components';
import { useFetchFood } from '../../hooks/useFetchFood';
import { useFood } from '../../hooks/useFood';
import { Food as FoodType } from '../../types/food';
import { Macros } from '../../types/macros';
import { Spinner } from '../spinner/spinner';

const StyledCreatedFood = styled.div`
  height: min-content;
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
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

interface FoodProps {
  food: FoodType | null;
}
/*
  FIXME: Sync up frontend with database. useEffect hook somewhere?
  Probably store createdFoods in a context.
*/
function Food({ food }: FoodProps) {
  const { deleteFood } = useFood();

  if (food === null) return null;

  const { servingSize, calories, macros } = food;

  async function handleDeleteClick() {
    if (!food || !food._id) return;

    const data = await deleteFood(food._id);

    console.log(data);
  }

  function handleEditClick() {
    // TODO: Implement handleEditClick
    console.log('NYI');
  }

  return (
    <StyledFood>
      <FoodHeader
        name={food.name}
        brand={food.brand}
        handleDeleteClick={handleDeleteClick}
      />
      <FoodData servingSize={servingSize} calories={calories} macros={macros} />
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

const FoodHeaderName = styled.h2`
  color: var(--color-indigo-700);
`;

const FoodHeaderBrand = styled.h3`
  color: var(--color-gray-600);
`;

interface FoodHeaderProps {
  name: string;
  brand: string;
  handleDeleteClick: () => Promise<void>;
}

function FoodHeader({ name, brand, handleDeleteClick }: FoodHeaderProps) {
  return (
    <StyledFoodHeader>
      <div>
        <FoodHeaderName>{name}</FoodHeaderName>
        <FoodHeaderBrand>{brand}</FoodHeaderBrand>
      </div>
      <ButtonContainer>
        <EditButton>Edit</EditButton>
        <DeleteButton onClick={handleDeleteClick}>Delete</DeleteButton>
      </ButtonContainer>
    </StyledFoodHeader>
  );
}

const StyledFoodData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ServingSizeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  color: var(--color-slate-700);
`;

const CaloriesMacrosContainer = styled.div`
  padding: 1rem;
  gap: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background-color: var(--color-blue-100);
  border-radius: 12px;
  color: var(--color-indigo-800);
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

interface FoodDataProps {
  servingSize: string;
  calories: number;
  macros: Macros;
}

function FoodData({ servingSize, calories, macros }: FoodDataProps) {
  const { fat, carbs, protein } = macros;

  return (
    <StyledFoodData>
      <ServingSizeContainer>
        <div>Serving Size</div>
        <div>{servingSize}</div>
      </ServingSizeContainer>
      <CaloriesMacrosContainer>
        <div>{calories} cals</div>
        <div>{fat} fat</div>
        <div>{carbs} carbs</div>
        <div>{protein} protein</div>
      </CaloriesMacrosContainer>
    </StyledFoodData>
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
