import { useState } from 'react';
import { FaCaretLeft } from 'react-icons/fa6';
import styled from 'styled-components';
import { useFoodLog } from '../../hooks/useFoodLog';
import { useMeal } from '../../hooks/useMeal';
import { Food } from '../../types/food';
import { ExitButton, PrimaryButton } from '../button/button';

const StyledMeal = styled.div`
  background-color: var(--color-blue-100);
  padding: 1rem;
  border: 1px solid var(--color-blue-400);
  border-radius: var(--sm-radius);
  grid-column: 1 / -1;
`;

export default function Meal() {
  const { foods } = useMeal();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  function handleDropDownClick() {
    setIsDropDownOpen((prevState) => !prevState);
  }

  return (
    <StyledMeal>
      <MealHeader foods={foods} handleDropDownClick={handleDropDownClick} />
      <MealDropDown isDropDownOpen={isDropDownOpen} />
    </StyledMeal>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const MealDataContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface MealHeaderProps {
  foods: { food: Food; servings: number }[];
  handleDropDownClick: () => void;
}

function MealHeader({ handleDropDownClick, foods }: MealHeaderProps) {
  const [mealName, setMealName] = useState('');

  const mealCalories = foods.reduce(
    (prev, curr) => prev + curr.food.calories * curr.servings,
    0
  );
  const mealFat = foods.reduce(
    (prev, curr) => prev + curr.food.macros.fat * curr.servings,
    0
  );
  const mealCarbs = foods.reduce(
    (prev, curr) => prev + curr.food.macros.carbs * curr.servings,
    0
  );
  const mealProtein = foods.reduce(
    (prev, curr) => prev + curr.food.macros.protein * curr.servings,
    0
  );

  return (
    <div>
      <ButtonContainer>
        <ExitButton onClick={handleDropDownClick}>
          <FaCaretLeft />
        </ExitButton>
      </ButtonContainer>
      <MealDataContainer>
        <input
          type='text'
          placeholder={'Meal name'}
          value={mealName}
          onChange={(evt) => setMealName(evt.target.value)}
        />
        <MealMacros
          calories={mealCalories}
          fat={mealFat}
          carbs={mealCarbs}
          protein={mealProtein}
        />
        <LogSelect />
        <PrimaryButton>Add to log</PrimaryButton>
      </MealDataContainer>
    </div>
  );
}

const MacroContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

interface MealMacrosProps {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

function MealMacros({ calories, protein, fat, carbs }: MealMacrosProps) {
  return (
    <div>
      <div>{calories} calories</div>
      <MacroContainer>
        <div>{fat} fat</div>
        <div>{carbs} carbs</div>
        <div>{protein} protein</div>
      </MacroContainer>
    </div>
  );
}

function LogSelect() {
  const { foodLogs } = useFoodLog();

  const foodLogOptionList = foodLogs.map((log) => (
    <option key={log._id}>{log.name}</option>
  ));

  return (
    <select name='logSelect' id='logSelect'>
      {foodLogOptionList}
    </select>
  );
}

interface StyledMealDropDownProps {
  $isDropDownOpen: boolean;
}

const StyledMealDropDown = styled.div<StyledMealDropDownProps>`
  display: grid;
  grid-template-rows: ${(props) => (props.$isDropDownOpen ? '1fr' : '0fr')};
  overflow: hidden;
  transition: grid-template-rows 500ms;
`;

const DropDownContent = styled.div`
  overflow: hidden;
`;

interface MealDropDownProps {
  isDropDownOpen: boolean;
}

function MealDropDown({ isDropDownOpen }: MealDropDownProps) {
  return (
    <StyledMealDropDown $isDropDownOpen={isDropDownOpen}>
      <DropDownContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        earum, dolores minima incidunt nam quod non beatae tenetur! Maiores,
        veritatis id. Ut quidem, nesciunt quis iure suscipit rerum aperiam
        voluptatum. Provident molestiae eveniet vel autem nam nostrum adipisci
        blanditiis debitis voluptatem architecto similique perferendis,
        reprehenderit minima neque, iure repudiandae, assumenda itaque? Debitis
        ipsam soluta blanditiis quaerat quo modi eius beatae. Quo error eaque
        expedita ea natus possimus quas rerum quaerat distinctio sequi inventore
        illum, aut nihil, voluptas nostrum similique asperiores cumque beatae
        nisi odio. Rem pariatur molestias architecto doloribus maxime. Non
        commodi dolor earum rem mollitia ipsam iusto fugiat cumque, vero ex.
        Libero dicta inventore animi, minima itaque fuga eius in enim eaque
        laudantium facilis dolorum dolor, recusandae maiores porro.
      </DropDownContent>
    </StyledMealDropDown>
  );
}
