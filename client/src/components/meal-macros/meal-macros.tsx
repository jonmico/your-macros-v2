import styled from 'styled-components';

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

export default function MealMacros({
  calories,
  protein,
  fat,
  carbs,
}: MealMacrosProps) {
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
