import { useState } from 'react';
import styled from 'styled-components';
import { useFoodLog } from '../../hooks/useFoodLog';
import { useUser } from '../../hooks/useUser';
import { Food } from '../../types/food';
import { Meal } from '../../types/meal';
import { AddMealToLogButton, SmallButton } from '../button/button';
import LogSelect from '../log-select/log-select';
import MealMacros from '../meal-macros/meal-macros';

const StyledMealHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  align-items: center;
  column-gap: 1rem;
  row-gap: 0.5rem;
`;

const Input = styled.input`
  background-color: inherit;
  border: 1px solid var(--color-blue-500);
  border-radius: var(--sm-radius);
  padding: 0.25rem;
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
  const {
    foodLogs,
    currentLog,
    addMealToLog,
    isLoading: isFoodLogLoading,
  } = useFoodLog();
  const { userId } = useUser();

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

  // TODO: Error handling for empty meal name. Error handling/disabled states
  // for cases where no foods are in the meal. Do some styling or something.
  async function handleAddToLog() {
    if (!currentLog || !currentLog._id) return; // Check to see if both exist.

    const meal: Meal = {
      foods,
      name: mealName,
      author: userId,
      mealTotals: {
        calories: mealCalories,
        macros: {
          fat: mealFat,
          carbs: mealCarbs,
          protein: mealProtein,
        },
      },
    };

    await addMealToLog(currentLog._id, meal);
  }

  return (
    <StyledMealHeader>
      <Input
        type='text'
        placeholder={'Meal name'}
        value={mealName}
        onChange={(evt) => setMealName(evt.target.value)}
      />
      <LogSelect logs={foodLogs} currentLog={currentLog} />
      <AddMealToLogButton disabled={isFoodLogLoading} onClick={handleAddToLog}>
        Add to log
      </AddMealToLogButton>
      <MealMacros
        calories={mealCalories}
        fat={mealFat}
        carbs={mealCarbs}
        protein={mealProtein}
      />
      <SmallButton onClick={handleDropDownClick}>{buttonText}</SmallButton>
    </StyledMealHeader>
  );
}
