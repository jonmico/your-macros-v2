import { SetStateAction, useState } from 'react';
import { PurpleWideButton } from '../../components/button/button';
import FoodData from '../../components/food-data/food-data';
import FoodSearch from '../../components/food-search/food-search';
import LogSelect from '../../components/log-select/log-select';
import MealBuilder from '../../components/meal-builder/meal-builder';
import MealDropDown from '../../components/meal-dropdown/meal-dropdown';
import MealHeader from '../../components/meal-header/meal-header';
import Meal from '../../components/meal/meal';
import { useFood } from '../../hooks/useFood';
import { useFoodLog } from '../../hooks/useFoodLog';
import { useMeal } from '../../hooks/useMeal';
import { Food } from '../../types/food';
import { MealBuilderInput } from '../../ui/input/input';
import { useUser } from '../../hooks/useUser';
import Toast from '../../components/toast/toast';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FoodLog } from '../../types/food-log';
import { ErrorText } from '../../ui/error-text/error-text';
import { PageHeader } from '../../ui/page-header/page-header';

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

export default function AddMeal() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const {
    mealState: {
      buildMeal,
      buildMeal: { foods },
    },
    dispatch: mealDispatch,
  } = useMeal();
  const { currentLog, foodLogs, addMealToLog } = useFoodLog();
  const { dispatch: foodDispatch } = useFood();
  const { userId } = useUser();
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [mealNameError, setMealNameError] = useState('');

  function handleDropDownClick() {
    setIsDropDownOpen((prevState) => !prevState);
  }

  function handleAddClick(
    evt: React.MouseEvent<HTMLButtonElement>,
    food: Food,
    servings = 1
  ) {
    evt.stopPropagation();
    mealDispatch({
      type: 'meal/addBuildMealFood',
      payload: { food: { food, servings } },
    });
    foodDispatch({
      type: 'food/changeServings',
      payload: { servings: '1' },
    });
  }

  function handleRemoveClick(foodId: string) {
    mealDispatch({ type: 'meal/removeBuildMealFood', payload: { foodId } });
  }

  function handleClearClick() {
    mealDispatch({ type: 'meal/clearBuildMealFoods' });
  }

  function handleChangeServings(foodId: string, servings: number) {
    mealDispatch({
      type: 'meal/changeBuildMealServings',
      payload: { foodId, servings },
    });
  }

  async function addToLog() {
    if (!currentLog || !currentLog._id) return;
    if (!buildMeal.name) {
      setMealNameError('Please provide a name for the meal.');
      return;
    }

    await addMealToLog(currentLog._id, {
      ...buildMeal,
      author: userId,
    });

    mealDispatch({ type: 'meal/clearBuildMeal' });
    setIsToastOpen(true);
  }

  function handleInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
    if (mealNameError) setMealNameError('');
    mealDispatch({
      type: 'meal/changeBuildMealName',
      payload: {
        mealName: evt.target.value,
      },
    });
  }

  return (
    <div>
      <PageHeader>Add a meal</PageHeader>
      {isToastOpen && (
        <BuildMealToast
          setIsToastOpen={setIsToastOpen}
          currentLog={currentLog}
        />
      )}
      <MealBuilder>
        <Meal>
          <MealHeader
            foods={foods}
            isDropDownOpen={isDropDownOpen}
            handleDropDownClick={handleDropDownClick}
          >
            <div>
              <MealBuilderInput
                placeholder={'Meal name'}
                value={buildMeal.name}
                onChange={handleInputChange}
              />
              {mealNameError && <ErrorText>{mealNameError}</ErrorText>}
            </div>
            <LogSelect logs={foodLogs} currentLog={currentLog} />
            <PurpleWideButton onClick={addToLog}>Add to log</PurpleWideButton>
          </MealHeader>
          <MealDropDown
            handleChangeServings={handleChangeServings}
            handleClearClick={handleClearClick}
            handleRemoveClick={handleRemoveClick}
            isDropDownOpen={isDropDownOpen}
            foods={buildMeal.foods}
          />
        </Meal>
        <FoodSearch foods={foods} handleAddClick={handleAddClick} />
        <FoodData foods={foods} handleAddClick={handleAddClick} />
      </MealBuilder>
    </div>
  );
}

interface BuildMealToastProps {
  setIsToastOpen: React.Dispatch<SetStateAction<boolean>>;
  currentLog: FoodLog | null;
}

function BuildMealToast({ setIsToastOpen, currentLog }: BuildMealToastProps) {
  if (!currentLog) return null;

  return (
    <Toast closeToastWindow={() => setIsToastOpen(false)}>
      <ToastContent>
        <div>
          Added{' '}
          <ToastFoodText>
            {currentLog.meals[currentLog.meals.length - 1].name}
          </ToastFoodText>{' '}
          meal to <ToastFoodText>{currentLog.name}</ToastFoodText> log
        </div>
        <div>
          Check it out{' '}
          <ToastFoodLink to={`/app/food-logs/${currentLog._id}`}>
            here
          </ToastFoodLink>
        </div>
      </ToastContent>
    </Toast>
  );
}
