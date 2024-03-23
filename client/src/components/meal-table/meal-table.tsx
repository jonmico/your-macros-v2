import { useMeal } from '../../hooks/useMeal';
import styled from 'styled-components';
import { Food } from '../../types/food';
import { ExitButton } from '../button/button';
import { FaCircleXmark } from 'react-icons/fa6';

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
`;

function MealTableHeader() {
  const { clearFoods } = useMeal();

  return (
    <StyledMealTableHeader>
      <div>Name & Brand</div>
      <div>Servings</div>
      <div>Nutrition</div>
      <ClearAllButton onClick={clearFoods}>Clear all</ClearAllButton>
    </StyledMealTableHeader>
  );
}

const StyledMealTableRow = styled.li`
  display: grid;
  grid-template-columns: 1.5fr 1fr 2fr 0.75fr;
  gap: 1rem;
  padding: 0.25rem 1.25rem 0.25rem 1.25rem;
  align-items: center;

  & button {
    margin: auto;
  }
`;

interface MealTableRowProps {
  food: { food: Food; servings: number };
}

function MealTableRow({ food }: MealTableRowProps) {
  const { removeFood } = useMeal();
  const { food: foodItem, servings } = food;
  return (
    <StyledMealTableRow>
      <div>
        <div>{foodItem.name}</div>
        <div>{foodItem.brand}</div>
      </div>
      <div>{servings}</div>
      <div>
        {foodItem.calories}cals/{foodItem.macros.fat}f/{foodItem.macros.carbs}c/
        {foodItem.macros.protein}
      </div>
      <ExitButton onClick={() => removeFood(foodItem._id)}>
        <FaCircleXmark />
      </ExitButton>
    </StyledMealTableRow>
  );
}
