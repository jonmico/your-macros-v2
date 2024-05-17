import styled from 'styled-components';
import { useFoodLog } from '../../hooks/useFoodLog';
import CurrentLogMealListItem from '../current-log-meal-list-item/current-log-meal-list-item';
import { Link } from 'react-router-dom';

const StyledCurrentLogMeals = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;

export default function CurrentLogMeals() {
  const { currentLog } = useFoodLog();

  if (currentLog === null) {
    return <div>Oops</div>;
  }

  const currentLogMealList = currentLog.meals.map((meal) => (
    <CurrentLogMealListItem key={meal._id} meal={meal} />
  ));

  return (
    <StyledCurrentLogMeals>
      {currentLogMealList.length ? currentLogMealList : <NoMealsInLog />}
    </StyledCurrentLogMeals>
  );
}

const StyledNoMealsInLog = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 600;
  grid-column: 1 / -1;
  height: 5rem;
  color: var(--color-gray-700);
  gap: 0.5rem;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  font-weight: 400;
  border: 1px solid var(--color-blue-400);
  background-color: var(--color-blue-100);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 200ms ease-in-out;

  &:hover {
    background-color: var(--color-blue-200);
  }
`;

function NoMealsInLog() {
  return (
    <StyledNoMealsInLog>
      No meals have been added to this meal yet.
      <StyledLink to={'/app/add-meal'}>Click here to add a meal</StyledLink>
    </StyledNoMealsInLog>
  );
}
