import styled from 'styled-components';
import CurrentLogMeals from '../../components/current-log-meals/current-log-meals';
import DashboardTable from '../../components/dashboard-table/dashboard-table';

const StyledH2 = styled.h2`
  color: var(--color-gray-700);
`;

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export default function Dashboard() {
  return (
    <StyledDashboard>
      <Container>
        <StyledH2>Dashboard</StyledH2>
        <DashboardTable />
      </Container>
      <Container>
        <StyledH2>Meals in this log:</StyledH2>
        <CurrentLogMeals />
      </Container>
    </StyledDashboard>
  );
}
