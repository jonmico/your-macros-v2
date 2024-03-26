import styled from 'styled-components';

const StyledMealMacros = styled.div`
  grid-column: 1 / 3;
  padding: 0.5rem 1.5rem;
  background-color: var(--color-indigo-300);
  border-radius: var(--sm-radius);
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const MealTotals = styled.div`
  font-weight: 600;
  color: var(--color-slate-700);
`;

interface MealMacrosProps {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export default function MealMacros({
  calories,
  protein,
  fat,
  carbs,
}: MealMacrosProps) {
  return (
    <StyledMealMacros>
      <MealTotals>Meal Totals:</MealTotals>
      <div>{calories} calories</div>
      <div>{fat} fat</div>
      <div>{carbs} carbs</div>
      <div>{protein} protein</div>
    </StyledMealMacros>
  );
}
