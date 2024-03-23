import { useState } from 'react';
import styled from 'styled-components';
import { useFoodLog } from '../../hooks/useFoodLog';
import { Food } from '../../types/food';
import { PrimaryButton, SmallButton } from '../button/button';
import LogSelect from '../log-select/log-select';
import MealMacros from '../meal-macros/meal-macros';

const StyledMealHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const MealDataContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.input`
  background-color: inherit;
  border: 1px solid var(--color-blue-500);
  border-radius: var(--sm-radius);
  padding: 0.25rem;
  width: 25%;
  transition: background-color 250ms, padding 350ms;

  &:focus-visible {
    background-color: var(--color-slate-200);
    outline: 1px solid var(--color-indigo-500);
    padding-left: 0.5rem;
  }
`;

interface MealHeaderProps {
  foods: { food: Food; servings: number }[];
  handleDropDownClick: () => void;
  isDropDownOpen: boolean;
}

export default function MealHeader({
  handleDropDownClick,
  isDropDownOpen,
  foods,
}: MealHeaderProps) {
  const [mealName, setMealName] = useState('');
  const { foodLogs, currentLog } = useFoodLog();

  const mealCalories = foods.reduce(
    (prev, curr) => prev + curr.food.calories * curr.servings,
    0
  );
  const mealFat = foods.reduce(
    (prev, curr) => prev + curr.food.macros.fat * curr.servings,
    0
  );
  const mealCarbs = foods.reduce(
    (prev, curr) => prev + curr.food.macros.carbs * curr.servings,
    0
  );
  const mealProtein = foods.reduce(
    (prev, curr) => prev + curr.food.macros.protein * curr.servings,
    0
  );

  const buttonText = isDropDownOpen ? 'Show less' : 'Show more';

  return (
    <StyledMealHeader>
      <MealDataContainer>
        <Input
          type='text'
          placeholder={'Meal name'}
          value={mealName}
          onChange={(evt) => setMealName(evt.target.value)}
        />
        <MealMacros
          calories={mealCalories}
          fat={mealFat}
          carbs={mealCarbs}
          protein={mealProtein}
        />
        <LogSelect logs={foodLogs} currentLog={currentLog} />
        <PrimaryButton>Add to log</PrimaryButton>
      </MealDataContainer>
      <SmallButton onClick={handleDropDownClick}>{buttonText}</SmallButton>
    </StyledMealHeader>
  );
}
