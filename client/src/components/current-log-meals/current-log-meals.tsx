import styled from 'styled-components';
import { useFoodLog } from '../../hooks/useFoodLog';
import CurrentLogMealListItem from '../current-log-meal-list-item/current-log-meal-list-item';

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
      {currentLogMealList.length ? (
        currentLogMealList
      ) : (
        <div>Go make a meal</div>
      )}
    </StyledCurrentLogMeals>
  );
}
