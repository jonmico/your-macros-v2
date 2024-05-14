import { FoodLog } from '../../types/food-log';
import styled from 'styled-components';

const StyledDashboardGrid = styled.div`
  border-radius: 8px;
  padding: 1rem 2rem;
  background-color: var(--color-blue-100);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 0.75rem;
`;

interface DashboardGridProps {
  currentLog: FoodLog;
}

export default function DashboardGrid({ currentLog }: DashboardGridProps) {
  const {
    logTotals: {
      calories,
      macros: { fat, carbs, protein },
    },
  } = currentLog;
  return (
    <StyledDashboardGrid>
      <DashboardGridHeader />
      <Grid></Grid>
    </StyledDashboardGrid>
  );
}

const StyledDashboardGridHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  font-weight: 600;
  color: var(--color-gray-800);
  border: 1px solid var(--color-blue-300);
  border-radius: 6px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;

  & div {
    border-right: 1px solid var(--color-blue-300);
    padding: 0.5rem 0.75rem;
  }

  & div:last-of-type {
    border-right: none;
  }
`;

function DashboardGridHeader() {
  return (
    <StyledDashboardGridHeader>
      <div>Calories</div>
      <div>Fat</div>
      <div>Carbs</div>
      <div>Protein</div>
    </StyledDashboardGridHeader>
  );
}
