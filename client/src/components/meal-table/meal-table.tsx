import { useMeal } from '../../hooks/useMeal';
import styled from 'styled-components';
import { Food } from '../../types/food';
import { ExitButton } from '../button/button';
import { FaCircleXmark } from 'react-icons/fa6';
import { ServingsInput } from '../../ui/input/input';
import React, { useState } from 'react';

const StyledMealTable = styled.div`
  background-color: var(--color-blue-200);
  border-radius: var(--sm-radius);
  padding: 0.75rem;
`;

const NoFoodsAddedText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 5rem;
  font-weight: 500;
  color: var(--color-slate-700);
`;

export default function MealTable() {
  const { foods } = useMeal();

  const foodTableList = foods.map((f) => (
    <MealTableRow key={f.food._id} food={f} />
  ));

  return (
    <StyledMealTable>
      {foods.length === 0 ? (
        <NoFoodsAddedText>
          No foods added to this meal yet {':('}
        </NoFoodsAddedText>
      ) : (
        <>
          <MealTableHeader />
          <ul>{foodTableList}</ul>
        </>
      )}
    </StyledMealTable>
  );
}

const StyledMealTableHeader = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 2fr 0.75fr;
  gap: 1rem;
  font-weight: 500;
  color: var(--color-slate-800);
  border-bottom: 1px solid var(--color-blue-400);
  padding: 0 1.25rem 0.25rem 1.25rem;
  align-items: center;
`;

const ClearAllButton = styled.button`
  background-color: var(--color-red-300);
  border: 1px solid var(--color-red-600);
  border-radius: var(--lg-radius);
  padding: 0 0.5rem;
  font-size: 0.85rem;
  width: fit-content;
  margin: auto;
  transition: background-color 250ms;

  &:hover {
    cursor: pointer;
    background-color: var(--color-red-200);
  }
`;

function MealTableHeader() {
  const { dispatch } = useMeal();

  return (
    <StyledMealTableHeader>
      <div>Name & Brand</div>
      <div>Servings</div>
      <div>Nutrition</div>
      <ClearAllButton onClick={() => dispatch({ type: 'meal/clearFoods' })}>
        CLEAR ALL
      </ClearAllButton>
    </StyledMealTableHeader>
  );
}

const StyledMealTableRow = styled.li`
  display: grid;
  grid-template-columns: 1.5fr 1fr 2fr 0.75fr;
  gap: 1rem;
  padding: 0.5rem 1.25rem 0.5rem 1.25rem;
  align-items: center;
  border-bottom: 1px solid var(--color-blue-300);

  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }
  & button {
    margin: auto;
  }
`;

interface MealTableRowProps {
  food: { food: Food; servings: number };
}

function MealTableRow({ food }: MealTableRowProps) {
  const { dispatch: mealDispatch } = useMeal();
  const { food: foodItem, servings } = food;
  const [foodServings, setFoodServings] = useState(String(servings));

  const foodServingsNum = Number(foodServings);

  function handleRemoveFoodClick() {
    if (foodItem._id) {
      mealDispatch({ type: 'meal/removeFood', payload: foodItem._id });
    }
  }

  function handleServingsChange(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (!foodItem._id) return;

    mealDispatch({
      type: 'meal/changeFoodServings',
      payload: { foodId: foodItem._id, servings: foodServingsNum },
    });
  }

  return (
    <StyledMealTableRow>
      <div>
        <div>{foodItem.name}</div>
        <div>{foodItem.brand}</div>
      </div>
      <form onSubmit={handleServingsChange}>
        <ServingsInput
          type={'number'}
          value={foodServings}
          step={0.01}
          onChange={(evt) => setFoodServings(evt.target.value)}
        />
      </form>
      <div>
        {foodServingsNum * foodItem.calories}cals/
        {foodServingsNum * foodItem.macros.fat}f/
        {foodServingsNum * foodItem.macros.carbs}c/
        {foodServingsNum * foodItem.macros.protein}
      </div>
      <ExitButton onClick={handleRemoveFoodClick}>
        <FaCircleXmark />
      </ExitButton>
    </StyledMealTableRow>
  );
}
