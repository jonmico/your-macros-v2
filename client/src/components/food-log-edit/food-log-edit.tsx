import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useFindFoodLog } from '../../hooks/useFindFoodLog';
import { useFoodLog } from '../../hooks/useFoodLog';
import { useMeal } from '../../hooks/useMeal';
import { ErrorText } from '../../ui/error-text/error-text';
import { MealBuilderInput } from '../../ui/input/input';
import { PurpleWideButton } from '../button/button';
import FoodData from '../food-data/food-data';
import FoodSearch from '../food-search/food-search';
import MealBuilder from '../meal-builder/meal-builder';
import MealDropDown from '../meal-dropdown/meal-dropdown';
import MealHeader from '../meal-header/meal-header';
import Meal from '../meal/meal';
import { Food } from '../../types/food';
import { useFood } from '../../hooks/useFood';
import { PageHeader } from '../../ui/page-header/page-header';

const EditMealInputContainer = styled.div`
  grid-column: 1 / 3;
`;

const EmphasizeText = styled.span`
  color: var(--color-indigo-600);
`;

export default function FoodLogEdit() {
  const { foodLog, meal } = useFindFoodLog();
  const {
    dispatch: mealDispatch,
    mealState: { editMeal },
  } = useMeal();
  const { dispatch: foodDispatch } = useFood();
  const { editMealInLog, currentLog } = useFoodLog();
  const [isDropDownOpen, setIsDropDownOpen] = useState(true);
  const [mealNameError, setMealNameError] = useState('');

  useEffect(() => {
    if (!meal) return;

    mealDispatch({
      type: 'meal/setEditMeal',
      payload: { editMeal: meal },
    });
  }, [meal, mealDispatch]);

  if (foodLog === undefined || editMeal === null || currentLog === null)
    return null;

  function handleDropDownClick() {
    setIsDropDownOpen((prevState) => !prevState);
  }

  function handleInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
    if (mealNameError) setMealNameError('');

    mealDispatch({
      type: 'meal/changeEditMealName',
      payload: { mealName: evt.target.value },
    });
  }

  function handleChangeServings(foodId: string, servings: number) {
    mealDispatch({
      type: 'meal/changeEditMealServings',
      payload: {
        foodId,
        servings,
      },
    });
  }

  function handleClearClick() {
    mealDispatch({ type: 'meal/clearEditMealFoods' });
  }

  function handleRemoveClick(foodId: string) {
    mealDispatch({ type: 'meal/removeEditMealFood', payload: { foodId } });
  }

  function handleAddClick(
    evt: React.MouseEvent<HTMLButtonElement>,
    food: Food,
    servings = 1
  ) {
    evt.stopPropagation();

    mealDispatch({
      type: 'meal/addEditMealFood',
      payload: { food: { food, servings } },
    });

    foodDispatch({ type: 'food/changeServings', payload: { servings: '1' } });
  }

  async function updateMeal() {
    if (
      editMeal === null ||
      currentLog === null ||
      currentLog._id === undefined
    )
      return;

    if (!editMeal.name) {
      setMealNameError('Please provide a name for the meal.');
      return;
    }

    const data = await editMealInLog(currentLog._id, editMeal);

    console.log(data);
  }

  return (
    <div>
      <PageHeader>
        Editing <EmphasizeText>{editMeal.name}</EmphasizeText> in{' '}
        <EmphasizeText>{currentLog.name}</EmphasizeText>
      </PageHeader>
      <MealBuilder>
        <Meal>
          <MealHeader
            isDropDownOpen={isDropDownOpen}
            handleDropDownClick={handleDropDownClick}
            foods={editMeal.foods}
          >
            <EditMealInputContainer>
              <MealBuilderInput
                placeholder={'Meal name'}
                value={editMeal.name}
                onChange={handleInputChange}
              />
              {mealNameError && <ErrorText>{mealNameError}</ErrorText>}
            </EditMealInputContainer>

            <PurpleWideButton onClick={updateMeal}>
              Update Meal
            </PurpleWideButton>
          </MealHeader>
          <MealDropDown
            handleChangeServings={handleChangeServings}
            handleClearClick={handleClearClick}
            handleRemoveClick={handleRemoveClick}
            isDropDownOpen={isDropDownOpen}
            foods={editMeal.foods}
          />
        </Meal>
        <FoodSearch foods={editMeal.foods} handleAddClick={handleAddClick} />
        <FoodData foods={editMeal.foods} handleAddClick={handleAddClick} />
      </MealBuilder>
    </div>
  );
}
