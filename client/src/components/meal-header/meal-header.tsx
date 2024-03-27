import React, { useState } from 'react';
import styled from 'styled-components';
import { useFoodLog } from '../../hooks/useFoodLog';
import { useUser } from '../../hooks/useUser';
import { Food } from '../../types/food';
import { Meal } from '../../types/meal';
import { PurpleWideButton, SmallButton } from '../button/button';
import LogSelect from '../log-select/log-select';
import MealMacros from '../meal-macros/meal-macros';
import { ErrorText } from '../../ui/error-text/error-text';
import Toast from '../toast/toast';
import { FoodLog } from '../../types/food-log';

const StyledMealHeader = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 0.75fr;
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
  height: 2rem;
  width: 100%;

  &:focus-visible {
    background-color: var(--color-slate-200);
    outline: 1px solid var(--color-indigo-500);
    padding-left: 0.5rem;
  }
`;

const ToastContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
`;

const ToastFoodText = styled.span`
  font-weight: 500;
  color: var(--color-indigo-600);
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
  const [mealNameError, setMealNameError] = useState('');
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [foodLog, setFoodLog] = useState<FoodLog | null>(null);
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
    if (!mealName) {
      setMealNameError('Please provide a name for the meal.');
      return;
    }

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

    const log = await addMealToLog(currentLog._id, meal);

    setIsToastOpen(true);
  }

  function handleMealNameChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setMealNameError('');
    setMealName(evt.target.value);
  }

  return (
    <StyledMealHeader>
      {isToastOpen && (
        <Toast closeToastWindow={() => setIsToastOpen(false)}>
          <ToastContent>
            <div>
              Added{' '}
              <ToastFoodText>
                {foodLog?.meals[foodLog.meals.length - 1].name}
              </ToastFoodText>{' '}
              meal to <ToastFoodText>{foodLog?.name}</ToastFoodText> log
            </div>
            <div>Check it out here (NYI)</div>
          </ToastContent>
        </Toast>
      )}
      <div>
        <Input
          type='text'
          placeholder={'Meal name'}
          value={mealName}
          onChange={handleMealNameChange}
        />
        {mealNameError && <ErrorText>{mealNameError}</ErrorText>}
      </div>
      <LogSelect logs={foodLogs} currentLog={currentLog} />
      <PurpleWideButton disabled={isFoodLogLoading} onClick={handleAddToLog}>
        Add to log
      </PurpleWideButton>
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
