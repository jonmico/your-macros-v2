import { useState } from 'react';
import styled from 'styled-components';
import { useMeal } from '../../hooks/useMeal';
import { Food as FoodType } from '../../types/food';
import { Macros } from '../../types/macros';
import { WideButton } from '../button/button';

const StyledFood = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FoodName = styled.h2`
  color: var(--color-indigo-700);
`;

const FoodBrand = styled.h3`
  color: var(--color-slate-700);
  font-weight: 600;
`;

const ServingSizeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ServingsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface FoodProps {
  food: FoodType;
}

export default function Food({ food }: FoodProps) {
  const { addFood } = useMeal();
  const [servings, setServings] = useState('1');

  function handleClick() {
    const newFood = {
      food,
      servings: Number(servings),
    };
    addFood(newFood);
  }
  return (
    <StyledFood>
      <div>
        <FoodName>{food.name}</FoodName>
        <FoodBrand>{food.brand}</FoodBrand>
      </div>
      <ServingSizeContainer>
        <div>Serving Size:</div>
        <div>{food.servingSize}</div>
      </ServingSizeContainer>
      <ServingsContainer>
        <label htmlFor='servings'>Servings:</label>
        <input
          name={'servings'}
          id={'servings'}
          type='number'
          value={servings}
          onChange={(evt) => setServings(evt.target.value)}
        />
      </ServingsContainer>
      <MacroDisplay
        servings={Number(servings)}
        calories={food.calories}
        macros={food.macros}
      />
      <WideButton onClick={handleClick}>Add to meal</WideButton>
    </StyledFood>
  );
}

const StyledMacroDisplay = styled.div`
  padding: 1rem;
  /* border: 1px solid var(--color-blue-400); */

  background-color: var(--color-slate-300);
  border-radius: var(--lg-radius);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const MacroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

interface MacroDisplayProps {
  calories: number;
  macros: Macros;
  servings?: number;
}

function MacroDisplay({ calories, macros, servings = 1 }: MacroDisplayProps) {
  const { carbs, fat, protein } = macros;

  const carbAmount = servings * carbs;
  const fatAmount = servings * fat;
  const proteinAmount = servings * protein;
  const calorieAmount = servings * calories;

  return (
    <StyledMacroDisplay>
      <MacroContainer>
        <Macro macro={'calories'} macroAmount={calorieAmount} />
        <Macro macro={'fat'} macroAmount={fatAmount} />
        <Macro macro={'carbs'} macroAmount={carbAmount} />
        <Macro macro={'protein'} macroAmount={proteinAmount} />
      </MacroContainer>
    </StyledMacroDisplay>
  );
}

const StyledMacro = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`;

interface MacroProps {
  macro: string;
  macroAmount: number;
}

function Macro({ macro, macroAmount }: MacroProps) {
  return (
    <StyledMacro>
      <div>
        {macroAmount}
        {macro === 'calories' ? '' : 'g'}
      </div>
      <div>{macro}</div>
    </StyledMacro>
  );
}
