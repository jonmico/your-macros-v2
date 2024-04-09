import styled from 'styled-components';
import MealBuilder from '../../components/meal-builder/meal-builder';
import LogSelect from '../../components/log-select/log-select';
import { useFoodLog } from '../../hooks/useFoodLog';
import { PurpleWideButton, SmallButton } from '../../components/button/button';
import TotalsDisplay from '../../components/totals-display/totals-display';
import { calcMacros } from '../../utils/calcMacros';
import { useMeal } from '../../hooks/useMeal';
import MealDropDown from '../../components/meal-dropdown/meal-dropdown';
import { useState } from 'react';
import { MealBuilderInput } from '../../ui/input/input';
import FoodSearch from '../../components/food-search/food-search';
import FoodData from '../../components/food-data/food-data';
import { Food } from '../../types/food';
import { useFood } from '../../hooks/useFood';

export default function AddMeal() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const {
    mealState: {
      buildMeal,
      buildMeal: { foods },
    },
    dispatch: mealDispatch,
  } = useMeal();
  const { currentLog, foodLogs } = useFoodLog();
  const { dispatch: foodDispatch } = useFood();

  function handleDropDownClick() {
    setIsDropDownOpen((prevState) => !prevState);
  }

  function handleAddClick(
    evt: React.MouseEvent<HTMLButtonElement>,
    food: Food
  ) {
    evt.stopPropagation();
    mealDispatch({
      type: 'meal/addBuildMealFood',
      payload: { food: { food, servings: 1 } },
    });
    foodDispatch({ type: 'food/changeServings', payload: { servings: '1' } });
  }

  return (
    <div>
      <MealBuilder>
        <Meal>
          <MealHeader
            isDropDownOpen={isDropDownOpen}
            handleDropDownClick={handleDropDownClick}
          >
            <MealBuilderInput placeholder={'Meal name'} />
            <LogSelect logs={foodLogs} currentLog={currentLog} />
            <PurpleWideButton>Add to log</PurpleWideButton>
          </MealHeader>
          <MealDropDown
            isDropDownOpen={isDropDownOpen}
            foods={buildMeal.foods}
          />
        </Meal>
        <FoodSearch foods={foods} handleAddClick={handleAddClick} />
        <FoodData />
      </MealBuilder>
    </div>
  );
}

const StyledMeal = styled.div`
  background-color: var(--color-blue-100);
  padding: 1rem;
  border: 1px solid var(--color-blue-400);
  border-radius: var(--sm-radius);
  grid-column: 1 / -1;
`;

interface MealProps {
  children: React.ReactNode;
}

function Meal({ children }: MealProps) {
  return <StyledMeal>{children}</StyledMeal>;
}

const StyledAddMealHeader = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 0.75fr;
  grid-template-rows: auto;
  align-items: center;
  column-gap: 1rem;
  row-gap: 0.5rem;
`;

interface AddMealHeaderProps {
  children: React.ReactNode;
  isDropDownOpen: boolean;
  handleDropDownClick: () => void;
}

function MealHeader({
  children,
  isDropDownOpen,
  handleDropDownClick,
}: AddMealHeaderProps) {
  const {
    mealState: { buildMeal },
  } = useMeal();

  const { calories, fat, carbs, protein } = calcMacros(buildMeal.foods);

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
