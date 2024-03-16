import { FaXmark } from 'react-icons/fa6';
import { useFood } from '../../hooks/useFood';
import { ExitButton } from '../button/button';
import styled from 'styled-components';

const StyledFoodData = styled.div`
  border: 1px solid var(--color-indigo-500);
  border-radius: var(--md-radius);
  padding: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
`;

export default function FoodData() {
  const { selectedFood, dispatch } = useFood();

  return (
    <StyledFoodData>
      {!selectedFood ? (
        <div>No food currently selected.</div>
      ) : (
        <>
          {selectedFood.name}
          <ExitButton
            onClick={() => dispatch({ type: 'food/clearSelectedFood' })}
          >
            <FaXmark />
          </ExitButton>
        </>
      )}
    </StyledFoodData>
  );
}
