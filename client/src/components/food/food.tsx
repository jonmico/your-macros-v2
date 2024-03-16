import { Food as FoodType } from '../../types/food';
import styled from 'styled-components';

const StyledFood = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

interface FoodProps {
  food: FoodType;
}

export default function Food({ food }: FoodProps) {
  return (
    <StyledFood>
      <div>{food.name}</div>
      <div>{food.brand}</div>
      <div>
        <div>Serving Size:</div>
        <div>{food.servingSize}</div>
      </div>
      <div>{food.calories}</div>
      <div>
        <div>{food.macros.fat}f</div>
        <div>{food.macros.carbs}c</div>
        <div>{food.macros.protein}p</div>
      </div>
    </StyledFood>
  );
}
