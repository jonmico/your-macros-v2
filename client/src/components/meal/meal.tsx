import styled from 'styled-components';
import { useMeal } from '../../hooks/useMeal';
import { useState } from 'react';

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
      <MealHeader handleDropDownClick={handleDropDownClick} />
      <MealDropDown isDropDownOpen={isDropDownOpen} />
    </StyledMeal>
  );
}

const StyledMealHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface MealHeaderProps {
  handleDropDownClick: () => void;
}

function MealHeader({ handleDropDownClick }: MealHeaderProps) {
  return (
    <StyledMealHeader>
      <div>Stuff here</div>
      <div>That is</div>
      <div>Spaced out</div>
      <button onClick={handleDropDownClick}>I am a button</button>
    </StyledMealHeader>
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
