import styled from 'styled-components';
import { Food } from '../../types/food';
import { calcMacros } from '../../utils/calcMacros';
import { SmallButton } from '../button/button';
import TotalsDisplay from '../totals-display/totals-display';

const StyledAddMealHeader = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 0.75fr;
  grid-template-rows: auto;
  align-items: center;
  column-gap: 1rem;
  row-gap: 0.5rem;
`;

interface MealHeaderProps {
  children: React.ReactNode;
  isDropDownOpen: boolean;
  handleDropDownClick: () => void;
  foods: { food: Food; servings: number }[];
}

export default function MealHeader({
  children,
  isDropDownOpen,
  handleDropDownClick,
  foods,
}: MealHeaderProps) {
  const { calories, fat, carbs, protein } = calcMacros(foods);

  const buttonText = isDropDownOpen ? 'Show less' : 'Show more';

  return (
    <StyledAddMealHeader>
      {children}
      <TotalsDisplay
        totalsText={'Meal Totals:'}
        calories={calories}
        fat={fat}
        carbs={carbs}
        protein={protein}
      />
      <SmallButton onClick={handleDropDownClick}>{buttonText}</SmallButton>
    </StyledAddMealHeader>
  );
}
