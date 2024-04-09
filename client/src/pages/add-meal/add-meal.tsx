import { useState } from 'react';
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
            handleChangeServings={handleChangeServings}
            handleClearClick={handleClearClick}
            handleRemoveClick={handleRemoveClick}
            isDropDownOpen={isDropDownOpen}
            foods={buildMeal.foods}
          />
        </Meal>
        <FoodSearch foods={foods} handleAddClick={handleAddClick} />
        <FoodData handleAddClick={handleAddClick} />
      </MealBuilder>
    </div>
  );
}
