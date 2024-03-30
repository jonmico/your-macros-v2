import styled from 'styled-components';

interface StyledTotalsDisplayProps {
  $border?: string;
  $backgroundColor?: string;
}

const StyledTotalsDisplay = styled.div<StyledTotalsDisplayProps>`
  grid-column: 1 / 3;
  padding: 0.5rem 1.5rem;
  background-color: ${(props) =>
    props.$backgroundColor
      ? props.$backgroundColor
      : 'var(--color-indigo-300)'};
  border: ${(props) => (props.$border ? props.$border : '')};
  border-radius: var(--sm-radius);
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  font-size: 1.25rem;
`;

const Totals = styled.div`
  font-weight: 600;
  color: var(--color-indigo-800);
`;

const Macro = styled.div`
  font-weight: 500;
  color: var(--color-slate-800);
`;

interface TotalsDisplayProps {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  totalsText: string;
  backgroundColor?: string;
  border?: string;
}

export default function TotalsDisplay({
  calories,
  protein,
  fat,
  carbs,
  totalsText,
  backgroundColor,
  border,
}: TotalsDisplayProps) {
  return (
    <StyledTotalsDisplay $backgroundColor={backgroundColor} $border={border}>
      <Totals>{totalsText}</Totals>
      <Macro>{calories} calories</Macro>
      <Macro>{fat}g fat</Macro>
      <Macro>{carbs}g carbs</Macro>
      <Macro>{protein}g protein</Macro>
    </StyledTotalsDisplay>
  );
}
