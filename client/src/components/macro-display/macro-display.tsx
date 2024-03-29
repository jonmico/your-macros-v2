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
  };
}

export default function MacroDisplay({ data }: MacroDisplayProps) {
  const { calories, fat, carbs, protein } = data;
  return (
    <StyledMacroDisplay>
      <div>{calories} cals</div>
      <div>{fat}f</div>
      <div>{carbs}c</div>
      <div>{protein}p</div>
    </StyledMacroDisplay>
  );
}
