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
