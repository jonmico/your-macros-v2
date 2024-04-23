import React, { useEffect, useState } from 'react';
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';
import styled from 'styled-components';
import { Food } from '../../types/food';
import { ServingsInput } from '../../ui/input/input';
import { ExitButton, MealTableCheckButton } from '../button/button';
import MacroDisplay from '../macro-display/macro-display';

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

interface MealTableProps {
  foods: { food: Food; servings: number }[];
  handleRemoveClick: (foodId: string) => void;
  handleClearClick: () => void;
  handleChangeServings: (foodId: string, servings: number) => void;
}

export default function MealTable({
  foods,
  handleClearClick,
  handleRemoveClick,
  handleChangeServings,
}: MealTableProps) {
  const foodTableList = foods.map((f) => (
    <MealTableRow
      handleChangeServings={handleChangeServings}
      handleRemoveClick={handleRemoveClick}
      key={f.food._id}
      food={f}
    />
  ));

  return (
    <StyledMealTable>
      {foods.length === 0 ? (
        <NoFoodsAddedText>
          No foods added to this meal yet {':('}
        </NoFoodsAddedText>
      ) : (
        <>
          <MealTableHeader handleClearClick={handleClearClick} />
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

interface MealTableHeaderProps {
  handleClearClick: () => void;
}

function MealTableHeader({ handleClearClick }: MealTableHeaderProps) {
  return (
    <StyledMealTableHeader>
      <div>Name & Brand</div>
      <div>Servings</div>
      <div>Nutrition</div>
      <ClearAllButton onClick={handleClearClick}>CLEAR ALL</ClearAllButton>
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
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FoodName = styled.div`
  font-weight: 500;
`;
const FoodBrand = styled.div`
  color: var(--color-slate-700);
`;

interface MealTableRowProps {
  food: { food: Food; servings: number };
  handleRemoveClick: (foodId: string) => void;
  handleChangeServings: (foodId: string, servings: number) => void;
}

function MealTableRow({
  food,
  handleRemoveClick,
  handleChangeServings: handleChange,
}: MealTableRowProps) {
  const { food: foodItem, servings } = food;
  const [foodServings, setFoodServings] = useState(String(servings));
  const [isEditActive, setIsEditActive] = useState(false);

  const foodServingsNum = Number(foodServings);

  /* 
    FIXME: Band-aid for updating state in the component when switching between
    meals with the same foods. foodServings state is being initialized with old
    state values when editMeal already exists. useEffect is used here to sync up
    the foodServings state with the servings value of the new foods in the new editMeal.

    Potential solutions: 
      1) Look for ways to set editMeal to null when navigating away from the edit feature.
      2) Tie an event handler to the Edit button to dispatch meal/clearEditMeal.
  */

  useEffect(() => {
    setFoodServings(String(servings));
  }, [servings]);

  function handleRemoveFoodClick() {
    if (foodItem._id) {
      handleRemoveClick(foodItem._id);
    }
  }

  function handleServingsChange(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (!foodItem._id) return;

    handleChange(foodItem._id, foodServingsNum);

    setIsEditActive(false);
  }

  const macroDisplayData = {
    calories: foodServingsNum * foodItem.calories,
    fat: foodServingsNum * foodItem.macros.fat,
    carbs: foodServingsNum * foodItem.macros.carbs,
    protein: foodServingsNum * foodItem.macros.protein,
  };

  return (
    <StyledMealTableRow>
      <div>
        <FoodName>{foodItem.name}</FoodName>
        <FoodBrand>{foodItem.brand}</FoodBrand>
      </div>
      <StyledForm onSubmit={handleServingsChange}>
        <ServingsInput
          type={'number'}
          value={foodServings}
          step={0.01}
          onChange={(evt) => setFoodServings(evt.target.value)}
          onClick={() => setIsEditActive(true)}
        />
        {isEditActive && (
          <MealTableCheckButton>
            <FaCircleCheck />
          </MealTableCheckButton>
        )}
      </StyledForm>
      <MacroDisplay data={macroDisplayData} />
      <ButtonContainer>
        <ExitButton onClick={handleRemoveFoodClick}>
          <FaCircleXmark />
        </ExitButton>
      </ButtonContainer>
    </StyledMealTableRow>
  );
}
