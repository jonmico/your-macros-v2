import { useState } from 'react';
import { FaAngleLeft, FaCaretLeft } from 'react-icons/fa6';
import styled, { css, keyframes } from 'styled-components';
import { useFoodLog } from '../../hooks/useFoodLog';
import { useMeal } from '../../hooks/useMeal';
import { Food } from '../../types/food';
import { FoodLog } from '../../types/food-log';
import { ExitButton, PrimaryButton } from '../button/button';
import { Link } from 'react-router-dom';

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

const Input = styled.input`
  background-color: inherit;
  border: 1px solid var(--color-blue-500);
  border-radius: var(--sm-radius);
  padding: 0.25rem;
  width: 15rem;
  transition: background-color 250ms, padding 350ms;

  &:focus-visible {
    background-color: var(--color-slate-200);
    outline: 1px solid var(--color-indigo-500);
    padding-left: 0.5rem;
  }
`;

interface MealHeaderProps {
  foods: { food: Food; servings: number }[];
  handleDropDownClick: () => void;
}

function MealHeader({ handleDropDownClick, foods }: MealHeaderProps) {
  const [mealName, setMealName] = useState('');
  const { foodLogs, currentLog } = useFoodLog();

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
        <Input
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
        <LogSelect logs={foodLogs} currentLog={currentLog} />
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

const rotate90 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-90deg);
  }
`;

const StyledLogSelect = styled.div`
  position: relative;
`;

interface LogSelectMainProps {
  $isLogListOpen: boolean;
}

const LogSelectMain = styled.div<LogSelectMainProps>`
  border: 1px solid var(--color-blue-500);
  border-radius: var(--sm-radius);
  background-color: var(--color-slate-100);
  padding: 0.25rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 10rem;

  &:hover {
    cursor: pointer;
  }

  & svg {
    animation: ${(props) =>
      props.$isLogListOpen
        ? css`
             250ms forwards ${rotate90}
          `
        : ''};
  }
`;

const LogSelectName = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const scaleList = keyframes`
  from {
    transform: scaleY(0);
    opacity: 0;
  } to {
    transform: scaleY(1);
    opacity: 1;
  }
`;

const LogSelectList = styled.ul`
  border: 1px solid var(--color-blue-500);
  padding: 0.25rem;
  border-radius: var(--sm-radius);
  position: absolute;
  width: max-content;
  background-color: var(--color-slate-100);
  transform: scaleY(0);
  opacity: 0;
  animation: ${css`100ms forwards ${scaleList}`};
`;

interface LogSelectProps {
  logs: FoodLog[];
  currentLog: FoodLog | null;
}

function LogSelect({ logs, currentLog }: LogSelectProps) {
  const [isLogListOpen, setIsLogListOpen] = useState(false);

  // TODO: Look at null case.
  if (!logs.length || currentLog === null) {
    return <Link to={'/app/food-logs'}>Create a log</Link>;
  }

  const logList = logs.map((log) => (
    <LogSelectListItem
      key={log._id}
      log={log}
      closeLogList={() => setIsLogListOpen(false)}
    />
  ));

  function handleLogListClick() {
    setIsLogListOpen((prevState) => !prevState);
  }

  return (
    <StyledLogSelect>
      <LogSelectMain
        $isLogListOpen={isLogListOpen}
        onClick={handleLogListClick}
      >
        <LogSelectName>{currentLog?.name}</LogSelectName> <FaAngleLeft />
      </LogSelectMain>
      {isLogListOpen && <LogSelectList>{logList}</LogSelectList>}
    </StyledLogSelect>
  );
}

const ListItem = styled.li`
  padding: 0.25rem 0.5rem;
  border-radius: var(--sm-radius);
  transition: background-color 250ms;

  &:hover {
    cursor: pointer;
    background-color: var(--color-blue-200);
  }
`;

interface LogSelectListItemProps {
  log: FoodLog;
  closeLogList: () => void;
}

function LogSelectListItem({ log, closeLogList }: LogSelectListItemProps) {
  const { foodLogDispatch } = useFoodLog();

  function handleClick() {
    foodLogDispatch({ type: 'foodLog/setCurrentLog', payload: log });
    closeLogList();
  }

  return <ListItem onClick={handleClick}>{log.name}</ListItem>;
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
