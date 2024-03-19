import { FaXmark } from 'react-icons/fa6';
import { useFood } from '../../hooks/useFood';
import { ExitButton } from '../button/button';

import styled from 'styled-components';
import Food from '../food/food';

const StyledFoodData = styled.div`
  border: 1px solid var(--color-indigo-500);
  border-radius: var(--md-radius);
  padding: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
`;

const NoFoodSelectedText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
`;

const ExitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function FoodData() {
  const { selectedFood, dispatch } = useFood();

  return (
    <StyledFoodData>
      {!selectedFood ? (
        <NoFoodSelectedText>
          Select a food from the list to view its data
        </NoFoodSelectedText>
      ) : (
        <>
          <ExitButtonContainer>
            <ExitButton
              onClick={() => dispatch({ type: 'food/clearSelectedFood' })}
            >
              <FaXmark />
            </ExitButton>
          </ExitButtonContainer>
          <Food food={selectedFood} />
        </>
      )}
    </StyledFoodData>
  );
}
