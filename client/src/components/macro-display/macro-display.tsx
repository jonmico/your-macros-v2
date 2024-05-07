import styled from 'styled-components';

const StyledMacroDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
  color: var(--color-slate-700);
  flex-wrap: wrap;
`;

interface MacroDisplayProps {
  data: {
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
    servings?: number;
  };
}

export default function MacroDisplay({ data }: MacroDisplayProps) {
  const { calories, fat, carbs, protein, servings = 1 } = data;

  return (
    <StyledMacroDisplay>
      <div>{calories * servings} cals</div>
      <div>{fat * servings}f</div>
      <div>{carbs * servings}c</div>
      <div>{protein * servings}p</div>
    </StyledMacroDisplay>
  );
}
