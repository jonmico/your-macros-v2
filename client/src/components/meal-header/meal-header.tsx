import React, { useState } from 'react';
import styled from 'styled-components';
import { useFoodLog } from '../../hooks/useFoodLog';
import { useMeal } from '../../hooks/useMeal';
import { useUser } from '../../hooks/useUser';
import { Food } from '../../types/food';
import { FoodLog } from '../../types/food-log';
import { Meal } from '../../types/meal';
import { ErrorText } from '../../ui/error-text/error-text';
import { PurpleWideButton, SmallButton } from '../button/button';
import LogSelect from '../log-select/log-select';
import Toast from '../toast/toast';
import TotalsDisplay from '../totals-display/totals-display';
import { Link } from 'react-router-dom';

const StyledMealHeader = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 0.75fr;
  grid-template-rows: auto;
  align-items: center;
  column-gap: 1rem;
  row-gap: 0.5rem;
`;

const InputContainer = styled.div`
  grid-column: 1 /3;
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

const ToastFoodLink = styled(Link)`
  font-weight: 500;
  color: var(--color-indigo-600);
  text-decoration: underline;
`;

interface MealHeaderProps {
  foods: { food: Food; servings: number }[];
  handleDropDownClick: () => void;
  isDropDownOpen: boolean;
  isEditMeal?: boolean;
}

export default function MealHeader({
  handleDropDownClick,
  isDropDownOpen,
  foods,
  isEditMeal,
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
  const { dispatch: mealDispatch } = useMeal();

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

    if (!log) return;

    setFoodLog(log);
    mealDispatch({ type: 'meal/clearFoods' });
    setMealName('');
    setIsToastOpen(true);
  }

  function handleMealNameChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setMealNameError('');
  if (isEditMeal) {
    return (
      <StyledMealHeader>
        {isToastOpen && (
          <MealToast
            isEditMeal={isEditMeal}
            setIsToastOpen={setIsToastOpen}
            foodLog={currentLog}
          />
        )}
        <InputContainer>
          <Input
            type='text'
            placeholder={'Meal name'}
            value={mealName}
            onChange={handleMealNameChange}
          />
          {mealNameError && <ErrorText>{mealNameError}</ErrorText>}
        </InputContainer>
        <PurpleWideButton disabled={isFoodLogLoading} onClick={handleAddToLog}>
          Update log
        </PurpleWideButton>
        <TotalsDisplay
          totalsText={'Meal Totals:'}
          calories={mealCalories}
          fat={mealFat}
          carbs={mealCarbs}
          protein={mealProtein}
        />
        <SmallButton onClick={handleDropDownClick}>{buttonText}</SmallButton>
      </StyledMealHeader>
    );
  }

  return (
    <StyledMealHeader>
      {isToastOpen && (
        <MealToast setIsToastOpen={setIsToastOpen} foodLog={currentLog} />
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
      <TotalsDisplay
        totalsText={'Log Totals:'}
        calories={mealCalories}
        fat={mealFat}
        carbs={mealCarbs}
        protein={mealProtein}
      />
      <SmallButton onClick={handleDropDownClick}>{buttonText}</SmallButton>
    </StyledMealHeader>
  );
}

interface MealToast {
  setIsToastOpen: React.Dispatch<SetStateAction<boolean>>;
  foodLog: FoodLog | null;
  isEditMeal?: boolean;
}

function MealToast({ setIsToastOpen, foodLog, isEditMeal = false }: MealToast) {
  if (!foodLog) return null;

  if (isEditMeal) {
    return (
      <Toast closeToastWindow={() => setIsToastOpen(false)}>
        <ToastContent>
          <div>
            Updated{' '}
            <ToastFoodText>
              {foodLog.meals[foodLog.meals.length - 1].name}
            </ToastFoodText>{' '}
            meal in <ToastFoodText>{foodLog.name}</ToastFoodText> log
          </div>
          <div>
            Check it out{' '}
            <ToastFoodLink to={`/app/food-logs/${foodLog._id}`}>
              here
            </ToastFoodLink>
          </div>
        </ToastContent>
      </Toast>
    );
  }

  return (
    <Toast closeToastWindow={() => setIsToastOpen(false)}>
      <ToastContent>
        <div>
          Added{' '}
          <ToastFoodText>
            {foodLog.meals[foodLog.meals.length - 1].name}
          </ToastFoodText>{' '}
          meal to <ToastFoodText>{foodLog.name}</ToastFoodText> log
        </div>
        <div>
          Check it out{' '}
          <ToastFoodLink to={`/app/food-logs/${foodLog._id}`}>
            here
          </ToastFoodLink>
        </div>
      </ToastContent>
    </Toast>
  );
}
