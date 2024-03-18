import { Food as FoodType } from '../../types/food';
import styled from 'styled-components';
import { PrimaryButton } from '../button/button';
import { useMeal } from '../../hooks/useMeal';
import { useState } from 'react';

const StyledFood = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

interface FoodProps {
  food: FoodType;
}

export default function Food({ food }: FoodProps) {
  const { addFood } = useMeal();
  const [servings, setServings] = useState('');

  function handleClick() {
    const newFood = {
      food,
      servings: Number(servings),
    };
    addFood(newFood);
  }
  return (
    <StyledFood>
      <div>{food.name}</div>
      <div>{food.brand}</div>
      <div>
        <div>Serving Size:</div>
        <div>{food.servingSize}</div>
      </div>
      <div>
        <label htmlFor='servings'>Servings</label>
        <input
          name={'servings'}
          id={'servings'}
          type='number'
          value={servings}
          onChange={(evt) => setServings(evt.target.value)}
        />
      </div>
      <div>{food.calories}</div>
      <div>
        <div>{food.macros.fat}f</div>
        <div>{food.macros.carbs}c</div>
        <div>{food.macros.protein}p</div>
      </div>
      <PrimaryButton onClick={handleClick}>Add to meal</PrimaryButton>
    </StyledFood>
  );
}
