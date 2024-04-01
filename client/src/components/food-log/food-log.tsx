import { FaArrowLeft } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useFoodLog } from '../../hooks/useFoodLog';
import { Food } from '../../types/food';
import { Meal } from '../../types/meal';
import MacroDisplay from '../macro-display/macro-display';
import TotalsDisplay from '../totals-display/totals-display';

const StyledFoodLog = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  padding: 0.25rem 0.75rem;
  border-radius: var(--lg-radius);
  background-color: var(--color-indigo-600);
  color: var(--color-slate-100);
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  text-decoration: underline transparent;
  transition: background-color 300ms ease-in-out,
    text-decoration 200ms ease-in-out;

  &:hover {
    background-color: var(--color-indigo-500);
    text-decoration-color: var(--color-slate-100);
  }
`;

const StyledH2 = styled.h2`
  font-size: 1.75rem;
  color: var(--color-indigo-700);
`;

export default function FoodLog() {
  const { foodLogs } = useFoodLog();
  const { foodLogId } = useParams();

  const foodLog = foodLogs.find((log) => log._id === foodLogId);

  if (!foodLog) return null;

  const {
    calories,
    macros: { fat, carbs, protein },
  } = foodLog.logTotals;

  return (
    <StyledFoodLog>
      <StyledLink to={'/app/food-logs'}>
        <FaArrowLeft />
        Back to logs
      </StyledLink>
      <StyledH2>{foodLog.name}</StyledH2>
      <TotalsDisplay
        backgroundColor={'var(--color-blue-100)'}
        border={'1px solid var(--color-blue-300)'}
        totalsText={'Log Totals:'}
        calories={calories}
        fat={fat}
        carbs={carbs}
        protein={protein}
      />
      <MealList meals={foodLog.meals} />
    </StyledFoodLog>
  );
}

const StyledMealList = styled.div`
  border: 1px solid var(--color-blue-300);
  border-radius: var(--sm-radius);
  background-color: var(--color-blue-100);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const MealListHeader = styled.h3`
  color: var(--color-blue-600);
  font-size: 1.25rem;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

interface MealListProps {
  meals: Meal[];
}

function MealList({ meals }: MealListProps) {
  const mealList = meals.map((m) => <MealListItem key={m._id} meal={m} />);

  return (
    <StyledMealList>
      <MealListHeader>Meals in this log:</MealListHeader>
      <StyledList>{mealList}</StyledList>
    </StyledMealList>
  );
}

const StyledMealListItem = styled.li`
  border: 1px solid var(--color-indigo-300);
  border-radius: var(--sm-radius);
  padding: 1rem;
  background-color: var(--color-indigo-200);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

interface MealListItemProps {
  meal: Meal;
}

const MealName = styled.h4`
  color: var(--color-slate-700);
  font-size: 1.25rem;
`;

function MealListItem({ meal }: MealListItemProps) {
  const {
    calories,
    macros: { fat, carbs, protein },
  } = meal.mealTotals;
  return (
    <StyledMealListItem>
      <MealName>{meal.name}</MealName>
      <TotalsDisplay
        totalsText={'Meal Totals:'}
        fontSize={'1rem'}
        backgroundColor={'var(--color-blue-100)'}
        border={'1px solid var(--color-indigo-300)'}
        calories={calories}
        fat={fat}
        carbs={carbs}
        protein={protein}
      />
      <MealListFoodTable foods={meal.foods} />
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </StyledMealListItem>
  );
}

const StyledMealListFoodTable = styled.div`
  border: 1px solid var(--color-indigo-300);
  border-radius: var(--sm-radius);
  background-color: var(--color-blue-100);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;

interface MealListFoodTableProps {
  foods: { food: Food; servings: number }[];
}

function MealListFoodTable({ foods }: MealListFoodTableProps) {
  const foodList = foods.map((f) => (
    <MealListFoodTableListItem key={f.food._id} food={f} />
  ));

  return (
    <StyledMealListFoodTable>
      <MealListFoodTableHeader />
      <ul>{foodList}</ul>
    </StyledMealListFoodTable>
  );
}

const StyledMealListFoodTableHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  font-weight: 500;
  padding: 0.5rem 1rem 0.25rem 1rem;
  border-bottom: 1px solid var(--color-indigo-200);
`;

function MealListFoodTableHeader() {
  return (
    <StyledMealListFoodTableHeader>
      <div>Name & Brand</div>
      <div>Servings</div>
      <div>Nutrition</div>
    </StyledMealListFoodTableHeader>
  );
}

const StyledMealListFoodTableListItem = styled.li`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  padding: 1rem;
`;

const FoodName = styled.div`
  font-weight: 500;
`;

const FoodBrand = styled.div`
  font-weight: 500;
  color: var(--color-slate-600);
`;

interface MealListFoodTableListItemProps {
  food: { food: Food; servings: number };
}

function MealListFoodTableListItem({ food }: MealListFoodTableListItemProps) {
  const { food: foodItem, servings } = food;
  const {
    calories,
    macros: { fat, carbs, protein },
  } = foodItem;

  const macroDisplayData = { calories, fat, carbs, protein };

  return (
    <StyledMealListFoodTableListItem>
      <div>
        <FoodName>{foodItem.name}</FoodName>
        <FoodBrand>{foodItem.brand}</FoodBrand>
      </div>
      <div>{servings}</div>
      <MacroDisplay data={macroDisplayData} />
    </StyledMealListFoodTableListItem>
  );
}
