import { FaXmark } from 'react-icons/fa6';
import styled from 'styled-components';
import { useFood } from '../../hooks/useFood';
import { Food as FoodType } from '../../types/food';
import { ExitButton, PurpleWideButton } from '../button/button';
import Food from '../food/food';

const StyledFoodData = styled.div`
  border: 1px solid var(--color-indigo-500);
  border-radius: var(--md-radius);
  padding: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  height: min-content;
`;

const NoFoodSelectedText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
`;

const ExitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface FoodDataProps {
  handleAddClick: (
    evt: React.MouseEvent<HTMLButtonElement>,
    food: FoodType,
    servings?: number
  ) => void;
  foods: { food: FoodType; servings: number }[];
}

export default function FoodData({ handleAddClick, foods }: FoodDataProps) {
  const { foodState, dispatch } = useFood();
  const { selectedFood, searchedFoods, foodServings } = foodState;

  const isInMeal = foods.map((f) => f.food._id).includes(selectedFood?._id);

  if (!searchedFoods.length) return null;

  return (
    <StyledFoodData>
      {!selectedFood ? (
        <NoFoodSelectedText>
          Select a food from the list to view its data
        </NoFoodSelectedText>
      ) : (
        <>
          <ExitButtonContainer>
            <ExitButton
              onClick={() => dispatch({ type: 'food/clearSelectedFood' })}
            >
              <FaXmark />
            </ExitButton>
          </ExitButtonContainer>
          <Food food={selectedFood}>
            <PurpleWideButton
              disabled={isInMeal}
              onClick={(evt) =>
                handleAddClick(evt, selectedFood, Number(foodServings))
              }
            >
              Add to meal
            </PurpleWideButton>
          </Food>
        </>
      )}
    </StyledFoodData>
  );
}
