import styled from 'styled-components';
import { Food } from '../../types/food';

interface StyledMealDropDownProps {
  $isDropDownOpen: boolean;
}

const StyledMealDropDown = styled.div<StyledMealDropDownProps>`
  display: grid;
  grid-template-rows: ${(props) => (props.$isDropDownOpen ? '1fr' : '0fr')};
  overflow: hidden;
  transition: grid-template-rows 500ms;
`;

const DropDownContent = styled.div`
  overflow: hidden;
`;

interface MealDropDownProps {
  isDropDownOpen: boolean;
  foods: { food: Food; servings: number }[];
}

export default function MealDropDown({
  isDropDownOpen,
  foods,
}: MealDropDownProps) {
  const foodList = foods.map((f) => <div key={f.food._id}>{f.food.name}</div>);
  return (
    <StyledMealDropDown $isDropDownOpen={isDropDownOpen}>
      <DropDownContent>{foodList}</DropDownContent>
    </StyledMealDropDown>
  );
}
