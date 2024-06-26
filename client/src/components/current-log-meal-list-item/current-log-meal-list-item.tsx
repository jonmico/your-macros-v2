import styled from 'styled-components';
import { Meal } from '../../types/meal';
import { Link } from 'react-router-dom';
import { Macros } from '../../types/macros';
import { Food } from '../../types/food';
import { useState } from 'react';

const StyledCurrentLogMealListItem = styled.li`
  border: 1px solid var(--color-indigo-300);
  border-radius: 4px;
  padding: 0.75rem;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  transition: background-color 200ms ease-in-out;
  height: min-content;

  &:hover {
    background-color: var(--color-blue-100);
    cursor: pointer;
  }
`;

interface CurrentLogMealListItemProps {
  meal: Meal;
  logId: string | undefined;
}

export default function CurrentLogMealListItem({
  meal,
  logId,
}: CurrentLogMealListItemProps) {
  const { name } = meal;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleDropdownClick() {
    setIsDropdownOpen((prevState) => !prevState);
  }

  return (
    <StyledCurrentLogMealListItem onClick={handleDropdownClick}>
      <MealListItemHeader name={name} logId={logId} />
      <MealData
        calories={meal.mealTotals.calories}
        macros={meal.mealTotals.macros}
      />
      <MealDropdown
        logId={logId}
        mealId={meal._id}
        meals={meal.foods}
        isDropdownOpen={isDropdownOpen}
      />
    </StyledCurrentLogMealListItem>
  );
}

const StyledMealListItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const StyledH3 = styled.h3`
  color: var(--color-gray-700);
`;

const StyledLink = styled(Link)`
  padding: 0.5rem;
  border-radius: 20px;
  background-color: var(--color-indigo-500);
  color: var(--color-slate-100);
  text-align: center;
`;

interface MealListItemHeaderProps {
  name: string;
  logId: string | undefined;
}

function MealListItemHeader({ name, logId }: MealListItemHeaderProps) {
  return (
    <StyledMealListItemHeader>
      <StyledH3>{name}</StyledH3>
      <StyledLink to={`/app/food-logs/${logId}`}>View meal</StyledLink>
    </StyledMealListItemHeader>
  );
}

const StyledMealData = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

interface MealDataProps {
  calories: number;
  macros: Macros;
}

function MealData({
  calories,
  macros: { carbs, fat, protein },
}: MealDataProps) {
  return (
    <StyledMealData>
      <div>{calories}cals</div>
      <div>|</div>
      <div>{fat}f</div>
      <div>{carbs}c</div>
      <div>{protein}p</div>
    </StyledMealData>
  );
}

interface StyledMealDropdownProps {
  $isDropdownOpen: boolean;
}

const StyledMealDropdown = styled.div<StyledMealDropdownProps>`
  display: grid;
  grid-template-rows: ${(props) => (props.$isDropdownOpen ? '1fr' : '0fr')};
  transition: grid-template-rows 500ms ease-in-out;
`;

const MealDropdownWrapper = styled.div`
  overflow: hidden;
`;

const MealDropdownContent = styled.div`
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const AddToMealContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const AddToMealLink = styled(StyledLink)`
  border-radius: 4px;
  background-color: var(--color-blue-200);
  color: var(--color-gray-900);
`;

const FoodList = styled.ul`
  border-top: 1px solid var(--color-indigo-200);
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

interface MealDropdownProps {
  isDropdownOpen: boolean;
  meals: {
    food: Food;
    servings: number;
  }[];
  mealId: string | undefined;
  logId: string | undefined;
}

function MealDropdown({
  meals,
  isDropdownOpen,
  logId,
  mealId,
}: MealDropdownProps) {
  const mealList = !meals.length ? (
    <AddToMealContainer>
      <AddToMealLink to={`/app/food-logs/${logId}/edit/${mealId}`}>
        Add to this meal
      </AddToMealLink>
    </AddToMealContainer>
  ) : (
    <FoodList>
      {meals.map((food) => (
        <FoodItem key={food.food._id} food={food.food} />
      ))}
    </FoodList>
  );

  return (
    <StyledMealDropdown $isDropdownOpen={isDropdownOpen}>
      <MealDropdownWrapper>
        <MealDropdownContent>{mealList}</MealDropdownContent>
      </MealDropdownWrapper>
    </StyledMealDropdown>
  );
}

const StyledFoodItem = styled.li`
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid var(--color-slate-300);
  gap: 1rem;
`;

const FoodName = styled.div`
  font-weight: 600;
`;

const FoodBrand = styled.div`
  font-weight: 500;
  color: var(--color-gray-600);
`;

const FoodCalories = styled.div`
  color: var(--color-blue-600);
`;

interface FoodItemProps {
  food: Food;
}

function FoodItem({ food }: FoodItemProps) {
  const { name, brand, calories } = food;

  return (
    <StyledFoodItem>
      <div>
        <FoodName>{name}</FoodName>
        <FoodBrand>{brand}</FoodBrand>
      </div>
      <FoodCalories>{calories}cals</FoodCalories>
    </StyledFoodItem>
  );
}
