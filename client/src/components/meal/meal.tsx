import { useState } from 'react';
import styled from 'styled-components';
import { useMeal } from '../../hooks/useMeal';
import MealDropDown from '../meal-dropdown/meal-dropdown';
import MealHeader from '../meal-header/meal-header';

const StyledMeal = styled.div`
  background-color: var(--color-blue-100);
  padding: 1rem;
  border: 1px solid var(--color-blue-400);
  border-radius: var(--sm-radius);
  grid-column: 1 / -1;
`;

interface MealProps {
  isEditMeal?: boolean;
}

export default function Meal({ isEditMeal }: MealProps) {
  const { foods } = useMeal();
  const [isDropDownOpen, setIsDropDownOpen] = useState(() => {
    if (isEditMeal) {
      return true;
    } else {
      return false;
    }
  });

  function handleDropDownClick() {
    setIsDropDownOpen((prevState) => !prevState);
  }

  return (
    <StyledMeal>
      <MealHeader
        foods={foods}
        handleDropDownClick={handleDropDownClick}
        isDropDownOpen={isDropDownOpen}
      />
      <MealDropDown isDropDownOpen={isDropDownOpen} />
    </StyledMeal>
  );
}
