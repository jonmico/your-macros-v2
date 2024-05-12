import styled from 'styled-components';
import { useFoodLog } from '../../hooks/useFoodLog';

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
    <li key={meal._id}>{meal.name}</li>
  ));

  return (
    <StyledCurrentLogMeals>
      {currentLogMealList.length ? (
        currentLogMealList
      ) : (
        <div>Go make a log</div>
      )}
    </StyledCurrentLogMeals>
  );
}
