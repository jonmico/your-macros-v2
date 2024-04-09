import styled from 'styled-components';
import { IconButton } from '../../button/button';
import { FaCirclePlus } from 'react-icons/fa6';
import { useFood } from '../../../hooks/useFood';
import { Food } from '../../../types/food';

const StyledSearchedFoodListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--color-blue-300);

  &:hover {
    cursor: pointer;
    background-color: var(--color-blue-200);
  }

  &:last-of-type {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom: none;
  }

  &:first-of-type {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
`;

const FoodName = styled.div`
  font-weight: 500;
`;

const FoodBrand = styled.div`
  color: var(--color-slate-600);
`;

interface SearchedFoodListItemProps {
  food: Food;
  foods: { food: Food; servings: number }[];
  handleAddClick: (
    evt: React.MouseEvent<HTMLButtonElement>,
    food: Food
  ) => void;
}

export default function SearchedFoodListItem({
  foods,
  food,
  handleAddClick,
}: SearchedFoodListItemProps) {
  const { dispatch: foodDispatch } = useFood();

  const isInMeal = foods.map(({ food }) => food._id).includes(food._id);

  function handleSelectClick() {
    foodDispatch({ type: 'food/setSelectedFood', payload: food });
  }

  return (
    <StyledSearchedFoodListItem onClick={handleSelectClick}>
      <div>
        <FoodName>{food.name}</FoodName>
        <FoodBrand>{food.brand}</FoodBrand>
      </div>
      <IconButton
        disabled={isInMeal}
        onClick={(evt) => handleAddClick(evt, food)}
      >
        <FaCirclePlus />
      </IconButton>
    </StyledSearchedFoodListItem>
  );
}
