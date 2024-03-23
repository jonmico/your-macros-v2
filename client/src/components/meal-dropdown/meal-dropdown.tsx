import styled from 'styled-components';
import MealTable from '../meal-table/meal-table';

interface StyledMealDropDownProps {
  $isDropDownOpen: boolean;
}

const StyledMealDropDown = styled.div<StyledMealDropDownProps>`
  display: grid;
  grid-template-rows: ${(props) => (props.$isDropDownOpen ? '1fr' : '0fr')};
  transition: grid-template-rows 500ms;
`;

const DropDownContentWrapper = styled.div`
  overflow: hidden;
`;

const DropDownContent = styled.div`
  padding-top: 1rem;
`;

interface MealDropDownProps {
  isDropDownOpen: boolean;
}

export default function MealDropDown({ isDropDownOpen }: MealDropDownProps) {
  return (
    <StyledMealDropDown $isDropDownOpen={isDropDownOpen}>
      <DropDownContentWrapper>
        <DropDownContent>
          <MealTable />
        </DropDownContent>
      </DropDownContentWrapper>
    </StyledMealDropDown>
  );
}
